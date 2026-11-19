'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Copy,
  ListTree,
  Maximize2,
  Sparkles,
  X,
} from 'lucide-react';
import type { Locale } from '@/i18n/content';
import type { ArticleBlock, ArticleData } from '@/i18n/articles';
import { ARTICLES_UI } from '@/i18n/articles';
import { GumroadButton } from '@/components/GumroadButton';
import { useModalFocus } from '@/components/useModalFocus';

interface NotionArticleReaderProps {
  locale: Locale;
  gumroadUrl: string;
  article: ArticleData;
  relatedArticles: ArticleData[];
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
              <Check size={14} aria-hidden="true" />
              <span>{copiedText}</span>
            </>
          ) : (
            <>
              <Copy size={14} aria-hidden="true" />
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
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [lightboxImg, setLightboxImg] = useState<{
    src: string;
    alt: string;
    caption: string;
    sourceRef: string;
  } | null>(null);

  const lightboxRef = useRef<HTMLDivElement>(null);
  const sourcesHeading = locale === 'fr' ? 'Sources et niveaux de preuve' : 'Sources and evidence levels';
  const evidenceLabels = locale === 'fr'
    ? { established: 'Établi', probable: 'Probable' }
    : { established: 'Established', probable: 'Probable' };
  const zoomLabel = locale === 'fr' ? 'Agrandir le schéma' : 'Zoom diagram';
  const faqHeading =
    locale === 'fr'
      ? 'Questions fréquentes (synthèse opérationnelle)'
      : 'Frequently Asked Questions';
  const faqNavTitle = locale === 'fr' ? 'Questions fréquentes' : 'FAQ';
  const guidesLabel = locale === 'fr' ? 'Guides' : 'Guides';
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
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
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

  const closeLightbox = useCallback(() => setLightboxImg(null), []);
  useModalFocus(Boolean(lightboxImg), lightboxRef, closeLightbox);

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveId(id);
    setMobileTocOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
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
            {block.text}
          </p>
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
              <div className="notion-dodont-head">{block.doTitle}</div>
              <ul>
                {block.doItems.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            </div>
            <div className="notion-dont-col">
              <div className="notion-dodont-head">{block.dontTitle}</div>
              <ul>
                {block.dontItems.map((it, i) => (
                  <li key={i}>{it}</li>
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
                  {it.bold ? (
                    <>
                      <strong>{it.bold}</strong> — {it.text}
                    </>
                  ) : (
                    it.text
                  )}
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
              {block.icon}
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
              <ArrowRight size={16} aria-hidden="true" />
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
      case 'figure':
        return (
          <figure key={idx} className="notion-figure">
            <button
              type="button"
              className="notion-figure-btn"
              onClick={() =>
                setLightboxImg({
                  src: block.src,
                  alt: block.alt,
                  caption: block.caption,
                  sourceRef: block.sourceRef,
                })
              }
              aria-label={`${zoomLabel}: ${block.alt}`}
            >
              <img src={block.src} alt={block.alt} width={block.width} height={block.height} loading="lazy" />
              <span className="notion-figure-zoom-pill">
                <Maximize2 size={13} aria-hidden="true" />
                <span>{zoomLabel}</span>
              </span>
            </button>
            <figcaption className="notion-figure-cap">
              <span className="notion-figure-badge">{block.sourceRef}</span>
              <span className="notion-figure-text">{block.caption}</span>
            </figcaption>
          </figure>
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
                      <td key={cIdx}>{cell}</td>
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
    <div className="notion-page-wrap">
      {/* Top Reading Progress Bar */}
      <div className="notion-progress-track" aria-hidden="true">
        <div className="notion-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Breadcrumbs */}
      <nav className="notion-breadcrumbs" aria-label={locale === 'fr' ? 'Fil d’Ariane' : 'Breadcrumb'}>
        <a href={`/${locale}`}>UX/UI Playbook</a>
        <ChevronRight size={14} aria-hidden="true" />
        <a href={`/${locale}/articles`}>{guidesLabel}</a>
        <ChevronRight size={14} aria-hidden="true" />
        <span style={{ color: 'var(--fg)', fontWeight: 600 }}>{article.category}</span>
      </nav>

      {/* Mobile Sticky Sommaire Drawer */}
      <div className="notion-mobile-toc">
        <button
          type="button"
          className="notion-mobile-toc-btn"
          onClick={() => setMobileTocOpen((v) => !v)}
          aria-expanded={mobileTocOpen}
          aria-controls="mobile-article-toc"
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <ListTree size={16} style={{ color: 'var(--accent-ink)' }} aria-hidden="true" />
            <span>{ui.tocTitle}</span>
          </span>
          <ChevronDown
            size={17}
            style={{
              transform: mobileTocOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
            aria-hidden="true"
          />
        </button>
        {mobileTocOpen && (
          <div id="mobile-article-toc" className="notion-mobile-toc-panel">
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
                  <span className="notion-toc-num">↗</span><span>{sourcesHeading}</span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Two-Column Notion Shell */}
      <div className="notion-shell">
        {/* Left Sticky Clickable Sommaire (Notion Sidebar) */}
        <aside className="notion-toc-rail" aria-label={ui.tocTitle}>
          <div className="notion-toc-card">
            <div className="notion-toc-label">
              <ListTree size={14} style={{ color: 'var(--accent-ink)' }} aria-hidden="true" />
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
                  <span className="notion-toc-num">↗</span><span>{sourcesHeading}</span>
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
            </GumroadButton>
          </div>
        </aside>

        {/* Main Notion Editorial Document */}
        <article className="notion-doc">
          <header>
            <div className="notion-header-meta">
              <span className="guide-cat-pill">
                <BookOpen size={13} aria-hidden="true" />
                <span>{article.category}</span>
              </span>
              <span className="notion-verified-pill">
                <CheckCircle2 size={13} aria-hidden="true" />
                <span>{ui.sourcesBadge}</span>
              </span>
              <span className="guide-read-meta">{article.readTime}</span>
            </div>

            <div className="notion-icon-badge" aria-hidden="true">
              {article.icon}
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
                <time dateTime={article.updatedAt}>{article.updatedAt}</time>
              </span>
            </div>

            {/* AEO Direct Answer Box (Featured Snippet & AI Overview target) */}
            <div className="notion-aeo-box">
              <div className="notion-aeo-title">
                <Sparkles size={14} aria-hidden="true" />
                <span>{article.aeoSummaryTitle}</span>
              </div>
              <p>{article.aeoSummary}</p>
            </div>

            {/* Dated Primary Evidence Cards (GEO Differentiator) */}
            <div className="notion-stats-row">
              {article.keyStats.map((st, idx) => (
                <div key={idx} className="notion-stat-card">
                  <div className="notion-stat-val">{st.value}</div>
                  <div className="notion-stat-label">{st.label}</div>
                  <div className="notion-stat-src">
                    {st.url ? <a href={st.url}>{st.source}</a> : st.source}
                  </div>
                  <span className={`notion-refs-badge ${st.evidence}`}>
                    {evidenceLabels[st.evidence]}
                  </span>
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
              <h2 className="notion-h2">
                <span className="notion-h2-num">{section.num}</span>
                <span>{section.heading}</span>
              </h2>
              {section.blocks.map((block, bIdx) => renderBlock(block, bIdx))}
            </section>
          ))}

          {/* Article FAQ Section (AEO Schema-Backed) */}
          <section id="article-faq" className="notion-section notion-reveal is-visible">
            <h2 className="notion-h2">
              <span className="notion-h2-num">FAQ</span>
              <span>{faqHeading}</span>
            </h2>
            <div className="faq-list" style={{ marginTop: 18 }}>
              {article.faqs.map((f, idx) => (
                <details key={idx} open={idx === 0}>
                  <summary>{f.q}</summary>
                  <div className="faq-answer">{f.a}</div>
                </details>
              ))}
            </div>
          </section>

          <section id="article-sources" className="notion-refs" aria-labelledby="article-sources-heading">
            <div className="notion-refs-head">
              <h2 id="article-sources-heading">{sourcesHeading}</h2>
              <span className="notion-refs-sub">UX/UI Playbook · A5</span>
            </div>
            <p className="notion-p" style={{ fontSize: 14, marginBottom: 18 }}>
              {locale === 'fr'
                ? 'Établi : source primaire identifiée pour le constat cité. Probable : transposition ou résultat à confirmer dans votre contexte. Les repères de méthode du Playbook ne sont pas des garanties de performance.'
                : 'Established: a primary source is identified for the cited finding. Probable: an interpretation or result requiring validation in your context. Playbook guidelines are not performance guarantees.'}
            </p>
            <ol className="notion-refs-list">
              {article.references.map((reference) => (
                <li key={reference.url} className="notion-refs-item">
                  <div className="notion-refs-main">
                    <a href={reference.url}>{reference.title}</a>
                    <div className="notion-refs-sub">{reference.publisher} · {reference.date}</div>
                    <p>{reference.note}</p>
                  </div>
                  <span className={`notion-refs-badge ${reference.evidence}`}>
                    {evidenceLabels[reference.evidence]}
                  </span>
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
                    ? 'PASSEZ DU GUIDE AU SYSTÈME COMPLET'
                    : 'GO FROM FIELD GUIDE TO COMPLETE SYSTEM'}
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(22px, 3vw, 28px)',
                    fontWeight: 800,
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
                      <Check
                        size={16}
                        style={{ color: 'var(--ok)', flexShrink: 0, marginTop: 3 }}
                        aria-hidden="true"
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
                    fontWeight: 800,
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  {locale === 'fr' ? '29 $' : '$29'}
                </div>
                <p style={{ fontSize: 12.5, color: 'var(--fg-2)', marginBottom: 16 }}>
                  {locale === 'fr'
                    ? 'Paiement unique · PDF 148 p. + Kit A4 + ZIP 21 fichiers'
                    : 'One-time payment · 139p PDF + A4 Kit + 21-file ZIP'}
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
                  <ArrowRight size={16} aria-hidden="true" />
                </GumroadButton>
                <p style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 10 }}>
                  {locale === 'fr'
                    ? 'Téléchargement immédiat · Garantie 7 jours'
                    : 'Instant download · 7-day refund guarantee'}
                </p>
              </div>
            </div>
          </section>

          {/* Related Field Guides */}
          {relatedArticles.length > 0 && (
            <section style={{ marginTop: 56 }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 22,
                  fontWeight: 800,
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
                          <span>{rel.icon}</span>
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
                        <ArrowRight size={15} aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>

      {/* Figure Zoom Lightbox */}
      {lightboxImg && (
        <div
          className="lightbox-backdrop"
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImg.alt}
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxImg(null);
          }}
        >
          <div className="lightbox-top">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span className="mono" style={{ color: '#ff7a52', fontSize: 12 }}>
                {lightboxImg.sourceRef}
              </span>
              <span style={{ fontSize: 13.5, color: '#e9ecf2' }}>{lightboxImg.caption}</span>
            </div>
            <button
              type="button"
              className="lb-btn"
              data-modal-close
              onClick={() => setLightboxImg(null)}
              aria-label={locale === 'fr' ? 'Fermer le schéma agrandi' : 'Close enlarged diagram'}
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
          <div tabIndex={0} role="region" aria-label={zoomLabel}
            style={{
              maxWidth: 1060,
              maxHeight: 'calc(100dvh - 120px)',
              overflowY: 'auto',
              width: '100%',
              margin: '20px auto',
              background: '#ffffff',
              padding: 16,
              borderRadius: 12,
            }}
          >
            <img
              src={lightboxImg.src}
              alt={lightboxImg.alt}
              style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 6 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
