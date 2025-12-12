'use client';

import { useEffect, useState } from 'react';
import styles from './blog-admin.module.css';
import Link from 'next/link';
import { Plus, Edit, Eye, Trash2, Loader2 } from 'lucide-react';

export default function BlogAdminPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/admin/blog');
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <Loader2 className="animate-spin" size={40} style={{ color: '#FF4A57' }} />
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Blog Posts</h1>
                <Link href="/admin/blog/create" className={styles.createBtn}>
                    <Plus size={20} /> Create New Post
                </Link>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>
                                    No blog posts found. Create one to get started!
                                </td>
                            </tr>
                        ) : (
                            posts.map((post: any) => (
                                <tr key={post._id}>
                                    <td>
                                        <strong>{post.title}</strong>
                                    </td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${post.status === 'published' ? styles.statusPublished : styles.statusDraft}`}>
                                            {post.status}
                                        </span>
                                    </td>
                                    <td>
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </td>
                                    <td>{post.author}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <Link href={`/pages/blog/${post._id}`} target="_blank" className={styles.actionBtn} title="View Public">
                                                <Eye size={18} />
                                            </Link>
                                            <Link href={`/admin/blog/${post._id}`} className={styles.actionBtn} title="Edit">
                                                <Edit size={18} />
                                            </Link>
                                            <button
                                                className={styles.actionBtn}
                                                title="Delete"
                                                onClick={async () => {
                                                    if (confirm('Are you sure you want to delete this post?')) {
                                                        try {
                                                            const res = await fetch(`/api/admin/blog/${post._id}`, { method: 'DELETE' });
                                                            if (res.ok) {
                                                                fetchPosts();
                                                            } else {
                                                                alert('Failed to delete post');
                                                            }
                                                        } catch (e) {
                                                            console.error(e);
                                                            alert('Error deleting post');
                                                        }
                                                    }
                                                }}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
