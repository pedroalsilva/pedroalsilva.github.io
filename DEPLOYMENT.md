# GitHub Pages deployment

Target: **https://pedroalsilva.github.io**
Repository: **https://github.com/pedroalsilva/pedroalsilva.github.io**

The repository exists at https://github.com/pedroalsilva/pedroalsilva.github.io with **Public** visibility. Local `origin` points to that repository and the local branch is `main`. There are no commits yet and no code has been pushed. GitHub Pages is not enabled; https://pedroalsilva.github.io is not yet active. Repository creation was completed in Phase 5.1; no remote changes are made in Phase 5.3. Further remote changes, initial push and publication require separate authorization. Commands below are future instructions, not records of execution.

## Local state and production settings

Only the `portfolio` folder is a Git repository, initialized on `main`. `origin` points to the target repository. There are no commits yet. The parent folder and private CVs are outside this repository. Generated `out/`, `.next/`, reports, local environment files, caches and internal `CONTENT_TODO.md` are ignored.

Repository creation used authenticated GitHub browser access. GitHub CLI is not installed and is optional. The empty remote has no commit-backed default branch yet; the first approved push will create `main`.

`npm run build:production` forces:

```text
NEXT_PUBLIC_SITE_URL=https://pedroalsilva.github.io
NEXT_PUBLIC_BASE_PATH=
```

Next exports to `out/` with directory index files (`trailingSlash: true`). The production root must NOT be `/pedroalsilva.github.io`. No `CNAME` is needed. Fonts are local, the map and player textures are generated in code, and Phaser is a route-specific chunk. `.nojekyll` and `404.html` are included. Do not use `next start` or GitHub Pages' Jekyll build.

## 1. Authentication and read-only remote inspection — authorization required

Install GitHub CLI from its official distribution or Homebrew when installation is authorized:

```sh
brew install gh
gh auth login --hostname github.com --web
gh auth status --hostname github.com
gh repo view pedroalsilva/pedroalsilva.github.io --json nameWithOwner,visibility,defaultBranchRef
git ls-remote --heads origin
```

Use the browser handoff for authentication. Never paste a token into source files, command arguments or this repository. The GitHub web UI is a valid alternative; CLI is not required to host the site.

Do not interpret authentication failure or denied access as proof the repository does not exist. Confirm ownership and whether existing content/history must be retained.

## 2. Existing repository connection

The local remote is already set; inspect with `git remote -v`. If it is ever missing, the local configuration command is:

```sh
git remote add origin https://github.com/pedroalsilva/pedroalsilva.github.io.git
```

Repository creation is complete. Do not run a creation command again or change visibility. Before a future authorized push, confirm the remote is still empty; preserve any intervening content. Never force-push.

## 3. Required GitHub settings — authorization required

- **Settings → Actions → General**: allow the official actions used by the workflow, if repository policy currently blocks them.
- **Settings → Pages → Build and deployment → Source: GitHub Actions**.
- The workflow declares the `github-pages` deployment environment. If configuring environment branch restrictions, allow `main`.
- Keep Pages on the account domain; leave custom domain blank.
- No `SITE_URL`, `BASE_PATH`, repository secrets, paid hosting, API keys or custom tokens are required.
- Do not broaden the default workflow token permissions: the YAML grants Pages/OIDC writes only to its deployment job.

Do not enable branch-folder publication alongside the Actions workflow.

## 4. Validate the exact source to publish — local

Run from the portfolio root:

```sh
npm ci
npm run typecheck
npm run lint
npm run test:unit
npm run build:production
npm run check:production
npm test
```

Local macOS uses installed Chrome; Linux/CI installs matching Playwright Chromium with `npx playwright install --with-deps chromium`. `npm test` starts and stops a local static server automatically. The exported output must pass before upload. No public host is contacted by these browser tests.

Review `git status --short`, `git status --ignored --short` and the owner checklist. Configured contact destinations are the supplied LinkedIn and GitHub profiles and the explicitly approved email pedroalsilva@gmail.com. Confirm professional wording, employer names, research confidentiality and public link ownership before approval.

## 5. Resume

Place the approved PDF at **`public/documents/Pedro_Silva_Resume.pdf`** and set `profile.resume` in `src/content/portfolio.ts` to **`/documents/Pedro_Silva_Resume.pdf`**. Rebuild and check `/resume/` and the header/contact links. The export checker rejects missing linked files and empty/non-PDF documents.

Until then, navigation says **Profile**, the page explains the missing download, and no PDF URL is exposed. Launch without a PDF is technically possible only if the owner accepts this intentional state. No private CV was copied. See `RESUME.md`.

## 6. Initial publication — explicit authorization required

