import { getDictionary } from "../../lib/dictionaries";
import { LOCALES } from "../../lib/i18n";
import { localeParam } from "../../lib/locale-param";
import { socialImage, socialImageSize } from "../../lib/social-image";

export const size = socialImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { site } = getDictionary(await localeParam(params));
  return socialImage(site.socialImageTitle, site.socialImageTag, site.socialImageFooter);
}
