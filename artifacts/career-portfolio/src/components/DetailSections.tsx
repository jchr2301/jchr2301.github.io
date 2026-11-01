import type { StorySection } from '../content/types';

export function DetailSections({ sections = [] }: { sections?: StorySection[] }) {
  return sections.map((section, index) => {
    const heading = section.heading.trim();
    const body = section.body?.trim();
    const items = section.items?.map((item) => item.trim()).filter(Boolean) || [];
    if (!body && !items.length) return null;
    return (
      <section className="story-section" key={`${heading}-${index}`}>
        {heading && <h2>{heading}</h2>}
        {body && <p>{body}</p>}
        {!!items.length && <ul>{items.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}</ul>}
      </section>
    );
  });
}
