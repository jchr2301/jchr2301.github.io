import { ArrowDownRight, ArrowUpRight, MoveUpRight } from 'lucide-react';
import { Link, useParams } from 'wouter';
import { activities } from '../content/activities';
import { getRecord, publicRecords, type RecordKind } from '../content';
import { experience } from '../content/experience';
import { projects } from '../content/projects';
import { profile } from '../content/profile';
import { EmptyState } from '../components/EmptyState';
import { RecordCard } from '../components/RecordCard';
import { RecordDetail } from '../components/RecordDetail';
import { SectionHeading } from '../components/SectionHeading';

const collections = {
  project: { records: projects, title: 'Projects', description: 'Product questions, experiments, and things built to make an idea tangible.' },
  experience: { records: experience, title: 'Experience', description: 'Roles, responsibilities, and the work behind them.' },
  activity: { records: activities, title: 'Activities', description: 'The communities, initiatives, and side paths that make a fuller picture.' },
};

function CollectionPage({ kind }: { kind: RecordKind }) {
  const config = collections[kind];
  const records = publicRecords(config.records);
  return (
    <div className="content-page page-enter">
      <SectionHeading eyebrow={`Selected ${kind === 'activity' ? 'involvement' : kind === 'project' ? 'work' : 'roles'}`} title={config.title} description={config.description} />
      {records.length ? <div className="record-list">{records.map((record, index) => <RecordCard key={record.id} record={record} kind={kind} index={index} />)}</div> : <EmptyState title={`${config.title} coming soon`} />}
    </div>
  );
}

function RecordRoute({ kind }: { kind: RecordKind }) {
  const params = useParams<{ slug: string }>();
  const record = params.slug ? getRecord(kind, params.slug) : undefined;
  if (!record) return <div className="content-page page-enter"><EmptyState title="This entry is not available" body="Please explore the other sections of the portfolio." /></div>;
  return <RecordDetail record={record} kind={kind} />;
}

