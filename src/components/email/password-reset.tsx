interface PasswordResetProps {
  userName: string;
  resetUrl: string;
  hospitalName: string;
  expiryMinutes: number;
  ipAddress?: string;
  browserInfo?: string;
}

export function generatePasswordReset({
  userName,
  resetUrl,
  hospitalName,
  expiryMinutes,
  ipAddress,
  browserInfo,
}: PasswordResetProps): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset Request</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .container {
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #dc3545, #fd7e14);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .icon {
          font-size: 48px;
          margin-bottom: 15px;
        }
        .content {
          padding: 30px;
        }
        .message {
          font-size: 16px;
          color: #555;
          margin-bottom: 25px;
        }
        .reset-button {
          display: block;
          width: 100%;
          background-color: #dc3545;
          color: white;
          padding: 15px;
          text-align: center;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          font-size: 16px;
          margin: 25px 0;
        }
        .expiry-warning {
          background-color: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .expiry-warning strong {
          color: #856404;
        }
        .security-note {
          background-color: #f8d7da;
          border-left: 4px solid #dc3545;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .security-note strong {
          color: #721c24;
        }
        .request-info {
          background-color: #f8f9fa;
          border-radius: 4px;
          padding: 15px;
          margin: 20px 0;
          font-size: 14px;
          color: #666;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="icon">🔒</div>
          <h1>Password Reset Request</h1>
          <p>${hospitalName}</p>
        </div>
        
        <div class="content">
          <p>Dear ${userName},</p>
          
          <p class="message">
            We received a request to reset the password for your account associated 
            with this email address. If you made this request, please click the 
            button below to create a new password.
          </p>

          <a href="${resetUrl}" class="reset-button">Reset My Password</a>

          <div class="expiry-warning">
            <strong>⏰ Important:</strong> This password reset link will expire 
            in <strong>${expiryMinutes} minutes</strong>. Please complete the 
            reset process before the link expires.
          </div>

          <div class="security-note">
            <strong>🛡️ Security Note:</strong> If you did not request a password 
            reset, please ignore this email and ensure your account is secure. 
            Consider changing your password if you suspect unauthorized access.
          </div>

          ${ipAddress || browserInfo ? `
            <div class="request-info">
              <strong>Request Details:</strong>
              ${ipAddress ? `<br>IP Address: ${ipAddress}` : ''}
              ${browserInfo ? `<br>Browser: ${browserInfo}` : ''}
              <br>Time: ${new Date().toLocaleString()}
            </div>
          ` : ''}

          <p>
            If you're having trouble clicking the button, copy and paste the 
            following URL into your browser:
          </p>
          <p style="word-break: break-all; color: #0077b6; font-size: 14px;">
            ${resetUrl}
          </p>
        </div>

        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ${hospitalName}. All rights reserved.</p>
          <p>
            This is a security email. Please do not reply.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export default generatePasswordReset;
