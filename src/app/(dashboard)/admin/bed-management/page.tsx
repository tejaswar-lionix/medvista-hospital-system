'use client';

import { useState, useMemo } from 'react';
import React from 'react';
import {
  Bed,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Users,
  Building2,
  DoorOpen,
  BedDouble,
  BedSingle,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  User,
  Calendar,
  Phone,
  Edit2,
  X,
  Plus,
  ArrowRight,
} from 'lucide-react';

interface BedInfo {
  id: string;
  number: string;
  ward: string;
  type: 'ICU' | 'General' | 'Private' | 'Semi-Private';
  status: 'occupied' | 'available' | 'reserved' | 'maintenance' | 'cleaning';
  patientName?: string;
  patientId?: string;
  admissionDate?: string;
  doctor?: string;
  expectedDischarge?: string;
  floor: number;
}

const mockBeds: BedInfo[] = [
  { id: 'B001', number: 'ICU-101', ward: 'ICU', type: 'ICU', status: 'occupied', patientName: 'John Smith', patientId: 'PAT-2001', admissionDate: '2026-08-28', doctor: 'Dr. Michael Chen', expectedDischarge: '2026-09-05', floor: 1 },
  { id: 'B002', number: 'ICU-102', ward: 'ICU', type: 'ICU', status: 'occupied', patientName: 'Maria Garcia', patientId: 'PAT-2002', admissionDate: '2026-08-30', doctor: 'Dr. Emily Rodriguez', expectedDischarge: '2026-09-08', floor: 1 },
  { id: 'B003', number: 'ICU-103', ward: 'ICU', type: 'ICU', status: 'available', floor: 1 },
  { id: 'B004', number: 'ICU-104', ward: 'ICU', type: 'ICU', status: 'reserved', patientName: 'Robert Brown', patientId: 'PAT-2003', admissionDate: '2026-09-02', doctor: 'Dr. David Kim', floor: 1 },
  { id: 'B005', number: 'ICU-105', ward: 'ICU', type: 'ICU', status: 'maintenance', floor: 1 },

  { id: 'B006', number: 'GEN-201', ward: 'General', type: 'General', status: 'occupied', patientName: 'Lisa Anderson', patientId: 'PAT-2004', admissionDate: '2026-08-25', doctor: 'Dr. Sarah Thompson', expectedDischarge: '2026-09-03', floor: 2 },
  { id: 'B007', number: 'GEN-202', ward: 'General', type: 'General', status: 'occupied', patientName: 'Kevin Martinez', patientId: 'PAT-2005', admissionDate: '2026-08-27', doctor: 'Dr. Michael Chen', expectedDischarge: '2026-09-04', floor: 2 },
  { id: 'B008', number: 'GEN-203', ward: 'General', type: 'General', status: 'occupied', patientName: 'Amanda Taylor', patientId: 'PAT-2006', admissionDate: '2026-08-29', doctor: 'Dr. Emily Rodriguez', floor: 2 },
  { id: 'B009', number: 'GEN-204', ward: 'General', type: 'General', status: 'available', floor: 2 },
  { id: 'B010', number: 'GEN-205', ward: 'General', type: 'General', status: 'available', floor: 2 },
  { id: 'B011', number: 'GEN-206', ward: 'General', type: 'General', status: 'cleaning', floor: 2 },
  { id: 'B012', number: 'GEN-207', ward: 'General', type: 'General', status: 'occupied', patientName: 'Christopher Lee', patientId: 'PAT-2007', admissionDate: '2026-08-31', doctor: 'Dr. David Kim', floor: 2 },
  { id: 'B013', number: 'GEN-208', ward: 'General', type: 'General', status: 'reserved', patientName: 'Jennifer White', patientId: 'PAT-2008', admissionDate: '2026-09-02', doctor: 'Dr. Sarah Thompson', floor: 2 },

  { id: 'B014', number: 'PRV-301', ward: 'Private', type: 'Private', status: 'occupied', patientName: 'Daniel Harris', patientId: 'PAT-2009', admissionDate: '2026-08-26', doctor: 'Dr. Michael Chen', expectedDischarge: '2026-09-02', floor: 3 },
  { id: 'B015', number: 'PRV-302', ward: 'Private', type: 'Private', status: 'available', floor: 3 },
  { id: 'B016', number: 'PRV-303', ward: 'Private', type: 'Private', status: 'occupied', patientName: 'Nancy Johnson', patientId: 'PAT-2010', admissionDate: '2026-08-29', doctor: 'Dr. Emily Rodriguez', floor: 3 },

  { id: 'B017', number: 'SP-401', ward: 'Semi-Private', type: 'Semi-Private', status: 'occupied', patientName: 'James Wilson', patientId: 'PAT-2011', admissionDate: '2026-08-27', doctor: 'Dr. David Kim', expectedDischarge: '2026-09-03', floor: 4 },
  { id: 'B018', number: 'SP-402', ward: 'Semi-Private', type: 'Semi-Private', status: 'occupied', patientName: 'Patricia Davis', patientId: 'PAT-2012', admissionDate: '2026-08-30', doctor: 'Dr. Sarah Thompson', floor: 4 },
  { id: 'B019', number: 'SP-403', ward: 'Semi-Private', type: 'Semi-Private', status: 'available', floor: 4 },
  { id: 'B020', number: 'SP-404', ward: 'Semi-Private', type: 'Semi-Private', status: 'maintenance', floor: 4 },
];

