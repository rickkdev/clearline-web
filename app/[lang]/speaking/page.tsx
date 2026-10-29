import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "../../../lib/dictionaries";
import { LOCALE_TAGS, localePath } from "../../../lib/i18n";
import { localeParam } from "../../../lib/locale-param";
import { absoluteUrl, pageMetadata, SITE } from "../../../lib/site";
import { BookingLink } from "../../calendly";
import { SiteNav } from "../../site-nav";
import { StructuredData } from "../../structured-data";

export async function generateMetadata({ params }: PageProps<"/[lang]/speaking">): Promise<Metadata> {
  const lang = await localeParam(params);
  const { speakingPage } = getDictionary(lang);
  return pageMetadata(lang, speakingPage.title, speakingPage.description, "/speaking");
}

const TALKS = [
  {
    title: "Keynote with German Politicians: AI, Agents, and the Berlin Election",
    image: "ki-und-die-berlin-wahl.jpg",
  },
  {
    title: "When Agents Transact: Identity, Delegation and Payments",
    image: "agentic-summit-tokyo.jpg",
  },
  {
    title: "AI Agents Summit",
    image: "ai-agents-summit-1.jpg",
  },
  {
    title: "Sovereign AI & Sanctuary Tech",
    image: "futura.jpg",
  },
  {
    title: "Declawed: Hermes Agent and the Future of Self-Improving AI",
    image: "hermes-2.jpeg",
  },
  {
    title: "AI / LLM Privacy",
    image: "llm-privacy.jpeg",
  },
  {
    title: "The future of agentic commerce",
    image: "agentic-commerce.png",
  },
  {
    title: "Real-world assets & the future of finance",
    image: "davos.jpg",
  },
];

export default async function SpeakingPage({ params }: PageProps<"/[lang]/speaking">) {
  const lang = await localeParam(params);
  const { speakingPage: page, nav } = getDictionary(lang);
  const url = absoluteUrl(lang, "/speaking");
  const talks = TALKS.map((talk, index) => ({ ...talk, ...page.talks[index] }));
  return (
    <>
      <StructuredData data={{ "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: page.schemaName, inLanguage: LOCALE_TAGS[lang].schema, about: { "@id": `${SITE.origin}/#person` }, isPartOf: { "@id": `${SITE.origin}/#website` } }} />
      <SiteNav locale={lang} path="/speaking" />
      <main className="speaking-page w">
        <header className="speaking-page-header">
          <Link className="lnk" href={localePath(lang, "/")}>{nav.backHome}</Link>
          <div className="tag">{page.tag}</div>
          <h1>{page.heading}</h1>
          <p className="intro">{page.intro}</p>
        </header>
        <div className="talks-grid">
          {talks.map((talk, index) => (
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
          <h2>{page.inviteTitle}</h2>
          <p>{page.inviteText}</p>
          <BookingLink className="btn">{nav.book}</BookingLink>
        </div>
      </main>
      <footer>
        <div className="w">
          <span>© 2026 Riccardo Lamanna · Fractional Head of AI</span>
          <BookingLink>{nav.book}</BookingLink>
        </div>
      </footer>
    </>
  );
}
