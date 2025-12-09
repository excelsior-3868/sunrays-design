import { ReactNode } from 'react';

export default async function AdminLayout({
    children,
}: {
    children: ReactNode;
}) {
    // No auth check here - login page needs to render
    return <>{children}</>;
}
