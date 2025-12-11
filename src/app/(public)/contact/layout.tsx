import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with Sunrays Pre School. Find our location, phone number, email, or send us a message directly. We are here to answer your questions about admissions and our programs.',
    keywords: ['contact sunrays', 'preschool contact', 'admissions inquiry', 'kathmandu preschool address', 'phone number', 'email'],
    openGraph: {
        title: 'Contact Us | Sunrays Pre School',
        description: 'Get in touch with Sunrays Pre School. We\'d love to hear from you.',
        images: ['/sunrays-logo.png'],
        type: 'website',
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
