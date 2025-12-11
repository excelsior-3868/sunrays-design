import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Programs',
    description: 'Explore our comprehensive early childhood education programs including Play Group, Nursery, LKG, and UKG. Our curriculum is designed for children aged 2-6 years to foster holistic development.',
    keywords: ['preschool programs', 'play group', 'nursery', 'kindergarten', 'LKG', 'UKG', 'early childhood curriculum', 'kathmandu preschool'],
    openGraph: {
        title: 'Our Programs | Sunrays Pre School',
        description: 'Comprehensive learning programs for children aged 2-6 years. Play Group, Nursery, LKG, and UKG.',
        images: ['/sunrays-logo.png'],
        type: 'website',
    },
};

export default function ProgramsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
