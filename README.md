# Pedro Silva — Interactive Portfolio

A locally prepared professional portfolio and original Phaser campus built around **From Operations to Intelligence**. All public copy is English. No deployment has been made.

## Run

Use Node 22.14+ (Node 24 LTS recommended) and npm. The lockfile records the versions actually installed. This environment used Node 26.0.0.

```sh
npm ci
npm run dev
```

For the production export:

```sh
npm run build:production
npm run preview
```

Open http://localhost:3100. `out/` is the deployable artifact; no server runtime is needed. Do not use `next start` for this export.

## Stack

Next.js App Router 16.4.6, React 19.3.1, TypeScript 6, Tailwind CSS 4, Motion 14, Phaser **3.90.0** (explicitly kept on the requested major), Lucide, self-hosted Fontsource fonts. Strict TypeScript; structured content, no CMS or backend. CSS tokens and component styles complement Tailwind's utilities.

## Quality checks

```sh
npm run typecheck
npm run lint
npm run test:unit
npm run build
npm test
npm run audit:lighthouse
```

Playwright uses installed Chrome on local macOS. Linux/CI uses Playwright Chromium, installed in the workflow with `npx playwright install --with-deps chromium`. `CHROME_PATH` can explicitly select an executable. `TEST_ORIGIN` optionally overrides the tested origin. A local export server is launched by Playwright if needed. Lighthouse expects `npm run preview` already running. See `QA.md` for actual results and manual checks; automated accessibility tests are not a WCAG certification.

## Editing content

Edit `src/content/portfolio.ts` for experience, projects, skills, contact links and building panels. Project slugs are generated at build time. `profile.email` is owner-approved; `profile.resume` points to the owner-approved `/documents/Pedro_Silva_Resume.pdf`. The navigation, contact section and professional overview offer the approved PDF download. Place the approved PDF at `public/documents/Pedro_Silva_Resume.pdf`, set `profile.resume` to `/documents/Pedro_Silva_Resume.pdf`, rebuild, and verify the native download on `/resume/`; never silently copy private application CVs.

Public descriptions are grounded in `../career-profile/MASTER_PROFILE.md`; that internal source is **not** copied into the site. Check the local-only `CONTENT_APPROVAL.md` and `CONTENT_TODO.md` before launch; it is ignored by Git to keep internal owner-review notes private. Do not publish the parent CV2026 folder.

## Deployment preparation

No credentials are included. Publication needs explicit owner authorization.

### Vercel / custom domain

Import only `portfolio/` as the project root. Set the build command to `npm run build` and output directory to `out`. Set `NEXT_PUBLIC_SITE_URL=https://the-approved-domain` and leave `NEXT_PUBLIC_BASE_PATH` empty. Environment values are compiled at build time. Rebuild after changing them.

### GitHub Pages

Target repository: `https://github.com/pedroalsilva/pedroalsilva.github.io`. Production URL: `https://pedroalsilva.github.io`. This is an account site: **basePath is empty**, and no asset prefix or custom domain is required.

The repository exists at https://github.com/pedroalsilva/pedroalsilva.github.io with **Public** visibility. Local `origin` points to that repository and the local branch is `main`. There are no commits yet and no code has been pushed. GitHub Pages is not enabled; https://pedroalsilva.github.io is not yet active. Repository creation was completed in Phase 5.1; no remote changes are made in Phase 5.3.

`.github/workflows/deploy.yml` is the only deployment workflow. Pushes to `main` and manual dispatch run locked installation, typecheck, lint, unit tests, production build, export/metadata verification and browser tests before uploading `out/`. Only the deployment job receives Pages/OIDC write permissions. Deployment uses the `github-pages` environment, serial concurrency and official Pages actions.

`npm run build:production` sets the production origin and empty base path explicitly, independently of local `.env` values. `npm run check:production` verifies generated canonical URLs, robots, sitemap and static assets. No repository variables or secrets are needed. Set **Settings → Pages → Build and deployment → Source: GitHub Actions** after authorization. See `DEPLOYMENT.md` for remote inspection, initial publication and update procedures. Pushing `main` can publish the site automatically once Pages is enabled; do not push before content/publication approval.

`output: 'export'`, `trailingSlash`, `generateStaticParams`, static sitemap/robots and unoptimized images support static hosting. Next handles internal link prefixes; `asset()` prefixes public assets. `out/.nojekyll` is included. No API routes, server actions, middleware, cookies, telemetry or contact form.

For generic `npm run build`, without a configured origin, metadata deliberately uses a localhost URL and `noindex`. The dedicated production build is indexable with the final GitHub Pages origin. This prevents an unreviewed local build from being treated as launch-ready SEO. Configure the origin and rebuild before publication.

## Assets

Campus, sprites and project illustrations are original code-generated artwork. No reference-site assets or code were copied. `ASSETS.md` documents fonts and third-party licenses. Regenerate the Open Graph PNG with `node scripts/generate-og.mjs` (uses Sharp supplied by Next.js). Phaser is imported only by `/world`; the homepage map is an SVG preview, not a game substitute.

## Updating the portfolio

Edit content and run `npm run typecheck`, `npm run lint`, `npm run test:unit`, `npm run build:production`, `npm run check:production`, and `npm test`. After owner review and explicit publication authorization, commit and push `main`; Actions performs the same validation before deployment. Never force-push an existing remote history.

To add a case study, add a unique slug and all six sections to `projects` in `src/content/portfolio.ts`. Add its illustration or approved asset, choose the featured flag and optional approved demo/source URLs. `generateStaticParams()` builds its route automatically. Update the route lists in `scripts/check-export.mjs` and deployment tests so direct access is checked, then rebuild. Link an appropriate building if relevant. No component rewrite is needed.

## Distributed license notices

Both build commands generate `public/THIRD_PARTY_NOTICES.txt`, copied to `out/THIRD_PARTY_NOTICES.txt`. `npm run check:production` verifies the complete text against installed locked dependencies, including vendored notices. No visible attribution UI is required. See `ASSETS.md` for scope and exclusions.

## Phase 5.4 branding review

An English two-page PDF and editable DOCX draft are retained locally in ignored `qa/phase54/`. The approved PDF is now copied to `public/documents/` and included in the local export; editable sources remain local. See `RESUME.md` for approval and download activation. The About portrait is an owner-supplied photograph encoded as 480px/800px WebP, lazily loaded and framed responsively without facial retouching. The owner approved the resume and About photograph for integration. Remote publication still requires separate authorization.

## First source publication authorization

On 24 November 2026 the owner authorized the initial commit and push, including the approved resume and portrait, but not GitHub Pages activation or site publication. The deployment job is explicitly disabled with `if: ${{ false }}`. Pushes may run build/tests and upload the workflow artifact, but cannot execute the Pages deployment job. Enabling it requires a separately authorized source change and Pages setup. Earlier no-commit/no-push statements describe preparation history and are superseded by the first source publication once pushed.
