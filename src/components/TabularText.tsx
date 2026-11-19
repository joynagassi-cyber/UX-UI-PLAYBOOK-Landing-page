import { Fragment } from 'react';

/**
 * Domine has proportional digits and no OpenType tnum feature. Keep the exact
 * typeface while giving numeric data equal-width digit cells. The actual text
 * is unchanged for selection, copying and the accessibility tree.
 */
export function TabularText({ children }: { children: string }) {
  return children.split(/(\d+(?:[.,:/–-]\d+)*%?)/g).map((part, index) => (
    /\d/.test(part) ? (
      <span className="tabular-run" key={index}>
        {Array.from(part, (character, digitIndex) => /\d/.test(character) ? (
          <span className="tabular-digit" key={digitIndex}>{character}</span>
        ) : <Fragment key={digitIndex}>{character}</Fragment>)}
      </span>
    ) : <Fragment key={index}>{part}</Fragment>
  ));
}
