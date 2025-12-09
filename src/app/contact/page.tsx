'use client';

import styles from './contact.module.css';
import { Building2, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSubmitStatus(null);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to submit form');
            }

            setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (err: any) {
            setSubmitStatus({ type: 'error', message: err.message || 'Failed to send message. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className={styles.contactPage}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>Contact Us</h1>
                <div className={styles.waveBottom}>
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={styles.waveSvg}>
                        <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" fill="#ffffff"></path>
                    </svg>
                </div>
            </section>

            {/* Get In Touch Section */}
            <section className={styles.contactSection}>
                <div className="container">
                    <div className={styles.contactGrid}>
                        {/* Left Side - Contact Info */}
                        <div className={styles.contactInfo}>
                            <h2 className={styles.sectionTitle}>Get In Touch</h2>
                            <p className={styles.description}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.
                            </p>

                            {/* Single Location Card */}
                            <div className={styles.locationCard}>
                                <div className={styles.locationIcon}>
                                    <Building2 size={32} />
                                </div>
                                <h3 className={styles.locationTitle}>Sunrays Pre School</h3>
                                <div className={styles.locationDetails}>
                                    <p className={styles.locationItem}>
                                        <span className={styles.locationLabel}>📍</span>
                                        Purnadevi Marg, Dallu, Kathmandu-15
                                    </p>
                                    <p className={styles.locationItem}>
                                        <Phone size={16} className={styles.icon} />
                                        01-4282926
                                    </p>
                                    <p className={styles.locationItem}>
                                        <Mail size={16} className={styles.icon} />
                                        info.sunrayspreschool@gmail.com
                                    </p>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className={styles.socialSection}>
                                <h3 className={styles.socialTitle}>Follow Us</h3>
                                <div className={styles.socialIcons}>
                                    <a href="https://www.facebook.com/share/1Cu5owpEjK/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                        <Facebook size={20} />
                                    </a>
                                    <a href="#" className={styles.socialIcon}>
                                        <Instagram size={20} />
                                    </a>
                                    <a href="#" className={styles.socialIcon}>
                                        <Twitter size={20} />
                                    </a>
                                    <a href="#" className={styles.socialIcon}>
                                        <Youtube size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className={styles.formWrapper}>
                            <form onSubmit={handleSubmit} className={styles.contactForm}>
                                <div className={styles.formGroup}>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={styles.formInput}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={styles.formInput}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={styles.formInput}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <textarea
                                        name="message"
                                        placeholder="Your Message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={styles.formTextarea}
                                        rows={6}
                                        required
                                    ></textarea>
                                </div>

                                {submitStatus && (
                                    <div className={`${styles.statusMessage} ${submitStatus.type === 'success' ? styles.success : styles.error}`}>
                                        {submitStatus.message}
                                    </div>
                                )}

                                <button type="submit" className={styles.submitButton} disabled={loading}>
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
