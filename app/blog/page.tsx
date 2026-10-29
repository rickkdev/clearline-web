import Link from "next/link";
import { ARTICLES } from "../../lib/articles";
import { pageMetadata, SITE } from "../../lib/site";
import { BookingLink } from "../calendly";
import { StructuredData } from "../structured-data";

export const metadata = pageMetadata("KI-Praxiswissen für Unternehmen", "Praktische Artikel von Rick Lamanna über Applied AI Engineering, Hermes Agent, Coding Agents, MCP und die Überprüfung von KI-Ergebnissen im Unternehmen.", "/blog");

export default function BlogPage() {
  return (
    <>
      <StructuredData data={{ "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${SITE.origin}/blog#webpage`, url: `${SITE.origin}/blog`, name: "KI-Praxiswissen für Unternehmen", inLanguage: "de-DE", isPartOf: { "@id": `${SITE.origin}/#website` }, author: { "@id": `${SITE.origin}/#person` }, mainEntity: { "@type": "ItemList", itemListElement: ARTICLES.map((article, index) => ({ "@type": "ListItem", position: index + 1, name: article.title, url: `${SITE.origin}/blog/${article.slug}` })) } }} />
      <nav><div className="w"><Link className="brand" href="/">Riccardo Lamanna<span>Fractional Head of AI</span></Link><div className="nl"><Link href="/speaking">Vorträge</Link><BookingLink>Gespräch buchen</BookingLink></div></div></nav>
      <main className="blog-page w">
        <header className="blog-header">
          <Link className="lnk" href="/">← Zur Startseite</Link>
          <p className="tag">Applied AI Engineering</p>
          <h1>KI-Praxiswissen für Unternehmen.</h1>
          <p className="intro">Wie KI im Arbeitsalltag funktioniert: technische Anleitungen, klare Entscheidungen und überprüfbare Ergebnisse. Von Rick Lamanna, freiberuflichem Applied AI Engineer und Fractional Head of AI.</p>
        </header>
        <div className="article-cards">
          {ARTICLES.map((article) => (
            <article className="article-card" key={article.slug}>
              <p className="tag">{article.category}</p>
              <h2><Link href={`/blog/${article.slug}`}>{article.title}</Link></h2>
              <p>{article.summary}</p>
              <div className="article-card-meta"><time dateTime={article.publishedAt}>{new Date(`${article.publishedAt}T12:00:00Z`).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Berlin" })}</time><span>Rick Lamanna</span></div>
              <Link className="lnk" href={`/blog/${article.slug}`}>Artikel lesen →</Link>
            </article>
          ))}
        </div>
      </main>
      <footer><div className="w"><span>© 2026 Riccardo Lamanna</span><Link href="/#ueber-mich">Über Rick Lamanna</Link><BookingLink>Gespräch buchen</BookingLink></div></footer>
    </>
  );
}
