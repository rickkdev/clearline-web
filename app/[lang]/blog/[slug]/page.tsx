import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Fragment } from "react";
import { ARTICLE_SLUGS, articleHeadings, findArticle, getArticle, getArticles, headingId } from "../../../../lib/articles";
import { articleVisuals } from "../../../../lib/article-visuals";
import { getDictionary } from "../../../../lib/dictionaries";
import { LOCALE_TAGS, localePath } from "../../../../lib/i18n";
import { localeParam } from "../../../../lib/locale-param";
import { absoluteUrl, pageMetadata, SITE } from "../../../../lib/site";
import { ArticleFigure } from "../../../article-figure";
import { BookingLink } from "../../../calendly";
import { SiteNav } from "../../../site-nav";
import { StructuredData } from "../../../structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const lang = await localeParam(params);
  const { slug } = await params;
  const article = findArticle(lang, slug);
  if (!article) notFound();
  const path = `/blog/${article.slug}`;
  const url = absoluteUrl(lang, path);
  const metadata = pageMetadata(lang, article.title, article.description, path);
  return {
    ...metadata,
    alternates: { ...metadata.alternates, types: { "text/markdown": `${url}/index.md` } },
    openGraph: { ...metadata.openGraph, type: "article", publishedTime: article.publishedAt, modifiedTime: article.updatedAt, authors: [SITE.origin], section: article.category, images: [{ url: `${url}/opengraph-image`, width: 1200, height: 630, alt: article.title }] },
    twitter: { card: "summary_large_image", title: article.title, description: article.description, images: [`${url}/opengraph-image`] },
  };
}

export default async function ArticlePage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const lang = await localeParam(params);
  const { slug } = await params;
  const article = getArticle(lang, slug);
  if (!article) notFound();
  const { blog, nav, site, footer } = getDictionary(lang);
  const path = `/blog/${article.slug}`;
  const url = absoluteUrl(lang, path);
  const visuals = articleVisuals(article.slug);
  const headings = articleHeadings(article.body);
  const date = (value: string) => new Date(`${value}T12:00:00Z`).toLocaleDateString(LOCALE_TAGS[lang].date, { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Berlin" });

  return (
    <>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebPage", "@id": `${url}#webpage`, url, name: article.title, description: article.description, inLanguage: LOCALE_TAGS[lang].schema, isPartOf: { "@id": `${SITE.origin}/#website` }, mainEntity: { "@id": `${url}#article` }, breadcrumb: { "@id": `${url}#breadcrumb` } },
          { "@type": "BlogPosting", "@id": `${url}#article`, url, headline: article.title, description: article.description, datePublished: article.publishedAt, dateModified: article.updatedAt, inLanguage: LOCALE_TAGS[lang].schema, articleSection: article.category, author: { "@id": `${SITE.origin}/#person` }, publisher: { "@id": `${SITE.origin}/#person` }, mainEntityOfPage: { "@id": `${url}#webpage` }, image: `${url}/opengraph-image` },
          { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: blog.breadcrumbHome, item: absoluteUrl(lang, "/") }, { "@type": "ListItem", position: 2, name: blog.breadcrumbBlog, item: absoluteUrl(lang, "/blog") }, { "@type": "ListItem", position: 3, name: article.title, item: url }] },
        ],
      }} />
      <SiteNav locale={lang} path={path} />
      <main className="article-page w">
        <header className="article-header">
          <Link className="lnk" href={localePath(lang, "/blog")}>{blog.allArticles}</Link>
          <p className="tag">{article.category}</p>
          <h1>{article.title}</h1>
          <p className="intro">{article.description}</p>
          <p className="article-byline"><Link href={localePath(lang, "/")}>Riccardo Lamanna</Link> · <time dateTime={article.publishedAt}>{date(article.publishedAt)}</time>{article.updatedAt !== article.publishedAt && <> · {blog.updated} <time dateTime={article.updatedAt}>{date(article.updatedAt)}</time></>}</p>
        </header>
        <div className="article-layout">
          <aside className="article-toc" aria-label={blog.toc}>
            <strong>{blog.inThisArticle}</strong>
            <ol>{headings.map((heading) => <li key={heading.id}><a href={`#${heading.id}`}>{heading.title}</a></li>)}</ol>
          </aside>
          <article className="article-body">
            <ArticleFigure visual={visuals[0]} locale={lang} />
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ h2: ({ children }) => {
              const id = headingId(String(children));
              const index = headings.findIndex((heading) => heading.id === id);
              const visual = visuals.find((item) => item.afterHeadingIndex === index);
              return <Fragment key={id}><h2 id={id}>{children}</h2>{visual && <ArticleFigure visual={visual} locale={lang} />}</Fragment>;
            } }}>{article.body}</ReactMarkdown>
          </article>
        </div>
        <aside className="article-author">
          <h2>{blog.aboutAuthor}</h2>
          <p>{site.biography}</p>
          <BookingLink className="btn">{blog.discuss}</BookingLink>
        </aside>
        <section className="related-articles" aria-label={blog.moreArticles}>
          <h2>{blog.readMore}</h2>
          {getArticles(lang).filter((item) => item.slug !== slug).map((item) => <p key={item.slug}><Link href={localePath(lang, `/blog/${item.slug}`)}>{item.title} →</Link></p>)}
        </section>
      </main>
      <footer><div className="w"><span>© 2026 Riccardo Lamanna</span><Link href={localePath(lang, "/blog")}>{footer.blog}</Link><BookingLink>{nav.book}</BookingLink></div></footer>
    </>
  );
}
