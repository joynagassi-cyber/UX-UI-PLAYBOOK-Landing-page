'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { DesignVector } from './DesignVector';
import { Icon } from './Icon';
import { TabularText } from './TabularText';
import { DESIGN_LAB, type DesignRole, type LabStage } from '@/i18n/design-lab';
import type { Locale } from '@/i18n/content';

const roles: DesignRole[] = ['product', 'ux', 'ui'];
const stages: LabStage[] = ['service', 'slot', 'review'];
const slots = ['09:00', '10:30', '11:15', '14:00'];

/** Deliberately local: no API, account, personal data, payment or claimed real availability. */
export function DesignRolesLab({ locale, title, caption }: { locale: Locale; title: string; caption: string }) {
  const copy = DESIGN_LAB[locale];
  const [role, setRole] = useState<DesignRole>('product');
  const [stage, setStage] = useState<LabStage>('service');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [blockedSlot, setBlockedSlot] = useState<string | null>(null);
  const [failureArmed, setFailureArmed] = useState(false);
  const [error, setError] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  // A new request object also focuses repeated transitions to the same target;
  // no clearing setState/cascading render is necessary inside the effect.
  const [focusTarget, setFocusTarget] = useState<{ node: 'title' | 'error' } | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const annotation = copy.annotations[stage][role];

  useEffect(() => {
    if (focusTarget?.node === 'title') titleRef.current?.focus({ preventScroll: true });
    if (focusTarget?.node === 'error') errorRef.current?.focus({ preventScroll: true });
  }, [focusTarget]);

  const go = (next: LabStage) => {
    setStage(next);
    setError(false);
    setConfirmed(false);
    setFocusTarget({ node: 'title' });
  };
  const reset = () => {
    setStage('service'); setSelectedSlot(null); setBlockedSlot(null);
    setFailureArmed(false); setError(false); setConfirmed(false); setFocusTarget({ node: 'title' });
  };
  const reviewSelection = () => {
    if (!selectedSlot) return;
    if (failureArmed) {
      setBlockedSlot(selectedSlot); setSelectedSlot(null); setError(true);
      setFailureArmed(false); setFocusTarget({ node: 'error' });
    } else go('review');
  };
  const phoneTitle = confirmed ? copy.complete : stage === 'service' ? copy.service : stage === 'slot' ? copy.chooseTime : copy.review;

  return <section className="design-lab" data-mobile-lab aria-labelledby={`${id}-title`}>
    <header className="design-lab-header">
      <span className="design-lab-kicker">{copy.example}</span>
      <h3 className="notion-h3" id={`${id}-title`}>{title}</h3>
      <p className="design-lab-caption">{caption}</p>
    </header>
    <div className="design-lab-controls">
      <fieldset className="lab-control-group">
        <legend>{copy.viewpoints}</legend>
        <div>{roles.map((value) => <button key={value} type="button" data-role-choice={value} aria-pressed={role === value} onClick={() => setRole(value)}>
          <Icon name={value === 'product' ? 'compass' : value === 'ux' ? 'list-tree' : 'palette'} size="sm" />{copy.roles[value]}
        </button>)}</div>
      </fieldset>
      <fieldset className="lab-control-group lab-screen-controls">
        <legend>{copy.screens}</legend>
        <div>{stages.map((value, index) => <button key={value} type="button" data-screen-choice={value} aria-pressed={stage === value} onClick={() => go(value)}>
          <span aria-hidden="true">{index + 1}.</span> {copy.stages[value]}
        </button>)}</div>
      </fieldset>
    </div>
    <div className="design-lab-workspace">
      <div className="lab-phone-column">
        <div className="lab-phone" data-selected-role={role} data-phone-screen={stage} data-prototype-outcome={confirmed ? 'simulated' : 'none'}>
          <div className="phone-status" aria-hidden="true"><TabularText>09:41</TabularText><span className="phone-camera" /><span className="phone-signal"><i /><i /><i /><i /></span></div>
          <div className="phone-appbar"><span className="phone-app-mark"><Icon name="settings" size="sm" /></span><strong>{copy.app}</strong><span className="phone-example-dot" aria-hidden="true" /></div>
          <div className="phone-content">
            <div className="phone-step-line" data-phone-layer="ux">
              {stage !== 'service' && !confirmed && <button className="phone-back" type="button" onClick={() => go(stage === 'review' ? 'slot' : 'service')} aria-label={copy.back}><Icon name="arrow-left" size="sm" /></button>}
              <span>{copy.stages[stage]}</span><span className="phone-step-number"><TabularText>{`${stages.indexOf(stage) + 1} / 3`}</TabularText></span>
            </div>
            <h4 className="phone-title" ref={titleRef} tabIndex={-1}>{phoneTitle}</h4>
            {stage === 'service' && <>
              <div className="phone-hero-art"><DesignVector kind="bicycle" /></div>
              <div className="phone-service-card" data-phone-layer="product">
                <div className="phone-service-summary"><strong><TabularText>{copy.price}</TabularText></strong><span><Icon name="clock" size="sm" /><TabularText>{copy.duration}</TabularText></span></div>
                <p>{copy.serviceDescription}</p><p className="phone-small">{copy.inclusion}</p>
              </div>
              <div className="phone-location"><Icon name="map-pin" size="sm" /><div><strong>{copy.location}</strong><span>{copy.address}</span></div></div>
              <p className="phone-payment">{copy.payment}</p>
              <button className="phone-primary" type="button" onClick={() => go('slot')} data-phone-layer="ui">{copy.continue}<Icon name="arrow-right" size="sm" /></button>
            </>}
            {stage === 'slot' && <>
              <div className="phone-compact-service" data-phone-layer="product"><Icon name="bike" /><div><strong>{copy.service}</strong><span><TabularText>{`${copy.duration} · ${copy.price}`}</TabularText></span></div></div>
              <p className="phone-small">{copy.availability}</p>
              <div className="phone-date"><Icon name="calendar" size="sm" /><strong><TabularText>{copy.date}</TabularText></strong></div>
              <fieldset className="phone-slot-fieldset" data-phone-layer="ui"><legend>{copy.chooseTime}</legend>
                <div className="phone-slots">{slots.map((slot) => <button key={slot} type="button" className="phone-slot" disabled={blockedSlot === slot} aria-label={`${slot}${blockedSlot === slot ? `, ${copy.unavailable}` : selectedSlot === slot ? `, ${copy.selected}` : ''}`} aria-pressed={selectedSlot === slot} onClick={() => { setSelectedSlot(slot); setError(false); }}>
                  <TabularText>{slot}</TabularText>
                  {selectedSlot === slot && <span className="phone-slot-state"><Icon name="check" size="sm" />{copy.selected}</span>}
                  {blockedSlot === slot && <span className="phone-slot-state">{copy.unavailable}</span>}
                </button>)}</div>
              </fieldset>
              {error && <div className="phone-error" role="alert" tabIndex={-1} ref={errorRef}><Icon name="alert-triangle" size="sm" /><div><strong>{copy.rejection} <TabularText>{blockedSlot || ''}</TabularText></strong><p>{copy.retry}</p></div></div>}
              <div className="phone-booking-total" data-phone-layer="ux"><span>{copy.total}</span><strong><TabularText>{copy.price}</TabularText></strong></div>
              <p className="phone-small">{copy.payment}</p>
              <button className="phone-primary" type="button" disabled={!selectedSlot} onClick={reviewSelection}>{copy.review}<Icon name="arrow-right" size="sm" /></button>
            </>}
            {stage === 'review' && <>
              {confirmed && <div className="phone-confirmed" role="status"><Icon name="check-circle" size="xl" /><strong>{copy.noBooking}</strong><span><TabularText>{copy.reference}</TabularText></span></div>}
              <dl className="phone-review" data-phone-layer="ux">
                <div><dt>{copy.serviceLabel}</dt><dd>{copy.service} · <TabularText>{copy.duration}</TabularText></dd></div>
                <div><dt>{copy.timeLabel}</dt><dd><TabularText>{copy.date}</TabularText><br /><TabularText>{selectedSlot || '—'}</TabularText></dd></div>
                <div><dt>{copy.location}</dt><dd>{copy.address}</dd></div>
              </dl>
              <div className="phone-booking-total" data-phone-layer="product"><span>{copy.total}</span><strong><TabularText>{copy.price}</TabularText></strong></div>
              <p className="phone-payment">{copy.payment}</p><p className="phone-small">{copy.noCard}</p>
              {!selectedSlot && <p className="phone-missing" role="status">{copy.missing}</p>}
              {!confirmed && selectedSlot && <button className="phone-primary" type="button" data-phone-layer="ui" onClick={() => { setConfirmed(true); setFocusTarget({ node: 'title' }); }}>{copy.confirm}<Icon name="check" size="sm" /></button>}
              {!confirmed && <button className="phone-secondary" type="button" onClick={() => go('slot')}>{copy.change}</button>}
              {confirmed && <button className="phone-primary" type="button" onClick={reset}>{copy.reset}</button>}
            </>}
          </div>
          <div className="phone-home-indicator" aria-hidden="true" />
        </div>
      </div>
      <aside className="lab-annotation" aria-live="polite" aria-atomic="true">
        <div className="lab-annotation-label"><Icon name={role === 'product' ? 'compass' : role === 'ux' ? 'list-tree' : 'palette'} size="lg" /><span>{copy.roles[role]} · {copy.stages[stage]}</span></div>
        <h4>{annotation.title}</h4>
        <dl><div><dt>{copy.decision}</dt><dd>{annotation.decision}</dd></div><div><dt>{copy.check}</dt><dd>{annotation.check}</dd></div></dl>
        <div className="lab-annotation-rule"><Icon name="arrow-left" size="sm" /><span>{locale === 'fr' ? 'Les zones encadrées correspondent au regard choisi, sans masquer les autres informations.' : 'Outlined areas correspond to the selected viewpoint without hiding other information.'}</span></div>
      </aside>
    </div>
    <div className="lab-experiment-controls">
      <button type="button" data-simulate-conflict aria-pressed={failureArmed} onClick={() => { setFailureArmed(!failureArmed); if (confirmed) setConfirmed(false); }}><Icon name="alert-triangle" size="sm" />{copy.failure}</button>
      <button type="button" data-reset-prototype onClick={reset}><Icon name="arrow-left" size="sm" />{copy.reset}</button>
      <p role="status">{failureArmed ? copy.failureReady : copy.noBooking}</p>
    </div>
  </section>;
}
