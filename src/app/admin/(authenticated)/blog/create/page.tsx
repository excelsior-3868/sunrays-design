'use client';

import { useState } from 'react';
import styles from '../blog-admin.module.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, Loader2 } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

export default function CreateBlogPost() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        imageUrl: '',
        status: 'draft',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/admin/blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error('Failed to create post');
            }

            router.push('/admin/blog');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Error creating blog post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Create New Blog Post</h1>
            </div>

            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        className={styles.input}
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter blog title"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Short Excerpt</label>
                    <textarea
                        name="excerpt"
                        required
                        className={styles.input}
                        value={formData.excerpt}
                        onChange={handleChange}
                        placeholder="A short summary of the post..."
                        rows={3}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Content</label>
                    <textarea
                        name="content"
                        required
                        className={styles.textarea}
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Write your blog post content here..."
                    />
                </div>

                <div className={styles.formGroup}>
                    <ImageUploader
                        label="Featured Image"
                        value={formData.imageUrl}
                        onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Status</label>
                    <select
                        name="status"
                        className={styles.select}
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                <div className={styles.formActions}>
                    <Link href="/admin/blog" className={styles.cancelBtn}>
                        Cancel
                    </Link>
                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Save Post
                    </button>
                </div>
            </form>
        </div>
    );
}
