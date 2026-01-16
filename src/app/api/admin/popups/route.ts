import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Popup from '@/lib/models/Popup';
import { auth } from '@/auth';

// GET - Fetch all popups (admin) or active popups (public)
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const publicOnly = searchParams.get('public') === 'true';

        let query: any = {};

        if (publicOnly) {
            // Public API - only fetch active popups within date range
            const now = new Date();
            query = {
                isActive: true,
                $or: [
                    { startDate: { $exists: false }, endDate: { $exists: false } },
                    { startDate: { $lte: now }, endDate: { $gte: now } },
                    { startDate: { $lte: now }, endDate: { $exists: false } },
                    { startDate: { $exists: false }, endDate: { $gte: now } },
                ]
            };
        } else {
            // Admin API - check authentication
            const session = await auth();
            if (!session) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
        }

        const popups = await Popup.find(query)
            .sort({ priority: -1, createdAt: -1 })
            .lean();

        return NextResponse.json({ popups }, { status: 200 });
    } catch (error) {
        console.error('Error fetching popups:', error);
        return NextResponse.json({ error: 'Failed to fetch popups' }, { status: 500 });
    }
}

// POST - Create a new popup (admin only)
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const body = await request.json();
        const { title, description, imageUrl, linkUrl, isActive, priority, startDate, endDate } = body;

        if (!title || !imageUrl) {
            return NextResponse.json(
                { error: 'Title and image URL are required' },
                { status: 400 }
            );
        }

        const popup = await Popup.create({
            title,
            description,
            imageUrl,
            linkUrl,
            isActive: isActive ?? true,
            priority: priority ?? 0,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
        });

        return NextResponse.json({ popup }, { status: 201 });
    } catch (error) {
        console.error('Error creating popup:', error);
        return NextResponse.json({ error: 'Failed to create popup' }, { status: 500 });
    }
}
