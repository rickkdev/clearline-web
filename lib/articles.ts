import { readFileSync } from "node:fs";
import { join } from "node:path";

export const ARTICLES = [
  {
    slug: "hermes-agent-unternehmen",
    title: "Hermes Agent im Unternehmen: VPS, Teamprofile und Wissensbasis",
    description: "Hermes Agent als Wissensassistent im Unternehmen einrichten: EU-VPS, getrennte Teamprofile, Slack, Microsoft Teams und ein überprüfbarer Pilotbetrieb.",
    publishedAt: "2026-10-29",
    updatedAt: "2026-10-29",
    category: "KI im Unternehmen",
    summary: "Vom EU-VPS zum Wissensassistenten mit Teamprofilen, Quellen und kontrollierten Zugriffsrechten.",
  },
  {
    slug: "coding-agents-verifikation",
    title: "Coding Agents im Team: Kontext, MCP und überprüfbare Ergebnisse",
    description: "Coding Agents mit Jira, GitHub und GitLab verbinden und ihre Arbeit mit Playwright, isolierten Browserprofilen und kurzen Prüfzyklen verifizieren.",
    publishedAt: "2026-10-28",
    updatedAt: "2026-10-29",
    category: "AI Engineering",
    summary: "Wie ein Team Coding Agents mit passendem Kontext ausstattet und Ergebnisse im echten Produkt prüft.",
  },
];

export function getArticle(slug: string) {
  const article = ARTICLES.find((item) => item.slug === slug);
  if (!article) return undefined;
  return { ...article, body: articleMarkdown(article) };
}

export function articleMarkdown(article: (typeof ARTICLES)[number]) {
  return readFileSync(join(process.cwd(), "content", "blog", `${article.slug}.md`), "utf8");
}

export function headingId(text: string) {
  return text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/ß/g, "ss").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function articleHeadings(body: string) {
  return [...body.matchAll(/^## (.+)$/gm)].map((match) => ({ title: match[1], id: headingId(match[1]) }));
}
