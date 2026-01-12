import { Metadata } from 'next';
import styles from './contact.module.css';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Contact Sunrays Pre School in Kathmandu. Visit us at Purnadevi Marg, Dallu or call 01-4282926. We\'re here to answer your questions about admissions and programs.',
    keywords: ['contact sunrays preschool', 'preschool kathmandu contact', 'dallu preschool', 'admission inquiry', 'preschool location'],
    openGraph: {
        title: 'Contact Sunrays Pre School',
        description: 'Get in touch with us at Purnadevi Marg, Dallu, Kathmandu. Call 01-4282926 or email info.sunrayspreschool@gmail.com',
        type: 'website',
    },
};

export default function ContactPage() {
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
                name: 'Contact Us',
                item: 'https://sunrayspreschool.edu.np/contact'
            }
        ]
    };

    return (
        <div className={styles.contactPage}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {/* Hero Section */}
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>Contact Us</h1>
                <div className={styles.waveBottom}>
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={styles.waveSvg}>
                        <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" fill="#ffffff"></path>
                    </svg>
                </div>
            </section>

            <ContactForm />
        </div>
    );
}
