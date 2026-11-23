'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { ArticleVisual, ArticleVisualScene } from '@/components/ArticleVisual';
import type { ArticleVisual as ArticleVisualData } from '@/i18n/articles/visual-types';
import { TabularText } from '@/components/TabularText';
import type { Locale } from '@/i18n/content';
import type { ArticleBlock, ArticleData } from '@/i18n/articles';
import { ARTICLES_UI } from '@/i18n/articles/types';
import type { ArticleSummary } from '@/lib/article-summary';
import { GumroadButton } from '@/components/GumroadButton';
import { DesignRolesLab } from './DesignRolesLab';
import { useModalFocus } from '@/components/useModalFocus';
import { articleHref } from '@/lib/article-links';
import { PLAYBOOK_COUNTS, playbookPages } from '@/lib/playbook-edition';

function InlineArticleText({ text, locale }: { text: string; locale: Locale }) {
  return <>{text.split(/(`[^`]+`|\[\d+\])/g).map((part, index) =>
    /^\[\d+\]$/.test(part)
      ? <a className="notion-citation" href={`#reference-${part.slice(1, -1)}`} aria-label={`${locale === 'fr' ? 'Source' : 'Reference'} ${part.slice(1, -1)}`} key={index}>{part}</a> :
    part.startsWith('`') && part.endsWith('`')
      ? <code className="notion-inline-code" key={index}>{part.slice(1, -1)}</code>
      : <React.Fragment key={index}>{part}</React.Fragment>
  )}</>;
}

// Native details/summary keeps the contents usable before hydration and without JS.
function handleTocEscape(event: React.KeyboardEvent<HTMLDetailsElement>) {
  if (event.key !== 'Escape' || !event.currentTarget.open) return;
  event.preventDefault();
  event.currentTarget.open = false;
  event.currentTarget.querySelector('summary')?.focus();
}

interface NotionArticleReaderProps {
  locale: Locale;
  gumroadUrl: string;
  article: ArticleData;
  relatedArticles: ArticleSummary[];
}

function CopyableNotionBlock({
  label,
  langTag,
  code,
  note,
  copyText,
  copiedText,
}: {
  label: string;
  langTag: string;
  code: string;
  note?: string;
  copyText: string;
  copiedText: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="notion-copybox">
      <div className="notion-copybox-bar">
        <div className="notion-copybox-meta">
          <span className="notion-copybox-lang">{langTag}</span>
          <span className="notion-copybox-label">{label}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={`notion-copy-btn ${copied ? 'copied' : ''}`}
          aria-live="polite"
        >
          {copied ? (
            <>
              <Icon name="check" size="sm" />
              <span>{copiedText}</span>
            </>
          ) : (
            <>
              <Icon name="copy" size="sm" />
              <span>{copyText}</span>
            </>
          )}
        </button>
      </div>
      <pre tabIndex={0} role="region" aria-label={label}>
        <code>{code}</code>
      </pre>
      {note && <div className="notion-copybox-note">{note}</div>}
    </div>
  );
}

