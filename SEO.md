# SEO review — 25 November 2026

## Scope
Local-only improvements. No visible copy, layout, styles, assets or CV changes. No tracking or new dependencies. Existing production HTML, robots and sitemap were retrieved successfully. No Search Console access was used, so indexing status, impressions and rankings are unknown.

## Findings and changes
- Existing production canonicals, sitemap, crawl allowance, English language attribute and 1200×630 share image were already present; retained.
- Project search titles were specific but social metadata inherited generic site titles/descriptions. Each of the nine routes now has consistent route-specific search, Open Graph and Twitter metadata plus an explicit Open Graph URL.
- Homepage search title: Pedro Silva | Business Analytics & Digital Solutions. Visible hero unchanged.
- Added Person, WebSite and ProfilePage JSON-LD on homepage with existing public identity/profile links; WebPage/CreativeWork context on case studies. No invented ratings, outcomes, dates, sole-author credit or qualifications. JSON-LD escapes HTML delimiters.
- Shared existing branded preview image retained; individual case titles/descriptions differ. No speculative keyword tags, fabricated last-modified dates or ranking promises.

## Validation
Production build including TypeScript, ESLint and export verification passed: nine routes, 256 local references, canonical URLs, sitemap, robots and notices. Visible homepage text was compared with the live site and is identical. Dedicated browser tests cover metadata and JSON-LD on every route, alongside existing navigation/accessibility/game regressions. Google Rich Results Test and Search Console submissions have not been performed; valid markup alone does not guarantee rich results or indexing.

## After owner approves deployment
1. Publish and repeat metadata checks against production.
2. In Google Search Console, add URL-prefix property https://pedroalsilva.github.io/ if not already verified. Use the HTML-file or HTML-tag verification method supplied by Google; do not invent a token. Keep the verification file/tag after confirmation. DNS domain verification is not appropriate without control over github.io DNS.
3. Submit https://pedroalsilva.github.io/sitemap.xml and inspect the homepage and key projects. Request indexing when appropriate. Review indexing reports after Google crawls the changes.
4. Validate structured data using Google's Rich Results Test; schema types may not generate an enhanced search appearance.

## LinkedIn placement
Recommend the portfolio as the first external link in Featured, with title “Personal Portfolio | Business Analytics & Digital Solutions”. Description: “Explore my work across analytics, automation, process engineering and digital products.” Also add the URL in Contact info → website. Featured content is for logged-in LinkedIn viewers and is not itself discoverable through search. This recommendation is for recruiter visibility, not a guaranteed SEO backlink benefit.

References:
- https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- https://developers.google.com/search/docs/appearance/structured-data/profile-page
- https://support.google.com/webmasters/answer/9008080
- https://www.linkedin.com/help/linkedin/answer/a552452
- https://www.linkedin.com/help/linkedin/answer/a548010
