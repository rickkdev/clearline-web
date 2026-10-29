import { ARTICLES, getArticle } from "../../../../lib/articles";
import { SITE } from "../../../../lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map(({ slug }) => ({ slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return new Response("Article not found", { status: 404 });
  const text = `# ${article.title}\n\nAuthor: ${SITE.name}\nPublished: ${article.publishedAt}\nUpdated: ${article.updatedAt}\nCanonical: ${SITE.origin}/blog/${article.slug}\n\n${article.body}`;
  return new Response(text, { headers: { "Content-Type": "text/markdown; charset=utf-8", "X-Robots-Tag": "noindex", "Link": `<${SITE.origin}/blog/${article.slug}>; rel="canonical"` } });
}