export function NotionArticleReader({
  locale,
  gumroadUrl,
  article,
  relatedArticles,
}: NotionArticleReaderProps) {
  const ui = ARTICLES_UI[locale];
  const [activeId, setActiveId] = useState<string>(article.sections[0]?.id ?? '');
  const [progress, setProgress] = useState<number>(0);
  const mobileTocRef = useRef<HTMLDetailsElement>(null);
  const [expandedDiagram, setExpandedDiagram] = useState<ArticleVisualData | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const sourcesHeading = ui.sourcesTitle;
  const collapseTocLabel = locale === 'fr' ? 'Replier le sommaire' : 'Collapse contents';
  const expandTocLabel = locale === 'fr' ? 'Afficher le sommaire' : 'Show contents';
  const zoomLabel = locale === 'fr' ? 'Agrandir le schéma' : 'Zoom diagram';
  const faqHeading =
    locale === 'fr'
      ? 'Questions fréquentes'
      : 'Frequently Asked Questions';
  const faqNavTitle = locale === 'fr' ? 'Questions fréquentes' : 'FAQ';
  const articlesLabel = 'Article';
  const updatedWord = locale === 'fr' ? 'Mis à jour le' : 'Updated';

  // Reading progress bar
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      setProgress(pct);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  // Scroll-spy for Notion sticky left TOC + smooth reveal motion
  useEffect(() => {
    const sectionIds = [...article.sections.map((s) => s.id), 'article-faq', 'article-sources'];
    const sectionEls = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const spyObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          // On short screens the previous section's tail can share the reading
          // band with the linked heading. Prefer the later visible section.
          .sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-14% 0px -68% 0px',
        threshold: [0, 0.15, 0.5],
      }
    );

    sectionEls.forEach((el) => spyObserver.observe(el));

    const revealEls = Array.from(document.querySelectorAll<HTMLElement>('.notion-reveal'));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.06,
      }
    );

    revealEls.forEach((el) => revealObserver.observe(el));

    return () => {
      spyObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [article.sections]);

  const closeLightbox = useCallback(() => setExpandedDiagram(null), []);
  useModalFocus(Boolean(expandedDiagram), lightboxRef, closeLightbox);

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveId(id);
    if (mobileTocRef.current) mobileTocRef.current.open = false;
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
      // Closing the mobile disclosure must not leave focus inside its hidden panel.
      target.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  const renderBlock = (block: ArticleBlock, idx: number) => {
    switch (block.type) {
      case 'h3':
        return (
          <h3 key={idx} className="notion-h3">
            {block.text}
          </h3>
        );
      case 'p':
        return (
          <p key={idx} className="notion-p">
            <InlineArticleText text={block.text} locale={locale} />
          </p>
        );
      case 'explanation':
        return (
          <div className="notion-explainer" key={idx}>
            <div className="notion-explainer-copy">
              {block.paragraphs.map((paragraph, paragraphIndex) => (
                <p className="notion-p" key={paragraphIndex}><InlineArticleText text={paragraph} locale={locale} /></p>
              ))}
            </div>
            <ArticleVisual visual={block.visual} />
          </div>
        );
      case 'quote':
        return (
          <div key={idx} className="notion-quote">
            <div className="notion-quote-tag">{block.tag}</div>
            <blockquote>{block.text}</blockquote>
          </div>
        );
      case 'doDont':
        return (
          <div key={idx} className="notion-dodont">
            <div className="notion-do-col">
              <div className="notion-dodont-head"><Icon name="check-circle" /><span>{block.doTitle}</span></div>
              <ul>
                {block.doItems.map((it, i) => (
                  <li key={i}><Icon name="check" size="sm" /><span>{it}</span></li>
                ))}
              </ul>
            </div>
            <div className="notion-dont-col">
              <div className="notion-dodont-head"><Icon name="x" /><span>{block.dontTitle}</span></div>
              <ul>
                {block.dontItems.map((it, i) => (
                  <li key={i}><Icon name="x" size="sm" /><span>{it}</span></li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'steps':
        return (
          <div key={idx} className="notion-steps">
            <div className="notion-steps-title">{block.title}</div>
            <ol>
              {block.steps.map((st, i) => (
                <li key={i}>
                  <span className="notion-step-badge">{i + 1}</span>
                  <div>
                    <strong>{st.bold}</strong> — {st.text}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        );
      case 'list':
        return (
          <div key={idx} className="notion-bullets">
            {block.heading && <div className="notion-bullets-heading">{block.heading}</div>}
            <ul>
              {block.items.map((it, i) => (
                <li key={i}>
                  <Icon name="arrow-right" size="sm" />
                  <span>
                    {it.bold ? <><strong>{it.bold}</strong> — {it.text}</> : it.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'callout': {
        const toneClass =
          block.tone === 'lime'
            ? 'ok'
            : block.tone === 'accent'
              ? 'accent'
              : block.tone === 'warn'
                ? 'warn'
                : '';
        return (
          <aside key={idx} className={`notion-callout ${toneClass}`}>
            <span className="notion-callout-icon" aria-hidden="true">
              <Icon name={block.icon} size="lg" />
            </span>
            <div>
              <div className="notion-callout-title">{block.title}</div>
              <p className="notion-callout-body">{block.text}</p>
            </div>
          </aside>
        );
      }
      case 'inlineCta':
        return (
          <aside key={idx} className="notion-inline-cta" aria-label={block.title}>
            <div className="notion-inline-cta-copy">
              <div className="notion-inline-cta-kicker">
                {locale === 'fr' ? 'POUR VOTRE PROCHAIN ÉCRAN' : 'FOR YOUR NEXT SCREEN'}
              </div>
              <h3 className="notion-inline-cta-title">{block.title}</h3>
              <p className="notion-inline-cta-body">{block.text}</p>
            </div>
            <GumroadButton href={gumroadUrl} className="btn primary small">
              <span>{block.buttonLabel}</span>
              <Icon name="arrow-right" size="md" />
            </GumroadButton>
          </aside>
        );
      case 'copyable':
        return (
          <CopyableNotionBlock
            key={idx}
            label={block.label}
            langTag={block.langTag}
            code={block.code}
            note={block.note}
            copyText={ui.copyBtn}
            copiedText={ui.copiedBtn}
          />
        );
      case 'diagram':
        return (
          <figure key={idx} className="notion-figure" data-summary-diagram data-visual-kind={block.visual.kind}>
            <div className="notion-figure-head">
              <span className="notion-figure-title">{block.visual.title}</span>
              <button
                type="button"
                className="notion-figure-btn"
                onClick={() => setExpandedDiagram(block.visual)}
                aria-label={`${zoomLabel} : ${block.visual.title}`}
              >
                <Icon name="maximize" size="sm" />
                <span>{locale === 'fr' ? 'Agrandir' : 'Enlarge'}</span>
              </button>
            </div>
            <div className="article-summary-scene"><ArticleVisualScene visual={block.visual} /></div>
            <figcaption className="notion-figure-cap">{block.visual.caption}</figcaption>
          </figure>
        );
      case 'mobileLab':
        return <DesignRolesLab key={idx} locale={locale} title={block.title} caption={block.caption} />;
      case 'readingLink':
        return (
          <aside key={idx} className="notion-reading-link">
            <p>{block.text}</p>
            <a href={articleHref(locale, block.slug, block.sectionId)}>
              <span>{block.label}</span><Icon name="arrow-right" size="sm" />
            </a>
          </aside>
        );
      case 'table':
        return (
          <div
            key={idx}
            className="notion-table-wrap"
            role="region"
            aria-label={block.caption || (locale === 'fr' ? 'Tableau comparatif' : 'Comparison table')}
            tabIndex={0}
          >
            <table className="notion-table">
              {block.caption && <caption className="notion-table-caption">{block.caption}</caption>}
              <thead>
                <tr>
                  {block.headers.map((h, hIdx) => (
                    <th key={hIdx} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx}><TabularText>{cell}</TabularText></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="notion-page-wrap notion-reader">
      {/* Top Reading Progress Bar */}
      <div className="notion-progress-track" aria-hidden="true">
        <div className="notion-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Breadcrumbs */}
      <nav className="notion-breadcrumbs" aria-label={locale === 'fr' ? 'Fil d’Ariane' : 'Breadcrumb'}>
        <a href={`/${locale}`}>UX/UI Playbook</a>
        <Icon name="chevron-right" size="sm" />
        <a href={`/${locale}/articles`}>{articlesLabel}</a>
        <Icon name="chevron-right" size="sm" />
        <span style={{ color: 'var(--fg)', fontWeight: 600 }}>{article.category}</span>
      </nav>

      {/* Mobile Sticky Sommaire Drawer */}
      <details className="notion-mobile-toc" ref={mobileTocRef} onKeyDown={handleTocEscape}>
        <summary className="notion-mobile-toc-btn" aria-controls="mobile-article-toc">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Icon name="list-tree" size="md" style={{ color: 'var(--accent-ink)' }} />
            <span>{ui.tocTitle}</span>
          </span>
          <Icon name="chevron-down" size="md" className="notion-mobile-toc-chevron" />
        </summary>
        <div id="mobile-article-toc" className="notion-mobile-toc-panel" tabIndex={0} role="region" aria-label={ui.tocTitle}>
          <ul className="notion-toc-list">
            {article.sections.map((sec) => (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  onClick={(e) => handleTocClick(e, sec.id)}
                  className={`notion-toc-link ${activeId === sec.id ? 'active' : ''}`}
                  aria-current={activeId === sec.id ? 'location' : undefined}
                >
                  <span className="notion-toc-num">{sec.num}</span>
                  <span>{sec.tocLabel || sec.heading}</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href="#article-faq"
                onClick={(e) => handleTocClick(e, 'article-faq')}
                className={`notion-toc-link ${activeId === 'article-faq' ? 'active' : ''}`}
                aria-current={activeId === 'article-faq' ? 'location' : undefined}
              >
                <span className="notion-toc-num">FAQ</span>
                <span>{faqNavTitle}</span>
              </a>
            </li>
            <li>
              <a href="#article-sources" onClick={(e) => handleTocClick(e, 'article-sources')}
                className={`notion-toc-link ${activeId === 'article-sources' ? 'active' : ''}`}
                aria-current={activeId === 'article-sources' ? 'location' : undefined}>
                <Icon name="arrow-up-right" size="sm" className="notion-toc-source-icon" /><span>{sourcesHeading}</span>
              </a>
            </li>
          </ul>
        </div>
      </details>

      {/* Two-Column Notion Shell */}
      <div className="notion-shell">
        {/* Left Sticky Clickable Sommaire (Notion Sidebar) */}
        <aside className="notion-toc-rail" aria-label={ui.tocTitle}>
          <details className="notion-toc-disclosure" open onKeyDown={handleTocEscape}>
            <summary className="notion-toc-toggle" aria-controls="desktop-article-toc">
              <Icon name="list-tree" size="sm" />
              <span className="notion-toc-toggle-open">{collapseTocLabel}</span>
              <span className="notion-toc-toggle-closed">{expandTocLabel}</span>
              <Icon name="chevron-left" size="sm" className="notion-toc-toggle-chevron" />
            </summary>
            <div id="desktop-article-toc" className="notion-toc-scroll" tabIndex={0} role="region" aria-label={ui.tocTitle}>
              <div className="notion-toc-card">
                <div className="notion-toc-label">
                  <Icon name="list-tree" size="sm" style={{ color: 'var(--accent-ink)' }} />
                  <span>{ui.tocTitle}</span>
                </div>
                <ul className="notion-toc-list">
                  {article.sections.map((sec) => (
                    <li key={sec.id}>
                      <a
                        href={`#${sec.id}`}
                        onClick={(e) => handleTocClick(e, sec.id)}
                        className={`notion-toc-link ${activeId === sec.id ? 'active' : ''}`}
                        aria-current={activeId === sec.id ? 'location' : undefined}
                      >
                        <span className="notion-toc-num">{sec.num}</span>
                        <span>{sec.tocLabel || sec.heading}</span>
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#article-faq"
                      onClick={(e) => handleTocClick(e, 'article-faq')}
                      className={`notion-toc-link ${activeId === 'article-faq' ? 'active' : ''}`}
                      aria-current={activeId === 'article-faq' ? 'location' : undefined}
                    >
                      <span className="notion-toc-num">FAQ</span>
                      <span>{faqNavTitle}</span>
                    </a>
                  </li>
                  <li>
                    <a href="#article-sources" onClick={(e) => handleTocClick(e, 'article-sources')}
                      className={`notion-toc-link ${activeId === 'article-sources' ? 'active' : ''}`}
                      aria-current={activeId === 'article-sources' ? 'location' : undefined}>
                      <Icon name="arrow-up-right" size="sm" className="notion-toc-source-icon" /><span>{sourcesHeading}</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Subtle Notion Sidebar Promo Card */}
              <div className="notion-rail-promo">
                <div className="notion-rail-promo-tag">{ui.miniCtaTag}</div>
                <p>{ui.miniCtaTitle}</p>
                <GumroadButton
                  href={gumroadUrl}
                  className="btn primary small"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>{ui.miniCtaBtn}</span>
                  <Icon name="arrow-right" size="sm" />
                </GumroadButton>
              </div>
            </div>
          </details>
        </aside>

        {/* Main Notion Editorial Document */}
        <article className="notion-doc">
          <header>
            <div className="notion-header-meta">
              <span className="guide-cat-pill">
                <Icon name={article.icon} size="sm" />
                <span>{article.category}</span>
              </span>
              <a className="notion-sources-link" href="#article-sources" onClick={(e) => handleTocClick(e, 'article-sources')}>
                {sourcesHeading}<Icon name="arrow-up-right" size="sm" />
              </a>
              <span className="guide-read-meta">{article.readTime}</span>
            </div>

            <div className="notion-icon-badge" aria-hidden="true">
<Icon name={article.icon} size="xl" />
            </div>

            <h1 className="notion-title">{article.title}</h1>
            <p className="notion-subtitle">{article.subtitle}</p>
            <p className="notion-entity-def">
              <strong>{article.category}</strong> — {article.entityDefinition}
            </p>

            <div className="notion-byline">
              <span>
                <strong style={{ color: 'var(--fg)' }}>Joy N.</strong> · UX/UI Playbook
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                {updatedWord}{' '}
                <time dateTime={article.updatedAt}><TabularText>{article.updatedAt}</TabularText></time>
              </span>
            </div>

            {/* A concise reader summary, not a promise of search or AI inclusion. */}
            <div className="notion-aeo-box">
              <div className="notion-aeo-title">
                <Icon name="sparkles" size="sm" />
                <span>{article.aeoSummaryTitle}</span>
              </div>
              <p>{article.aeoSummary}</p>
            </div>

            {/* Context for the article, with links to the original publications. */}
            <div className="notion-stats-row">
              {article.keyStats.map((st, idx) => (
                <div key={idx} className="notion-stat-card">
                  <div className="notion-stat-val"><TabularText>{st.value}</TabularText></div>
                  <div className="notion-stat-label">{st.label}</div>
                  <div className="notion-stat-src">
                    {st.url ? <a href={st.url}>{st.source}</a> : st.source}
                  </div>
                </div>
              ))}
            </div>
          </header>

          {/* Article Sections */}
          {article.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="notion-section notion-reveal is-visible"
            >
              <h2 className="notion-h2" tabIndex={-1}>
                <span className="notion-h2-num">{section.num}</span>
                <span>{section.heading}</span>
              </h2>
              {section.blocks.map((block, bIdx) => renderBlock(block, bIdx))}
            </section>
          ))}

          {/* Article FAQ Section (AEO Schema-Backed) */}
          <section id="article-faq" className="notion-section notion-reveal is-visible">
            <h2 className="notion-h2" tabIndex={-1}>
              <span className="notion-h2-num">FAQ</span>
              <span>{faqHeading}</span>
            </h2>
            <div className="faq-list" style={{ marginTop: 18 }}>
              {article.faqs.map((f, idx) => (
                <details key={idx} open={idx === 0}>
                  <summary><span>{f.q}</span><Icon name="chevron-down" className="faq-chevron" /></summary>
                  <div className="faq-answer">{f.a}</div>
                </details>
              ))}
            </div>
          </section>

          <section id="article-sources" className="notion-refs" aria-labelledby="article-sources-heading">
            <div className="notion-refs-head">
              <h2 id="article-sources-heading" tabIndex={-1}>{sourcesHeading}</h2>
            </div>
            <ol className="notion-refs-list">
              {article.references.map((reference, referenceIndex) => (
                <li key={reference.url} id={`reference-${referenceIndex + 1}`} className="notion-refs-item">
                  <div className="notion-refs-main">
                    <a href={reference.url}>{reference.title}</a>
                    <div className="notion-refs-sub">{reference.publisher} · {reference.date}</div>
                    <p>{reference.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* End-of-Article Conversion Offer: Buy UX/UI Playbook */}
          <section className="notion-cta-card" aria-label={article.ctaTitle}>
            <div className="notion-cta-grid">
              <div>
                <div className="mono sec-kicker" style={{ marginBottom: 10 }}>
                  {locale === 'fr'
                    ? 'LE LIVRE ET LES FICHIERS'
                    : 'THE BOOK AND FILES'}
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(22px, 3vw, 28px)',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                    marginBottom: 10,
                  }}
                >
                  {article.ctaTitle}
                </h2>
                <p style={{ fontSize: 15, lineHeight: 1.62, color: 'var(--fg-2)' }}>
                  {article.ctaText}
                </p>
                <ul className="notion-cta-bullets">
                  {article.ctaBullets.map((b, i) => (
                    <li key={i}>
                      <Icon name="check" size="md"
                        style={{ color: 'var(--ok)', flexShrink: 0, marginTop: 3 }}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="notion-cta-pricebox">
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: 'var(--accent-ink)',
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                >
                  UX/UI PLAYBOOK 2026
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 44,
                    fontWeight: 700,
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  <TabularText>{locale === 'fr' ? '29 $' : '$29'}</TabularText>
                </div>
                <p style={{ fontSize: 12.5, color: 'var(--fg-2)', marginBottom: 16 }}>
                  {locale === 'fr'
                    ? `Paiement unique · PDF ${playbookPages(locale)} p. + Kit A4 + ZIP ${PLAYBOOK_COUNTS.workingFilesPerEdition} fichiers`
                    : `One-time payment · ${playbookPages(locale)}p PDF + A4 Kit + ${PLAYBOOK_COUNTS.workingFilesPerEdition}-file ZIP`}
                </p>
                <GumroadButton
                  href={gumroadUrl}
                  className="btn primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>
                    {locale === 'fr'
                      ? 'Obtenir l’édition française · 29 $'
                      : 'Get the English edition · $29'}
                  </span>
                  <Icon name="arrow-right" size="md" />
                </GumroadButton>
                <p style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 10 }}>
                  {locale === 'fr'
                    ? 'Fichiers via Gumroad · remboursement sous 7 jours'
                    : 'Files via Gumroad · 7-day refund policy'}
                </p>
              </div>
            </div>
          </section>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <section style={{ marginTop: 56 }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                  marginBottom: 18,
                }}
              >
                {ui.relatedHeading}
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
                  gap: 18,
                }}
              >
                {relatedArticles.map((rel) => (
                  <a
                    key={rel.slug}
                    href={`/${locale}/articles/${rel.slug}`}
                    className="guide-card"
                  >
                    <div>
                      <div className="guide-card-top">
                        <span className="guide-cat-pill">
                          <Icon name={rel.icon} size="sm" />
                          <span>{rel.category}</span>
                        </span>
                        <span className="guide-read-meta">{rel.readTime}</span>
                      </div>
                      <h3>{rel.title}</h3>
                      <p>{rel.subtitle}</p>
                    </div>
                    <div className="guide-card-foot">
                      <span className="guide-card-arrow">
                        <span>{ui.readBtn}</span>
                        <Icon name="arrow-right" size="sm" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>

      {/* The diagram stays selectable, theme-aware and responsive when enlarged. */}
      {expandedDiagram && (
        <div
          className="article-diagram-backdrop"
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-diagram-title"
          aria-describedby="article-diagram-caption"
          onClick={(e) => {
            if (e.target === e.currentTarget) setExpandedDiagram(null);
          }}
        >
          <div className="article-diagram-dialog">
            <div className="article-diagram-top">
              <h2 id="article-diagram-title">{expandedDiagram.title}</h2>
              <button
                type="button"
                className="article-diagram-close"
                data-modal-close
                onClick={closeLightbox}
                aria-label={locale === 'fr' ? 'Fermer le schéma agrandi' : 'Close enlarged diagram'}
              >
                <Icon name="x" size="md" />
              </button>
            </div>
            <div className="article-summary-scene article-diagram-content" tabIndex={0} role="region" aria-label={zoomLabel}>
              <ArticleVisualScene visual={expandedDiagram} />
            </div>
            <p id="article-diagram-caption">{expandedDiagram.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}
