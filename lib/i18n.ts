export const LOCALES = ["de", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "de";
export const LOCALE_COOKIE = "locale";

export const LOCALE_TAGS = {
  de: { html: "de", schema: "de-DE", openGraph: "de_DE", date: "de-DE" },
  en: { html: "en", schema: "en", openGraph: "en_US", date: "en-GB" },
} as const satisfies Record<Locale, object>;

const GERMAN_SPEAKING_COUNTRIES = new Set(["DE", "AT", "CH", "LI", "LU"]);
const CRAWLER = /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview/i;

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function localePath(locale: Locale, path: string) {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function splitLocale(pathname: string): { locale: Locale | undefined; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (!isLocale(first)) return { locale: undefined, path: pathname };
  return { locale: first, path: `/${rest.join("/")}` };
}

// German is the default. Only a visitor whose browser does not ask for German
// and who is outside the German-speaking countries is sent to English.
// Requests without Accept-Language are crawlers or tools and keep the default.
export function preferredLocale({ acceptLanguage, country, userAgent }: { acceptLanguage: string | null; country: string | null; userAgent: string | null }): Locale {
  if (!acceptLanguage || CRAWLER.test(userAgent ?? "")) return DEFAULT_LOCALE;
  const acceptsGerman = acceptLanguage.split(",").some((entry) => {
    const [tag, ...params] = entry.trim().toLowerCase().split(";");
    const quality = params.find((param) => param.trim().startsWith("q="));
    return (tag === "*" || tag === "de" || tag.startsWith("de-")) && quality?.trim() !== "q=0";
  });
  if (acceptsGerman) return "de";
  if (country && GERMAN_SPEAKING_COUNTRIES.has(country.toUpperCase())) return "de";
  return "en";
}
