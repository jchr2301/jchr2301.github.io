import { dateRange } from '../content/dates';

export function RecordDate({ start, end, className }: {
  start?: string; end?: string; className?: string;
}) {
  const date = dateRange(start, end);
  return date ? <span className={className}>{date}</span> : null;
}
