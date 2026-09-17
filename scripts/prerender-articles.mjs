import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { renderArticle } from '../.prerender/entry-server.js';

const path = '/blog/legacy-system-integration';
const { html, seo, siteUrl } = renderArticle(path);
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const property = (name, value) => `<meta property="${name}" content="${escape(value)}">`;
const named = (name, value) => `<meta name="${name}" content="${escape(value)}">`;
let template = await readFile(resolve('dist/index.html'), 'utf8');
template = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(seo.title)}</title>`).replace(/<meta name="description"[^>]*>/, named('description', seo.description));
const extraHead = [
  `<link rel="canonical" href="${escape(seo.url)}">`,
  ...Object.entries({ 'og:title': seo.title, 'og:description': seo.description, 'og:type': 'article', 'og:url': seo.url, 'og:image': seo.image, 'og:image:alt': seo.imageAlt, 'og:image:width': '1536', 'og:image:height': '1024', 'og:site_name': 'NMIT', 'article:published_time': '2026-09-17' }).map(([key, value]) => property(key, value)),
  ...Object.entries({ 'twitter:card': 'summary_large_image', 'twitter:title': seo.title, 'twitter:description': seo.description, 'twitter:image': seo.image, 'twitter:image:alt': seo.imageAlt }).map(([key, value]) => named(key, value)),
  `<script id="article-schema" type="application/ld+json">${JSON.stringify(seo.schema).replaceAll('<', '\\u003c')}</script>`,
].join('\n');
template = template.replace('</head>', `${extraHead}\n</head>`).replace('<div id="root"></div>', `<div id="root">${html}</div>`);
const destination = resolve('dist', path.slice(1));
await mkdir(destination, { recursive: true });
await writeFile(resolve(destination, 'index.html'), template);
// Listing pages also expose a normal HTML link to the article before JavaScript runs.
const renderedListing = renderArticle('/blog');
const listingHtml = (await readFile(resolve('dist/index.html'), 'utf8')).replace('<div id="root"></div>', `<div id="root">${renderedListing.html}</div>`);
await mkdir(resolve('dist/blog'), { recursive: true });
await writeFile(resolve('dist/blog/index.html'), listingHtml.replace(/<title>[\s\S]*?<\/title>/, '<title>Blog — NMIT</title>'));
await writeFile(resolve('dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(siteUrl)}/</loc></url><url><loc>${escape(siteUrl)}/blog</loc></url><url><loc>${escape(seo.url)}</loc></url></urlset>\n`);
console.log(`Prerendered article and blog listing: ${path}`);
