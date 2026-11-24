# Architecture

## Boundaries

- `src/app`: static App Router routes, metadata, fallback pages, robots and sitemap.
- `src/content/portfolio.ts`: typed professional facts, case studies and building content.
- `src/components`: navigation, server-rendered map and project artwork, Motion reveal, React world UI.
- `src/game/map.ts`: deterministic rectangle artwork, map dimensions, obstacle and entrance geometry. Shared by the SVG preview and Phaser.
- `src/game/createGame.ts`: Phaser scene, original generated textures, camera, directional animation, movement and collision.
- `src/lib/site.ts`: origin and deployment prefix.
- `tests`: collision/content unit tests and real-browser critical paths.
- `scripts`: local QA and reproducible Open Graph generation.

The project intentionally uses a small number of modules rather than layers of entities/systems with one class each. Content can be extended without altering presentation code. Optional public project demo/repository properties are typed; only populate them with approved links.

## Rendering and design

Homepage and case-study content are generated as HTML. Small client islands implement navigation and Motion. Motion starts with content visible and only adds a short in-view displacement; the page works without JavaScript. Root-level loading boundaries were avoided because streaming placeholders can hide static content without JavaScript. The world owns its loading boundary.

Design tokens are in `globals.css`: background #0B111B, surface #111D2A, elevated #1F3543, accent #73E3C0, text #F2F6FA, muted #9EAEBE, border #293846, focus #B3F6DF and error #FFB6B6. Fluid type, 1200px content width, 44px+ targets and reduced-motion rules are shared. Fonts are self-hosted and loaded with swap.

## Game lifecycle

`WorldLoader` dynamically loads the React shell without SSR. The shell then imports Phaser asynchronously. A cancellation flag prevents late imports from creating an orphan instance. Cleanup destroys the game/canvas, disconnects its resize observer and removes document/window listeners.

React owns keyboard and touch input, accessible HTML instructions, live hints and native dialog state. Controls are held in a ref, so moving does not rerender React each frame. Keyboard movement is scoped to the focused game container; Tab remains available. Opposite controls cancel; diagonal speed is normalized. Delta is capped to prevent tunnelling after frame stalls. X/Y movement is resolved independently against expanded rectangles and map boundaries.

Opening a building pauses the scene and sleeps the loop. Closing restores the same player position and previous focus. Native `dialog.showModal()` provides focus containment and inert background; Escape returns to the game/menu. Direct-access buttons open the same content without movement. Hiding the document or blurring the window pauses gameplay and clears input; returning resumes only if no panel is open.

The Canvas renderer avoids unnecessary WebGL context allocation for this compact 2D scene. Static map rectangles are baked into one texture.

The mobile camera follows the player with a larger pixel scale; desktop fits the whole campus. Touch buttons use pointer capture and clear on release/cancel/lost capture. Ambient beacon animation is omitted for reduced motion. Text and direct-access controls remain HTML even if game loading fails.

## Static delivery

Next routes and links use `basePath`; static public URLs use `asset()`. Origin and base path are build-time settings. No runtime secrets or network data requirements. The sitemap lists every generated project. Default local builds are noindex; production origin must be configured explicitly. All fonts are served with the site. No third-party requests are needed to read or play.

## Scope and privacy

Professional responsibilities are high-level summaries supported by the consolidated profile. No internal metrics, source code or employer dashboards are shipped. Research, personal software and professional employment are distinct. Personal projects disclose AI-assisted implementation. Unknown contacts and unapproved downloads are omitted or routed to a useful overview rather than fake links.
