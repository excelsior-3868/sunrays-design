import mongoose, { Schema, Document } from 'mongoose';

export interface IOTP extends Document {
    email: string;
    code: string;
    expiresAt: Date;
    attempts: number;
    createdAt: Date;
}

const OTPSchema = new Schema<IOTP>({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    code: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 }, // TTL index - auto-delete expired documents
    },
    attempts: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

// Index for faster lookups
OTPSchema.index({ email: 1, createdAt: -1 });

export default mongoose.models.OTP || mongoose.model<IOTP>('OTP', OTPSchema);
