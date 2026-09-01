'use client';

import { useState, useMemo } from 'react';
import React from 'react';
import {
  Search,
  Plus,
  Edit2,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Download,
  Eye,
  X,
  Calendar,
  DollarSign,
  CreditCard,
  Building2,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Check,
  Ban,
} from 'lucide-react';

interface Insurance {
  id: string;
  provider: string;
  policyNumber: string;
  groupNumber: string;
  planType: string;
  memberId: string;
  policyHolder: string;
  relationship: string;
  effectiveDate: string;
  expirationDate: string;
  status: 'active' | 'inactive' | 'pending' | 'expired';
  coverageLevel: string;
  deductible: number;
  deductibleMet: number;
  outOfPocketMax: number;
  outOfPocketMet: number;
  copayPrimary: number;
  copaySpecialist: number;
  copayEmergency: number;
  coinsurance: number;
  phone: string;
  email: string;
  address: string;
}

interface Claim {
  id: string;
  dateOfService: string;
  provider: string;
  description: string;
  billedAmount: number;
  allowedAmount: number;
  paidAmount: number;
  patientResponsibility: number;
  status: 'approved' | 'denied' | 'pending' | 'processing';
  claimNumber: string;
  diagnosisCode: string;
}

const mockInsurance: Insurance = {
  id: 'INS-001', provider: 'Blue Cross Blue Shield', policyNumber: 'BCB-2024-789012',
  groupNumber: 'GRP-45678', planType: 'PPO', memberId: 'MEM-12345678',
  policyHolder: 'John Doe', relationship: 'Self', effectiveDate: '2024-01-01',
  expirationDate: '2026-12-31', status: 'active', coverageLevel: 'Gold',
  deductible: 1500, deductibleMet: 850, outOfPocketMax: 6000, outOfPocketMet: 2100,
  copayPrimary: 30, copaySpecialist: 50, copayEmergency: 250, coinsurance: 20,
  phone: '1-800-555-0123', email: 'member@bcbs.com', address: '123 Insurance Way, Health City, ST 12345',
};

const mockClaims: Claim[] = [
  { id: 'CLM-001', dateOfService: '2026-08-28', provider: 'Dr. Michael Chen', description: 'Cardiology Consultation', billedAmount: 350, allowedAmount: 280, paidAmount: 224, patientResponsibility: 56, status: 'approved', claimNumber: 'CLM-2026-89012', diagnosisCode: 'I10' },
  { id: 'CLM-002', dateOfService: '2026-08-25', provider: 'Lab Corp', description: 'Lipid Panel Blood Test', billedAmount: 120, allowedAmount: 95, paidAmount: 76, patientResponsibility: 19, status: 'approved', claimNumber: 'CLM-2026-89013', diagnosisCode: 'E78.5' },
  { id: 'CLM-003', dateOfService: '2026-08-20', provider: 'City Imaging Center', description: 'Chest X-Ray', billedAmount: 280, allowedAmount: 220, paidAmount: 0, patientResponsibility: 220, status: 'denied', claimNumber: 'CLM-2026-89014', diagnosisCode: 'R07.9' },
  { id: 'CLM-004', dateOfService: '2026-09-01', provider: 'Dr. Emily Rodriguez', description: 'Dermatology Follow-up', billedAmount: 200, allowedAmount: 160, paidAmount: 0, patientResponsibility: 0, status: 'processing', claimNumber: 'CLM-2026-89015', diagnosisCode: 'L25.9' },
  { id: 'CLM-005', dateOfService: '2026-08-15', provider: 'Physical Therapy Associates', description: 'Physical Therapy Session (6 visits)', billedAmount: 720, allowedAmount: 600, paidAmount: 480, patientResponsibility: 120, status: 'approved', claimNumber: 'CLM-2026-89016', diagnosisCode: 'M54.5' },
  { id: 'CLM-006', dateOfService: '2026-08-10', provider: 'Pharmacy Plus', description: 'Prescription Medications', billedAmount: 185, allowedAmount: 150, paidAmount: 120, patientResponsibility: 30, status: 'approved', claimNumber: 'CLM-2026-89017', diagnosisCode: 'I10' },
  { id: 'CLM-007', dateOfService: '2026-09-02', provider: 'Dr. David Kim', description: 'Endocrinology Consultation', billedAmount: 400, allowedAmount: 0, paidAmount: 0, patientResponsibility: 0, status: 'pending', claimNumber: 'CLM-2026-89018', diagnosisCode: 'E11.9' },
];

const claimStatusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  approved: { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-3 h-3" /> },
  denied: { color: 'bg-red-100 text-red-800', icon: <XCircle className="w-3 h-3" /> },
  pending: { color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="w-3 h-3" /> },
  processing: { color: 'bg-blue-100 text-blue-800', icon: <RefreshCw className="w-3 h-3" /> },
};

export default function PatientInsurancePage() {
  const [insurance] = useState<Insurance>(mockInsurance);
  const [claims] = useState<Claim[]>(mockClaims);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredClaims = useMemo(() => {
    return claims.filter((c) => {
      const matchesSearch =
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.provider.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [claims, searchQuery, selectedStatus]);

  const stats = useMemo(() => {
    const total = claims.length;
    const approved = claims.filter((c) => c.status === 'approved').length;
    const denied = claims.filter((c) => c.status === 'denied').length;
    const pending = claims.filter((c) => c.status === 'pending' || c.status === 'processing').length;
    const totalPaid = claims.filter((c) => c.status === 'approved').reduce((sum, c) => sum + c.paidAmount, 0);
    return { total, approved, denied, pending, totalPaid };
  }, [claims]);

  const deductiblePercentage = Math.round((insurance.deductibleMet / insurance.deductible) * 100);
  const oopPercentage = Math.round((insurance.outOfPocketMet / insurance.outOfPocketMax) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Insurance</h1>
          <p className="text-gray-600 mt-2">View insurance details, track claims, and manage coverage</p>
        </div>

        {/* Insurance Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8" />
                <h2 className="text-2xl font-bold">{insurance.provider}</h2>
              </div>
              <p className="text-blue-100 text-sm mb-1">{insurance.planType} Plan - {insurance.coverageLevel}</p>
              <p className="text-lg font-medium">Policy: {insurance.policyNumber}</p>
              <p className="text-blue-100 text-sm">Group: {insurance.groupNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">Member ID</p>
              <p className="text-lg font-bold">{insurance.memberId}</p>
              <p className="text-blue-100 text-sm mt-2">Policy Holder</p>
              <p className="font-medium">{insurance.policyHolder}</p>
              <p className="text-blue-100 text-sm mt-1">{insurance.relationship}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20">
            <div>
              <p className="text-blue-100 text-xs">Effective Date</p>
              <p className="font-medium">{insurance.effectiveDate}</p>
            </div>
            <div>
              <p className="text-blue-100 text-xs">Expiration Date</p>
              <p className="font-medium">{insurance.expirationDate}</p>
            </div>
            <div>
              <p className="text-blue-100 text-xs">Contact</p>
              <p className="font-medium">{insurance.phone}</p>
            </div>
            <div>
              <p className="text-blue-100 text-xs">Status</p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-400 text-green-900">
                <Check className="w-3 h-3" /> Active
              </span>
            </div>
          </div>
        </div>

        {/* Coverage Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3">Deductible</h3>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">${insurance.deductibleMet.toLocaleString()} / ${insurance.deductible.toLocaleString()}</span>
              <span className="font-medium">{deductiblePercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${deductiblePercentage}%` }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">${(insurance.deductible - insurance.deductibleMet).toLocaleString()} remaining</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3">Out-of-Pocket Max</h3>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">${insurance.outOfPocketMet.toLocaleString()} / ${insurance.outOfPocketMax.toLocaleString()}</span>
              <span className="font-medium">{oopPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${oopPercentage}%` }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">${(insurance.outOfPocketMax - insurance.outOfPocketMet).toLocaleString()} remaining</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3">Copays</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Primary Care</span>
                <span className="font-medium">${insurance.copayPrimary}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Specialist</span>
                <span className="font-medium">${insurance.copaySpecialist}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Emergency</span>
                <span className="font-medium">${insurance.copayEmergency}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Coinsurance</span>
                <span className="font-medium">{insurance.coinsurance}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Claims Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg"><FileText className="w-5 h-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.total}</p><p className="text-xs text-gray-500">Total Claims</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg"><CheckCircle className="w-5 h-5 text-green-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.approved}</p><p className="text-xs text-gray-500">Approved</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg"><XCircle className="w-5 h-5 text-red-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.denied}</p><p className="text-xs text-gray-500">Denied</p></div>
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
              <div className="p-2 bg-green-100 rounded-lg"><DollarSign className="w-5 h-5 text-green-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">${stats.totalPaid.toLocaleString()}</p><p className="text-xs text-gray-500">Total Paid</p></div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search claims by description, provider, or claim number..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <select className="px-3 py-2 border border-gray-200 rounded-lg" value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="approved">Approved</option>
              <option value="denied">Denied</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
            </select>
            <button onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-4 h-4" /> Add Insurance
            </button>
          </div>
        </div>

        {/* Claims Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Claims History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Your Cost</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredClaims.map((claim) => {
                  const statusInfo = claimStatusConfig[claim.status];
                  return (
                    <tr key={claim.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{claim.claimNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.dateOfService}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">{claim.description}</p>
                        <p className="text-xs text-gray-500">Code: {claim.diagnosisCode}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.provider}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${claim.billedAmount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">${claim.paidAmount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600 font-medium">${claim.patientResponsibility.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          {statusInfo.icon}
                          {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <button onClick={() => { setSelectedClaim(claim); setShowDetailModal(true); }}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredClaims.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No claims found.</p>
            </div>
          )}
        </div>

        {/* Add Insurance Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Add Insurance</h2>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Provider</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" placeholder="e.g., Blue Cross Blue Shield" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Group Number</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Member ID</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Plan Type</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
                      <option>PPO</option><option>HMO</option><option>EPO</option><option>POS</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Effective Date</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
                </div>
                <div className="flex gap-3 pt-4">
                  <button onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Insurance</button>
                  <button onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedClaim && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Claim Details</h2>
                  <p className="text-sm text-gray-500">{selectedClaim.claimNumber}</p>
                </div>
                <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs text-gray-500">Date of Service</label><p className="text-sm font-medium">{selectedClaim.dateOfService}</p></div>
                  <div><label className="text-xs text-gray-500">Provider</label><p className="text-sm font-medium">{selectedClaim.provider}</p></div>
                  <div className="col-span-2"><label className="text-xs text-gray-500">Description</label><p className="text-sm font-medium">{selectedClaim.description}</p></div>
                  <div><label className="text-xs text-gray-500">Diagnosis Code</label><p className="text-sm font-medium">{selectedClaim.diagnosisCode}</p></div>
                  <div><label className="text-xs text-gray-500">Status</label>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${claimStatusConfig[selectedClaim.status].color}`}>
                      {claimStatusConfig[selectedClaim.status].icon} {selectedClaim.status.charAt(0).toUpperCase() + selectedClaim.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Billed Amount</span>
                    <span className="font-medium">${selectedClaim.billedAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Allowed Amount</span>
                    <span className="font-medium">${selectedClaim.allowedAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Insurance Paid</span>
                    <span className="font-medium text-green-600">${selectedClaim.paidAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
                    <span className="text-gray-600 font-medium">Your Responsibility</span>
                    <span className="font-bold text-orange-600">${selectedClaim.patientResponsibility.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Download className="w-4 h-4" /> Download Statement
                  </button>
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
// Insurance module
