'use client';

import { useState, useMemo } from 'react';
import React from 'react';
import {
  Search,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Phone,
  Ambulance,
  Heart,
  Activity,
  Siren,
  Bed,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  X,
  Filter,
  RefreshCw,
  Zap,
  Shield,
  ArrowRight,
  Timer,
} from 'lucide-react';

interface EmergencyCase {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  triageLevel: 1 | 2 | 3 | 4 | 5;
  chiefComplaint: string;
  arrivalTime: string;
  arrivalMethod: 'ambulance' | 'walk-in' | 'transfer';
  assignedDoctor: string;
  assignedNurse: string;
  bedNumber?: string;
  status: 'waiting' | 'in-triage' | 'in-treatment' | 'admitted' | 'discharged' | 'transferred';
  vitalSigns: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    oxygenSat: number;
    respiratoryRate: number;
  };
  notes: string;
  waitTime: number;
}

const mockCases: EmergencyCase[] = [
  {
    id: 'ER-2026-001', patientName: 'John Smith', age: 58, gender: 'Male', triageLevel: 1,
    chiefComplaint: 'Chest pain and shortness of breath', arrivalTime: '2026-09-01 08:15',
    arrivalMethod: 'ambulance', assignedDoctor: 'Dr. Michael Chen', assignedNurse: 'Nurse Rachel Green',
    bedNumber: 'ER-01', status: 'in-treatment',
    vitalSigns: { heartRate: 110, bloodPressure: '160/95', temperature: 98.8, oxygenSat: 92, respiratoryRate: 24 },
    notes: 'ECG shows ST elevation. Troponin pending. Activated cardiac cath team.',
    waitTime: 0,
  },
  {
    id: 'ER-2026-002', patientName: 'Maria Garcia', age: 34, gender: 'Female', triageLevel: 2,
    chiefComplaint: 'Severe abdominal pain with vomiting', arrivalTime: '2026-09-01 08:45',
    arrivalMethod: 'ambulance', assignedDoctor: 'Dr. Emily Rodriguez', assignedNurse: 'Nurse James Wilson',
    bedNumber: 'ER-03', status: 'in-treatment',
    vitalSigns: { heartRate: 95, bloodPressure: '125/80', temperature: 100.2, oxygenSat: 98, respiratoryRate: 18 },
    notes: 'CT scan ordered. Possible appendicitis. NPO status.',
    waitTime: 0,
  },
  {
    id: 'ER-2026-003', patientName: 'Robert Brown', age: 72, gender: 'Male', triageLevel: 2,
    chiefComplaint: 'Fall with hip pain and inability to bear weight', arrivalTime: '2026-09-01 09:30',
    arrivalMethod: 'walk-in', assignedDoctor: 'Dr. Robert Martinez', assignedNurse: 'Nurse Rachel Green',
    bedNumber: 'ER-05', status: 'in-triage',
    vitalSigns: { heartRate: 82, bloodPressure: '135/85', temperature: 98.4, oxygenSat: 96, respiratoryRate: 16 },
    notes: 'X-ray ordered. Patient on blood thinners - check for bleeding.',
    waitTime: 15,
  },
  {
    id: 'ER-2026-004', patientName: 'Lisa Anderson', age: 28, gender: 'Female', triageLevel: 3,
    chiefComplaint: 'Migraine headache for 3 days', arrivalTime: '2026-09-01 10:00',
    arrivalMethod: 'walk-in', assignedDoctor: 'Dr. David Kim', assignedNurse: '',
    status: 'waiting',
    vitalSigns: { heartRate: 78, bloodPressure: '118/72', temperature: 98.6, oxygenSat: 99, respiratoryRate: 14 },
    notes: 'Patient reports photophobia and nausea. Previous history of migraines.',
    waitTime: 45,
  },
  {
    id: 'ER-2026-005', patientName: 'Kevin Martinez', age: 45, gender: 'Male', triageLevel: 3,
    chiefComplaint: 'Lower back pain after lifting heavy object', arrivalTime: '2026-09-01 10:30',
    arrivalMethod: 'walk-in', assignedDoctor: 'Dr. Robert Martinez', assignedNurse: '',
    status: 'waiting',
    vitalSigns: { heartRate: 72, bloodPressure: '128/78', temperature: 98.5, oxygenSat: 99, respiratoryRate: 14 },
    notes: 'No red flags. Conservative management planned.',
    waitTime: 30,
  },
  {
    id: 'ER-2026-006', patientName: 'Amanda Taylor', age: 65, gender: 'Female', triageLevel: 2,
    chiefComplaint: 'Difficulty breathing and wheezing', arrivalTime: '2026-09-01 07:50',
    arrivalMethod: 'ambulance', assignedDoctor: 'Dr. Sarah Thompson', assignedNurse: 'Nurse James Wilson',
    bedNumber: 'ER-02', status: 'admitted',
    vitalSigns: { heartRate: 105, bloodPressure: '142/88', temperature: 99.1, oxygenSat: 89, respiratoryRate: 28 },
    notes: 'Acute asthma exacerbation. Started on nebulizer treatments. Admitted to pulmonary.',
    waitTime: 0,
  },
  {
    id: 'ER-2026-007', patientName: 'Christopher Lee', age: 8, gender: 'Male', triageLevel: 3,
    chiefComplaint: 'Fever 102.5°F and sore throat', arrivalTime: '2026-09-01 11:00',
    arrivalMethod: 'walk-in', assignedDoctor: '', assignedNurse: '',
    status: 'waiting',
    vitalSigns: { heartRate: 110, bloodPressure: '95/60', temperature: 102.5, oxygenSat: 98, respiratoryRate: 20 },
    notes: 'Rapid strep test ordered. Parent concerned about duration of fever.',
    waitTime: 20,
  },
  {
    id: 'ER-2026-008', patientName: 'Nancy Johnson', age: 52, gender: 'Female', triageLevel: 1,
    chiefComplaint: 'Stroke symptoms - sudden left side weakness', arrivalTime: '2026-09-01 09:00',
    arrivalMethod: 'ambulance', assignedDoctor: 'Dr. Michael Chen', assignedNurse: 'Nurse Rachel Green',
    bedNumber: 'ER-04', status: 'in-treatment',
    vitalSigns: { heartRate: 88, bloodPressure: '178/100', temperature: 98.2, oxygenSat: 97, respiratoryRate: 16 },
    notes: 'Code Stroke activated. CT head completed - no bleed. tPA administered within window.',
    waitTime: 0,
  },
];

