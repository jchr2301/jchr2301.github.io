export function TagList({ tags, id }: { tags: string[]; id?: string }) {
  tags = [...new Set(tags.map((tag) => tag.trim()).filter(Boolean))];
  if (!tags.length) return null;
  return <ul className="tag-list" aria-label="Topics">{tags.map((tag) => <li className="tag" key={tag} data-testid={id ? `tag-${id}-${tag.toLowerCase().replace(/\s+/g, '-')}` : undefined}>{tag}</li>)}</ul>;
}
