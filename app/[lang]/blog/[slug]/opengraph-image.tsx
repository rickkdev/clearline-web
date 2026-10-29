import { notFound } from "next/navigation";
import { findArticle } from "../../../../lib/articles";
import { getDictionary } from "../../../../lib/dictionaries";
import { localeParam } from "../../../../lib/locale-param";
import { socialImage, socialImageSize } from "../../../../lib/social-image";

export const size = socialImageSize;
export const contentType = "image/png";

export default async function ArticleOpenGraphImage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const lang = await localeParam(params);
  const article = findArticle(lang, (await params).slug);
  if (!article) notFound();
  return socialImage(article.title, article.category, getDictionary(lang).site.socialImageFooter);
}
