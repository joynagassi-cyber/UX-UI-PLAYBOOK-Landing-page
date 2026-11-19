'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, FolderGit2, Layers } from 'lucide-react';
import type { PlaybookContent } from '@/i18n/content';

interface ContentsExplorerProps {
  data: PlaybookContent['contentsSection'];
}

export function ContentsExplorer({ data }: ContentsExplorerProps) {
  const [tab, setTab] = useState<'book' | 'kit' | 'archive'>('book');
  const [openParts, setOpenParts] = useState<Record<string, boolean>>({
    '01': true,
    '07': true,
  });

  const allExpanded = data.parts.every((p) => openParts[p.num]);

  const togglePart = (num: string) => {
    setOpenParts((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  const toggleAll = () => {
    if (allExpanded) {
      setOpenParts({});
    } else {
      const next: Record<string, boolean> = {};
      for (const p of data.parts) next[p.num] = true;
      setOpenParts(next);
    }
  };

  const tabs = ['book', 'kit', 'archive'] as const;
  const onTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const index = tabs.indexOf(tab);
    const next = event.key === 'Home' ? tabs[0]
      : event.key === 'End' ? tabs[2]
        : tabs[(index + (event.key === 'ArrowRight' ? 1 : 2)) % tabs.length];
    setTab(next);
    event.currentTarget.querySelector<HTMLButtonElement>(`#contents-tab-${next}`)?.focus();
  };

  return (
    <section id="contents">
      <div className="wrap">
        <div className="mono sec-kicker">{data.kicker}</div>
        <h2>{data.heading}</h2>
        <p className="sec-lede">{data.lede}</p>

        <div className="explorer-tabs" role="tablist" aria-label={data.heading} onKeyDown={onTabKeyDown}>
          <button
            type="button"
            role="tab"
            id="contents-tab-book"
            aria-controls="contents-panel-book"
            tabIndex={tab === 'book' ? 0 : -1}
            aria-selected={tab === 'book'}
            onClick={() => setTab('book')}
            className={`filter-pill ${tab === 'book' ? 'active' : ''}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Layers size={15} aria-hidden="true" />
            {data.tabBook}
          </button>
          <button
            type="button"
            role="tab"
            id="contents-tab-kit"
            aria-controls="contents-panel-kit"
            tabIndex={tab === 'kit' ? 0 : -1}
            aria-selected={tab === 'kit'}
            onClick={() => setTab('kit')}
            className={`filter-pill ${tab === 'kit' ? 'active' : ''}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <FileText size={15} aria-hidden="true" />
            {data.tabKit}
          </button>
          <button
            type="button"
            role="tab"
            id="contents-tab-archive"
            aria-controls="contents-panel-archive"
            tabIndex={tab === 'archive' ? 0 : -1}
            aria-selected={tab === 'archive'}
            onClick={() => setTab('archive')}
            className={`filter-pill ${tab === 'archive' ? 'active' : ''}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <FolderGit2 size={15} aria-hidden="true" />
            {data.tabArchive}
          </button>
        </div>

        <div role="tabpanel" id="contents-panel-book" aria-labelledby="contents-tab-book" tabIndex={0} hidden={tab !== 'book'}>
            <div className="toc-toolbar">
              <button type="button" onClick={toggleAll} className="btn ghost small">
                {allExpanded ? data.collapseAll : data.expandAll}
              </button>
            </div>
            <div className="toc-list">
              {data.parts.map((part) => {
                const isOpen = !!openParts[part.num];
                return (
                  <div className="toc-item" key={part.num}>
                    <button
                      type="button"
                      className="toc-summary"
                      aria-expanded={isOpen}
                      onClick={() => togglePart(part.num)}
                    >
                      <span className="toc-num">{part.num}</span>
                      <span>{part.title}</span>
                      <span className="toc-page">{part.page}</span>
                      {isOpen ? (
                        <ChevronUp size={17} aria-hidden="true" />
                      ) : (
                        <ChevronDown size={17} aria-hidden="true" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="toc-body">
                        <ol>
                          {part.sections.map((sec, idx) => (
                            <li key={idx}>{sec}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
        </div>

        <div role="tabpanel" id="contents-panel-kit" aria-labelledby="contents-tab-kit" tabIndex={0} hidden={tab !== 'kit'}>
            <p className="sec-lede" style={{ marginTop: '20px' }}>
              {data.kitIntro}
            </p>
            <div className="kit-grid">
              {data.kitSheets.map((sheet) => (
                <div className="kit-card" key={sheet.num}>
                  <div className="kit-card-top">
                    <span>SHEET {sheet.num}</span>
                    <span className="tabular">{sheet.page}</span>
                  </div>
                  <strong>{sheet.title}</strong>
                  <span>{sheet.meta}</span>
                </div>
              ))}
            </div>
        </div>

        <div role="tabpanel" id="contents-panel-archive" aria-labelledby="contents-tab-archive" tabIndex={0} hidden={tab !== 'archive'}>
            <p className="sec-lede" style={{ marginTop: '20px' }}>
              {data.archiveIntro}
            </p>
            <div className="archive-grid">
              {data.archiveGroups.map((grp) => (
                <div className="archive-card" key={grp.folder}>
                  <div className="archive-folder">{grp.folder}</div>
                  <div className="archive-desc">{grp.desc}</div>
                  <ul className="archive-files">
                    {grp.files.map((f) => (
                      <li key={f.name}>
                        <code>{f.name}</code>
                        <span>{f.info}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
}
