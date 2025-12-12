'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Photo {
    url: string;
    name?: string;
    publicId?: string;
}

export default function GalleryGrid({ photos }: { photos: Photo[] }) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());

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

    const handleImageLoad = (index: number) => {
        setImagesLoaded(prev => new Set(prev).add(index));
    };

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
                        viewport={{ once: true, margin: "100px" }}
                        transition={{ duration: 0.5, delay: Math.min(index * 0.03, 0.5) }}
                        className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer bg-gray-100"
                        onClick={() => openLightbox(index)}
                    >
                        <div className="relative w-full">
                            <Image
                                src={photo.url}
                                alt={photo.name || 'Gallery photo'}
                                width={400}
                                height={300}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                loading={index < 8 ? "eager" : "lazy"}
                                priority={index < 4}
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                onLoad={() => handleImageLoad(index)}
                                quality={85}
                            />
                            {/* Loading skeleton */}
                            {!imagesLoaded.has(index) && (
                                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                            )}
                        </div>
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                                View
                            </div>
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
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={closeLightbox}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 transition-colors z-10 bg-black/30 rounded-full hover:bg-black/50"
                            onClick={closeLightbox}
                            aria-label="Close lightbox"
                        >
                            <X size={36} />
                        </button>

                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 transition-colors hidden sm:block z-10 bg-black/30 rounded-full hover:bg-black/50"
                            onClick={prevImage}
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={48} />
                        </button>

                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 transition-colors hidden sm:block z-10 bg-black/30 rounded-full hover:bg-black/50"
                            onClick={nextImage}
                            aria-label="Next image"
                        >
                            <ChevronRight size={48} />
                        </button>

                        <div className="relative max-h-[85vh] max-w-[90vw]">
                            <Image
                                key={lightboxIndex}
                                src={photos[lightboxIndex].url}
                                alt={photos[lightboxIndex].name || 'Full view'}
                                width={1920}
                                height={1080}
                                className="max-h-[85vh] max-w-[90vw] w-auto h-auto object-contain shadow-2xl rounded-sm select-none"
                                onClick={(e) => e.stopPropagation()}
                                priority
                                quality={95}
                            />
                        </div>

                        <div className="absolute bottom-6 left-0 right-0 text-center text-white/70 text-sm font-medium tracking-widest">
                            {lightboxIndex + 1} / {photos.length}
                        </div>

                        {/* Mobile swipe hint */}
                        <div className="absolute bottom-16 left-0 right-0 text-center text-white/50 text-xs sm:hidden">
                            Swipe or use arrow keys to navigate
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
