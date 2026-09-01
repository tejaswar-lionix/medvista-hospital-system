'use client';

import { useState, useMemo } from 'react';
import React from 'react';
import {
  Search,
  Plus,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  FileText,
  Eye,
  X,
  Filter,
  Calendar,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ArrowRight,
  Building2,
  Phone,
} from 'lucide-react';

interface Referral {
  id: string;
  patientName: string;
  patientId: string;
  fromDoctor: string;
  fromDepartment: string;
  toDoctor: string;
  toDepartment: string;
  reason: string;
  urgency: 'routine' | 'urgent' | 'emergency';
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'declined';
  dateCreated: string;
  dateAccepted?: string;
  notes: string;
  attachments: string[];
}

const mockReferrals: Referral[] = [
  {
    id: 'REF-2026-001', patientName: 'Sarah Johnson', patientId: 'PAT-1001', fromDoctor: 'Dr. Michael Chen',
    fromDepartment: 'Cardiology', toDoctor: 'Dr. Nancy Johnson', toDepartment: 'Radiology',
    reason: 'Chest pain requires cardiac CT angiography', urgency: 'urgent', status: 'accepted',
    dateCreated: '2026-09-01', dateAccepted: '2026-09-01', notes: 'Patient experiencing intermittent chest pain. ECG showed ST changes.',
    attachments: ['ECG Report', 'Blood Work'],
  },
  {
    id: 'REF-2026-002', patientName: 'James Williams', patientId: 'PAT-1002', fromDoctor: 'Dr. Emily Rodriguez',
    fromDepartment: 'Dermatology', toDoctor: 'Dr. David Kim', toDepartment: 'Endocrinology',
    reason: 'Suspected thyroid disorder based on skin manifestations', urgency: 'routine', status: 'in-progress',
    dateCreated: '2026-08-30', notes: 'Patient showing dry skin, hair loss, and weight gain consistent with hypothyroidism.',
    attachments: ['Skin Biopsy Results'],
  },
  {
    id: 'REF-2026-003', patientName: 'Maria Garcia', patientId: 'PAT-1003', fromDoctor: 'Dr. David Kim',
    fromDepartment: 'Endocrinology', toDoctor: 'Dr. Robert Martinez', toDepartment: 'Orthopedics',
    reason: 'Diabetic foot ulcer requires surgical evaluation', urgency: 'urgent', status: 'pending',
    dateCreated: '2026-09-01', notes: 'Patient with poorly controlled diabetes. Foot ulcer not responding to conservative treatment.',
    attachments: ['Foot X-ray', 'Wound Culture'],
  },
  {
    id: 'REF-2026-004', patientName: 'Robert Brown', patientId: 'PAT-1004', fromDoctor: 'Dr. Sarah Thompson',
    fromDepartment: 'Pulmonology', toDoctor: 'Dr. Michael Chen', toDepartment: 'Cardiology',
    reason: 'Pulmonary hypertension evaluation', urgency: 'routine', status: 'completed',
    dateCreated: '2026-08-25', dateAccepted: '2026-08-26', notes: 'Patient with worsening dyspnea. Echo suggests elevated pulmonary pressures.',
    attachments: ['Echo Report', 'PFT Results'],
  },
  {
    id: 'REF-2026-005', patientName: 'Lisa Anderson', patientId: 'PAT-1005', fromDoctor: 'Dr. Michael Chen',
    fromDepartment: 'Cardiology', toDoctor: 'Dr. Tom Harris', toDepartment: 'Rehabilitation',
    reason: 'Post-cardiac surgery rehabilitation', urgency: 'routine', status: 'accepted',
    dateCreated: '2026-08-28', dateAccepted: '2026-08-29', notes: 'CABG surgery completed successfully. Ready for cardiac rehab program.',
    attachments: ['Surgical Report', 'Discharge Summary'],
  },
  {
    id: 'REF-2026-006', patientName: 'Kevin Martinez', patientId: 'PAT-1006', fromDoctor: 'Dr. Emily Rodriguez',
    fromDepartment: 'Dermatology', toDoctor: 'Dr. Sandra White', toDepartment: 'Family Medicine',
    reason: 'Routine follow-up and medication management', urgency: 'routine', status: 'pending',
    dateCreated: '2026-09-01', notes: 'Dermatitis under control. Needs primary care follow-up for general health.',
    attachments: [],
  },
  {
    id: 'REF-2026-007', patientName: 'Amanda Taylor', patientId: 'PAT-1007', fromDoctor: 'Dr. David Kim',
    fromDepartment: 'Neurology', toDoctor: 'Dr. Emily Rodriguez', toDepartment: 'Dermatology',
    reason: 'Medication-induced skin rash requires dermatology evaluation', urgency: 'urgent', status: 'declined',
    dateCreated: '2026-08-29', notes: 'Patient developed rash after starting Gabapentin. Requires urgent dermatology review.',
    attachments: ['Medication List', 'Photos of Rash'],
  },
  {
    id: 'REF-2026-008', patientName: 'Christopher Lee', patientId: 'PAT-1008', fromDoctor: 'Dr. Sarah Thompson',
    fromDepartment: 'Gastroenterology', toDoctor: 'Dr. David Kim', toDepartment: 'Endocrinology',
    reason: 'GERD with suspected diabetes', urgency: 'routine', status: 'in-progress',
    dateCreated: '2026-08-27', notes: 'Patient with refractory GERD. Fasting glucose elevated. Requires endocrine workup.',
    attachments: ['Endoscopy Report', 'Lab Results'],
  },
];

