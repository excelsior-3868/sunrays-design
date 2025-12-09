import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import AdminUser from '@/lib/models/AdminUser';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        // Check if admin already exists
        const existingAdmin = await AdminUser.findOne({});

        if (existingAdmin) {
            return NextResponse.json(
                { message: 'Admin user already exists' },
                { status: 200 }
            );
        }

        // Create initial admin user
        const adminEmail = process.env.ADMIN_EMAIL || 'subin.bajra@gmail.com';
        const adminUsername = process.env.ADMIN_USERNAME || 'subin.bajra';

        await AdminUser.create({
            email: adminEmail,
            username: adminUsername,
        });

        return NextResponse.json(
            { message: 'Admin user created successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Init admin error:', error);
        return NextResponse.json(
            { error: 'Failed to initialize admin user' },
            { status: 500 }
        );
    }
}
