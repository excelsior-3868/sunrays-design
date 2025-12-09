import { Metadata } from 'next';
import styles from './event-detail.module.css';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import dbConnect from '@/lib/db';
import Event from '@/lib/models/Event';
import { notFound } from 'next/navigation';

interface PageProps {
    params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    await dbConnect();
    const event = await Event.findById(params.id).lean();

    if (!event || event.status !== 'published') {
        return {
            title: 'Event Not Found',
        };
    }

    return {
        title: `${event.title} | Sunrays Pre School`,
        description: event.description.substring(0, 160),
    };
}

async function getEvent(id: string) {
    await dbConnect();
    const event = await Event.findById(id).lean();

    if (!event || event.status !== 'published') {
        return null;
    }

    return JSON.parse(JSON.stringify(event));
}

export default async function EventDetailPage({ params }: PageProps) {
    const event = await getEvent(params.id);

    if (!event) {
        notFound();
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className={styles.eventDetailPage}>
            {/* Back Button */}
            <div className="container">
                <Link href="/events" className={styles.backLink}>
                    <ArrowLeft size={20} />
                    Back to Events
                </Link>
            </div>

            {/* Event Hero */}
            {event.imageUrl && (
                <div className={styles.eventHero}>
                    <img src={event.imageUrl} alt={event.title} />
                    <div className={styles.heroOverlay}></div>
                    <div className={styles.heroContent}>
                        <div className="container">
                            <h1>{event.title}</h1>
                        </div>
                    </div>
                </div>
            )}

            {/* Event Content */}
            <section className={styles.eventContent}>
                <div className="container">
                    {!event.imageUrl && <h1>{event.title}</h1>}

                    <div className={styles.eventMeta}>
                        <div className={styles.metaCard}>
                            <Calendar size={24} />
                            <div>
                                <span className={styles.metaLabel}>Date</span>
                                <span className={styles.metaValue}>{formatDate(event.date)}</span>
                            </div>
                        </div>
                        <div className={styles.metaCard}>
                            <MapPin size={24} />
                            <div>
                                <span className={styles.metaLabel}>Location</span>
                                <span className={styles.metaValue}>{event.location}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.description}>
                        <h2>About This Event</h2>
                        <p>{event.description}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
