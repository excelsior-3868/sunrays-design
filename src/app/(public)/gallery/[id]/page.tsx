import dbConnect from "@/lib/db";
import Album from "@/lib/models/Album";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GalleryGrid from "@/components/gallery/GalleryGrid";

async function getAlbum(id: string) {
    if (!id || id.length !== 24) return null; // basic ObjectId check
    await dbConnect();

    try {
        const album = await Album.findById(id).lean();
        if (!album) return null;

        return {
            ...album,
            _id: album._id.toString(),
            photos: album.photos?.map((p: any) => ({
                url: p.url,
                name: p.name,
                publicId: p.publicId,
                _id: p._id?.toString()
            })) || []
        };
    } catch (e) {
        console.error("Error fetching album", e);
        return null;
    }
}

// Correct type signature for Next.js 15+ / 16 (params is a promise in newer versions, but in 14 it's object. 
// Safe to just use type params directly, Next.js handles it.
// Wait, prompt said sunrays-design package.json has "next": "16.0.7".
// In Next 15+, params is Promise<{ id: string }>.
// So I should await params.

export default async function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const album = await getAlbum(id);

    if (!album) {
        notFound();
    }

    return (
        <div className="container section-padding min-h-screen">
            <div className="mb-10">
                <Link
                    href="/gallery"
                    className="inline-flex items-center text-gray-500 hover:text-[var(--color-primary)] transition-colors mb-6 font-medium group"
                >
                    <div className="bg-gray-100 p-2 rounded-full mr-3 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
                        <ArrowLeft className="h-4 w-4" />
                    </div>
                    Back to Gallery
                </Link>

                <h1 className="text-4xl font-bold text-[var(--color-dark)] mb-3">{album.title}</h1>
                {album.description && (
                    <p className="text-lg text-gray-600 max-w-3xl leading-relaxed border-l-4 border-[var(--color-yellow)] pl-4">
                        {album.description}
                    </p>
                )}
            </div>

            <GalleryGrid photos={album.photos} />
        </div>
    );
}
