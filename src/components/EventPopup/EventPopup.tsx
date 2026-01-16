'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './EventPopup.module.css';

interface Popup {
    _id: string;
    title: string;
    description?: string;
    imageUrl: string;
    linkUrl?: string;
    priority: number;
}

export default function EventPopup() {
    const [popup, setPopup] = useState<Popup | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const fetchPopup = async () => {
            try {
                const response = await fetch('/api/admin/popups?public=true');
                if (response.ok) {
                    const data = await response.json();
                    if (data.popups && data.popups.length > 0) {
                        // Get the highest priority popup
                        const topPopup = data.popups[0];
                        setPopup(topPopup);
                        setTimeout(() => setIsVisible(true), 500); // Small delay for better UX
                    }
                }
            } catch (error) {
                console.error('Error fetching popup:', error);
            }
        };

        fetchPopup();
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            setPopup(null);
        }, 300); // Match the CSS transition duration
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    if (!popup || !isVisible) return null;

    return (
        <div
            className={`${styles.backdrop} ${isClosing ? styles.closing : ''}`}
            onClick={handleBackdropClick}
        >
            <div className={`${styles.popupContainer} ${isClosing ? styles.closing : ''}`}>
                <button
                    className={styles.closeButton}
                    onClick={handleClose}
                    aria-label="Close popup"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className={styles.imageWrapper}>
                    <Image
                        src={popup.imageUrl}
                        alt={popup.title}
                        fill
                        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 800px"
                        className={styles.image}
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
