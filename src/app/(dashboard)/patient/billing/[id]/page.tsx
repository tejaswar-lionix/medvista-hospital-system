"use client";

import { useState } from "react";
import Link from "next/link";

const billData = {
  id: "INV001",
  date: "2026-01-15",
  dueDate: "2026-02-15",
  patient: {
    id: "PAT001",
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    email: "john.doe@email.com",
    address: "123 Main Street, New York, NY 10001",
    insuranceProvider: "Blue Cross Blue Shield",
    insuranceId: "BCBS-12345678",
  },
  appointmentId: "APT001",
  department: "General Medicine",
  doctor: "Dr. Sarah Johnson",
};

const lineItems = [
  { id: 1, description: "Consultation Fee - Dr. Sarah Johnson", category: "Consultation", quantity: 1, unitPrice: 150.0, total: 150.0 },
  { id: 2, description: "Blood Pressure Monitoring", category: "Diagnostic", quantity: 1, unitPrice: 25.0, total: 25.0 },
  { id: 3, description: "ECG Test", category: "Diagnostic", quantity: 1, unitPrice: 75.0, total: 75.0 },
  { id: 4, description: "Atorvastatin 20mg (90 tablets)", category: "Pharmacy", quantity: 90, unitPrice: 0.85, total: 76.5 },
  { id: 5, description: "Vitamin D3 1000 IU (90 softgels)", category: "Pharmacy", quantity: 90, unitPrice: 0.45, total: 40.5 },
  { id: 6, description: "Lab Work - Lipid Panel", category: "Laboratory", quantity: 1, unitPrice: 85.0, total: 85.0 },
  { id: 7, description: "Lab Work - Complete Blood Count", category: "Laboratory", quantity: 1, unitPrice: 65.0, total: 65.0 },
];

const paymentHistory = [
  {
    id: "PAY001",
    date: "2026-01-15",
    amount: 250.0,
    method: "Credit Card",
    cardLast4: "4242",
    status: "completed",
    reference: "TXN-20260115-001",
  },
  {
    id: "PAY002",
    date: "2026-01-20",
    amount: 150.0,
    method: "Insurance Claim",
    cardLast4: null,
    status: "completed",
    reference: "INS-BCBS-20260120-001",
  },
  {
    id: "PAY003",
    date: "2026-02-01",
    amount: 66.5,
    method: "Bank Transfer",
    cardLast4: null,
    status: "pending",
    reference: "BT-20260201-001",
  },
];

const taxRate = 0.08;
const discountPercentage = 5;

export default function BillDetailPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
  const discount = subtotal * (discountPercentage / 100);
  const taxableAmount = subtotal - discount;
  const tax = taxableAmount * taxRate;
  const total = taxableAmount + tax;

  const totalPaid = paymentHistory
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const balance = total - totalPaid;

  const handleDownloadReceipt = () => {
    const content = `
INVOICE RECEIPT
=====================================
Invoice Number: ${billData.id}
Date: ${billData.date}
Due Date: ${billData.dueDate}

BILL TO:
${billData.patient.name}
${billData.patient.address}
${billData.patient.phone}

SERVICES:
${lineItems.map(item => `${item.description} - ${item.quantity} x $${item.unitPrice.toFixed(2)} = $${item.total.toFixed(2)}`).join('\n')}

Subtotal: $${subtotal.toFixed(2)}
Discount (${discountPercentage}%): -$${discount.toFixed(2)}
Tax (${(taxRate * 100).toFixed(0)}%): +$${tax.toFixed(2)}
=====================================
TOTAL: $${total.toFixed(2)}

Amount Paid: $${totalPaid.toFixed(2)}
Balance Due: $${balance.toFixed(2)}

Thank you for your payment!
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${billData.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleMakePayment = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowPaymentModal(false);
    alert("Payment processed successfully!");
  };

  const categoryColors: Record<string, string> = {
    Consultation: "bg-blue-100 text-blue-700",
    Diagnostic: "bg-purple-100 text-purple-700",
    Pharmacy: "bg-green-100 text-green-700",
    Laboratory: "bg-orange-100 text-orange-700",
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link href="/patient/billing" className="text-blue-600 hover:text-blue-800 text-sm">
          ← Back to Billing
        </Link>
        <div className="flex justify-between items-start mt-2">
          <h1 className="text-2xl font-bold">Bill Details</h1>
          <div className="flex gap-2">
            <button
              onClick={handleDownloadReceipt}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
            >
              ⬇ Download Receipt
            </button>
            {balance > 0 && (
              <button
                onClick={() => setShowPaymentModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
              >
                Make Payment
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bill Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">Invoice #{billData.id}</h2>
            <p className="text-gray-500">Generated on {billData.date}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Due Date</p>
            <p className="font-semibold">{billData.dueDate}</p>
            <span className={`mt-1 inline-block px-3 py-1 text-xs rounded-full font-medium ${
              balance <= 0 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            }`}>
              {balance <= 0 ? "Paid in Full" : "Pending Balance"}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500">Patient</p>
            <p className="font-medium text-sm">{billData.patient.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Department</p>
            <p className="font-medium text-sm">{billData.department}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Doctor</p>
            <p className="font-medium text-sm">{billData.doctor}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Appointment</p>
            <p className="font-medium text-sm">{billData.appointmentId}</p>
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Itemized Charges</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-medium text-gray-500">Description</th>
                <th className="text-left py-3 px-2 font-medium text-gray-500">Category</th>
                <th className="text-right py-3 px-2 font-medium text-gray-500">Qty</th>
                <th className="text-right py-3 px-2 font-medium text-gray-500">Unit Price</th>
                <th className="text-right py-3 px-2 font-medium text-gray-500">Total</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2">{item.description}</td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${categoryColors[item.category] || "bg-gray-100 text-gray-700"}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right">{item.quantity}</td>
                  <td className="py-3 px-2 text-right">${item.unitPrice.toFixed(2)}</td>
                  <td className="py-3 px-2 text-right font-medium">${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="mt-6 flex justify-end">
          <div className="w-72 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Discount ({discountPercentage}%)</span>
              <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tax ({(taxRate * 100).toFixed(0)}%)</span>
              <span className="font-medium">+${tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-lg">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Amount Paid</span>
              <span className="font-medium text-green-600">${totalPaid.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Balance Due</span>
              <span className={`font-bold ${balance > 0 ? "text-red-600" : "text-green-600"}`}>
                ${balance.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Payment History</h2>
        {paymentHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Date</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Method</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Reference</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-500">Amount</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">{payment.date}</td>
                    <td className="py-3 px-2">
                      {payment.method}
                      {payment.cardLast4 && (
                        <span className="text-gray-400 ml-1">****{payment.cardLast4}</span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-gray-500 text-xs">{payment.reference}</td>
                    <td className="py-3 px-2 text-right font-medium">${payment.amount.toFixed(2)}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        payment.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No payments recorded</p>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Make a Payment</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Balance Due</p>
                <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="credit">Credit Card</option>
                  <option value="debit">Debit Card</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="insurance">Insurance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                <input
                  type="number"
                  defaultValue={balance}
                  min="0.01"
                  max={balance}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleMakePayment}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {isProcessing ? "Processing..." : "Confirm Payment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
