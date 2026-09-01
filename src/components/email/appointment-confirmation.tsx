interface AppointmentConfirmationProps {
  patientName: string;
  appointmentDate: string;
  appointmentTime: string;
  doctorName: string;
  department: string;
  hospitalName: string;
  hospitalAddress: string;
  appointmentId: string;
  cancelUrl: string;
  rescheduleUrl: string;
  preparationInstructions?: string[];
}

export function generateAppointmentConfirmation({
  patientName,
  appointmentDate,
  appointmentTime,
  doctorName,
  department,
  hospitalName,
  hospitalAddress,
  appointmentId,
  cancelUrl,
  rescheduleUrl,
  preparationInstructions = [],
}: AppointmentConfirmationProps): string {
  const defaultInstructions = [
    'Bring your insurance card and photo ID',
    'Arrive 15 minutes before your appointment time',
    'Bring a list of current medications',
    'Wear comfortable, loose-fitting clothing',
    'Fast for 8 hours if lab work is scheduled',
  ];

  const instructions = preparationInstructions.length > 0 
    ? preparationInstructions 
    : defaultInstructions;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Appointment Confirmation</title>
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
          background: linear-gradient(135deg, #28a745, #20c997);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .success-icon {
          font-size: 48px;
          margin-bottom: 15px;
        }
        .content {
          padding: 30px;
        }
        .appointment-card {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          border-left: 4px solid #28a745;
        }
        .appointment-card h3 {
          color: #28a745;
          margin-top: 0;
        }
        .detail-row {
          display: flex;
          margin-bottom: 10px;
        }
        .detail-label {
          font-weight: bold;
          color: #555;
          width: 120px;
        }
        .detail-value {
          color: #333;
        }
        .directions {
          background-color: #e8f4f8;
          border-radius: 8px;
          padding: 15px;
          margin: 20px 0;
        }
        .directions h4 {
          color: #0077b6;
          margin-top: 0;
        }
        .preparation {
          background-color: #fff3cd;
          border-radius: 8px;
          padding: 15px;
          margin: 20px 0;
        }
        .preparation h4 {
          color: #856404;
          margin-top: 0;
        }
        .preparation ul {
          margin: 10px 0;
          padding-left: 20px;
        }
        .preparation li {
          margin-bottom: 8px;
          color: #856404;
        }
        .button-container {
          display: flex;
          justify-content: space-between;
          margin: 25px 0;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          text-align: center;
        }
        .cancel-button {
          background-color: #dc3545;
          color: white;
        }
        .reschedule-button {
          background-color: #0077b6;
          color: white;
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
          <div class="success-icon">✓</div>
          <h1>Appointment Confirmed!</h1>
          <p>Your appointment has been successfully scheduled</p>
        </div>
        
        <div class="content">
          <p>Dear ${patientName},</p>
          
          <p>We're pleased to confirm your upcoming appointment at ${hospitalName}.</p>

          <div class="appointment-card">
            <h3>Appointment Details</h3>
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span class="detail-value">${appointmentDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Time:</span>
              <span class="detail-value">${appointmentTime}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Doctor:</span>
              <span class="detail-value">Dr. ${doctorName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Department:</span>
              <span class="detail-value">${department}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Booking ID:</span>
              <span class="detail-value">#${appointmentId}</span>
            </div>
          </div>

          <div class="directions">
            <h4>Hospital Location</h4>
            <p>${hospitalAddress}</p>
            <p>
              <a href="https://maps.google.com/?q=${encodeURIComponent(hospitalAddress)}" 
                 style="color: #0077b6;">
                Get Directions →
              </a>
            </p>
          </div>

          <div class="preparation">
            <h4>Important Instructions</h4>
            <ul>
              ${instructions.map(instruction => `<li>${instruction}</li>`).join('\n              ')}
            </ul>
          </div>

          <div class="button-container">
            <a href="${cancelUrl}" class="button cancel-button">Cancel Appointment</a>
            <a href="${rescheduleUrl}" class="button reschedule-button">Reschedule</a>
          </div>

          <p>
            If you have any questions or need to make changes, please don't hesitate to 
            contact our support team.
          </p>
        </div>

        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ${hospitalName}. All rights reserved.</p>
          <p>This is an automated confirmation email. Please do not reply directly.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export default generateAppointmentConfirmation;
