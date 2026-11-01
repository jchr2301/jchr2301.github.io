import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import type { RecordKind } from '../content';

const templates: Record<RecordKind, string> = {
  project: `{
  id: 'project-unique-name',
  slug: 'clear-short-name',
  title: 'Project title',
  type: 'Product / research / build',
  summary: 'One concise sentence about the work.',
  tags: ['Topic', 'Method'],
  featured: false,
  draft: true,
  order: 1,
  sections: [
    { heading: 'Context', body: '' },
    { heading: 'Problem', body: '' },
    { heading: 'Contribution', body: '' },
    { heading: 'Approach', body: '' },
    { heading: 'Decisions', body: '' },
    { heading: 'Outcomes', body: '' },
    { heading: 'Reflection', body: '' },
  ],
}`,
  experience: `{
  id: 'experience-unique-name',
  slug: 'role-at-organization',
  title: 'Role title',
  organization: 'Organization',
  role: 'Your role',
  startDate: 'YYYY-MM',
  endDate: 'Present',
  summary: 'A concise overview of the role.',
  tags: [],
  featured: false,
  draft: true,
  order: 1,
  sections: [
    { heading: 'Overview', body: '' },
    { heading: 'Responsibilities', items: [] },
    { heading: 'Contributions', items: [] },
    { heading: 'Learning', body: '' },
  ],
}`,
  activity: `{
  id: 'activity-unique-name',
  slug: 'activity-name',
  title: 'Activity title',
  type: 'Community / volunteering / event',
  startDate: 'YYYY-MM',
  endDate: 'Present',
  summary: 'A concise introduction.',
  tags: [],
  featured: false,
  draft: true,
  order: 1,
  sections: [
    { heading: 'Context', body: '' },
    { heading: 'Involvement', body: '' },
    { heading: 'Contribution', body: '' },
    { heading: 'Takeaways', body: '' },
  ],
}`,
};

const files: Record<RecordKind, string> = { project: 'projects.ts', experience: 'experience.ts', activity: 'activities.ts' };

export function EditingGuide() {
  const [copied, setCopied] = useState<RecordKind | null>(null);
  async function copyTemplate(kind: RecordKind) {
    try {
      await navigator.clipboard.writeText(templates[kind]);
      setCopied(kind);
      window.setTimeout(() => setCopied((value) => value === kind ? null : value), 1800);
    } catch {
      setCopied(null);
    }
  }
  return (
    <section id="editing-guide" className="editing-guide" data-testid="editing-guide">
      <div className="guide-intro">
        <p className="eyebrow">A small field guide</p>
        <h2>Keep the portfolio yours.</h2>
        <p>Everything here is edited in plain TypeScript files. No dashboard, account, or database to maintain.</p>
      </div>
      <div className="guide-steps">
        <div><span>01</span><h3>Add or edit</h3><p>Open <code>src/content/{'{file}'}</code>, add a record to its array, or change its fields. Edit <code>profile.ts</code> for the About page.</p></div>
        <div><span>02</span><h3>Choose what shows</h3><p>Set <code>draft: true</code> to hide an entry. Change it to <code>false</code> when it is ready. Drafts stay hidden across every page.</p></div>
        <div><span>03</span><h3>Order and feature</h3><p>Use a lower <code>order</code> number to move an entry up. Set <code>featured: true</code> to include it in home highlights.</p></div>
        <div><span>04</span><h3>Add an image</h3><p>Put the image in <code>public/</code>, set <code>coverImage: '/image-name.jpg'</code>, and write a useful <code>coverAlt</code> description. Leave both out if there is no image.</p></div>
        <div><span>05</span><h3>Publish changes</h3><p>Save the file and publish the updated site. Check the public pages and links before sharing.</p></div>
      </div>
      <div className="template-block">
        <div className="template-heading"><div><p className="eyebrow">Copyable starters</p><h3>Start with the shape of the story.</h3></div><p>Replace every example value; remove sections that do not apply.</p></div>
        <div className="template-grid">
          {(Object.keys(templates) as RecordKind[]).map((kind) => (
            <article className="template-card" key={kind}>
              <div className="template-card-top"><h4>{kind}</h4><span>src/content/{files[kind]}</span></div>
              <pre><code>{templates[kind]}</code></pre>
              <button className="copy-button" onClick={() => void copyTemplate(kind)} data-testid={`button-copy-${kind}-template`}>
                {copied === kind ? <Check size={14} /> : <Copy size={14} />}{copied === kind ? 'Copied' : 'Copy starter'}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
