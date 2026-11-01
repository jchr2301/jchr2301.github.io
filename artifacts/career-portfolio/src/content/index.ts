import { activities } from './activities';
import { experience } from './experience';
import { projects } from './projects';
import type { PortfolioRecord } from './types';

export type RecordKind = 'project' | 'experience' | 'activity';
export const collections: Record<RecordKind, PortfolioRecord[]> = {
  project: projects,
  experience,
  activity: activities,
};

export const byNewest = (records: PortfolioRecord[]) =>
  [...records].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined && a.order !== b.order) return a.order - b.order;
    if (a.order !== undefined && b.order === undefined) return -1;
    if (a.order === undefined && b.order !== undefined) return 1;
    const dateA = a.endDate === 'Present' ? '9999-12' : a.endDate || a.startDate || '';
    const dateB = b.endDate === 'Present' ? '9999-12' : b.endDate || b.startDate || '';
    return dateB.localeCompare(dateA);
  });

export const publicRecords = (records: PortfolioRecord[]) =>
  byNewest(records.filter((record) => record.draft === false));

export const getRecord = (kind: RecordKind, slug: string) =>
  publicRecords(collections[kind]).find((record) => record.slug === slug);
