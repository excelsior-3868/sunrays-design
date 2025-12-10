import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Album from '@/lib/models/Album';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const data = await req.json();

        if (!data.title) {
            return NextResponse.json(
                { error: 'Title is required' },
                { status: 400 }
            );
        }

        const newAlbum = await Album.create({
            ...data,
            photos: data.photos || [],
        });

        return NextResponse.json(newAlbum, { status: 201 });
    } catch (error: any) {
        console.error('Error creating album:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const albums = await Album.find().sort({ createdAt: -1 });

        return NextResponse.json(albums);
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
