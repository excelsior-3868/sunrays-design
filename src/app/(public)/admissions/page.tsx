import { Metadata } from 'next';
import styles from './admissions.module.css';
import { FileText, CheckCircle2, Clock, Calendar, ClipboardList } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Admissions',
    description: 'Join the Sunrays Pre School family. Learn about our simple admission process, required documents, and school schedule. Enroll your child in quality early education in Kathmandu.',
    keywords: ['preschool admission kathmandu', 'enroll preschool', 'admission procedure', 'school timings', 'preschool enrollment'],
    openGraph: {
        title: 'Admissions - Sunrays Pre School Kathmandu',
        description: 'Simple admission process for quality early education. School hours: 9 AM - 2:45 PM, Sun - Fri.',
        type: 'website',
    },
};

export default function AdmissionsPage() {
    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://sunrayspreschool.edu.np'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Admissions',
                item: 'https://sunrayspreschool.edu.np/admissions'
            }
        ]
    };

    return (
        <div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {/* Hero Section */}
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>Admissions</h1>
                <div className={styles.waveBottom}>
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={styles.waveSvg}>
                        <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" fill="#ffffff"></path>
                    </svg>
                </div>
            </section>

            {/* Content Section */}
            <section className={styles.section}>
                <div className={styles.container}>

                    {/* Intro / Procedure Overview */}
                    <div className={styles.introSection}>
                        <h2 className={styles.mainTitle}>Join the Sunrays Family</h2>
                        <p className={styles.introText}>
                            We are excited to welcome you and your child to our community. Our admission process is designed to be simple and transparent, helping us understand your child's unique needs from day one.
                        </p>
                    </div>

                    <div className={styles.grid}>

                        {/* Card 1: Procedure / Questionnaire */}
                        <div className={`${styles.card} ${styles.procedureCard}`}>
                            <div className={styles.cardIcon}>
                                <ClipboardList size={32} />
                            </div>
                            <h3 className={styles.cardTitle}>Admission Procedure</h3>
                            <p className={styles.text}>
                                Our School seeks information via simple questionnaires from parents regarding:
                            </p>
                            <ul className={styles.list} style={{ marginTop: '15px' }}>
                                <li className={styles.listItem}>
                                    <CheckCircle2 size={18} className={styles.bullet} /> Daily Habits
                                </li>
                                <li className={styles.listItem}>
                                    <CheckCircle2 size={18} className={styles.bullet} /> Allergies & Health
                                </li>
                                <li className={styles.listItem}>
                                    <CheckCircle2 size={18} className={styles.bullet} /> Language Skills
                                </li>
                                <li className={styles.listItem}>
                                    <CheckCircle2 size={18} className={styles.bullet} /> Personal Interests
                                </li>
                            </ul>
                        </div>

                        {/* Card 2: Documents */}
                        <div className={`${styles.card} ${styles.documentsCard}`}>
                            <div className={styles.cardIcon}>
                                <FileText size={32} />
                            </div>
                            <h3 className={styles.cardTitle}>Documents Required</h3>
                            <ul className={styles.list}>
                                <li className={styles.listItem}>
                                    <CheckCircle2 size={18} className={styles.bullet} /> 4 Passport size photographs
                                </li>
                                <li className={styles.listItem}>
                                    <CheckCircle2 size={18} className={styles.bullet} /> Birth certificate
                                </li>
                                <li className={styles.listItem}>
                                    <CheckCircle2 size={18} className={styles.bullet} /> Vaccination Certificates
                                </li>
                                <li className={styles.listItem}>
                                    <CheckCircle2 size={18} className={styles.bullet} /> Past Medical Records (if any)
                                </li>
                            </ul>
                        </div>

                        {/* Card 3: Timings */}
                        <div className={`${styles.card} ${styles.timingsCard}`}>
                            <div className={styles.cardIcon}>
                                <Clock size={32} />
                            </div>
                            <h3 className={styles.cardTitle}>School Schedule</h3>

                            <div className={styles.timeRow}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Calendar size={20} color="var(--color-blue)" />
                                    <span className={styles.timeLabel}>School Days</span>
                                </div>
                                <span className={styles.timeValue}>Sun - Fri</span>
                            </div>

                            <div className={styles.timeRow}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Clock size={20} color="var(--color-blue)" />
                                    <span className={styles.timeLabel}>School Hours</span>
                                </div>
                                <span className={styles.timeValue}>9 AM - 2:45 PM</span>
                            </div>

                            <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '15px', lineHeight: '1.5' }}>
                                We follow a structured routine balancing learning, play, and rest to keep children engaged and energetic.
                            </p>
                        </div>

                    </div>

                    {/* CTA Section */}
                    <div className={styles.ctaSection}>
                        <h2 className={styles.ctaTitle} style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)' }}>Have Questions?</h2>
                        <p className={styles.ctaText}>
                            We are here to help! Contact our admissions office for more details or to schedule a visit.
                        </p>
                        <Link href="/contact" className={styles.ctaBtn}>
                            Contact Us Today
                        </Link>
                    </div>

                </div>
            </section>
        </div>
    );
}