const statusConfig: Record<string, { color: string; bgColor: string; icon: React.ReactNode }> = {
  occupied: { color: 'text-red-700', bgColor: 'bg-red-500', icon: <User className="w-4 h-4" /> },
  available: { color: 'text-green-700', bgColor: 'bg-green-500', icon: <CheckCircle className="w-4 h-4" /> },
  reserved: { color: 'text-blue-700', bgColor: 'bg-blue-500', icon: <Clock className="w-4 h-4" /> },
  maintenance: { color: 'text-orange-700', bgColor: 'bg-orange-500', icon: <AlertTriangle className="w-4 h-4" /> },
  cleaning: { color: 'text-yellow-700', bgColor: 'bg-yellow-500', icon: <RefreshCw className="w-4 h-4" /> },
};

const bedTypeConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  ICU: { color: 'bg-red-100 text-red-800', icon: <BedSingle className="w-4 h-4" /> },
  General: { color: 'bg-blue-100 text-blue-800', icon: <Bed className="w-4 h-4" /> },
  Private: { color: 'bg-purple-100 text-purple-800', icon: <BedDouble className="w-4 h-4" /> },
  'Semi-Private': { color: 'bg-teal-100 text-teal-800', icon: <BedDouble className="w-4 h-4" /> },
};

