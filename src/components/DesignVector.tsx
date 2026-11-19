/** Original vector drawings. Their adjacent HTML labels/captions provide the equivalent text. */
export function DesignVector({ kind }: { kind: 'discipline-map' | 'decision-loop' | 'bicycle' }) {
  if (kind === 'bicycle') {
    return <svg className="design-vector bicycle-vector" data-vector-illustration={kind} viewBox="0 0 320 150" fill="none" strokeWidth="3" aria-hidden="true" focusable="false">
      <path className="vector-grid" d="M16 125H304M48 18V136M112 18V136M176 18V136M240 18V136M304 18V136" />
      <rect className="vector-surface" x="236" y="14" width="62" height="42" rx="10" />
      <path className="vector-accent" d="m252 35 9 9 21-24" />
      <circle className="vector-ink" cx="78" cy="102" r="33" /><circle className="vector-ink" cx="242" cy="102" r="33" />
      <path className="vector-accent" d="m78 102 42-63 42 63H78l24-45h105l35 45M162 102l39-72h23M192 30h17l13 12M107 39h27" />
      <circle className="vector-ink" cx="162" cy="102" r="7" /><path className="vector-ink" d="m162 102 12 13h13M72 102h12M236 102h12" />
      <path className="vector-ink" d="M25 30v22m-11-11h22M278 86v14m-7-7h14" />
    </svg>;
  }
  if (kind === 'discipline-map') {
    return <svg className="design-vector" data-vector-illustration={kind} viewBox="0 0 480 200" fill="none" strokeWidth="3" aria-hidden="true" focusable="false">
      <path className="vector-grid" d="M24 32H456M24 100H456M24 168H456M80 16V184M240 16V184M400 16V184" />
      <rect className="vector-surface" x="34" y="44" width="172" height="114" rx="22" />
      <rect className="vector-surface" x="152" y="22" width="176" height="156" rx="22" />
      <rect className="vector-surface" x="274" y="44" width="172" height="114" rx="22" />
      <path className="vector-ink" d="M67 82h96M67 101h65M67 120h82M312 81h97M312 103h65" />
      <circle className="vector-accent" cx="240" cy="100" r="28" />
      <path className="vector-accent" d="m227 100 9 9 18-19M188 100h24m56 0h24M240 48v24m0 56v24" />
      <rect className="vector-accent" x="313" y="125" width="66" height="15" rx="7" />
      <circle className="vector-ink" cx="121" cy="181" r="5" /><circle className="vector-ink" cx="240" cy="190" r="5" /><circle className="vector-ink" cx="358" cy="181" r="5" />
    </svg>;
  }
  return <svg className="design-vector" data-vector-illustration={kind} viewBox="0 0 480 200" fill="none" strokeWidth="3" aria-hidden="true" focusable="false">
    <path className="vector-grid" d="M24 44H456M24 100H456M24 156H456M80 20V180M240 20V180M400 20V180" />
    <rect className="vector-surface" x="18" y="53" width="116" height="94" rx="18" />
    <rect className="vector-surface" x="182" y="53" width="116" height="94" rx="18" />
    <rect className="vector-surface" x="346" y="53" width="116" height="94" rx="18" />
    <path className="vector-ink" d="M48 84h55M48 100h39M48 116h46M211 79h58v43h-58zM211 92h58M221 111h15M374 113l14-16 13 7 29-27" />
    <path className="vector-accent" d="M134 100h42m-10-9 10 9-10 9M298 100h42m-10-9 10 9-10 9M405 148v24H76v-18m-9 9 9-9 9 9" />
    <circle className="vector-accent" cx="405" cy="82" r="20" /><path className="vector-accent" d="m398 82 5 5 9-10" />
  </svg>;
}
