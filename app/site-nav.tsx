import Link from "next/link";
import { getDictionary } from "../lib/dictionaries";
import { localePath, type Locale } from "../lib/i18n";
import { BookingLink } from "./calendly";
import { LanguageSwitch } from "./language-switch";

export function SiteNav({ locale, path }: { locale: Locale; path: string }) {
  const dict = getDictionary(locale);
  const home = localePath(locale, "/");
  return (
    <nav>
      <div className="w">
        <Link className="brand" href={home}>
          Riccardo Lamanna<span>Fractional Head of AI</span>
        </Link>
        <div className="nl">
          <Link href={`${home}#case-study`}>{dict.nav.caseStudy}</Link>
          <LanguageSwitch locale={locale} path={path} {...dict.languageSwitch} />
          <BookingLink className="btn">{dict.nav.book}</BookingLink>
        </div>
      </div>
    </nav>
  );
}
