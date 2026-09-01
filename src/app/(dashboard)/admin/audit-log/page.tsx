"use client";

import { useState } from "react";

const auditLogData = [
  { id: "LOG001", timestamp: "2026-01-15 10:32:15", user: "Dr. Sarah Johnson", userRole: "doctor", action: "CREATE", resource: "Medical Record", resourceId: "MR001", description: "Created medical record for patient PAT001 (John Doe)", ipAddress: "192.168.1.101", status: "success" },
  { id: "LOG002", timestamp: "2026-01-15 10:28:45", user: "Dr. Sarah Johnson", userRole: "doctor", action: "UPDATE", resource: "Appointment", resourceId: "APT001", description: "Updated appointment status from 'in-progress' to 'completed'", ipAddress: "192.168.1.101", status: "success" },
  { id: "LOG003", timestamp: "2026-01-15 10:15:22", user: "Dr. Sarah Johnson", userRole: "doctor", action: "CREATE", resource: "Prescription", resourceId: "RX001", description: "Added prescription for patient PAT001 - Atorvastatin 20mg", ipAddress: "192.168.1.101", status: "success" },
  { id: "LOG004", timestamp: "2026-01-15 10:05:10", user: "James Wilson", userRole: "receptionist", action: "UPDATE", resource: "Appointment", resourceId: "APT001", description: "Checked in patient PAT001 for appointment", ipAddress: "192.168.1.105", status: "success" },
  { id: "LOG005", timestamp: "2026-01-15 09:45:33", user: "Emily Rodriguez", userRole: "admin", action: "CREATE", resource: "User", resourceId: "USR010", description: "Created new user account for Chris Martin (IT Admin)", ipAddress: "192.168.1.100", status: "success" },
  { id: "LOG006", timestamp: "2026-01-15 09:30:00", user: "Lisa Brown", userRole: "nurse", action: "UPDATE", resource: "Vitals", resourceId: "VIT001", description: "Recorded vitals for patient PAT001 - BP: 128/82, HR: 72", ipAddress: "192.168.1.110", status: "success" },
  { id: "LOG007", timestamp: "2026-01-15 09:15:45", user: "Robert Taylor", userRole: "pharmacist", action: "UPDATE", resource: "Inventory", resourceId: "INV045", description: "Dispensed Atorvastatin 20mg (90 tablets) for prescription RX001", ipAddress: "192.168.1.115", status: "success" },
  { id: "LOG008", timestamp: "2026-01-15 09:00:12", user: "System", userRole: "system", action: "SYSTEM", resource: "Backup", resourceId: "BKP001", description: "Automated daily database backup completed successfully", ipAddress: "127.0.0.1", status: "success" },
  { id: "LOG009", timestamp: "2026-01-14 17:45:30", user: "Emily Rodriguez", userRole: "admin", action: "DELETE", resource: "User", resourceId: "USR015", description: "Deactivated user account for terminated employee", ipAddress: "192.168.1.100", status: "success" },
  { id: "LOG010", timestamp: "2026-01-14 16:30:15", user: "Dr. Michael Chen", userRole: "doctor", action: "UPDATE", resource: "Patient", resourceId: "PAT005", description: "Updated patient medical history - added allergy information", ipAddress: "192.168.1.102", status: "success" },
  { id: "LOG011", timestamp: "2026-01-14 15:20:00", user: "James Wilson", userRole: "receptionist", action: "CREATE", resource: "Appointment", resourceId: "APT045", description: "Booked new appointment for patient PAT008 with Dr. Emily Rodriguez", ipAddress: "192.168.1.105", status: "success" },
  { id: "LOG012", timestamp: "2026-01-14 14:10:45", user: "Rachel Green", userRole: "lab Technician", action: "CREATE", resource: "Lab Result", resourceId: "LAB023", description: "Uploaded lab results for patient PAT003 - Complete Blood Count", ipAddress: "192.168.1.120", status: "success" },
  { id: "LOG013", timestamp: "2026-01-14 13:05:30", user: "System", userRole: "system", action: "ALERT", resource: "Security", resourceId: "SEC001", description: "Failed login attempt detected for user admin@hospital.com from IP 203.45.67.89", ipAddress: "203.45.67.89", status: "warning" },
  { id: "LOG014", timestamp: "2026-01-14 12:00:00", user: "System", userRole: "system", action: "SYSTEM", resource: "Scheduler", resourceId: "SCH001", description: "Automated appointment reminders sent - 15 notifications dispatched", ipAddress: "127.0.0.1", status: "success" },
  { id: "LOG015", timestamp: "2026-01-14 11:30:15", user: "Amanda Lee", userRole: "accountant", action: "CREATE", resource: "Invoice", resourceId: "INV012", description: "Generated invoice for patient PAT002 - total amount $485.00", ipAddress: "192.168.1.125", status: "success" },
  { id: "LOG016", timestamp: "2026-01-14 10:15:45", user: "Dr. Sarah Johnson", userRole: "doctor", action: "UPDATE", resource: "Prescription", resourceId: "RX003", description: "Modified prescription for patient PAT004 - changed dosage", ipAddress: "192.168.1.101", status: "success" },
  { id: "LOG017", timestamp: "2026-01-14 09:00:00", user: "System", userRole: "system", action: "SYSTEM", resource: "Backup", resourceId: "BKP000", description: "Automated daily database backup completed successfully", ipAddress: "127.0.0.1", status: "success" },
  { id: "LOG018", timestamp: "2026-01-13 17:30:20", user: "Emily Rodriguez", userRole: "admin", action: "UPDATE", resource: "Department", resourceId: "DEPT003", description: "Updated working hours for Orthopedics department", ipAddress: "192.168.1.100", status: "success" },
  { id: "LOG019", timestamp: "2026-01-13 16:45:10", user: "Chris Martin", userRole: "admin", action: "UPDATE", resource: "System", resourceId: "SYS001", description: "Applied system security patch v2.4.1", ipAddress: "192.168.1.130", status: "success" },
  { id: "LOG020", timestamp: "2026-01-13 15:20:30", user: "Dr. David Kim", userRole: "doctor", action: "DELETE", resource: "Appointment", resourceId: "APT038", description: "Cancelled appointment for patient PAT012 - patient requested", ipAddress: "192.168.1.103", status: "success" },
];