const triageConfig: Record<number, { color: string; bgColor: string; label: string; description: string }> = {
  1: { color: 'text-red-700', bgColor: 'bg-red-500', label: 'Resuscitation', description: 'Immediate life-threatening' },
  2: { color: 'text-orange-700', bgColor: 'bg-orange-500', label: 'Emergent', description: 'High risk, confused/lethargic' },
  3: { color: 'text-yellow-700', bgColor: 'bg-yellow-500', label: 'Urgent', description: 'Stable but needs attention' },
  4: { color: 'text-green-700', bgColor: 'bg-green-500', label: 'Less Urgent', description: 'Minor conditions' },
  5: { color: 'text-blue-700', bgColor: 'bg-blue-500', label: 'Non-Urgent', description: 'Walk-in, minor issues' },
};

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  waiting: { color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="w-3 h-3" /> },
  'in-triage': { color: 'bg-blue-100 text-blue-800', icon: <Stethoscope className="w-3 h-3" /> },
  'in-treatment': { color: 'bg-purple-100 text-purple-800', icon: <Activity className="w-3 h-3" /> },
  admitted: { color: 'bg-green-100 text-green-800', icon: <Bed className="w-3 h-3" /> },
  discharged: { color: 'bg-gray-100 text-gray-800', icon: <CheckCircle className="w-3 h-3" /> },
  transferred: { color: 'bg-blue-100 text-blue-800', icon: <Ambulance className="w-3 h-3" /> },
};

const arrivalIcons: Record<string, React.ReactNode> = {
  ambulance: <Ambulance className="w-4 h-4 text-red-500" />,
  'walk-in': <User className="w-4 h-4 text-blue-500" />,
  transfer: <ArrowRight className="w-4 h-4 text-purple-500" />,
};

