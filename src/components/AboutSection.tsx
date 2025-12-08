'use client';

import styles from './AboutSection.module.css';
import Image from 'next/image';
import { Check, Play } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutSection() {
    const features = [
        "First & Reliable", "B2B Exchange",
        "Tracking Service", "Transparent Pricing",
        "Worldwide Service", "20/5 Support"
    ];

    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.content}>
                    <motion.div
                        className={styles.imageCol}
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className={styles.blobImage}>
                            <Image
                                src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Teacher and kids"
                                width={600}
                                height={500}
                                className={styles.img}
                            />
                        </div>
                        <div className={styles.playBtn}>
                            <Play fill="white" size={24} />
                        </div>
                    </motion.div>

                    <motion.div
                        className={styles.textCol}
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <span className={styles.subtitle}>About Us</span>
                        <h2 className={styles.title}>Give the Children Space to Grow a Creativity</h2>
                        <p className={styles.description}>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.
                        </p>

                        <div className={styles.list}>
                            {features.map((item, i) => (
                                <div key={i} className={styles.listItem}>
                                    <Check size={16} className={styles.checkIcon} /> {item}
                                </div>
                            ))}
                        </div>

                        <Link href="/about" className="btn btn-primary">About Us</Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
