import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { getPageSeo, siteUrl } from './seo';
import { posts } from './data/posts';

export const articlePaths = posts.filter(post => post.contentKey).map(post => `/blog/${post.slug}`);

export function renderArticle(path: string) {
  return { html: renderToString(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>), seo: getPageSeo(path), siteUrl };
}
