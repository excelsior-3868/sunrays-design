'use client';

import Link from 'next/link';
import styles from './Header.module.css';
import { ChevronDown, Castle } from 'lucide-react';

export default function Header() {
    return (
        <div style={{ position: 'relative', height: '100px' }}>
            <header className={styles.header}>
                <div className={styles.container}>
                    <Link href="/" className={styles.logo}>
                        <Castle size={32} /> Kidzena
                    </Link>

                    <nav className={styles.nav}>
                        <Link href="/" className={`${styles.link} ${styles.active}`}>Home</Link>
                        <Link href="/about" className={styles.link}>About Us</Link>
                        <Link href="/class" className={`${styles.link} ${styles.hasDropdown}`}>
                            Class <ChevronDown size={16} />
                        </Link>
                        <Link href="/pages" className={`${styles.link} ${styles.hasDropdown}`}>
                            Pages <ChevronDown size={16} />
                        </Link>
                        <Link href="/contact" className={styles.link}>Contact Us</Link>
                    </nav>

                    <Link href="/contact" className={styles.contactBtn}>
                        Contact Us
                    </Link>
                </div>
            </header>
        </div>
    );
}
