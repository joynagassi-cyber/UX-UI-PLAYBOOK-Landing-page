'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Icon } from '@/components/Icon';
import type { PlaybookContent, PreviewPageItem } from '@/i18n/content';
import { GumroadButton } from './GumroadButton';
import { useModalFocus } from './useModalFocus';

export function HeroSampleTrigger({
  label,
  pageIndex = 0,
  className = 'btn ghost',
}: {
  label: string;
  pageIndex?: number;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent('open-playbook-reader', { detail: { index: pageIndex } })
        );
      }}
    >
      <Icon name="book-open" size="md" />
      {label}
    </button>
  );
}

export function HeroBookStack({
  coverSrc,
  coverAlt,
  coverCaption,
  spreadSrc,
  spreadAlt,
  spreadCaption,
}: {
  coverSrc: string;
  coverAlt: string;
  coverCaption: string;
  spreadSrc: string;
  spreadAlt: string;
  spreadCaption: string;
}) {
  return (
    <div className="hero-stack">
      <button
        type="button"
        className="page-frame"
        onClick={() =>
          window.dispatchEvent(new CustomEvent('open-playbook-reader', { detail: { index: 0 } }))
        }
        aria-label={coverAlt}
      >
        <img src={coverSrc} width={960} height={1357} alt={coverAlt} fetchPriority="high" />
        <span className="page-caption">
          <span>{coverCaption}</span>
          <Icon name="zoom-in" size="sm" />
        </span>
      </button>

      <button
        type="button"
        className="page-frame"
        onClick={() =>
          window.dispatchEvent(new CustomEvent('open-playbook-reader', { detail: { index: 2 } }))
        }
        aria-label={spreadAlt}
      >
        <img src={spreadSrc} width={960} height={1357} alt={spreadAlt} loading="lazy" />
        <span className="page-caption">
          <span>{spreadCaption}</span>
          <Icon name="zoom-in" size="sm" />
        </span>
      </button>
    </div>
  );
}

interface BookGalleryProps {
  data: PlaybookContent['insideSection'];
  gumroadUrl: string;
}

export function BookGalleryLightbox({ data, gumroadUrl }: BookGalleryProps) {
  const [filter, setFilter] = useState<'all' | PreviewPageItem['category']>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const visiblePages =
    filter === 'all' ? data.pages : data.pages.filter((p) => p.category === filter);

  const closeReader = useCallback(() => setActiveIndex(null), []);
  const isOpen = activeIndex !== null;
  useModalFocus(isOpen, modalRef, closeReader);

  const prevPage = useCallback(() => {
    setActiveIndex((cur) => {
      if (cur === null) return null;
      return (cur - 1 + data.pages.length) % data.pages.length;
    });
  }, [data.pages.length]);

  const nextPage = useCallback(() => {
    setActiveIndex((cur) => {
      if (cur === null) return null;
      return (cur + 1) % data.pages.length;
    });
  }, [data.pages.length]);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const custom = e as CustomEvent<{ index?: number }>;
      const idx = typeof custom.detail?.index === 'number' ? custom.detail.index : 0;
      setActiveIndex(Math.max(0, Math.min(idx, data.pages.length - 1)));
    };
    window.addEventListener('open-playbook-reader', onOpen);
    return () => window.removeEventListener('open-playbook-reader', onOpen);
  }, [data.pages.length]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevPage();
      if (e.key === 'ArrowRight') nextPage();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, prevPage, nextPage]);

  const currentModalPage = activeIndex !== null ? data.pages[activeIndex] : null;

  return (
    <section id="inside">
      <div className="wrap">
        <div className="mono sec-kicker">{data.kicker}</div>
        <h2>{data.heading}</h2>
        <p className="sec-lede">{data.lede}</p>

        <div className="gallery-toolbar">
          <div className="filter-pills" role="group" aria-label={data.filterAll}>
            <button
              type="button"
              aria-pressed={filter === 'all'}
              onClick={() => setFilter('all')}
              className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
            >
              {data.filterAll}
            </button>
            <button
              type="button"
              aria-pressed={filter === 'screens'}
              onClick={() => setFilter('screens')}
              className={`filter-pill ${filter === 'screens' ? 'active' : ''}`}
            >
              {data.filterScreens}
            </button>
            <button
              type="button"
              aria-pressed={filter === 'before-after'}
              onClick={() => setFilter('before-after')}
              className={`filter-pill ${filter === 'before-after' ? 'active' : ''}`}
            >
              {data.filterBeforeAfter}
            </button>
            <button
              type="button"
              aria-pressed={filter === 'system'}
              onClick={() => setFilter('system')}
              className={`filter-pill ${filter === 'system' ? 'active' : ''}`}
            >
              {data.filterSystem}
            </button>
          </div>

          <button
            type="button"
            className="btn ghost small"
            onClick={() => setActiveIndex(0)}
          >
            <Icon name="book-open" size="sm" />
            {data.openReaderBtn}
          </button>
        </div>

        <div className="shots-grid">
          {visiblePages.map((page) => {
            const fullIdx = data.pages.findIndex((p) => p.id === page.id);
            return (
              <button
                key={page.id}
                type="button"
                className="shot-card"
                onClick={() => setActiveIndex(fullIdx)}
                aria-label={`${page.title} — ${data.clickHint}`}
              >
                <div className="shot-img-wrap">
                  <img
                    src={page.src}
                    width={480}
                    height={678}
                    alt={page.alt}
                    loading="lazy"
                  />
                  <span className="shot-badge">{page.badge}</span>
                </div>
                <div className="shot-meta">
                  <strong>{page.title}</strong>
                  <span>{page.caption}</span>
                </div>
              </button>
            );
          })}
        </div>

        <p className="hero-note" style={{ marginTop: '24px', maxWidth: '72ch' }}>
          {data.note}
        </p>
      </div>

      {/* Fullscreen Sample Reader Lightbox */}
      {currentModalPage && activeIndex !== null && (
        <div
          className="lightbox-backdrop"
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={currentModalPage.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeReader();
          }}
        >
          <div className="lightbox-top">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="mono tabular" style={{ color: '#ff7a52' }}>
                {activeIndex + 1} / {data.pages.length}
              </span>
              <strong style={{ fontSize: '14.5px' }}>{currentModalPage.title}</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GumroadButton href={gumroadUrl} className="btn primary small">
                {data.readerBuy}
              </GumroadButton>
              <button
                type="button"
                onClick={closeReader}
                className="lb-btn"
                data-modal-close
                aria-label={data.readerClose}
              >
                <Icon name="x" size="md" />
                {data.readerClose}
              </button>
            </div>
          </div>

          <div
            className="lightbox-body"
            tabIndex={0}
            role="region"
            aria-label={currentModalPage.title}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeReader();
            }}
          >
            <div className="lightbox-page">
              <img
                src={currentModalPage.src}
                width={960}
                height={1357}
                alt={currentModalPage.alt}
              />
            </div>
          </div>

          <div className="lightbox-foot">
            <button type="button" onClick={prevPage} className="lb-btn">
              <Icon name="chevron-left" size="md" />
              {data.readerPrev}
            </button>
            <span style={{ textAlign: 'center', fontSize: '13.5px' }}>
              {currentModalPage.caption}
            </span>
            <button type="button" onClick={nextPage} className="lb-btn">
              {data.readerNext}
              <Icon name="chevron-right" size="md" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
