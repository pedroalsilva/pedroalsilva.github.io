# Roadmap

## Implemented

- [x] Phase 1: Next.js/React/TypeScript foundation, locked dependencies, design tokens, self-hosted typography, responsive navigation and layout primitives.
- [x] Phase 2: full professional homepage, structured experience and skills, three static case studies, contact links and honest resume fallback.
- [x] Phase 3: real Phaser 3 campus, original map and directional player, normalized movement and collisions, camera, proximity prompts, keyboard/touch controls, four accessible dialogs and direct navigation.
- [x] Phase 4: motion preferences, loading/error recovery, static metadata/sitemap/robots, Open Graph asset, export/subpath configuration, tests, screenshots and deployment documentation.

## Before public launch — owner inputs

- [ ] Validate the public wording and current employment details.
- [ ] Approve a public resume PDF; optionally provide email and project demo/source links.
- [ ] Choose origin/base path and hosting account; rebuild for that destination.
- [ ] Explicitly authorize publication. No site or source repository has been published.

The local implementation is complete for content review. Missing optional personal details are intentionally not fabricated; see `CONTENT_TODO.md`.

## Known limits

- Resume currently opens a professional overview; there is no approved PDF download yet.
- Case-study visuals are original illustrations, not screenshots of confidential systems.
- Automated tests run in Chrome on macOS with viewport/touch-event emulation. Physical iOS/Android devices, Safari/Firefox, screen readers and prolonged heap profiling have not been tested.
- Lighthouse results describe local static delivery, not a deployed CDN or field performance. Default local artifacts use noindex. Published performance and SEO must be rechecked after the actual host/domain is configured.
- The map is deliberately compact. Buildings open HTML content panels rather than separate interior levels; there are no game objectives, accounts or saved progress.
- No deployment credentials were used and the GitHub Pages workflow was not dispatched.

## Optional next improvements

- Approved project screenshots and more detailed public research artifacts.
- Additional case studies from Pet Sitting House and marketplace optimization.
- Manual assistive-technology audit and physical-device tests.
- Localized content only if requested; English remains the V1 language.

## Phase 5 — GitHub Pages preparation

- [x] Local Git initialized on `main`; origin configured to `pedroalsilva/pedroalsilva.github.io`. No commit/push.
- [x] Explicit root-domain production build and canonical metadata.
- [x] Single `deploy.yml`: main/manual triggers, least-privilege deployment job, unit and browser checks.
- [x] Portable Playwright configuration for standard Linux runners.
- [x] Asset/metadata checks extended; direct entry and refresh tests added (17 browser tests pass).
- [x] Missing resume clearly labelled; exact approved PDF location and download mechanism documented.
- [x] README, QA, deployment guide and private owner checklist updated.
- [ ] Public empty repository and local origin confirmed in Phase 5.1. Pages activation, first push and actual workflow execution still require authorization.
- [ ] Public content approval and resume decision remain with the owner.

The current production artifact uses the specified GitHub Pages origin; generic local builds still default to noindex. Existing design and gameplay have been retained.

## Current local status — approved resume

Owner approved the revised resume and About photo. PDF integrated into static output with native download links; source remains editable in local QA storage. Push and public deployment remain pending separate authorization.

## Website content approved — 24 November 2026

All proposed initial website wording changes are now approved and applied. Hero/career summaries retained; About, PostgreSQL context, forecasting adoption, project learnings and Career Archive coordination updated. Optional project links/assets remain omitted. Only separately authorized release actions and live-host verification remain for this agreed scope. No commit, push or deployment authorized.
