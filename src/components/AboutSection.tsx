'use client';

import styles from './AboutSection.module.css';
import Image from 'next/image';
import { Check, Play } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutSection() {

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
                        <h2 className={styles.title}>Give Children the Space to Learn, Grow & Shine</h2>
                        <p className={styles.description}>
                            About Our School: Our Sunrays Pre-school provides early childhood education and care for children. We help them develop various ranges of skills that make them ready to learn various activities. We are located at prime residential area of Kathmandu valley. Our Sunrays Pre-school ensures high quality education to children that are both accessible and affordable.
                        </p>



                        <Link href="/about" className="btn btn-primary">About Us</Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
