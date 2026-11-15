# Abandoned but Not Forgotten

An independent digital space museum prepared for NASA Space Apps Challenge 2026.

**Even when a mission ends, its discoveries and stories should never be forgotten.**

Explore eight carefully sourced machines from the Moon, Mars, and deep space. The experience connects historical hardware to the science it enabled, with accessible explanations for students and young space enthusiasts. It does not label every inactive object as abandoned, invent missing locations, or present lost communications as proof of destruction.

## Run Locally

Use Node.js 24 LTS (or Node 22.18+) and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, normally `http://127.0.0.1:5173`.

Photographs are included under `static/media`. No NASA API key, account, database, or environment secret is needed. Fonts, photographs, and the curated dataset are served locally. The application does not fetch live NASA data during a visit. External source links naturally require an internet connection.

## The Experience

- Cinematic landing page with authentic Apollo photography, destination galleries, featured equipment, timeline preview, and rotating facts.
- Searchable collection with destination, mission, equipment type, launch year, and date/name sorting. Filter state is reflected in the URL.
- Eight pre-rendered equipment profiles with purpose, engineering, discoveries, status, location evidence, dated events, historical image galleries, and references.
- Interactive D3 planetary-coordinate atlas with Moon/Mars selection, filters, marker selection, rotation, zoom, and an accessible mission register.
- Mission timeline with destination, equipment, and event filters and source-linked event stories.
- Learning lab with a five-question quiz, explanations, equipment comparisons, scientific concepts, and self-guided discovery challenges.
- Searchable `/sources` page with usage conditions, AI disclosure, and organizer-resource verification evidence.
- Downloadable `/collection.json` containing the data, provenance, media metadata, and AI disclosure.

The atlas is a **schematic coordinate diagram**, not an orbital photograph, a live map, or a claim that the depicted equipment can be seen from orbit. Mission-site markers are distinguished from documented equipment positions. Deep-space trajectories do not receive invented surface coordinates.

## Stack

SvelteKit **2**, Svelte **5**, TypeScript, Tailwind CSS **4**, D3 Geo, and Lucide icons. Inter and Space Grotesk are served locally through Fontsource. The app uses SvelteKit's static adapter; no backend service is necessary for this initial collection.

Native Node tests validate data and pure filtering logic. Playwright runs Chromium desktop and mobile-browser tests. No heavyweight timeline, gallery, or animation dependency is needed.

## Project Structure

```text
src/lib/data/              Typed equipment, sources, media, challenge evidence, quiz content
src/lib/components/        Navigation, cards, source citations, gallery, planetary globe
src/lib/utils.ts           UTC-stable date presentation and collection filtering
src/routes/                Museum pages and the static collection.json endpoint
static/media/              Credited, local NASA archive imagery
scripts/                   Reproducible downloads, source inventory, link checking
tests/data.test.ts         Native Node data, provenance, and filter tests
tests/browser/             Playwright interaction and responsive tests
```

The source registry is shared by the app and `SOURCES.md`. The dataset carries references on individual timeline events, claims, images, locations, and key explanatory fields, not just one undifferentiated bibliography.

## Validate

```sh
npm run check
npm test
npm run build
npx playwright install chromium
npm run test:e2e
npm run format:check
```

Build before browser tests: Playwright starts the local production preview on port 4173. Its temporary test server stops when the test run ends. Screenshots and failure traces are written under ignored `test-results/`.

Optional network-dependent maintenance:

```sh
npm run media:fetch
npm run sources:generate
npm run test:links
npm run verify:challenge
```

`media:fetch` verifies HTTP success and an image content type and leaves existing local assets intact. It does not disable TLS validation. `test:links` uses ordinary certificate-validated HTTPS, reports unresolved requests and suspicious homepage redirects, and exits nonzero if anything needs review. HTTP availability alone does not prove factual correctness or permission to reuse an asset.

## Add an Exhibit

