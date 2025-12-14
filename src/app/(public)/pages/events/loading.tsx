import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
            gap: '20px'
        }}>
            <Loader2 className="animate-spin" size={48} color="#FF7A00" />
            <p style={{ color: '#666', fontSize: '1.2rem', fontFamily: 'var(--font-outfit)' }}>
                Loading upcoming events...
            </p>
        </div>
    );
}
