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

const ROUND_ONE: Variant[] = [
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

type Layout = "light" | "dark" | "veil" | "half" | "tear-hero" | "tear" | "tear-flip" | "blob" | "circle" | "arch" | "slant" | "card" | "offset" | "duo-tear";
type Shot = { id: string; name: string; src: string; layout: Layout; note: string; position?: string };

function ShapeHero({ hero, src, shape, position = "50% 30%" }: { hero: Hero; src: string; shape: Layout; position?: string }) {
  return (
    <div className="ho-split ho-inner">
      <Copy hero={hero} />
      <div className={`ho-shape ho-shape-${shape}`}>
        <Image src={src} alt="" fill sizes="(max-width: 860px) 100vw, 45vw" style={{ objectFit: "cover", objectPosition: position }} />
      </div>
    </div>
  );
}

const LAYOUTS: Record<Layout, (hero: Hero, shot: Shot) => ReactNode> = {
  light: (hero, s) => <PhotoHero hero={hero} src={s.src} position={s.position} className="ho-fade-left" />,
  dark: (hero, s) => <PhotoHero hero={hero} src={s.src} position={s.position} dark className="ho-scrim-left" />,
  veil: (hero, s) => <PhotoHero hero={hero} src={s.src} position={s.position} className="ho-veil" />,
  half: (hero, s) => (
    <div className="ho-half">
      <div className="ho-half-media"><Image src={s.src} alt="" fill sizes="(max-width: 860px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: s.position ?? "60% 40%" }} /></div>
      <div className="ho-inner"><Copy hero={hero} /></div>
    </div>
  ),
  "tear-hero": (hero, s) => (
    <div className="ho-tear-hero">
      <div className="ho-tear-hero-media"><Image src={s.src} alt="" fill sizes="(max-width: 860px) 100vw, 52vw" style={{ objectFit: "cover", objectPosition: s.position ?? "60% 30%" }} /></div>
      <div className="ho-inner"><Copy hero={hero} /></div>
    </div>
  ),
  tear: (hero, s) => <ShapeHero hero={hero} src={s.src} shape="tear" position={s.position} />,
  "tear-flip": (hero, s) => <ShapeHero hero={hero} src={s.src} shape="tear-flip" position={s.position} />,
  blob: (hero, s) => <ShapeHero hero={hero} src={s.src} shape="blob" position={s.position} />,
  circle: (hero, s) => <ShapeHero hero={hero} src={s.src} shape="circle" position={s.position} />,
  arch: (hero, s) => <ShapeHero hero={hero} src={s.src} shape="arch" position={s.position} />,
  slant: (hero, s) => <ShapeHero hero={hero} src={s.src} shape="slant" position={s.position} />,
  card: (hero, s) => <ShapeHero hero={hero} src={s.src} shape="card" position={s.position} />,
  offset: (hero, s) => <ShapeHero hero={hero} src={s.src} shape="offset" position={s.position} />,
  "duo-tear": (hero, s) => <ShapeHero hero={hero} src={s.src} shape="duo-tear" position={s.position} />,
};

const LAYOUT_NAMES: Record<Layout, string> = {
  light: "Vollbild hell", dark: "Vollbild dunkel", veil: "Vollbild mit Schleier", half: "Halbe Seite randlos",
  "tear-hero": "Tropfenform wie heute", tear: "Tropfen", "tear-flip": "Tropfen gespiegelt", blob: "Organische Form",
  circle: "Kreis", arch: "Bogen", slant: "Schräge Kante", card: "Karte", offset: "Versetzter Rahmen", "duo-tear": "Duoton-Tropfen",
};

const A = (file: string) => `/hero-options/ai/${file}.jpg`;
const R1 = (file: string) => `/hero-options/${file}.jpg`;

const GALLERY: Shot[] = [
  { id: "g-tear-office", name: "Büro im Tropfen", src: R1("office"), layout: "tear-hero", position: "72% 40%", note: "Das Büro-Motiv in exakt der Tropfenform der heutigen Startseite. Direkter Ersatz für das Video, ohne Layoutänderung." },
  { id: "g-tear-studio", name: "Studio im Tropfen", src: R1("studio"), layout: "tear-hero", position: "75% 30%", note: "Studio-Porträt in der heutigen Tropfenform." },
  { id: "g-tear-night", name: "Abendstimmung im Tropfen", src: R1("night"), layout: "tear-hero", position: "72% 40%", note: "Dunkles Motiv im hellen Layout. Der Kontrast macht die Form zum Blickfang." },
  { id: "g-tear-team", name: "Kundenteam im Tropfen", src: R1("team"), layout: "tear-hero", position: "68% 40%", note: "Team-Szene in der heutigen Tropfenform." },
  { id: "g-tear-workshop", name: "Workshop im Tropfen", src: R1("workshop"), layout: "tear-hero", position: "65% 35%", note: "Whiteboard-Szene in der Tropfenform." },
  { id: "g-tear-thinking", name: "Ruhiger Moment im Tropfen", src: R1("thinking"), layout: "tear-hero", position: "70% 40%", note: "Fensterblick in der Tropfenform." },
  { id: "g-tear-sq-office", name: "Tropfen: am Laptop", src: A("teardrop-office"), layout: "tear", note: "Eigens für die Tropfenform generiert: zentriertes Motiv mit Luft um den Kopf." },
  { id: "g-tear-sq-smile", name: "Tropfen: Lächeln", src: A("teardrop-smile"), layout: "tear", note: "Freundliches Porträt, zentriert für den Tropfen-Ausschnitt." },
  { id: "g-tear-sq-think", name: "Tropfen gespiegelt: nachdenklich", src: A("teardrop-think"), layout: "tear-flip", note: "Gespiegelte Tropfenform, die Spitze zeigt nach links zum Text." },
  { id: "g-tear-sq-workshop", name: "Tropfen: am Whiteboard", src: A("teardrop-workshop"), layout: "tear", note: "Arbeitssituation statt Porträt, im Tropfen." },
  { id: "g-tear-sq-night", name: "Tropfen: nachts am Laptop", src: A("teardrop-night"), layout: "tear-flip", note: "Dunkles Motiv im gespiegelten Tropfen." },
  { id: "g-tear-sq-factory", name: "Organische Form: Werkhalle", src: A("teardrop-factory"), layout: "blob", note: "Weiche, organische Form statt Tropfen. In der Produktion, Schutzbrille im Haar." },
  { id: "g-tear-sq-outdoor", name: "Kreis: draußen", src: A("teardrop-outdoor"), layout: "circle", note: "Klassischer Kreis. Ruhig und vertraut." },
  { id: "g-tear-sq-stage", name: "Tropfen: Bühne", src: A("teardrop-stage"), layout: "tear", note: "Vortrag mit Headset, im Tropfen." },
  { id: "g-tear-sq-mono", name: "Duoton-Tropfen", src: A("teardrop-mono"), layout: "duo-tear", note: "Schwarzweiß-Porträt, orange eingefärbt und im Tropfen." },
  { id: "g-headshot-blob", name: "Organische Form: Headshot", src: A("headshot"), layout: "blob", note: "Klassischer Business-Headshot in weicher Form." },
  { id: "g-headshot-outdoor", name: "Kreis: Headshot im Grünen", src: A("headshot-outdoor"), layout: "circle", note: "Natürliches Licht, Kreisausschnitt." },
  { id: "g-studio-blue", name: "Bogen: Studio Blau", src: A("studio-blue"), layout: "arch", note: "Dunkelblauer Studiohintergrund im Bogen. Seriös, ruhig." },
  { id: "g-studio-orange", name: "Karte: Studio Orange", src: A("studio-orange"), layout: "card", note: "Porträt vor Markenorange. Sehr markant." },
  { id: "g-studio-white", name: "Bogen: High-Key", src: A("studio-white"), layout: "arch", note: "Helles Studio, weicher Bogen. Sehr clean." },
  { id: "g-studio-dark", name: "Versetzter Rahmen: Low-Key", src: A("studio-dark"), layout: "offset", note: "Dramatisches Licht, mit orangefarbenem Versatz." },
  { id: "g-profile", name: "Schräge Kante: Profil", src: A("profile"), layout: "slant", note: "Profilansicht mit diagonal angeschnittener Bildkante." },
  { id: "g-laugh", name: "Karte: Lachen", src: A("laugh"), layout: "card", note: "Echtes Lachen. Nahbar, sympathisch." },
  { id: "g-lean-wall", name: "Schräge Kante: an der Wand", src: A("lean-wall"), layout: "slant", note: "Selbstbewusste Pose vor Beton." },
  { id: "g-glasses", name: "Versetzter Rahmen: Brille", src: A("glasses"), layout: "offset", note: "Porträt mit Brille in der Hand, sachlich." },
  { id: "g-chair", name: "Bogen: Stuhl", src: A("chair"), layout: "arch", note: "Lockere Pose auf dem Stuhl, Studio." },
  { id: "g-boardroom", name: "Im Boardroom", src: A("boardroom"), layout: "light", note: "Präsentation vor der Geschäftsführung." },
  { id: "g-rooftop", name: "Dachterrasse, goldene Stunde", src: A("rooftop"), layout: "half", note: "Skyline im Hintergrund, warmes Licht." },
  { id: "g-coworking", name: "Coworking", src: A("coworking"), layout: "light", note: "Ruhiger, hochwertiger Arbeitsplatz mit Pflanzen." },
  { id: "g-standing-desk", name: "Am Stehtisch", src: A("standing-desk"), layout: "half", note: "Zwei Bildschirme, Blick in die Kamera. Bild randlos auf der rechten Hälfte." },
  { id: "g-hallway", name: "Im Flur, in Bewegung", src: A("hallway"), layout: "light", note: "Dynamisch, unterwegs zum nächsten Termin." },
  { id: "g-cafe", name: "Im Café", src: A("cafe"), layout: "light", note: "Entspannt, Laptop und Espresso." },
  { id: "g-library", name: "Bibliothek", src: A("library"), layout: "half", note: "Liest ein Prozessdokument. Gründlich, ruhig." },
  { id: "g-warehouse", name: "Im Lager", src: A("warehouse"), layout: "dark", note: "Logistik beim Mittelständler, mit Lagerleiter." },
  { id: "g-lab", name: "Im Labor", src: A("lab"), layout: "dark", note: "Engineering-Umfeld mit Techniker." },
  { id: "g-handshake", name: "Handschlag", src: A("handshake"), layout: "half", note: "Mit einem Inhaber am Eingang. Vertrauen und Abschluss." },
  { id: "g-sticky-notes", name: "Prozess-Mapping", src: A("sticky-notes"), layout: "light", note: "Haftnotizen an der Glaswand, Blick zurück zur Kamera." },
  { id: "g-video-call", name: "Im Video-Call", src: A("video-call"), layout: "half", note: "Remote-Beratung, erklärend." },
  { id: "g-train", name: "Im ICE", src: A("train"), layout: "dark", note: "Unterwegs zum Kunden, Arbeit im Zug." },
  { id: "g-night-city", name: "Nachts über der Stadt", src: A("night-city"), layout: "dark", note: "Hochhausfenster, Lichter der Stadt." },
  { id: "g-whiteboard-close", name: "Nah am Glasboard", src: A("whiteboard-close"), layout: "half", note: "Nahaufnahme beim Skizzieren." },
  { id: "g-server-room", name: "Im Serverraum", src: A("server-room"), layout: "dark", note: "Technik und Betrieb, kühle Töne mit orangem Akzent." },
  { id: "g-podium", name: "Am Rednerpult", src: A("podium"), layout: "dark", note: "Konferenzvortrag, warme Bühne." },
  { id: "g-panel", name: "Auf dem Panel", src: A("panel"), layout: "dark", note: "Diskussionsrunde, Mikrofon in der Hand." },
  { id: "g-outdoor-walk", name: "Vor dem Firmensitz", src: A("outdoor-walk"), layout: "veil", note: "Vor einem modernen Mittelstands-Gebäude." },
  { id: "g-kitchen-table", name: "Am Gemeinschaftstisch", src: A("kitchen-table"), layout: "light", note: "Lockere Zusammenarbeit, Lachen mit Kollegin." },
  { id: "g-slant-office", name: "Schräge Kante: Büro", src: R1("office"), layout: "slant", position: "70% 40%", note: "Das Büro-Motiv mit diagonaler Kante." },
  { id: "g-half-studio", name: "Halbe Seite: Studio", src: R1("studio"), layout: "half", position: "75% 30%", note: "Studio-Porträt randlos auf der rechten Hälfte." },
  { id: "g-circle-night", name: "Kreis: Abend", src: R1("night"), layout: "circle", position: "72% 40%", note: "Abendmotiv im Kreis." },
  { id: "g-blob-thinking", name: "Organische Form: Fensterblick", src: R1("thinking"), layout: "blob", position: "70% 40%", note: "Ruhiger Moment in organischer Form." },
  { id: "g-arch-stage", name: "Bogen: Bühne", src: R1("stage"), layout: "arch", position: "60% 30%", note: "Bühnenmotiv im Bogen." },
  { id: "g-duo-tear-studio", name: "Duoton-Tropfen: Studio", src: R1("studio"), layout: "duo-tear", position: "75% 30%", note: "Studio-Porträt orange eingefärbt im Tropfen." },
];

const VARIANTS: Variant[] = [
  ...ROUND_ONE,
  ...GALLERY.map((shot): Variant => ({
    id: shot.id,
    name: shot.name,
    source: "KI-Bild",
    note: `${LAYOUT_NAMES[shot.layout]}. ${shot.note}`,
    render: ({ hero }) => LAYOUTS[shot.layout](hero, shot),
  })),
];

export default async function HeroOptionsPage({ params }: PageProps<"/[lang]/hero-options">) {
  const lang = await localeParam(params);
  const { home } = getDictionary(lang);
  return (
    <main className="ho-page">
      <svg className="hero-clip-defs" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="ho-tear" clipPathUnits="objectBoundingBox">
            <path d="M 1 0 C .87 .29 1 .59 .81 .81 C .62 1.04 .27 1.01 .12 .79 C -.04 .56 .08 .28 .33 .22 C .59 .16 .78 .19 1 0 Z" />
          </clipPath>
          <clipPath id="ho-tear-flip" clipPathUnits="objectBoundingBox">
            <path d="M 0 0 C .13 .29 0 .59 .19 .81 C .38 1.04 .73 1.01 .88 .79 C 1.04 .56 .92 .28 .67 .22 C .41 .16 .22 .19 0 0 Z" />
          </clipPath>
          <clipPath id="ho-blob" clipPathUnits="objectBoundingBox">
            <path d="M .56 .02 C .8 .04 .99 .2 .97 .46 C .95 .7 .86 .95 .55 .98 C .27 1.01 .03 .84 .02 .55 C .01 .27 .25 0 .56 .02 Z" />
          </clipPath>
        </defs>
      </svg>
      <header className="w speaking-page-header">
        <Link className="lnk" href="/">← Zur Startseite</Link>
        <div className="tag">Hero · {VARIANTS.length} Varianten</div>
        <h1>Welcher Hero passt?</h1>
        <p className="intro">
          Alternativen zum aktuellen Video. Einige nutzen Ausschnitte aus Ihrer Aufnahme,
          einige sind mit Codex neu generiert, einige kommen ganz ohne Foto aus. Ab Nummer 22 folgen weitere KI-Motive in verschiedenen Bildformen, darunter die Tropfenform der heutigen Startseite.
          Alle zeigen den echten Hero-Text. Nennen Sie mir Ihre Favoriten per Nummer.
        </p>
        <details className="ho-jump-wrap">
          <summary>Alle {VARIANTS.length} Varianten anzeigen</summary>
          <nav className="ho-jump" aria-label="Varianten">
            {VARIANTS.map((v, i) => <a key={v.id} href={`#${v.id}`}>{String(i + 1).padStart(2, "0")} {v.name}</a>)}
          </nav>
        </details>
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
