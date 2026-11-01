import type { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Route, Router } from 'wouter';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { collection, record } from './fixtures';

// Replace data modules only: selectors, pages, cards, details and router are real.
vi.mock('../src/content/projects', async () => ({
  projects: (await import('./fixtures')).collection('project'),
}));
vi.mock('../src/content/experience', async () => ({
  experience: (await import('./fixtures')).collection('experience'),
}));
vi.mock('../src/content/activities', async () => ({
  activities: (await import('./fixtures')).collection('activity'),
}));

import { collections, getRecord, type RecordKind } from '../src/content';
import { RecordCard } from '../src/components/RecordCard';
import {
  ActivitiesPage, ActivityDetailPage, ExperienceDetailPage, ExperiencePage,
  HomePage, ProjectDetailPage, ProjectsPage,
} from '../src/pages/Pages';

const cases = [
  { kind: 'project', path: '/projects', List: ProjectsPage, Detail: ProjectDetailPage },
  { kind: 'experience', path: '/experience', List: ExperiencePage, Detail: ExperienceDetailPage },
  { kind: 'activity', path: '/activities', List: ActivitiesPage, Detail: ActivityDetailPage },
] as const;

function render(node: ReactNode, path = '/') {
  return renderToStaticMarkup(<Router ssrPath={path}>{node}</Router>);
}

function cards(html: string) {
  return [...html.matchAll(/data-testid="card-([^"]+)"/g)].map((match) => match[1]);
}

function expectNoDrafts(html: string) {
  expect(html).not.toContain('-draft');
  expect(html).not.toContain('PRIVATE SUMMARY SENTINEL');
  expect(html).not.toContain('PRIVATE BODY SENTINEL');
}

afterEach(() => {
  for (const { kind } of cases) collections[kind].splice(0, Infinity, ...collection(kind));
});

describe.each(cases)('$kind public routes', ({ kind, path, List, Detail }) => {
  it('lists public entries only in manual/date order', () => {
    const html = render(<List />, path);
    expectNoDrafts(html);
    expect(cards(html)).toEqual([
      `${kind}-${kind}-manual`, `${kind}-${kind}-current`, `${kind}-${kind}-older`,
    ]);
    expect(html).toContain(`href="${path}/${kind}-manual"`);
  });

  it.each(['draft', 'missing'])('rejects a direct %s detail URL', (suffix) => {
    const slug = `${kind}-${suffix}`;
    expect(getRecord(kind, slug)).toBeUndefined();
    const html = render(<Route path={`${path}/:slug`}><Detail /></Route>, `${path}/${slug}`);
    expect(html).toContain('This entry is not available');
    expectNoDrafts(html);
    expect(html).not.toContain('detail-hero');
  });

  it('resolves and renders a public detail URL with no optional fields', () => {
    const slug = `${kind}-manual`;
    expect(getRecord(kind, slug)?.title).toBe(`Fixture ${slug}`);
    const html = render(<Route path={`${path}/:slug`}><Detail /></Route>, `${path}/${slug}`);
    expect(html).toContain(`<h1>Fixture ${slug}</h1>`);
    for (const absent of ['detail-meta', 'detail-summary', 'tag-list', 'detail-image', 'story-section', 'detail-links', 'undefined', 'null']) {
      expect(html).not.toContain(absent);
    }
  });

  it.each(['empty', 'draft-only'])('shows an empty state for a %s collection', (state) => {
    collections[kind].splice(0, Infinity, ...(state === 'empty' ? [] : collection(kind).filter((r) => r.draft)));
    const html = render(<List />, path);
    expect(html).toContain('coming soon');
    expect(cards(html)).toEqual([]);
    expectNoDrafts(html);
  });
});

describe('home featured work and previews', () => {
  it('features only flagged public entries and previews the first two public entries', () => {
    const html = render(<HomePage />);
    expectNoDrafts(html);
    const selected = html.split('id="selected-work"')[1].split('</section>')[0];
    expect(cards(selected)).toEqual(cases.flatMap(({ kind }) => [
      `${kind}-${kind}-manual`, `${kind}-${kind}-current`,
    ]));
    for (const kind of ['experience', 'activity']) {
      const preview = html.split(`data-testid="preview-${kind}"`)[1].split('</section>')[0];
      expect(cards(preview)).toEqual([`${kind}-${kind}-manual`, `${kind}-${kind}-current`]);
    }
  });

  it.each(['empty', 'draft-only'])('hides previews and shows selected-work empty state for %s content', (state) => {
    for (const { kind } of cases) {
      collections[kind].splice(0, Infinity, ...(state === 'empty' ? [] : collection(kind).filter((r) => r.draft)));
    }
    const html = render(<HomePage />);
    expectNoDrafts(html);
    expect(cards(html)).toEqual([]);
    expect(html).toContain('Selected work coming soon');
    expect(html).not.toContain('data-testid="preview-');
  });
});

describe('record cards', () => {
  it.each(cases)('links $kind cards to the correct detail URL', ({ kind, path }) => {
    const html = render(<RecordCard record={record('minimal')} kind={kind} />);
    expect(html).toContain(`href="${path}/minimal"`);
    expect(html).toContain('<h2>Fixture minimal</h2>');
    for (const absent of ['record-context', 'record-summary', 'card-date', 'tag-list', 'undefined', 'null']) {
      expect(html).not.toContain(absent);
    }
  });

  it('omits whitespace-only optional values', () => {
    const html = render(<RecordCard kind="project" record={record('blank', {
      role: ' ', organization: '', type: '\t', summary: '\n',
      startDate: ' ', endDate: '', tags: [' ', '\t'],
    })} />);
    for (const absent of ['record-context', 'record-summary', 'card-date', 'tag-list']) {
      expect(html).not.toContain(absent);
    }
  });

  it('renders supplied fields, deduplicates context and filters blank tags', () => {
    const html = render(<RecordCard kind="project" index={8} record={record('full', {
      role: 'Research', type: 'Research', organization: 'Test organization',
      summary: 'Test summary', tags: ['Testing', ' '], startDate: '2020-01', endDate: 'Present',
    })} />);
    expect(html).toContain('Research · Test organization</p>');
    expect(html).toContain('Test summary</p>');
    expect(html).toContain('Jan 2020 – Present</span>');
    expect(html).toContain('tag-full-testing');
    expect(html.match(/class="tag"/g)).toHaveLength(1);
    expect(html).toContain('card-delay-3');
    expect(html).toContain('>09</span>');
  });

  it.each([{ startDate: '2020-01' }, { endDate: 'Present' }])('renders a single date without a dangling separator: %j', (dates) => {
    const html = render(<RecordCard kind={'project' as RecordKind} record={record('single-date', dates)} />);
    const expected = dates.startDate ? 'Jan 2020' : 'Present';
    expect(html).toContain(`class="card-date mobile-date">${expected}</span>`);
    expect(html).toContain(`class="card-date desktop-date">${expected}</span>`);
    expect(html).not.toContain(' – ');
  });

  it('shows recognition and context, with one link and mobile dates before the summary', () => {
    const html = render(<RecordCard kind="project" record={record('recognized', {
      role: 'Developer', context: 'Five-person team', recognition: 'Team award',
      startDate: '2022-08', endDate: '2023-11', summary: 'Verified summary',
    })} />);
    expect(html).toContain('Five-person team');
    expect(html).toContain('Team award');
    expect(html).toContain('Aug 2022 – Nov 2023');
    expect(html.match(/<a /g)).toHaveLength(1);
    expect(html.indexOf('mobile-date')).toBeLessThan(html.indexOf('record-summary'));
  });
});
