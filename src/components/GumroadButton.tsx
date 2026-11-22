'use client';

import React, { useSyncExternalStore } from 'react';
import { browserSearch, serverSearch, subscribeSearch } from '@/lib/browser-stores';

interface GumroadButtonProps {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export function GumroadButton({ href, className, style, children }: GumroadButtonProps) {
  const search = useSyncExternalStore(subscribeSearch, browserSearch, serverSearch);
  let finalHref = href;
  if (search) {
    try {
      const currentParams = new URLSearchParams(search);
      const target = new URL(href);
      // Forward only the existing attribution allowlist. Never arbitrary URL
      // parameters, and never move a query string after a #fragment.
      for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'ref']) {
        const val = currentParams.get(key);
        if (val && !target.searchParams.has(key)) target.searchParams.set(key, val);
      }
      finalHref = target.toString();
    } catch {
      // Keep the original href if configuration is invalid.
    }
  }

  return (
    <a
      href={finalHref}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
