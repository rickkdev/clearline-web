import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { getDictionary } from "../../../lib/dictionaries";
import { localeParam } from "../../../lib/locale-param";
import "./hero-options.css";

export const metadata: Metadata = {
  title: "Hero-Varianten – Riccardo Lamanna",
  robots: { index: false, follow: false },
};

type Home = ReturnType<typeof getDictionary>["home"];
type Hero = Home["hero"];
type Source = "Video" | "KI-Bild" | "Ohne Foto" | "Bestand";
type Variant = { id: string; name: string; source: Source; note: string; render: (home: Home) => ReactNode };

function Copy({ hero, dark = false, checks = true }: { hero: Hero; dark?: boolean; checks?: boolean }) {
  return (
    <div className={dark ? "ho-copy ho-dark" : "ho-copy"}>
      <div className="tag">{hero.tag}</div>
      <h1>{hero.title}<em>{hero.titleEmphasis}</em></h1>
      <p className="sub">{hero.sub}</p>
      <p className="hero-byline">{hero.byline}</p>
      {checks && (
        <ul className="ho-checks">
          {hero.checks.map((check) => <li key={check}>{check}</li>)}
        </ul>
      )}
      <div className="cta">
        <span className="btn">{hero.cta}</span>
        <span className="lnk">{hero.fieldsLink}</span>
      </div>
    </div>
  );
}

function Loop({ src, poster, className }: { src: string; poster: string; className?: string }) {
  return <video className={className} src={src} poster={poster} autoPlay muted loop playsInline preload="none" aria-hidden="true" />;
}

function PhotoHero({ hero, src, position = "70% 50%", dark = false, className = "" }: { hero: Hero; src: string; position?: string; dark?: boolean; className?: string }) {
  return (
    <div className={`ho-photo ${dark ? "is-dark" : "is-light"} ${className}`}>
      <Image src={src} alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: position }} />
      <div className="ho-inner"><Copy hero={hero} dark={dark} /></div>
    </div>
  );
}

