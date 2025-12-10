'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './gallery-detail.module.css';

interface Photo {
    url: string;
    _id?: string;
}

export default function GalleryGrid({ photos }: { photos: Photo[] }) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const nextPhoto = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null && lightboxIndex < photos.length - 1) {
            setLightboxIndex(lightboxIndex + 1);
        }
    };

    const prevPhoto = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null && lightboxIndex > 0) {
            setLightboxIndex(lightboxIndex - 1);
        }
    };

    if (photos.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', color: '#888' }}>
                <p>No photos in this album yet.</p>
            </div>
        );
    }

    return (
        <>
            <div className={styles.photoGrid}>
                {photos.map((photo, index) => (
                    <div
                        key={photo._id || index}
                        className={styles.photoItem}
                        onClick={() => openLightbox(index)}
                    >
                        <img
                            src={photo.url}
                            alt={`Photo ${index + 1}`}
                            className={styles.photo}
                            loading="lazy"
                        />
                        <div className={styles.overlay}>
                            {/* <ZoomIn color="white" size={32} /> */}
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Overlay */}
            {lightboxIndex !== null && (
                <div className={styles.lightbox} onClick={closeLightbox}>
                    <button className={styles.closeParams} onClick={closeLightbox}>
                        <X size={32} />
                    </button>

                    {lightboxIndex > 0 && (
                        <button
                            onClick={prevPhoto}
                            style={{ position: 'absolute', left: '20px', color: 'white', background: 'transparent', border: 'none', cursor: 'pointer' }}
                        >
                            <ChevronLeft size={48} />
                        </button>
                    )}

                    <img
                        src={photos[lightboxIndex].url}
                        alt="Zoomed view"
                        className={styles.lightboxImage}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                    />

                    {lightboxIndex < photos.length - 1 && (
                        <button
                            onClick={nextPhoto}
                            style={{ position: 'absolute', right: '20px', color: 'white', background: 'transparent', border: 'none', cursor: 'pointer' }}
                        >
                            <ChevronRight size={48} />
                        </button>
                    )}
                </div>
            )}
        </>
    );
}
