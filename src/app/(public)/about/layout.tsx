import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn about Sunrays Pre School - our mission, values, experienced teachers, and commitment to providing quality early childhood education in Kathmandu. Discover our story and meet our team.',
    keywords: ['about us', 'preschool Kathmandu', 'early education', 'experienced teachers', 'child care', 'our values'],
    openGraph: {
        title: 'About Us | Sunrays Pre School',
        description: 'Give children the space to learn, grow and shine at Sunrays Pre School',
        images: ['/about-kids.jpg', '/sunrays-logo.png'],
        type: 'website',
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