const VARIANTS: Variant[] = [
  {
    id: "frame",
    name: "Editorial-Rahmen",
    source: "Video",
    note: "Enger Ausschnitt der Aufnahme, ohne Lampe und Fenster, farblich zurückgenommen. Rechteckiger Rahmen mit versetzter Orange-Fläche statt Tropfenform.",
    render: ({ hero }) => (
      <div className="ho-split ho-inner">
        <Copy hero={hero} />
        <div className="ho-frame"><Loop src="/hero-options/tight-loop.mp4" poster="/hero-options/tight-poster.jpg" /></div>
      </div>
    ),
  },
  {
    id: "mono",
    name: "Schwarzweiß-Loop",
    source: "Video",
    note: "Dieselbe Aufnahme in kontrastreichem Schwarzweiß. Die private Umgebung tritt zurück, Orange bleibt die einzige Farbe auf der Seite.",
    render: ({ hero }) => (
      <div className="ho-split ho-inner ho-mono">
        <Copy hero={hero} />
        <div className="ho-mono-media">
          <Loop src="/hero-options/mono-loop.mp4" poster="/hero-options/mono-poster.jpg" />
          <span className="ho-caption">Riccardo Lamanna · bei der Arbeit</span>
        </div>
      </div>
    ),
  },
  {
    id: "letterbox",
    name: "Kino-Letterbox",
    source: "Video",
    note: "Große Typografie oben, darunter ein breiter, cineastischer Streifen aus dem Video. Wirkt wie ein Filmstill statt wie ein Handyvideo.",
    render: ({ hero }) => (
      <div className="ho-letterbox">
        <div className="ho-inner ho-letterbox-top">
          <div>
            <div className="tag">{hero.tag}</div>
            <h1>{hero.title}<em>{hero.titleEmphasis}</em></h1>
          </div>
          <div className="ho-letterbox-side">
            <p className="sub">{hero.sub}</p>
            <div className="cta"><span className="btn">{hero.cta}</span></div>
          </div>
        </div>
        <Loop className="ho-letterbox-video" src="/hero-options/wide-loop.mp4" poster="/hero-options/wide-poster.jpg" />
      </div>
    ),
  },
  {
    id: "filmstrip",
    name: "Kontaktabzug",
    source: "Video",
    note: "Vier Standbilder als Bildfolge. Erzählt „konzentrierte Arbeit“, ohne dass ein Video laufen muss. Lädt schnell.",
    render: ({ hero }) => (
      <div className="ho-inner ho-filmstrip">
        <Copy hero={hero} checks={false} />
        <div className="ho-strip">
          {[1, 2, 3, 4].map((n) => (
            <figure key={n}>
              <Image src={`/hero-options/frame-${n}.jpg`} alt="" width={480} height={600} />
              <figcaption>{String(n).padStart(2, "0")}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "studio",
    name: "Studio-Porträt",
    source: "KI-Bild",
    note: "Neu generiert mit Codex: neutrales Studio, warmes Grau, ruhige Fläche links für den Text.",
    render: ({ hero }) => <PhotoHero hero={hero} src="/hero-options/studio.jpg" className="ho-veil" />,
  },
  {
    id: "office",
    name: "Modernes Büro",
    source: "KI-Bild",
    note: "Die Videoszene, professionell neu fotografiert: Laptop, Tageslicht, Mittelstandsbüro mit Beton und Eiche.",
    render: ({ hero }) => <PhotoHero hero={hero} src="/hero-options/office.jpg" className="ho-fade-left" />,
  },
  {
    id: "workshop",
    name: "Workshop am Whiteboard",
    source: "KI-Bild",
    note: "Zeigt die eigentliche Arbeit: mit dem Team Prozesse aufnehmen. Dunkler Verlauf für weiße Schrift.",
    render: ({ hero }) => <PhotoHero hero={hero} src="/hero-options/workshop.jpg" dark className="ho-scrim-left" />,
  },
  {
    id: "factory",
    name: "In der Produktion",
    source: "KI-Bild",
    note: "Forward Deployed heißt vor Ort. Werkhalle eines Mittelständlers, Laptop in der Hand, im Gespräch mit einem Ingenieur.",
    render: ({ hero }) => <PhotoHero hero={hero} src="/hero-options/factory.jpg" dark className="ho-scrim-left" />,
  },
  {
    id: "night",
    name: "Dunkler Modus",
    source: "KI-Bild",
    note: "Low-Key-Aufnahme am Laptop, vom Bildschirm beleuchtet. Technischer, ernster Ton für ein Engineering-Profil.",
    render: ({ hero }) => <PhotoHero hero={hero} src="/hero-options/night.jpg" dark className="ho-scrim-left" />,
  },
  {
    id: "thinking",
    name: "Ruhiger Moment",
    source: "KI-Bild",
    note: "Blick aus dem Fenster, weiches Nordlicht, viel Weißraum. Premium und zurückhaltend, nach dem Profilblick aus dem Video.",
    render: ({ hero }) => <PhotoHero hero={hero} src="/hero-options/thinking.jpg" className="ho-fade-left" />,
  },
  {
    id: "stage",
    name: "Auf der Bühne",
    source: "KI-Bild",
    note: "Vortragssituation mit Publikum im Vordergrund. Signalisiert Expertise und Sichtbarkeit, passend zu den echten Speaking-Terminen.",
    render: ({ hero }) => <PhotoHero hero={hero} src="/hero-options/stage.jpg" dark className="ho-scrim-left" />,
  },
  {
    id: "team",
    name: "Mit dem Kundenteam",
    source: "KI-Bild",
    note: "Am Tisch mit Fachbereich und IT, gemeinsam am Laptop. Übersetzt „umgesetzt mit Fachbereich, IT und Kontrollfunktionen“ direkt ins Bild.",
    render: ({ hero }) => <PhotoHero hero={hero} src="/hero-options/team.jpg" className="ho-fade-left" />,
  },
  {
    id: "duotone",
    name: "Duoton-Porträt",
    source: "KI-Bild",
    note: "Schwarzweiß-Porträt mit Orange-Duoton. Markant und markenkonsistent, funktioniert auch als Social-Bild.",
    render: ({ hero }) => (
      <div className="ho-split ho-inner">
        <Copy hero={hero} />
        <div className="ho-duotone"><Image src="/hero-options/mono.jpg" alt="" fill sizes="(max-width: 760px) 100vw, 45vw" /></div>
      </div>
    ),
  },
  {
    id: "cutout",
    name: "Freisteller auf Markenform",
    source: "KI-Bild",
    note: "Freigestelltes Porträt vor der orangefarbenen Tropfenform. Behält die bestehende Bildsprache, aber mit sauberem Motiv. Hinweis: Codex hat hier das bestehende Porträt als Vorlage genommen, nicht das Video.",
    render: ({ hero }) => (
      <div className="ho-split ho-inner">
        <Copy hero={hero} />
        <div className="ho-cutout">
          <div className="ho-blob" />
          <Image src="/hero-options/cutout.webp" alt="" fill sizes="(max-width: 760px) 100vw, 45vw" />
        </div>
      </div>
    ),
  },
  {
    id: "portrait",
    name: "Bestehendes Porträt, sauber gerahmt",
    source: "Bestand",
    note: "Das vorhandene Porträt statt Video, als rechte Bildhälfte ohne Tropfenform. Kleinste Änderung gegenüber heute.",
    render: ({ hero }) => <PhotoHero hero={hero} src="/hero-hq.webp" position="80% 30%" className="ho-fade-left" />,
  },
  {
    id: "speaking",
    name: "Bühne als Beweis",
    source: "Bestand",
    note: "Ein Vortragsfoto als dunkler Hintergrund. Glaubwürdigkeit über Auftritte statt über ein Porträt.",
    render: ({ hero }) => <PhotoHero hero={hero} src="/speaking/ai-agents-summit-1.jpg" position="50% 40%" dark className="ho-scrim-full" />,
  },
  {
    id: "type",
    name: "Reine Typografie",
    source: "Ohne Foto",
    note: "Kein Bild. Sehr große Schrift, eine Linie, ein kleines rundes Porträt in der Byline. Wirkt selbstbewusst und lädt sofort.",
    render: ({ hero }) => (
      <div className="ho-inner ho-type">
        <div className="tag">{hero.tag}</div>
        <h1>{hero.title}<em>{hero.titleEmphasis}</em></h1>
        <div className="ho-type-row">
          <p className="sub">{hero.sub}</p>
          <div className="ho-type-by">
            <Image src="/hero-options/tight-poster.jpg" alt="" width={56} height={56} />
            <span>{hero.byline}</span>
          </div>
          <div className="cta"><span className="btn">{hero.cta}</span></div>
        </div>
      </div>
    ),
  },
  {
    id: "proof",
    name: "Ergebnisse zuerst",
    source: "Ohne Foto",
    note: "Statt Foto stehen die Kennzahlen rechts. Für Entscheider, die zuerst wissen wollen, was herauskommt.",
    render: ({ hero, results }) => (
      <div className="ho-split ho-inner">
        <Copy hero={hero} checks={false} />
        <ul className="ho-proof">
          {results.kpis.map((k) => <li key={k.value}><strong>{k.value}</strong><span>{k.lead}</span></li>)}
        </ul>
      </div>
    ),
  },
  {
    id: "bento",
    name: "Bento-Mosaik",
    source: "KI-Bild",
    note: "Mehrere Motive plus eine Kennzahl als Raster. Zeigt Breite (Workshop, Fokus, Ergebnis) ohne ein einzelnes Bild tragen zu müssen.",
    render: ({ hero, results }) => (
      <div className="ho-split ho-inner">
        <Copy hero={hero} checks={false} />
        <div className="ho-bento">
          <div className="ho-bento-a"><Image src="/hero-options/workshop.jpg" alt="" fill sizes="30vw" /></div>
          <div className="ho-bento-b"><Image src="/hero-options/studio.jpg" alt="" fill sizes="20vw" style={{ objectPosition: "72% 30%" }} /></div>
          <div className="ho-bento-kpi"><strong>{results.kpis[0].value}</strong><span>{results.kpis[0].lead}</span></div>
          <div className="ho-bento-c"><Image src="/hero-options/night.jpg" alt="" fill sizes="30vw" style={{ objectPosition: "70% 50%" }} /></div>
        </div>
      </div>
    ),
  },
  {
    id: "flow",
    name: "Prozess-Diagramm",
    source: "Ohne Foto",
    note: "Animiertes Schema: Prozess → KI-Agent → Ergebnis, mit Prüfschritt. Zeigt, was gebaut wird, statt wer es baut.",
    render: ({ hero }) => (
      <div className="ho-split ho-inner">
        <Copy hero={hero} />
        <svg className="ho-flow" viewBox="0 0 420 420" aria-hidden="true">
          <path className="ho-flow-line" d="M80 90 C 200 90, 220 210, 210 210 M210 210 C 200 210, 220 330, 340 330 M210 210 L 340 120" />
          {[
            { x: 80, y: 90, t: "Eingang", s: "E-Mail, PDF, Ticket" },
            { x: 210, y: 210, t: "KI-Agent", s: "liest, ordnet, entwirft", hot: true },
            { x: 340, y: 120, t: "Prüfung", s: "Mensch gibt frei" },
            { x: 340, y: 330, t: "System", s: "ERP, CRM, DMS" },
          ].map((n) => (
            <g key={n.t} transform={`translate(${n.x} ${n.y})`}>
              <rect x="-66" y="-30" width="132" height="60" rx="8" className={n.hot ? "hot" : ""} />
              <text y="-4">{n.t}</text>
              <text y="16" className="s">{n.s}</text>
            </g>
          ))}
          <circle r="6" className="ho-flow-dot"><animateMotion dur="4s" repeatCount="indefinite" path="M80 90 C 200 90, 220 210, 210 210 C 200 210, 220 330, 340 330" /></circle>
        </svg>
      </div>
    ),
  },
  {
    id: "terminal",
    name: "Agent bei der Arbeit",
    source: "Ohne Foto",
    note: "Ein stilisiertes Arbeitsfenster mit einem Agenten, der einen Vorgang abarbeitet. Passt zur Positionierung als Forward Deployed Engineer.",
    render: ({ hero }) => (
      <div className="ho-dark-band">
        <div className="ho-split ho-inner">
          <Copy hero={hero} dark />
          <div className="ho-window">
            <div className="ho-window-bar"><i /><i /><i /><span>agent · rechnungseingang</span></div>
            <pre>{`› Neue E-Mail: Rechnung_4711.pdf
  ✓ Lieferant erkannt     Müller GmbH
  ✓ Bestellung gefunden   PO-2026-0815
  ✓ Beträge abgeglichen   1.284,00 €
  ! Abweichung Skonto     2 % statt 3 %
› Entwurf an Buchhaltung zur Freigabe
  ⏵ wartet auf Prüfung …`}</pre>
          </div>
        </div>
      </div>
    ),
  },
];

export default async function HeroOptionsPage({ params }: PageProps<"/[lang]/hero-options">) {
  const lang = await localeParam(params);
  const { home } = getDictionary(lang);
  return (
    <main className="ho-page">
      <header className="w speaking-page-header">
        <Link className="lnk" href="/">← Zur Startseite</Link>
        <div className="tag">Hero · {VARIANTS.length} Varianten</div>
        <h1>Welcher Hero passt?</h1>
        <p className="intro">
          Alternativen zum aktuellen Video. Einige nutzen Ausschnitte aus Ihrer Aufnahme,
          einige sind mit Codex neu generiert, einige kommen ganz ohne Foto aus.
          Alle zeigen den echten Hero-Text. Nennen Sie mir Ihre Favoriten per Nummer.
        </p>
        <nav className="ho-jump" aria-label="Varianten">
          {VARIANTS.map((v, i) => <a key={v.id} href={`#${v.id}`}>{String(i + 1).padStart(2, "0")} {v.name}</a>)}
        </nav>
      </header>
      {VARIANTS.map((v, i) => (
        <section key={v.id} id={v.id} className="ho-variant">
          <div className="w ho-label">
            <h2>{String(i + 1).padStart(2, "0")} · {v.name}</h2>
            <span className="ho-source">{v.source}</span>
            <p>{v.note}</p>
          </div>
          <div className="ho-stage">{v.render(home)}</div>
        </section>
      ))}
    </main>
  );
}
