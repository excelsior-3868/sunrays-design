'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const [showPagesDropdown, setShowPagesDropdown] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;
    const isParentActive = (path: string) => pathname.startsWith(path);

    return (
        <header id="myHeader" className={styles.header}>
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
                    <Link
                        href="/"
                        className={`${styles.link} ${isActive('/') ? styles.active : ''}`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className={`${styles.link} ${isActive('/about') ? styles.active : ''}`}
                    >
                        About Us
                    </Link>

                    <Link
                        href="/programs"
                        className={`${styles.link} ${isActive('/programs') ? styles.active : ''}`}
                    >
                        Programs
                    </Link>

                    <Link
                        href="/admissions"
                        className={`${styles.link} ${isActive('/admissions') ? styles.active : ''}`}
                    >
                        Admissions
                    </Link>

                    {/* Pages Dropdown */}
                    <div
                        className={styles.dropdown}
                        onMouseEnter={() => setShowPagesDropdown(true)}
                        onMouseLeave={() => setShowPagesDropdown(false)}
                    >
                        <Link
                            href="/pages"
                            className={`${styles.link} ${styles.hasDropdown} ${isParentActive('/pages') ? styles.active : ''}`}
                        >
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

                    <Link
                        href="/contact"
                        className={`${styles.link} ${isActive('/contact') ? styles.active : ''}`}
                    >
                        Contact Us
                    </Link>
                </nav>

                <Link href="/contact" className={styles.contactBtn}>
                    Contact Us
                </Link>
            </div>
        </header>
    );
}
