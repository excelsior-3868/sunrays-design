'use client';

import styles from './EnrollmentSection.module.css';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

export default function EnrollmentSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

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

            console.log('Form submitted successfully:', data);
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });

            // Reset success message after 3 seconds
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error'); // You might want to handle error state display in UI
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <section id="enrollment" className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.subtitle}>GET IN TOUCH</span>
                    <h2 className={styles.title}>Ready To Enroll Your Child?</h2>
                    <p className={styles.description}>
                        Contact us today to schedule a tour or learn more about our programs.
                    </p>
                </div>

                <div className={styles.content}>
                    {/* Contact Information */}
                    <div className={styles.contactInfo}>
                        <h3 className={styles.contactTitle}>Contact Information</h3>

                        <div className={styles.contactItem}>
                            <div className={`${styles.iconCircle} ${styles.iconPurple}`}>
                                <MapPin size={24} color="white" />
                            </div>
                            <div>
                                <h4 className={styles.contactLabel}>Visit Us</h4>
                                <p className={styles.contactText}>Purnadevi Marg, Dallu</p>
                                <p className={styles.contactText}>Kathmandu-15</p>
                            </div>
                        </div>

                        <div className={styles.contactItem}>
                            <div className={`${styles.iconCircle} ${styles.iconTeal}`}>
                                <Phone size={24} color="white" />
                            </div>
                            <div>
                                <h4 className={styles.contactLabel}>Call Us</h4>
                                <p className={styles.contactText}>01-5382926</p>
                                <p className={styles.contactTextSmall}>Sun-Fri: 9:00 AM - 2:45 PM</p>
                            </div>
                        </div>

                        <div className={styles.contactItem}>
                            <div className={`${styles.iconCircle} ${styles.iconCoral}`}>
                                <Mail size={24} color="white" />
                            </div>
                            <div>
                                <h4 className={styles.contactLabel}>Email Us</h4>
                                <p className={styles.contactText}>info.sunrayspreschool@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className={styles.formWrapper}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    className={styles.input}
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={status === 'submitting'}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className={styles.input}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={status === 'submitting'}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    className={styles.input}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    disabled={status === 'submitting'}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <textarea
                                    name="message"
                                    placeholder="Message"
                                    className={styles.textarea}
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    required
                                    disabled={status === 'submitting'}
                                />
                            </div>

                            <button
                                type="submit"
                                className={`${styles.submitBtn} ${status === 'success' ? 'bg-green-500' : ''} ${status === 'error' ? 'bg-red-500' : ''}`}
                                disabled={status === 'submitting'}
                            >
                                {status === 'submitting' ? 'Sending...' :
                                    status === 'success' ? 'Message Sent!' :
                                        status === 'error' ? 'Failed! Try Again' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
