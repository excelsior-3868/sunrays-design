'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
    LayoutDashboard,
    Mail,
    Image,
    Calendar,
    FileText,
    HelpCircle,
    FileEdit,
    Info,
    LogOut,
} from 'lucide-react';
import styles from './Sidebar.module.css';

const menuItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/contacts', icon: Mail, label: 'Contacts' },
    { href: '/admin/gallery', icon: Image, label: 'Gallery' },
    { href: '/admin/events', icon: Calendar, label: 'Events' },
    { href: '/admin/blog', icon: FileText, label: 'Blog' },
    { href: '/admin/faq', icon: HelpCircle, label: 'FAQ' },
    { href: '/admin/pages', icon: FileEdit, label: 'Pages' },
    { href: '/admin/about', icon: Info, label: 'About Us' },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/admin/login' });
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <h2>🎓 Sunrays CMS</h2>
            </div>

            <nav className={styles.nav}>
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <button onClick={handleLogout} className={styles.logoutButton}>
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </aside>
    );
}
