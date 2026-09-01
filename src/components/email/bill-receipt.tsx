interface BillItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface BillReceiptProps {
  patientName: string;
  billNumber: string;
  billDate: string;
  dueDate: string;
  hospitalName: string;
  hospitalAddress: string;
  items: BillItem[];
  subtotal: number;
  tax: number;
  insuranceCoverage?: number;
  totalAmount: number;
  amountPaid: number;
  balanceDue: number;
  paymentStatus: 'paid' | 'partial' | 'pending';
  paymentUrl: string;
}

export function generateBillReceipt({
  patientName,
  billNumber,
  billDate,
  dueDate,
  hospitalName,
  hospitalAddress,
  items,
  subtotal,
  tax,
  insuranceCoverage = 0,
  totalAmount,
  amountPaid,
  balanceDue,
  paymentStatus,
  paymentUrl,
}: BillReceiptProps): string {
  const getStatusColor = () => {
    switch (paymentStatus) {
      case 'paid':
        return '#28a745';
      case 'partial':
        return '#ffc107';
      case 'pending':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = () => {
    switch (paymentStatus) {
      case 'paid':
        return 'PAID IN FULL';
      case 'partial':
        return 'PARTIAL PAYMENT';
      case 'pending':
        return 'PAYMENT PENDING';
      default:
        return 'UNKNOWN';
    }
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bill Receipt - ${billNumber}</title>
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
          background: linear-gradient(135deg, #6f42c1, #e83e8c);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .content {
          padding: 30px;
        }
        .bill-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
          flex-wrap: wrap;
        }
        .bill-detail {
          margin-bottom: 10px;
        }
        .bill-detail-label {
          font-size: 12px;
          color: #666;
          text-transform: uppercase;
        }
        .bill-detail-value {
          font-weight: bold;
          color: #333;
        }
        .status-badge {
          display: inline-block;
          padding: 5px 15px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 14px;
          color: white;
          background-color: ${getStatusColor()};
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .items-table th {
          background-color: #f8f9fa;
          padding: 12px;
          text-align: left;
          border-bottom: 2px solid #dee2e6;
          font-size: 14px;
          color: #555;
        }
        .items-table td {
          padding: 12px;
          border-bottom: 1px solid #dee2e6;
        }
        .items-table tr:last-child td {
          border-bottom: none;
        }
        .summary {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .summary-row.total {
          font-size: 18px;
          font-weight: bold;
          border-top: 2px solid #dee2e6;
          padding-top: 10px;
          margin-top: 10px;
        }
        .summary-row.balance {
          color: ${getStatusColor()};
          font-size: 20px;
          font-weight: bold;
        }
        .payment-button {
          display: block;
          width: 100%;
          background-color: #0077b6;
          color: white;
          padding: 15px;
          text-align: center;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          font-size: 16px;
          margin: 20px 0;
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
          <h1>Bill Receipt</h1>
          <p>${hospitalName}</p>
        </div>
        
        <div class="content">
          <p>Dear ${patientName},</p>
          
          <p>Thank you for choosing ${hospitalName}. Please find your bill details below.</p>

          <div class="bill-info">
            <div>
              <div class="bill-detail">
                <div class="bill-detail-label">Bill Number</div>
                <div class="bill-detail-value">#${billNumber}</div>
              </div>
              <div class="bill-detail">
                <div class="bill-detail-label">Bill Date</div>
                <div class="bill-detail-value">${billDate}</div>
              </div>
            </div>
            <div>
              <div class="bill-detail">
                <div class="bill-detail-label">Due Date</div>
                <div class="bill-detail-value">${dueDate}</div>
              </div>
              <div class="bill-detail">
                <div class="bill-detail-label">Status</div>
                <div class="bill-detail-value">
                  <span class="status-badge">${getStatusText()}</span>
                </div>
              </div>
            </div>
          </div>

          <table class="items-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr>
                  <td>${item.description}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.unitPrice.toFixed(2)}</td>
                  <td>$${item.total.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="summary">
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
              <span>Tax:</span>
              <span>$${tax.toFixed(2)}</span>
            </div>
            ${insuranceCoverage > 0 ? `
              <div class="summary-row">
                <span>Insurance Coverage:</span>
                <span>-$${insuranceCoverage.toFixed(2)}</span>
              </div>
            ` : ''}
            <div class="summary-row total">
              <span>Total Amount:</span>
              <span>$${totalAmount.toFixed(2)}</span>
            </div>
            <div class="summary-row">
              <span>Amount Paid:</span>
              <span>$${amountPaid.toFixed(2)}</span>
            </div>
            <div class="summary-row balance">
              <span>Balance Due:</span>
              <span>$${balanceDue.toFixed(2)}</span>
            </div>
          </div>

          ${balanceDue > 0 ? `
            <a href="${paymentUrl}" class="payment-button">Pay Now</a>
          ` : ''}

          <p>
            If you have any questions about your bill, please contact our billing department 
            at billing@${hospitalName.toLowerCase().replace(/\s+/g, '')}.com or call (555) 123-4567.
          </p>
        </div>

        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ${hospitalName}. All rights reserved.</p>
          <p>
            <a href="#">Billing FAQ</a> | 
            <a href="#">Payment Plans</a> | 
            <a href="#">Contact Billing</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export default generateBillReceipt;
