import { NextRequest, NextResponse } from 'next/server';
import { verifyOTP } from '@/lib/otp';
import { signIn } from '@/auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        const { email, otp } = await request.json();
        const normalizedEmail = email?.toLowerCase();

        if (!normalizedEmail || !otp) {
            return NextResponse.json(
                { error: 'Email and OTP are required' },
                { status: 400 }
            );
        }

        // Verify OTP
        const isValid = await verifyOTP(normalizedEmail, otp);

        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid or expired OTP' },
                { status: 401 }
            );
        }

        // OTP is valid, sign in the user
        try {
            await signIn('credentials', {
                email: normalizedEmail,
                redirect: false,
            });

            return NextResponse.json(
                { message: 'Login successful' },
                { status: 200 }
            );
        } catch (signInError) {
            console.error('Sign in error:', signInError);
            return NextResponse.json(
                { error: 'Failed to create session' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Verify OTP error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
