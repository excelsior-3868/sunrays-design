import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Photo Gallery',
    description: 'Browse our photo gallery showcasing memorable moments, events, and activities at Sunrays Pre School. See our vibrant learning environment and happy children.',
    keywords: ['photo gallery', 'preschool photos', 'school events', 'children activities', 'Sunrays Pre School gallery'],
    openGraph: {
        title: 'Photo Gallery | Sunrays Pre School',
        description: 'View our collection of photos from events and activities',
        images: ['/sunrays-logo.png'],
        type: 'website',
    },
};

export default function GalleryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
