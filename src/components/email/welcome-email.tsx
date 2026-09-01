interface WelcomeEmailProps {
  userName: string;
  hospitalName: string;
  loginUrl: string;
  supportEmail: string;
  supportPhone: string;
}

export function generateWelcomeEmail({
  userName,
  hospitalName,
  loginUrl,
  supportEmail,
  supportPhone,
}: WelcomeEmailProps): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to ${hospitalName}</title>
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
          background: linear-gradient(135deg, #0077b6, #00b4d8);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .logo {
          width: 120px;
          height: auto;
          margin-bottom: 15px;
        }
        .content {
          padding: 30px;
        }
        .greeting {
          font-size: 24px;
          color: #0077b6;
          margin-bottom: 20px;
        }
        .message {
          font-size: 16px;
          color: #555;
          margin-bottom: 25px;
        }
        .steps {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin: 25px 0;
        }
        .steps h3 {
          color: #0077b6;
          margin-top: 0;
        }
        .step {
          display: flex;
          align-items: flex-start;
          margin-bottom: 15px;
        }
        .step-number {
          background-color: #0077b6;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          font-weight: bold;
          font-size: 14px;
        }
        .button {
          display: inline-block;
          background-color: #0077b6;
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          margin: 20px 0;
        }
        .contact-info {
          background-color: #e8f4f8;
          border-left: 4px solid #0077b6;
          padding: 15px;
          margin: 25px 0;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: #666;
        }
        .footer a {
          color: #0077b6;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="[HOSPITAL_LOGO_URL]" alt="${hospitalName} Logo" class="logo">
          <h1>Welcome to ${hospitalName}!</h1>
        </div>
        
        <div class="content">
          <h2 class="greeting">Hello ${userName},</h2>
          
          <p class="message">
            Thank you for joining ${hospitalName}. We're excited to have you as part of our healthcare family.
            Your account has been successfully created and you can now access all our services.
          </p>

          <div class="steps">
            <h3>Getting Started</h3>
            <div class="step">
              <div class="step-number">1</div>
              <div>
                <strong>Complete Your Profile</strong>
                <p>Add your personal information and medical history to help us serve you better.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div>
                <strong>Book Your First Appointment</strong>
                <p>Choose from our team of experienced doctors and schedule your visit.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div>
                <strong>Access Medical Records</strong>
                <p>View your test results, prescriptions, and medical history anytime.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div>
                <strong>Set Up Notifications</strong>
                <p>Stay updated with appointment reminders and health alerts.</p>
              </div>
            </div>
          </div>

          <a href="${loginUrl}" class="button">Access Your Dashboard</a>

          <div class="contact-info">
            <h4>Need Help?</h4>
            <p>Our support team is available 24/7 to assist you:</p>
            <p>
              <strong>Email:</strong> ${supportEmail}<br>
              <strong>Phone:</strong> ${supportPhone}<br>
              <strong>Hours:</strong> Monday - Friday, 8:00 AM - 6:00 PM
            </p>
          </div>
        </div>

        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ${hospitalName}. All rights reserved.</p>
          <p>
            <a href="#">Privacy Policy</a> | 
            <a href="#">Terms of Service</a> | 
            <a href="#">Unsubscribe</a>
          </p>
          <p>This email was sent to ${userName}. If you didn't create an account, please contact our support team.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export default generateWelcomeEmail;
