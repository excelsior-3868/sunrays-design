import styles from './about.module.css';
import Image from 'next/image';
import FacilitiesSection from '@/components/FacilitiesSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn about Sunrays Pre School\'s mission to nurture young minds in Kathmandu. Meet our experienced teachers and discover our student-centered approach.',
    keywords: ['about sunrays preschool', 'preschool kathmandu', 'early childhood education', 'experienced teachers', 'child development'],
    openGraph: {
        title: 'About Sunrays Pre School - Nurturing Young Minds',
        description: 'Discover our mission, experienced teachers, and child-centered approach to early education in Kathmandu.',
        type: 'website',
        images: ['https://sunrayspreschool.edu.np/about-children-group.jpg'],
    },
};

export default function AboutPage() {
    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://sunrayspreschool.edu.np'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'About Us',
                item: 'https://sunrayspreschool.edu.np/about'
            }
        ]
    };

    return (
        <div className={styles.aboutPage}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>About Us</h1>
                </div>
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
                                    src="/about-children-group.jpg"
                                    alt="Sunrays Pre-school students"
                                    width={500}
                                    height={500}
                                    className={styles.mainImage}
                                />
                            </div>
                        </div>
                        <div className={styles.textCol}>
                            <span className={styles.subtitle}>Learn About Us</span>
                            <h2 className={styles.sectionTitle}>
                                Give Children the Space to Learn,<br />Grow and Shine
                            </h2>
                            <p className={styles.description}>
                                Our Sunrays Pre-school provides early childhood education and care for children. We help them develop various ranges of skills that make them ready to learn various activities. We are located at prime residential area of Kathmandu valley. Our Sunrays Pre-school ensures high quality education to children that are both accessible and affordable.
                            </p>
                            <p className={styles.description}>
                                Your children will be safe, secured, loved and above all we are stimulated in an efficient, well maintained homely environment. We help them learn with confidence and develop skills to meet the challenges that lie ahead in the school system and beyond. We passionately believe this is going to be a joint effort between school management and parents. We promote the right environment for that partnership to succeed.
                            </p>
                            <div className={styles.signature}>
                                <p className={styles.signatureText}>Sunrays Team</p>
                                <p className={styles.signatureRole}>Sunrays Pre-school</p>
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
                        Hear from our happy parents about their experience with Sunrays Pre-school and how their children have flourished in our care.
                    </p>

                    <div className={styles.testimonialGrid}>
                        <div className={styles.testimonialCard}>
                            <p className={styles.testimonialText}>
                                "Sunrays has been amazing for my son. The teachers are so caring and dedicated. I've seen such a positive change in his confidence and social skills since he started here."
                            </p>
                            <div className={styles.testimonialAuthor}>
                                <div className={styles.avatar}></div>
                                <div>
                                    <p className={styles.authorName}>Subin Bajracharya</p>
                                    <p className={styles.authorRole}>Engineer</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.testimonialCard}>
                            <p className={styles.testimonialText}>
                                "We love the play-based learning approach! The facilities are excellent, and the environment is safe and welcoming. Truly the best start for my daughter's education."
                            </p>
                            <div className={styles.testimonialAuthor}>
                                <div className={styles.avatar}></div>
                                <div>
                                    <p className={styles.authorName}>Bibek Shrestha</p>
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
                        Meet our dedicated team of educators who are passionate about nurturing young minds and creating a fun, safe, and effective learning environment.
                    </p>

                    <div className={styles.teacherGrid}>
                        <div className={`${styles.teacherCard} ${styles.teacherRed}`}>
                            <div className={styles.teacherImageWrapper}>
                                <div
                                    className={styles.teacherImage}
                                    style={{
                                        backgroundImage: `url('/principal.jpg')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                ></div>
                            </div>
                            <div className={styles.teacherInfo}>
                                <h3 className={styles.teacherName}>Manahera Maharjan</h3>
                                <p className={styles.teacherRole}>Principal</p>
                            </div>
                        </div>

                        <div className={`${styles.teacherCard} ${styles.teacherBlue}`}>
                            <div className={styles.teacherImageWrapper}>
                                <div
                                    className={styles.teacherImage}
                                    style={{
                                        backgroundImage: `url('/teacher-shova.jpg')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                ></div>
                            </div>
                            <div className={styles.teacherInfo}>
                                <h3 className={styles.teacherName}>Shova Maharjan Prajapati</h3>
                                <p className={styles.teacherRole}>Teacher</p>
                            </div>
                        </div>

                        <div className={`${styles.teacherCard} ${styles.teacherYellow}`}>
                            <div className={styles.teacherImageWrapper}>
                                <div
                                    className={styles.teacherImage}
                                    style={{
                                        backgroundImage: `url('/teacher-supriya.jpg')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                ></div>
                            </div>
                            <div className={styles.teacherInfo}>
                                <h3 className={styles.teacherName}>Supriya Prajapati</h3>
                                <p className={styles.teacherRole}>Teacher</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Complete Facilities Section - Reused from Home Page */}
            <FacilitiesSection />
        </div>
    );
}
