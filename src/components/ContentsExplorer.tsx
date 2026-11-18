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

  return (
    <section id="contents">
      <div className="wrap">
        <div className="mono sec-kicker">{data.kicker}</div>
        <h2>{data.heading}</h2>
        <p className="sec-lede">{data.lede}</p>

        <div className="explorer-tabs" role="tablist" aria-label="Package contents">
          <button
            type="button"
            role="tab"
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
            aria-selected={tab === 'archive'}
            onClick={() => setTab('archive')}
            className={`filter-pill ${tab === 'archive' ? 'active' : ''}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <FolderGit2 size={15} aria-hidden="true" />
            {data.tabArchive}
          </button>
        </div>

        {tab === 'book' && (
          <div>
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
        )}

        {tab === 'kit' && (
          <div>
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
        )}

        {tab === 'archive' && (
          <div>
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
        )}
      </div>
    </section>
  );
}
