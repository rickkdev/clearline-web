import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vorträge und Auftritte – Riccardo Lamanna",
  description: "Konferenzen, Panels und KI-Meetups mit Riccardo Lamanna – von Berlin und Tokio bis Davos.",
};

const TALKS = [
  {
    title: "Keynote with German Politicians: AI, Agents, and the Berlin Election",
    event: "AI Agents Berlin · Circuit, Berlin-Kreuzberg",
    role: "Moderator",
    image: "ki-und-die-berlin-wahl.jpg",
    alt: "Riccardo Lamanna mit deutschen Politikern und Veranstaltern bei AI Agents Berlin",
  },
  {
    title: "When Agents Transact: Identity, Delegation and Payments",
    event: "Agentic Summit · UTokyo Ito Hall, Tokio",
    role: "Panelist",
    image: "agentic-summit-tokyo.jpg",
    alt: "Panel über Identität, Delegation und Zahlungen von KI-Agents beim Agentic Summit in Tokio",
  },
  {
    title: "AI Agents Summit",
    event: "Spielfeld Digital Hub & 42 Berlin · Berlin",
    role: "Moderator",
    image: "ai-agents-summit-1.jpg",
    alt: "Podiumsdiskussion auf der Bühne des AI Agents Summit in Berlin",
  },
  {
    title: "Sovereign AI & Sanctuary Tech",
    event: "Futura Camp · Funkhaus, Berlin",
    role: "Moderator",
    image: "futura.jpg",
    alt: "Teilnehmende des Sovereign AI und Sanctuary Tech Tracks beim Futura Camp",
  },
  {
    title: "Declawed: Hermes Agent and the Future of Self-Improving AI",
    event: "Local AI Berlin · w3.hub, Berlin",
    role: "Organisator & Speaker",
    image: "hermes-2.jpeg",
    alt: "Publikum beim ersten Hermes Agent Meetup im w3.hub in Berlin",
  },
  {
    title: "AI / LLM Privacy",
    event: "appliedAI Developers Meetup · Berlin",
    role: "Organisator",
    image: "llm-privacy.jpeg",
    alt: "Gruppenfoto des AI und LLM Privacy Meetups in Berlin",
  },
  {
    title: "The future of agentic commerce",
    event: "Berlin",
    role: "Speaker",
    image: "agentic-commerce.png",
    alt: "Riccardo Lamanna spricht über die Zahlungsinfrastruktur für die Agent Economy",
  },
  {
    title: "Real-world assets & the future of finance",
    event: "World Digital Economic Organization Forum · Davos, Schweiz",
    role: "Panelist",
    image: "davos.jpg",
    alt: "Panel zu Security Token Offerings mit Riccardo Lamanna in Davos",
  },
];

export default function SpeakingPage() {
  return (
    <>
      <nav>
        <div className="w">
          <Link className="brand" href="/">
            Riccardo Lamanna<span>Fractional Head of AI</span>
          </Link>
        </div>
      </nav>
      <main className="speaking-page w">
        <header className="speaking-page-header">
          <Link className="lnk" href="/">← Zur Startseite</Link>
          <div className="tag">Speaker · Moderator · Gastgeber</div>
          <h1>Vorträge und Auftritte.</h1>
          <p className="intro">
            Ich spreche auf Konferenzen, moderiere Panels und veranstalte eigene Tech-Meetups in Berlin – aktuell mit Fokus auf KI.
          </p>
        </header>
        <div className="talks-grid">
          {TALKS.map((talk, index) => (
            <article className="talk" key={talk.title}>
              <div className="talk-image">
                <Image
                  src={`/speaking/${talk.image}`}
                  alt={talk.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 536px"
                  preload={index === 0}
                />
              </div>
              <div className="tag">{talk.role}</div>
              <h2>{talk.title}</h2>
              <p>{talk.event}</p>
            </article>
          ))}
        </div>
        <div className="speaking-invite">
          <h2>KI auf Ihrer Agenda?</h2>
          <p>Für einen Vortrag, ein Panel oder die Umsetzung in Ihrem Team.</p>
          <a className="btn" href="mailto:mail@riccardolamanna.de">Gespräch vereinbaren</a>
        </div>
      </main>
      <footer>
        <div className="w">
          <span>© 2026 Riccardo Lamanna · Fractional Head of AI</span>
          <a href="mailto:mail@riccardolamanna.de">mail@riccardolamanna.de</a>
        </div>
      </footer>
    </>
  );
}
