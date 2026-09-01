'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  Printer,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  FileText,
  User,
  Calendar,
  Pill,
  RefreshCw,
} from 'lucide-react';

interface Prescription {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  department: string;
  date: string;
  status: 'pending' | 'dispensed' | 'cancelled' | 'partial';
  medications: { name: string; dosage: string; frequency: string; duration: string }[];
  diagnosis: string;
  notes: string;
}

const mockPrescriptions: Prescription[] = [
  {
    id: 'RX-2026-001',
    patientName: 'Sarah Johnson',
    patientId: 'PAT-1001',
    doctorName: 'Dr. Michael Chen',
    department: 'Cardiology',
    date: '2026-09-01',
    status: 'pending',
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days' },
      { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily', duration: '90 days' },
    ],
    diagnosis: 'Hypertension',
    notes: 'Monitor blood pressure weekly. Follow up in 2 weeks.',
  },
  {
    id: 'RX-2026-002',
    patientName: 'James Williams',
    patientId: 'PAT-1002',
    doctorName: 'Dr. Emily Rodriguez',
    department: 'Dermatology',
    date: '2026-09-01',
    status: 'dispensed',
    medications: [
      { name: 'Hydrocortisone Cream', dosage: '1%', frequency: 'Twice daily', duration: '14 days' },
      { name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: '14 days' },
    ],
    diagnosis: 'Contact Dermatitis',
    notes: 'Avoid known irritants. Apply cream to affected areas only.',
  },
  {
    id: 'RX-2026-003',
    patientName: 'Maria Garcia',
    patientId: 'PAT-1003',
    doctorName: 'Dr. David Kim',
    department: 'Endocrinology',
    date: '2026-08-31',
    status: 'partial',
    medications: [
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '90 days' },
      { name: 'Glipizide', dosage: '5mg', frequency: 'Once daily', duration: '90 days' },
      { name: 'Insulin Glargine', dosage: '20 units', frequency: 'Bedtime', duration: '30 days' },
    ],
    diagnosis: 'Type 2 Diabetes Mellitus',
    notes: 'Check fasting blood glucose daily. Diet modifications advised.',
  },
  {
    id: 'RX-2026-004',
    patientName: 'Robert Brown',
    patientId: 'PAT-1004',
    doctorName: 'Dr. Sarah Thompson',
    department: 'Pulmonology',
    date: '2026-08-30',
    status: 'cancelled',
    medications: [
      { name: 'Albuterol Inhaler', dosage: '90mcg', frequency: 'As needed', duration: '30 days' },
      { name: 'Fluticasone Inhaler', dosage: '250mcg', frequency: 'Twice daily', duration: '30 days' },
    ],
    diagnosis: 'Asthma',
    notes: 'Patient requested alternative treatment. Prescription cancelled.',
  },
  {
    id: 'RX-2026-005',
    patientName: 'Lisa Anderson',
    patientId: 'PAT-1005',
    doctorName: 'Dr. Michael Chen',
    department: 'Cardiology',
    date: '2026-08-30',
    status: 'dispensed',
    medications: [
      { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', duration: '90 days' },
      { name: 'Metoprolol', dosage: '50mg', frequency: 'Twice daily', duration: '90 days' },
    ],
    diagnosis: 'Hyperlipidemia',
    notes: 'Diet and exercise important. Follow up in 3 months.',
  },
  {
    id: 'RX-2026-006',
    patientName: 'Kevin Martinez',
    patientId: 'PAT-1006',
    doctorName: 'Dr. Emily Rodriguez',
    department: 'Orthopedics',
    date: '2026-08-29',
    status: 'pending',
    medications: [
      { name: 'Ibuprofen', dosage: '600mg', frequency: 'Three times daily', duration: '10 days' },
      { name: 'Cyclobenzaprine', dosage: '10mg', frequency: 'At bedtime', duration: '7 days' },
    ],
    diagnosis: 'Muscle Strain - Lower Back',
    notes: 'Rest and physical therapy recommended. Avoid heavy lifting.',
  },
  {
    id: 'RX-2026-007',
    patientName: 'Amanda Taylor',
    patientId: 'PAT-1007',
    doctorName: 'Dr. David Kim',
    department: 'Neurology',
    date: '2026-08-29',
    status: 'dispensed',
    medications: [
      { name: 'Gabapentin', dosage: '300mg', frequency: 'Three times daily', duration: '30 days' },
      { name: 'Vitamin B12', dosage: '1000mcg', frequency: 'Once daily', duration: '90 days' },
    ],
    diagnosis: 'Peripheral Neuropathy',
    notes: 'Monitor for side effects. Physical therapy referral made.',
  },
  {
    id: 'RX-2026-008',
    patientName: 'Christopher Lee',
    patientId: 'PAT-1008',
    doctorName: 'Dr. Sarah Thompson',
    department: 'Gastroenterology',
    date: '2026-08-28',
    status: 'pending',
    medications: [
      { name: 'Omeprazole', dosage: '20mg', frequency: 'Once daily', duration: '30 days' },
      { name: 'Famotidine', dosage: '20mg', frequency: 'At bedtime', duration: '30 days' },
    ],
    diagnosis: 'GERD',
    notes: 'Elevate head of bed. Avoid spicy foods and caffeine.',
  },
  {
    id: 'RX-2026-009',
    patientName: 'Jennifer White',
    patientId: 'PAT-1009',
    doctorName: 'Dr. Michael Chen',
    department: 'Cardiology',
    date: '2026-08-28',
    status: 'dispensed',
    medications: [
      { name: 'Warfarin', dosage: '5mg', frequency: 'Once daily', duration: '90 days' },
      { name: 'Digoxin', dosage: '0.25mg', frequency: 'Once daily', duration: '90 days' },
    ],
    diagnosis: 'Atrial Fibrillation',
    notes: 'Regular INR monitoring required. Avoid vitamin K rich foods.',
  },
  {
    id: 'RX-2026-010',
    patientName: 'Daniel Harris',
    patientId: 'PAT-1010',
    doctorName: 'Dr. David Kim',
    department: 'Endocrinology',
    date: '2026-08-27',
    status: 'partial',
    medications: [
      { name: 'Levothyroxine', dosage: '50mcg', frequency: 'Once daily', duration: '90 days' },
      { name: 'Calcium Supplement', dosage: '600mg', frequency: 'Twice daily', duration: '90 days' },
    ],
    diagnosis: 'Hypothyroidism',
    notes: 'Take on empty stomach. Recheck TSH in 6 weeks.',
  },
];

