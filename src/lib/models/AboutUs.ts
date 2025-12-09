import mongoose, { Schema, Document } from 'mongoose';

interface Testimonial {
    name: string;
    role: string;
    text: string;
    avatarUrl?: string;
}

interface Teacher {
    name: string;
    role: string;
    imageUrl?: string;
    colorTheme: 'red' | 'blue' | 'yellow';
}

interface Facility {
    title: string;
    description: string;
    icon: string;
}

export interface IAboutUs extends Document {
    heroTitle: string;
    mainTitle: string;
    mainSubtitle: string;
    mainDescription: string;
    mainImageUrl?: string;
    signatureName: string;
    signatureRole: string;
    testimonials: Testimonial[];
    teachers: Teacher[];
    facilities: Facility[];
    facilitiesTitle: string;
    facilitiesSubtitle: string;
    facilitiesDescription: string;
    facilitiesImageUrl?: string;
    updatedAt: Date;
}

const AboutUsSchema = new Schema<IAboutUs>({
    heroTitle: {
        type: String,
        default: 'About Us',
    },
    mainTitle: {
        type: String,
        default: 'Give the Children Space to Grow a Creativity',
    },
    mainSubtitle: {
        type: String,
        default: 'Learn About Us',
    },
    mainDescription: {
        type: String,
        default: '',
    },
    mainImageUrl: {
        type: String,
    },
    signatureName: {
        type: String,
        default: 'Margaret T.',
    },
    signatureRole: {
        type: String,
        default: 'Headmaster',
    },
    testimonials: [{
        name: { type: String, required: true },
        role: { type: String, required: true },
        text: { type: String, required: true },
        avatarUrl: String,
    }],
    teachers: [{
        name: { type: String, required: true },
        role: { type: String, default: 'Teacher' },
        imageUrl: String,
        colorTheme: {
            type: String,
            enum: ['red', 'blue', 'yellow'],
            default: 'blue',
        },
    }],
    facilities: [{
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, default: 'BookOpen' },
    }],
    facilitiesTitle: {
        type: String,
        default: 'Complete Facilities',
    },
    facilitiesSubtitle: {
        type: String,
        default: 'Why Choose Us?',
    },
    facilitiesDescription: {
        type: String,
        default: '',
    },
    facilitiesImageUrl: {
        type: String,
    },
}, {
    timestamps: true,
});

export default mongoose.models.AboutUs || mongoose.model<IAboutUs>('AboutUs', AboutUsSchema);