After remote inspection confirms an empty repository, content is approved, and the owner authorizes public source publication and Pages deployment:

```sh
git add .
git diff --cached --check
git diff --cached --stat
git diff --cached
# Review the complete staged set before committing.
git commit -m "Prepare interactive portfolio for GitHub Pages"
git push -u origin main
```

If Git identity is missing, configure the owner's chosen name and verified or GitHub noreply email locally; do not invent either. For a nonempty repository, reconcile its history first; the above initial-push procedure must not be used to overwrite it.

Pushing `main` triggers `.github/workflows/deploy.yml`. If Pages was enabled after the push, open **Actions → Deploy portfolio to GitHub Pages → Run workflow → main**, or after authorization:

```sh
gh workflow run deploy.yml --ref main --repo pedroalsilva/pedroalsilva.github.io
gh run list --workflow deploy.yml --repo pedroalsilva/pedroalsilva.github.io
```

Inspect the specific run in Actions. The build job uses `npm ci`, Node 24, strict checks, unit tests, production export, asset/SEO checks and all browser tests. Only a successful build uploads the Pages artifact. The deployment job uses `actions/deploy-pages` and the `github-pages` environment. Test failure diagnostics are retained for seven days, separate from the public site artifact.

## 7. Verify the deployment — authorization required for remote access

After Actions reports success, verify the actual public site before claiming deployment complete:

- `https://pedroalsilva.github.io/`
- `/world` and `/world/`, including refresh and game entry/exit.
- `/projects/retail-forecasting/`, `/projects/offshore-logistics/`, `/projects/fitz/`, opened directly and refreshed.
- `/resume/`, `/images/og.png`, `/sitemap.xml` and `/robots.txt`.
- An unknown URL displays the custom 404.
- No missing chunks/fonts/images, console errors, repository-path prefixes or localhost canonical URLs.
- Keyboard/touch movement, panels, mobile menu, LinkedIn/GitHub links and the approved PDF if present.

Repeat Lighthouse on the final host. Local historical scores are not evidence of public availability or deployed performance.

## 8. Future updates

Edit content locally, run the same checks, review the diff, then commit/push after the publication authorization appropriate to that update. Every push to `main` can update the public site. Case-study additions also update explicit verification route lists. Never commit `out/`, secrets, reports or private documents.

## Troubleshooting

| Symptom | Check |
|---|---|
| Permission denied / repo not found | Authenticate as the owner; distinguish missing repository from missing access. Do not create a duplicate blindly. |
| Pages deploy fails with 404 or permissions error | Select GitHub Actions as Pages source; check Pages availability, environment branch rules and deployment job permissions. |
| JS/font 404s | Use `build:production`; no repository subpath for this account site. Upload `out/`, not `.next/` or the source tree. |
| Direct route refresh fails | Confirm `route/index.html` in the artifact and trailing slash behavior. Wait for the successful deployment, then retry without stale cache. |
| Linux browser executable missing | Keep the Playwright install step; do not set a macOS `CHROME_PATH` in CI. |
| Type errors after clone | Run `npm ci`; `npm run typecheck` runs `next typegen` before TypeScript, so it also works before the first build in a clean clone. |
| Workflow not running | File must be at repository-root `.github/workflows/deploy.yml`; push branch must be `main`; Actions must be allowed. |
| Workflow failure | Fix the reported check before retrying. Never skip validation to publish. |
| Noindex or localhost metadata | Use `npm run build:production`; then `npm run check:production`. |
| Resume missing | Keep `profile.resume` null until the reviewed PDF exists; do not create a dummy document. |

The workflow has been prepared locally; it has not been executed on a GitHub-hosted runner in this phase.

## Approved resume integration — 24 November 2026

The owner-approved PDF is now included locally at `public/documents/Pedro_Silva_Resume.pdf`, with downloads enabled in navigation, contact and `/resume/`. The About portrait is approved too. Earlier pending-resume instructions describe the fallback/replacement procedure; they no longer describe the current integration state. Neither approval authorizes push, Pages changes or public deployment.

## First source publication authorization

On 24 November 2026 the owner authorized the initial commit and push, including the approved resume and portrait, but not GitHub Pages activation or site publication. The deployment job is explicitly disabled with `if: ${{ false }}`. Pushes may run build/tests and upload the workflow artifact, but cannot execute the Pages deployment job. Enabling it requires a separately authorized source change and Pages setup. Earlier no-commit/no-push statements describe preparation history and are superseded by the first source publication once pushed.

## Deployment authorization — 24 November 2026

Owner authorized GitHub Pages publication. Pages source is GitHub Actions and the deployment job is enabled for main after successful build/tests. This supersedes the earlier disabled-deployment state. Production URL: https://pedroalsilva.github.io.