const statusConfig = {
  pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
  dispensed: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Dispensed' },
  cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Cancelled' },
  partial: { color: 'bg-blue-100 text-blue-800', icon: AlertTriangle, label: 'Partial' },
};

const departments = ['All', 'Cardiology', 'Dermatology', 'Endocrinology', 'Pulmonology', 'Orthopedics', 'Neurology', 'Gastroenterology'];
const doctors = ['All', 'Dr. Michael Chen', 'Dr. Emily Rodriguez', 'Dr. David Kim', 'Dr. Sarah Thompson'];

export default function PrescriptionsPage() {
  const [prescriptions] = useState<Prescription[]>(mockPrescriptions);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter((rx) => {
      const matchesSearch =
        rx.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rx.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment = selectedDepartment === 'All' || rx.department === selectedDepartment;
      const matchesDoctor = selectedDoctor === 'All' || rx.doctorName === selectedDoctor;
      const matchesStatus = selectedStatus === 'All' || rx.status === selectedStatus;
      const matchesDate = !dateFilter || rx.date === dateFilter;
      return matchesSearch && matchesDepartment && matchesDoctor && matchesStatus && matchesDate;
    });
  }, [prescriptions, searchQuery, selectedDepartment, selectedDoctor, selectedStatus, dateFilter]);

  const stats = useMemo(() => {
    const total = prescriptions.length;
    const pending = prescriptions.filter((rx) => rx.status === 'pending').length;
    const dispensed = prescriptions.filter((rx) => rx.status === 'dispensed').length;
    const partial = prescriptions.filter((rx) => rx.status === 'partial').length;
    const cancelled = prescriptions.filter((rx) => rx.status === 'cancelled').length;
    return { total, pending, dispensed, partial, cancelled };
  }, [prescriptions]);

  const handleViewDetails = (rx: Prescription) => {
    setSelectedPrescription(rx);
    setShowDetailModal(true);
  };

  const handlePrint = (rx: Prescription) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head><title>Prescription ${rx.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
          .info { margin: 10px 0; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f5f5f5; }
          .footer { margin-top: 30px; border-top: 1px solid #333; padding-top: 10px; font-size: 12px; }
        </style>
        </head>
        <body>
          <div class="header">
            <h1>Hospital Name</h1>
            <p>123 Medical Center Drive</p>
            <p>Phone: (555) 123-4567</p>
          </div>
          <div class="info"><strong>Prescription ID:</strong> ${rx.id}</div>
          <div class="info"><strong>Date:</strong> ${rx.date}</div>
          <div class="info"><strong>Patient:</strong> ${rx.patientName} (${rx.patientId})</div>
          <div class="info"><strong>Doctor:</strong> ${rx.doctorName} - ${rx.department}</div>
          <div class="info"><strong>Diagnosis:</strong> ${rx.diagnosis}</div>
          <h3>Medications</h3>
          <table>
            <tr><th>Medication</th><th>Dosage</th><th>Frequency</th><th>Duration</th></tr>
            ${rx.medications.map((m) => `<tr><td>${m.name}</td><td>${m.dosage}</td><td>${m.frequency}</td><td>${m.duration}</td></tr>`).join('')}
          </table>
          <div class="info"><strong>Notes:</strong> ${rx.notes}</div>
          <div class="footer">
            <p>Signature: _________________________</p>
            <p>Date: ${rx.date}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const updateStatus = (rxId: string, newStatus: Prescription['status']) => {
    const idx = prescriptions.findIndex((rx) => rx.id === rxId);
    if (idx !== -1) {
      mockPrescriptions[idx] = { ...mockPrescriptions[idx], status: newStatus };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Prescription Management</h1>
          <p className="text-gray-600 mt-2">Manage and track all patient prescriptions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-xs text-gray-500">Total</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.dispensed}</p>
                <p className="text-xs text-gray-500">Dispensed</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.partial}</p>
                <p className="text-xs text-gray-500">Partial</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
                <p className="text-xs text-gray-500">Cancelled</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by patient, prescription ID, or diagnosis..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              Filters
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                <select
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                >
                  {doctors.map((doc) => (
                    <option key={doc} value={doc}>{doc}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="pending">Pending</option>
                  <option value="dispensed">Dispensed</option>
                  <option value="partial">Partial</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Prescriptions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medications</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPrescriptions.map((rx) => {
                  const statusInfo = statusConfig[rx.status];
                  const StatusIcon = statusInfo.icon;
                  const isExpanded = expandedRow === rx.id;
                  return (
                    <React.Fragment key={rx.id}>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{rx.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {rx.patientName.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{rx.patientName}</p>
                              <p className="text-xs text-gray-500">{rx.patientId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rx.doctorName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rx.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rx.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setExpandedRow(isExpanded ? null : rx.id)}
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <Pill className="w-4 h-4" />
                            {rx.medications.length} med(s)
                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewDetails(rx)}
                              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handlePrint(rx)}
                              className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Print"
                            >
                              <Printer className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Download">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr>
                          <td colSpan={8} className="px-6 py-4 bg-gray-50">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {rx.medications.map((med, idx) => (
                                <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200">
                                  <p className="font-medium text-gray-900 text-sm">{med.name}</p>
                                  <p className="text-xs text-gray-500 mt-1">Dosage: {med.dosage}</p>
                                  <p className="text-xs text-gray-500">Frequency: {med.frequency}</p>
                                  <p className="text-xs text-gray-500">Duration: {med.duration}</p>
                                </div>
                              ))}
                            </div>
                            <p className="mt-3 text-sm text-gray-600"><strong>Diagnosis:</strong> {rx.diagnosis}</p>
                            <p className="text-sm text-gray-600"><strong>Notes:</strong> {rx.notes}</p>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredPrescriptions.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No prescriptions found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedPrescription && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Prescription Details</h2>
                    <p className="text-sm text-gray-500">{selectedPrescription.id}</p>
                  </div>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <XCircle className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase">Patient</label>
                    <p className="text-sm font-medium text-gray-900">{selectedPrescription.patientName}</p>
                    <p className="text-xs text-gray-500">{selectedPrescription.patientId}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase">Doctor</label>
                    <p className="text-sm font-medium text-gray-900">{selectedPrescription.doctorName}</p>
                    <p className="text-xs text-gray-500">{selectedPrescription.department}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase">Date</label>
                    <p className="text-sm font-medium text-gray-900">{selectedPrescription.date}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase">Status</label>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[selectedPrescription.status].color}`}>
                      {statusConfig[selectedPrescription.status].label}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase">Diagnosis</label>
                  <p className="text-sm font-medium text-gray-900">{selectedPrescription.diagnosis}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase mb-2 block">Medications</label>
                  <div className="space-y-2">
                    {selectedPrescription.medications.map((med, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
                        <Pill className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{med.name}</p>
                          <p className="text-xs text-gray-500">{med.dosage} - {med.frequency} - {med.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase">Notes</label>
                  <p className="text-sm text-gray-600">{selectedPrescription.notes}</p>
                </div>
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handlePrint(selectedPrescription)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';
