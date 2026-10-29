import type { ArticleVisual } from "../lib/article-visuals";
import type { Locale } from "../lib/i18n";

function Artwork({ artwork }: { artwork: ArticleVisual["artwork"] }) {
  switch (artwork) {
    case "civic":
      return <><circle cx="535" cy="115" r="78" fill="#F18A00" /><path d="M415 194 532 130l119 64v19H415z" fill="#F6F6F6" /><path d="M437 216h190v116H437z" fill="#7DB6D6" /><path d="M460 227v105m43-105v105m43-105v105m43-105v105" stroke="#202724" strokeWidth="12" /><path d="M421 332h222" stroke="#F6F6F6" strokeWidth="12" /></>;
    case "library":
      return <><circle cx="552" cy="108" r="55" fill="#7DB6D6" /><path d="M405 160h220v176H405z" fill="#F6F6F6" /><path d="M405 160h104v176H405z" fill="#F18A00" /><path d="M509 160h116v176H509z" fill="#D8D8D8" /><path d="M430 191v111m28-111v111m78-111v111m30-111v111m30-111v111" stroke="#202724" strokeWidth="10" /><path d="M393 338h244" stroke="#7DB6D6" strokeWidth="10" /></>;
    case "loop":
      return <><circle cx="533" cy="222" r="118" fill="none" stroke="#7DB6D6" strokeWidth="8" strokeDasharray="418 42" transform="rotate(-42 533 222)" /><circle cx="420" cy="127" r="28" fill="#F18A00" /><circle cx="651" cy="214" r="28" fill="#F6F6F6" /><circle cx="475" cy="324" r="28" fill="#7DB6D6" /><path d="m520 226 28 28 52-63" fill="none" stroke="#F18A00" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" /></>;
    case "workspace":
      return <><circle cx="566" cy="202" r="112" fill="#F18A00" /><path d="M405 112h175v218H405z" fill="#F6F6F6" /><path d="M429 144h118v152H429z" fill="#202724" /><path d="M449 176h73m-73 28h54m-54 28h83m-83 28h42" stroke="#7DB6D6" strokeWidth="9" strokeLinecap="square" /><path d="M405 330h220" stroke="#7DB6D6" strokeWidth="12" /></>;
    case "isolation":
      return <><circle cx="580" cy="204" r="130" fill="#7DB6D6" /><path d="M420 84h222v240H420z" fill="#202724" stroke="#F6F6F6" strokeWidth="8" /><path d="M450 112h162v184H450z" fill="#F18A00" /><circle cx="530" cy="196" r="49" fill="#F6F6F6" /><path d="M514 196h33m-16-16v33" stroke="#202724" strokeWidth="9" /></>;
    case "browser":
      return <><path d="M403 111h240v204H403z" fill="#F6F6F6" /><path d="M403 111h240v34H403z" fill="#7DB6D6" /><circle cx="424" cy="128" r="6" fill="#202724" /><circle cx="445" cy="128" r="6" fill="#202724" /><path d="M430 172h102v102H430z" fill="#202724" /><circle cx="581" cy="217" r="48" fill="#F18A00" /><path d="m560 218 15 15 29-34" fill="none" stroke="#F6F6F6" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" /><path d="M430 292h193" stroke="#202724" strokeWidth="9" /></>;
    case "server":
      return <><circle cx="532" cy="203" r="125" fill="#F18A00" /><path d="M481 91h106v226H481z" fill="#F6F6F6" /><path d="M496 112h76v47h-76zm0 65h76v47h-76zm0 65h76v47h-76z" fill="#202724" /><circle cx="557" cy="135" r="6" fill="#7DB6D6" /><circle cx="557" cy="200" r="6" fill="#7DB6D6" /><circle cx="557" cy="265" r="6" fill="#7DB6D6" /><path d="M431 336h206" stroke="#7DB6D6" strokeWidth="10" /></>;
    case "knowledge":
      return <><circle cx="553" cy="110" r="59" fill="#F18A00" /><path d="m413 148 115 24v171l-115-28zm115 24 115-24v167l-115 28z" fill="#F6F6F6" /><path d="M435 193l68 14m-68 17 68 14m-68 17 68 14m80-56 68-14m-68 31 68-14m-68 31 68-14" stroke="#7DB6D6" strokeWidth="8" /><path d="M528 171v173" stroke="#202724" strokeWidth="8" /></>;
    case "access":
      return <><path d="M421 333V204a112 112 0 0 1 224 0v129" fill="none" stroke="#F6F6F6" strokeWidth="20" /><path d="M433 259h118" fill="none" stroke="#7DB6D6" strokeWidth="12" /><path d="M548 259h95" fill="none" stroke="#F18A00" strokeWidth="12" strokeDasharray="10 14" /><path d="M563 226v67" stroke="#F18A00" strokeWidth="14" /><circle cx="445" cy="259" r="17" fill="#7DB6D6" /><circle cx="647" cy="259" r="17" fill="#F18A00" /></>;
  }
}

export function ArticleFigure({ visual: { id, artwork, cover, text }, locale, thumbnail = false }: { visual: ArticleVisual; locale: Locale; thumbnail?: boolean }) {
  const copy = text[locale];
  const coverCopy = cover && { eyebrow: cover.eyebrow[locale], hook: cover.hook[locale], label: cover.label[locale] };

  return (
    <figure className={`article-figure${thumbnail ? " article-figure-thumbnail" : ""}`} aria-label={copy.title}>
      <div className="article-figure-art">
        <svg viewBox="0 0 720 405" preserveAspectRatio="xMidYMid slice" role="img" aria-label={copy.alt}>
          <defs><pattern id={`grid-${id}`} width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0v36" fill="none" stroke="#FFFFFF" strokeOpacity=".07" strokeWidth="1" /></pattern></defs>
          <path fill="#202724" d="M0 0h720v405H0z" />
          <path fill={`url(#grid-${id})`} d="M0 0h720v405H0z" />
          <Artwork artwork={artwork} />
        </svg>
        {coverCopy && <div className="article-figure-copy"><span>{coverCopy.eyebrow}</span><strong>{coverCopy.hook}</strong><small>{coverCopy.label}</small></div>}
      </div>
      {!thumbnail && <figcaption><strong>{copy.title}</strong><span>{copy.caption}</span></figcaption>}
    </figure>
  );
}
