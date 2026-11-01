# Portfolio regression checks

From the workspace root:

```sh
pnpm --filter @workspace/career-portfolio test
```

To check only the résumé after replacing it or editing its configuration:

```sh
pnpm --filter @workspace/career-portfolio test -- resume.test.tsx
```

The résumé check renders the real About page with root and nested app base paths,
requires a named download, and reads the PDF configured in `src/content/profile.ts`.
It verifies PDF header/end markers and compares the source bytes with the asset
from a fresh production Vite build. It does not pin a hash or file size, so genuine
résumé replacements need no test updates. Missing, empty, or non-PDF files fail.
This is a packaging regression check, not a full PDF parser or content review.

The build uses temporary output (removed afterward) and supplies its own build-only
`PORT` and `BASE_PATH`. It does not start a server or depend on existing `dist` files.
