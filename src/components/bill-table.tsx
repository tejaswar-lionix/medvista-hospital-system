import { Eye, Download, MoreHorizontal } from "lucide-react";

interface BillItem {
  id: string;
  patientName: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue" | "insurance";
  items: string[];
}

const statusStyles = {
  paid: "bg-green-50 text-green-700",
  pending: "bg-yellow-50 text-yellow-700",
  overdue: "bg-red-50 text-red-700",
  insurance: "bg-blue-50 text-blue-700",
};

const bills: BillItem[] = [
  {
    id: "INV-001",
    patientName: "John Smith",
    date: "2025-01-15",
    amount: 1250.0,
    status: "paid",
    items: ["Consultation", "Blood Test", "X-Ray"],
  },
  {
    id: "INV-002",
    patientName: "Emily Davis",
    date: "2025-01-14",
    amount: 890.0,
    status: "pending",
    items: ["Consultation", "MRI Scan"],
  },
  {
    id: "INV-003",
    patientName: "Michael Brown",
    date: "2025-01-13",
    amount: 2100.0,
    status: "overdue",
    items: ["Surgery", "Medication", "Room Charge"],
  },
  {
    id: "INV-004",
    patientName: "Sarah Wilson",
    date: "2025-01-12",
    amount: 450.0,
    status: "insurance",
    items: ["Consultation", "Lab Work"],
  },
];

export default function BillTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Invoice
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Patient
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Date
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Items
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Amount
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Status
              </th>
              <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bills.map((bill) => (
              <tr key={bill.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">{bill.id}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">{bill.patientName}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">
                    {new Date(bill.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {bill.items.slice(0, 2).map((item) => (
                      <span
                        key={item}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                      >
                        {item}
                      </span>
                    ))}
                    {bill.items.length > 2 && (
                      <span className="text-xs text-gray-400">+{bill.items.length - 2}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-gray-900">
                    ${bill.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[bill.status]}`}
                  >
                    {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
