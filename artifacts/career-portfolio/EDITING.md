# Editing your portfolio

Edit the files in `artifacts/career-portfolio/src/content/`. You do not need to change page layouts or use a dashboard.

## Add or edit an entry

See [`../../MAINTENANCE.md`](../../MAINTENANCE.md) for the short workflow, deployment requirements, and backups. Every record needs a unique, permanent `id`; keep published slugs stable.

Open `projects.ts`, `experience.ts`, or `activities.ts`. Copy the matching starter below into the existing array, between `[` and `]`. Separate records with a comma. Replace the example text with your own verified details, and omit fields you do not have. Each slug must be unique within its collection. Its detail page is created automatically at `/projects/slug`, `/experience/slug`, or `/activities/slug`.

- **Hide:** keep `draft: true` until the entry is complete. Change it to `false` to show it publicly, including its detail page.
- **Feature:** set `featured: true` to include a published entry on the homepage.
- **Reorder:** entries sort newest first; `Present` counts as current. Optional `order: 1`, `order: 2`, etc. place entries before automatically sorted entries. Lower numbers come first. Remove `order` to return to date sorting.
- **Dates:** use `YYYY-MM` or `YYYY-MM-DD`, and `endDate: 'Present'` for an ongoing role. Omit unknown dates.
- **Images:** put an image in this app's `public/` folder and add `coverImage: '/image-name.jpg'` plus a descriptive `coverAlt`. Images appear on detail pages; listing rows stay text-focused.
- **Links:** add `links: [{ label: 'View project', url: 'https://...' }]` only for real destinations.
- **Profile/contact:** edit `profile.ts`. Use `displayName` for the header and `name` for the full About name. Optional `education` records and `certifications` populate compact About sections. `resume: { path: 'ryan-huang-resume.pdf', filename: 'Ryan-Huang-Resume.pdf' }` links a real PDF in `public/`; the path is relative to this app's base URL. Replace the actual PDF when updating your résumé.
- **Context and recognition:** optional `context`, `location`, and `recognition` fields appear in both rows and detail pages. Keep the personal role separate from team context and awards.
- **Publish:** save, check the preview and your links, then use Publish to publish the updated site. Saving a file alone does not update a previously published site.

Keep incomplete records as drafts. Never fill gaps with invented employers, dates, achievements, or metrics. Empty sections and fields are handled automatically.

## Approved case-study copy and remaining facts

The owner supplied exact Swap copy and verified internship facts, with an explicit request to display both records. Those approved versions are visible in the preview (`draft: false`); this does not deploy the website. New incomplete entries must remain drafts until the owner approves their copy.

- **Swap:** use the verified Developer & Project Coordinator role, Aug 2022–Nov 2023 dates, and five-person undergraduate team context. Award recognition belongs to the team. Do not describe the prototype as a launched business or invent measured conversion gains, a founder role, a Product Manager role, or team leadership.
- **Internship:** May4S is the verified employer; Salesforce is the CRM technology. Preserve the CRM Technical Consultant Intern title and Jan–Sep 2024 dates. Keep the supplied implementation, API integration, reporting validation, testing, and collaboration details without inventing client identities or financial impact.
- **Profile:** preserve the owner's supplied introduction, About paragraphs, education, certifications, contact links, and three approach principles. The uploaded résumé is available as an actual PDF; its phone number is not duplicated on public pages.

Only add missing facts when the owner supplies them. Keep the internship in Experience rather than duplicating it as a project. Before making future drafts visible, ask the owner to approve the content; website deployment remains a separate decision.

## Regression checks before sharing

From the workspace root, run:

```sh
pnpm --filter @workspace/career-portfolio test
```

This non-watch command exits with a failure if the content-selection or rendering
checks fail. It needs no running server, environment variables, database, or browser.
It covers draft exclusion from all three listings, home featured work and previews,
and direct detail URLs; empty/draft-only collections; manual/date sorting; and
missing, blank, and populated optional card fields.

Fixtures live only in `tests/fixtures.ts`, outside `src/content`. The rendering
tests replace the content modules with those fixtures but exercise the real selectors,
pages, cards, details, and router using React's static renderer. They never edit
public content. These checks do not test browser interactions or responsive styling,
and draft filtering is a display rule, not secure storage for confidential information.

## Project starter

```ts
{
  id: 'project-unique-name',
  slug: 'project-name',
  title: 'Project title',
  role: 'Your role',
  type: 'Project type',
  summary: 'The problem addressed or verified outcome.',
  tags: ['Relevant skill'],
  draft: true,
  featured: false,
  sections: [
    { heading: 'Context', body: '' },
    { heading: 'Problem', body: '' },
    { heading: 'My contribution', body: '' },
    { heading: 'Approach', body: '' },
    { heading: 'Key decisions', body: '' },
    { heading: 'Outcomes', body: '' },
    { heading: 'Reflection', body: '' },
  ],
},
```

## Experience starter

```ts
{
  id: 'experience-unique-name',
  slug: 'role-at-organization',
  title: 'Job title',
  organization: 'Organization',
  type: 'Employment type',
  summary: 'Your contribution or verified impact.',
  tags: [],
  draft: true,
  featured: false,
  sections: [
    { heading: 'Role overview', body: '' },
    { heading: 'Responsibilities', items: [] },
    { heading: 'Selected contributions', items: [] },
    { heading: 'Learning', body: '' },
  ],
},
```

## Activity starter

```ts
{
  id: 'activity-unique-name',
  slug: 'activity-name',
  title: 'Activity name',
  organization: 'Organization',
  role: 'Your role',
  summary: 'Your contribution or verified achievement.',
  tags: [],
  draft: true,
  featured: false,
  sections: [
    { heading: 'Context', body: '' },
    { heading: 'Involvement', body: '' },
    { heading: 'Contribution', body: '' },
    { heading: 'Takeaways', body: '' },
  ],
},
```
