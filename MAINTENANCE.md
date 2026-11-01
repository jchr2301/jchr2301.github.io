# Portfolio maintenance

## Actual editing workflow

This is a React/Vite static portfolio, not a CMS. Edit the TypeScript content
files in `artifacts/career-portfolio/src/content/`, save, and review the preview.
There is no database-backed editing interface, admin account, or live content API.
An unused `EditingGuide` component contains instructions, not an editor.

| Content | Source |
| --- | --- |
| Projects, including Swap | `projects.ts` |
| Experience, including May4S | `experience.ts` |
| Activities | `activities.ts` |
| Name, introduction, About, education, certifications, contact, résumé configuration, approach principles | `profile.ts` |
| Record field definitions | `types.ts` |
| Images and résumé file | `artifacts/career-portfolio/public/` |

Homepage previews, collection pages, and detail pages all read the same arrays.
Shared components render records, tags, dates, and story sections. No page markup
needs copying. The hero illustration is CSS/markup, not an uploaded image; static
section labels and navigation live in page components.

## Add or edit a record

1. Copy the unpublished starter object at the end of `projects.ts` into the same
   array, or into the array in `experience.ts` for a role.
2. Give it a unique `id` and lowercase hyphenated `slug`. Keep the ID unchanged
   thereafter; keep published slugs unchanged to preserve shared URLs.
3. Replace the starter title and blanks with verified facts. Leave unknown fields
   blank or omit them. Do not publish the starter itself as an achievement.
4. Use `role`, `organization`, `startDate`, `endDate`, `summary`, and `tags` as
   appropriate. Dates use `YYYY-MM` or `YYYY-MM-DD`; `Present` is supported.
   Optional `context`, `location`, and `recognition` provide additional detail.
5. Add any number of sections:
   `{ heading: 'Key Decisions', body: 'Verified explanation', items: [] }`.
   Context, My Contribution, Outcome, and Reflection are suggestions, not mandatory
   fields. Blank text, blank tags, empty links, and empty sections are hidden.
6. Optional real destinations go in `links`, for example
   `{ label: 'Repository', url: 'https://github.com/owner/repository' }`.
   Use the same structure for Demo or other external links. Do not retain example URLs.
7. Leave `draft: true` while editing. Set `draft: false` only when ready for public
   display. Only explicitly published records appear in lists or resolve through
   public detail routes. A missing status fails closed.

Published routes remain `/projects/swap` and
`/experience/salesforce-crm-technical-consultant-internship`.
New routes come automatically from the collection and slug.

**Visibility:** `featured: true` adds a published record to Selected Work.
Experience and activity previews show the first two published records with `showOnHome !== false`. Set `showOnHome: false` to keep a record on its full listing and detail page while excluding it from the homepage. Military service uses this setting so May4S remains the homepage experience preview. Activities
navigation and its homepage preview stay hidden when no published activities exist.
Optional numeric `order` takes precedence (smaller first); omit it to sort newest
first by end date, then start date. `Present` sorts as current. Featured records
are grouped by collection, preserving each collection's order.

**Drafts are not confidential storage.** They are excluded from rendered pages and
public record lookup, but this is a client-side static app, not an access-control
system. Never put secrets or private material in content files.

## Images and résumé

- Add modest-sized web images under `artifacts/career-portfolio/public/images/`.
  Set `coverImage: 'images/your-file.webp'` and meaningful `coverAlt`.
  Images appear on detail pages; listings remain text-only. Local image URLs follow
  the app base path; HTTPS image URLs also work.
- Replace `public/ryan-huang-resume.pdf` with the actual updated PDF. Keeping the
  filename preserves the download URL. For a different filename, update
  `profile.resume.path` (relative to `public/`) and `profile.resume.filename`
  (the downloaded filename). Inspect personal information inside the PDF before sharing.

## Check and publish separately

From the workspace root:

```sh
pnpm --filter @workspace/career-portfolio typecheck
pnpm --filter @workspace/career-portfolio test
PORT=20775 BASE_PATH=/ pnpm --filter @workspace/career-portfolio build
```

Review Home, Projects, Experience, both existing detail links, About/download,
and a narrow mobile preview. Tests cover the actual published records and the
unpublished starter, plus shared rendering and draft route rejection.

