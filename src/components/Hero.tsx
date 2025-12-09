'use client';

import styles from './Hero.module.css';
import Link from 'next/link';

import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>

            {/* 3D Floating Blocks */}
            <div className={styles.floatingElements}>
                {/* Block A (Red) */}
                <div className={`${styles.blockBox} ${styles.blockA}`}>
                    <div className={styles.cube}>
                        <div className={`${styles.face} ${styles.faceFront}`} style={{ color: 'var(--color-primary)' }}>A</div>
                        <div className={styles.face} style={{ transform: 'rotateY(180deg) translateZ(40px)' }}></div>
                        <div className={styles.face} style={{ transform: 'rotateY(90deg) translateZ(40px)', background: '#ffeeee' }}></div>
                        <div className={styles.face} style={{ transform: 'rotateY(-90deg) translateZ(40px)', background: '#ffeeee' }}></div>
                        <div className={styles.face} style={{ transform: 'rotateX(90deg) translateZ(40px)', background: '#fff' }}></div>
                        <div className={styles.face} style={{ transform: 'rotateX(-90deg) translateZ(40px)' }}></div>
                    </div>
                </div>

                {/* Block X (Blue) */}
                <div className={`${styles.blockBox} ${styles.blockX}`}>
                    <div className={styles.cube}>
                        <div className={`${styles.face} ${styles.faceFront}`} style={{ color: 'var(--color-blue)' }}>X</div>
                        <div className={styles.face} style={{ transform: 'rotateY(180deg) translateZ(40px)' }}></div>
                        <div className={styles.face} style={{ transform: 'rotateY(90deg) translateZ(40px)', background: '#eef6ff' }}></div>
                        <div className={styles.face} style={{ transform: 'rotateY(-90deg) translateZ(40px)', background: '#eef6ff' }}></div>
                        <div className={styles.face} style={{ transform: 'rotateX(90deg) translateZ(40px)', background: '#fff' }}></div>
                        <div className={styles.face} style={{ transform: 'rotateX(-90deg) translateZ(40px)' }}></div>
                    </div>
                </div>
            </div>

            <div className={styles.contentContainer}>
                <motion.div
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Welcome to Sunrays Pre School
                </motion.div>
                <motion.h1
                    className={styles.title}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                >
                    Kids Playground<br />and Education.
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                >
                    <a href="#enrollment" className={styles.ctaButton}>
                        Get Started
                    </a>
                </motion.div>
            </div>

            {/* White Wave SVG at bottom */}
            <div className={styles.waveBottom}>
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={styles.waveSvg}>
                    <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" fill="#ffffff"></path>
                </svg>
            </div>

        </section>
    );
}
