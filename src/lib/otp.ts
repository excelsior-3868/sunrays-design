import OTP from './models/OTP';
import dbConnect from './db';

export function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function storeOTP(email: string, code: string): Promise<boolean> {
    try {
        await dbConnect();
        const normalizedEmail = email.toLowerCase();

        // Optional: Delete really old OTPs to keep DB clean, but allow recent overlaps for race conditions
        // await OTP.deleteMany({ email: normalizedEmail }); 

        // Create new OTP with 5-minute expiration
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await OTP.create({
            email: normalizedEmail,
            code,
            expiresAt,
            attempts: 0,
        });

        return true;
    } catch (error) {
        console.error('Error storing OTP:', error);
        return false;
    }
}

export async function verifyOTP(email: string, code: string): Promise<boolean> {
    try {
        await dbConnect();
        const normalizedEmail = email.toLowerCase();

        // Find ANY valid, unexpired, matching OTP for this email
        // This handles race conditions where a user generates two OTPs and uses the first one
        const otpRecord = await OTP.findOne({
            email: normalizedEmail,
            code: code,
            expiresAt: { $gt: new Date() },
        });

        if (!otpRecord) {
            console.log(`Debug: No matching valid OTP found for ${normalizedEmail} with code ${code}`);
            return false;
        }

        // Delete the used OTP to prevent replay attacks
        await OTP.deleteOne({ _id: otpRecord._id });
        return true;
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return false;
    }
}

export async function checkOTPRateLimit(email: string): Promise<boolean> {
    try {
        await dbConnect();
        const normalizedEmail = email.toLowerCase();

        // Check how many OTPs were sent in the last 15 minutes
        const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

        const recentOTPs = await OTP.countDocuments({
            email: normalizedEmail,
            createdAt: { $gte: fifteenMinutesAgo },
        });

        // Allow max 3 OTP requests per 15 minutes
        return recentOTPs < 3;
    } catch (error) {
        console.error('Error checking OTP rate limit:', error);
        return false;
    }
}
