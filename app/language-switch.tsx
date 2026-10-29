"use client";

import { LOCALE_COOKIE, LOCALES, localePath, type Locale } from "../lib/i18n";

export function LanguageSwitch({ locale, path, label, short }: { locale: Locale; path: string; label: string; short: string }) {
  const target = LOCALES.find((item) => item !== locale)!;
  // A plain anchor, not next/link: a prefetch before the click would cache the proxy's old redirect.
  return (
    <a
      className="lang-switch"
      href={localePath(target, path)}
      hrefLang={target}
      lang={target}
      aria-label={label}
      title={label}
      onClick={() => {
        document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
      }}
    >
      {short}
    </a>
  );
}
