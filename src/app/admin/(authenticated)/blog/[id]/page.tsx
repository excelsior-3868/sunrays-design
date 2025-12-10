'use client';

import { useState, useEffect, use } from 'react';
import styles from '../blog-admin.module.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

export default function EditBlogPost({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        imageUrl: '',
        status: 'draft',
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/admin/blog/${id}`);
                if (!res.ok) throw new Error('Failed to fetch post');
                const data = await res.json();
                setFormData({
                    title: data.title,
                    excerpt: data.excerpt,
                    content: data.content,
                    imageUrl: data.imageUrl || '',
                    status: data.status,
                });
            } catch (error) {
                console.error(error);
                alert('Error loading post');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/admin/blog/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error('Failed to update post');
            }

            router.push('/admin/blog');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Error updating blog post');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Link href="/admin/blog" className={styles.actionBtn}>
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className={styles.title}>Edit Blog Post</h1>
                </div>
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
                    <button type="submit" className={styles.submitBtn} disabled={saving}>
                        {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
