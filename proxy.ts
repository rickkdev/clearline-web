import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE, localePath, preferredLocale, splitLocale } from "./lib/i18n";

export function proxy(request: NextRequest) {
  const { locale, path } = splitLocale(request.nextUrl.pathname);
  const url = request.nextUrl.clone();

  if (locale === DEFAULT_LOCALE) {
    url.pathname = path;
    return NextResponse.redirect(url, 308);
  }
  if (locale) return NextResponse.next();

  if (!request.cookies.has(LOCALE_COOKIE)) {
    const preferred = preferredLocale({
      acceptLanguage: request.headers.get("accept-language"),
      country: request.headers.get("x-vercel-ip-country"),
      userAgent: request.headers.get("user-agent"),
    });
    if (preferred !== DEFAULT_LOCALE) {
      url.pathname = localePath(preferred, path);
      return NextResponse.redirect(url, 307);
    }
  }

  url.pathname = `/${DEFAULT_LOCALE}${path === "/" ? "" : path}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/|.*\\.(?:svg|png|jpe?g|webp|gif|ico|mp4|txt|xml|webmanifest)$).*)"],
};
