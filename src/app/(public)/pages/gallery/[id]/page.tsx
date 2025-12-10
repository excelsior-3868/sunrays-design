import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Image as ImageIcon } from 'lucide-react';
import dbConnect from '@/lib/db';
import Album from '@/lib/models/Album';
import styles from './gallery-detail.module.css';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    await dbConnect();

    if (!id.match(/^[0-9a-fA-F]{24}$/)) return { title: 'Album Not Found' };

    const album = await Album.findById(id).lean();
    if (!album) return { title: 'Album Not Found' };

    return {
        title: `${album.title} | Sunrays Gallery`,
        description: album.description || `View photos from ${album.title}`,
    };
}

async function getAlbum(id: string) {
    await dbConnect();
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return null;

    const album = await Album.findById(id).lean();
    if (!album) return null;

    return JSON.parse(JSON.stringify(album));
}

// Client component wrapper for lightbox interaction
// Since this is a server component, we'll implement a simple list first.
// For a lightbox, we would ideally make a client component.
// Let's create a Client Component for the Grid to handle interactions.

import GalleryGrid from './GalleryGrid';

export default async function AlbumDetailPage({ params }: PageProps) {
    const { id } = await params;
    const album = await getAlbum(id);

    if (!album) {
        notFound();
    }

    return (
        <div className={styles.galleryDetail}>
            <div className={styles.backLinkWrapper}>
                <div className="container">
                    <Link href="/pages/gallery" className={styles.backLink}>
                        <ArrowLeft size={20} />
                        Back to All Albums
                    </Link>
                </div>
            </div>

            <header className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>{album.title}</h1>
                    {album.description && (
                        <p className={styles.description}>{album.description}</p>
                    )}
                    <div className={styles.meta}>
                        <span>
                            <Calendar size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                            {new Date(album.createdAt).toLocaleDateString()}
                        </span>
                        <span>
                            <ImageIcon size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                            {album.photos?.length || 0} Photos
                        </span>
                    </div>
                </div>
            </header>

            <div className="container">
                <GalleryGrid photos={album.photos || []} />
            </div>
        </div>
    );
}
