"use client";

import { useState, useMemo } from "react";

const allBills = [
  { id: "BILL-001", patient: "Alice Johnson", date: "2024-01-15", items: ["Consultation", "Blood Test", "ECG"], total: 450, paid: 450, status: "paid", method: "Credit Card" },
  { id: "BILL-002", patient: "Bob Williams", date: "2024-01-15", items: ["Surgery", "Anesthesia", "Room (3 days)"], total: 12500, paid: 5000, status: "partial", method: "Insurance" },
  { id: "BILL-003", patient: "Carol Davis", date: "2024-01-14", items: ["Consultation", "X-Ray", "Medication"], total: 380, paid: 0, status: "unpaid", method: "-" },
  { id: "BILL-004", patient: "David Brown", date: "2024-01-14", items: ["Emergency Visit", "CT Scan", "IV Drip"], total: 2200, paid: 2200, status: "paid", method: "Insurance" },
  { id: "BILL-005", patient: "Eva Martinez", date: "2024-01-13", items: ["Consultation", "MRI", "Physical Therapy (5 sessions)"], total: 3800, paid: 3800, status: "paid", method: "Bank Transfer" },
  { id: "BILL-006", patient: "Frank Wilson", date: "2024-01-13", items: ["Consultation", "Lab Work"], total: 290, paid: 290, status: "paid", method: "Cash" },
  { id: "BILL-007", patient: "Grace Taylor", date: "2024-01-12", items: ["Dental Cleaning", "X-Ray"], total: 350, paid: 0, status: "overdue", method: "-" },
  { id: "BILL-008", patient: "Henry Anderson", date: "2024-01-12", items: ["Consultation", "Prescription"], total: 180, paid: 180, status: "paid", method: "Credit Card" },
  { id: "BILL-009", patient: "Ivy Thomas", date: "2024-01-11", items: ["Surgery", "Post-Op Care", "Room (5 days)"], total: 18500, paid: 10000, status: "partial", method: "Insurance" },
  { id: "BILL-010", patient: "Jack Robinson", date: "2024-01-11", items: ["Consultation", "Blood Test", "Vaccination"], total: 320, paid: 320, status: "paid", method: "Credit Card" },
  { id: "BILL-011", patient: "Karen White", date: "2024-01-10", items: ["Consultation", "Ultrasound"], total: 420, paid: 0, status: "unpaid", method: "-" },
  { id: "BILL-012", patient: "Leo Harris", date: "2024-01-10", items: ["Physical Therapy (10 sessions)"], total: 1200, paid: 1200, status: "paid", method: "Bank Transfer" },
];

const revenueByMonth = [
  { month: "Jan", amount: 78000 },
  { month: "Feb", amount: 65000 },
  { month: "Mar", amount: 82000 },
  { month: "Apr", amount: 71000 },
  { month: "May", amount: 89000 },
  { month: "Jun", amount: 76000 },
  { month: "Jul", amount: 95000 },
  { month: "Aug", amount: 102000 },
  { month: "Sep", amount: 88000 },
  { month: "Oct", amount: 110000 },
  { month: "Nov", amount: 98000 },
  { month: "Dec", amount: 125000 },
];

const statusColors: Record<string, string> = {
  paid: "bg-green-100 text-green-700",
  partial: "bg-yellow-100 text-yellow-700",
  unpaid: "bg-red-100 text-red-700",
  overdue: "bg-orange-100 text-orange-700",
};

const statsCards = [
  { label: "Total Revenue", value: "$1,092,000", change: "+18.2%", trend: "up", icon: "💰" },
  { label: "Pending Payments", value: "$34,500", change: "-5.3%", trend: "down", icon: "⏳" },
  { label: "Paid This Month", value: "$125,000", change: "+22.1%", trend: "up", icon: "✅" },
  { label: "Overdue Bills", value: "8", change: "+2", trend: "up", icon: "⚠️" },
];

function RevenueChart({ data }: { data: typeof revenueByMonth }) {
  const max = Math.max(...data.map((d) => d.amount));
  return (
    <div className="mt-4">
      <div className="flex items-end gap-2 h-40">
        {data.map((d) => (
          <div key={d.month} className="flex flex-col items-center flex-1 gap-1">
            <div className="text-xs font-medium text-gray-600">${(d.amount / 1000).toFixed(0)}k</div>
            <div
              className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md transition-all duration-500"
              style={{ height: `${(d.amount / max) * 100}%` }}
            />
            <div className="text-xs text-gray-400">{d.month}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BillingPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [createDialog, setCreateDialog] = useState(false);
  const [newBill, setNewBill] = useState({ patient: "", items: "", amount: "" });
  const itemsPerPage = 8;

  const filtered = useMemo(() => {
    return allBills.filter((b) => {
      if (filterStatus !== "all" && b.status !== filterStatus) return false;
      if (searchQuery && !b.patient.toLowerCase().includes(searchQuery.toLowerCase()) && !b.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [filterStatus, searchQuery]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Revenue</h1>
          <p className="text-gray-500 text-sm">Track payments, invoices, and revenue.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition flex items-center gap-2">
            📥 Export CSV
          </button>
          <button
            onClick={() => setCreateDialog(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            + Create Bill
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{card.icon}</span>
              <span className={`text-sm font-medium ${card.trend === "down" && card.label !== "Pending Payments" ? "text-green-600" : card.trend === "up" && card.label === "Overdue Bills" ? "text-red-600" : "text-green-600"}`}>
                {card.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
            <div className="text-sm text-gray-500 mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Revenue by Month</h3>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600">
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>
        <RevenueChart data={revenueByMonth} />
      </div>

      {/* Bills Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">All Bills</h3>
            <div className="flex gap-2">
              {["all", "paid", "partial", "unpaid", "overdue"].map((f) => (
                <button
                  key={f}
                  onClick={() => { setFilterStatus(f); setCurrentPage(1); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition ${
                    filterStatus === f ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3">
            <input
              type="text"
              placeholder="Search by patient or bill ID..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase border-b border-gray-100">
                <th className="px-6 py-3">Bill ID</th>
                <th className="px-6 py-3">Patient</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Items</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Paid</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Method</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((bill) => (
                <tr key={bill.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{bill.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{bill.patient}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{bill.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-[200px] truncate" title={bill.items.join(", ")}>
                    {bill.items.join(", ")}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">${bill.total.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">${bill.paid.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[bill.status]}`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{bill.method}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-sm text-blue-600 hover:text-blue-800">View</button>
                      <button className="text-sm text-gray-400 hover:text-gray-600">Print</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} bills</span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg ${currentPage === page ? "bg-blue-600 text-white" : "border border-gray-200 hover:bg-gray-50"}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Create Bill Dialog */}
      {createDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Create New Bill</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                <input
                  type="text"
                  value={newBill.patient}
                  onChange={(e) => setNewBill({ ...newBill, patient: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter patient name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Services / Items</label>
                <textarea
                  value={newBill.items}
                  onChange={(e) => setNewBill({ ...newBill, items: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none h-20"
                  placeholder="e.g. Consultation, Blood Test, X-Ray"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount ($)</label>
                <input
                  type="number"
                  value={newBill.amount}
                  onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setCreateDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => setCreateDialog(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                Create Bill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
