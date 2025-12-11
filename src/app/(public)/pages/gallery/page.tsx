'use client';

import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { Folder } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import styles from './gallery.module.css';

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

export default function GalleryPage() {
    const [albums, setAlbums] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchAlbums() {
            try {
                const { data, error: fetchError } = await supabase
                    .from('albums')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (fetchError) {
                    setError(fetchError.message);
                } else {
                    setAlbums(data || []);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchAlbums();
    }, []);

    if (loading) {
        return (
            <div className={styles.loading}>
                <p>Loading gallery...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container section-padding min-h-screen">
                <div className={styles.error}>
                    <h2>Error loading gallery</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Hero Section */}
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>Photo Gallery</h1>
                <div className={styles.waveBottom}>
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={styles.waveSvg}>
                        <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" fill="#ffffff"></path>
                    </svg>
                </div>
            </section>

            {/* Main Content */}
            <section className={styles.mainContent}>
                <div className="container">
                    <div className={styles.header}>
                        <span className={styles.subtitle}>Our Memories</span>
                    </div>

                    {!albums || albums.length === 0 ? (
                        <div className={styles.emptyState}>
                            <Folder className={styles.emptyIcon} />
                            <p className={styles.emptyTitle}>No albums found.</p>
                            <p className={styles.emptyText}>Check back soon for new photo albums!</p>
                        </div>
                    ) : (
                        <div className={styles.albumsGrid}>
                            {albums.map((album) => (
                                <Link href={`/pages/gallery/${album.id}`} key={album.id} className={styles.albumCard}>
                                    <div className={styles.imageContainer}>
                                        {album.cover_image_url ? (
                                            <img
                                                src={getThumbnailUrl(album.cover_image_url, null, 400)}
                                                alt={album.title}
                                                className={styles.albumImage}
                                                loading="lazy"
                                                referrerPolicy="no-referrer"
                                            />
                                        ) : (
                                            <div className={styles.placeholderImage}>
                                                <Folder className={styles.placeholderIcon} />
                                            </div>
                                        )}
                                        <div className={styles.overlay} />
                                    </div>

                                    <div className={styles.cardContent}>
                                        <h3 className={styles.albumTitle}>{album.title}</h3>
                                        <p className={styles.albumDesc}>
                                            {album.description || "No description available."}
                                        </p>
                                        <div className={styles.albumDate}>
                                            {format(new Date(album.created_at), 'MMMM d, yyyy')}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
