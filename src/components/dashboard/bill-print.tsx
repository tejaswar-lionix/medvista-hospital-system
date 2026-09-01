import { useRef } from 'react';

interface BillData {
  billId: string;
  date: string;
  dueDate: string;
  hospital: {
    name: string;
    address: string;
    phone: string;
    taxId: string;
  };
  patient: {
    name: string;
    patientId: string;
    age: number;
    gender: string;
    address: string;
    phone: string;
    insuranceProvider?: string;
    insurancePolicy?: string;
  };
  lineItems: {
    id: string;
    description: string;
    category: 'consultation' | 'procedure' | 'medication' | 'lab' | 'room' | 'other';
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discount: number;
  total: number;
  amountPaid: number;
  balanceDue: number;
  paymentMethod?: string;
  paymentDate?: string;
  notes?: string;
}

interface BillPrintProps {
  bill: BillData;
}

export function BillPrint({ bill }: BillPrintProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Bill - ${bill.billId}</title>
          <style>
            body { font-family: 'Arial', sans-serif; margin: 40px; color: #000; }
            .header { text-align: center; border-bottom: 3px double #000; padding-bottom: 15px; margin-bottom: 20px; }
            .hospital-name { font-size: 26px; font-weight: bold; color: #1a365d; }
            .hospital-info { font-size: 12px; color: #555; margin-top: 5px; }
            .bill-title { font-size: 20px; font-weight: bold; text-align: center; margin: 20px 0; padding: 10px; background: #f0f0f0; border: 1px solid #ccc; }
            .section { margin-bottom: 20px; }
            .section-title { font-weight: bold; font-size: 14px; color: #1a365d; border-bottom: 2px solid #1a365d; padding-bottom: 5px; margin-bottom: 10px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px; }
            .info-item span:first-child { color: #555; display: inline-block; width: 120px; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 13px; }
            th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
            th { background: #1a365d; color: white; font-weight: bold; }
            tr:nth-child(even) { background: #f9f9f9; }
            .totals { display: flex; justify-content: flex-end; margin-top: 20px; }
            .totals-table { width: 300px; }
            .totals-table td { border: none; padding: 5px 10px; }
            .totals-table td:last-child { text-align: right; font-weight: bold; }
            .grand-total { font-size: 16px; border-top: 2px solid #000; padding-top: 10px; }
            .payment-info { margin-top: 20px; padding: 15px; background: #e6f3e6; border: 1px solid #4caf50; border-radius: 5px; }
            .footer { margin-top: 30px; text-align: center; font-size: 11px; color: #666; border-top: 1px solid #ccc; padding-top: 15px; }
            @media print { body { margin: 20px; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="hospital-name">${bill.hospital.name}</div>
            <div class="hospital-info">${bill.hospital.address}</div>
            <div class="hospital-info">Phone: ${bill.hospital.phone} | Tax ID: ${bill.hospital.taxId}</div>
          </div>
          <div class="bill-title">INVOICE / BILL</div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <div>
              <div style="font-size: 13px;"><strong>Bill #:</strong> ${bill.billId}</div>
              <div style="font-size: 13px;"><strong>Date:</strong> ${new Date(bill.date).toLocaleDateString()}</div>
              <div style="font-size: 13px;"><strong>Due Date:</strong> ${new Date(bill.dueDate).toLocaleDateString()}</div>
            </div>
          </div>
          <div class="section">
            <div class="section-title">Patient Information</div>
            <div class="info-grid">
              <div><span>Patient Name:</span> <strong>${bill.patient.name}</strong></div>
              <div><span>Patient ID:</span> ${bill.patient.patientId}</div>
              <div><span>Age/Gender:</span> ${bill.patient.age} / ${bill.patient.gender}</div>
              <div><span>Phone:</span> ${bill.patient.phone}</div>
              <div><span>Address:</span> ${bill.patient.address}</div>
              ${bill.patient.insuranceProvider ? `<div><span>Insurance:</span> ${bill.patient.insuranceProvider} (${bill.patient.insurancePolicy})</div>` : ''}
            </div>
          </div>
          <div class="section">
            <div class="section-title">Bill Details</div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${bill.lineItems.map((item, i) => `
                  <tr>
                    <td>${i + 1}</td>
                    <td>${item.description}</td>
                    <td style="text-transform: capitalize;">${item.category}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.unitPrice.toFixed(2)}</td>
                    <td>$${item.total.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="totals">
            <table class="totals-table">
              <tr><td>Subtotal:</td><td>$${bill.subtotal.toFixed(2)}</td></tr>
              <tr><td>Tax (${bill.taxRate}%):</td><td>$${bill.taxAmount.toFixed(2)}</td></tr>
              ${bill.discount > 0 ? `<tr><td>Discount:</td><td>-$${bill.discount.toFixed(2)}</td></tr>` : ''}
              <tr class="grand-total"><td><strong>Total:</strong></td><td><strong>$${bill.total.toFixed(2)}</strong></td></tr>
              <tr><td>Amount Paid:</td><td style="color: green;">$${bill.amountPaid.toFixed(2)}</td></tr>
              <tr><td><strong>Balance Due:</strong></td><td style="color: ${bill.balanceDue > 0 ? 'red' : 'green'};"><strong>$${bill.balanceDue.toFixed(2)}</strong></td></tr>
            </table>
          </div>
          ${bill.amountPaid > 0 ? `
          <div class="payment-info">
            <strong>Payment Information</strong><br>
            Method: ${bill.paymentMethod || 'N/A'}<br>
            Date: ${bill.paymentDate ? new Date(bill.paymentDate).toLocaleDateString() : 'N/A'}
          </div>
          ` : ''}
          ${bill.notes ? `
          <div class="section" style="margin-top: 20px;">
            <div class="section-title">Notes</div>
            <p style="font-size: 13px;">${bill.notes}</p>
          </div>
          ` : ''}
          <div class="footer">
            <p>Thank you for choosing ${bill.hospital.name}</p>
            <p>For questions regarding this bill, please contact ${bill.hospital.phone}</p>
            <p style="margin-top: 10px; font-size: 10px;">This is a computer-generated document.</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      consultation: 'bg-blue-100 text-blue-800',
      procedure: 'bg-purple-100 text-purple-800',
      medication: 'bg-green-100 text-green-800',
      lab: 'bg-yellow-100 text-yellow-800',
      room: 'bg-indigo-100 text-indigo-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Bill Preview</h3>
        <button onClick={handlePrint} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          Print Bill
        </button>
      </div>

      <div ref={printRef} className="p-8 max-w-4xl mx-auto">
        <div className="text-center border-b-2 border-double border-gray-900 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-blue-900">{bill.hospital.name}</h1>
          <p className="text-sm text-gray-600 mt-1">{bill.hospital.address}</p>
          <p className="text-sm text-gray-600">Phone: {bill.hospital.phone} | Tax ID: {bill.hospital.taxId}</p>
        </div>

        <div className="bg-gray-100 border border-gray-300 p-3 text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">INVOICE / BILL</h2>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <div className="text-sm mb-1"><span className="font-semibold">Bill #:</span> {bill.billId}</div>
            <div className="text-sm mb-1"><span className="font-semibold">Date:</span> {new Date(bill.date).toLocaleDateString()}</div>
            <div className="text-sm"><span className="font-semibold">Due Date:</span> <span className="text-red-600">{new Date(bill.dueDate).toLocaleDateString()}</span></div>
          </div>
          <div className="text-right">
            {bill.balanceDue > 0 && <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">Outstanding: ${bill.balanceDue.toFixed(2)}</span>}
            {bill.balanceDue === 0 && <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Paid in Full</span>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div>
            <h4 className="font-semibold text-blue-900 mb-2 pb-1 border-b border-gray-300">Patient Information</h4>
            <p className="text-sm font-medium">{bill.patient.name}</p>
            <p className="text-sm text-gray-600">ID: {bill.patient.patientId}</p>
            <p className="text-sm text-gray-600">{bill.patient.age} yrs / {bill.patient.gender}</p>
            <p className="text-sm text-gray-600">{bill.patient.address}</p>
            <p className="text-sm text-gray-600">Phone: {bill.patient.phone}</p>
          </div>
          {bill.patient.insuranceProvider && (
            <div>
              <h4 className="font-semibold text-blue-900 mb-2 pb-1 border-b border-gray-300">Insurance</h4>
              <p className="text-sm font-medium">{bill.patient.insuranceProvider}</p>
              <p className="text-sm text-gray-600">Policy: {bill.patient.insurancePolicy}</p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-blue-900 mb-3">Bill Items</h4>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="border border-gray-300 px-3 py-2 text-left">#</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Category</th>
                <th className="border border-gray-300 px-3 py-2 text-right">Qty</th>
                <th className="border border-gray-300 px-3 py-2 text-right">Unit Price</th>
                <th className="border border-gray-300 px-3 py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {bill.lineItems.map((item, i) => (
                <tr key={item.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-300 px-3 py-2">{i + 1}</td>
                  <td className="border border-gray-300 px-3 py-2">{item.description}</td>
                  <td className="border border-gray-300 px-3 py-2"><span className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(item.category)}`}>{item.category}</span></td>
                  <td className="border border-gray-300 px-3 py-2 text-right">{item.quantity}</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">${item.unitPrice.toFixed(2)}</td>
                  <td className="border border-gray-300 px-3 py-2 text-right font-medium">${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mb-6">
          <table className="w-72 text-sm">
            <tbody>
              <tr><td className="py-1 text-gray-600">Subtotal:</td><td className="py-1 text-right">${bill.subtotal.toFixed(2)}</td></tr>
              <tr><td className="py-1 text-gray-600">Tax ({bill.taxRate}%):</td><td className="py-1 text-right">${bill.taxAmount.toFixed(2)}</td></tr>
              {bill.discount > 0 && <tr><td className="py-1 text-gray-600">Discount:</td><td className="py-1 text-right text-green-600">-${bill.discount.toFixed(2)}</td></tr>}
              <tr className="border-t-2 border-gray-900"><td className="py-2 font-bold text-lg">Total:</td><td className="py-2 text-right font-bold text-lg">${bill.total.toFixed(2)}</td></tr>
              <tr><td className="py-1 text-gray-600">Amount Paid:</td><td className="py-1 text-right text-green-600">${bill.amountPaid.toFixed(2)}</td></tr>
              <tr><td className="py-2 font-bold text-lg text-red-600">Balance Due:</td><td className="py-2 text-right font-bold text-lg text-red-600">${bill.balanceDue.toFixed(2)}</td></tr>
            </tbody>
          </table>
        </div>

        {bill.amountPaid > 0 && (
          <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-6">
            <h4 className="font-semibold text-green-900 mb-2">Payment Information</h4>
            <p className="text-sm text-green-800">Method: {bill.paymentMethod || 'N/A'}</p>
            <p className="text-sm text-green-800">Date: {bill.paymentDate ? new Date(bill.paymentDate).toLocaleDateString() : 'N/A'}</p>
          </div>
        )}

        {bill.notes && (
          <div className="mb-6 p-3 bg-yellow-50 rounded border border-yellow-200">
            <h4 className="font-semibold text-yellow-900 mb-1">Notes</h4>
            <p className="text-sm text-yellow-800">{bill.notes}</p>
          </div>
        )}

        <div className="text-center text-sm text-gray-500 border-t border-gray-300 pt-4 mt-8">
          <p>Thank you for choosing {bill.hospital.name}</p>
          <p>For questions regarding this bill, please contact {bill.hospital.phone}</p>
        </div>
      </div>
    </div>
  );
}
