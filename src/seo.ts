import { posts } from './data/posts';

export const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://nmit-solutions.com').replace(/\/$/, '');
const defaultDescription = 'NMIT: cloud infrastructure, DevOps, API integration, and staffing for banks, exchanges, and insurers. Bengaluru-based.';
const titles: Record<string, string> = { '': 'NMIT — cloud, DevOps, and API integration', services: 'Services — NMIT', about: 'About — NMIT', careers: 'Careers — NMIT', blog: 'Blog — NMIT', contact: 'Contact — NMIT' };

export function getPageSeo(pathname: string) {
  const [page = '', slug] = pathname.split('/').filter(Boolean);
  const post = page === 'blog' ? posts.find(item => item.slug === slug) : undefined;
  const richArticle = Boolean(post?.contentKey);
  const path = page === 'contact' ? '/contact' : pathname.replace(/\/$/, '') || '/';
  const url = `${siteUrl}${path}`;
  const title = post?.seoTitle ?? (post ? `${post.title} — NMIT` : titles[page] ?? 'Page not found — NMIT');
  const description = post?.description ?? post?.excerpt ?? defaultDescription;
  const image = `${siteUrl}${post?.featuredImage?.replace('-768.webp', '-1536.webp') ?? '/brand/nmit-concept.png'}`;
  const imageAlt = post?.featuredImageAlt ?? 'NMIT integration bridge logo';
  const schema = richArticle && post ? {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BlogPosting', '@id': `${url}#article`, headline: post.title, description, mainEntityOfPage: url, url, image: { '@type': 'ImageObject', url: image, width: 1536, height: 1024, caption: imageAlt }, datePublished: post.publishedAt, ...(post.modifiedAt ? { dateModified: post.modifiedAt } : {}), inLanguage: 'en', author: { '@type': 'Organization', name: 'NMIT', url: `${siteUrl}/about` }, publisher: { '@type': 'Organization', name: 'NMIT', url: siteUrl, logo: { '@type': 'ImageObject', url: `${siteUrl}/brand/nmit-concept.png` } }, articleSection: post.articleSection ?? 'Integration architecture' },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` }, { '@type': 'ListItem', position: 3, name: post.title, item: url }] },
    ],
  } : undefined;
  return { title, description, url, image, imageAlt, schema, article: Boolean(post), publishedAt: richArticle ? post?.publishedAt : undefined, modifiedAt: richArticle ? post?.modifiedAt : undefined };
}

export function applyPageSeo(pathname: string) {
  const seo = getPageSeo(pathname);
  document.title = seo.title;
  const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
    let node = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
    if (!node) { node = document.createElement('meta'); node.setAttribute(attribute, key); document.head.append(node); }
    node.content = content;
  };
  setMeta('name', 'description', seo.description);
  for (const [key, value] of Object.entries({ 'og:title': seo.title, 'og:description': seo.description, 'og:url': seo.url, 'og:type': seo.article ? 'article' : 'website', 'og:image': seo.image, 'og:image:alt': seo.imageAlt, 'og:site_name': 'NMIT' })) setMeta('property', key, value);
  setMeta('property', 'og:image:width', seo.schema ? '1536' : '1280');
  setMeta('property', 'og:image:height', seo.schema ? '1024' : '1280');
  if (seo.publishedAt) setMeta('property', 'article:published_time', seo.publishedAt);
  else document.head.querySelector('meta[property="article:published_time"]')?.remove();
  if (seo.modifiedAt) setMeta('property', 'article:modified_time', seo.modifiedAt);
  else document.head.querySelector('meta[property="article:modified_time"]')?.remove();
  for (const [key, value] of Object.entries({ 'twitter:card': seo.schema ? 'summary_large_image' : 'summary', 'twitter:title': seo.title, 'twitter:description': seo.description, 'twitter:image': seo.image, 'twitter:image:alt': seo.imageAlt })) setMeta('name', key, value);
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
  canonical.href = seo.url;
  document.getElementById('article-schema')?.remove();
  if (seo.schema) { const node = document.createElement('script'); node.id = 'article-schema'; node.type = 'application/ld+json'; node.textContent = JSON.stringify(seo.schema); document.head.append(node); }
}