1. Add a record following `src/lib/data/types.ts` in the appropriate data module. Use the existing date/status vocabulary and explain uncertainty instead of inserting a plausible value.
2. Add every supporting source to that module's source registry. Reference its ID in the relevant fields, claims, events, images, and record-level `sources` list.
3. Add verified local media paths and complete captions, credits, original URLs, media type, and AI flags. Add download URLs to `scripts/media-manifest.json`.
4. Use only source-supported coordinates. Retain coordinate conventions in the description. Label a landing-site marker as a landing site when the object's final position is unknown.
5. Regenerate `SOURCES.md`, review the quiz if affected, update deliberate starting-collection assertions, and run the checks.

The UI derives exhibit cards, profiles, filters, references, timelines, and the coordinate register from data. New records do not need a new Svelte page.

## Static Deployment

```sh
npm run build
npm run preview
```

Publish the **contents of `build/`** to a static host that serves directory `index.html` files and correct 404 status codes. All eight profile routes are pre-rendered. Do not publish `node_modules`, `.env` files, the Kilo session state, or private working files.

For a subdirectory deployment such as GitHub Pages, set `BASE_PATH` at build time to `/NASA-space-app-challenge` (without a trailing slash). Asset URLs and internal navigation honor SvelteKit's base path.

PowerShell example:

```powershell
$env:BASE_PATH = '/NASA-space-app-challenge'
npm run build
Remove-Item Env:BASE_PATH
```

This repository has **not been deployed or pushed by the coding assistant**. A public demonstration URL and final project URL must be added after publishing and checked without a login. Do not invent those links or assume a repository URL is a working demonstration.

## Evidence and Eligibility Caveats

- The exact 2026 Resources tab was successfully inspected in Chromium with certificate validation enabled: HTTP 200, the Resources heading visible, and all 14 NASA links confirmed. Earlier Node/curl certificate errors were client-specific; the successful browser check and full retrieval history are preserved in `challenge.ts`, `/sources`, and `SOURCES.md`.
- The app meaningfully uses NASA data from exact URLs in that verified list. **Overall Global Award eligibility is not asserted.** Data-resource use is one requirement; final rules, rights, human review, public links, and participant terms still need their own checks. `npm run verify:challenge` repeats the authenticated browser check without silently changing the curated evidence.
- Viking 1's final-contact day conflicts between NASA records; the app displays November 1982 and explains the discrepancy. UTC/local-day differences are explicit. Inactive status is not a current hardware inspection.
- The attached mockup mentioned in the brief was not available in the conversation or empty repository. The design follows the written visual direction; it is not represented as a pixel-perfect reproduction of an unseen attachment.
- There are no generated space photographs, video, audio, or 3D reconstructions. NASA historical mosaics and ordinary photographs are distinguished.
- A final human factual, rights, and competition-rules review remains necessary. No acceptance of participant Terms and Conditions is made on the owner's behalf.

## Dependency Security

The requested SvelteKit 2 stack is retained. At implementation time, `npm audit` reported five **low-severity** advisory entries in its build/framework dependency chain; no high or critical advisories remained after removing unnecessary test tooling. Some reported fixes require SvelteKit 3, outside the requested stack. The application is statically exported, uses no form actions, authentication cookies, untrusted CMS content, or external build-time cache headers. Do not expose the development server publicly. Recheck advisories before deployment and assess framework upgrades with the project owner; do not run `npm audit fix --force` blindly.

## Credits and Submission

See [SOURCES.md](SOURCES.md), [AI_DISCLOSURE.md](AI_DISCLOSURE.md), [DEMO_SCRIPT.md](DEMO_SCRIPT.md), and [SUBMISSION_CHECKLIST.md](SUBMISSION_CHECKLIST.md).

Code, educational wording, source retrieval, and data structuring were AI-assisted using Kilo Code, reporting model `gpt-6-astra`. Original scientific evidence and historical media come from credited NASA/partner sources. The original project brief and requirements came from the project owner. No unperformed human review is claimed.

Independent educational project. **Not affiliated with, approved by, or endorsed by NASA.** Third-party and NASA media conditions remain applicable; attribution is not a substitute for permission. No repository-wide license is asserted over third-party assets.
