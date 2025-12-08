'use client';
import styles from './Footer.module.css';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

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
                        Kidz<span>ena</span>
                    </Link>
                    <p className={styles.description}>
                        Kidzena offers a comprehensive curriculum, qualified teachers, and a safe learning environment.
                    </p>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Quick Links</h4>
                    <ul className={styles.links}>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/classes">Our Classes</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Contact Us</h4>
                    <div className={styles.contacts}>
                        <p><MapPin size={20} color="var(--color-primary)" /> 123 Education Lane, Kid City</p>
                        <p><Phone size={20} color="var(--color-secondary)" /> +1 234 567 890</p>
                        <p><Mail size={20} color="var(--color-accent)" /> hello@kidzena.com</p>
                    </div>
                </div>
            </div>

            <div className={`container ${styles.bottom}`}>
                <p>&copy; {new Date().getFullYear()} Kidzena. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
