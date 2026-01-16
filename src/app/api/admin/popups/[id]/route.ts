import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Popup from '@/lib/models/Popup';
import { auth } from '@/auth';

// GET - Fetch a single popup by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const popup = await Popup.findById(id).lean();

        if (!popup) {
            return NextResponse.json({ error: 'Popup not found' }, { status: 404 });
        }

        return NextResponse.json({ popup }, { status: 200 });
    } catch (error) {
        console.error('Error fetching popup:', error);
        return NextResponse.json({ error: 'Failed to fetch popup' }, { status: 500 });
    }
}

// PUT - Update a popup by ID
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const body = await request.json();
        const { title, description, imageUrl, linkUrl, isActive, priority, startDate, endDate } = body;

        const updateData: any = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
        if (linkUrl !== undefined) updateData.linkUrl = linkUrl;
        if (isActive !== undefined) updateData.isActive = isActive;
        if (priority !== undefined) updateData.priority = priority;
        if (startDate !== undefined) updateData.startDate = startDate ? new Date(startDate) : null;
        if (endDate !== undefined) updateData.endDate = endDate ? new Date(endDate) : null;

        const popup = await Popup.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!popup) {
            return NextResponse.json({ error: 'Popup not found' }, { status: 404 });
        }

        return NextResponse.json({ popup }, { status: 200 });
    } catch (error) {
        console.error('Error updating popup:', error);
        return NextResponse.json({ error: 'Failed to update popup' }, { status: 500 });
    }
}

// DELETE - Delete a popup by ID
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const popup = await Popup.findByIdAndDelete(id);

        if (!popup) {
            return NextResponse.json({ error: 'Popup not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Popup deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting popup:', error);
        return NextResponse.json({ error: 'Failed to delete popup' }, { status: 500 });
    }
}
