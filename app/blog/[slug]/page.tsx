import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ARTICLES, articleHeadings, getArticle, headingId } from "../../../lib/articles";
import { pageMetadata, SITE } from "../../../lib/site";
import { BookingLink } from "../../calendly";
import { StructuredData } from "../../structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((item) => item.slug === slug);
  if (!article) notFound();
  const metadata = pageMetadata(article.title, article.description, `/blog/${article.slug}`);
  return {
    ...metadata,
    alternates: { ...metadata.alternates, types: { "text/markdown": `${SITE.origin}/blog/${article.slug}/index.md` } },
    openGraph: { ...metadata.openGraph, type: "article", publishedTime: article.publishedAt, modifiedTime: article.updatedAt, authors: [SITE.origin], section: article.category, images: [{ url: `${SITE.origin}/blog/${article.slug}/opengraph-image`, width: 1200, height: 630, alt: article.title }] },
    twitter: { card: "summary_large_image", title: article.title, description: article.description, images: [`${SITE.origin}/blog/${article.slug}/opengraph-image`] },
  };
}

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const url = `${SITE.origin}/blog/${article.slug}`;
  const date = (value: string) => new Date(`${value}T12:00:00Z`).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Berlin" });

  return (
    <>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebPage", "@id": `${url}#webpage`, url, name: article.title, description: article.description, inLanguage: "de-DE", isPartOf: { "@id": `${SITE.origin}/#website` }, mainEntity: { "@id": `${url}#article` }, breadcrumb: { "@id": `${url}#breadcrumb` } },
          { "@type": "BlogPosting", "@id": `${url}#article`, url, headline: article.title, description: article.description, datePublished: article.publishedAt, dateModified: article.updatedAt, inLanguage: "de-DE", articleSection: article.category, author: { "@id": `${SITE.origin}/#person` }, publisher: { "@id": `${SITE.origin}/#person` }, mainEntityOfPage: { "@id": `${url}#webpage` }, image: `${url}/opengraph-image` },
          { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Startseite", item: `${SITE.origin}/` }, { "@type": "ListItem", position: 2, name: "Praxiswissen", item: `${SITE.origin}/blog` }, { "@type": "ListItem", position: 3, name: article.title, item: url }] },
        ],
      }} />
      <nav><div className="w"><Link className="brand" href="/">Riccardo Lamanna<span>Fractional Head of AI</span></Link><div className="nl"><Link href="/blog">Praxiswissen</Link><BookingLink>Gespräch buchen</BookingLink></div></div></nav>
      <main className="article-page w">
        <header className="article-header">
          <Link className="lnk" href="/blog">← Alle Artikel</Link>
          <p className="tag">{article.category}</p>
          <h1>{article.title}</h1>
          <p className="intro">{article.description}</p>
          <p className="article-byline"><Link href="/#ueber-mich">Rick Lamanna</Link> · <time dateTime={article.publishedAt}>{date(article.publishedAt)}</time>{article.updatedAt !== article.publishedAt && <> · Aktualisiert <time dateTime={article.updatedAt}>{date(article.updatedAt)}</time></>}</p>
        </header>
        <div className="article-layout">
          <aside className="article-toc" aria-label="Inhaltsverzeichnis">
            <strong>In diesem Artikel</strong>
            <ol>{articleHeadings(article.body).map((heading) => <li key={heading.id}><a href={`#${heading.id}`}>{heading.title}</a></li>)}</ol>
          </aside>
          <article className="article-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ h2: ({ children }) => <h2 id={headingId(String(children))}>{children}</h2> }}>{article.body}</ReactMarkdown>
          </article>
        </div>
        <aside className="article-author">
          <h2>Über den Autor</h2>
          <p>{SITE.biography}</p>
          <BookingLink className="btn">KI-Vorhaben besprechen</BookingLink>
        </aside>
        <section className="related-articles" aria-label="Weitere Artikel">
          <h2>Weiterlesen</h2>
          {ARTICLES.filter((item) => item.slug !== slug).map((item) => <p key={item.slug}><Link href={`/blog/${item.slug}`}>{item.title} →</Link></p>)}
        </section>
      </main>
      <footer><div className="w"><span>© 2026 Riccardo Lamanna</span><Link href="/blog">Praxiswissen</Link><BookingLink>Gespräch buchen</BookingLink></div></footer>
    </>
  );
}
