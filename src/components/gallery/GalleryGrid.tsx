'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Photo {
    url: string;
    name?: string;
    publicId?: string;
}

export default function GalleryGrid({ photos }: { photos: Photo[] }) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setLightboxIndex((prev) => (prev! + 1) % photos.length);
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setLightboxIndex((prev) => (prev! - 1 + photos.length) % photos.length);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev! + 1) % photos.length);
            if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev! - 1 + photos.length) % photos.length);
            if (e.key === 'Escape') setLightboxIndex(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, photos.length]);

    if (!photos || photos.length === 0) {
        return <div className="text-center py-20 text-gray-400">No photos in this album yet.</div>;
    }

    return (
        <>
            {/* Masonry Layout using CSS columns */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {photos.map((photo, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer bg-gray-100"
                        onClick={() => openLightbox(index)}
                    >
                        <img
                            src={photo.url}
                            alt={photo.name || 'Gallery photo'}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            {/* Optional: Add icon or text on hover */}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4" // z-100 to be above navbar
                        onClick={closeLightbox}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 transition-colors z-10"
                            onClick={closeLightbox}
                        >
                            <X size={36} />
                        </button>

                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 transition-colors hidden sm:block z-10"
                            onClick={prevImage}
                        >
                            <ChevronLeft size={48} />
                        </button>

                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 transition-colors hidden sm:block z-10"
                            onClick={nextImage}
                        >
                            <ChevronRight size={48} />
                        </button>

                        <motion.img
                            key={lightboxIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            src={photos[lightboxIndex].url}
                            alt={photos[lightboxIndex].name || 'Full view'}
                            className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl rounded-sm select-none"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <div className="absolute bottom-6 left-0 right-0 text-center text-white/70 text-sm font-medium tracking-widest">
                            {lightboxIndex + 1} / {photos.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
