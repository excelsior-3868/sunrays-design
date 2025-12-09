import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import AdminUser from './models/AdminUser';
import dbConnect from './db';

export const authConfig: NextAuthConfig = {
    callbacks: {
        authorized() {
            // Middleware handles authorization logic
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
            }
            return session;
        },
    },
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
            },
            async authorize(credentials) {
                try {
                    await dbConnect();

                    const user = await AdminUser.findOne({
                        email: credentials.email
                    });

                    if (!user) {
                        return null;
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.username,
                    };
                } catch (error) {
                    console.error('Auth error:', error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};
