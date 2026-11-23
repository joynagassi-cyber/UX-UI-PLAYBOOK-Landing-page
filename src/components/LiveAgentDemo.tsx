'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/Icon';
import { TabularText } from '@/components/TabularText';
import type { PlaybookContent } from '@/i18n/content';
import { PLAYBOOK_EDITION } from '@/lib/playbook-edition';

interface LiveAgentDemoProps {
  data: PlaybookContent['agentDemo'];
}

export function LiveAgentDemo({ data }: LiveAgentDemoProps) {
  const [mode, setMode] = useState<'bad' | 'clean'>('bad');
  const [copied, setCopied] = useState(false);

  const isBad = mode === 'bad';
  const currentCmd = isBad ? data.terminal.cmdBad : data.terminal.cmdClean;
  const currentLines = isBad ? data.terminal.linesBad : data.terminal.linesClean;
  const totals = PLAYBOOK_EDITION.scannerExamples[isBad ? 'bad' : 'good'];

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
                <Icon name="check" size="sm" />
                <span><strong>{b.bold}</strong> {b.rest}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="demo-controls">
          <div className="seg-tabs" role="group" aria-label={data.kicker}>
            <button
              type="button"
              aria-pressed={isBad}
              onClick={() => setMode('bad')}
              className={`seg-tab ${isBad ? 'active-bad' : ''}`}
            >
              <Icon name="alert-triangle" size="sm" />
              {data.tabBad}
            </button>
            <button
              type="button"
              aria-pressed={!isBad}
              onClick={() => setMode('clean')}
              className={`seg-tab ${!isBad ? 'active-clean' : ''}`}
            >
              <Icon name="check-circle" size="sm" />
              {data.tabClean}
            </button>
          </div>

          {isBad ? (
            <button
              type="button"
              onClick={() => setMode('clean')}
              className="btn primary small"
            >
              <Icon name="sparkles" size="sm" />
              <span>{data.fixAction}</span>
              <Icon name="arrow-right" size="sm" />
            </button>
          ) : (
            <span className="mono demo-fixed-badge">
              <Icon name="check-circle" /><span>{data.fixedBadge}</span>
            </span>
          )}
        </div>

        <div className="demo-workbench">
          {/* Left: Interactive Screen Inspector */}
          <div className="inspector-pane">
            <div className={`inspector-bar ${isBad ? 'is-bad' : 'is-clean'}`}>
              <span>{isBad ? data.screenHeaderBad : data.screenHeaderClean}</span>
              <span>{data.illustrationLabel}</span>
            </div>

            <div className="mock-canvas">
              <div className="mock-ui">
                <div className="mock-ui-head">
                  <span>{data.screenMock.brand}</span>
                  <ol className="mock-checkout-steps" aria-label={data.screenMock.stepLabel}>
                    {data.screenMock.steps.map((step, idx) => (
                      <li key={step} aria-current={idx === 2 ? 'step' : undefined}>
                        {idx === 0 && <Icon name="check" size="sm" />}
                        <span>{step}</span>
                        {idx < 2 && <Icon name="chevron-right" size="sm" />}
                      </li>
                    ))}
                  </ol>
                </div>

                {!isBad && (
                  <div className="mock-summary-pill tabular">
                    <TabularText>{data.screenMock.summaryClean}</TabularText>
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
                      <TabularText>{data.screenMock.clearFeeClean}</TabularText>
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
                    <Icon name="check" size="sm" />
                    {data.copiedCmd}
                  </>
                ) : (
                  <>
                    <Icon name="copy" size="sm" />
                    {data.copyCmd}
                  </>
                )}
              </button>
            </div>

            <pre className="term-pre" tabIndex={0} role="region" aria-label={data.kicker}>
              <span className="c">$ {currentCmd}</span>
              {'\n'}
              {currentLines.map((line, i) => (
                <span className={line.type} key={i}>
                  {line.text}
                </span>
              ))}
            </pre>

            <p className="term-outcome" aria-live="polite">
              {data.terminal.statusBlocking} : {totals.blockingFailures}
              {' · '}{isBad ? 'EXIT 1' : 'EXIT 0'}
            </p>
            <div className="term-scorebar">
              <div className="term-score-cell">
                <span className="term-score-val" style={{ color: 'var(--term-green)' }}><TabularText>{String(totals.automated)}</TabularText></span>
                <span className="term-score-lbl">{data.terminal.statusAutomated}</span>
              </div>
              <div className="term-score-cell">
                <span className="term-score-val" style={{ color: 'var(--term-warn)' }}><TabularText>{String(totals.toVerify)}</TabularText></span>
                <span className="term-score-lbl">{data.terminal.statusToVerify}</span>
              </div>
              <div className="term-score-cell">
                <span className="term-score-val" style={{ color: 'var(--term-dim)' }}><TabularText>{String(PLAYBOOK_EDITION.scannerExamples.outsidePlatformScope)}</TabularText></span>
                <span className="term-score-lbl">{data.terminal.statusNotApplicable}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
