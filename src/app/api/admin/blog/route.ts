import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import BlogPost from '@/lib/models/BlogPost';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const data = await req.json();

        // Basic validation
        if (!data.title || !data.content) {
            return NextResponse.json(
                { error: 'Title and content are required' },
                { status: 400 }
            );
        }

        // Generate slug from title if not provided
        let slug = data.slug;
        if (!slug) {
            slug = data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
        }

        // Ensure slug is unique
        let uniqueSlug = slug;
        let counter = 1;
        while (await BlogPost.findOne({ slug: uniqueSlug })) {
            uniqueSlug = `${slug}-${counter}`;
            counter++;
        }

        const newPost = await BlogPost.create({
            ...data,
            slug: uniqueSlug,
            author: session.user?.name || 'Admin',
            publishedAt: data.status === 'published' ? new Date() : null,
        });

        return NextResponse.json(newPost, { status: 201 });
    } catch (error: any) {
        console.error('Error creating blog post:', error);
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
        const posts = await BlogPost.find().sort({ createdAt: -1 });

        return NextResponse.json(posts);
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