const urgencyColors = {
  routine: 'bg-blue-100 text-blue-800',
  urgent: 'bg-orange-100 text-orange-800',
  emergency: 'bg-red-100 text-red-800',
};
const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  pending: { color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="w-3 h-3" /> },
  accepted: { color: 'bg-blue-100 text-blue-800', icon: <CheckCircle className="w-3 h-3" /> },
  'in-progress': { color: 'bg-purple-100 text-purple-800', icon: <RefreshCw className="w-3 h-3" /> },
  completed: { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-3 h-3" /> },
  declined: { color: 'bg-red-100 text-red-800', icon: <XCircle className="w-3 h-3" /> },
};

export default function DoctorReferralsPage() {
  const [referrals] = useState<Referral[]>(mockReferrals);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [newReferral, setNewReferral] = useState({
    patientName: '', patientId: '', toDoctor: '', toDepartment: '', reason: '', urgency: 'routine' as const, notes: '',
  });

  const filteredReferrals = useMemo(() => {
    return referrals.filter((r) => {
      const matchesSearch =
        r.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.toDepartment.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'All' || r.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [referrals, searchQuery, selectedStatus]);

  const stats = useMemo(() => {
    const total = referrals.length;
    const pending = referrals.filter((r) => r.status === 'pending').length;
    const accepted = referrals.filter((r) => r.status === 'accepted').length;
    const inProgress = referrals.filter((r) => r.status === 'in-progress').length;
    const completed = referrals.filter((r) => r.status === 'completed').length;
    const declined = referrals.filter((r) => r.status === 'declined').length;
    return { total, pending, accepted, inProgress, completed, declined };
  }, [referrals]);

  const handleCreateReferral = () => {
    const referral: Referral = {
      id: `REF-2026-${String(referrals.length + 1).padStart(3, '0')}`,
      patientName: newReferral.patientName,
      patientId: newReferral.patientId,
      fromDoctor: 'Dr. Michael Chen',
      fromDepartment: 'Cardiology',
      toDoctor: newReferral.toDoctor,
      toDepartment: newReferral.toDepartment,
      reason: newReferral.reason,
      urgency: newReferral.urgency,
      status: 'pending',
      dateCreated: new Date().toISOString().split('T')[0],
      notes: newReferral.notes,
      attachments: [],
    };
    mockReferrals.unshift(referral);
    setShowCreateModal(false);
    setNewReferral({ patientName: '', patientId: '', toDoctor: '', toDepartment: '', reason: '', urgency: 'routine', notes: '' });
  };

  const departments = ['Cardiology', 'Dermatology', 'Endocrinology', 'Pulmonology', 'Neurology', 'Orthopedics', 'Gastroenterology', 'Radiology', 'Rehabilitation', 'Family Medicine'];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Referrals</h1>
          <p className="text-gray-600 mt-2">Manage patient referrals between departments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg"><FileText className="w-5 h-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.total}</p><p className="text-xs text-gray-500">Total</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg"><Clock className="w-5 h-5 text-yellow-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.pending}</p><p className="text-xs text-gray-500">Pending</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg"><CheckCircle className="w-5 h-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.accepted}</p><p className="text-xs text-gray-500">Accepted</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg"><RefreshCw className="w-5 h-5 text-purple-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p><p className="text-xs text-gray-500">In Progress</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg"><CheckCircle className="w-5 h-5 text-green-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.completed}</p><p className="text-xs text-gray-500">Completed</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg"><XCircle className="w-5 h-5 text-red-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.declined}</p><p className="text-xs text-gray-500">Declined</p></div>
            </div>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search referrals..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <select className="px-3 py-2 border border-gray-200 rounded-lg" value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="declined">Declined</option>
            </select>
            <button onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-4 h-4" /> New Referral
            </button>
          </div>
        </div>

        {/* Referrals List */}
        <div className="space-y-4">
          {filteredReferrals.map((ref) => {
            const statusInfo = statusConfig[ref.status];
            return (
              <div key={ref.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <ArrowRight className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{ref.patientName}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${urgencyColors[ref.urgency]}`}>
                          {ref.urgency.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        <Building2 className="w-3 h-3" />
                        <span>{ref.fromDepartment}</span>
                        <ArrowRight className="w-3 h-3" />
                        <span className="font-medium text-gray-700">{ref.toDepartment}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">To: {ref.toDoctor}</p>
                      <p className="text-sm text-gray-500">Reason: {ref.reason}</p>
                      <p className="text-xs text-gray-400 mt-1">Created: {ref.dateCreated}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                      {statusInfo.icon}
                      {ref.status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                    <button onClick={() => { setSelectedReferral(ref); setShowDetailModal(true); }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {ref.attachments.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-gray-500">Attachments:</span>
                      {ref.attachments.map((att, i) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{att}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {filteredReferrals.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 text-center py-12">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No referrals found.</p>
            </div>
          )}
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Create Referral</h2>
                <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newReferral.patientName}
                      onChange={(e) => setNewReferral({ ...newReferral, patientName: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newReferral.patientId}
                      onChange={(e) => setNewReferral({ ...newReferral, patientId: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Referral To Department</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newReferral.toDepartment}
                    onChange={(e) => setNewReferral({ ...newReferral, toDepartment: e.target.value })}>
                    <option value="">Select Department</option>
                    {departments.map((d) => (<option key={d} value={d}>{d}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Referral To Doctor</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newReferral.toDoctor}
                    onChange={(e) => setNewReferral({ ...newReferral, toDoctor: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newReferral.urgency}
                    onChange={(e) => setNewReferral({ ...newReferral, urgency: e.target.value as 'routine' | 'urgent' | 'emergency' })}>
                    <option value="routine">Routine</option>
                    <option value="urgent">Urgent</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                  <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg" rows={2} value={newReferral.reason}
                    onChange={(e) => setNewReferral({ ...newReferral, reason: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg" rows={2} value={newReferral.notes}
                    onChange={(e) => setNewReferral({ ...newReferral, notes: e.target.value })} />
                </div>
                <div className="flex gap-3 pt-4">
                  <button onClick={handleCreateReferral}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Send className="w-4 h-4" /> Send Referral
                  </button>
                  <button onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedReferral && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Referral Details</h2>
                  <p className="text-sm text-gray-500">{selectedReferral.id}</p>
                </div>
                <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs text-gray-500">Patient</label><p className="text-sm font-medium">{selectedReferral.patientName}</p></div>
                  <div><label className="text-xs text-gray-500">Patient ID</label><p className="text-sm font-medium">{selectedReferral.patientId}</p></div>
                  <div><label className="text-xs text-gray-500">From</label><p className="text-sm font-medium">{selectedReferral.fromDoctor} ({selectedReferral.fromDepartment})</p></div>
                  <div><label className="text-xs text-gray-500">To</label><p className="text-sm font-medium">{selectedReferral.toDoctor} ({selectedReferral.toDepartment})</p></div>
                  <div><label className="text-xs text-gray-500">Urgency</label>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${urgencyColors[selectedReferral.urgency]}`}>{selectedReferral.urgency.toUpperCase()}</span>
                  </div>
                  <div><label className="text-xs text-gray-500">Status</label>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[selectedReferral.status].color}`}>
                      {statusConfig[selectedReferral.status].icon} {selectedReferral.status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </div>
                  <div><label className="text-xs text-gray-500">Date Created</label><p className="text-sm font-medium">{selectedReferral.dateCreated}</p></div>
                  {selectedReferral.dateAccepted && (
                    <div><label className="text-xs text-gray-500">Date Accepted</label><p className="text-sm font-medium">{selectedReferral.dateAccepted}</p></div>
                  )}
                </div>
                <div><label className="text-xs text-gray-500">Reason</label><p className="text-sm text-gray-600">{selectedReferral.reason}</p></div>
                <div><label className="text-xs text-gray-500">Notes</label><p className="text-sm text-gray-600">{selectedReferral.notes}</p></div>
                {selectedReferral.attachments.length > 0 && (
                  <div>
                    <label className="text-xs text-gray-500">Attachments</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedReferral.attachments.map((att, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm flex items-center gap-1">
                          <FileText className="w-3 h-3" /> {att}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button onClick={() => setShowDetailModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
