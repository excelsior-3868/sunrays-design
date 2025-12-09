'use client';

import styles from './ServicesSection.module.css';
import Link from 'next/link';

interface ServicesSectionProps {
    showButton?: boolean;
}

export default function ServicesSection({ showButton = true }: ServicesSectionProps) {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.subtitle}>OUR PROGRAMS</span>
                    <h2 className={styles.title}>Discover Our Learning Programs</h2>
                    <p className={styles.description}>
                        We offer a variety of engaging programs designed to nurture creativity, build confidence, and develop essential skills for every age group.
                    </p>
                </div>

                <div className={styles.grid}>
                    {/* PG Card */}
                    <div className={`${styles.card} ${styles.cardRed}`}>
                        <div className={styles.content}>
                            <div className={styles.tagHeader}>
                                <span className={styles.ageLabel}>Play Group</span>
                                <span className={`${styles.tag} ${styles.tagRed}`}>2-3 Years</span>
                            </div>
                            <h3 className={styles.cardTitle}>Discovery & Fun</h3>
                            <p className={styles.cardDesc}>
                                A fun and safe environment where toddlers learn social skills through play, music, and interactive activities.
                            </p>
                        </div>
                    </div>

                    {/* Nursery Card */}
                    <div className={`${styles.card} ${styles.cardPurple}`}>
                        <div className={styles.content}>
                            <div className={styles.tagHeader}>
                                <span className={styles.ageLabel}>Nursery</span>
                                <span className={`${styles.tag} ${styles.tagPurple}`}>3-4 Years</span>
                            </div>
                            <h3 className={styles.cardTitle}>Early Foundation</h3>
                            <p className={styles.cardDesc}>
                                Introduction to structured learning with a focus on language development, basic numeracy, and creative arts.
                            </p>
                        </div>
                    </div>

                    {/* LKG Card */}
                    <div className={`${styles.card} ${styles.cardBlue}`}>
                        <div className={styles.content}>
                            <div className={styles.tagHeader}>
                                <span className={styles.ageLabel}>LKG Level</span>
                                <span className={`${styles.tag} ${styles.tagBlue}`}>4-5 Years</span>
                            </div>
                            <h3 className={styles.cardTitle}>Nature & Science</h3>
                            <p className={styles.cardDesc}>
                                Developing writing skills, exploring nature and science concepts, and enhancing logical thinking abilities.
                            </p>
                        </div>
                    </div>

                    {/* UKG Card */}
                    <div className={`${styles.card} ${styles.cardGreen}`}>
                        <div className={styles.content}>
                            <div className={styles.tagHeader}>
                                <span className={styles.ageLabel}>UKG Level</span>
                                <span className={`${styles.tag} ${styles.tagGreen}`}>5-6 Years</span>
                            </div>
                            <h3 className={styles.cardTitle}>Prep for School</h3>
                            <p className={styles.cardDesc}>
                                Advanced reading and math skills, leadership activities, and comprehensive preparation for primary school.
                            </p>
                        </div>
                    </div>

                </div>

                {showButton && (
                    <div className={styles.centerBtn}>
                        <Link href="/programs" className="btn btn-primary">
                            See More Programs
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
