# Quality assurance — 23 November 2026

## Executed successfully

- `npm run typecheck`: strict TypeScript.
- `npm run lint`: ESLint, no errors/warnings.
- `npm run test:unit`: 2 tests, covering building collisions/entrances, map bounds and content references.
- `npm run build`: complete static export, all routes generated.
- `npm test`: 12 Playwright tests. Includes internal page/link checks, all six case-study sections, Resume fallback, responsive layouts, mobile navigation, axe, actual game movement/collision/proximity interaction, four building dialogs, focus restoration, canvas cleanup/recreation, touch controls, a failed Phaser chunk, reduced motion, no-JavaScript homepage and no Phaser download on homepage.
- Widths 320, 375, 768, 1024 and 1440: home, FITZ case study and world checked for horizontal overflow.
- `node scripts/check-export.mjs`: six HTML routes and 130 local references verified at root. The same check passed after a production build with `/portfolio` as base path. The check verifies asset/page existence and sitemap paths; actual GitHub hosting was not exercised.
- Visual inspection: homepage desktop/mobile and desktop/mobile campus, including an open building panel. Captures in `qa/`.

## Lighthouse measurement

Lighthouse 13.6.0, Chrome 157, macOS; local static export served at localhost:3100. Mobile emulation 412×823 at DPR 1.75; simulated throttling, 150ms RTT, 1,638.4Kbps throughput and 4× CPU slowdown. One measured run per page, not field data or an average.

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Home | 100 | 100 | 100 | 100 |
| Retail forecasting case study | 100 | 100 | 100 | 100 |

Measured with `NEXT_PUBLIC_SITE_URL=http://localhost:3100` so indexable production metadata could be checked locally. No external deployment occurred. At that measurement stage, the default export was restored to noindex: its SEO score will intentionally be lower until a publication origin is configured. Initial noindex measurements were 100/100/100/63 for home and 100/100/100/66 for the project. Reports `qa/lighthouse-home.html`, `qa/lighthouse-project.html` and `qa/lighthouse-summary.json` contain the indexable run.

Axe found no violations of its selected WCAG 2/2.1/2.2 A/AA rules on the home, retail case study and open world dialog. Automated checks do not establish full WCAG conformance.

## Issues found and resolved

- Latest Lucide removed brand icons: replaced with neutral link/code icons.
- Phaser ESM import: switched to namespace import.
- Keyboard default prevention blocked Phaser input: React now owns scoped keyboard controls and passes intent through refs.
- Root suspense loading hid the exported home without JS: moved loading boundary to the world route.
- Initial font swap could overflow a nonwrapping heading: allowed natural wrapping and fitted the rotated map.
- WebGL context initialization was unstable across rapid remounts: chose Phaser Canvas and baked map geometry into one texture.

## Remaining manual checks before launch

1. Confirm role, dates, project wording, public links and approved resume.
2. Test Safari/Firefox, a physical touch device and VoiceOver/NVDA. Verify 200% zoom, landscape layouts, focus order and contrast with user preferences.
3. Hide/show the tab and switch applications during movement; confirm no stuck controls and the same player position. Code handles lifecycle events; long-duration memory/CPU profiling has not been performed.
4. Configure the real origin/subpath; check redirects, 404, OG image, sitemap and robots on the final host.
5. Verify external LinkedIn/GitHub destinations. Their URLs come from the supplied profile; account availability is not asserted by the internal-link tests.
6. Repeat Lighthouse against the deployed site after authorization.

## Phase 5 — GitHub Pages production readiness

This section supersedes the earlier local-only metadata configuration, while retaining the historical measurements above. The final Phase 5 artifact is built for `https://pedroalsilva.github.io` with an empty base path. Nothing has been deployed.

### Checks executed in Phase 5

| Check | Result |
|---|---|
| TypeScript | Passed; command now generates Next route types before `tsc` for fresh checkouts |
| ESLint | Passed |
| Unit tests | 2 passed |
| Production build | Passed; static routes generated in `out/` |
| Export verification | 6 routes and 153 local HTML/CSS/font references passed; OG PNG, `.nojekyll`, custom 404, canonical URLs, sitemap and indexable robots verified |
| Browser suite | 17 passed: all 12 existing tests plus 4 direct-entry/refresh checks and a missing-resume check |
| Clean source copy | Type generation, production build and export verification passed without inherited `.next`, `out` or `public/documents`; existing installed dependencies were reused, so this was not a fresh network `npm ci` |
| Workflow configuration | YAML parsed; main/manual triggers, build dependency, environment and job-scoped permissions checked locally |
| Linux portability | Removed fixed macOS Chrome path in CI; workflow installs matching Playwright Chromium. GitHub-hosted execution remains untested |

