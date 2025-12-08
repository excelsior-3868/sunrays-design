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
                        viewport={{ once: true }}
                    >
                        <Send size={48} className={styles.icon} />
                        <h3 className={styles.title}>Building Imagination</h3>
                        <p className={styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
                        </p>
                        <Link href="#" className={styles.link}>Learn More <ArrowRight size={18} /></Link>
                    </motion.div>

                    {/* Red Card */}
                    <motion.div
                        className={`${styles.card} ${styles.red}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <Brain size={48} className={styles.icon} />
                        <h3 className={styles.title}>Growing Cognitive</h3>
                        <p className={styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
                        </p>
                        <Link href="#" className={styles.link}>Learn More <ArrowRight size={18} /></Link>
                    </motion.div>

                    {/* Yellow Card */}
                    <motion.div
                        className={`${styles.card} ${styles.yellow}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Lightbulb size={48} className={styles.icon} />
                        <h3 className={styles.title}>Increase Creativity</h3>
                        <p className={styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
                        </p>
                        <Link href="#" className={styles.link}>Learn More <ArrowRight size={18} /></Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
