import { Suspense } from 'react';
import { Metadata } from 'next';
import styles from './blog.module.css';
import Link from 'next/link';
import { Archive, Clock, ArrowRight, Calendar, Loader2 } from 'lucide-react';
import dbConnect from '@/lib/db';
import BlogPost from '@/lib/models/BlogPost';

export const metadata: Metadata = {
    title: 'Blog & News',
    description: 'Read the latest news, parenting tips, educational insights, and updates from Sunrays Pre School. Stay informed about early childhood education and our school community.',
    keywords: ['preschool blog', 'parenting tips', 'early education', 'child development', 'school news', 'educational articles'],
    openGraph: {
        title: 'Blog & News | Sunrays Pre School',
        description: 'Latest news, updates, and educational articles from Sunrays Pre School',
        images: ['/sunrays-logo.png'],
        type: 'website',
    },
};

export const dynamic = 'force-dynamic';

async function getBlogPosts() {
    await dbConnect();

    const posts = await BlogPost.find({ status: 'published' })
        .sort({ publishedAt: -1 })
        .lean();

    return JSON.parse(JSON.stringify(posts));
}

async function BlogContent() {
    const posts = await getBlogPosts();

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getDateParts = (date: string) => {
        const d = new Date(date);
        return {
            day: d.getDate(),
            month: d.toLocaleString('en-US', { month: 'short' })
        };
    };

    return (
        <div className={styles.mainContent}>
            <div className="container">
                {posts.length > 0 ? (
                    <div className={styles.blogGrid}>
                        {posts.map((post: any) => {
                            const { day, month } = getDateParts(post.publishedAt || post.createdAt);

                            return (
                                <Link
                                    href={`/pages/blog/${post._id}`}
                                    key={post._id}
                                    className={styles.blogCard}
                                >
                                    <div className={styles.imageWrapper}>
                                        <div className={styles.dateBadge}>
                                            <span className={styles.dateDay}>{day}</span>
                                            <span className={styles.dateMonth}>{month}</span>
                                        </div>
                                        {post.imageUrl ? (
                                            <img
                                                src={post.imageUrl}
                                                alt={post.title}
                                                className={styles.blogImage}
                                            />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                                                <Archive size={48} />
                                            </div>
                                        )}
                                    </div>

                                    <div className={styles.contentWrapper}>
                                        <div className={styles.metaInfo}>
                                            <span className={styles.metaItem}>
                                                <Calendar size={14} />
                                                {formatDate(post.publishedAt || post.createdAt)}
                                            </span>
                                            <span className={styles.metaItem}>
                                                <Clock size={14} />
                                                {Math.ceil(post.content.length / 500)} min read
                                            </span>
                                        </div>

                                        <h2 className={styles.blogTitle}>{post.title}</h2>

                                        <p className={styles.excerpt}>
                                            {post.excerpt || post.content.substring(0, 120) + '...'}
                                        </p>

                                        <span className={styles.readMoreBtn}>
                                            Read Article <ArrowRight size={16} />
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <Archive size={64} style={{ marginBottom: 20, opacity: 0.5 }} />
                        <h3>No blog posts found</h3>
                        <p>Check back later for updates and news.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function LoadingBlog() {
    return (
        <div className={styles.mainContent}>
            <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    <Loader2 className="animate-spin" size={48} color="#FF7A00" />
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>Loading blog posts...</p>
                </div>
            </div>
        </div>
    );
}

export default function BlogPage() {
    return (
        <div className={styles.blogPage}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>Our Blog</h1>
                <div className={styles.waveBottom}>
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={styles.waveSvg}>
                        <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" fill="#ffffff"></path>
                    </svg>
                </div>
            </section>

            <Suspense fallback={<LoadingBlog />}>
                <BlogContent />
            </Suspense>
        </div>
    );
}
