'use client';

import styles from './contact.module.css';
import { Building2, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useState } from 'react';

export default function ContactForm() {
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
        <>
            {/* Get In Touch Section */}
            <section className={styles.contactSection}>
                <div className="container">
                    <div className={styles.contactGrid}>
                        {/* Left Side - Contact Info */}
                        <div className={styles.contactInfo}>
                            <h2 className={styles.sectionTitle}>Get In Touch</h2>
                            <p className={styles.description}>
                                Have questions or want to learn more about our programs? We'd love to hear from you. Reach out to us using the contact details below or send us a message directly.
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
                                        01-5382926
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
                                    <a href="https://www.facebook.com/share/1Cu5owpEjK/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Visit our Facebook page">
                                        <Facebook size={20} />
                                    </a>
                                    <a href="#" className={styles.socialIcon} aria-label="Visit our Instagram page">
                                        <Instagram size={20} />
                                    </a>
                                    <a href="#" className={styles.socialIcon} aria-label="Visit our Twitter page">
                                        <Twitter size={20} />
                                    </a>
                                    <a href="#" className={styles.socialIcon} aria-label="Visit our YouTube channel">
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
                                        aria-label="Your Name"
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
                                        aria-label="Your Email"
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
                                        aria-label="Phone Number"
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
                                        aria-label="Your Message"
                                    ></textarea>
                                </div>

                                {submitStatus && (
                                    <div className={`${styles.statusMessage} ${submitStatus.type === 'success' ? styles.success : styles.error}`} role="alert">
                                        {submitStatus.message}
                                    </div>
                                )}

                                <button type="submit" className={styles.submitButton} disabled={loading}>
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className={styles.mapSection}>
                        <div className={styles.mapContainer}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.213931486824!2d85.29338779999999!3d27.7106803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb185dd9ba0c59%3A0x724f43e95354e155!2sSun%20Rays%20Pre-School!5e0!3m2!1sen!2snp!4v1765472810985!5m2!1sen!2snp"
                                className={styles.mapFrame}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Sunrays Pre School Location Map"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
