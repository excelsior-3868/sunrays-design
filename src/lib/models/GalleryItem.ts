import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryItem extends Document {
    title: string;
    description?: string;
    imageUrl: string;
    category?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        trim: true,
        default: 'general',
    },
    order: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

// Index for sorting
GalleryItemSchema.index({ order: 1, createdAt: -1 });
GalleryItemSchema.index({ category: 1 });

export default mongoose.models.GalleryItem || mongoose.model<IGalleryItem>('GalleryItem', GalleryItemSchema);
