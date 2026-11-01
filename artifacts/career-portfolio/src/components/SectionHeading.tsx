export function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="section-heading" data-testid={`heading-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
