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
    Bell,
} from 'lucide-react';
import styles from './Sidebar.module.css';

const menuItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/contacts', icon: Mail, label: 'Contacts' },
    { href: '/admin/popups', icon: Bell, label: 'Event Popups' },
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
                <img src="/logo-sunrays.png" alt="Sunrays Logo" width={40} height={40} style={{ objectFit: 'contain' }} />
                <h2>Sunrays CMS</h2>
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

                <button onClick={handleLogout} className={styles.navItem} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </nav>
        </aside>
    );
}
