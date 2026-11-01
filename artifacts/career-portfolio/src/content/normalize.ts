import type { PortfolioRecord } from './types';

/** Whitespace-only optional fields should never create empty public UI. */
export function normalizeRecord(record: PortfolioRecord): PortfolioRecord {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [
      key, typeof value === 'string' ? value.trim() : value,
    ]),
  ) as PortfolioRecord;
}

/** Local public/ assets follow the artifact base path; remote URLs remain intact. */
export function assetUrl(path: string) {
  return /^https?:\/\//i.test(path)
    ? path
    : `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
