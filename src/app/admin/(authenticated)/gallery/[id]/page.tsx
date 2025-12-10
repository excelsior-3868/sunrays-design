'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, Loader2, Trash2, ArrowLeft } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';
import MultiImageUploader from '@/components/admin/MultiImageUploader';

export default function EditAlbumPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        coverImage: '',
    });
    const [photos, setPhotos] = useState<string[]>([]);
    const [photoObjects, setPhotoObjects] = useState<any[]>([]);

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const res = await fetch(`/api/admin/gallery/${id}`);
                if (!res.ok) throw new Error('Failed');
                const data = await res.json();

                setFormData({
                    title: data.title,
                    description: data.description || '',
                    coverImage: data.coverImage || '',
                });

                // Existing photos are objects { url, _id }
                setPhotoObjects(data.photos || []);
                // We track just URLs for the uploader, but we need to handle existing vs new logic if needed
                // For simplicity in this iteration, we'll map back and forth but be careful not to lose IDs if relevant
                // Actually MultiImageUploader just deals with strings for now.
                setPhotos(data.photos?.map((p: any) => p.url) || []);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAlbum();
    }, [id]);

    const handlePhotosChange = (newUrls: string[]) => {
        setPhotos(newUrls);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = {
                ...formData,
                photos: photos.map(url => ({ url })),
            };

            const res = await fetch(`/api/admin/gallery/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Failed image update');

            router.push('/admin/gallery');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Update failed');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this album?')) return;

        try {
            await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
            router.push('/admin/gallery');
            router.refresh();
        } catch (e) {
            alert('Delete failed');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Link href="/admin/gallery" style={{ color: '#666' }}>
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Edit Album</h1>
                </div>

                <button
                    onClick={handleDelete}
                    style={{ background: '#fee', color: '#dc2626', border: 'none', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '8px' }}
                >
                    <Trash2 size={18} /> Delete Album
                </button>
            </div>

            <form onSubmit={handleSubmit} style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Album Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="form-input"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '100px' }}
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
                        onChange={handlePhotosChange}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                    <Link href="/admin/gallery" style={{ padding: '12px 24px', borderRadius: '8px', background: '#f5f5f5', color: '#666', textDecoration: 'none', fontWeight: 600 }}>
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={saving}
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
                        {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
