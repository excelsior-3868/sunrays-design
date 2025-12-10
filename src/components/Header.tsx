'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function Header() {
    const [showPagesDropdown, setShowPagesDropdown] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

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

                {/* Desktop Nav */}
                <nav className={`${styles.nav} ${styles.desktopNav}`}>
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
                        <span
                            className={`${styles.link} ${styles.hasDropdown} ${isParentActive('/pages') ? styles.active : ''}`}
                            style={{ cursor: 'default' }}
                        >
                            Pages <ChevronDown size={16} />
                        </span>
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

                <div className={styles.rightActions}>
                    <Link href="/contact" className={styles.contactBtn}>
                        Contact Us
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={styles.mobileToggle}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
                    <nav className={styles.mobileNav}>
                        <Link href="/" className={`${styles.mobileLink} ${isActive('/') ? styles.active : ''}`}>Home</Link>
                        <Link href="/about" className={`${styles.mobileLink} ${isActive('/about') ? styles.active : ''}`}>About Us</Link>
                        <Link href="/programs" className={`${styles.mobileLink} ${isActive('/programs') ? styles.active : ''}`}>Programs</Link>
                        <Link href="/admissions" className={`${styles.mobileLink} ${isActive('/admissions') ? styles.active : ''}`}>Admissions</Link>

                        <div className={styles.mobileDivider}>Pages</div>
                        <Link href="/pages/gallery" className={styles.mobileLinkSub}>Gallery</Link>
                        <Link href="/pages/events" className={styles.mobileLinkSub}>Events</Link>
                        <Link href="/pages/blog" className={styles.mobileLinkSub}>Blog</Link>
                        <Link href="/pages/faq" className={styles.mobileLinkSub}>FAQ</Link>

                        <Link href="/contact" className={`${styles.mobileLink} ${isActive('/contact') ? styles.active : ''}`}>Contact Us</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
