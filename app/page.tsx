import Image from "next/image";
import Link from "next/link";
import { HeroVideo } from "./hero-video";
import { BookingLink } from "./calendly";
import { SpeakingGallery } from "./speaking-gallery";
import { pageMetadata, SITE } from "../lib/site";
import { StructuredData } from "./structured-data";
import { ARTICLES } from "../lib/articles";
import { Swirl } from "./swirl";
import { Timeline } from "./timeline";

export const metadata = {
  ...pageMetadata(SITE.title, SITE.description, "/"),
  title: { absolute: SITE.title },
};

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
      <StructuredData data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "ProfilePage", "@id": `${SITE.origin}/#webpage`, url: `${SITE.origin}/`, name: SITE.title, inLanguage: "de-DE", isPartOf: { "@id": `${SITE.origin}/#website` }, mainEntity: { "@id": `${SITE.origin}/#person` } },
          { "@type": "Service", "@id": `${SITE.origin}/#service`, name: "Fractional Head of AI und Applied AI Engineering", description: SITE.biography, provider: { "@id": `${SITE.origin}/#person` }, areaServed: { "@type": "Country", name: "Deutschland" }, serviceType: ["Applied AI Engineering", "KI-Integration", "Fractional Head of AI"], url: `${SITE.origin}/#kontakt` },
        ],
      }} />
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
            <Link href="/blog">Praxiswissen</Link>
            <BookingLink>Gespräch buchen</BookingLink>
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
            <p className="sub">Applied AI Engineering für Ihr Unternehmen.</p>
            <p className="hero-byline">Mit Rick Lamanna · Freelancer &amp; Fractional Head of AI</p>
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
              <BookingLink className="btn">Gespräch vereinbaren</BookingLink>
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

      <section id="ueber-mich" className="about">
        <div className="in">
          <h2>Rick Lamanna. KI-Umsetzung direkt in Ihrem Team.</h2>
          <p className="intro">{SITE.biography}</p>
          <p>Als Freelancer verbinde ich technische Umsetzung mit Verantwortung für das Ergebnis. Die Werkzeuge wähle ich passend zu Ihren Abläufen, Ihren Daten und Ihrem Team: von Coding Agents über Wissensassistenten bis zu selbst gehosteten Modellen auf eigenen oder EU-Servern.</p>
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
              <SpeakingGallery />
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

      <section id="praxiswissen" className="knowledge">
        <div className="in">
          <h2>KI-Praxiswissen für Ihr Unternehmen.</h2>
          <p className="intro">Konkrete Anleitungen für Wissensassistenten und Entwicklungsteams. Mit Quellen, technischen Entscheidungen und Prüfungen für den Alltag.</p>
          <div className="article-cards">
            {ARTICLES.map((article) => (
              <article className="article-card" key={article.slug}>
                <p className="tag">{article.category}</p>
                <h3><Link href={`/blog/${article.slug}`}>{article.title}</Link></h3>
                <p>{article.summary}</p>
                <Link className="lnk" href={`/blog/${article.slug}`}>Artikel lesen →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" className="contact">
        <div className="in">
          <div className="booking-heading">
            <h2>Lassen Sie uns über Ihr KI-Vorhaben sprechen.</h2>
            <p className="intro">In 30 Minuten klären wir, wo KI Ihr Team entlasten kann und welcher nächste Schritt sinnvoll ist. Wählen Sie direkt einen passenden Termin.</p>
          </div>
          <div><BookingLink className="btn">30-minütiges Gespräch buchen</BookingLink></div>
        </div>
      </section>

      <footer>
        <div className="w">
          <span>© 2026 Riccardo Lamanna · Fractional Head of AI</span>
          <span>
            <Link href="/blog">Praxiswissen</Link> · {" "}
            <BookingLink>Gespräch buchen</BookingLink>
          </span>
        </div>
      </footer>
    </>
  );
}
