<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Git identity and pushing

Commit and push as the `rickkdev` GitHub account with the email `mail@riccardolamanna.de`. Never use the global identity (`Rick Lamanna <rick.lamanna@junikom.de>`). That email is a work address and is not linked to `rickkdev`, so GitHub cannot attribute those commits to the account.

This repo sets the identity locally. Before committing, check it:

```sh
git config user.name   # rickkdev
git config user.email  # mail@riccardolamanna.de
```

If either value is wrong, run `git config user.name rickkdev` and `git config user.email mail@riccardolamanna.de` in this repo. Do not change the global config.

The local branch `clearline-web` tracks `origin/main`. Push with `git push origin HEAD:main`.