export function HomePage() {
  const featured = (Object.entries(collections) as [RecordKind, (typeof collections)[RecordKind]][])
    .flatMap(([kind, config]) => publicRecords(config.records).filter((record) => record.featured).map((record) => ({ kind, record })));
  const headline = profile.headline?.trim();
  const intro = profile.introduction?.trim();
  return (
    <div className="home-page page-enter">
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span className="status-dot" /> Product management · Technology consulting</p>
          <h1>{headline || <>Good products begin<br />with <em>better questions.</em></>}</h1>
          <p className="hero-intro">{intro || 'A working portfolio of product thinking, technical fluency, and the choices that connect the two.'}</p>
          <div className="hero-actions">
            <a href="#selected-work" className="button-primary" data-testid="link-explore-projects">Explore my work <MoveUpRight size={16} /></a>
            <Link href="/about" className="button-quiet" data-testid="link-home-about">About me <ArrowDownRight size={16} /></Link>
          </div>
        </div>
        <div className="hero-art" aria-label="Abstract diagram representing a product idea taking shape" role="img" data-testid="hero-illustration">
          <div className="art-topline"><span>THINKING IN SYSTEMS</span></div>
          <div className="orbit orbit-one"><span className="orbit-label">WHY</span></div>
          <div className="orbit orbit-two"><span className="orbit-label">WHO</span></div>
          <div className="orbit orbit-three"><span className="orbit-label">WHAT</span></div>
          <div className="orbit-core"><span>signal</span><strong>→</strong><span>decision</span></div>
          <div className="art-caption"><span>Curiosity, with a direction.</span></div>
        </div>
        <div className="hero-bottom"><span>Scroll to explore</span><span className="hero-rule" /></div>
      </section>
      <section id="selected-work" className="home-highlights" data-testid="home-highlights">
        <div className="home-section-head">
          <div><p className="eyebrow">The short version</p><h2>Selected work</h2></div>
          <Link href="/projects" className="text-link" data-testid="link-all-projects">All projects <ArrowUpRight size={15} /></Link>
        </div>
        {featured.length ? <div className="record-list">{featured.map(({ kind, record }, index) => <RecordCard key={record.id} kind={kind} record={record} index={index} />)}</div> : <EmptyState title="Selected work coming soon" />}
      </section>
      <div className="home-previews">
        <CollectionPreview kind="experience" />
        <CollectionPreview kind="activity" />
      </div>
      <section className="home-point-of-view">
        <h2 className="statement">How I approach the work</h2>
        <div className="approach-principles">{profile.principles?.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
      </section>
    </div>
  );
}

function CollectionPreview({ kind }: { kind: 'experience' | 'activity' }) {
  const config = collections[kind];
  const records = publicRecords(config.records).filter((record) => record.showOnHome !== false).slice(0, 2);
  if (!records.length) return null;
  const path = kind === 'activity' ? '/activities' : '/experience';
  return (
    <section className="collection-preview" data-testid={`preview-${kind}`}>
      <div className="home-section-head">
        <h2>{config.title}</h2>
        <Link href={path} className="text-link" data-testid={`link-path-${kind}`}>All {config.title.toLowerCase()} <ArrowUpRight size={15} /></Link>
      </div>
      {records.length
        ? <div className="record-list">{records.map((record, index) => <RecordCard key={record.id} record={record} kind={kind} index={index} />)}</div>
        : <EmptyState title={`${config.title} coming soon`} />}
    </section>
  );
}

export function ProjectsPage() { return <CollectionPage kind="project" />; }
export function ExperiencePage() { return <CollectionPage kind="experience" />; }
export function ActivitiesPage() { return <CollectionPage kind="activity" />; }
export function ProjectDetailPage() { return <RecordRoute kind="project" />; }
export function ExperienceDetailPage() { return <RecordRoute kind="experience" />; }
export function ActivityDetailPage() { return <RecordRoute kind="activity" />; }

export function AboutPage() {
  const links = profile.links?.filter((link) => link.label && link.url) || [];
  return (
    <div className="content-page about-page page-enter">
      <SectionHeading eyebrow="The person behind the work" title={profile.name?.trim() || 'A little more context'} description={profile.headline?.trim()} />
      <div className="about-layout">
        <div className="about-main">
          {profile.about?.length ? <div data-testid="text-about-introduction">{profile.about.map((paragraph) => <p className="about-intro" key={paragraph}>{paragraph}</p>)}</div> : profile.introduction?.trim() ? <p className="about-intro" data-testid="text-about-introduction">{profile.introduction}</p> : <EmptyState title="More about me coming soon" />}
          {!!profile.education?.length && <section className="profile-section" data-testid="education"><h2>Education</h2>{profile.education.map((item) => <article key={item.institution}><h3>{item.institution}</h3>{item.school && <p>{item.school}</p>}<p>{item.degree}</p><p className="education-meta">{[item.location, item.date].filter(Boolean).join(' · ')}</p></article>)}</section>}
          {!!profile.certifications?.length && <section className="profile-section" data-testid="certifications"><h2>Certifications</h2><ul>{profile.certifications.map((item) => <li key={item}>{item}</li>)}</ul></section>}
        </div>
        <aside className="about-aside">
          {profile.location && <div><span className="eyebrow">Based in</span><p>{profile.location}</p></div>}
          {profile.email && <div><span className="eyebrow">Say hello</span><a href={`mailto:${profile.email}`} data-testid="link-contact-email">{profile.email}<ArrowUpRight size={14} /></a></div>}
          {links.map((link) => <div key={link.url}><span className="eyebrow">Elsewhere</span><a href={link.url} target="_blank" rel="noreferrer" data-testid={`link-profile-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>{link.label}<ArrowUpRight size={14} /></a></div>)}
          {profile.resume && <div><span className="eyebrow">Résumé</span><a href={`${import.meta.env.BASE_URL}${profile.resume.path}`} download={profile.resume.filename} data-testid="link-resume-download">Download résumé (PDF)<ArrowDownRight size={14} /></a></div>}
        </aside>
      </div>
    </div>
  );
}
