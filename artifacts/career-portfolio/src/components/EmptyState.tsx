export function EmptyState({ title = 'More to come', body }: { title?: string; body?: string }) {
  return (
    <section className="empty-state" data-testid="empty-state">
      <span className="empty-index" aria-hidden="true">—</span>
      <div><h2>{title}</h2>{body && <p>{body}</p>}</div>
    </section>
  );
}
