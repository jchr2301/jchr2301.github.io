import type { PortfolioRecord } from '../src/content/types';
import type { RecordKind } from '../src/content';

export function record(slug: string, overrides: Partial<PortfolioRecord> = {}): PortfolioRecord {
  return { id: slug, slug, title: `Fixture ${slug}`, draft: false, ...overrides };
}

export function collection(kind: RecordKind): PortfolioRecord[] {
  return [
    record(`${kind}-draft`, {
      draft: true, featured: true, order: -100,
      summary: 'PRIVATE SUMMARY SENTINEL',
      sections: [{ heading: 'Private notes', body: 'PRIVATE BODY SENTINEL' }],
    }),
    record(`${kind}-older`, { endDate: '2020-01' }),
    record(`${kind}-current`, { endDate: 'Present', featured: true }),
    record(`${kind}-manual`, { order: 0, featured: true }),
  ];
}
