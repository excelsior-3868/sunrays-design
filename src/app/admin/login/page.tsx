'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function AdminLoginPage() {
    const router = useRouter();
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [countdown, setCountdown] = useState(300); // 5 minutes in seconds
    const [canResend, setCanResend] = useState(false);

    // Check if user is already authenticated and redirect to dashboard
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/session');
                const session = await res.json();

                if (session && session.user) {
                    router.push('/admin');
                    router.refresh();
                }
            } catch (error) {
                // User not authenticated, stay on login page
                console.log('Not authenticated');
            }
        };

        checkAuth();
    }, [router]);

    useEffect(() => {
        if (step === 'otp' && countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        setCanResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [step, countdown]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const res = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to send OTP');
            }

            setSuccess('OTP sent to your email!');
            setStep('otp');
            setCountdown(300);
            setCanResend(false);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Invalid OTP');
            }

            // Redirect to admin dashboard
            router.push('/admin');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setOtp('');
        setCountdown(300);
        setCanResend(false);
        await handleSendOTP(new Event('submit') as any);
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginCard}>
                <div className={styles.header}>
                    <h1 className={styles.title}>🎓 Sunrays CMS</h1>
                    <p className={styles.subtitle}>Admin Portal</p>
                </div>

                {step === 'email' ? (
                    <form onSubmit={handleSendOTP} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}
                                placeholder="admin@sunrays.edu.np"
                                required
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <div className={styles.error}>
                                ⚠️ {error}
                            </div>
                        )}

                        {success && (
                            <div className={styles.success}>
                                ✓ {success}
                            </div>
                        )}

                        <button
                            type="submit"
                            className={styles.button}
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOTP} className={styles.form}>
                        <div className={styles.otpInfo}>
                            <p>OTP sent to <strong>{email}</strong></p>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="otp" className={styles.label}>
                                Enter OTP Code
                            </label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                className={styles.otpInput}
                                placeholder="000000"
                                maxLength={6}
                                required
                                disabled={loading}
                                autoFocus
                            />
                        </div>

                        <div className={styles.countdown}>
                            {countdown > 0 ? (
                                <p>Code expires in <strong>{formatTime(countdown)}</strong></p>
                            ) : (
                                <p className={styles.expired}>Code expired</p>
                            )}
                        </div>

                        {error && (
                            <div className={styles.error}>
                                ⚠️ {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className={styles.button}
                            disabled={loading || otp.length !== 6}
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                        >
                            {loading ? (
                                <>
                                    <span className={styles.loader}></span>
                                    Verifying...
                                </>
                            ) : (
                                'Verify & Login'
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={handleResendOTP}
                            className={styles.resendButton}
                            disabled={!canResend || loading}
                        >
                            {canResend ? 'Resend OTP' : 'Resend available after expiry'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
