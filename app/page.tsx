import Image from "next/image";
import Link from "next/link";
import { HeroVideo } from "./hero-video";
import { Swirl } from "./swirl";
import { Timeline } from "./timeline";

const EMAIL = "mail@riccardolamanna.de";

const REFERENCES = [
  { name: "Junikom", logo: "/logos/junikom.svg" },
  { name: "flexC", logo: "/logos/flexc.png" },
  { name: "bec kommunal", logo: "/logos/bec-kommunal.jpg" },
  { name: "geoinform", logo: "/logos/geoinform.svg" },
  { name: "EurOwiG", logo: "/logos/eurowig.png" },
  { name: "more! software", logo: "/logos/more-software.svg" },
];

const SAFEGUARDS = [
  { title: "Datenschutz und Zugriffsrechte", text: "Rollen und Berechtigungen bleiben, wie sie sind." },
  { title: "Lückenlose Protokollierung", text: "Jeder Schritt nachvollziehbar für Revision und Compliance." },
  { title: "Menschliche Freigabe", text: "KI bereitet vor, Ihre Mitarbeitenden entscheiden." },
  {
    title: "Leistungsfähige KI ohne Datenweitergabe an US-KI-Anbieter",
    text: "Sie möchten Ihre Unternehmensdaten nicht mit großen US-KI-Anbietern teilen? Ich unterstütze Sie dabei, eigene KI auf Ihren Servern zu betreiben oder leistungsfähige Modelle auf Servern in der EU zu hosten.",
  },
];

function Check() {
  return (
    <svg viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="9" fill="none" stroke="#F18A00" strokeWidth="1.5" />
      <path d="M6 10.2l2.6 2.6L14 7.4" fill="none" stroke="#F18A00" strokeWidth="1.6" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <nav>
        <div className="w">
          <a className="brand" href="#">
            Riccardo Lamanna<span>Fractional Head of AI</span>
          </a>
          <div className="nl">
            <a href="#ergebnisse">Ergebnisse</a>
            <a href="#einsatz">Einsatzfelder</a>
            <a href="#ablauf">Ablauf</a>
            <a href="#betrieb">Sicherer Betrieb</a>
            <a href="#kontakt">Kontakt</a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <HeroVideo />
        <div className="w">
          <div className="hero-text">
            <div className="tag">KI für den deutschen Mittelstand</div>
            <h1>
              Mehr Zeit für die Arbeit, <em>die wirklich zählt.</em>
            </h1>
            <p className="sub">Ihre KI-Einführung für 2026.</p>
            <ul className="checks">
              <li>
                <Check />
                Umgesetzt mit Fachbereich, IT und Kontrollfunktionen
              </li>
              <li>
                <Check />
                Vom Prozess zum produktiven Einsatz in 4–6 Wochen
              </li>
            </ul>
            <div className="cta">
              <a className="btn" href="#kontakt">Gespräch vereinbaren</a>
              <a className="lnk" href="#einsatz">Einsatzfelder ansehen →</a>
            </div>
          </div>
        </div>
      </section>

      <section id="ergebnisse">
        <div className="in">
          <h2>Ergebnisse aus Kundenprojekten</h2>
          <div className="kpi">
            <div>
              <div className="n">30–40 %</div>
              <p>
                <strong>schneller gelöste Kundenprobleme.</strong> Der Support gibt Fehler strukturiert und sofort
                an die Entwicklung weiter.
              </p>
            </div>
            <div>
              <div className="n">2–3 Monate</div>
              <p>
                <strong>kürzere Projektlaufzeiten.</strong> Entwicklerteams arbeiten mit KI-gestützter Entwicklung
                und passendem Tooling.
              </p>
            </div>
          </div>
          <div className="refs">
            <div className="marq" aria-label="Referenzen">
              <ul>
                {REFERENCES.map(({ name, logo }) => (
                  <li key={name}>
                    <div className="reference-mark">
                      <Image src={logo} alt="" width={136} height={56} className="reference-logo" />
                    </div>
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="einsatz" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="in" style={{ gap: 48, paddingBottom: 96 }}>
          <h2>Vier Einsatzfelder.</h2>
          <Swirl />
        </div>
      </section>

      <section id="ablauf" style={{ background: "var(--soft)" }}>
        <div className="in">
          <h2>Vom Prozess zum produktiven Einsatz</h2>
          <p className="intro">
            Drei Phasen, sechs Wochen. Jede Phase endet mit einer Entscheidung, nicht mit einer Präsentation.
          </p>
          <Timeline />
        </div>
      </section>

      <section id="betrieb">
        <div className="in">
          <h2>Sicherer Betrieb in Ihren eigenen Standards</h2>
          <ul className="rows">
            {SAFEGUARDS.map((s) => (
              <li key={s.title}>
                <Check />
                <div>
                  <strong>{s.title}</strong>
                  <span>{s.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="speaking" className="speaking" aria-labelledby="speaking-title">
        <div className="in">
          <h2 id="speaking-title">Gefragter KI-Experte auf Konferenzen, in Politik und Praxis.</h2>
          <div className="speaking-grid">
            <div>
              <figure className="speaking-photo">
                <Image
                  src="/speaking/ai-politik-berlin.jpg"
                  alt="Riccardo Lamanna mit deutschen Politikern und Veranstaltern bei AI Agents Berlin"
                  width={1600}
                  height={900}
                  sizes="(max-width: 760px) 100vw, 480px"
                />
                <figcaption>KI, Agents und die Berlin-Wahl · AI Agents Berlin</figcaption>
              </figure>
              <Link className="lnk speaking-link" href="/speaking">
                Vorträge und Auftritte ansehen →
              </Link>
            </div>
            <div className="speaking-highlights">
              <article>
                <h3>KI im politischen Dialog</h3>
                <p>Ich spreche mit deutschen Politikerinnen und Politikern über KI und moderiere den Austausch zwischen Politik und Praxis.</p>
              </article>
              <article>
                <h3>Speaker auf führenden KI-Konferenzen</h3>
                <p>Als Speaker, Panelist und Moderator – etwa beim Agentic Summit in Tokio und dem AI Agents Summit in Berlin.</p>
              </article>
              <article>
                <h3>Gastgeber der größten KI-Community Berlins</h3>
                <p>Mit meinen Meetups bringe ich Menschen zusammen, die KI entwickeln, einsetzen und ihre Erfahrungen teilen.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="kontakt" className="contact">
        <div className="in">
          <div className="card">
            <div>
              <h3>Direkt in Ihrem Team.</h3>
              <p style={{ margin: "6px 0 0" }}>Für ein Vorhaben oder laufend. Beginnen Sie mit einem Gespräch.</p>
            </div>
            <a
              className="btn"
              href={`mailto:${EMAIL}?subject=${encodeURIComponent("KI-Einführung – Erstgespräch")}`}
            >
              {EMAIL}
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="w">
          <span>© 2026 Riccardo Lamanna · Fractional Head of AI</span>
          <span>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </span>
        </div>
      </footer>
    </>
  );
}
