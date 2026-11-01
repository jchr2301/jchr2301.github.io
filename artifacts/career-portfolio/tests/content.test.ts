import { describe, expect, it } from 'vitest';
import { byNewest, publicRecords } from '../src/content';
import { record } from './fixtures';

describe('public content selection and ordering', () => {
  it('excludes drafts even when featured or manually prioritized', () => {
    const visible = record('visible');
    expect(publicRecords([
      record('draft', { draft: true, featured: true, order: -1 }),
      visible,
    ])).toEqual([visible]);
    expect(publicRecords([record('draft-only', { draft: true })])).toEqual([]);
    expect(publicRecords([])).toEqual([]);
  });

  it('sorts manual order first, then Present/end date/start date, with undated last', () => {
    const records = [
      record('undated'),
      record('start-only', { startDate: '2023-01' }),
      record('ended', { startDate: '2020-01', endDate: '2024-02' }),
      record('ongoing', { endDate: 'Present' }),
      record('order-two', { order: 2, endDate: 'Present' }),
      record('order-zero', { order: 0 }),
      record('negative-order', { order: -1 }),
    ];
    const original = [...records];
    expect(byNewest(records).map(({ slug }) => slug)).toEqual([
      'negative-order', 'order-zero', 'order-two', 'ongoing', 'ended', 'start-only', 'undated',
    ]);
    expect(records).toEqual(original);
    expect(byNewest(records)).not.toBe(records);
  });

  it('breaks equal manual orders by date and preserves input order on ties', () => {
    expect(byNewest([
      record('older', { order: 1, endDate: '2020-01' }),
      record('tie-a', { order: 1, endDate: '2025-01' }),
      record('tie-b', { order: 1, endDate: '2025-01' }),
    ]).map(({ slug }) => slug)).toEqual(['tie-a', 'tie-b', 'older']);
  });

  it('uses end date over start date and falls back from an empty end date', () => {
    expect(byNewest([
      record('ended', { startDate: '2025-01', endDate: '2020-01' }),
      record('fallback', { startDate: '2024-01', endDate: '' }),
    ]).map(({ slug }) => slug)).toEqual(['fallback', 'ended']);
  });

  it('filters and sorts without mutating the supplied records', () => {
    const records = Object.freeze([
      Object.freeze(record('old', { endDate: '2020-01' })),
      Object.freeze(record('draft', { draft: true })),
      Object.freeze(record('new', { endDate: '2025-01' })),
    ]);
    expect(publicRecords([...records]).map(({ slug }) => slug)).toEqual(['new', 'old']);
    expect(records.map(({ slug }) => slug)).toEqual(['old', 'draft', 'new']);
  });
});
