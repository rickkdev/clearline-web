import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./i18n";

export async function localeParam(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}