The new direct-route checks load `/world` and each project without a trailing slash, follow the static server's directory handling and refresh successfully. They monitor missing HTTP resources. Actual GitHub Pages edge/redirect behavior still needs post-deployment verification. Existing gameplay, collision, touch, dialog focus, cleanup, responsive widths and axe checks remain passing. Keyboard movement assertions now wait for coordinates rather than assuming a fixed rendering rate, making them suitable for slower CI workers.

### Content/privacy review

- Automated pattern review of the candidate source files found no matching private keys, GitHub tokens, AWS access keys, personal absolute filesystem paths or local-file URLs. This is a bounded scan, not a guarantee that all possible secrets are detectable.
- At the original review, `public/` contained the favicon, original OG image and `.nojekyll`; Phase 5.3 adds license notices; no private PDF, raw employer data or source dataset is included.
- Internal `CONTENT_TODO.md`, QA captures/reports, environment overrides and build/cache files are ignored by Git. The parent CV folder is outside this repository.
- Existing academic/personal/professional distinctions are retained. No achievements, outcomes, dates or metrics were added in Phase 5.
- Resume is intentionally absent. Header says **Profile**, contact says **Professional profile**, and the overview explains that the download is pending. No dead download URL exists.
- LinkedIn/GitHub URLs retain their supplied values. Their remote account status and availability were not checked, as all remote actions require authorization.
- Final wording, current role/dates, employer references, academic adoption wording and public contact destinations still need owner approval. See the local `CONTENT_TODO.md`.

### Deployment verification still pending

- [x] Repository inspected using authenticated browser access in Phase 5.1; CLI is optional.
- [x] Public empty repository created in Phase 5.1; local origin configured. No commit-backed remote branch yet.
- [ ] Approve public source/content and resume upload or an explicit launch without PDF.
- [ ] Configure Pages source as GitHub Actions; verify environment restrictions permit `main`.
- [ ] Authorize initial push and automatic publication.
- [ ] Observe a successful Actions run, then verify real homepage, world, direct project routes, refresh, custom 404, fonts and images.
- [ ] Check canonical URLs, robots, sitemap, external links and PDF on the actual host.
- [ ] Re-measure Lighthouse on the deployed site. The previous 100 scores are historical local measurements, not new Phase 5 or public-host measurements.

No GitHub API/browser requests, remote repository mutations or pushes were performed during the original Phase 5 local preparation; the separately authorized repository creation followed in Phase 5.1. No successful public deployment is claimed. Exact commands and recovery guidance are in `DEPLOYMENT.md`.

## Phase 5.3 — 24 November 2026

The repository exists at https://github.com/pedroalsilva/pedroalsilva.github.io with **Public** visibility. Local `origin` points to that repository and the local branch is `main`. There are no commits yet and no code has been pushed. GitHub Pages is not enabled; https://pedroalsilva.github.io is not yet active. Repository creation was completed in Phase 5.1; no remote changes are made in Phase 5.3.

Full third-party notices are now generated before either build and verified byte-for-byte in the export. Professional content is unchanged. `CONTENT_APPROVAL.md` is a local-only owner checklist, ignored by Git. Resume remains null and no PDF has been added. Validation results follow.

### Phase 5.3 executed validation

