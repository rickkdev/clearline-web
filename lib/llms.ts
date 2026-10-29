import { articleMarkdown, getArticles } from "./articles";
import { getDictionary } from "./dictionaries";
import { SITE } from "./site";

const { site } = getDictionary("de");
const ARTICLES = getArticles("de");

export function llmsIndex() {
  return `# ${SITE.name}\n\n> ${site.role}. Applied AI Engineering für Unternehmen in Deutschland.\n\n${site.biography}\n\n## Website\n\n- [Profil und Leistungen](${SITE.origin}/): Zusammenarbeit als Freelancer, KI-Integration, Coding Agents und selbst gehostete KI.\n- [Vorträge und Auftritte](${SITE.origin}/speaking): Konferenzen, Panels und KI-Meetups.\n- [Praxiswissen](${SITE.origin}/blog): Technische Artikel für Unternehmen und Entwicklungsteams.\n\n## Artikel\n\n${ARTICLES.map((article) => `- [${article.title}](${SITE.origin}/blog/${article.slug}/index.md): ${article.summary} Veröffentlicht ${article.publishedAt}, aktualisiert ${article.updatedAt}.`).join("\n")}\n\n## Weitere Informationen\n\n- [Vollständige Inhalte](${SITE.origin}/llms-full.txt): Profil und alle Artikel als Text.\n- [Persönliche Website](${SITE.profiles[0]}): Weitere öffentliche Arbeiten von Riccardo Lamanna.\n- [Gespräch buchen](https://calendly.com/mail-rick/30min): 30-minütiges Erstgespräch.\n`;
}

export function llmsFull() {
  return `${llmsIndex()}\n\n${ARTICLES.map((article) => {
    return `---\n\n# ${article.title}\n\nAuthor: ${SITE.name}\nPublished: ${article.publishedAt}\nUpdated: ${article.updatedAt}\nCanonical: ${SITE.origin}/blog/${article.slug}\n\n${articleMarkdown("de", article)}`;
  }).join("\n\n")}\n`;
}
