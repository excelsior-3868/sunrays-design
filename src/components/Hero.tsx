'use client';

import styles from './Hero.module.css';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const heroImages = [
    '/hero-1.jpg',
    '/hero-2.jpg',
    '/hero-3.jpg'
];

export default function Hero() {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className={styles.hero}>
            {/* Background Slideshow */}
            <div className={styles.slideshow}>
                {heroImages.map((src, index) => (
                    <div
                        key={index}
                        className={`${styles.slide} ${index === currentImage ? styles.activeSlide : ''}`}
                        style={{ backgroundImage: `url(${src})` }}
                    ></div>
                ))}
            </div>

            <div className={styles.overlay}></div>

            {/* 3D Floating Blocks */}
            <div className={styles.floatingElements}>
                {/* Block A (Red) */}
                <div className={`${styles.blockBox} ${styles.blockA}`}>
                    <div className={styles.cube}>
                        <div className={`${styles.face} ${styles.faceFront}`} style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-devanagari)', fontWeight: 'bold' }}>क</div>
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
                        <div className={`${styles.face} ${styles.faceFront}`} style={{ color: 'var(--color-blue)' }}>A</div>
                        <div className={styles.face} style={{ transform: 'rotateY(180deg) translateZ(40px)' }}></div>
                        <div className={styles.face} style={{ transform: 'rotateY(90deg) translateZ(40px)', background: '#eef6ff' }}></div>
                        <div className={styles.face} style={{ transform: 'rotateY(-90deg) translateZ(40px)', background: '#eef6ff' }}></div>
                        <div className={styles.face} style={{ transform: 'rotateX(90deg) translateZ(40px)', background: '#fff' }}></div>
                        <div className={styles.face} style={{ transform: 'rotateX(-90deg) translateZ(40px)' }}></div>
                    </div>
                </div>
            </div>

            <div className={styles.contentContainer}>
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }} // Changed animation to simple fade up
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    We identify your child's love language.
                </motion.h1>

                <div className={styles.mobileCta}>
                    <a href="/contact" className={styles.ctaButton}>
                        Get Started
                    </a>
                </div>
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
