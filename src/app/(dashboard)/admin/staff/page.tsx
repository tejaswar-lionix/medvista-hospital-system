'use client';

import { useState, useMemo } from 'react';
import React from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Users,
  Filter,
  X,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Download,
  ChevronDown,
  ChevronUp,
  Building2,
  Briefcase,
  Award,
  Star,
  UserCheck,
  UserX,
  RefreshCw,
} from 'lucide-react';

interface Staff {
  id: string;
  name: string;
  role: string;
  department: string;
  specialization: string;
  email: string;
  phone: string;
  address: string;
  hireDate: string;
  salary: number;
  status: 'active' | 'on-leave' | 'inactive' | 'suspended';
  shift: 'morning' | 'afternoon' | 'night' | 'rotating';
  qualifications: string[];
  experience: number;
  rating: number;
  profileImage?: string;
}

const mockStaff: Staff[] = [
  { id: 'STF-001', name: 'Dr. Michael Chen', role: 'Senior Cardiologist', department: 'Cardiology', specialization: 'Interventional Cardiology', email: 'michael.chen@hospital.com', phone: '(555) 123-4501', address: '123 Medical Drive', hireDate: '2018-03-15', salary: 285000, status: 'active', shift: 'morning', qualifications: ['MD', 'FACC', 'Board Certified Cardiology'], experience: 15, rating: 4.9 },
  { id: 'STF-002', name: 'Dr. Emily Rodriguez', role: 'Dermatologist', department: 'Dermatology', specialization: 'Cosmetic Dermatology', email: 'emily.rodriguez@hospital.com', phone: '(555) 123-4502', address: '456 Health Lane', hireDate: '2020-07-22', salary: 245000, status: 'active', shift: 'morning', qualifications: ['MD', 'Board Certified Dermatology'], experience: 10, rating: 4.8 },
  { id: 'STF-003', name: 'Dr. David Kim', role: 'Endocrinologist', department: 'Endocrinology', specialization: 'Diabetes Management', email: 'david.kim@hospital.com', phone: '(555) 123-4503', address: '789 Wellness Blvd', hireDate: '2019-11-10', salary: 255000, status: 'active', shift: 'afternoon', qualifications: ['MD', 'FACE', 'Board Certified Endocrinology'], experience: 12, rating: 4.7 },
  { id: 'STF-004', name: 'Dr. Sarah Thompson', role: 'Pulmonologist', department: 'Pulmonology', specialization: 'Critical Care Pulmonology', email: 'sarah.thompson@hospital.com', phone: '(555) 123-4504', address: '321 Care Street', hireDate: '2017-05-08', salary: 275000, status: 'active', shift: 'rotating', qualifications: ['MD', 'FCCP', 'Board Certified Pulmonology'], experience: 18, rating: 4.9 },
  { id: 'STF-005', name: 'Nurse Rachel Green', role: 'Head Nurse', department: 'ICU', specialization: 'Critical Care Nursing', email: 'rachel.green@hospital.com', phone: '(555) 123-4505', address: '654 Hospital Ave', hireDate: '2016-01-20', salary: 95000, status: 'active', shift: 'night', qualifications: ['BSN', 'CCRN', 'ACLs Certified'], experience: 8, rating: 4.8 },
  { id: 'STF-006', name: 'Nurse James Wilson', role: 'Registered Nurse', department: 'Emergency', specialization: 'Emergency Nursing', email: 'james.wilson@hospital.com', phone: '(555) 123-4506', address: '987 First Aid Lane', hireDate: '2021-09-15', salary: 78000, status: 'on-leave', shift: 'afternoon', qualifications: ['BSN', 'CEN', 'TNCC'], experience: 5, rating: 4.5 },
  { id: 'STF-007', name: 'Dr. Robert Martinez', role: 'Orthopedic Surgeon', department: 'Orthopedics', specialization: 'Sports Medicine', email: 'robert.martinez@hospital.com', phone: '(555) 123-4507', address: '147 Bone Health Dr', hireDate: '2015-08-12', salary: 320000, status: 'active', shift: 'morning', qualifications: ['MD', 'FAAOS', 'Board Certified Orthopedic Surgery'], experience: 20, rating: 4.9 },
  { id: 'STF-008', name: 'Lisa Anderson', role: 'Pharmacist', department: 'Pharmacy', specialization: 'Clinical Pharmacy', email: 'lisa.anderson@hospital.com', phone: '(555) 123-4508', address: '258 Pharma Road', hireDate: '2019-04-05', salary: 115000, status: 'active', shift: 'morning', qualifications: ['PharmD', 'BCPS', 'Clinical Pharmacy Residency'], experience: 7, rating: 4.6 },
  { id: 'STF-009', name: 'Mark Taylor', role: 'Lab Technician', department: 'Laboratory', specialization: 'Clinical Chemistry', email: 'mark.taylor@hospital.com', phone: '(555) 123-4509', address: '369 Lab Lane', hireDate: '2022-02-18', salary: 52000, status: 'active', shift: 'rotating', qualifications: ['ASCP Certification', 'MLT'], experience: 4, rating: 4.4 },
  { id: 'STF-010', name: 'Nancy Johnson', role: 'Radiologist', department: 'Radiology', specialization: 'Neuroradiology', email: 'nancy.johnson@hospital.com', phone: '(555) 123-4510', address: '741 Imaging Center', hireDate: '2018-10-30', salary: 295000, status: 'active', shift: 'morning', qualifications: ['MD', 'Diagnostic Radiology Board Certified'], experience: 14, rating: 4.8 },
  { id: 'STF-011', name: 'Tom Harris', role: 'Physical Therapist', department: 'Rehabilitation', specialization: 'Sports Rehabilitation', email: 'tom.harris@hospital.com', phone: '(555) 123-4511', address: '852 Rehab Way', hireDate: '2020-06-12', salary: 72000, status: 'inactive', shift: 'afternoon', qualifications: ['DPT', 'OCS', 'SCS'], experience: 6, rating: 4.3 },
  { id: 'STF-012', name: 'Sandra White', role: 'Nurse Practitioner', department: 'Family Medicine', specialization: 'Primary Care', email: 'sandra.white@hospital.com', phone: '(555) 123-4512', address: '963 Family Court', hireDate: '2021-01-25', salary: 105000, status: 'active', shift: 'morning', qualifications: ['MSN', 'FNP-BC', 'Family Nurse Practitioner'], experience: 5, rating: 4.7 },
];

