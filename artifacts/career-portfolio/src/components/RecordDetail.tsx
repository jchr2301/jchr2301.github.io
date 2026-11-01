import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import type { PortfolioRecord } from '../content/types';
import type { RecordKind } from '../content';
import { TagList } from './TagList';
import { dateRange } from '../content/dates';
import { assetUrl, normalizeRecord } from '../content/normalize';
import { RecordDate } from './RecordDate';
import { DetailSections } from './DetailSections';
import { ProjectMedia } from './ProjectMedia';

const pathFor: Record<RecordKind, string> = { project: '/projects', experience: '/experience', activity: '/activities' };

export function RecordDetail({ record, kind }: { record: PortfolioRecord; kind: RecordKind }) {
  record = normalizeRecord(record);
  const date = dateRange(record.startDate, record.endDate);
  const metadata = [record.role, record.organization].filter(Boolean).join(' · ');
  const links = record.links?.filter((link) => link.label.trim() && link.url.trim()) || [];
  return (
    <article className="detail-page page-enter">
      <Link href={pathFor[kind]} className="back-link" data-testid="link-back-list"><ArrowLeft size={15} /> Back to {kind === 'activity' ? 'activities' : `${kind}s`}</Link>
      <header className="detail-hero">
        {record.logoImage && <img className="project-logo" src={assetUrl(record.logoImage)} alt={`${record.title.split(' — ')[0]} logo`} width="76" height="76" />}
        <p className="eyebrow">{record.type || record.role || kind}{record.organization ? ` / ${record.organization}` : ''}</p>
        <h1>{record.title}</h1>
        {(metadata || date) && <p className="detail-meta">{metadata}{metadata && date ? ' · ' : ''}<RecordDate start={record.startDate} end={record.endDate} /></p>}
        {(record.context || record.location) && <p className="detail-meta">{record.context || record.location}</p>}
        {record.summary && <p className="detail-summary">{record.summary}</p>}
        {record.recognition && <p className="record-recognition">{record.recognition}</p>}
        <TagList tags={record.tags || []} id={record.slug} />
      </header>
      {record.coverImage && <figure className="detail-image"><img src={assetUrl(record.coverImage)} alt={record.coverAlt || ''} />{record.coverAlt && <figcaption>{record.coverAlt}</figcaption>}</figure>}
      {record.gallery && <ProjectMedia record={{ ...record, supportingMaterials: [] }} />}
      <div className="detail-layout">
        <div className="detail-sections">
          <DetailSections sections={record.sections} />
        </div>
        {!!links.length && <aside className="detail-links"><p className="eyebrow">On the web</p>{links.map((link) => <a href={link.url} key={link.url} target="_blank" rel="noreferrer" data-testid={`link-record-${record.slug}-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>{link.label}<ArrowUpRight size={14} /></a>)}</aside>}
      </div>
      {!!record.supportingMaterials?.length && <ProjectMedia record={{ ...record, gallery: undefined }} />}
    </article>
  );
}