export default function EmergencyPage() {
  const [cases] = useState<EmergencyCase[]>(mockCases);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTriage, setSelectedTriage] = useState<number | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedCase, setSelectedCase] = useState<EmergencyCase | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const matchesSearch =
        c.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTriage = selectedTriage === 'All' || c.triageLevel === selectedTriage;
      const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
      return matchesSearch && matchesTriage && matchesStatus;
    });
  }, [cases, searchQuery, selectedTriage, selectedStatus]);

  const stats = useMemo(() => {
    const total = cases.length;
    const waiting = cases.filter((c) => c.status === 'waiting').length;
    const inTreatment = cases.filter((c) => c.status === 'in-treatment').length;
    const admitted = cases.filter((c) => c.status === 'admitted').length;
    const level1 = cases.filter((c) => c.triageLevel === 1).length;
    const level2 = cases.filter((c) => c.triageLevel === 2).length;
    const avgWaitTime = Math.round(cases.filter((c) => c.waitTime > 0).reduce((sum, c) => sum + c.waitTime, 0) / cases.filter((c) => c.waitTime > 0).length || 0);
    return { total, waiting, inTreatment, admitted, level1, level2, avgWaitTime };
  }, [cases]);

  const priorityQueue = useMemo(() => {
    return [...cases]
      .filter((c) => c.status === 'waiting' || c.status === 'in-triage')
      .sort((a, b) => a.triageLevel - b.triageLevel || a.waitTime - b.waitTime);
  }, [cases]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Siren className="w-8 h-8 text-red-600" />
              Emergency Department
            </h1>
            <p className="text-gray-600 mt-2">Manage emergency cases, triage, and patient flow</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-medium">
              <Zap className="w-4 h-4" /> {stats.level1} Critical
            </span>
            <span className="flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
              <AlertTriangle className="w-4 h-4" /> {stats.level2} Emergent
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg"><Activity className="w-5 h-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.total}</p><p className="text-xs text-gray-500">Total Cases</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg"><Clock className="w-5 h-5 text-yellow-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.waiting}</p><p className="text-xs text-gray-500">Waiting</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg"><Stethoscope className="w-5 h-5 text-purple-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.inTreatment}</p><p className="text-xs text-gray-500">In Treatment</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg"><Bed className="w-5 h-5 text-green-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.admitted}</p><p className="text-xs text-gray-500">Admitted</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg"><Timer className="w-5 h-5 text-red-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.avgWaitTime}m</p><p className="text-xs text-gray-500">Avg Wait</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg"><Heart className="w-5 h-5 text-red-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.level1}</p><p className="text-xs text-gray-500">Critical</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg"><AlertTriangle className="w-5 h-5 text-orange-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.level2}</p><p className="text-xs text-gray-500">Emergent</p></div>
            </div>
          </div>
        </div>

        {/* Priority Queue */}
        {priorityQueue.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Siren className="w-5 h-5 text-red-600 animate-pulse" />
              <h2 className="font-semibold text-gray-900">Priority Queue</h2>
              <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">{priorityQueue.length} patients</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {priorityQueue.map((c) => {
                const triage = triageConfig[c.triageLevel];
                return (
                  <div key={c.id}
                    onClick={() => { setSelectedCase(c); setShowDetailModal(true); }}
                    className="min-w-[200px] p-3 rounded-xl border-2 cursor-pointer hover:shadow-md transition-all"
                    style={{ borderColor: triage.bgColor.replace('bg-', '').replace('-500', '') }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-bold ${triage.color}`}>Level {c.triageLevel}</span>
                      <span className="text-[10px] text-gray-500">{c.waitTime}m wait</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 truncate">{c.patientName}</p>
                    <p className="text-xs text-gray-500 truncate">{c.chiefComplaint}</p>
                    <div className={`w-full h-1 rounded-full ${triage.bgColor} mt-2`} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Triage Level Legend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex items-center gap-6 flex-wrap">
            <span className="text-sm font-medium text-gray-700">Triage Levels:</span>
            {Object.entries(triageConfig).map(([level, config]) => (
              <div key={level} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded ${config.bgColor}`} />
                <span className="text-xs text-gray-600">Level {level}: {config.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search patients or complaints..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <select className="px-3 py-2 border border-gray-200 rounded-lg"
              value={selectedTriage} onChange={(e) => setSelectedTriage(e.target.value === 'All' ? 'All' : parseInt(e.target.value))}>
              <option value="All">All Triage</option>
              {[1, 2, 3, 4, 5].map((l) => (<option key={l} value={l}>Level {l} - {triageConfig[l].label}</option>))}
            </select>
            <select className="px-3 py-2 border border-gray-200 rounded-lg"
              value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="All">All Status</option>
              {Object.keys(statusConfig).map((s) => (
                <option key={s} value={s}>{s.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Cases Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Triage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaint</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vitals</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCases.map((c) => {
                  const triage = triageConfig[c.triageLevel];
                  const statusInfo = statusConfig[c.status];
                  return (
                    <tr key={c.id} className={`hover:bg-gray-50 transition-colors ${c.triageLevel === 1 ? 'bg-red-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg ${triage.bgColor} flex items-center justify-center text-white font-bold text-sm`}>
                            {c.triageLevel}
                          </div>
                          <span className={`text-xs font-medium ${triage.color}`}>{triage.label}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {c.patientName.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{c.patientName}</p>
                            <p className="text-xs text-gray-500">{c.age}y {c.gender}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900 max-w-[200px] truncate">{c.chiefComplaint}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {arrivalIcons[c.arrivalMethod]}
                          <div>
                            <p className="text-xs text-gray-500">{c.arrivalTime.split(' ')[1]}</p>
                            <p className="text-[10px] text-gray-400 capitalize">{c.arrivalMethod}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs space-y-0.5">
                          <p>HR: <span className={`font-medium ${c.vitalSigns.heartRate > 100 ? 'text-red-600' : ''}`}>{c.vitalSigns.heartRate}</span></p>
                          <p>BP: {c.vitalSigns.bloodPressure}</p>
                          <p>O2: <span className={`font-medium ${c.vitalSigns.oxygenSat < 94 ? 'text-red-600' : ''}`}>{c.vitalSigns.oxygenSat}%</span></p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {c.assignedDoctor || <span className="text-gray-400">Unassigned</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          {statusInfo.icon}
                          {c.status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button onClick={() => { setSelectedCase(c); setShowDetailModal(true); }}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredCases.length === 0 && (
            <div className="text-center py-12">
              <Siren className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No emergency cases found.</p>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedCase && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className={`p-6 ${selectedCase.triageLevel === 1 ? 'bg-red-600' : selectedCase.triageLevel === 2 ? 'bg-orange-500' : 'bg-blue-600'} text-white rounded-t-2xl`}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold">Level {selectedCase.triageLevel}</span>
                      <span className="text-sm opacity-90">- {triageConfig[selectedCase.triageLevel].label}</span>
                    </div>
                    <p className="opacity-90 mt-1">{triageConfig[selectedCase.triageLevel].description}</p>
                  </div>
                  <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-white/20 rounded-lg"><X className="w-5 h-5" /></button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs text-gray-500">Patient</label><p className="text-sm font-medium">{selectedCase.patientName}</p></div>
                  <div><label className="text-xs text-gray-500">Age/Gender</label><p className="text-sm font-medium">{selectedCase.age} / {selectedCase.gender}</p></div>
                  <div><label className="text-xs text-gray-500">Chief Complaint</label><p className="text-sm font-medium">{selectedCase.chiefComplaint}</p></div>
                  <div><label className="text-xs text-gray-500">Arrival</label><p className="text-sm font-medium">{selectedCase.arrivalTime}</p></div>
                  <div><label className="text-xs text-gray-500">Method</label><p className="text-sm font-medium capitalize">{selectedCase.arrivalMethod}</p></div>
                  <div><label className="text-xs text-gray-500">Bed</label><p className="text-sm font-medium">{selectedCase.bedNumber || 'Not assigned'}</p></div>
                  <div><label className="text-xs text-gray-500">Doctor</label><p className="text-sm font-medium">{selectedCase.assignedDoctor || 'Unassigned'}</p></div>
                  <div><label className="text-xs text-gray-500">Nurse</label><p className="text-sm font-medium">{selectedCase.assignedNurse || 'Unassigned'}</p></div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Vital Signs</h4>
                  <div className="grid grid-cols-5 gap-3">
                    <div className="text-center">
                      <Heart className="w-5 h-5 text-red-500 mx-auto mb-1" />
                      <p className="text-lg font-bold">{selectedCase.vitalSigns.heartRate}</p>
                      <p className="text-[10px] text-gray-500">HR (bpm)</p>
                    </div>
                    <div className="text-center">
                      <Activity className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                      <p className="text-lg font-bold">{selectedCase.vitalSigns.bloodPressure}</p>
                      <p className="text-[10px] text-gray-500">BP</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">{selectedCase.vitalSigns.temperature}°</p>
                      <p className="text-[10px] text-gray-500">Temp (°F)</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-lg font-bold ${selectedCase.vitalSigns.oxygenSat < 94 ? 'text-red-600' : ''}`}>{selectedCase.vitalSigns.oxygenSat}%</p>
                      <p className="text-[10px] text-gray-500">SpO2</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">{selectedCase.vitalSigns.respiratoryRate}</p>
                      <p className="text-[10px] text-gray-500">RR</p>
                    </div>
                  </div>
                </div>

                <div><label className="text-xs text-gray-500">Clinical Notes</label><p className="text-sm text-gray-600 mt-1">{selectedCase.notes}</p></div>

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Update Status</button>
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Admit Patient</button>
                  <button onClick={() => setShowDetailModal(false)}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Eye(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}
