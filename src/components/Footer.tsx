'use client';
import styles from './Footer.module.css';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.waveTop}>
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={styles.shapeFill}></path>
                </svg>
            </div>

            <div className={`container ${styles.container}`}>
                <div className={styles.column}>
                    <Link href="/" className={styles.logo}>
                        Sunrays<span> Preschool</span>
                    </Link>
                    <p className={styles.description}>
                        Sunrays Pre School offers a comprehensive curriculum, qualified teachers, and a safe learning environment for your child's holistic growth.
                    </p>
                    <div className={styles.socials}>
                        <a href="https://www.facebook.com/share/1Cu5owpEjK/" target="_blank" className={styles.socialIcon} aria-label="Facebook">
                            <Facebook size={20} />
                        </a>
                        <a href="#" className={styles.socialIcon} aria-label="Instagram">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className={styles.socialIcon} aria-label="Twitter">
                            <Twitter size={20} />
                        </a>
                        <a href="#" className={styles.socialIcon} aria-label="Youtube">
                            <Youtube size={20} />
                        </a>
                    </div>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Quick Links</h4>
                    <ul className={styles.links}>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/programs">Our Programs</Link></li>
                        <li><Link href="/admissions">Admissions</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Contact Us</h4>
                    <div className={styles.contacts}>
                        <div className={styles.contactItem}>
                            <MapPin size={20} className={styles.contactIcon} />
                            <p>Purnadevi Marg, Dallu, Kathmandu-15</p>
                        </div>
                        <div className={styles.contactItem}>
                            <Phone size={20} className={styles.contactIcon} />
                            <p>01-5382926</p>
                        </div>
                        <div className={styles.contactItem}>
                            <Mail size={20} className={styles.contactIcon} />
                            <p>info.sunrayspreschool@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`container ${styles.bottom}`}>
                <p>&copy; {new Date().getFullYear()} Sunrays Pre School. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
