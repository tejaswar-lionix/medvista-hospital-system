'use client';

import { useState, useMemo } from 'react';
import React from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Users,
  User,
  Calendar,
  Phone,
  Mail,
  Heart,
  X,
  CheckCircle,
  Clock,
  AlertTriangle,
  Baby,
  Child,
  PersonStanding,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Stethoscope,
  CalendarPlus,
} from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  dateOfBirth: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodType: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  insuranceId: string;
  allergies: string[];
  conditions: string[];
  lastVisit: string;
  upcomingAppointment?: string;
  status: 'active' | 'inactive';
}

interface Appointment {
  id: string;
  memberId: string;
  memberName: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  type: 'checkup' | 'follow-up' | 'consultation' | 'emergency';
  status: 'scheduled' | 'completed' | 'cancelled';
}

const mockFamily: FamilyMember[] = [
  {
    id: 'FAM-001', name: 'John Doe', relationship: 'Self', dateOfBirth: '1985-06-15',
    age: 41, gender: 'Male', bloodType: 'O+', phone: '(555) 100-0001', email: 'john.doe@email.com',
    address: '123 Main Street, Apt 4B, New York, NY 10001', emergencyContact: 'Jane Doe',
    emergencyPhone: '(555) 100-0002', insuranceId: 'INS-001', allergies: ['Penicillin'],
    conditions: ['Hypertension', 'Hyperlipidemia'], lastVisit: '2026-08-28',
    upcomingAppointment: '2026-09-15', status: 'active',
  },
  {
    id: 'FAM-002', name: 'Jane Doe', relationship: 'Spouse', dateOfBirth: '1987-03-22',
    age: 39, gender: 'Female', bloodType: 'A+', phone: '(555) 100-0002', email: 'jane.doe@email.com',
    address: '123 Main Street, Apt 4B, New York, NY 10001', emergencyContact: 'John Doe',
    emergencyPhone: '(555) 100-0001', insuranceId: 'INS-001', allergies: [],
    conditions: [], lastVisit: '2026-07-10', status: 'active',
  },
  {
    id: 'FAM-003', name: 'Emily Doe', relationship: 'Daughter', dateOfBirth: '2015-09-08',
    age: 10, gender: 'Female', bloodType: 'O+', phone: '', email: '',
    address: '123 Main Street, Apt 4B, New York, NY 10001', emergencyContact: 'John Doe',
    emergencyPhone: '(555) 100-0001', insuranceId: 'INS-001', allergies: ['Peanuts'],
    conditions: ['Asthma'], lastVisit: '2026-08-05',
    upcomingAppointment: '2026-09-10', status: 'active',
  },
  {
    id: 'FAM-004', name: 'Michael Doe', relationship: 'Son', dateOfBirth: '2018-02-14',
    age: 8, gender: 'Male', bloodType: 'B+', phone: '', email: '',
    address: '123 Main Street, Apt 4B, New York, NY 10001', emergencyContact: 'John Doe',
    emergencyPhone: '(555) 100-0001', insuranceId: 'INS-001', allergies: [],
    conditions: [], lastVisit: '2026-06-20', status: 'active',
  },
  {
    id: 'FAM-005', name: 'Robert Doe Sr.', relationship: 'Father', dateOfBirth: '1958-11-30',
    age: 67, gender: 'Male', bloodType: 'AB+', phone: '(555) 100-0005', email: 'robert.doe@email.com',
    address: '456 Oak Avenue, Brooklyn, NY 11201', emergencyContact: 'John Doe',
    emergencyPhone: '(555) 100-0001', insuranceId: 'INS-002', allergies: ['Aspirin', 'Sulfa drugs'],
    conditions: ['Type 2 Diabetes', 'Arthritis'], lastVisit: '2026-08-15',
    upcomingAppointment: '2026-09-20', status: 'active',
  },
  {
    id: 'FAM-006', name: 'Mary Doe', relationship: 'Mother', dateOfBirth: '1960-04-18',
    age: 66, gender: 'Female', bloodType: 'A-', phone: '(555) 100-0006', email: 'mary.doe@email.com',
    address: '456 Oak Avenue, Brooklyn, NY 11201', emergencyContact: 'John Doe',
    emergencyPhone: '(555) 100-0001', insuranceId: 'INS-002', allergies: [],
    conditions: ['Hypothyroidism'], lastVisit: '2026-07-25', status: 'active',
  },
];

