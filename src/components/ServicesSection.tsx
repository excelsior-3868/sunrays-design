'use client';

import styles from './ServicesSection.module.css';
import { BookOpen, PaintBucket, Wallet, Users } from 'lucide-react';
import Link from 'next/link';

export default function ServicesSection() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.headingRow}>
                    <div className={styles.left}>
                        <span className={styles.subtitle}>Best Services</span>
                        <h2 className={styles.title}>Playing & Learning</h2>
                        <p className={styles.desc}>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.
                        </p>
                        <Link href="/contact" className="btn btn-primary">Get Start Now</Link>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.grid}>
                            <div className={`${styles.card} ${styles.blue}`}>
                                <BookOpen size={48} className={styles.icon} />
                                <h3 className={styles.cardTitle}>Best Study<br />Value</h3>
                            </div>
                            <div className={`${styles.card} ${styles.yellow}`}>
                                <PaintBucket size={48} className={styles.icon} />
                                <h3 className={styles.cardTitle}>Cognitive &<br />Creative</h3>
                            </div>
                            <div className={`${styles.card} ${styles.red}`}>
                                <Wallet size={48} className={styles.icon} />
                                <h3 className={styles.cardTitle}>Cheap &<br />Good Value</h3>
                            </div>
                            <div className={`${styles.card} ${styles.green}`}>
                                <Users size={48} className={styles.icon} />
                                <h3 className={styles.cardTitle}>Parent Trust<br />Guarantee</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
