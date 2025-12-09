import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Event from '@/lib/models/Event';
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
        const limit = parseInt(searchParams.get('limit') || '20');
        const status = searchParams.get('status'); // 'all', 'published', 'draft'
        const search = searchParams.get('search');
        const upcoming = searchParams.get('upcoming'); // 'true' or 'false'

        let query: any = {};

        // Filter by status
        if (status && status !== 'all') {
            query.status = status;
        }

        // Filter by upcoming/past
        if (upcoming === 'true') {
            query.date = { $gte: new Date() };
        } else if (upcoming === 'false') {
            query.date = { $lt: new Date() };
        }

        // Search
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
            ];
        }

        const skip = (page - 1) * limit;

        const [events, total] = await Promise.all([
            Event.find(query)
                .sort({ date: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Event.countDocuments(query),
        ]);

        return NextResponse.json({
            events,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json(
            { error: 'Failed to fetch events' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { title, description, date, location, imageUrl, status } = await request.json();

        // Validate required fields
        if (!title || !description || !date || !location) {
            return NextResponse.json(
                { error: 'Title, description, date, and location are required' },
                { status: 400 }
            );
        }

        await dbConnect();

        const event = await Event.create({
            title: title.trim(),
            description: description.trim(),
            date: new Date(date),
            location: location.trim(),
            imageUrl: imageUrl?.trim() || undefined,
            status: status || 'draft',
        });

        return NextResponse.json(
            { event, message: 'Event created successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json(
            { error: 'Failed to create event' },
            { status: 500 }
        );
    }
}
