import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admissions',
    description: 'Join the Sunrays family. Find detailed information on our admission procedure, required documents, school schedule, and how to apply for your child\'s enrollment.',
    keywords: ['preschool admission', 'enrollment process', 'school admission kathmandu', 'admission requirements', 'school fees', 'application form'],
    openGraph: {
        title: 'Admissions | Sunrays Pre School',
        description: 'Start your child\'s journey with Sunrays Pre School. Simple and transparent admission process.',
        images: ['/sunrays-logo.png'],
        type: 'website',
    },
};

export default function AdmissionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
