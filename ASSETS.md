# Asset provenance

- Campus geometry, buildings, trees, paths, lamps and player sprites: original procedural pixel artwork authored for this project in `src/game/map.ts` and `createGame.ts`.
- Project illustrations: original SVG compositions in `src/components/ProjectArt.tsx`. Illustrative, not screenshots or real dashboards.
- Open Graph image and favicon: original typographic artwork; source in `scripts/generate-og.mjs` and `public/favicon.svg`.
- Space Grotesk, Inter, JetBrains Mono and Press Start 2P: self-hosted Fontsource packages, SIL Open Font License 1.1; full license texts and copyright notices are included in `THIRD_PARTY_NOTICES.txt`. No font CDN calls.
- Lucide icons: ISC license. Phaser: MIT license. Full dependency notices accompany the static export.
- Reference: https://telmobarros.github.io inspected for the building-navigation interaction only. No assets, map, code or visual identity reused.

## Notice generation and verification

`scripts/third-party-notices.mjs` gathers complete LICENSE/COPYING/NOTICE/COPYRIGHT files from installed non-development lockfile packages, recursively including vendored components such as Next.js compiled dependencies. This conservative inventory includes some build-only packages. All four font OFL texts, Lucide/Feather notices, Phaser, Motion and React notices are retained verbatim. `@next/env` uses the Next.js project MIT notice; the React `client-only` marker uses the React MIT notice (their published packages omit standalone license files).

Platform-specific native compiler/image binaries (`@img`, `@next/swc-*`, `@tailwindcss/oxide-*`, `lightningcss-*`) are excluded: they execute during builds and are not distributed in `out/`. Development-only tools are not distributed. No installed binaries or `node_modules` are published. A missing notice for any other production package fails the build; review dependency changes rather than bypassing the check.

`npm run build` and `npm run build:production` regenerate the notice file automatically. `npm run check:licenses` compares source and export with the installed dependency notices; export validation invokes it too. No attribution banner is added. This does not grant a license to the original portfolio source or artwork.

## Owner portrait

The owner supplied `PedroSilva_2.jpg` for local portfolio integration. `public/images/pedro-silva-480.webp` and `pedro-silva-800.webp` are resized WebP encodings with embedded metadata removed. Appearance is unchanged; CSS frames the original at 4:5 in About. Original photographs are not copied into the repository. The owner approved this About photograph; public deployment still requires separate authorization. No AI portrait generation or retouching was used.
