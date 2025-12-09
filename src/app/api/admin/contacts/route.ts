import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ContactEntry from '@/lib/models/ContactEntry';
import { auth } from '@/auth';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
    try {
        // Check authentication
        const session = await auth();
        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const isRead = searchParams.get('isRead');
        const search = searchParams.get('search');

        let query: any = {};

        // Filter by read status
        if (isRead !== null && isRead !== undefined && isRead !== '') {
            query.isRead = isRead === 'true';
        }

        // Search across name, email, and message
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { message: { $regex: search, $options: 'i' } },
            ];
        }

        const skip = (page - 1) * limit;

        const [contacts, total] = await Promise.all([
            ContactEntry.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            ContactEntry.countDocuments(query),
        ]);

        return NextResponse.json({
            contacts,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch contacts' },
            { status: 500 }
        );
    }
}
