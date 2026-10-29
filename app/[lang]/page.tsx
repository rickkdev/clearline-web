import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "../../lib/dictionaries";
import { LOCALE_TAGS, localePath } from "../../lib/i18n";
import { localeParam } from "../../lib/locale-param";
import { absoluteUrl, pageMetadata, SITE } from "../../lib/site";
import { BookingLink } from "../calendly";
import { HeroVideo } from "../hero-video";
import { SiteNav } from "../site-nav";
import { SpeakingGallery } from "../speaking-gallery";
import { StructuredData } from "../structured-data";
import { Swirl } from "../swirl";
import { Timeline } from "../timeline";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const lang = await localeParam(params);
  const { site } = getDictionary(lang);
  return { ...pageMetadata(lang, site.title, site.description, "/"), title: { absolute: site.title } };
}

const REFERENCES = [
  { name: "Junikom", logo: "/logos/junikom.svg" },
  { name: "flexC", logo: "/logos/flexc.png" },
  { name: "bec kommunal", logo: "/logos/bec-kommunal.jpg" },
  { name: "geoinform", logo: "/logos/geoinform.svg" },
  { name: "EurOwiG", logo: "/logos/eurowig.png" },
  { name: "more! software", logo: "/logos/more-software.svg" },
];

function Check() {
  return (
    <svg viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="9" fill="none" stroke="#F18A00" strokeWidth="1.5" />
      <path d="M6 10.2l2.6 2.6L14 7.4" fill="none" stroke="#F18A00" strokeWidth="1.6" />
    </svg>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = await localeParam(params);
  const { site, home, nav } = getDictionary(lang);
  const url = absoluteUrl(lang, "/");
  return (
    <>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "ProfilePage", "@id": `${url}#webpage`, url, name: site.title, inLanguage: LOCALE_TAGS[lang].schema, isPartOf: { "@id": `${SITE.origin}/#website` }, mainEntity: { "@id": `${SITE.origin}/#person` } },
          { "@type": "Service", "@id": `${SITE.origin}/#service`, name: home.service.name, description: site.biography, provider: { "@id": `${SITE.origin}/#person` }, areaServed: { "@type": "Country", name: home.service.areaServed }, serviceType: home.service.types, url: `${url}#kontakt` },
        ],
      }} />
      <SiteNav locale={lang} path="/" />

      <section className="hero">
        <HeroVideo label={home.hero.videoLabel} />
        <div className="w">
          <div className="hero-text">
            <div className="tag">{home.hero.tag}</div>
            <h1>
              {home.hero.title}<em>{home.hero.titleEmphasis}</em>
            </h1>
            <p className="sub">{home.hero.sub}</p>
            <p className="hero-byline">{home.hero.byline}</p>
            <ul className="checks">
              {home.hero.checks.map((check) => (
                <li key={check}>
                  <Check />
                  {check}
                </li>
              ))}
            </ul>
            <div className="cta">
              <BookingLink className="btn">{home.hero.cta}</BookingLink>
              <a className="lnk" href="#einsatz">{home.hero.fieldsLink}</a>
            </div>
          </div>
        </div>
      </section>

      <section id="ergebnisse">
        <div className="in">
          <h2>{home.results.title}</h2>
          <div className="kpi">
            {home.results.kpis.map((kpi) => (
              <div key={kpi.value}>
                <div className="n">{kpi.value}</div>
                <p>
                  <strong>{kpi.lead}</strong> {kpi.text}
                </p>
              </div>
            ))}
          </div>
          <div className="refs">
            <div className="marq" aria-label={home.results.referencesLabel}>
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

      <section id="case-study" className="case-study">
        <div className="in">
          <p className="tag">{home.caseStudy.tag}</p>
          <h2>{home.caseStudy.title}</h2>
          <p className="intro">{home.caseStudy.intro}</p>
          <ul className="case-study-facts">
            {home.caseStudy.facts.map((fact) => <li key={fact.value + fact.text}><strong>{fact.value}</strong><span>{fact.text}</span></li>)}
          </ul>
          <div><Link className="btn" href={localePath(lang, "/blog/case-study-junikom")}>{home.caseStudy.cta}</Link></div>
        </div>
      </section>

      <section id="einsatz" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="in" style={{ gap: 48, paddingBottom: 96 }}>
          <h2>{home.fields.title}</h2>
          <Swirl fields={home.fields.items} />
        </div>
      </section>

      <section id="ablauf" style={{ background: "var(--soft)" }}>
        <div className="in">
          <h2>{home.process.title}</h2>
          <p className="intro">{home.process.intro}</p>
          <Timeline phases={home.process.phases} phaseLabel={home.process.phaseLabel} weekLabel={home.process.weekLabel} />
        </div>
      </section>

      <section id="betrieb">
        <div className="in">
          <h2>{home.safeguards.title}</h2>
          <ul className="rows">
            {home.safeguards.items.map((s) => (
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
          <h2 id="speaking-title">{home.speaking.title}</h2>
          <div className="speaking-grid">
            <div>
              <SpeakingGallery photos={home.speaking.photos} label={home.speaking.galleryLabel} />
              <Link className="lnk speaking-link" href={localePath(lang, "/speaking")}>
                {home.speaking.link}
              </Link>
            </div>
            <div className="speaking-highlights">
              {home.speaking.highlights.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="kontakt" className="contact">
        <div className="in">
          <div className="booking-heading">
            <h2>{home.contact.title}</h2>
            <p className="intro">{home.contact.intro}</p>
          </div>
          <div><BookingLink className="btn">{home.contact.cta}</BookingLink></div>
        </div>
      </section>

      <footer>
        <div className="w">
          <span>© 2026 Riccardo Lamanna · Fractional Head of AI</span>
          <span>
            <Link href={localePath(lang, "/blog")}>Blog</Link> · {" "}
            <BookingLink>{nav.book}</BookingLink>
          </span>
        </div>
      </footer>
    </>
  );
}
