import Image from "next/image";
import Link from "next/link";
import type { getDictionary } from "../../../lib/dictionaries";
import { localePath, type Locale } from "../../../lib/i18n";
import type { HeroConcept } from "./concepts";
import styles from "./concept-hero.module.css";

type Props = {
  concept: HeroConcept;
  hero: ReturnType<typeof getDictionary>["home"]["hero"];
  lang: Locale;
  number: number;
};

export function ConceptHero({ concept, hero, lang, number }: Props) {
  const home = localePath(lang, "/");
  return (
    <div className={`${styles.page} ${styles.stage} ${styles[concept.layout]}`} style={{ background: concept.background, color: concept.foreground }}>
      <div className={styles.brand}><span>riccardo<span style={{ color: concept.accent }}>.</span></span><span>Applied AI Engineering</span></div>
      <div className={styles.composition}>
        <div className={styles.copy}>
          <p className={styles.kicker}><span style={{ background: concept.accent }} />{hero.tag}</p>
          <h3>{hero.title}<em style={{ color: concept.accent }}>{hero.titleEmphasis}</em></h3>
          <p className={styles.sub}>{hero.sub}</p>
          <p className={styles.byline}>{hero.byline}</p>
          <div className={styles.actions}>
            <Link href={`${home}#kontakt`} className={styles.primary} style={{ background: concept.foreground, color: concept.background }}>{hero.cta}<span aria-hidden="true">↗</span></Link>
            <Link href={`${home}#einsatz`} className={styles.secondary}>{hero.fieldsLink}</Link>
          </div>
          <ul className={styles.checks}>{hero.checks.map(check => <li key={check}>{check}</li>)}</ul>
        </div>
        <figure className={styles.art}>
          <Image src={`/hero-options-2/${concept.id}.webp`} alt={`${concept.name}. ${concept.medium}, KI-generiertes Konzeptmotiv.`} fill sizes="(max-width: 760px) 100vw, 60vw" />
          <figcaption>{concept.medium}<span>Studie {String(number).padStart(2, "0")}</span></figcaption>
        </figure>
      </div>
      <div className={styles.stageFooter}><span>Strategie trifft Umsetzung.</span><span>Mittelstand. Mensch. Maschine.</span></div>
    </div>
  );
}
