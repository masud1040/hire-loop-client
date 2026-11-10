<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# hire-loop-client

Next.js 16 (App Router) client for the Hire Loop job platform. Single package — not a monorepo. npm only (`package-lock.json`; no yarn/pnpm/bun locks). No CI, no test runner, no test files.

## Commands

- `npm run dev` — dev server (Turbopack). Also regenerates the `nextjs-agent-rules` block above.
- `npm run lint` — ESLint flat config (`eslint.config.mjs`).
- `npx tsc --noEmit` — typecheck; there is **no** `typecheck` script.
- `npm run build` / `npm start` — production build/serve.

**Baseline is red.** Both checks fail on untouched code today: `npm run lint` exits 1 (3 errors, incl. `react-hooks/set-state-in-effect` from React Compiler's rules) and `npx tsc --noEmit` exits 1 (3 errors, e.g. `asChild` type mismatches). Don't assume your change broke them — confirm the reported files are ones you touched. With no tests, lint + typecheck are the only verification.

## Environment

`.env` (gitignored) is required for dev: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URI`, `NEXT_PUBLIC_API_URL`.

- Job data comes from a **separate backend** at `NEXT_PUBLIC_API_URL` (code defaults to `http://localhost:5000`); without it running, jobs pages fail.
- `src/lib/auth.ts` also reads `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` for Google sign-in, but they are not in `.env` — Google login is silently broken until added.

## Architecture

- Path alias `@/*` → `./src/*`.
- Auth is better-auth + MongoDB adapter; database name `hire-loop` is hardcoded in `src/lib/auth.ts`. Server route: `src/app/api/auth/[...all]/route.ts`; browser client: `src/lib/auth-client.ts`. Users carry a custom `role` field (`admin` | `seeker` | `recruiter`, default `seeker`) set at sign-up.
- **No middleware and no server-side route protection.** Role gating is entirely client-side in `src/app/components/Dashboard_sidbar.tsx`, which falls back to `seeker`. Role routes: `/dashboard/{seeker,recruiter,admin}`.
- Job CRUD goes to the external backend via plain `fetch` in `src/lib/api/jobs.ts` and `src/lib/actions/jobs.ts`. Despite the folder name, these are **not** Next server actions (no `"use server"` directive).
- shadcn/ui components live in `src/components/ui` (style `base-nova`, see `components.json`). Tailwind **v4**: no `tailwind.config` — theme is CSS-first in `src/app/globals.css` (`@import "tailwindcss"` + `@theme`), loaded via the `@tailwindcss/turbopack` rule in `next.config.ts`. Don't add v3 directives (`@tailwind base` etc.) or look for a config file.
- React Compiler is on (`reactCompiler: true` in `next.config.ts`).

## Gotchas

- `deleteJob` in `src/lib/actions/jobs.ts` returns `response.text()`, not JSON — callers expect a string.
- Some navigation uses `window.location.href` instead of the Next router (ESLint flags it; sign-in intentionally does a full reload).
- Don't hand-edit the `nextjs-agent-rules` block above; commit it as-is with your changes.
