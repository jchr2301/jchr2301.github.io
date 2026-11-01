# Ryan Huang — Portfolio

Product discovery, commercial analysis, and software development work.

Website: https://jchr2301.github.io/

## Development

Use Node.js 22 or newer and pnpm 10.

```sh
pnpm install --frozen-lockfile
pnpm --filter @workspace/career-portfolio dev
```

Portfolio content lives in `artifacts/career-portfolio/src/content/`. See `MAINTENANCE.md` for editing instructions.

## Publication

Push changes to `main` to run tests and publish through GitHub Actions. In Settings → Pages, use **GitHub Actions** as the publishing source. The deployment workflow builds the static site and prepares direct entry pages for published projects and experiences.

The source is a clean export; private reference documents and the original imported Git history are excluded.
