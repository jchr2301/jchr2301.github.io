import type { PortfolioRecord } from '../content/types';
import { assetUrl } from '../content/normalize';

export function ProjectMedia({ record }: { record: PortfolioRecord }) {
  const gallery = record.gallery;
  const materials = record.supportingMaterials || [];
  if (!gallery?.items.length && !materials.length) return null;

  return (
    <div className="project-media">
      {!!gallery?.items.length && <section className="project-gallery" aria-labelledby={`${record.id}-gallery`}>
        <div className="project-gallery-heading">
          <p className="eyebrow">Interface designs</p>
          <h2 id={`${record.id}-gallery`}>{gallery.title}</h2>
          {gallery.description && <p>{gallery.description}</p>}
        </div>
        <div className="project-screen-grid">
          {gallery.items.map((item, index) => <figure className="project-screen" key={item.title}>
            <div className="project-screen-image">
              {item.crop ? <svg viewBox={`${item.crop.x} ${item.crop.y} ${item.crop.width} ${item.crop.height}`} role="img" aria-label={item.alt}>
                <image href={assetUrl(item.src)} width={item.crop.sourceWidth} height={item.crop.sourceHeight} />
              </svg> : <img src={assetUrl(item.src)} alt={item.alt} loading="lazy" />}
            </div>
            <figcaption><span className="eyebrow">Step {index + 1}</span><h3>{item.title}</h3><p>{item.caption}</p></figcaption>
          </figure>)}
        </div>
      </section>}
      {!!materials.length && <section className="project-materials" aria-label="Original project materials">
        {materials.map((item) => <figure key={item.src}>
          <div className="project-material-copy"><p className="eyebrow">Project archive · Chinese</p><h2>{item.title}</h2><p>{item.caption}</p><a href={assetUrl(item.src)} target="_blank" rel="noreferrer">View full-size original ↗</a></div>
          <a className="project-poster-link" href={assetUrl(item.src)} target="_blank" rel="noreferrer" aria-label={`View ${item.title.toLowerCase()} full size`}><img src={assetUrl(item.src)} alt={item.alt} loading="lazy" width="1414" height="2000" /></a>
        </figure>)}
      </section>}
    </div>
  );
}
