import { defineConfig } from 'vitest/config';

// No dev server, PORT, BASE_PATH, browser, or public content changes required.
export default defineConfig({
  esbuild: { jsx: 'automatic' },
  test: {
    environment: 'node',
    projects: [
      { extends: true, test: { name: 'root', include: ['tests/**/*.test.{ts,tsx}'] } },
      {
        extends: true,
        base: '/portfolio/nested/',
        test: { name: 'nested-base', include: ['tests/resume.test.tsx'] },
      },
    ],
  },
});
