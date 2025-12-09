import mongoose, { Schema, Document } from 'mongoose';

export interface IContactEntry extends Document {
    name: string;
    email: string;
    phone?: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ContactEntrySchema = new Schema<IContactEntry>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    message: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

// Index for faster queries
ContactEntrySchema.index({ createdAt: -1 });
ContactEntrySchema.index({ isRead: 1 });

export default mongoose.models.ContactEntry || mongoose.model<IContactEntry>('ContactEntry', ContactEntrySchema);
