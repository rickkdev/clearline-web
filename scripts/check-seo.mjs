import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";

const base = new URL(process.argv[2] ?? "http://localhost:3125");
const canonicalOrigin = "https://www.riccardolamanna.de";
const slugs = readdirSync("content/blog").filter((name) => name.endsWith(".md")).map((name) => name.slice(0, -3));
const pages = ["/", "/speaking", "/blog", ...slugs.map((slug) => `/blog/${slug}`)];
const titles = new Set();
const descriptions = new Set();
const requestedDates = {
  "hermes-agent-unternehmen": "2026-10-29",
  "coding-agents-verifikation": "2026-10-28",
};

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], match[2].replaceAll("&amp;", "&")]));
}

async function get(path, userAgent = "ClearlineSEOCheck/1.0") {
  const response = await fetch(new URL(path, base), { headers: { "User-Agent": userAgent } });
  return { response, body: await response.text() };
}

for (const path of pages) {
  const { response, body } = await get(path);
  assert.equal(response.status, 200, `${path} must return 200`);
  assert.match(response.headers.get("content-type"), /text\/html/, `${path} must return HTML`);
  const head = body.match(/<head>([\s\S]*?)<\/head>/)?.[1];
  assert.ok(head, `${path} must have an initial HTML head`);
  const title = head.match(/<title>(.*?)<\/title>/)?.[1];
  const meta = [...head.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
  const links = [...head.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag));
  const description = meta.find((item) => item.name === "description")?.content;
  assert.ok(title?.includes("Rick Lamanna"), `${path} title must name Rick Lamanna`);
  assert.ok(!titles.has(title), `${path} title must be unique`);
  titles.add(title);
  assert.ok(description?.length > 40, `${path} needs a useful description`);
  assert.ok(!descriptions.has(description), `${path} description must be unique`);
  descriptions.add(description);
  assert.equal(new URL(links.find((item) => item.rel === "canonical")?.href).href, new URL(path, canonicalOrigin).href, `${path} canonical`);
  assert.ok(!meta.some((item) => item.name === "robots" && /noindex/.test(item.content)), `${path} must be indexable`);
  assert.equal([...body.matchAll(/<h1\b/g)].length, 1, `${path} must have one H1`);
  assert.ok(!/mailto:|mail@riccardolamanna\.de/.test(body), `${path} must not restore email contact`);
  const data = [...body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const entities = data.flatMap((item) => item["@graph"] ?? [item]);
  const person = entities.find((item) => item["@type"] === "Person");
  assert.equal(person?.name, "Rick Lamanna", `${path} person identity`);
  assert.equal(person?.["@id"], `${canonicalOrigin}/#person`, `${path} stable person ID`);
  const og = meta.find((item) => item.property === "og:image")?.content;
  assert.ok(og?.startsWith(canonicalOrigin), `${path} absolute social image`);
  assert.ok(meta.some((item) => item.name === "twitter:card" && item.content === "summary_large_image"), `${path} Twitter card`);

  if (path.startsWith("/blog/")) {
    const post = entities.find((item) => item["@type"] === "BlogPosting");
    assert.ok(post, `${path} article structured data`);
    assert.equal(post.author["@id"], person["@id"], `${path} article author`);
    const slug = path.split("/").at(-1);
    assert.match(post.datePublished, /^\d{4}-\d{2}-\d{2}$/, `${path} publication date`);
    assert.ok(body.includes(`dateTime="${post.datePublished}"`), `${path} schema date matches visible date`);
    if (requestedDates[slug]) {
      assert.equal(post.datePublished, requestedDates[slug], `${path} requested publication date`);
      assert.equal(post.dateModified, "2026-10-29", `${path} source review date`);
    }
    assert.ok(entities.some((item) => item["@type"] === "BreadcrumbList"), `${path} breadcrumbs`);
    const ids = [...body.matchAll(/<h2 id="([^"]+)"/g)].map((match) => match[1]);
    assert.ok(ids.length > 0, `${path} must contain the article in server HTML`);
    assert.equal(new Set(ids).size, ids.length, `${path} unique heading IDs`);
    for (const id of ids) assert.ok(body.includes(`href="#${id}"`), `${path} TOC links to ${id}`);
    if (requestedDates[slug]) assert.ok(body.includes("<pre>") && body.includes("<table>"), `${path} code examples and comparison table`);
    const markdown = await get(`${path}/index.md`);
    assert.equal(markdown.response.status, 200, `${path} Markdown endpoint`);
    assert.match(markdown.response.headers.get("content-type"), /text\/markdown/, `${path} Markdown content type`);
    assert.ok(markdown.body.includes(readFileSync(`content/blog/${path.split("/").at(-1)}.md`, "utf8")), `${path} Markdown matches article source`);
  }
  const imagePath = new URL(og).pathname;
  const image = await fetch(new URL(imagePath, base));
  assert.equal(image.status, 200, `${path} social image response`);
  assert.match(image.headers.get("content-type"), /image\/png/, `${path} social image content type`);
  const png = Buffer.from(await image.arrayBuffer());
  assert.equal(png.readUInt32BE(16), 1200, `${path} social image width`);
  assert.equal(png.readUInt32BE(20), 630, `${path} social image height`);
  console.log(`PASS ${path}: server HTML, metadata, JSON-LD, social image${path.startsWith("/blog/") ? ", Markdown" : ""}`);
}

const robots = await get("/robots.txt");
assert.equal(robots.response.status, 200);
assert.match(robots.body, /User-Agent: \*[\s\S]*Allow: \//i);
assert.ok(!/^Disallow: \/\s*$/m.test(robots.body), "Public crawlers must not be blocked");
assert.ok(robots.body.includes(`${canonicalOrigin}/sitemap.xml`), "robots points to canonical sitemap");
const sitemap = await get("/sitemap.xml");
assert.equal(sitemap.response.status, 200);
const locations = [...sitemap.body.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(new Set(locations), new Set(pages.map((path) => new URL(path, canonicalOrigin).href)), "Sitemap must list only the public pages");
for (const path of ["/llms.txt", "/llms-full.txt"]) {
  const result = await get(path);
  assert.equal(result.response.status, 200, path);
  assert.match(result.response.headers.get("content-type"), /text\/plain/, path);
  assert.ok(result.body.includes("Rick Lamanna") && result.body.includes("Fractional Head of AI"), `${path} identity`);
  for (const slug of slugs) {
    assert.ok(result.body.includes(slug), `${path} links article ${slug}`);
    if (path === "/llms-full.txt") assert.ok(result.body.includes(readFileSync(`content/blog/${slug}.md`, "utf8")), `${path} contains the exact article source`);
  }
}
for (const path of ["/blog/not-a-real-article", "/blog/not-a-real-article/index.md"]) {
  assert.equal((await get(path)).response.status, 404, `${path} must return HTTP 404`);
}
for (const agent of ["Googlebot", "bingbot", "OAI-SearchBot"]) {
  const result = await get("/blog/coding-agents-verifikation", agent);
  assert.equal(result.response.status, 200, `${agent} response`);
  assert.ok(result.body.includes('rel="canonical"') && result.body.includes("Playwright"), `${agent} receives metadata and article text`);
}
console.log("PASS robots, sitemap, LLM text, unknown-route 404s, and crawler HTML");