const mockAppointments: Appointment[] = [
  { id: 'APT-001', memberId: 'FAM-001', memberName: 'John Doe', doctor: 'Dr. Michael Chen', department: 'Cardiology', date: '2026-09-15', time: '10:00 AM', type: 'follow-up', status: 'scheduled' },
  { id: 'APT-002', memberId: 'FAM-003', memberName: 'Emily Doe', doctor: 'Dr. Emily Rodriguez', department: 'Pediatrics', date: '2026-09-10', time: '2:30 PM', type: 'checkup', status: 'scheduled' },
  { id: 'APT-003', memberId: 'FAM-005', memberName: 'Robert Doe Sr.', doctor: 'Dr. David Kim', department: 'Endocrinology', date: '2026-09-20', time: '11:00 AM', type: 'follow-up', status: 'scheduled' },
  { id: 'APT-004', memberId: 'FAM-002', memberName: 'Jane Doe', doctor: 'Dr. Sarah Thompson', department: 'Gynecology', date: '2026-08-15', time: '9:00 AM', type: 'checkup', status: 'completed' },
  { id: 'APT-005', memberId: 'FAM-004', memberName: 'Michael Doe', doctor: 'Dr. Emily Rodriguez', department: 'Pediatrics', date: '2026-06-20', time: '3:00 PM', type: 'checkup', status: 'completed' },
];

const relationshipIcons: Record<string, React.ReactNode> = {
  Self: <User className="w-5 h-5" />,
  Spouse: <Heart className="w-5 h-5" />,
  Daughter: <Baby className="w-5 h-5" />,
  Son: <Child className="w-5 h-5" />,
  Father: <PersonStanding className="w-5 h-5" />,
  Mother: <PersonStanding className="w-5 h-5" />,
};

