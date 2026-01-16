import mongoose, { Schema, Document } from 'mongoose';

export interface IPopup extends Document {
    title: string;
    description?: string;
    imageUrl: string;
    linkUrl?: string;
    isActive: boolean;
    priority: number; // Higher number = higher priority
    startDate?: Date;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const PopupSchema = new Schema<IPopup>({
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
    linkUrl: {
        type: String,
        trim: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    priority: {
        type: Number,
        default: 0,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
}, {
    timestamps: true,
});

// Index for efficient queries
PopupSchema.index({ isActive: 1, priority: -1 });
PopupSchema.index({ startDate: 1, endDate: 1 });

export default mongoose.models.Popup || mongoose.model<IPopup>('Popup', PopupSchema);
