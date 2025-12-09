import mongoose, { Schema, Document } from 'mongoose';

export interface IAdminUser extends Document {
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const AdminUserSchema = new Schema<IAdminUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
}, {
    timestamps: true,
});

export default mongoose.models.AdminUser || mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);
