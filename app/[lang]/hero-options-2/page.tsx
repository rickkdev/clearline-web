import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { localeParam } from "../../../lib/locale-param";
import { localePath } from "../../../lib/i18n";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function HeroOptionsTwo({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await localeParam(params);
  redirect(`${localePath(lang, "/hero-options")}#art-paper`);
}
