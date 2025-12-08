'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const [showClassDropdown, setShowClassDropdown] = useState(false);
    const [showPagesDropdown, setShowPagesDropdown] = useState(false);

    return (
        <div style={{ position: 'relative', height: '100px' }}>
            <header className={styles.header}>
                <div className={styles.container}>
                    <Link href="/" className={styles.logo}>
                        <Image
                            src="/sunrays-logo.png"
                            alt="Sunrays Pre School Logo"
                            width={50}
                            height={50}
                            className={styles.logoImage}
                            unoptimized
                            priority
                        />
                        <span>Sunrays Pre School</span>
                    </Link>

                    <nav className={styles.nav}>
                        <Link href="/" className={`${styles.link} ${styles.active}`}>Home</Link>
                        <Link href="/about" className={styles.link}>About Us</Link>

                        {/* Class Dropdown */}
                        <div
                            className={styles.dropdown}
                            onMouseEnter={() => setShowClassDropdown(true)}
                            onMouseLeave={() => setShowClassDropdown(false)}
                        >
                            <Link href="/class" className={`${styles.link} ${styles.hasDropdown}`}>
                                Class <ChevronDown size={16} />
                            </Link>
                            {showClassDropdown && (
                                <div className={styles.dropdownMenu}>
                                    <Link href="/class/pg" className={styles.dropdownItem}>PG</Link>
                                    <Link href="/class/nursery" className={styles.dropdownItem}>Nursery</Link>
                                    <Link href="/class/lkg" className={styles.dropdownItem}>LKG</Link>
                                    <Link href="/class/ukg" className={styles.dropdownItem}>UKG</Link>
                                </div>
                            )}
                        </div>

                        {/* Pages Dropdown */}
                        <div
                            className={styles.dropdown}
                            onMouseEnter={() => setShowPagesDropdown(true)}
                            onMouseLeave={() => setShowPagesDropdown(false)}
                        >
                            <Link href="/pages" className={`${styles.link} ${styles.hasDropdown}`}>
                                Pages <ChevronDown size={16} />
                            </Link>
                            {showPagesDropdown && (
                                <div className={styles.dropdownMenu}>
                                    <Link href="/pages/gallery" className={styles.dropdownItem}>Gallery</Link>
                                    <Link href="/pages/events" className={styles.dropdownItem}>Events</Link>
                                    <Link href="/pages/blog" className={styles.dropdownItem}>Blog</Link>
                                    <Link href="/pages/faq" className={styles.dropdownItem}>FAQ</Link>
                                </div>
                            )}
                        </div>

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
