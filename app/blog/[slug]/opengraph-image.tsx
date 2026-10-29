import { notFound } from "next/navigation";
import { ARTICLES } from "../../../lib/articles";
import { socialImage, socialImageSize } from "../../../lib/social-image";

export const alt = "KI-Praxiswissen von Rick Lamanna";
export const size = socialImageSize;
export const contentType = "image/png";

export default async function ArticleOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find((item) => item.slug === slug);
  if (!article) notFound();
  return socialImage(article.title, article.category);
}
