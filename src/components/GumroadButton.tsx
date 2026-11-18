'use client';

import React, { useEffect, useState } from 'react';

interface GumroadButtonProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function GumroadButton({ href, className, children }: GumroadButtonProps) {
  const [finalHref, setFinalHref] = useState(href);

  useEffect(() => {
    try {
      const currentParams = new URLSearchParams(window.location.search);
      if ([...currentParams.keys()].length === 0) return;
      const target = new URL(href);
      for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'ref']) {
        const val = currentParams.get(key);
        if (val && !target.searchParams.has(key)) {
          target.searchParams.set(key, val);
        }
      }
      setFinalHref(target.toString());
    } catch {
      // Keep original href on parse error
    }
  }, [href]);

  return (
    <a
      href={finalHref}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
