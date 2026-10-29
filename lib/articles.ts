import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { ArticleSlug } from "./article-visuals";
import { DEFAULT_LOCALE, type Locale } from "./i18n";

type ArticleText = { title: string; description: string; category: string; summary: string };

const ARTICLE_SOURCES = [
  {
    slug: "case-study-junikom",
    publishedAt: "2026-10-29",
    updatedAt: "2026-10-29",
    text: {
      de: {
        title: "Case Study Junikom: Von Coding Agents bis CRM – KI im ganzen Unternehmen",
        description: "Wie die Entwicklungsteams von Junikom mit Coding Agents, MCP, Playwright-Verifikation, Open-Source-Pentests und einer KI-Schulung nach Art. 4 AI Act schneller liefern.",
        category: "Case Study",
        summary: "Drei Monate Projekt, verlängert um weitere Monate: Entwicklungsteams, Sicherheit, Salesforce und KI-Kompetenz bei einem Softwareanbieter für Kommunen.",
      },
      en: {
        title: "Junikom case study: From coding agents to CRM – AI across the whole company",
        description: "How Junikom's engineering teams ship faster with coding agents, MCP, Playwright verification, open-source pentests and AI literacy training under Article 4 of the AI Act.",
        category: "Case Study",
        summary: "A three-month engagement, extended by further months: engineering teams, security, Salesforce and AI literacy at a software vendor for municipalities.",
      },
    },
  },
  {
    slug: "hermes-agent-unternehmen",
    publishedAt: "2026-10-29",
    updatedAt: "2026-10-29",
    text: {
      de: {
        title: "Hermes Agent im Unternehmen: VPS, Teamprofile und Wissensbasis",
        description: "Hermes Agent als Wissensassistent im Unternehmen einrichten: EU-VPS, getrennte Teamprofile, Slack, Microsoft Teams und ein überprüfbarer Pilotbetrieb.",
        category: "KI im Unternehmen",
        summary: "Vom EU-VPS zum Wissensassistenten mit Teamprofilen, Quellen und kontrollierten Zugriffsrechten.",
      },
      en: {
        title: "Hermes Agent in the company: VPS, team profiles and knowledge base",
        description: "Setting up Hermes Agent as a company knowledge assistant: EU VPS, separate team profiles, Slack, Microsoft Teams and a verifiable pilot.",
        category: "AI in the company",
        summary: "From an EU VPS to a knowledge assistant with team profiles, sources and controlled access rights.",
      },
    },
  },
  {
    slug: "coding-agents-verifikation",
    publishedAt: "2026-10-28",
    updatedAt: "2026-10-29",
    text: {
      de: {
        title: "Coding Agents im Team: Kontext, MCP und überprüfbare Ergebnisse",
        description: "Coding Agents mit Jira, GitHub und GitLab verbinden und ihre Arbeit mit Playwright, isolierten Browserprofilen und kurzen Prüfzyklen verifizieren.",
        category: "AI Engineering",
        summary: "Wie ein Team Coding Agents mit passendem Kontext ausstattet und Ergebnisse im echten Produkt prüft.",
      },
      en: {
        title: "Coding agents in the team: context, MCP and verifiable results",
        description: "Connecting coding agents to Jira, GitHub and GitLab and verifying their work with Playwright, isolated browser profiles and short review cycles.",
        category: "AI Engineering",
        summary: "How a team gives coding agents the right context and verifies results in the real product.",
      },
    },
  },
  {
    slug: "ki-kompetenz-schulung-ai-act",
    publishedAt: "2026-10-27",
    updatedAt: "2026-10-27",
    text: {
      de: {
        title: "KI-Kompetenz nach Art. 4 AI Act: Schulung und Workshop für Unternehmen",
        description: "KI-Schulung für Mitarbeitende nach Art. 4 AI Act: Was die Pflicht zur KI-Kompetenz verlangt, welche Inhalte eine Schulung braucht und wie Sie sie dokumentieren.",
        category: "Compliance",
        summary: "Was Art. 4 AI Act nach dem Digital Omnibus verlangt und wie ein Workshop zur KI-Kompetenz mit Nachweis für Ihr Team aussieht.",
      },
      en: {
        title: "AI literacy under Article 4 of the AI Act: training and workshops for companies",
        description: "AI literacy training for employees under Article 4 of the AI Act: what the obligation requires, what a training should cover and how to document it.",
        category: "Compliance",
        summary: "What Article 4 of the AI Act requires after the Digital Omnibus and what an AI literacy workshop with documentation looks like for your team.",
      },
    },
  },
] satisfies { slug: ArticleSlug; publishedAt: string; updatedAt: string; text: Record<Locale, ArticleText> }[];

export type Article = Omit<(typeof ARTICLE_SOURCES)[number], "text"> & ArticleText;

export const ARTICLE_SLUGS = ARTICLE_SOURCES.map(({ slug }) => slug);

export function getArticles(locale: Locale): Article[] {
  return ARTICLE_SOURCES.map(({ text, ...article }) => ({ ...article, ...text[locale] }));
}

export function findArticle(locale: Locale, slug: string) {
  return getArticles(locale).find((article) => article.slug === slug);
}

export function getArticle(locale: Locale, slug: string) {
  const article = findArticle(locale, slug);
  if (!article) return undefined;
  return { ...article, body: articleMarkdown(locale, article) };
}

export function articleMarkdown(locale: Locale, article: Article) {
  const directory = locale === DEFAULT_LOCALE ? ["content", "blog"] : ["content", "blog", locale];
  return readFileSync(join(process.cwd(), ...directory, `${article.slug}.md`), "utf8");
}

export function headingId(text: string) {
  return text.normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/ß/g, "ss").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function articleHeadings(body: string) {
  return [...body.matchAll(/^## (.+)$/gm)].map((match) => ({ title: match[1], id: headingId(match[1]) }));
}
