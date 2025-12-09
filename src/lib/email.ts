import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

export async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
  try {
    // For Resend free plan, use a verified email address
    // Set FROM_EMAIL in .env.local to your verified email
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: 'Your Login OTP Code',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .otp-code {
                background: white;
                border: 2px dashed #667eea;
                padding: 20px;
                text-align: center;
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 8px;
                color: #667eea;
                margin: 20px 0;
                border-radius: 8px;
              }
              .warning {
                background: #fff3cd;
                border-left: 4px solid #ffc107;
                padding: 12px;
                margin: 20px 0;
                border-radius: 4px;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                color: #666;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🔐 Admin Login OTP</h1>
              </div>
              <div class="content">
                <p>Hello,</p>
                <p>You requested to log in to the Sunrays Pre School CMS. Use the following OTP code to complete your login:</p>
                
                <div class="otp-code">${otp}</div>
                
                <div class="warning">
                  <strong>⚠️ Important:</strong> This code will expire in <strong>5 minutes</strong>. Do not share this code with anyone.
                </div>
                
                <p>If you didn't request this code, please ignore this email.</p>
                
                <p>Best regards,<br>Sunrays Pre School CMS</p>
              </div>
              <div class="footer">
                <p>This is an automated email. Please do not reply.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error sending OTP email:', error);

      // In development, log OTP to console if email fails
      if (process.env.NODE_ENV === 'development') {
        console.log('\n' + '='.repeat(60));
        console.log('📧 DEVELOPMENT MODE - OTP EMAIL');
        console.log('='.repeat(60));
        console.log(`To: ${email}`);
        console.log(`OTP Code: ${otp}`);
        console.log(`Expires: 5 minutes`);
        console.log('='.repeat(60) + '\n');
        // Return true in development to allow testing
        return true;
      }

      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);

    // In development, log OTP to console if email fails
    if (process.env.NODE_ENV === 'development') {
      console.log('\n' + '='.repeat(60));
      console.log('📧 DEVELOPMENT MODE - OTP EMAIL');
      console.log('='.repeat(60));
      console.log(`To: ${email}`);
      console.log(`OTP Code: ${otp}`);
      console.log(`Expires: 5 minutes`);
      console.log('='.repeat(60) + '\n');
      // Return true in development to allow testing
      return true;
    }

    return false;
  }
}
