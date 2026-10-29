import type { Locale } from "./i18n";

type VisualText = { title: string; caption: string; alt: string };
type Artwork = "civic" | "library" | "loop" | "workspace" | "isolation" | "browser" | "server" | "knowledge" | "access";

export type ArticleVisual = {
  id: string;
  artwork: Artwork;
  cover?: { eyebrow: Record<Locale, string>; hook: Record<Locale, string>; label: Record<Locale, string> };
  afterHeadingIndex?: number;
  text: Record<Locale, VisualText>;
};

export const ARTICLE_VISUALS = {
  "case-study-junikom": [
    { id: "juniko-cover", artwork: "civic", cover: { eyebrow: { de: "CASE STUDY", en: "CASE STUDY" }, hook: { de: "Schneller liefern. Sicher bleiben.", en: "Ship faster. Stay secure." }, label: { de: "Junikom · Entwicklung mit KI", en: "Junikom · Engineering with AI" } }, text: {
      de: { title: "KI in der kommunalen Softwareentwicklung", caption: "Ein Entwicklungsteam verbindet Coding Agents mit Fachwissen und überprüfbaren Ergebnissen.", alt: "Softwareteam und Coding Agent arbeiten vor dem Hintergrund einer kommunalen Stadt an geprüfter Software." },
      en: { title: "AI for municipal software teams", caption: "A development team combines coding agents with domain knowledge and verifiable results.", alt: "A software team and coding agent work on verified software against a municipal city backdrop." },
    } },
    { id: "juniko-foundation", artwork: "library", afterHeadingIndex: 2, text: {
      de: { title: "Das Fundament für zuverlässige Agenten", caption: "Projektregeln, Fachwissen und freigegebene Werkzeuge geben dem Agenten den nötigen Kontext.", alt: "Eine Wissensbasis, ein Softwareprojekt und eine kommunale Umgebung sind durch Lichtlinien verbunden." },
      en: { title: "The foundation for reliable agents", caption: "Project rules, domain knowledge and approved tools give the agent the context it needs.", alt: "A knowledge base, software project and municipal setting connected by light paths." },
    } },
    { id: "juniko-verification", artwork: "loop", afterHeadingIndex: 3, text: {
      de: { title: "Arbeit in einer überprüfbaren Schleife", caption: "Der Agent setzt um, prüft die echte Anwendung und korrigiert anhand des Ergebnisses.", alt: "Ein Entwicklerteam prüft gemeinsam Code mit einem Coding Agent und sichtbaren Testergebnissen." },
      en: { title: "Work in a verifiable loop", caption: "The agent implements, checks the real application and corrects course based on the result.", alt: "A development team reviews code with a coding agent and visible test results." },
    } },
  ],
  "coding-agents-verifikation": [
    { id: "agents-context", artwork: "workspace", cover: { eyebrow: { de: "AI ENGINEERING", en: "AI ENGINEERING" }, hook: { de: "Ein grüner Build beweist noch nichts.", en: "A green build proves very little." }, label: { de: "Coding Agents im Team", en: "Coding agents in the team" } }, text: {
      de: { title: "Coding Agents im Team", caption: "Ein klarer Auftrag, der passende Projektkontext und eine echte Prüfung verbinden sich zu einem verlässlichen Ablauf.", alt: "Ein Entwickler arbeitet mit Repository-Kontext und prüft eine Webanwendung am Bildschirm." },
      en: { title: "Coding agents at work", caption: "A clear task, useful project context and a real verification step form a reliable workflow.", alt: "A developer works with repository context and checks a web application on screen." },
    } },
    { id: "agents-isolation", artwork: "isolation", afterHeadingIndex: 3, text: {
      de: { title: "Jede Aufgabe in eigener Umgebung", caption: "Ein separater Branch und ein isoliertes Browserprofil halten Änderungen und Testdaten begrenzt.", alt: "Ein eigener Testarbeitsplatz ist durch eine transparente Sicherheitsgrenze vom restlichen System getrennt." },
      en: { title: "Every task in its own environment", caption: "A separate branch and an isolated browser profile keep changes and test data contained.", alt: "A dedicated test workstation sits inside a transparent boundary, apart from the rest of the system." },
    } },
    { id: "agents-proof", artwork: "browser", afterHeadingIndex: 4, text: {
      de: { title: "Die Funktion durch die Oberfläche prüfen", caption: "Ein kurzer Nutzerweg liefert sichtbare Belege und führt bei Fehlern zurück zur Änderung.", alt: "Ein Coding Agent und ein Entwickler verfolgen einen Testablauf in einer echten Browseroberfläche." },
      en: { title: "Verify the feature through the interface", caption: "A short user journey produces visible evidence and leads back to the change when something fails.", alt: "A coding agent and developer follow a test journey through a real browser interface." },
    } },
  ],
  "hermes-agent-unternehmen": [
    { id: "hermes-setup", artwork: "server", cover: { eyebrow: { de: "KI IM UNTERNEHMEN", en: "AI AT WORK" }, hook: { de: "Wissen teilen. Zugriff begrenzen.", en: "Share knowledge. Control access." }, label: { de: "Hermes Agent im Unternehmen", en: "Hermes Agent in the company" } }, text: {
      de: { title: "Hermes Agent im Unternehmen", caption: "Ein kontrollierter Pilot verbindet Server, Teams und freigegebene Wissensquellen.", alt: "Ein europäischer Cloudserver verbindet zwei getrennte Teamräume mit einer Wissensbasis." },
      en: { title: "Hermes Agent at work", caption: "A controlled pilot connects a server, teams and approved knowledge sources.", alt: "A European cloud server connects two separate team spaces with a knowledge base." },
    } },
    { id: "hermes-knowledge", artwork: "knowledge", afterHeadingIndex: 4, text: {
      de: { title: "Antworten mit überprüfbaren Quellen", caption: "Dokumente liefern Fundstellen; fehlende oder widersprüchliche Belege bleiben sichtbar.", alt: "Eine KI-Suche hebt eine Passage in einem Dokument hervor und führt von der Quelle zu einer Antwort." },
      en: { title: "Answers with verifiable sources", caption: "Documents provide citations, and missing or conflicting evidence stays visible.", alt: "An AI search highlights a passage in a document and traces the answer back to its source." },
    } },
    { id: "hermes-guardrails", artwork: "access", afterHeadingIndex: 9, text: {
      de: { title: "Vor Freigabe gezielt gegenprüfen", caption: "Fachliche Antworten, Zugriffsgrenzen und Schreibaktionen brauchen eigene Gegenproben.", alt: "Eine belegte Anfrage passiert einen sicheren Zugang, während eine nicht erlaubte Schreibaktion gestoppt wird." },
      en: { title: "Counter-check before release", caption: "Domain answers, access boundaries and write actions each need their own counter-checks.", alt: "A source-backed request passes a secure gateway while an unapproved write action is stopped." },
    } },
  ],
} as const satisfies Record<string, readonly ArticleVisual[]>;

export type ArticleSlug = keyof typeof ARTICLE_VISUALS;

export function articleVisuals(slug: ArticleSlug): readonly ArticleVisual[] {
  return ARTICLE_VISUALS[slug];
}
