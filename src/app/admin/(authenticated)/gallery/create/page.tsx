'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, Loader2 } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';
import MultiImageUploader from '@/components/admin/MultiImageUploader';
import styles from '../gallery-admin.module.css'; // Reuse CSS if possible or inline

export default function CreateAlbumPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        coverImage: '',
    });
    const [photos, setPhotos] = useState<string[]>([]);

    const handleChange = (e: any) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                photos: photos.map(url => ({ url })), // Map strings to IPhoto objects
                status: 'published'
            };

            const res = await fetch('/api/admin/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Failed to create album');

            router.push('/admin/gallery');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Error creating album');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '30px' }}>Create New Album</h1>

            <form onSubmit={handleSubmit} style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Album Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="form-input"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                        placeholder="e.g. Annual Sports Day 2024"
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '100px' }}
                        placeholder="Optional description of the event..."
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <ImageUploader
                        label="Cover Image"
                        value={formData.coverImage}
                        onChange={(url) => setFormData(prev => ({ ...prev, coverImage: url }))}
                    />
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Album Photos</label>
                    <MultiImageUploader
                        images={photos}
                        onChange={setPhotos}
                    />
                    <small style={{ color: '#888' }}>Upload multiple photos at once.</small>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                    <Link href="/admin/gallery" style={{ padding: '12px 24px', borderRadius: '8px', background: '#f5f5f5', color: '#666', textDecoration: 'none', fontWeight: 600 }}>
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '8px',
                            background: '#FF4A57',
                            color: 'white',
                            border: 'none',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Create Album
                    </button>
                </div>
            </form>
        </div>
    );
}
