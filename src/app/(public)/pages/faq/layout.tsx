import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions about admissions, academics, facilities, and more at Sunrays Pre School. Learn about our programs, schedule, and enrollment process.',
    keywords: ['FAQ', 'preschool questions', 'admissions', 'enrollment', 'school hours', 'facilities', 'Sunrays Pre School'],
    openGraph: {
        title: 'FAQ | Sunrays Pre School',
        description: 'Everything you need to know about Sunrays Pre School',
        images: ['/sunrays-logo.png'],
        type: 'website',
    },
};

export default function FAQLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