const departments = ['All', 'Cardiology', 'Dermatology', 'Endocrinology', 'Pulmonology', 'ICU', 'Emergency', 'Orthopedics', 'Pharmacy', 'Laboratory', 'Radiology', 'Rehabilitation', 'Family Medicine'];
const roles = ['All', 'Doctor', 'Nurse', 'Technician', 'Pharmacist', 'Therapist'];
const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  active: { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-3 h-3" /> },
  'on-leave': { color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="w-3 h-3" /> },
  inactive: { color: 'bg-gray-100 text-gray-800', icon: <UserX className="w-3 h-3" /> },
  suspended: { color: 'bg-red-100 text-red-800', icon: <AlertTriangle className="w-3 h-3" /> },
};

export default function StaffPage() {
  const [staff] = useState<Staff[]>(mockStaff);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredStaff = useMemo(() => {
    return staff.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.specialization.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment = selectedDepartment === 'All' || s.department === selectedDepartment;
      const matchesRole = selectedRole === 'All' || s.role.toLowerCase().includes(selectedRole.toLowerCase());
      const matchesStatus = selectedStatus === 'All' || s.status === selectedStatus;
      return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
    });
  }, [staff, searchQuery, selectedDepartment, selectedRole, selectedStatus]);

  const stats = useMemo(() => {
    const total = staff.length;
    const active = staff.filter((s) => s.status === 'active').length;
    const onLeave = staff.filter((s) => s.status === 'on-leave').length;
    const doctors = staff.filter((s) => s.role.toLowerCase().includes('dr')).length;
    const nurses = staff.filter((s) => s.role.toLowerCase().includes('nurse')).length;
    const avgRating = staff.reduce((sum, s) => sum + s.rating, 0) / total;
    return { total, active, onLeave, doctors, nurses, avgRating };
  }, [staff]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-2">Manage staff, schedules, departments, and roles</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg"><Users className="w-5 h-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.total}</p><p className="text-xs text-gray-500">Total Staff</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg"><UserCheck className="w-5 h-5 text-green-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.active}</p><p className="text-xs text-gray-500">Active</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg"><Clock className="w-5 h-5 text-yellow-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.onLeave}</p><p className="text-xs text-gray-500">On Leave</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg"><Award className="w-5 h-5 text-purple-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.doctors}</p><p className="text-xs text-gray-500">Doctors</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 rounded-lg"><Briefcase className="w-5 h-5 text-pink-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.nurses}</p><p className="text-xs text-gray-500">Nurses</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg"><Star className="w-5 h-5 text-yellow-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.avgRating.toFixed(1)}</p><p className="text-xs text-gray-500">Avg Rating</p></div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search staff by name, ID, or specialization..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <select className="px-3 py-2 border border-gray-200 rounded-lg" value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}>
              {departments.map((dept) => (<option key={dept} value={dept}>{dept}</option>))}
            </select>
            <select className="px-3 py-2 border border-gray-200 rounded-lg" value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}>
              {roles.map((role) => (<option key={role} value={role}>{role}</option>))}
            </select>
            <select className="px-3 py-2 border border-gray-200 rounded-lg" value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="active">Active</option>
              <option value="on-leave">On Leave</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-4 h-4" /> Add Staff
            </button>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStaff.map((s) => {
                  const isExpanded = expandedRow === s.id;
                  return (
                    <React.Fragment key={s.id}>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {s.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{s.name}</p>
                              <p className="text-xs text-gray-500">{s.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{s.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{s.department}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600 capitalize">{s.shift}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.experience} yrs</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium text-gray-900">{s.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[s.status].color}`}>
                            {statusConfig[s.status].icon}
                            {s.status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-2">
                            <button onClick={() => { setSelectedStaff(s); setShowDetailModal(true); }}
                              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg">
                              <Edit2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr>
                          <td colSpan={8} className="px-6 py-4 bg-gray-50">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div><p className="text-gray-500">Phone</p><p className="font-medium">{s.phone}</p></div>
                              <div><p className="text-gray-500">Address</p><p className="font-medium">{s.address}</p></div>
                              <div><p className="text-gray-500">Hire Date</p><p className="font-medium">{s.hireDate}</p></div>
                              <div><p className="text-gray-500">Salary</p><p className="font-medium">${s.salary.toLocaleString()}</p></div>
                            </div>
                            <div className="mt-3">
                              <p className="text-gray-500 text-xs mb-1">Qualifications</p>
                              <div className="flex flex-wrap gap-1">
                                {s.qualifications.map((q, i) => (
                                  <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">{q}</span>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredStaff.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No staff found.</p>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedStaff && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {selectedStaff.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedStaff.name}</h2>
                    <p className="text-sm text-gray-500">{selectedStaff.role}</p>
                  </div>
                </div>
                <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs text-gray-500">Department</label><p className="text-sm font-medium">{selectedStaff.department}</p></div>
                  <div><label className="text-xs text-gray-500">Specialization</label><p className="text-sm font-medium">{selectedStaff.specialization}</p></div>
                  <div><label className="text-xs text-gray-500">Email</label><p className="text-sm font-medium">{selectedStaff.email}</p></div>
                  <div><label className="text-xs text-gray-500">Phone</label><p className="text-sm font-medium">{selectedStaff.phone}</p></div>
                  <div><label className="text-xs text-gray-500">Shift</label><p className="text-sm font-medium capitalize">{selectedStaff.shift}</p></div>
                  <div><label className="text-xs text-gray-500">Experience</label><p className="text-sm font-medium">{selectedStaff.experience} years</p></div>
                  <div><label className="text-xs text-gray-500">Hire Date</label><p className="text-sm font-medium">{selectedStaff.hireDate}</p></div>
                  <div><label className="text-xs text-gray-500">Rating</label>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">{selectedStaff.rating}/5.0</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Qualifications</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedStaff.qualifications.map((q, i) => (
                      <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">{q}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Calendar className="w-4 h-4" /> Schedule
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

function Eye(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}
