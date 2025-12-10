import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Album from '@/lib/models/Album';
import { auth } from '@/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await dbConnect();
        const album = await Album.findById(id);

        if (!album) {
            return NextResponse.json({ error: 'Album not found' }, { status: 404 });
        }

        return NextResponse.json(album);
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await dbConnect();
        const data = await req.json();

        // If photos are being added, we might want to append rather than replace?
        // For simplicity, let's assume the frontend sends the full desired state or specific operations.
        // Here we do a full update of provided fields.

        const album = await Album.findByIdAndUpdate(
            id,
            { ...data },
            { new: true, runValidators: true }
        );

        if (!album) {
            return NextResponse.json({ error: 'Album not found' }, { status: 404 });
        }

        return NextResponse.json(album);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await dbConnect();

        await Album.findByIdAndDelete(id);

        return NextResponse.json({ message: 'Album deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
