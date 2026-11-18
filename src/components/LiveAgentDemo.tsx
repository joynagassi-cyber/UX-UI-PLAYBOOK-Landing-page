'use client';

import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Copy, Check, Sparkles } from 'lucide-react';
import type { PlaybookContent } from '@/i18n/content';

interface LiveAgentDemoProps {
  data: PlaybookContent['agentDemo'];
}

export function LiveAgentDemo({ data }: LiveAgentDemoProps) {
  const [mode, setMode] = useState<'bad' | 'clean'>('bad');
  const [copied, setCopied] = useState(false);

  const isBad = mode === 'bad';
  const currentCmd = isBad ? data.terminal.cmdBad : data.terminal.cmdClean;
  const currentLines = isBad ? data.terminal.linesBad : data.terminal.linesClean;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCmd.replace('\\\n    ', ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <section id="tool">
      <div className="wrap">
        <div className="demo-top">
          <div>
            <div className="mono sec-kicker">{data.kicker}</div>
            <h2>{data.heading}</h2>
            <p className="sec-lede">{data.lede}</p>
          </div>
          <ul className="ticks">
            {data.bullets.map((b, i) => (
              <li key={i}>
                <strong>{b.bold}</strong> {b.rest}
              </li>
            ))}
          </ul>
        </div>

        <div className="demo-controls">
          <div className="seg-tabs" role="tablist" aria-label="Screen version">
            <button
              type="button"
              role="tab"
              aria-selected={isBad}
              onClick={() => setMode('bad')}
              className={`seg-tab ${isBad ? 'active-bad' : ''}`}
            >
              <AlertTriangle size={15} aria-hidden="true" />
              {data.tabBad}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={!isBad}
              onClick={() => setMode('clean')}
              className={`seg-tab ${!isBad ? 'active-clean' : ''}`}
            >
              <CheckCircle2 size={15} aria-hidden="true" />
              {data.tabClean}
            </button>
          </div>

          {isBad ? (
            <button
              type="button"
              onClick={() => setMode('clean')}
              className="btn primary small"
            >
              <Sparkles size={15} aria-hidden="true" />
              {data.fixAction}
            </button>
          ) : (
            <span className="mono" style={{ color: 'var(--lime)', padding: '0 8px' }}>
              ✓ {data.fixedBadge}
            </span>
          )}
        </div>

        <div className="demo-workbench">
          {/* Left: Interactive Screen Inspector */}
          <div className="inspector-pane">
            <div className={`inspector-bar ${isBad ? 'is-bad' : 'is-clean'}`}>
              <span>{isBad ? data.screenHeaderBad : data.screenHeaderClean}</span>
              <span>{isBad ? 'EXIT 1' : 'EXIT 0'}</span>
            </div>

            <div className="mock-canvas">
              <div className="mock-ui">
                <div className="mock-ui-head">
                  <span>{data.screenMock.brand}</span>
                  <span style={{ color: 'var(--fg-3)', fontWeight: 500 }}>
                    {data.screenMock.stepLabel}
                  </span>
                </div>

                {!isBad && (
                  <div className="mock-summary-pill tabular">
                    {data.screenMock.summaryClean}
                  </div>
                )}

                {isBad ? (
                  <>
                    <div className="mock-fields-bad">
                      <div className="mock-field">
                        <span className="mock-field-label">{data.screenMock.emailLabel}</span>
                        <span className="mock-field-val">{data.screenMock.emailVal}</span>
                      </div>
                      <div className="mock-field">
                        <span className="mock-field-label">{data.screenMock.addressLabel}</span>
                        <span className="mock-field-val">{data.screenMock.addressVal}</span>
                      </div>
                      <div className="mock-field">
                        <span className="mock-field-label">{data.screenMock.cityLabel}</span>
                        <span className="mock-field-val">—</span>
                      </div>
                      <div className="mock-field">
                        <span className="mock-field-label">{data.screenMock.zipLabel}</span>
                        <span className="mock-field-val">—</span>
                      </div>
                      <div className="mock-field">
                        <span className="mock-field-label">{data.screenMock.cardLabel}</span>
                        <span className="mock-field-val">•••• •••• •••• 4242</span>
                      </div>
                      <div className="mock-field">
                        <span className="mock-field-label">{data.screenMock.expLabel}</span>
                        <span className="mock-field-val">09 / 28</span>
                      </div>
                    </div>
                    <div className="mock-btn-row">
                      <div className="mock-pay-bad">{data.screenMock.payPrimary}</div>
                      <div className="mock-pay-bad">{data.screenMock.saveSecondary}</div>
                    </div>
                    <div className="mock-fineprint-bad">{data.screenMock.hiddenFeeBad}</div>
                  </>
                ) : (
                  <>
                    <div className="mock-fields-clean">
                      <div className="mock-field">
                        <span className="mock-field-label">{data.screenMock.emailLabel}</span>
                        <span className="mock-field-val">{data.screenMock.emailVal}</span>
                      </div>
                      <div className="mock-field">
                        <span className="mock-field-label">{data.screenMock.addressLabel}</span>
                        <span className="mock-field-val">{data.screenMock.addressVal}</span>
                      </div>
                    </div>
                    <div className="mock-wallet-row">
                      <span className="wallet-pill dark">{data.screenMock.applePay}</span>
                      <span className="wallet-pill">{data.screenMock.cardPill}</span>
                    </div>
                    <div className="mock-btn-row">
                      <div className="mock-pay-clean">{data.screenMock.payPrimary}</div>
                    </div>
                    <div className="mock-fineprint-clean tabular">
                      {data.screenMock.clearFeeClean}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="rule-diagnostics">
              {(isBad ? data.screenMock.flaws : data.screenMock.improvements).map((item, idx) => (
                <div className="diag-item" key={idx}>
                  <span className={`diag-badge ${isBad ? 'bad' : 'ok'}`}>{item.code}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Executable Python Checklist Terminal */}
          <div className="term-pane">
            <div className="term-header">
              <div className="term-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <span className="mono" style={{ color: '#9a9aa8', fontSize: '12px' }}>
                agent_check.py · 77 rules
              </span>
              <button type="button" onClick={handleCopy} className="term-copy-btn">
                {copied ? (
                  <>
                    <Check size={13} aria-hidden="true" />
                    {data.copiedCmd}
                  </>
                ) : (
                  <>
                    <Copy size={13} aria-hidden="true" />
                    {data.copyCmd}
                  </>
                )}
              </button>
            </div>

            <pre className="term-pre">
              <span className="c">$ {currentCmd}</span>
              {'\n'}
              {currentLines.map((line, i) => (
                <span className={line.type} key={i}>
                  {line.text}
                </span>
              ))}
            </pre>

            <div className="term-scorebar">
              <div className="term-score-cell">
                <span
                  className="term-score-val"
                  style={{ color: isBad ? 'var(--term-red)' : 'var(--term-green)' }}
                >
                  {isBad ? '4' : '0'}
                </span>
                <span className="term-score-lbl">{data.terminal.statusBlocking}</span>
              </div>
              <div className="term-score-cell">
                <span className="term-score-val" style={{ color: 'var(--term-green)' }}>
                  {isBad ? '3' : '71'}
                </span>
                <span className="term-score-lbl">{data.terminal.statusVerified}</span>
              </div>
              <div className="term-score-cell">
                <span className="term-score-val" style={{ color: 'var(--term-warn)' }}>
                  {isBad ? '2' : '6'}
                </span>
                <span className="term-score-lbl">{data.terminal.statusToVerify}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
