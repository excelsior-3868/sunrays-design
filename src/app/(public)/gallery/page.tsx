import dbConnect from "@/lib/db";
import Album from "@/lib/models/Album";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { Folder } from "lucide-react";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Photo Gallery - Our Memories & Events',
    description: 'Explore our photo gallery showcasing activities, events, and happy moments at Sunrays Pre School. See our children learning, playing, and growing in a nurturing environment.',
    keywords: ['preschool gallery', 'school events', 'preschool activities', 'children photos', 'school memories'],
    openGraph: {
        title: 'Photo Gallery - Sunrays Pre School',
        description: 'Explore our activities, events, and happy moments captured in frames.',
        type: 'website',
    },
};

async function getAlbums() {
    await dbConnect();
    // Fetch published albums
    const albums = await Album.find({ status: 'published' })
        .select('title description coverImage photos createdAt')
        .sort({ createdAt: -1 })
        .lean();

    return albums.map((album: any) => ({
        ...album,
        _id: album._id.toString(),
        photoCount: album.photos?.length || 0,
        coverImage: album.coverImage || (album.photos?.[0]?.url) || null
    }));
}

export default async function GalleryPage() {
    const albums = await getAlbums();

    return (
        <div className="container section-padding min-h-screen">
            <div className="text-center mb-16">
                <span className="section-subtitle">Our Memories</span>
                <h1 className="section-heading">Photo Gallery</h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg mt-4">
                    Explore our activities, events, and happy moments captured in frames.
                </p>
            </div>

            {albums.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
                    <Folder className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-xl text-gray-500 font-medium">No albums available yet.</p>
                    <p className="text-gray-400 mt-2">Check back soon for updates!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {albums.map((album, index) => (
                        <Link href={`/gallery/${album._id}`} key={album._id} className="group block h-full">
                            <div className="bg-white rounded-[24px] shadow-sm hover:shadow-card transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col overflow-hidden border border-gray-100">
                                {/* Image Container */}
                                <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                                    {album.coverImage ? (
                                        <Image
                                            src={album.coverImage}
                                            alt={album.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading={index < 4 ? "eager" : "lazy"}
                                            priority={index < 4}
                                            placeholder="blur"
                                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                        />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center bg-gray-50">
                                            <Folder className="h-12 w-12 text-gray-300" />
                                        </div>
                                    )}
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                                    <div className="absolute bottom-3 right-3">
                                        <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30 shadow-xs">
                                            {album.photoCount} Photos
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-[var(--color-dark)] group-hover:text-[var(--color-primary)] transition-colors mb-2 line-clamp-1">
                                        {album.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1 leading-relaxed">
                                        {album.description || "No description provided."}
                                    </p>
                                    <div className="text-xs text-gray-400 mt-auto pt-4 border-t border-gray-100 font-medium uppercase tracking-wider">
                                        {format(new Date(album.createdAt), 'MMMM d, yyyy')}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