export default function BedManagementPage() {
  const [beds] = useState<BedInfo[]>(mockBeds);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedBed, setSelectedBed] = useState<BedInfo | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assigningBed, setAssigningBed] = useState<BedInfo | null>(null);
  const [assignForm, setAssignForm] = useState({ patientName: '', patientId: '', doctor: '', expectedDischarge: '' });

  const filteredBeds = useMemo(() => {
    return beds.filter((bed) => {
      const matchesSearch =
        bed.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (bed.patientName && bed.patientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        bed.ward.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'All' || bed.type === selectedType;
      const matchesStatus = selectedStatus === 'All' || bed.status === selectedStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [beds, searchQuery, selectedType, selectedStatus]);

  const stats = useMemo(() => {
    const total = beds.length;
    const occupied = beds.filter((b) => b.status === 'occupied').length;
    const available = beds.filter((b) => b.status === 'available').length;
    const reserved = beds.filter((b) => b.status === 'reserved').length;
    const maintenance = beds.filter((b) => b.status === 'maintenance').length;
    const cleaning = beds.filter((b) => b.status === 'cleaning').length;
    const occupancyRate = Math.round((occupied / total) * 100);
    const byType = {
      ICU: { total: beds.filter((b) => b.type === 'ICU').length, occupied: beds.filter((b) => b.type === 'ICU' && b.status === 'occupied').length },
      General: { total: beds.filter((b) => b.type === 'General').length, occupied: beds.filter((b) => b.type === 'General' && b.status === 'occupied').length },
      Private: { total: beds.filter((b) => b.type === 'Private').length, occupied: beds.filter((b) => b.type === 'Private' && b.status === 'occupied').length },
      'Semi-Private': { total: beds.filter((b) => b.type === 'Semi-Private').length, occupied: beds.filter((b) => b.type === 'Semi-Private' && b.status === 'occupied').length },
    };
    return { total, occupied, available, reserved, maintenance, cleaning, occupancyRate, byType };
  }, [beds]);

  const handleAssignBed = (bed: BedInfo) => {
    setAssigningBed(bed);
    setAssignForm({ patientName: '', patientId: '', doctor: '', expectedDischarge: '' });
    setShowAssignModal(true);
  };

  const confirmAssign = () => {
    if (!assigningBed) return;
    const idx = beds.findIndex((b) => b.id === assigningBed.id);
    if (idx !== -1) {
      mockBeds[idx] = {
        ...mockBeds[idx],
        status: 'occupied',
        patientName: assignForm.patientName,
        patientId: assignForm.patientId,
        doctor: assignForm.doctor,
        admissionDate: new Date().toISOString().split('T')[0],
        expectedDischarge: assignForm.expectedDischarge || undefined,
      };
    }
    setShowAssignModal(false);
  };

  const updateBedStatus = (bedId: string, newStatus: BedInfo['status']) => {
    const idx = beds.findIndex((b) => b.id === bedId);
    if (idx !== -1) {
      mockBeds[idx] = { ...mockBeds[idx], status: newStatus };
      if (newStatus === 'available') {
        mockBeds[idx].patientName = undefined;
        mockBeds[idx].patientId = undefined;
        mockBeds[idx].admissionDate = undefined;
        mockBeds[idx].doctor = undefined;
        mockBeds[idx].expectedDischarge = undefined;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bed Management</h1>
          <p className="text-gray-600 mt-2">Track bed occupancy, assign patients, and manage bed status</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg"><Bed className="w-5 h-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.total}</p><p className="text-xs text-gray-500">Total Beds</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg"><User className="w-5 h-5 text-red-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.occupied}</p><p className="text-xs text-gray-500">Occupied</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg"><CheckCircle className="w-5 h-5 text-green-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.available}</p><p className="text-xs text-gray-500">Available</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg"><Clock className="w-5 h-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.reserved}</p><p className="text-xs text-gray-500">Reserved</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg"><AlertTriangle className="w-5 h-5 text-orange-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.maintenance + stats.cleaning}</p><p className="text-xs text-gray-500">Unavailable</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg"><Building2 className="w-5 h-5 text-purple-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.occupancyRate}%</p><p className="text-xs text-gray-500">Occupancy</p></div>
            </div>
          </div>
        </div>

        {/* Occupancy by Type */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(stats.byType).map(([type, data]) => {
            const config = bedTypeConfig[type];
            const occupancy = Math.round((data.occupied / data.total) * 100);
            return (
              <div key={type} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {config.icon}
                    <span className="font-semibold text-gray-900">{type}</span>
                  </div>
                  <span className="text-sm text-gray-500">{data.occupied}/{data.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className={`h-2.5 rounded-full ${occupancy > 80 ? 'bg-red-500' : occupancy > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${occupancy}%` }} />
                </div>
                <p className="text-xs text-gray-500 mt-1">{occupancy}% occupied</p>
              </div>
            );
          })}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search by bed number, patient, or ward..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <select className="px-3 py-2 border border-gray-200 rounded-lg" value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}>
              <option value="All">All Types</option>
              <option value="ICU">ICU</option>
              <option value="General">General</option>
              <option value="Private">Private</option>
              <option value="Semi-Private">Semi-Private</option>
            </select>
            <select className="px-3 py-2 border border-gray-200 rounded-lg" value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="occupied">Occupied</option>
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="maintenance">Maintenance</option>
              <option value="cleaning">Cleaning</option>
            </select>
          </div>
        </div>

        {/* Bed Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Bed Overview</h2>
            <div className="flex items-center gap-4 text-xs">
              {Object.entries(statusConfig).map(([status, config]) => (
                <div key={status} className="flex items-center gap-1">
                  <div className={`w-3 h-3 rounded-full ${config.bgColor}`} />
                  <span className="text-gray-600 capitalize">{status}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {filteredBeds.map((bed) => {
              const statusInfo = statusConfig[bed.status];
              const typeInfo = bedTypeConfig[bed.type];
              return (
                <div key={bed.id}
                  onClick={() => { setSelectedBed(bed); setShowDetailModal(true); }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${statusInfo.bgColor} bg-opacity-10 border-opacity-30 hover:scale-105`}
                  style={{ borderColor: statusInfo.bgColor.replace('bg-', '').replace('-500', '') }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-gray-900">{bed.number}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${typeInfo.color}`}>{bed.type}</span>
                  </div>
                  <div className={`w-full h-1 rounded-full ${statusInfo.bgColor} mb-2`} />
                  {bed.status === 'occupied' && bed.patientName ? (
                    <div>
                      <p className="text-xs font-medium text-gray-900 truncate">{bed.patientName}</p>
                      <p className="text-[10px] text-gray-500">{bed.doctor}</p>
                      <p className="text-[10px] text-gray-400 mt-1">Since {bed.admissionDate}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 capitalize">{bed.status}</p>
                  )}
                </div>
              );
            })}
          </div>
          {filteredBeds.length === 0 && (
            <div className="text-center py-12">
              <Bed className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No beds found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedBed && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Bed {selectedBed.number}</h2>
                  <p className="text-sm text-gray-500">{selectedBed.ward} Ward - Floor {selectedBed.floor}</p>
                </div>
                <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs text-gray-500">Type</label>
                    <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${bedTypeConfig[selectedBed.type].color}`}>{selectedBed.type}</span></div>
                  <div><label className="text-xs text-gray-500">Status</label>
                    <span className={`inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[selectedBed.status].color} bg-opacity-20`}>
                      {statusConfig[selectedBed.status].icon} {selectedBed.status.charAt(0).toUpperCase() + selectedBed.status.slice(1)}
                    </span></div>
                </div>

                {selectedBed.status === 'occupied' && selectedBed.patientName && (
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <h3 className="font-semibold text-gray-900">Patient Information</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="text-xs text-gray-500">Name</label><p className="text-sm font-medium">{selectedBed.patientName}</p></div>
                      <div><label className="text-xs text-gray-500">Patient ID</label><p className="text-sm font-medium">{selectedBed.patientId}</p></div>
                      <div><label className="text-xs text-gray-500">Doctor</label><p className="text-sm font-medium">{selectedBed.doctor}</p></div>
                      <div><label className="text-xs text-gray-500">Admission Date</label><p className="text-sm font-medium">{selectedBed.admissionDate}</p></div>
                      {selectedBed.expectedDischarge && (
                        <div className="col-span-2"><label className="text-xs text-gray-500">Expected Discharge</label><p className="text-sm font-medium">{selectedBed.expectedDischarge}</p></div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  {selectedBed.status === 'available' && (
                    <button onClick={() => { setShowDetailModal(false); handleAssignBed(selectedBed); }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Plus className="w-4 h-4" /> Assign Patient
                    </button>
                  )}
                  {selectedBed.status === 'occupied' && (
                    <button onClick={() => { updateBedStatus(selectedBed.id, 'available'); setShowDetailModal(false); }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      <CheckCircle className="w-4 h-4" /> Discharge
                    </button>
                  )}
                  {selectedBed.status !== 'maintenance' && selectedBed.status !== 'cleaning' && (
                    <button onClick={() => { updateBedStatus(selectedBed.id, 'maintenance'); setShowDetailModal(false); }}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Set Maintenance</button>
                  )}
                  {(selectedBed.status === 'maintenance' || selectedBed.status === 'cleaning') && (
                    <button onClick={() => { updateBedStatus(selectedBed.id, 'available'); setShowDetailModal(false); }}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Mark Available</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assign Modal */}
        {showAssignModal && assigningBed && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Assign Bed</h2>
                  <p className="text-sm text-gray-500">{assigningBed.number} - {assigningBed.ward}</p>
                </div>
                <button onClick={() => setShowAssignModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={assignForm.patientName}
                    onChange={(e) => setAssignForm({ ...assignForm, patientName: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={assignForm.patientId}
                    onChange={(e) => setAssignForm({ ...assignForm, patientId: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Doctor</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={assignForm.doctor}
                    onChange={(e) => setAssignForm({ ...assignForm, doctor: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Discharge Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={assignForm.expectedDischarge}
                    onChange={(e) => setAssignForm({ ...assignForm, expectedDischarge: e.target.value })} />
                </div>
                <div className="flex gap-3 pt-4">
                  <button onClick={confirmAssign}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Assign</button>
                  <button onClick={() => setShowAssignModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
