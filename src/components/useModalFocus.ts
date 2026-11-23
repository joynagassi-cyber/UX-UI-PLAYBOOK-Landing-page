'use client';

import { useEffect, type RefObject } from 'react';

/** Focus containment, Escape, scroll lock and focus restoration for overlay readers. */
export function useModalFocus(
  open: boolean,
  container: RefObject<HTMLDivElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // aria-modal describes the dialog, but does not make background controls
    // unfocusable or remove them from the accessibility tree. Inert each sibling
    // along the ancestor path, keeping this nested dialog and its ancestors live.
    const background: Array<{ element: HTMLElement; inert: boolean }> = [];
    let current: HTMLElement | null = container.current;
    while (current?.parentElement) {
      for (const sibling of current.parentElement.children) {
        if (sibling === current || !(sibling instanceof HTMLElement) || sibling.matches('script, style, link')) continue;
        background.push({ element: sibling, inert: sibling.inert });
        sibling.toggleAttribute('inert', true);
      }
      if (current.parentElement === document.body) break;
      current = current.parentElement;
    }
    const focusable = () => Array.from(container.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex="0"]',
    ) ?? []).filter((element) => element.getClientRects().length > 0);
    const initial = container.current?.querySelector<HTMLElement>('[data-modal-close]') ?? focusable()[0];
    initial?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const elements = focusable();
      const first = elements[0];
      const last = elements.at(-1);
      if (!first || !last) return;
      if (!container.current?.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      for (const { element, inert } of background) element.toggleAttribute('inert', inert);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [open, container, onClose]);
}
