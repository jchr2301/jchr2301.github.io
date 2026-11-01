const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDate(value?: string) {
  if (!value?.trim()) return '';
  const match = /^(\d{4})-(\d{2})(?:-\d{2})?$/.exec(value);
  if (!match) return value;
  const month = months[Number(match[2]) - 1];
  return month ? `${month} ${match[1]}` : value;
}

export function dateRange(start?: string, end?: string) {
  const first = formatDate(start);
  const last = formatDate(end);
  if (first && first === last) return first;
  return [first, last].filter(Boolean).join(' – ');
}