- TypeScript and ESLint: passed.
- Unit tests: 2 passed. The sandbox blocked tsx IPC; the authorized rerun outside the sandbox passed.
- Production build: passed. Export verification: 6 routes and 153 local HTML/CSS/font references, canonical URLs, sitemap, robots, OG, 404 and `.nojekyll` passed.
- License verification: 192 complete notice entries (459,677 bytes) generated and compared byte-for-byte with the static output. Font OFL, icon ISC/MIT and runtime/vendored notices included. Native build binaries are not exported; scope is documented in `ASSETS.md`.
- Browser tests: 17 passed in 22.8 seconds against the rebuilt local static export, including gameplay, touch, dialogs, cleanup, responsive layouts, direct route refresh and unavailable resume.
- Candidate review: 53 source/asset/documentation files; no staged files, commits, private PDFs, symlinks or actionable secret matches. The initial path-pattern match was an illustrative path in this QA document, not personal data; the example was removed. Pattern scanning cannot guarantee absence of every possible secret.
- Application source hashes match the Phase 5.2 review: no professional copy, design or gameplay source changed.
- Exact candidate paths and hashes are retained locally under `qa/phase53/`; these reports and `CONTENT_APPROVAL.md` are ignored. No staging or remote action was performed.

Remaining: owner approval of exact wording in `CONTENT_APPROVAL.md`; approved resume or acceptance of the current unavailable-download state; separate authorization for first commit/push, Pages settings and deployment. Physical-device/assistive-technology checks and live-host checks listed above remain pending. No new Lighthouse measurement or GitHub-hosted workflow run is claimed.

## Phase 5.4 — Resume and portrait review

The two-page A4 English draft is retained in ignored `qa/phase54/` as PDF and editable DOCX. Both pages were rendered and visually inspected; text extraction, metadata, three link annotations and embedded fonts were verified. No separate ATS variant is necessary for the single-column, selectable-text layout; no third-party ATS parser was tested. The portfolio URL is marked launch pending. Resume download remains unavailable until approval; no PDF is in the export.

The original owner portrait was selected after reviewing both supplied photographs. About uses lazy-loaded 480px/800px WebP versions (approximately 19/48 KB), without EXIF/XMP or facial edits. Desktop/mobile screenshots were inspected. A pre-existing missing-space issue where mobile hides heading line breaks was corrected in About.

TypeScript, ESLint, two unit tests, production build and six-route export validation passed. Browser suite: 19 passed, including two new portrait/current-source/email checks, existing pending-resume behavior, five responsive widths, axe and game flows. No gameplay code changed. External social destinations were not revalidated remotely in this phase; PDF URI targets were inspected, not treated as evidence of remote availability. No new Lighthouse or real-device results claimed.

Pending: owner approval of the CV, English qualification translation, portrait publication and earlier CONTENT_APPROVAL items. Deployment remains unauthorized. No staging, commits, pushes or GitHub changes.

## Approved PDF integration — 24 November 2026

Owner approved the revised CV and About photograph; local download integration is complete. The exact approved PDF was copied unchanged to `public/documents/Pedro_Silva_Resume.pdf`; its SHA-256 matches the review copy and exported copy: `4f8ade50f644937e46bd46b0ec3a30c8c4185bb2ef2dd71af2ed344c406af7da`.

Executed: TypeScript, ESLint, 2 unit tests, production build, export verification (6 routes, 155 HTML/CSS/font references and full notices) and all 20 browser tests passed. Browser run completed in 22.5 seconds. Download tests exercise header, contact and profile-page links at 375px and 1440px, check PDF MIME type and filename, and compare downloaded bytes to the approved source. Existing responsive, accessibility, direct-route refresh and gameplay checks passed.

Two issues resolved during validation: identical duplicate generated type files caused TypeScript errors (isolated in ignored QA storage); Next Link attempted to prefetch the PDF as an application route, causing 404s (replaced download links with native anchors). Final full browser run passed without those errors.

No PDF content changes, staging, commits, pushes, Pages changes or deployment. Earlier pending-CV/photo statuses are superseded by owner approval; unrelated wording approvals remain separate.

## Approved website wording — 24 November 2026

Applied the owner-approved About progression, PostgreSQL personal-project footnote, forecasting adoption sentence, all three project learning statements and Career Archive coordination wording. Existing hero/experience summaries retained; optional demos/source links and extra assets omitted. Consolidated CONTENT_APPROVAL.md and CONTENT_TODO.md to remove superseded pending decisions, preserving previous review history locally.

Executed successfully: TypeScript, ESLint, 2 unit tests, production build, export validation (6 routes, 155 references and complete notices), and 20 browser tests in 23.0 seconds. Exact approved text was checked in generated homepage/project HTML; downloadable PDF matches the local approved file. Responsive widths, axe, downloads, direct refresh, portrait and Phaser flows passed. No fresh Lighthouse, remote availability or public-host result is claimed.

