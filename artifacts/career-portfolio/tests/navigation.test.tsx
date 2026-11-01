import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { Router } from 'wouter';
import { SiteShell } from '../src/components/SiteShell';
import { isNavActive, pageMetadata } from '../src/content/site';
import { dateRange } from '../src/content/dates';

describe('navigation and page metadata', () => {
  it.each(['/projects', '/projects/', '/projects/swap', '/projects/swap/'])('marks Projects active at %s', (url) => {
    expect(isNavActive(url, '/projects')).toBe(true);
    expect(isNavActive(url, '/')).toBe(false);
    const html = renderToStaticMarkup(<Router ssrPath={url}><SiteShell><h1>Content</h1></SiteShell></Router>);
    const link = html.match(/<a[^>]*data-testid="link-nav-projects"[^>]*>/)?.[0];
    expect(link).toContain('aria-current="page"');
  });

  it('keeps unrelated collections inactive and normalizes About trailing slashes', () => {
    expect(isNavActive('/projects-archive', '/projects')).toBe(false);
    expect(isNavActive('/experience/mandatory-military-service/', '/experience')).toBe(true);
    expect(pageMetadata('/about/').title).toBe('About Ryan Huang');
  });

  it('uses the published record title and refuses to index unpublished or missing records', () => {
    expect(pageMetadata('/projects/swap/').title).toBe('Swap — Secondhand Marketplace | Ryan Huang');
    expect(pageMetadata('/projects/careerpair/').description).toContain('13 interviews');
    expect(pageMetadata('/projects/unpublished-project-starter/').indexable).toBe(false);
    expect(pageMetadata('/does-not-exist').indexable).toBe(false);
  });

  it('collapses a single month without losing open-ended dates', () => {
    expect(dateRange('2026-10', '2026-10')).toBe('Oct 2026');
    expect(dateRange('2026-10', 'Present')).toBe('Oct 2026 – Present');
    expect(dateRange(undefined, '2026-10')).toBe('Oct 2026');
  });
});
