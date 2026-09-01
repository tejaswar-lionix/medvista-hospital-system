import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'MedVista Hospital <noreply@medvista.com>',
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Email send error:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

export async function sendWelcomeEmail(
  email: string,
  name: string,
  role: string
) {
  const roleSpecificContent = role === 'DOCTOR'
    ? `<p>Your doctor profile has been created. You can now start managing your appointments and patient records.</p>`
    : `<p>You can now book appointments, view your medical records, and manage your health profile.</p>`;

  return sendEmail({
    to: email,
    subject: 'Welcome to MedVista Hospital',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
          .btn { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to MedVista</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>Thank you for joining MedVista Hospital Management System.</p>
            ${roleSpecificContent}
            <p>Your account has been successfully created with the following details:</p>
            <ul>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Role:</strong> ${role}</li>
            </ul>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/login" class="btn">Login to Your Account</a>
            <p style="margin-top: 20px;">If you have any questions, please don't hesitate to contact our support team.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} MedVista Hospital. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
}

export async function sendAppointmentConfirmation(
  email: string,
  patientName: string,
  doctorName: string,
  department: string,
  date: string,
  time: string,
  appointmentType: string
) {
  return sendEmail({
    to: email,
    subject: `Appointment Confirmed - ${date} at ${time}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #16a34a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb; }
          .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
          .detail-label { font-weight: bold; color: #4b5563; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
          .btn { display: inline-block; background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Appointment Confirmed</h1>
          </div>
          <div class="content">
            <h2>Hello ${patientName},</h2>
            <p>Your appointment has been confirmed. Here are the details:</p>
            <div class="details">
              <div class="detail-row">
                <span class="detail-label">Doctor:</span>
                <span>${doctorName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Department:</span>
                <span>${department}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span>${date}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Time:</span>
                <span>${time}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Type:</span>
                <span>${appointmentType}</span>
              </div>
            </div>
            <p><strong>Important:</strong> Please arrive 15 minutes before your appointment time.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/appointments" class="btn">View Appointment</a>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} MedVista Hospital. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
}

export async function sendAppointmentReminder(
  email: string,
  patientName: string,
  doctorName: string,
  date: string,
  time: string,
  hoursUntil: number
) {
  return sendEmail({
    to: email,
    subject: `Appointment Reminder - ${hoursUntil} hours remaining`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f59e0b; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .reminder-box { background: #fef3c7; border: 1px solid #fcd34d; padding: 16px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
          .btn { display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Appointment Reminder</h1>
          </div>
          <div class="content">
            <h2>Hello ${patientName},</h2>
            <div class="reminder-box">
              <p><strong>This is a friendly reminder about your upcoming appointment.</strong></p>
            </div>
            <p>You have an appointment in <strong>${hoursUntil} hours</strong>:</p>
            <ul>
              <li><strong>Doctor:</strong> ${doctorName}</li>
              <li><strong>Date:</strong> ${date}</li>
              <li><strong>Time:</strong> ${time}</li>
            </ul>
            <p>Please make sure to:</p>
            <ul>
              <li>Arrive 15 minutes early</li>
              <li>Bring your ID and insurance documents</li>
              <li>Carry any previous medical records</li>
            </ul>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/appointments" class="btn">View Details</a>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} MedVista Hospital. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
}

export async function sendBillNotification(
  email: string,
  patientName: string,
  invoiceNumber: string,
  amount: number,
  dueDate: string,
  status: string
) {
  const statusColor = status === 'OVERDUE' ? '#dc2626' : '#2563eb';
  const statusMessage = status === 'OVERDUE'
    ? '<p style="color: #dc2626;"><strong>Your payment is overdue. Please make the payment immediately to avoid additional charges.</strong></p>'
    : `<p>Please make the payment before the due date to avoid late fees.</p>`;

  return sendEmail({
    to: email,
    subject: `Bill ${status === 'OVERDUE' ? 'Overdue' : 'Notification'} - Invoice ${invoiceNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: ${statusColor}; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .amount-box { background: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; border: 1px solid #e5e7eb; }
          .amount { font-size: 32px; font-weight: bold; color: ${statusColor}; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
          .btn { display: inline-block; background: ${statusColor}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Bill ${status}</h1>
          </div>
          <div class="content">
            <h2>Hello ${patientName},</h2>
            <p>You have a ${status.toLowerCase()} bill that requires your attention.</p>
            <div class="amount-box">
              <div class="amount">₹${amount.toLocaleString('en-IN')}</div>
              <p>Invoice: ${invoiceNumber}</p>
              <p>Due Date: ${dueDate}</p>
            </div>
            ${statusMessage}
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/billing" class="btn">Pay Now</a>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} MedVista Hospital. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
}

export async function sendPasswordReset(
  email: string,
  name: string,
  resetToken: string
) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

  return sendEmail({
    to: email,
    subject: 'Password Reset Request',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #6366f1; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .warning { background: #fef2f2; border: 1px solid #fecaca; padding: 16px; border-radius: 8px; margin: 20px 0; color: #991b1b; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
          .btn { display: inline-block; background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
            <div style="text-align: center;">
              <a href="${resetUrl}" class="btn">Reset Password</a>
            </div>
            <div class="warning">
              <p><strong>Security Notice:</strong></p>
              <ul>
                <li>This link will expire in 1 hour</li>
                <li>If you didn't request this, please ignore this email</li>
                <li>Never share this link with anyone</li>
              </ul>
            </div>
            <p>If the button doesn't work, copy and paste this URL into your browser:</p>
            <p style="word-break: break-all; color: #6366f1;">${resetUrl}</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} MedVista Hospital. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
}

export async function sendAppointmentCancellation(
  email: string,
  patientName: string,
  doctorName: string,
  date: string,
  time: string,
  reason?: string
) {
  return sendEmail({
    to: email,
    subject: 'Appointment Cancelled',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
          .btn { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Appointment Cancelled</h1>
          </div>
          <div class="content">
            <h2>Hello ${patientName},</h2>
            <p>Your appointment has been cancelled.</p>
            <ul>
              <li><strong>Doctor:</strong> ${doctorName}</li>
              <li><strong>Date:</strong> ${date}</li>
              <li><strong>Time:</strong> ${time}</li>
              ${reason ? `<li><strong>Reason:</strong> ${reason}</li>` : ''}
            </ul>
            <p>To reschedule, please book a new appointment.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/appointments/book" class="btn">Book New Appointment</a>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} MedVista Hospital. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
}
