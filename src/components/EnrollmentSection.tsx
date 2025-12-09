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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
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
                                <p className={styles.contactText}>01-4282926</p>
                                <p className={styles.contactTextSmall}>Sun-Fri: 9:00 AM - 4:00 PM</p>
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
                                <label className={styles.label}>Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    className={styles.input}
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    className={styles.input}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="+1 (555) 123-4567"
                                    className={styles.input}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Message</label>
                                <textarea
                                    name="message"
                                    placeholder="Tell us about your child and any questions you have..."
                                    className={styles.textarea}
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    required
                                />
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
