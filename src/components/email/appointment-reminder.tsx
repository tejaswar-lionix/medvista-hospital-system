interface AppointmentReminderProps {
  patientName: string;
  appointmentDate: string;
  appointmentTime: string;
  doctorName: string;
  department: string;
  hospitalName: string;
  hospitalAddress: string;
  reminderType: '24hours' | '1hour' | '1week';
  preparationChecklist?: string[];
}

export function generateAppointmentReminder({
  patientName,
  appointmentDate,
  appointmentTime,
  doctorName,
  department,
  hospitalName,
  hospitalAddress,
  reminderType,
  preparationChecklist = [],
}: AppointmentReminderProps): string {
  const getReminderMessage = () => {
    switch (reminderType) {
      case '1week':
        return 'Your appointment is coming up in one week.';
      case '24hours':
        return 'Your appointment is tomorrow!';
      case '1hour':
        return 'Your appointment is in 1 hour!';
      default:
        return 'You have an upcoming appointment.';
    }
  };

  const getUrgencyColor = () => {
    switch (reminderType) {
      case '1hour':
        return '#dc3545';
      case '24hours':
        return '#ffc107';
      case '1week':
        return '#28a745';
      default:
        return '#0077b6';
    }
  };

  const defaultChecklist = [
    'Insurance card and photo ID',
    'List of current medications',
    'Previous medical records (if applicable)',
    'Comfortable clothing',
    'Questions for your doctor',
  ];

  const checklist = preparationChecklist.length > 0 
    ? preparationChecklist 
    : defaultChecklist;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Appointment Reminder</title>
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
          background: linear-gradient(135deg, ${getUrgencyColor()}, ${getUrgencyColor()}88);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .reminder-icon {
          font-size: 48px;
          margin-bottom: 15px;
        }
        .content {
          padding: 30px;
        }
        .reminder-message {
          font-size: 18px;
          color: #555;
          text-align: center;
          margin-bottom: 25px;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 8px;
        }
        .appointment-card {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          border-left: 4px solid ${getUrgencyColor()};
        }
        .appointment-card h3 {
          color: ${getUrgencyColor()};
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
        .checklist {
          background-color: #e8f8e8;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .checklist h4 {
          color: #28a745;
          margin-top: 0;
        }
        .checklist-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        .checkbox {
          width: 20px;
          height: 20px;
          border: 2px solid #28a745;
          border-radius: 4px;
          margin-right: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #28a745;
          font-weight: bold;
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
          <div class="reminder-icon">⏰</div>
          <h1>Appointment Reminder</h1>
          <p>${hospitalName}</p>
        </div>
        
        <div class="content">
          <p>Dear ${patientName},</p>
          
          <div class="reminder-message">
            ${getReminderMessage()}
          </div>

          <div class="appointment-card">
            <h3>Your Appointment</h3>
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
          </div>

          <div class="checklist">
            <h4>Don't Forget to Bring:</h4>
            ${checklist.map(item => `
              <div class="checklist-item">
                <div class="checkbox">✓</div>
                <span>${item}</span>
              </div>
            `).join('')}
          </div>

          <div class="directions">
            <h4>Hospital Location</h4>
            <p>${hospitalAddress}</p>
            <p>
              <a href="https://maps.google.com/?q=${encodeURIComponent(hospitalAddress)}" 
                 style="color: #0077b6;">
                View Map & Directions →
              </a>
            </p>
          </div>

          <p>
            Please arrive 15 minutes before your scheduled appointment time. 
            If you need to cancel or reschedule, please contact us at least 24 hours in advance.
          </p>
        </div>

        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ${hospitalName}. All rights reserved.</p>
          <p>To manage your notifications, visit your account settings.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export default generateAppointmentReminder;
