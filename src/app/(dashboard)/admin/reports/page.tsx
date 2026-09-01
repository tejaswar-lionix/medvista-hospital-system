'use client';

import { useState, useMemo } from 'react';

interface DateRange {
  start: string;
  end: string;
}

interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface AppointmentData {
  date: string;
  count: number;
  completed: number;
  cancelled: number;
}

interface DepartmentPerformance {
  name: string;
  appointments: number;
  revenue: number;
  satisfaction: number;
}

interface DoctorPerformance {
  name: string;
  department: string;
  patients: number;
  revenue: number;
  rating: number;
}

export default function AdminReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  });
  const [activeTab, setActiveTab] = useState<'revenue' | 'appointments' | 'departments' | 'doctors'>('revenue');

  const revenueData: RevenueData[] = [
    { month: 'Jan', revenue: 125000, expenses: 85000, profit: 40000 },
    { month: 'Feb', revenue: 132000, expenses: 88000, profit: 44000 },
    { month: 'Mar', revenue: 145000, expenses: 92000, profit: 53000 },
    { month: 'Apr', revenue: 138000, expenses: 90000, profit: 48000 },
    { month: 'May', revenue: 155000, expenses: 95000, profit: 60000 },
    { month: 'Jun', revenue: 162000, expenses: 98000, profit: 64000 },
  ];

  const appointmentData: AppointmentData[] = [
    { date: '2024-01', count: 850, completed: 820, cancelled: 30 },
    { date: '2024-02', count: 920, completed: 895, cancelled: 25 },
    { date: '2024-03', count: 1050, completed: 1010, cancelled: 40 },
    { date: '2024-04', count: 980, completed: 950, cancelled: 30 },
    { date: '2024-05', count: 1100, completed: 1070, cancelled: 30 },
    { date: '2024-06', count: 1180, completed: 1150, cancelled: 30 },
  ];

  const departmentData: DepartmentPerformance[] = [
    { name: 'Cardiology', appointments: 320, revenue: 85000, satisfaction: 4.8 },
    { name: 'Orthopedics', appointments: 280, revenue: 72000, satisfaction: 4.6 },
    { name: 'Pediatrics', appointments: 450, revenue: 55000, satisfaction: 4.9 },
    { name: 'Neurology', appointments: 180, revenue: 68000, satisfaction: 4.7 },
    { name: 'Oncology', appointments: 150, revenue: 95000, satisfaction: 4.5 },
    { name: 'General Medicine', appointments: 520, revenue: 42000, satisfaction: 4.4 },
  ];

  const doctorData: DoctorPerformance[] = [
    { name: 'Dr. Sarah Johnson', department: 'Cardiology', patients: 125, revenue: 32000, rating: 4.9 },
    { name: 'Dr. Michael Chen', department: 'Orthopedics', patients: 98, revenue: 28000, rating: 4.8 },
    { name: 'Dr. Emily Williams', department: 'Pediatrics', patients: 145, revenue: 18000, rating: 4.9 },
    { name: 'Dr. James Brown', department: 'Neurology', patients: 72, revenue: 25000, rating: 4.7 },
    { name: 'Dr. Lisa Anderson', department: 'Oncology', patients: 65, revenue: 35000, rating: 4.6 },
    { name: 'Dr. Robert Taylor', department: 'General Medicine', patients: 180, revenue: 15000, rating: 4.5 },
  ];

  const maxRevenue = useMemo(() => Math.max(...revenueData.map(d => d.revenue)), [revenueData]);
  const maxAppointments = useMemo(() => Math.max(...appointmentData.map(d => d.count)), [appointmentData]);

  const totalRevenue = useMemo(() => revenueData.reduce((sum, d) => sum + d.revenue, 0), [revenueData]);
  const totalProfit = useMemo(() => revenueData.reduce((sum, d) => sum + d.profit, 0), [revenueData]);
  const totalAppointments = useMemo(() => appointmentData.reduce((sum, d) => sum + d.count, 0), [appointmentData]);

  const handleExport = (format: 'csv' | 'pdf') => {
    alert(`Exporting ${activeTab} report as ${format.toUpperCase()}...`);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-1">View comprehensive reports and analytics</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleExport('csv')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Export CSV
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Export PDF
            </button>
          </div>
        </div>
      </div>

      <div className="flex border-b mb-6">
        {(['revenue', 'appointments', 'departments', 'doctors'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium capitalize transition ${
              activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'revenue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-500">Total Profit</p>
              <p className="text-2xl font-bold text-blue-600">${totalProfit.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-500">Profit Margin</p>
              <p className="text-2xl font-bold text-purple-600">
                {((totalProfit / totalRevenue) * 100).toFixed(1)}%
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Revenue vs Expenses</h3>
            <div className="space-y-4">
              {revenueData.map((data) => (
                <div key={data.month} className="flex items-center gap-4">
                  <span className="w-12 text-sm text-gray-600">{data.month}</span>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-4 bg-green-500 rounded"
                        style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                      />
                      <span className="text-xs text-gray-600">${data.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-4 bg-red-400 rounded"
                        style={{ width: `${(data.expenses / maxRevenue) * 100}%` }}
                      />
                      <span className="text-xs text-gray-600">${data.expenses.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-6 mt-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded" /> Revenue
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-400 rounded" /> Expenses
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'appointments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-500">Total Appointments</p>
              <p className="text-2xl font-bold text-blue-600">{totalAppointments.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-500">Completion Rate</p>
              <p className="text-2xl font-bold text-green-600">
                {((appointmentData.reduce((s, d) => s + d.completed, 0) / totalAppointments) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-500">Cancellation Rate</p>
              <p className="text-2xl font-bold text-red-600">
                {((appointmentData.reduce((s, d) => s + d.cancelled, 0) / totalAppointments) * 100).toFixed(1)}%
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Appointments Overview</h3>
            <div className="space-y-4">
              {appointmentData.map((data) => (
                <div key={data.date} className="flex items-center gap-4">
                  <span className="w-20 text-sm text-gray-600">{data.date}</span>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded overflow-hidden flex">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${(data.completed / maxAppointments) * 100}%` }}
                      />
                      <div
                        className="h-full bg-red-400"
                        style={{ width: `${(data.cancelled / maxAppointments) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{data.completed} completed</span>
                      <span>{data.cancelled} cancelled</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'departments' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Appointments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Satisfaction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {departmentData.map((dept) => (
                <tr key={dept.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{dept.name}</td>
                  <td className="px-6 py-4">{dept.appointments}</td>
                  <td className="px-6 py-4">${dept.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      dept.satisfaction >= 4.7 ? 'bg-green-100 text-green-800' :
                      dept.satisfaction >= 4.5 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {dept.satisfaction} / 5.0
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'doctors' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patients</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {doctorData.map((doc) => (
                <tr key={doc.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{doc.name}</td>
                  <td className="px-6 py-4">{doc.department}</td>
                  <td className="px-6 py-4">{doc.patients}</td>
                  <td className="px-6 py-4">${doc.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      doc.rating >= 4.8 ? 'bg-green-100 text-green-800' :
                      doc.rating >= 4.6 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {doc.rating} / 5.0
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
