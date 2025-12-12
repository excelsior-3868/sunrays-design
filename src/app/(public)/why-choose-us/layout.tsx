import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'What Sets Us Apart',
    description: 'Discover why Sunrays Pre School is the best choice for your child. We offer quality teaching, a safe environment, nutritious meals, and a holistic approach to child development.',
    keywords: ['best preschool kathmandu', 'child friendly environment', 'experienced teachers', 'nutritious meals', 'holistic development', 'nepali culture'],
    openGraph: {
        title: 'What Sets Us Apart | Sunrays Pre School',
        description: 'Discover the Sunrays difference. Quality education, experienced teachers, and a loving environment.',
        images: ['/sunrays-logo.png'],
        type: 'website',
    },
};

export default function WhyChooseUsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