Content, images, résumé replacements, code, and styles are bundled/static files.
They update the development preview after saving, but **all require republishing
to change a published site**. There is no live database content to update separately.
Publishing is an explicit owner action; these maintenance changes do not publish.

## Deployment requirements and dependencies

The portfolio's existing artifact configuration builds with
`pnpm --filter @workspace/career-portfolio run build`, serves
`artifacts/career-portfolio/dist/public` statically, and rewrites deep routes to
`/index.html`. Vite defaults to `PORT=20775` and `BASE_PATH=/` for local development and builds;
hosted environments can override these values. Use the workspace's pnpm dependencies and
lockfile. No portfolio runtime server, database, login, or secret is required.
Typography loads from Google Fonts, with CSS fallbacks.

The workspace also has a separately configured Express API artifact at `/api`
and a design-preview artifact. The portfolio does not call the API; it currently
exposes a health route and does not provide portfolio data. Database scaffolding
elsewhere in the workspace is not a portfolio dependency. These unrelated services
have not been removed or reconfigured. Review the full project's publishing service
list separately if choosing which artifacts to publish.

Deployment status checked during this update: not published. No publishing or
billing settings were changed.

## Back up code and content

Keep a private Git backup of the whole workspace, including `src/content/`, the
actual files in `public/` (especially the résumé and images), this guide, the
pnpm lockfile, and artifact configuration. Commit verified changes and push to
your own backup remote, or download a dated archive and keep it outside this
workspace. Check that assets are actually included and not ignored.

Content and code are backed up together; there is no portfolio database to export.
Do not include secrets, `.env` files, `node_modules`, or generated `dist` output.
Restore the source and assets, install from the lockfile, and run the checks above.

## Local Mac development

macOS native dependencies are enabled in the workspace configuration.
With Node.js and pnpm available in your terminal, run from the workspace root:

```sh
pnpm install
pnpm --filter @workspace/career-portfolio dev
```

Open http://localhost:20775/ in a browser. Stop the preview with Control-C.
No `.env` file or database is needed for the portfolio preview.
Use `PORT=20776` before the preview command if the default port is already occupied.
The initial Mac verification used the Node.js and pnpm runtime bundled with Codex;
it did not install Node.js globally for other terminal applications.


## Project media and site metadata

Swap's original poster, logo, and interface board are in `artifacts/career-portfolio/public/images/swap/`. The source artwork is unchanged. Gallery crop coordinates select views from the original board through SVG viewports, and English captions are maintained in `projects.ts`. These are labeled interface designs, not production screenshots.

Update the main title, description, Open Graph, and Twitter summary together in `artifacts/career-portfolio/index.html`. The current title is `Ryan Huang | Product & Technology Portfolio`. Once a final public domain is chosen, add absolute canonical and og:url values using that verified domain. Do not use localhost or the old Replit domain as the new site's canonical URL. The site currently uses a text-only Twitter summary until a social preview image is supplied.

GitHub Student Developer Pack is optional student benefits, not hosting. GitHub Pages can host the static output; configure a build/publish workflow and handle direct SPA detail routes before launch. A repository under the owner's account and a successful deployment are still required.


## GitHub Pages publication

Target repository: `jchr2301/jchr2301.github.io`. Target URL: `https://jchr2301.github.io/`. The workflow in `.github/workflows/pages.yml` tests, builds, creates direct-link HTML files, and deploys on pushes to `main`. Select **GitHub Actions** in the repository's Settings → Pages before the first publication.

After a normal build, run `pnpm --filter @workspace/scripts exec tsx ../artifacts/career-portfolio/scripts/prepare-pages.ts` to prepare the Pages output. This adds HTML entry files and per-route canonical/share metadata for published routes, a sitemap, robots.txt, and a noindex 404 fallback. It excludes unpublished starter routes. If moving to a different domain, update the workflow's SITE_URL and BASE_PATH together.

Publish a clean source snapshot, excluding `attached_assets/`, local agent state, credentials, generated builds, and the imported Replit Git history. Keep the original local project and backup intact. The target repository has not been created or published merely by adding these files.
