import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ContactEntry from '@/lib/models/ContactEntry';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        const { name, email, phone, message } = await request.json();

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        await dbConnect();

        // Create contact entry
        const contactEntry = await ContactEntry.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone?.trim() || undefined,
            message: message.trim(),
            isRead: false,
        });

        return NextResponse.json(
            {
                message: 'Contact form submitted successfully',
                id: contactEntry._id
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Contact form submission error:', error);
        return NextResponse.json(
            { error: 'Failed to submit contact form. Please try again.' },
            { status: 500 }
        );
    }
}
