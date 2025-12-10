import { Metadata } from 'next';
import Link from 'next/link';
import { Image as ImageIcon, Calendar } from 'lucide-react';
import dbConnect from '@/lib/db';
import Album from '@/lib/models/Album';
import styles from './gallery.module.css';

export const metadata: Metadata = {
    title: 'Photo Gallery | Sunrays Preschool',
    description: 'Explore our photo gallery showcasing events, activities, and happy moments at Sunrays Preschool.',
};

export const dynamic = 'force-dynamic';

async function getAlbums() {
    await dbConnect();
    const albums = await Album.find({ status: 'published' }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(albums));
}

export default async function GalleryPage() {
    const albums = await getAlbums();

    return (
        <main>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Our Gallery</h1>
                </div>
                <div className={styles.waveBottom}>
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={styles.waveSvg}>
                        <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" fill="#ffffff"></path>
                    </svg>
                </div>
            </section>

            {/* Albums Grid */}
            <section className={styles.gallerySection}>
                <div className="container">
                    <div className={styles.albumsGrid}>
                        {albums.length > 0 ? (
                            albums.map((album: any) => (
                                <Link href={`/pages/gallery/${album._id}`} key={album._id} className={styles.albumCard}>
                                    <div className={styles.cardImageWrapper}>
                                        {album.coverImage ? (
                                            <img
                                                src={album.coverImage}
                                                alt={album.title}
                                                className={styles.cardImage}
                                            />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                                                <ImageIcon size={64} />
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.cardContent}>
                                        <h2 className={styles.cardTitle}>{album.title}</h2>
                                        {album.description && (
                                            <p style={{ color: '#666', marginBottom: '15px', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                                {album.description.length > 80 ? album.description.substring(0, 80) + '...' : album.description}
                                            </p>
                                        )}
                                        <div className={styles.cardMeta}>
                                            <span className={styles.metaItem}>
                                                <ImageIcon size={16} />
                                                {album.photos?.length || 0} Photos
                                            </span>
                                            <span className={styles.metaItem}>
                                                <Calendar size={16} />
                                                {new Date(album.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: '#888' }}>
                                <ImageIcon size={48} style={{ marginBottom: '20px', opacity: 0.5 }} />
                                <h3>No albums found</h3>
                                <p>Check back later for new photos!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