export default function PatientFamilyPage() {
  const [family] = useState<FamilyMember[]>(mockFamily);
  const [appointments] = useState<Appointment[]>(mockAppointments);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointmentFor, setAppointmentFor] = useState<string>('');
  const [newMember, setNewMember] = useState({ name: '', relationship: 'Self', dateOfBirth: '', gender: 'Male' as const, bloodType: '', phone: '', email: '', emergencyContact: '', emergencyPhone: '' });

  const filteredFamily = useMemo(() => {
    return family.filter((m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.relationship.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.bloodType.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [family, searchQuery]);

  const stats = useMemo(() => {
    const total = family.length;
    const adults = family.filter((m) => m.age >= 18).length;
    const children = family.filter((m) => m.age < 18).length;
    const withUpcoming = family.filter((m) => m.upcomingAppointment).length;
    const totalAppointments = appointments.filter((a) => a.status === 'scheduled').length;
    return { total, adults, children, withUpcoming, totalAppointments };
  }, [family, appointments]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Family</h1>
          <p className="text-gray-600 mt-2">Manage family members, view health info, and book appointments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg"><Users className="w-5 h-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.total}</p><p className="text-xs text-gray-500">Family Members</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg"><PersonStanding className="w-5 h-5 text-green-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.adults}</p><p className="text-xs text-gray-500">Adults</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 rounded-lg"><Baby className="w-5 h-5 text-pink-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.children}</p><p className="text-xs text-gray-500">Children</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg"><Calendar className="w-5 h-5 text-yellow-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.totalAppointments}</p><p className="text-xs text-gray-500">Upcoming Appts</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg"><Heart className="w-5 h-5 text-purple-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.withUpcoming}</p><p className="text-xs text-gray-500">With Appts</p></div>
            </div>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search family members..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <button onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-4 h-4" /> Add Family Member
            </button>
          </div>
        </div>

        {/* Family Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredFamily.map((member) => (
            <div key={member.id}
              className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all hover:shadow-md ${member.relationship === 'Self' ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-100'}`}>
              <div className={`p-5 ${member.relationship === 'Self' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-gray-500 to-gray-600'} text-white`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    {relationshipIcons[member.relationship] || <User className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-sm opacity-90">{member.relationship}</p>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-gray-500">Age</p><p className="font-medium">{member.age} years</p></div>
                  <div><p className="text-gray-500">Blood Type</p><p className="font-medium">{member.bloodType}</p></div>
                  <div><p className="text-gray-500">Gender</p><p className="font-medium">{member.gender}</p></div>
                  <div><p className="text-gray-500">DOB</p><p className="font-medium">{member.dateOfBirth}</p></div>
                </div>

                {member.allergies.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Allergies</p>
                    <div className="flex flex-wrap gap-1">
                      {member.allergies.map((a, i) => (
                        <span key={i} className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">{a}</span>
                      ))}
                    </div>
                  </div>
                )}

                {member.conditions.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Conditions</p>
                    <div className="flex flex-wrap gap-1">
                      {member.conditions.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">{c}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-sm">
                  <p className="text-gray-500">Last Visit</p>
                  <p className="font-medium">{member.lastVisit}</p>
                </div>

                {member.upcomingAppointment && (
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <p className="text-xs text-blue-600 font-medium">Upcoming Appointment</p>
                    <p className="text-sm text-blue-800">{member.upcomingAppointment}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <button onClick={() => { setSelectedMember(member); setShowDetailModal(true); }}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                    <Eye className="w-3 h-3" /> Details
                  </button>
                  <button onClick={() => { setAppointmentFor(member.id); setShowAppointmentModal(true); }}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                    <CalendarPlus className="w-3 h-3" /> Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Upcoming Family Appointments</h3>
          <div className="space-y-3">
            {appointments.filter((a) => a.status === 'scheduled').map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{apt.memberName}</p>
                    <p className="text-sm text-gray-500">{apt.doctor} - {apt.department}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{apt.date}</p>
                  <p className="text-sm text-gray-500">{apt.time}</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                  {apt.type.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedMember && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className={`p-6 ${selectedMember.relationship === 'Self' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-gray-500 to-gray-600'} text-white rounded-t-2xl`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                      {relationshipIcons[selectedMember.relationship]}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{selectedMember.name}</h2>
                      <p className="opacity-90">{selectedMember.relationship}</p>
                    </div>
                  </div>
                  <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-white/20 rounded-lg"><X className="w-5 h-5" /></button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs text-gray-500">Date of Birth</label><p className="text-sm font-medium">{selectedMember.dateOfBirth}</p></div>
                  <div><label className="text-xs text-gray-500">Age</label><p className="text-sm font-medium">{selectedMember.age} years</p></div>
                  <div><label className="text-xs text-gray-500">Gender</label><p className="text-sm font-medium">{selectedMember.gender}</p></div>
                  <div><label className="text-xs text-gray-500">Blood Type</label><p className="text-sm font-medium">{selectedMember.bloodType}</p></div>
                  {selectedMember.phone && (
                    <div><label className="text-xs text-gray-500">Phone</label><p className="text-sm font-medium">{selectedMember.phone}</p></div>
                  )}
                  {selectedMember.email && (
                    <div><label className="text-xs text-gray-500">Email</label><p className="text-sm font-medium">{selectedMember.email}</p></div>
                  )}
                </div>
                <div><label className="text-xs text-gray-500">Address</label><p className="text-sm font-medium">{selectedMember.address}</p></div>
                <div><label className="text-xs text-gray-500">Emergency Contact</label><p className="text-sm font-medium">{selectedMember.emergencyContact} - {selectedMember.emergencyPhone}</p></div>
                {selectedMember.allergies.length > 0 && (
                  <div>
                    <label className="text-xs text-gray-500">Allergies</label>
                    <div className="flex flex-wrap gap-1 mt-1">{selectedMember.allergies.map((a, i) => (<span key={i} className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">{a}</span>))}</div>
                  </div>
                )}
                {selectedMember.conditions.length > 0 && (
                  <div>
                    <label className="text-xs text-gray-500">Medical Conditions</label>
                    <div className="flex flex-wrap gap-1 mt-1">{selectedMember.conditions.map((c, i) => (<span key={i} className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">{c}</span>))}</div>
                  </div>
                )}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button onClick={() => { setShowDetailModal(false); setAppointmentFor(selectedMember.id); setShowAppointmentModal(true); }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <CalendarPlus className="w-4 h-4" /> Book Appointment
                  </button>
                  <button onClick={() => setShowDetailModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Member Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Add Family Member</h2>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMember.relationship}
                      onChange={(e) => setNewMember({ ...newMember, relationship: e.target.value })}>
                      <option>Self</option><option>Spouse</option><option>Son</option><option>Daughter</option>
                      <option>Father</option><option>Mother</option><option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMember.gender}
                      onChange={(e) => setNewMember({ ...newMember, gender: e.target.value as 'Male' | 'Female' | 'Other' })}>
                      <option>Male</option><option>Female</option><option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMember.dateOfBirth}
                      onChange={(e) => setNewMember({ ...newMember, dateOfBirth: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMember.bloodType}
                      onChange={(e) => setNewMember({ ...newMember, bloodType: e.target.value })}>
                      <option value="">Select</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                      <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMember.phone}
                    onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMember.emergencyContact}
                      onChange={(e) => setNewMember({ ...newMember, emergencyContact: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Phone</label>
                    <input type="tel" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMember.emergencyPhone}
                      onChange={(e) => setNewMember({ ...newMember, emergencyPhone: e.target.value })} />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Member</button>
                  <button onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appointment Modal */}
        {showAppointmentModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Book Appointment</h2>
                <button onClick={() => setShowAppointmentModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
                    <option>Cardiology</option><option>General Medicine</option><option>Pediatrics</option>
                    <option>Dermatology</option><option>Orthopedics</option><option>Endocrinology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Doctor</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
                      <option>9:00 AM</option><option>10:00 AM</option><option>11:00 AM</option>
                      <option>1:00 PM</option><option>2:00 PM</option><option>3:00 PM</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
                    <option>Check-up</option><option>Follow-up</option><option>Consultation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                  <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg" rows={2} />
                </div>
                <div className="flex gap-3 pt-4">
                  <button onClick={() => setShowAppointmentModal(false)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Book Appointment</button>
                  <button onClick={() => setShowAppointmentModal(false)}
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

function Eye(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}
