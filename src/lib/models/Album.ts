import mongoose, { Schema, Document } from 'mongoose';

export interface IPhoto {
    url: string;
    publicId?: string; // For Drive/Cloudinary ID
    name?: string;
}

export interface IAlbum extends Document {
    title: string;
    description?: string;
    coverImage?: string;
    photos: IPhoto[];
    status: 'draft' | 'published';
    createdAt: Date;
    updatedAt: Date;
}

const PhotoSchema = new Schema<IPhoto>({
    url: { type: String, required: true },
    publicId: String,
    name: String,
});

const AlbumSchema = new Schema<IAlbum>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    coverImage: {
        type: String, // URL of the cover image
    },
    photos: [PhotoSchema],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'published',
    },
}, {
    timestamps: true,
});

export default mongoose.models.Album || mongoose.model<IAlbum>('Album', AlbumSchema);
