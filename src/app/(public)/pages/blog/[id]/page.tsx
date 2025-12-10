import { Metadata } from 'next';
import styles from './blog-detail.module.css';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import dbConnect from '@/lib/db';
import BlogPost from '@/lib/models/BlogPost';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    await dbConnect();

    // Handle potential invalid ID format gracefully
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return { title: 'Post Not Found' };
    }

    const post = await BlogPost.findById(id).lean();

    if (!post || post.status !== 'published') {
        return { title: 'Post Not Found' };
    }

    return {
        title: `${post.title} | Sunrays Blog`,
        description: post.excerpt,
    };
}

async function getBlogPost(id: string) {
    await dbConnect();

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return null;
    }

    const post = await BlogPost.findById(id).lean();

    if (!post || post.status !== 'published') {
        return null;
    }

    return JSON.parse(JSON.stringify(post));
}

// Add helper to fetch recent posts
async function getRecentPosts(currentId: string) {
    await dbConnect();
    // Fetch 5 most recent posts, excluding current one
    const posts = await BlogPost.find({
        status: 'published',
        _id: { $ne: currentId }
    })
        .sort({ publishedAt: -1 })
        .limit(5)
        .select('title publishedAt imageUrl slug')
        .lean();

    return JSON.parse(JSON.stringify(posts));
}

export default async function BlogDetailPage({ params }: PageProps) {
    const { id } = await params;
    const post = await getBlogPost(id);
    const recentPosts = await getRecentPosts(id);

    if (!post) {
        notFound();
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className={styles.blogDetailPage}>
            <div className="container">
                <Link href="/pages/blog" className={styles.backLink}>
                    <ArrowLeft size={20} />
                    Back to Blog
                </Link>

                <div className={styles.blogContainer}>
                    {/* Left Column - Main Content */}
                    <div className={styles.leftColumn}>
                        <header className={styles.postHeader}>
                            <div className={styles.postMeta}>
                                <span className={styles.metaItem}>
                                    <Calendar size={16} />
                                    {formatDate(post.publishedAt || post.createdAt)}
                                </span>
                                <span className={styles.metaItem}>
                                    <Clock size={16} />
                                    {Math.ceil(post.content.length / 500)} min read
                                </span>
                            </div>

                            <h1 className={styles.postTitle}>{post.title}</h1>
                        </header>

                        {post.imageUrl && (
                            <div className={styles.postImageWrapper}>
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className={styles.postImage}
                                />
                            </div>
                        )}

                        <article className={styles.postContent}>
                            {post.content.split('\n').map((paragraph: string, index: number) => {
                                const trimmed = paragraph.trim();
                                if (!trimmed) return <br key={index} />;

                                // Check for heading-like content
                                if (trimmed.startsWith('#')) {
                                    // Determine heading level roughly by removing hash
                                    const text = trimmed.replace(/^#+\s*/, '');
                                    return <h2 key={index}>{text}</h2>;
                                }

                                // Check for list items
                                if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
                                    return <li key={index} style={{ listStylePosition: 'inside', marginBottom: '8px' }}>{trimmed.substring(2)}</li>
                                }

                                return <p key={index}>{trimmed}</p>;
                            })}
                        </article>

                        <div className={styles.shareSection}>
                            <span className={styles.shareTitle}>Thanks for reading!</span>
                            <Link href="/pages/blog" className={styles.backLink} style={{ padding: 0 }}>
                                <ArrowLeft size={16} /> Read more articles
                            </Link>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <aside className={styles.rightColumn}>
                        <h3 className={styles.sidebarTitle}>Recent Posts</h3>
                        <div className={styles.recentPostsList}>
                            {recentPosts.length > 0 ? (
                                recentPosts.map((recent: any) => (
                                    <Link href={`/pages/blog/${recent._id}`} key={recent._id} className={styles.recentPostCard}>
                                        <img
                                            src={recent.imageUrl || '/placeholder-blog.jpg'}
                                            alt={recent.title}
                                            className={styles.recentPostImage}
                                        />
                                        <div className={styles.recentPostContent}>
                                            <h4 className={styles.recentPostTitle}>{recent.title}</h4>
                                            <span className={styles.recentPostDate}>
                                                {new Date(recent.publishedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p style={{ color: '#888', fontStyle: 'italic' }}>No other posts yet.</p>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