type ActionFilter = "all" | "CREATE" | "UPDATE" | "DELETE" | "SYSTEM" | "ALERT";

export default function AuditLogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState<ActionFilter>("all");
  const [userFilter, setUserFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedLog, setSelectedLog] = useState<typeof auditLogData[0] | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const uniqueUsers = [...new Set(auditLogData.map((log) => log.user))];

  const filteredLogs = auditLogData.filter((log) => {
    const matchesSearch =
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resourceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === "all" || log.action === actionFilter;
    const matchesUser = userFilter === "all" || log.user === userFilter;
    const matchesDate = !dateFilter || log.timestamp.startsWith(dateFilter);
    return matchesSearch && matchesAction && matchesUser && matchesDate;
  });

  const actionColors: Record<string, string> = {
    CREATE: "bg-green-100 text-green-700",
    UPDATE: "bg-blue-100 text-blue-700",
    DELETE: "bg-red-100 text-red-700",
    SYSTEM: "bg-purple-100 text-purple-700",
    ALERT: "bg-yellow-100 text-yellow-700",
  };

  const statusColors: Record<string, string> = {
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
  };

  const handleExport = () => {
    const headers = "ID,Timestamp,User,Role,Action,Resource,Resource ID,Description,IP Address,Status\n";
    const rows = filteredLogs
      .map(
        (log) =>
          `${log.id},${log.timestamp},${log.user},${log.userRole},${log.action},${log.resource},${log.resourceId},"${log.description}",${log.ipAddress},${log.status}`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-log-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const actionCounts = {
    CREATE: auditLogData.filter((l) => l.action === "CREATE").length,
    UPDATE: auditLogData.filter((l) => l.action === "UPDATE").length,
    DELETE: auditLogData.filter((l) => l.action === "DELETE").length,
    SYSTEM: auditLogData.filter((l) => l.action === "SYSTEM").length,
    ALERT: auditLogData.filter((l) => l.action === "ALERT").length,
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Audit Log</h1>
          <p className="text-gray-500 text-sm">Track all system activities and user actions</p>
        </div>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium flex items-center gap-2"
        >
          ⬇ Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {Object.entries(actionCounts).map(([action, count]) => (
          <div
            key={action}
            className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setActionFilter(action as ActionFilter)}
          >
            <p className="text-xs text-gray-500 uppercase">{action}</p>
            <p className="text-2xl font-bold">{count}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value as ActionFilter)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Actions</option>
              <option value="CREATE">Create</option>
              <option value="UPDATE">Update</option>
              <option value="DELETE">Delete</option>
              <option value="SYSTEM">System</option>
              <option value="ALERT">Alert</option>
            </select>
            <select
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Users</option>
              {uniqueUsers.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Timestamp</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Action</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Resource</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Description</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-xs text-gray-500 whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-xs">{log.user}</p>
                      <p className="text-xs text-gray-400 capitalize">{log.userRole}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${actionColors[log.action]}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-xs">{log.resource}</p>
                      <p className="text-xs text-gray-400">{log.resourceId}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-600 max-w-xs truncate">{log.description}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium capitalize ${statusColors[log.status]}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedLog(log);
                        setShowDetailModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredLogs.length === 0 && (
          <div className="text-center py-8 text-gray-500">No log entries found matching your criteria</div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Log Entry Details</h3>
              <button onClick={() => setShowDetailModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Log ID</p>
                  <p className="font-mono font-medium">{selectedLog.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Timestamp</p>
                  <p className="font-medium">{selectedLog.timestamp}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">User</p>
                  <p className="font-medium">{selectedLog.user}</p>
                  <p className="text-xs text-gray-400 capitalize">{selectedLog.userRole}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">IP Address</p>
                  <p className="font-mono text-sm">{selectedLog.ipAddress}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Action</p>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${actionColors[selectedLog.action]}`}>
                    {selectedLog.action}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium capitalize ${statusColors[selectedLog.status]}`}>
                    {selectedLog.status}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Resource</p>
                <p className="font-medium">{selectedLog.resource} ({selectedLog.resourceId})</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Description</p>
                <p className="font-medium bg-gray-50 p-3 rounded-md">{selectedLog.description}</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
