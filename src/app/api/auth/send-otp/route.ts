import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import AdminUser from '@/lib/models/AdminUser';

export const runtime = 'nodejs';
import { generateOTP, storeOTP, checkOTPRateLimit } from '@/lib/otp';
import { sendOTPEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        await dbConnect();

        const normalizedEmail = email.toLowerCase();

        // Allowed Admin Emails
        const ALLOWED_EMAILS = [
            'subin.bajra@gmail.com',
            'info.sunrayspreschool@gmail.com'
        ];

        if (!ALLOWED_EMAILS.includes(normalizedEmail)) {
            return NextResponse.json(
                { error: 'You are Unauthorised' },
                { status: 403 }
            );
        }

        // Check if user exists
        const user = await AdminUser.findOne({ email: normalizedEmail });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Check rate limit
        const canSendOTP = await checkOTPRateLimit(email);

        if (!canSendOTP) {
            return NextResponse.json(
                { error: 'Too many OTP requests. Please try again in 15 minutes.' },
                { status: 429 }
            );
        }

        // Generate and store OTP
        const otp = generateOTP();
        const stored = await storeOTP(normalizedEmail, otp);

        if (!stored) {
            return NextResponse.json(
                { error: 'Failed to generate OTP. Please try again.' },
                { status: 500 }
            );
        }

        // Send OTP email
        const sent = await sendOTPEmail(email, otp);

        if (!sent) {
            return NextResponse.json(
                { error: 'Failed to send OTP email. Please try again.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'OTP sent successfully', email },
            { status: 200 }
        );
    } catch (error) {
        console.error('Send OTP error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
