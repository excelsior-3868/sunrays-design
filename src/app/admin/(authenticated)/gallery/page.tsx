'use client';

import { useEffect, useState } from 'react';
import styles from './gallery-admin.module.css'; // Shared CSS or reuse styles
import Link from 'next/link';
import { Plus, Image as ImageIcon, MapPin, Eye, Edit, Loader2 } from 'lucide-react';

// Using inline styles for layout as we reuse dashboard/blog layout usually
export default function GalleryAdminPage() {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        try {
            const res = await fetch('/api/admin/gallery');
            const data = await res.json();
            setAlbums(data);
        } catch (error) {
            console.error('Failed to fetch albums', error);
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
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Photo Gallery</h1>
                <Link
                    href="/admin/gallery/create"
                    style={{
                        background: '#FF4A57',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <Plus size={20} /> Create New Album
                </Link>
            </div>

            <div className={styles.galleryGrid}>
                {albums.length === 0 ? (
                    <div className={styles.emptyState}>
                        <ImageIcon size={48} style={{ marginBottom: '15px', opacity: 0.5 }} />
                        <h3>No albums yet</h3>
                        <p>Create an album to start sharing photos.</p>
                    </div>
                ) : (
                    albums.map((album: any) => (
                        <div key={album._id} className={styles.albumCard}>
                            <div className={styles.albumCover}>
                                {album.coverImage ? (
                                    <img src={album.coverImage} alt={album.title} />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                                        <ImageIcon size={48} />
                                    </div>
                                )}
                            </div>
                            <div className={styles.albumInfo}>
                                <h3 className={styles.albumTitle}>{album.title}</h3>
                                <div className={styles.photoCount}>
                                    {album.photos?.length || 0} Photos
                                </div>
                                <div className={styles.albumActions}>
                                    <Link href={`/admin/gallery/${album._id}`} style={{ padding: '6px', color: '#666' }}>
                                        <Edit size={18} />
                                    </Link>
                                    <Link href={`/pages/gallery`} target="_blank" style={{ padding: '6px', color: '#666' }}>
                                        <Eye size={18} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
