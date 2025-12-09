import OTP from './models/OTP';
import dbConnect from './db';

export function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function storeOTP(email: string, code: string): Promise<boolean> {
    try {
        await dbConnect();

        // Delete any existing OTPs for this email
        await OTP.deleteMany({ email });

        // Create new OTP with 5-minute expiration
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await OTP.create({
            email,
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

        const otpRecord = await OTP.findOne({
            email,
            expiresAt: { $gt: new Date() },
        }).sort({ createdAt: -1 });

        if (!otpRecord) {
            return false;
        }

        // Check if too many attempts
        if (otpRecord.attempts >= 3) {
            await OTP.deleteOne({ _id: otpRecord._id });
            return false;
        }

        // Verify code
        if (otpRecord.code === code) {
            // Delete the OTP after successful verification
            await OTP.deleteOne({ _id: otpRecord._id });
            return true;
        } else {
            // Increment attempts
            otpRecord.attempts += 1;
            await otpRecord.save();
            return false;
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return false;
    }
}

export async function checkOTPRateLimit(email: string): Promise<boolean> {
    try {
        await dbConnect();

        // Check how many OTPs were sent in the last 15 minutes
        const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

        const recentOTPs = await OTP.countDocuments({
            email,
            createdAt: { $gte: fifteenMinutesAgo },
        });

        // Allow max 3 OTP requests per 15 minutes
        return recentOTPs < 3;
    } catch (error) {
        console.error('Error checking OTP rate limit:', error);
        return false;
    }
}
