import { Link, useParams } from 'react-router-dom';
import { PostItem } from '../components/Content';
import { posts } from '../data/posts';
import { LegacySystemIntegration } from '../content/LegacySystemIntegration';
export function Blog() { return <><section><h1>Blog</h1></section><section className="tight"><div className="post-list">{posts.map(post => <PostItem key={post.slug} post={post} />)}</div></section></>; }
export function BlogPost() {
  const { slug } = useParams();
  const post = posts.find(item => item.slug === slug);
  if (!post) return <section><h1>Post not found</h1><p><Link to="/blog">Back to blog</Link></p></section>;
  if (post.contentKey === 'legacy-integration') return <LegacySystemIntegration />;
  return <article className="post prose"><section><div className="date">{post.date}</div><h1>{post.title}</h1>{post.body.map((paragraph,index) => <p key={index}>{paragraph}</p>)}<p style={{ marginTop:24 }}><Link to="/blog">← Back to blog</Link></p></section></article>;
}
