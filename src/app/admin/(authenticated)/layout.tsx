import { ReactNode } from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/Sidebar';
import styles from '../admin.module.css';

export default async function AuthenticatedLayout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect('/admin/login');
    }

    return (
        <div className={styles.adminLayout}>
            <AdminSidebar />
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
