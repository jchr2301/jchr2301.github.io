import { ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import type { PortfolioRecord } from '../content/types';
import type { RecordKind } from '../content';
import { TagList } from './TagList';
import { normalizeRecord } from '../content/normalize';
import { RecordDate } from './RecordDate';

const pathFor: Record<RecordKind, string> = { project: 'projects', experience: 'experience', activity: 'activities' };

export function RecordCard({ record, kind, index = 0 }: { record: PortfolioRecord; kind: RecordKind; index?: number }) {
  record = normalizeRecord(record);
  const context = [...new Set([record.role, record.organization, record.type].filter((value) => value?.trim()))].join(' · ');
  return (
    <Link href={`/${pathFor[kind]}/${record.slug}`} className={`record-row reveal card-delay-${Math.min(index, 3)}`} data-testid={`card-${kind}-${record.slug}`}>
      <div className="record-index">
        <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <span className="card-kind">{kind}</span>
      </div>
      <div className="record-main">
        <h2>{record.title}</h2>
        {context && <p className="record-context">{context}</p>}
        <RecordDate start={record.startDate} end={record.endDate} className="card-date mobile-date" />
        {(record.context || record.location) && <p className="record-context">{record.context || record.location}</p>}
        {record.summary?.trim() && <p className="record-summary" data-testid={`text-summary-${record.slug}`}>{record.summary}</p>}
        {record.recognition?.trim() && <p className="record-recognition" data-testid={`recognition-${record.slug}`}>{record.recognition}</p>}
        <TagList tags={(record.tags || []).filter((tag) => tag.trim())} id={record.slug} />
      </div>
      <div className="record-end">
        <RecordDate start={record.startDate} end={record.endDate} className="card-date desktop-date" />
        <ArrowUpRight className="card-arrow" size={17} aria-hidden="true" />
      </div>
    </Link>
  );
}
