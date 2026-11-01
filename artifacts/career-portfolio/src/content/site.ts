import { getRecord, type RecordKind } from './index';
import { profile } from './profile';

export const defaultMetadata = {
  title: 'Ryan Huang | Product & Technology Portfolio',
  description: 'Explore Ryan Huang’s work in product discovery, commercial analysis, and software development. University of Michigan MSI, Product Management Pathway.',
};

export function normalizePath(location: string) {
  return location.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
}

export function isNavActive(location: string, href: string) {
  const current = normalizePath(location);
  return current === href || (href !== '/' && current.startsWith(`${href}/`));
}

export function pageMetadata(location: string) {
  const current = normalizePath(location);
  const pages: Record<string, { title: string; description: string }> = {
    '/': defaultMetadata,
    '/projects': { title: 'Projects | Ryan Huang', description: 'Product discovery, commercial strategy, and software development projects by Ryan Huang.' },
    '/experience': { title: 'Experience | Ryan Huang', description: 'Ryan Huang’s experience in Salesforce CRM technical consulting and mandatory military service.' },
    '/activities': { title: 'Activities | Ryan Huang', description: 'Communities, initiatives, and activities.' },
    '/about': { title: 'About Ryan Huang', description: profile.introduction || 'University of Michigan MSI student pursuing product management and technology consulting.' },
  };
  if (pages[current]) return { ...pages[current], indexable: true };
  const match = /^\/(projects|experience|activities)\/([^/]+)$/.exec(current);
  if (match) {
    const kind: RecordKind = match[1] === 'projects' ? 'project' : match[1] === 'experience' ? 'experience' : 'activity';
    const record = getRecord(kind, match[2]);
    if (record) return { title: `${record.title} | Ryan Huang`, description: record.summary || record.title, indexable: true };
  }
  return { title: 'Page not found | Ryan Huang', description: 'This entry is not available. Explore Ryan Huang’s other projects and experience.', indexable: false };
}
