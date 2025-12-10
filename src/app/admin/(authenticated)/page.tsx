import { auth } from '@/auth';
import dbConnect from '@/lib/db';
import ContactEntry from '@/lib/models/ContactEntry';
import GalleryItem from '@/lib/models/GalleryItem';
import Event from '@/lib/models/Event';
import BlogPost from '@/lib/models/BlogPost';
import FAQ from '@/lib/models/FAQ';
import Page from '@/lib/models/Page';
import styles from './dashboard.module.css';
import LogoutButton from '@/components/admin/LogoutButton';

export default async function AdminDashboard() {
    const session = await auth();

    await dbConnect();

    // Get statistics
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [
        contactsCount,
        galleryCount,
        eventsCount,
        blogCount,
        faqCount,
        pagesCount,
    ] = await Promise.all([
        ContactEntry.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
        GalleryItem.countDocuments(),
        Event.countDocuments({ date: { $gte: new Date() }, status: 'published' }),
        BlogPost.countDocuments({ status: 'published' }),
        FAQ.countDocuments({ status: 'active' }),
        Page.countDocuments({ status: 'published' }),
    ]);

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1>Dashboard</h1>
                <div className={styles.userInfo}>
                    <p>Welcome back, <strong>{session?.user?.name || 'Admin'}</strong>!</p>
                    <LogoutButton />
                </div>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#667eea' }}>
                        📧
                    </div>
                    <div className={styles.statInfo}>
                        <h3>{contactsCount}</h3>
                        <p>Contact Submissions</p>
                        <span className={styles.statLabel}>Last 30 days</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#f093fb' }}>
                        🖼️
                    </div>
                    <div className={styles.statInfo}>
                        <h3>{galleryCount}</h3>
                        <p>Gallery Items</p>
                        <span className={styles.statLabel}>Total</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#4facfe' }}>
                        📅
                    </div>
                    <div className={styles.statInfo}>
                        <h3>{eventsCount}</h3>
                        <p>Upcoming Events</p>
                        <span className={styles.statLabel}>Published</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#43e97b' }}>
                        📝
                    </div>
                    <div className={styles.statInfo}>
                        <h3>{blogCount}</h3>
                        <p>Blog Posts</p>
                        <span className={styles.statLabel}>Published</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#fa709a' }}>
                        ❓
                    </div>
                    <div className={styles.statInfo}>
                        <h3>{faqCount}</h3>
                        <p>FAQ Items</p>
                        <span className={styles.statLabel}>Active</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#feca57' }}>
                        📄
                    </div>
                    <div className={styles.statInfo}>
                        <h3>{pagesCount}</h3>
                        <p>Custom Pages</p>
                        <span className={styles.statLabel}>Published</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