All agreed initial content is approved. Commit, public push, Pages settings and deployment remain unauthorized. Staging remains empty; no remote action performed.

## Public deployment verified — 24 November 2026

Workflow run 45382725233 completed build and deployment successfully for commit 46a1024. Nineteen browser tests passed against https://pedroalsilva.github.io in 27.3 seconds: CV byte equality and native downloads at 375/1440px; all project direct routes/refresh; five responsive widths; axe; portrait; Phaser movement, collision, interactions, touch controls and load-failure alternatives. The test with a hardcoded localhost no-JS URL was excluded from this remote suite and its public checks were run separately.

HTTPS checks passed for home/world/resume/three projects, sitemap, robots, OG image, full third-party notices and approved PDF. Canonical URLs/indexability validated; missing URL returned 404. Screenshots from the public site are in ignored qa/. No new Lighthouse measurement claimed.

GitHub emitted non-blocking action-runtime deprecation warnings for v4 actions (Node 20 target forced to Node 24); both jobs succeeded. Review action major versions during maintenance.


## 2026-11-24 — Hero, applied AI and campus readability

Owner approved publication of the revised personal hero, three factual AI/automation cards and readable campus captions. Mobile now fits the complete map at 4:3, keeping captions centred on their buildings; captions are removed when the game is disposed.

Local checks: production build (including TypeScript), standalone typecheck, ESLint, 2 unit tests and 25 browser tests passed. Static export, local asset references, metadata and license notices verified. Browser checks include captions at 320/375/768px, desktop/mobile navigation, movement, collisions, touch controls, panels, resume and accessibility. Duplicate generated `.next/types` files were moved out of the project and regenerated before the successful standalone typecheck.

Online deployment validation follows the authorized push; local screenshots are retained in ignored `qa/`.


## 2026-11-24 — Explicit game start and return journey (local review)

Added a map overlay with Start exploring, keyboard/touch guidance, disabled touch controls until start, and automatic canvas focus. Removed Focus game. Direct building navigation remains available before starting. Building content links carry a contextual return link. Session storage retains player coordinates and start state within the current browser tab; failures of storage do not block exploration. Closing a panel preserves position and does not show the start overlay again. Returning via the contextual link or browser Back restores the game without restarting.

Validated: production build with TypeScript, ESLint, static export and license checks, 2 unit tests, and 28 browser tests. New tests cover keyboard activation, pre-start direct access, project and homepage returns, browser Back, position restoration and overlay accessibility at 375/1440px. Screenshots: ignored qa/world-start-375.png, qa/world-start-1440.png, qa/world-return-375.png and qa/world-return-1440.png. Owner approved this version and authorized commit, push and online validation on 2026-11-24. Deployment and online verification follow the authorized push.


## 2026-11-24 — Building collections and Career Journey (local review)

Each thematic room now offers descriptive links to its case study, relevant public professional contributions and, where applicable, experience. Direct anchors target the corresponding homepage entry, retaining the return-to-world context. All rooms preserve the sticky Return to campus action and keyboard dialog closure.

Career Journey replaces Career Archive. It presents professional experience above a shared year axis and education below; mobile uses labelled vertical chronological lanes. Source: existing approved experience content and the education/earlier-career wording in qa/phase54/build_resume.py (approved CV source, not distributed). Earlier roles remain aggregated as 2016–2020; Future Leaders uses 2020–2021 and education uses year-only ranges to avoid unresolved month discrepancies. The axis uses year-level placement, not month-precise duration. Selection displays the full entry and scrolls its details into view. No new achievement or qualification claims.

Checks: production build including TypeScript, ESLint, export/assets/licenses, 2 unit tests and 30 browser tests passed. After the final typography/selection refinement, targeted room and return-journey tests were rerun. Screenshots in ignored qa/rooms-375.png, qa/rooms-1440.png, qa/career-375.png and qa/career-1440.png. Owner approved publication on 2026-11-24. Academic titles use the full approved Master’s in / Postgraduate Diploma / Executive MBA / Degree wording, without introducing MSc equivalence. Academic labels are not truncated; the two desktop/mobile room tests passed again after this correction.
