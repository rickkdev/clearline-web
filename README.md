# Clearline Web

A Next.js website with responsive layouts, local media, and an event archive.

## Run locally

Use Node.js 22 and pnpm 9.6.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open [localhost:3000](http://localhost:3000).

## Check and build

```sh
pnpm lint
pnpm build
pnpm start
```

## Deploy to Vercel

Import this GitHub repository as a new project in [Vercel](https://vercel.com/new).
Use the Next.js preset with the repository root as the root directory.
Keep the detected install and build settings. No environment variables are required.

## Maintain content and discovery

Edit site identity and the canonical origin in `lib/site.ts`.
Add article metadata to `lib/articles.ts` and the article body to `content/blog/`.
The sitemap, blog pages, Markdown endpoints, and LLM text files use those sources.

To verify a production build, start it in one terminal:

```sh
pnpm build
pnpm start --port 3125
```

Run the HTTP checks in another terminal:

```sh
pnpm check:seo http://localhost:3125
```

The check covers canonical URLs, server-rendered article text, structured data,
social images, crawler files, and missing-page status codes.
To add site verification tags, set `GOOGLE_SITE_VERIFICATION` or `BING_SITE_VERIFICATION` in the deployment environment.

## License

Source code is available under the [MIT license](LICENSE).
Photos, video, personal branding, written site content, and third-party logos are excluded from this license.
