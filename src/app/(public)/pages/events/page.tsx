import { Metadata } from 'next';
import styles from './events.module.css';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import dbConnect from '@/lib/db';
import Event from '@/lib/models/Event';

export const metadata: Metadata = {
    title: 'Events & Activities',
    description: 'Discover upcoming events, special activities, and celebrations at Sunrays Pre School. From educational programs to festive celebrations, stay updated with all our exciting happenings.',
    keywords: ['preschool events', 'children activities', 'school celebrations', 'educational programs', 'Kathmandu events', 'kids activities'],
    openGraph: {
        title: 'Events & Activities | Sunrays Pre School',
        description: 'Stay updated with upcoming events and activities at Sunrays Pre School',
        images: ['/sunrays-logo.png'],
        type: 'website',
    },
};

export const dynamic = 'force-dynamic';

async function getPublishedEvents() {
    await dbConnect();

    const events = await Event.find({ status: 'published' })
        .sort({ date: -1 })
        .lean();

    return JSON.parse(JSON.stringify(events));
}

export default async function EventsPage() {
    const allEvents = await getPublishedEvents();

    // Separate upcoming and past events
    const now = new Date();
    const upcomingEvents = allEvents.filter((event: any) => new Date(event.date) >= now);
    const pastEvents = allEvents.filter((event: any) => new Date(event.date) < now);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className={styles.eventsPage}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>Events & Activities</h1>
                <div className={styles.waveBottom}>
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={styles.waveSvg}>
                        <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" fill="#ffffff"></path>
                    </svg>
                </div>
            </section>

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
                <section className={styles.eventsSection}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <h2 className={styles.sectionTitle}>Upcoming Events</h2>
                        </div>
                        <div className={styles.eventsGrid}>
                            {upcomingEvents.map((event: any, index: number) => {
                                const dateObj = new Date(event.date);
                                const day = dateObj.getDate();
                                const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();

                                // Colors from reference: Red, Purple, Blue, Green
                                const colors = ['#FF4A57', '#9b59b6', '#3498db', '#2ecc71'];
                                const color = colors[index % colors.length];

                                return (
                                    <div
                                        key={event._id}
                                        className={styles.eventCard}
                                        style={{ borderColor: color } as any}
                                    >
                                        <div className={styles.cardHeader}>
                                            <span className={styles.cardLabel}>
                                                EVENT
                                            </span>
                                            <span
                                                className={styles.cardBadge}
                                                style={{ backgroundColor: color }}
                                            >
                                                {day} {month}
                                            </span>
                                        </div>

                                        <div className={styles.eventContent}>
                                            <h3>{event.title}</h3>
                                            <p className={styles.description}>
                                                {event.description}
                                            </p>

                                            {event.location && (
                                                <div className={styles.locationFooter}>
                                                    <MapPin className={styles.locationIcon} />
                                                    {event.location}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )
            }

            {/* Past Events */}
            {
                pastEvents.length > 0 && (
                    <section className={styles.eventsSection}>
                        <div className="container">
                            <h2 className={styles.sectionTitle}>Past Events</h2>
                            <div className={styles.eventsGrid}>
                                {pastEvents.map((event: any) => (
                                    <div
                                        key={event._id}
                                        className={`${styles.eventCard} ${styles.pastEvent}`}
                                    >
                                        {event.imageUrl && (
                                            <div className={styles.eventImage}>
                                                <img src={event.imageUrl} alt={event.title} />
                                            </div>
                                        )}
                                        <div className={styles.eventContent}>
                                            <h3>{event.title}</h3>
                                            <p className={styles.description}>
                                                {event.description}
                                            </p>
                                            <div className={styles.eventMeta}>
                                                <div className={styles.metaItem}>
                                                    <Calendar size={18} />
                                                    {formatDate(event.date)}
                                                </div>
                                                <div className={styles.metaItem}>
                                                    <MapPin size={18} />
                                                    {event.location}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }

            {/* No Events */}
            {
                upcomingEvents.length === 0 && pastEvents.length === 0 && (
                    <section className={styles.eventsSection}>
                        <div className="container">
                            <div className={styles.noEvents}>
                                <Calendar size={64} />
                                <h3>No Events Available</h3>
                                <p>Check back soon for upcoming events and activities!</p>
                            </div>
                        </div>
                    </section>
                )
            }
        </div >
    );
}
