import type { Metadata } from "next";
import Link from "next/link";
import { indexableArticles } from "../../../lib/articles";
import { articleVisuals } from "../../../lib/article-visuals";
import { getDictionary } from "../../../lib/dictionaries";
import { LOCALE_TAGS, localePath } from "../../../lib/i18n";
import { localeParam } from "../../../lib/locale-param";
import { absoluteUrl, pageMetadata, SITE } from "../../../lib/site";
import { ArticleFigure } from "../../article-figure";
import { BookingLink } from "../../calendly";
import { SiteNav } from "../../site-nav";
import { StructuredData } from "../../structured-data";

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const lang = await localeParam(params);
  const { blog } = getDictionary(lang);
  return pageMetadata(lang, blog.title, blog.description, "/blog");
}

export default async function BlogPage({ params }: PageProps<"/[lang]/blog">) {
  const lang = await localeParam(params);
  const { blog, nav, footer } = getDictionary(lang);
  const articles = indexableArticles(lang);
  const url = absoluteUrl(lang, "/blog");
  const articlePath = (slug: string) => localePath(lang, `/blog/${slug}`);

  return (
    <>
      <StructuredData data={{ "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: blog.title, inLanguage: LOCALE_TAGS[lang].schema, isPartOf: { "@id": `${SITE.origin}/#website` }, author: { "@id": `${SITE.origin}/#person` }, mainEntity: { "@type": "ItemList", itemListElement: articles.map((article, index) => ({ "@type": "ListItem", position: index + 1, name: article.title, url: absoluteUrl(lang, `/blog/${article.slug}`) })) } }} />
      <SiteNav locale={lang} path="/blog" />
      <main className="blog-page w">
        <header className="blog-header">
          <Link className="lnk" href={localePath(lang, "/")}>{nav.backHome}</Link>
          <p className="tag">Applied AI Engineering</p>
          <h1>{blog.heading}</h1>
          <p className="intro">{blog.intro}</p>
        </header>
        <div className="article-cards">
          {articles.map((article) => (
            <article className="article-card" key={article.slug}>
              <Link className="article-card-image" href={articlePath(article.slug)} aria-label={`${blog.openArticle}: ${article.title}`}><ArticleFigure visual={articleVisuals(article.slug)[0]} locale={lang} thumbnail /></Link>
              <p className="tag">{article.category}</p>
              <h2><Link href={articlePath(article.slug)}>{article.title}</Link></h2>
              <p>{article.summary}</p>
              <div className="article-card-meta"><time dateTime={article.publishedAt}>{new Date(`${article.publishedAt}T12:00:00Z`).toLocaleDateString(LOCALE_TAGS[lang].date, { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Berlin" })}</time><span>Riccardo Lamanna</span></div>
              <Link className="lnk" href={articlePath(article.slug)}>{blog.readArticle}</Link>
            </article>
          ))}
        </div>
      </main>
      <footer><div className="w"><span>© 2026 Riccardo Lamanna</span><Link href={localePath(lang, "/")}>{footer.aboutLink}</Link><BookingLink>{nav.book}</BookingLink></div></footer>
    </>
  );
}
