import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    imageUrl?: string;
    author: string;
    status: 'draft' | 'published';
    publishedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    excerpt: {
        type: String,
        required: true,
        trim: true,
    },
    imageUrl: {
        type: String,
    },
    author: {
        type: String,
        required: true,
        default: 'Admin',
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
    },
    publishedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

// Index for queries
// Index for queries
// Slug is already indexed by unique: true
BlogPostSchema.index({ status: 1, publishedAt: -1 });

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
