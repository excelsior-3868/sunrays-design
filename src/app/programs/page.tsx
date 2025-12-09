'use client';

import styles from './programs.module.css';
import { CheckCircle2 } from 'lucide-react';

export default function ProgramsPage() {
    return (
        <div style={{ backgroundColor: '#fff' }}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>Our Programs</h1>
                <div className={styles.waveBottom}>
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={styles.waveSvg}>
                        <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" fill="#ffffff"></path>
                    </svg>
                </div>
            </section>

            {/* Main Content */}
            <div className={styles.mainContent}>
                <div className="container">
                    <div className={styles.programList}>

                        {/* Play Group */}
                        <div className={`${styles.programBlock} ${styles.themeRed}`}>
                            <div className={styles.programVisual}>
                                PG
                            </div>
                            <div className={styles.programInfo}>
                                <div className={styles.programHeader}>
                                    <span className={styles.ageTag}>2-3 Years</span>
                                    <h2 className={styles.programTitle}>Play Group</h2>
                                </div>
                                <p className={styles.programDesc}>
                                    Our Play Group program is designed to provide a warm and welcoming environment for toddlers.
                                    We focus on helping children develop social skills, emotional independence, and basic coordination
                                    through fun-filled activities.
                                </p>
                                <ul className={styles.featuresList}>
                                    <li className={styles.featureItem}><CheckCircle2 size={20} className={styles.checkIcon} /> Interactive Play</li>
                                    <li className={styles.featureItem}><CheckCircle2 size={20} className={styles.checkIcon} /> Social Interaction</li>
                                    <li className={styles.featureItem}><CheckCircle2 size={20} className={styles.checkIcon} /> Music & Movement</li>
                                    <li className={styles.featureItem}><CheckCircle2 size={20} className={styles.checkIcon} /> Basic Motor Skills</li>
                                </ul>
                            </div>
                        </div>

                        {/* Nursery */}
                        <div className={`${styles.programBlock} ${styles.themePurple}`}>
                            <div className={styles.programVisual}>
                                N
                            </div>
                            <div className={styles.programInfo}>
                                <div className={styles.programHeader}>
                                    <span className={styles.ageTag}>3-4 Years</span>
                                    <h2 className={styles.programTitle}>Nursery</h2>
                                </div>
                                <p className={styles.programDesc}>
                                    The Nursery curriculum introduces structured learning in a playful manner.
                                    Children start exploring language, pre-math concepts, and creative expression while refining
                                    their fine motor skills.
                                </p>
                                <ul className={styles.featuresList}>
                                    <li className={styles.featureItem}><CheckCircle2 size={20} className={styles.checkIcon} /> Language Basics</li>
                                    <li className={styles.featureItem}><CheckCircle2 size={20} className={styles.checkIcon} /> Number Recognition</li>
                                    <li className={styles.featureItem}><CheckCircle2 size={20} className={styles.checkIcon} /> Art & Craft</li>
                                    <li className={styles.featureItem}><CheckCircle2 size={20} className={styles.checkIcon} /> Storytelling</li>
                                </ul>
                            </div>
                        </div>

                        {/* LKG */}
                        <div className={`${styles.programBlock} ${styles.themeBlue}`}>
                            <div className={styles.programVisual}>
                                LKG
                            </div>
                            <div className={styles.programInfo}>
                                <div className={styles.programHeader}>
                                    <span className={styles.ageTag}>4-5 Years</span>
                                    <h2 className={styles.programTitle}>Lower KG</h2>
                                </div>
                                <p className={styles.programDesc}>
                                    In LKG, children dive deeper into foundational subjects. We encourage curiosity through
                                    nature exploration, introductory science, and logical reasoning games, preparing them for more complex tasks.
                                </p>
                                <ul className={styles.featuresList}>
                                    <li className={styles.featureItem}><CheckCircle2 size={20} className={styles.checkIcon} /> Writing Skills</li>
                                    <li className={styles.featureItem}><CheckCircle2 size={20} className={styles.checkIcon} /> Environment Logic</li>
                                    <li className={styles.featureItem}><CheckCircle2 size={20} className={styles.checkIcon} /> Simple Math</li>
                                    <li className={styles.featureItem}><CheckCircle2 size={20} className={styles.checkIcon} /> Group Projects</li>
                                </ul>
                            </div>
                        </div>

                        {/* UKG */}
                        <div className={`${styles.programBlock} ${styles.themeGreen}`}>
                            <div className={styles.programVisual}>
                                UKG
                            </div>
                            <div className={styles.programInfo}>
                                <div className={styles.programHeader}>
                                    <span className={styles.ageTag}>5-6 Years</span>
                                    <h2 className={styles.programTitle}>Upper KG</h2>
                                </div>
                                <p className={styles.programDesc}>
                                    Our UKG program focuses on school readiness. Children refine their reading, writing, and mathematical
                                    abilities, along with leadership skills, ensuring a smooth transition to primary education.
                                </p>
                                <ul className={styles.featuresList}>
                                    <li className={styles.featureItem}><CheckCircle2 size={20} className={styles.checkIcon} /> Advanced Reading</li>
                                    <li className={styles.featureItem}><CheckCircle2 size={20} className={styles.checkIcon} /> Basic Addition/Subtraction</li>
                                    <li className={styles.featureItem}><CheckCircle2 size={20} className={styles.checkIcon} /> Public Speaking</li>
                                    <li className={styles.featureItem}><CheckCircle2 size={20} className={styles.checkIcon} /> Independent Learning</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
