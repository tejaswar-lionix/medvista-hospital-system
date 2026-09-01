"use client";

import { useState } from "react";

const bills = [
  {
    id: "INV-2026-0892",
    date: "2026-08-28",
    doctor: "Dr. Sarah Mitchell",
    department: "Cardiology",
    status: "unpaid",
    total: 350.0,
    items: [
      { description: "Consultation Fee", amount: 150.0 },
      { description: "ECG Test", amount: 100.0 },
      { description: "Blood Pressure Monitoring", amount: 50.0 },
      { description: "Lab Work (Cholesterol Panel)", amount: 50.0 },
    ],
  },
  {
    id: "INV-2026-0845",
    date: "2026-08-15",
    doctor: "Dr. Emily Carter",
    department: "Dermatology",
    status: "paid",
    total: 225.0,
    items: [
      { description: "Consultation Fee", amount: 125.0 },
      { description: "Patch Test", amount: 75.0 },
      { description: "Topical Medication", amount: 25.0 },
    ],
  },
  {
    id: "INV-2026-0712",
    date: "2026-07-22",
    doctor: "Dr. Michael Brown",
    department: "Orthopedics",
    status: "paid",
    total: 480.0,
    items: [
      { description: "Consultation Fee", amount: 150.0 },
      { description: "X-Ray (Lumbar Spine)", amount: 180.0 },
      { description: "Physical Therapy Session", amount: 150.0 },
    ],
  },
  {
    id: "INV-2026-0601",
    date: "2026-06-10",
    doctor: "Dr. James Wilson",
    department: "General Medicine",
    status: "paid",
    total: 175.0,
    items: [
      { description: "Consultation Fee", amount: 100.0 },
      { description: "Allergy Panel Test", amount: 75.0 },
    ],
  },
];

export default function BillingPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [payingId, setPayingId] = useState<string | null>(null);

  const handlePay = (id: string) => {
    setPayingId(id);
  };

  const confirmPayment = (id: string) => {
    alert(`Payment processed for ${id}. Thank you!`);
    setPayingId(null);
  };

  const totalUnpaid = bills
    .filter((b) => b.status === "unpaid")
    .reduce((sum, b) => sum + b.total, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bills</h1>

      {totalUnpaid > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-amber-700 font-medium">
              Outstanding Balance
            </p>
            <p className="text-2xl font-bold text-amber-800">
              ${totalUnpaid.toFixed(2)}
            </p>
          </div>
          <span className="text-amber-600 text-3xl">⚠️</span>
        </div>
      )}

      <div className="space-y-4">
        {bills.map((bill) => (
          <div
            key={bill.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() =>
                setExpandedId(expandedId === bill.id ? null : bill.id)
              }
              className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-medium text-gray-900">{bill.id}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      bill.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {bill.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {bill.doctor} · {bill.department} ·{" "}
                  {new Date(bill.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-lg font-bold text-gray-900">
                  ${bill.total.toFixed(2)}
                </p>
                <span
                  className={`transition-transform ${
                    expandedId === bill.id ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
            </button>

            {expandedId === bill.id && (
              <div className="px-5 pb-4 border-t border-gray-100 pt-3">
                <table className="w-full text-sm mb-4">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 text-xs text-gray-400 font-medium">
                        Description
                      </th>
                      <th className="text-right py-2 text-xs text-gray-400 font-medium">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bill.items.map((item, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0">
                        <td className="py-2 text-gray-700">{item.description}</td>
                        <td className="py-2 text-right text-gray-900 font-medium">
                          ${item.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-gray-200">
                      <td className="py-2 font-semibold text-gray-900">Total</td>
                      <td className="py-2 text-right font-bold text-gray-900">
                        ${bill.total.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>

                <div className="flex gap-3">
                  {bill.status === "unpaid" && (
                    <>
                      {payingId === bill.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => confirmPayment(bill.id)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                          >
                            Confirm Payment
                          </button>
                          <button
                            onClick={() => setPayingId(null)}
                            className="border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handlePay(bill.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Pay Now
                        </button>
                      )}
                    </>
                  )}
                  <button className="border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    📥 Download Receipt
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
