'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function LogoutButton({ className }: { className?: string }) {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className={className}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: '#fee2e2',
                color: '#ef4444',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'background 0.2s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = '#fecaca')}
            onMouseOut={(e) => (e.currentTarget.style.background = '#fee2e2')}
        >
            <LogOut size={16} />
            Logout
        </button>
    );
}
