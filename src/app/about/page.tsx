'use client';

import styles from './about.module.css';
import { Gamepad2, Rocket, BookOpen } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className={styles.aboutPage}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>About Us</h1>
                <div className={styles.waveBottom}>
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={styles.waveSvg}>
                        <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" fill="#ffffff"></path>
                    </svg>
                </div>
            </section>

            {/* Main Content Section */}
            <section className={styles.mainContent}>
                <div className="container">
                    <div className={styles.contentGrid}>
                        <div className={styles.imageCol}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src="/about-kids.jpg"
                                    alt="Children playing with blocks"
                                    width={500}
                                    height={500}
                                    className={styles.mainImage}
                                />
                            </div>
                        </div>
                        <div className={styles.textCol}>
                            <span className={styles.subtitle}>Learn About Us</span>
                            <h2 className={styles.sectionTitle}>
                                Give the Children Space<br />to Grow a Creativity
                            </h2>
                            <p className={styles.description}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
                            </p>
                            <div className={styles.signature}>
                                <p className={styles.signatureText}>Margaret T.</p>
                                <p className={styles.signatureRole}>Margaret T. - Headmaster</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Parent Testimonial Section */}
            <section className={styles.testimonialSection}>
                <div className="container">
                    <span className={styles.sectionSubtitle}>Our Families</span>
                    <h2 className={styles.sectionHeading}>Parent Testimonial</h2>
                    <p className={styles.sectionDesc}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.
                    </p>

                    <div className={styles.testimonialGrid}>
                        <div className={styles.testimonialCard}>
                            <p className={styles.testimonialText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.
                            </p>
                            <div className={styles.testimonialAuthor}>
                                <div className={styles.avatar}></div>
                                <div>
                                    <p className={styles.authorName}>Tyler Curtis</p>
                                    <p className={styles.authorRole}>Entrepreneur</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.testimonialCard}>
                            <p className={styles.testimonialText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.
                            </p>
                            <div className={styles.testimonialAuthor}>
                                <div className={styles.avatar}></div>
                                <div>
                                    <p className={styles.authorName}>Alexis Dunn</p>
                                    <p className={styles.authorRole}>Designer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experienced Teacher Section */}
            <section className={styles.teacherSection}>
                <div className="container">
                    <span className={styles.sectionSubtitle}>Our Teachers</span>
                    <h2 className={styles.sectionHeading}>Experienced Teacher</h2>
                    <p className={styles.sectionDesc}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.
                    </p>

                    <div className={styles.teacherGrid}>
                        <div className={`${styles.teacherCard} ${styles.teacherRed}`}>
                            <div className={styles.teacherImageWrapper}>
                                <div className={styles.teacherImage}></div>
                            </div>
                            <div className={styles.teacherInfo}>
                                <h3 className={styles.teacherName}>Edward Price</h3>
                                <p className={styles.teacherRole}>Teacher</p>
                            </div>
                        </div>

                        <div className={`${styles.teacherCard} ${styles.teacherBlue}`}>
                            <div className={styles.teacherImageWrapper}>
                                <div className={styles.teacherImage}></div>
                            </div>
                            <div className={styles.teacherInfo}>
                                <h3 className={styles.teacherName}>Edgar Warren</h3>
                                <p className={styles.teacherRole}>Teacher</p>
                            </div>
                        </div>

                        <div className={`${styles.teacherCard} ${styles.teacherYellow}`}>
                            <div className={styles.teacherImageWrapper}>
                                <div className={styles.teacherImage}></div>
                            </div>
                            <div className={styles.teacherInfo}>
                                <h3 className={styles.teacherName}>Elise Wolf</h3>
                                <p className={styles.teacherRole}>Teacher</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Complete Facilities Section */}
            <section className={styles.facilitiesSection}>
                <div className="container">
                    <div className={styles.facilitiesGrid}>
                        <div className={styles.facilitiesContent}>
                            <span className={styles.sectionSubtitle}>Why Choose Us?</span>
                            <h2 className={styles.sectionTitle}>Complete Facilities</h2>
                            <p className={styles.facilitiesDesc}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo ligula eget dolor. Aenean massa.
                            </p>

                            <div className={styles.facilitiesList}>
                                <div className={styles.facilityItem}>
                                    <div className={styles.facilityIcon}>
                                        <Gamepad2 size={32} />
                                    </div>
                                    <div>
                                        <h3 className={styles.facilityTitle}>Playing Area</h3>
                                        <p className={styles.facilityText}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.facilityItem}>
                                    <div className={styles.facilityIcon}>
                                        <Rocket size={32} />
                                    </div>
                                    <div>
                                        <h3 className={styles.facilityTitle}>Outbound Area</h3>
                                        <p className={styles.facilityText}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.facilityItem}>
                                    <div className={styles.facilityIcon}>
                                        <BookOpen size={32} />
                                    </div>
                                    <div>
                                        <h3 className={styles.facilityTitle}>Reading Area</h3>
                                        <p className={styles.facilityText}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.facilitiesImage}>
                            <div className={styles.facilitiesImageWrapper}>
                                <Image
                                    src="/facilities-kid.jpg"
                                    alt="Child playing"
                                    width={500}
                                    height={600}
                                    className={styles.facilityImg}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
