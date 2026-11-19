import { Icon, type IconName } from '@/components/Icon';
import { DesignVector } from './DesignVector';
import { TabularText } from '@/components/TabularText';
import type { ArticleVisual as ArticleVisualData, ArticleVisualKind } from '@/i18n/articles/visual-types';

const visualIcons: Record<ArticleVisualKind, IconName> = {
  'discipline-map': 'layers', 'decision-loop': 'compass',
  hierarchy: 'layers', compare: 'layers', choices: 'list-tree', memory: 'layers',
  target: 'maximize', journey: 'compass', states: 'layers', empty: 'inbox',
  checkout: 'credit-card', checklist: 'check-circle', type: 'file-text', colour: 'palette',
  spacing: 'layers', responsive: 'maximize', tokens: 'settings', themes: 'moon',
  feedback: 'message-circle', motion: 'arrow-right', direction: 'arrow-right',
  handoff: 'file-text', roles: 'compass', research: 'message-circle', dashboard: 'layers',
  pricing: 'credit-card', pipeline: 'folder-git', permissions: 'settings', report: 'terminal', scope: 'file-text',
};

/** Text and CSS, not a raster screenshot: labels reflow, follow the theme and remain readable. */
export function ArticleVisualScene({ visual }: { visual: ArticleVisualData }) {
  const { kind, labels } = visual;
  const text = (index: number) => <TabularText>{labels[index] ?? ''}</TabularText>;

  if (kind === 'discipline-map' || kind === 'decision-loop') {
    return <div className="visual-vector-scene"><DesignVector kind={kind} /><ol className="visual-vector-labels">
      {labels.map((label, index) => <li key={index}><span className="visual-node" aria-hidden="true">{index + 1}</span><span>{label}</span></li>)}
    </ol></div>;
  }

  if (['journey', 'pipeline', 'roles', 'research', 'handoff'].includes(kind)) {
    return (
      <ol className={`visual-flow visual-flow-${kind}`}>
        {labels.map((label, index) => (
          <li key={index}>
            <span className="visual-node" aria-hidden="true">{index + 1}</span>
            <span><TabularText>{label}</TabularText></span>
          </li>
        ))}
      </ol>
    );
  }

  switch (kind) {
    case 'hierarchy':
      return <div className="visual-screen">
        <span className="visual-muted">{text(0)}</span>
        <strong className="visual-headline">{text(1)}</strong>
        <span className="visual-placeholder-lines" aria-hidden="true" />
        <span className="visual-action">{text(2)}</span>
      </div>;
    case 'compare':
      return <div className="visual-comparison">
        {labels.map((label, index) => <div key={index} className={index === 0 ? 'visual-before' : 'visual-after'}>
          <Icon name={index === 0 ? 'x' : 'check'} size="sm" />
          <span><TabularText>{label}</TabularText></span>
        </div>)}
      </div>;
    case 'choices':
      return <div className="visual-choices">{labels.map((label, index) => <span key={index} className={index === 0 ? 'visual-action' : 'visual-option'}><TabularText>{label}</TabularText></span>)}</div>;
    case 'memory':
      return <div className="visual-memory">{labels.map((label, index) => <span key={index}><TabularText>{label}</TabularText></span>)}</div>;
    case 'target':
      return <div className="visual-target">
        <div className="visual-hit-area" aria-hidden="true"><Icon name="x" size="sm" /></div>
        <strong>{text(0)}</strong><span className="visual-muted">{text(1)}</span>
      </div>;
    case 'states': {
      const icons: IconName[] = ['inbox', 'loader-circle', 'check-circle', 'layers', 'alert-triangle'];
      return <ul className="visual-state-list">{labels.map((label, index) => <li key={index}><Icon name={icons[index % icons.length]} size="sm" /><span><TabularText>{label}</TabularText></span></li>)}</ul>;
    }
    case 'empty':
      return <div className="visual-empty">
        <Icon name="inbox" size="lg" /><strong>{text(0)}</strong>
        <span className="visual-muted">{text(1)}</span><span className="visual-action">{text(2)}</span>
        {labels[3] && <span className="visual-muted">{text(3)}</span>}
      </div>;
    case 'checkout':
      return <div className="visual-receipt"><strong>{text(0)}</strong>
        {labels.slice(1, -1).map((label, index) => <span className="visual-receipt-line" key={index}><TabularText>{label}</TabularText></span>)}
        <span className="visual-action">{text(labels.length - 1)}</span>
      </div>;
    case 'checklist':
      return <ul className="visual-state-list">{labels.map((label, index) => <li key={index}><Icon name="check" size="sm" /><span><TabularText>{label}</TabularText></span></li>)}</ul>;
    case 'type':
      return <div className="visual-type-sample">
        <strong>{text(0)}</strong><span>{text(1)}</span><span>{text(2)}</span>
        {labels[3] && <span className="visual-type-numbers">{text(3)}</span>}
      </div>;
    case 'colour':
      return <ul className="visual-colours">{labels.map((label, index) => <li key={index}><span className={`visual-swatch visual-swatch-${index}`} aria-hidden="true" /><span><TabularText>{label}</TabularText></span></li>)}</ul>;
    case 'spacing':
      return <ul className="visual-spacing">{labels.map((label, index) => <li key={index}><span><TabularText>{label}</TabularText></span><span className="visual-measure" style={{ width: `${25 + index * 30}%` }} aria-hidden="true" /></li>)}</ul>;
    case 'responsive':
      return <div className="visual-responsive">
        <div className="visual-device visual-wide"><span>{text(0)}</span><div aria-hidden="true"><i /><i /><i /><i /></div></div>
        <div className="visual-device visual-narrow"><span>{text(1)}</span><div aria-hidden="true"><i /><i /><i /></div></div>
      </div>;
    case 'tokens':
      return <ol className="visual-token-chain">{labels.map((label, index) => <li key={index}><code>{label}</code>{index < labels.length - 1 && <Icon name="chevron-down" size="sm" />}</li>)}</ol>;
    case 'themes':
      return <div className="visual-themes">{labels.slice(0, 2).map((label, index) => <div className={index === 0 ? 'visual-theme-light' : 'visual-theme-dark'} key={index}>
        <Icon name={index === 0 ? 'sun' : 'moon'} size="sm" /><strong>{label}</strong><span aria-hidden="true" className="visual-theme-line" />
      </div>)}</div>;
    case 'feedback':
      return <ul className="visual-state-list visual-feedback">{labels.map((label, index) => <li key={index}><Icon name={index === 0 ? 'alert-triangle' : index === labels.length - 1 ? 'check-circle' : 'arrow-right'} size="sm" /><span><TabularText>{label}</TabularText></span></li>)}</ul>;
    case 'motion':
      return <ul className="visual-timing">{labels.map((label, index) => <li key={index}><span><TabularText>{label}</TabularText></span><span className={`visual-time-bar visual-time-${index}`} aria-hidden="true" /></li>)}</ul>;
    case 'direction':
      return <div className="visual-direction">
        <span><Icon name="arrow-right" size="sm" />{text(0)}</span>
        <span>{text(1)}<Icon name="arrow-left" size="sm" /></span>
        <code>{labels[2]}</code>
      </div>;
    case 'dashboard':
      return <div className="visual-dashboard"><strong className="visual-headline">{text(0)}</strong><span className="visual-muted">{text(1)}</span>
        <div className="visual-chart" aria-hidden="true">{[32, 48, 38, 67, 55, 82].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
        <span className="visual-receipt-line">{text(2)}</span>
      </div>;
    case 'pricing':
      return <div className="visual-pricing"><div>{labels.slice(0, 3).map((label, index) => <span key={index} className={index === 1 ? 'visual-plan visual-plan-featured' : 'visual-plan'}><Icon name={index === 1 ? 'check-circle' : 'layers'} size="sm" /><strong>{label}</strong></span>)}</div><span className="visual-muted">{text(3)}</span></div>;
    case 'permissions':
      return <ul className="visual-state-list visual-permissions">{labels.map((label, index) => <li key={index}><Icon name={index === 0 ? 'book-open' : index === 1 ? 'file-text' : 'alert-triangle'} size="sm" /><span><TabularText>{label}</TabularText></span></li>)}</ul>;
    case 'report':
      return <dl className="visual-report">{labels.slice(0, 3).map((label, index) => <div key={index}><dt>{label}</dt><dd><TabularText>{labels[index + 3] ?? ''}</TabularText></dd></div>)}</dl>;
    case 'scope':
      return <div className="visual-scope">{labels.map((label, index) => <span key={index}><Icon name={index === labels.length - 1 ? 'check-circle' : 'file-text'} size="sm" /><TabularText>{label}</TabularText></span>)}</div>;
    default:
      return null;
  }
}

export function ArticleVisual({ visual }: { visual: ArticleVisualData }) {
  return (
    <figure className="article-visual" data-explainer-visual data-visual-kind={visual.kind}>
      <div className="article-visual-title"><Icon name={visualIcons[visual.kind]} size="sm" /><span>{visual.title}</span></div>
      <div className="article-visual-scene"><ArticleVisualScene visual={visual} /></div>
      <figcaption>{visual.caption}</figcaption>
    </figure>
  );
}
