'use client';

import styles from './Features.module.css';
import { Send, Brain, Lightbulb, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Features() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.grid}>
                    {/* Blue Card */}
                    <motion.div
                        className={`${styles.card} ${styles.blue}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        viewport={{ once: true }}
                    >
                        <Send size={48} className={styles.icon} />
                        <h3 className={styles.title}>Building Imagination</h3>
                        <p className={styles.text}>
                            Encouraging creative play to foster innovative thinking and problem-solving skills in young minds.
                        </p>
                    </motion.div>

                    {/* Red Card */}
                    <motion.div
                        className={`${styles.card} ${styles.red}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -10 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Brain size={48} className={styles.icon} />
                        <h3 className={styles.title}>Growing Cognitive</h3>
                        <p className={styles.text}>
                            Providing stimulating activities that engage memory, attention, and reasoning for intellectual growth.
                        </p>
                    </motion.div>

                    {/* Yellow Card */}
                    <motion.div
                        className={`${styles.card} ${styles.yellow}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -10 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Lightbulb size={48} className={styles.icon} />
                        <h3 className={styles.title}>Increase Creativity</h3>
                        <p className={styles.text}>
                            Unlocking artistic expression and self-discovery through music, art, and storytelling.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
