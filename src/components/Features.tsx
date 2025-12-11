'use client';

import styles from './Features.module.css';
import { Shield, Users, Heart } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Features() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.grid}>
                    {/* Blue Card - Safe Environment */}
                    <motion.div
                        className={`${styles.card} ${styles.blue}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        viewport={{ once: true }}
                    >
                        <Shield size={48} className={styles.icon} />
                        <h3 className={styles.title}>Safe & Caring Environment</h3>
                        <p className={styles.text}>
                            Provide a child friendly environment that is safe, secure, caring and stimulating.
                        </p>
                    </motion.div>

                    {/* Red Card - Development Through Play */}
                    <motion.div
                        className={`${styles.card} ${styles.red}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -10 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Users size={48} className={styles.icon} />
                        <h3 className={styles.title}>Development Through Play</h3>
                        <p className={styles.text}>
                            Encourage the development and education of children through playing.
                        </p>
                    </motion.div>

                    {/* Yellow Card - Building Confidence */}
                    <motion.div
                        className={`${styles.card} ${styles.yellow}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -10 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Heart size={48} className={styles.icon} />
                        <h3 className={styles.title}>Building Self-Confidence</h3>
                        <p className={styles.text}>
                            Encourage children to develop self-confidence, self-esteem and make them know the value as an individual.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
