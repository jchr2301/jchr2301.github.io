import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { collections, publicRecords } from '../src/content/index';
import { profile } from '../src/content/profile';

const appRoot = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(appRoot, 'dist/public');
const site = new URL(process.env.SITE_URL || 'https://jchr2301.github.io/');
if (site.protocol !== 'https:' || site.search || site.hash) throw new Error('SITE_URL must be a public HTTPS URL without a query or fragment.');
const template = await readFile(path.join(output, 'index.html'), 'utf8');
const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const base = site.pathname.replace(/\/$/, '');
const routes = [
  { route: '', title: 'Ryan Huang | Product & Technology Portfolio', description: 'Explore Ryan Huang’s work in product discovery, commercial analysis, and software development. University of Michigan MSI, Product Management Pathway.' },
  { route: 'projects', title: 'Projects | Ryan Huang', description: 'Product discovery, commercial strategy, and software development projects by Ryan Huang.' },
  { route: 'experience', title: 'Experience | Ryan Huang', description: 'Ryan Huang’s experience in Salesforce CRM technical consulting and mandatory military service.' },
  { route: 'about', title: 'About Ryan Huang', description: profile.introduction || 'University of Michigan MSI student pursuing product management and technology consulting.' },
];
for (const [kind, records] of Object.entries(collections)) {
  const published = publicRecords(records);
  const collectionPath = kind === 'activity' ? 'activities' : kind === 'experience' ? 'experience' : 'projects';
  if (kind === 'activity' && published.length) routes.push({ route: 'activities', title: 'Activities | Ryan Huang', description: 'Communities, initiatives, and activities.' });
  for (const record of published) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.slug)) throw new Error(`Unsafe slug: ${record.slug}`);
    routes.push({ route: `${collectionPath}/${record.slug}`, title: `${record.title} | Ryan Huang`, description: record.summary || record.title });
  }
}

for (const item of routes) {
  const url = `${site.origin}${base}/${item.route ? `${item.route}/` : ''}`;
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(item.title)}</title>`);
  for (const key of ['description', 'og:description', 'twitter:description']) html = html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*("\\s*/?>)`), `$1${escape(item.description)}$2`);
  for (const key of ['og:title', 'twitter:title']) html = html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*("\\s*/?>)`), `$1${escape(item.title)}$2`);
  html = html.replace('</head>', `  <link rel="canonical" href="${escape(url)}" />\n    <meta property="og:url" content="${escape(url)}" />\n  </head>`);
  const directory = path.join(output, item.route);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), html);
}
await writeFile(path.join(output, '404.html'), template.replace('content="index, follow"', 'content="noindex, follow"'));
await writeFile(path.join(output, '.nojekyll'), '');
await writeFile(path.join(output, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.origin}${base}/sitemap.xml\n`);
await writeFile(path.join(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(({ route }) => `  <url><loc>${escape(`${site.origin}${base}/${route ? `${route}/` : ''}`)}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`Prepared ${routes.length} public routes, résumé/assets, sitemap, and 404 for ${site.href}`);
