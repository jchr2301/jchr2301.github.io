import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderToStaticMarkup } from 'react-dom/server';
import { Router } from 'wouter';
import { describe, expect, it } from 'vitest';
import { profile } from '../src/content/profile';
import { AboutPage } from '../src/pages/Pages';

const appRoot = fileURLToPath(new URL('../', import.meta.url));

function resumeConfig() {
  expect(profile.resume, 'The public résumé must be configured').toBeDefined();
  const resume = profile.resume!;
  expect(resume.path).toMatch(/^[^/\\]+(?:\/[^/\\]+)*\.pdf$/i);
  expect(resume.path.split('/')).not.toContain('..');
  expect(resume.filename).toMatch(/^[^/\\]+\.pdf$/i);
  expect(resume.filename.trim()).toBe(resume.filename);
  return resume;
}

function assertPdf(bytes: Buffer) {
  expect(bytes.length, 'Résumé PDF must not be empty').toBeGreaterThan(0);
  expect(bytes.subarray(0, 5).toString('ascii'), 'Expected PDF, not an HTML fallback').toBe('%PDF-');
  expect(bytes.subarray(-1024).toString('latin1'), 'PDF must have an end marker').toContain('%%EOF');
}

describe('About résumé download', () => {
  it('uses the configured base and download filename', () => {
    // Vite replaces BASE_URL at transform time; test projects exercise both bases.
    const base = import.meta.env.BASE_URL;
    const resume = resumeConfig();
    const html = renderToStaticMarkup(<Router ssrPath="/about"><AboutPage /></Router>);
    const links = html.match(/<a\b[^>]*data-testid="link-resume-download"[^>]*>/g);
    expect(links).toHaveLength(1);
    const link = links![0];
    expect(link).toContain(`href="${base}${resume.path}"`);
    expect(link).toContain(`download="${resume.filename}"`);
  });

  it('ships the current nonempty PDF unchanged in a fresh production build', async () => {
    const resume = resumeConfig();
    const source = await readFile(path.join(appRoot, 'public', resume.path));
    assertPdf(source);
    // A fresh temporary output prevents stale dist files from hiding a missing asset.
    const output = await mkdtemp(path.join(tmpdir(), 'portfolio-resume-'));
    try {
      execFileSync('pnpm', ['exec', 'vite', 'build', '--config', 'vite.config.ts', '--outDir', output], {
        cwd: appRoot,
        env: { ...process.env, NODE_ENV: 'production', PORT: '4173', BASE_PATH: '/portfolio/nested/' },
        timeout: 120_000,
        stdio: 'pipe',
      });
      const built = await readFile(path.join(output, resume.path));
      assertPdf(built);
      expect(built.equals(source), 'Built résumé must match the current public PDF byte-for-byte').toBe(true);
    } finally {
      await rm(output, { recursive: true, force: true });
    }
  }, 130_000);
});
