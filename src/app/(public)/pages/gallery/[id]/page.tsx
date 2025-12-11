'use client';

import { use, useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import styles from './album-detail.module.css';

// Extract file ID from Google Drive URL
function extractFileId(url: string): string | null {
    if (!url) return null;

    // Match: ?id=FILE_ID or &id=FILE_ID
    const idMatch = url.match(/[?&]id=([^&]+)/);
    if (idMatch) return idMatch[1];

    // Match: /file/d/FILE_ID/
    const fileMatch = url.match(/\/file\/d\/([^\/]+)/);
    if (fileMatch) return fileMatch[1];

    return null;
}

// Get Google Drive thumbnail URL
function getThumbnailUrl(url: string, fileId?: string | null, size: number = 400): string {
    if (!url) return '';

    // Use provided file ID or extract from URL
    const id = fileId || extractFileId(url);

    if (id) {
        return `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`;
    }

    // Fallback to original URL
    return url;
}

type Album = {
    id: string;
    created_at: string;
    title: string;
    description: string | null;
};

type Photo = {
    id: string;
    created_at: string;
    title: string | null;
    image_url: string;
    drive_file_id: string | null;
};

export default function AlbumDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const [album, setAlbum] = useState<Album | null>(null);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data: albumData, error: albumError } = await supabase
                    .from('albums')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (albumError) {
                    setError(albumError.message);
                    setLoading(false);
                    return;
                }

                const { data: photosData, error: photosError } = await supabase
                    .from('gallery')
                    .select('*')
                    .eq('album_id', id)
                    .order('created_at', { ascending: false });

                setAlbum(albumData);
                setPhotos(photosData || []);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load album');
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;

            if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, photos.length]);

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);
    const nextImage = () => setLightboxIndex((prev) => (prev! + 1) % photos.length);
    const prevImage = () => setLightboxIndex((prev) => (prev! - 1 + photos.length) % photos.length);

    if (loading) {
        return (
            <div className={styles.loading}>
                <p>Loading album...</p>
            </div>
        );
    }

    if (error || !album) {
        return (
            <div className={styles.error}>
                <h2>Album not found</h2>
                <p>{error || 'The album you are looking for does not exist.'}</p>
                <Link href="/pages/gallery" className={styles.backLink}>
                    ← Back to Gallery
                </Link>
            </div>
        );
    }

    return (
        <div>
            {/* Hero Section */}
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>{album.title}</h1>
                <div className={styles.waveBottom}>
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={styles.waveSvg}>
                        <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" fill="#ffffff"></path>
                    </svg>
                </div>
            </section>

            {/* Main Content */}
            <section className={styles.mainContent}>
                <div className="container">
                    <Link href="/pages/gallery" className={styles.backLink}>
                        <ArrowLeft className={styles.backIcon} />
                        Back to Gallery
                    </Link>

                    {album.description && (
                        <p className={styles.albumDesc}>{album.description}</p>
                    )}
                    <p className={styles.albumDate}>{format(new Date(album.created_at), 'MMMM d, yyyy')}</p>

                    {photos.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p>No photos in this album yet.</p>
                        </div>
                    ) : (
                        <div className={styles.photosGrid}>
                            {photos.map((photo, index) => (
                                <div
                                    key={photo.id}
                                    className={styles.photoCard}
                                    onClick={() => openLightbox(index)}
                                >
                                    <img
                                        src={getThumbnailUrl(photo.image_url, photo.drive_file_id, 400)}
                                        alt={photo.title || 'Photo'}
                                        className={styles.photoImage}
                                        loading="lazy"
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className={styles.photoOverlay}>
                                        <span className={styles.viewText}>Click to view</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <div className={styles.lightbox} onClick={closeLightbox}>
                    <button className={styles.closeBtn} onClick={closeLightbox}>
                        <X size={32} />
                    </button>
                    <button className={styles.prevBtn} onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                        <ChevronLeft size={48} />
                    </button>
                    <button className={styles.nextBtn} onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                        <ChevronRight size={48} />
                    </button>
                    <img
                        src={getThumbnailUrl(photos[lightboxIndex].image_url, photos[lightboxIndex].drive_file_id, 1000)}
                        alt={photos[lightboxIndex].title || 'Photo'}
                        className={styles.lightboxImage}
                        onClick={(e) => e.stopPropagation()}
                        referrerPolicy="no-referrer"
                    />
                    <div className={styles.lightboxCounter}>
                        {lightboxIndex + 1} / {photos.length}
                    </div>
                </div>
            )}
        </div>
    );
}
