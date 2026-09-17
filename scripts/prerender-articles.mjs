import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { renderArticle, articlePaths } from '../.prerender/entry-server.js';

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const property = (name, value) => `<meta property="${name}" content="${escape(value)}">`;
const named = (name, value) => `<meta name="${name}" content="${escape(value)}">`;
const template = await readFile(resolve('dist/index.html'), 'utf8');
for (const path of ['/blog', ...articlePaths, '/']) {
  const { html, seo } = renderArticle(path);
  const extraHead = [
    `<link rel="canonical" href="${escape(seo.url)}">`,
    ...Object.entries({ 'og:title': seo.title, 'og:description': seo.description, 'og:type': seo.article ? 'article' : 'website', 'og:url': seo.url, 'og:image': seo.image, 'og:image:alt': seo.imageAlt, 'og:image:width': seo.schema ? '1536' : '1280', 'og:image:height': seo.schema ? '1024' : '1280', 'og:site_name': 'NMIT', ...(seo.publishedAt ? { 'article:published_time': seo.publishedAt } : {}), ...(seo.modifiedAt ? { 'article:modified_time': seo.modifiedAt } : {}) }).map(([key, value]) => property(key, value)),
    ...Object.entries({ 'twitter:card': seo.schema ? 'summary_large_image' : 'summary', 'twitter:title': seo.title, 'twitter:description': seo.description, 'twitter:image': seo.image, 'twitter:image:alt': seo.imageAlt }).map(([key, value]) => named(key, value)),
    ...(seo.schema ? [`<script id="article-schema" type="application/ld+json">${JSON.stringify(seo.schema).replaceAll('<', '\\u003c')}</script>`] : []),
  ].join('\n');
  const rendered = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(seo.title)}</title>`).replace(/<meta name="description"[^>]*>/, named('description', seo.description)).replace('</head>', `${extraHead}\n</head>`).replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const destination = resolve('dist', path.slice(1));
  await mkdir(destination, { recursive: true });
  await writeFile(resolve(destination, 'index.html'), rendered);
}
const { siteUrl } = renderArticle('/blog');
await writeFile(resolve('dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/', '/blog', ...articlePaths].map(path => `<url><loc>${escape(siteUrl + path)}</loc></url>`).join('')}</urlset>\n`);
console.log(`Prerendered ${articlePaths.length} articles, the blog listing, and the homepage.`);
