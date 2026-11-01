import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { Router, Route } from 'wouter';
import { collections, getRecord, publicRecords } from '../src/content';
import { HomePage, ProjectsPage, ExperiencePage, ProjectDetailPage, ExperienceDetailPage } from '../src/pages/Pages';
import { RecordDetail } from '../src/components/RecordDetail';
import { SiteShell } from '../src/components/SiteShell';
import { record } from './fixtures';
import type { ReactNode } from 'react';

const render = (node: ReactNode, path = '/') =>
  renderToStaticMarkup(<Router ssrPath={path}>{node}</Router>);

describe('actual maintained portfolio content', () => {
  it('has unique stable IDs and slugs', () => {
    const all = Object.values(collections).flat();
    expect(all.every((item) => item.id.trim() && item.slug.trim())).toBe(true);
    expect(new Set(all.map((item) => item.id)).size).toBe(all.length);
    for (const records of Object.values(collections)) {
      expect(new Set(records.map((item) => item.slug)).size).toBe(records.length);
    }
  });

  it('uses the same verified records for home, listings and detail routes', () => {
    const cases = [
      { kind: 'project' as const, slug: 'careerpair', path: '/projects', List: ProjectsPage, Detail: ProjectDetailPage },
      { kind: 'project' as const, slug: 'essential-tremor-project', path: '/projects', List: ProjectsPage, Detail: ProjectDetailPage },
      { kind: 'project' as const, slug: 'swap', path: '/projects', List: ProjectsPage, Detail: ProjectDetailPage },
      { kind: 'experience' as const, slug: 'salesforce-crm-technical-consultant-internship', path: '/experience', List: ExperiencePage, Detail: ExperienceDetailPage },
    ];
    for (const { kind, slug, path, List, Detail } of cases) {
      const item = getRecord(kind, slug)!;
      expect(item).toBe(collections[kind].find((value) => value.slug === slug));
      for (const html of [render(<HomePage />), render(<List />, path)]) {
        expect(html).toContain(item.title.replaceAll('&', '&amp;'));
        expect(html).toContain(item.summary!);
        expect(html).toContain(`href="${path}/${slug}"`);
      }
      const detail = render(<Route path={`${path}/:slug`}><Detail /></Route>, `${path}/${slug}`);
      expect(detail).toContain(item.summary!);
      for (const section of item.sections!) expect(detail).toContain(section.body!);
    }
  });

  it('shows military service in Experience and its detail route, while keeping May4S on the homepage', () => {
    const military = getRecord('experience', 'mandatory-military-service')!;
    const listing = render(<ExperiencePage />, '/experience');
    const home = render(<HomePage />);
    expect(listing).toContain(military.title);
    expect(listing.indexOf(military.title)).toBeLessThan(listing.indexOf('CRM Technical Consultant Intern'));
    expect(home).not.toContain(military.title);
    expect(home).toContain('CRM Technical Consultant Intern');
    const detail = render(<Route path="/experience/:slug"><ExperienceDetailPage /></Route>, '/experience/mandatory-military-service');
    expect(detail).toContain(military.summary!);
  });

  it('keeps the acquisition case accessible without featuring it on the homepage', () => {
    const item = getRecord('project', 'midwest-healthcare-case-competition')!;
    expect(render(<ProjectsPage />, '/projects')).toContain(item.title);
    expect(render(<HomePage />)).not.toContain(item.title);
    const detail = render(<Route path="/projects/:slug"><ProjectDetailPage /></Route>, '/projects/midwest-healthcare-case-competition');
    expect(detail).toContain(item.summary!);
  });

  it('renders original Swap materials with English context and supports nested asset paths', () => {
    const html = render(<Route path="/projects/:slug"><ProjectDetailPage /></Route>, '/projects/swap');
    expect(html).toContain('From browsing to an exchange');
    expect(html).toContain('Browse items');
    expect(html).toContain('Interface designs');
    expect(html).toContain('Original project poster');
    expect(html).toContain('images/swap/interface-designs.png');
    expect(html).toContain('images/swap/project-poster-zh.png');
    expect(html).not.toContain('FIELD NOTE 001');
    const home = render(<HomePage />);
    expect(home).not.toContain('FIELD NOTE 001');
    expect(home).not.toContain('01 — 03');
  });

  it('resolves trailing-slash detail URLs produced by static Pages hosting', () => {
    for (const item of publicRecords(collections.project)) {
      const html = render(<Route path="/projects/:slug"><ProjectDetailPage /></Route>, `/projects/${item.slug}/`);
      expect(html).toContain(item.title.replaceAll('&', '&amp;'));
      expect(html).not.toContain('This entry is not available');
    }
    const html = render(<Route path="/experience/:slug"><ExperienceDetailPage /></Route>, '/experience/mandatory-military-service/');
    expect(html).toContain('Military Police Soldier');
  });

  it('never renders the starter, even if featured, and rejects its direct route', () => {
    const starter = collections.project.find((item) => item.id === 'project-starter')!;
    expect(starter.draft).toBe(true);
    expect(publicRecords([{ ...starter, featured: true }])).toEqual([]);
    expect(getRecord('project', starter.slug)).toBeUndefined();
    for (const html of [render(<HomePage />), render(<ProjectsPage />)]) {
      expect(html).not.toContain(starter.title);
      expect(html).not.toContain(starter.slug);
    }
    const html = render(<Route path="/projects/:slug"><ProjectDetailPage /></Route>, `/projects/${starter.slug}`);
    expect(html).toContain('This entry is not available');
    expect(html).not.toContain(starter.title);
  });

  it('hides Activities navigation when no activities are published', () => {
    expect(publicRecords(collections.activity)).toEqual([]);
    expect(render(<SiteShell><HomePage /></SiteShell>)).not.toContain('href="/activities"');
  });

  it('requires an explicit published state', () => {
    expect(publicRecords([record('unset', { draft: undefined })])).toEqual([]);
  });

  it('hides blank detail fields, tags, links and empty sections', () => {
    const html = render(<RecordDetail kind="project" record={record('blank', {
      summary: ' ', role: ' ', organization: ' ', recognition: ' ',
      context: ' ', location: ' ', coverImage: ' ', tags: [' '],
      links: [{ label: ' ', url: 'https://example.com' }],
      sections: [{ heading: 'Empty heading', body: ' ', items: [' ', ''] }],
    })} />);
    for (const absent of ['detail-summary', 'detail-meta', 'detail-image', 'tag-list', 'detail-links', 'story-section', 'Empty heading']) {
      expect(html).not.toContain(absent);
    }
  });
});
