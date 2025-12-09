import mongoose, { Schema, Document } from 'mongoose';

export interface IPage extends Document {
    title: string;
    slug: string;
    metaDescription: string;
    content: any; // JSON content sections
    status: 'draft' | 'published';
    createdAt: Date;
    updatedAt: Date;
}

const PageSchema = new Schema<IPage>({
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
    metaDescription: {
        type: String,
        trim: true,
    },
    content: {
        type: Schema.Types.Mixed,
        default: {},
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
    },
}, {
    timestamps: true,
});

// Index for queries
PageSchema.index({ slug: 1 });
PageSchema.index({ status: 1 });

export default mongoose.models.Page || mongoose.model<IPage>('Page', PageSchema);
