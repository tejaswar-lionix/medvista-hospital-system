'use client';

import { useState, useMemo } from 'react';
import React from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Wrench,
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Filter,
  X,
  RefreshCw,
  Download,
  Calendar,
  Building2,
  DollarSign,
  BarChart3,
  Settings,
  Truck,
  Shield,
  Cpu,
} from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  category: string;
  model: string;
  manufacturer: string;
  serialNumber: string;
  location: string;
  department: string;
  purchaseDate: string;
  purchasePrice: number;
  status: 'operational' | 'maintenance' | 'out-of-service' | 'retired';
  lastMaintenance: string;
  nextMaintenance: string;
  warrantyExpiry: string;
  assignedTo: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
}

const mockEquipment: Equipment[] = [
  { id: 'EQ-001', name: 'MRI Scanner', category: 'Imaging', model: 'Magnetom Vida 3T', manufacturer: 'Siemens Healthineers', serialNumber: 'MRI-2024-7891', location: 'Radiology Room 1', department: 'Radiology', purchaseDate: '2022-03-15', purchasePrice: 2500000, status: 'operational', lastMaintenance: '2026-07-15', nextMaintenance: '2026-10-15', warrantyExpiry: '2029-03-15', assignedTo: 'Dr. Sarah Thompson', condition: 'excellent' },
  { id: 'EQ-002', name: 'CT Scanner', category: 'Imaging', model: 'Revolution CT', manufacturer: 'GE Healthcare', serialNumber: 'CT-2023-4562', location: 'Radiology Room 2', department: 'Radiology', purchaseDate: '2023-06-20', purchasePrice: 1800000, status: 'operational', lastMaintenance: '2026-08-01', nextMaintenance: '2026-11-01', warrantyExpiry: '2028-06-20', assignedTo: 'Dr. Michael Chen', condition: 'excellent' },
  { id: 'EQ-003', name: 'Ultrasound Machine', category: 'Imaging', model: 'EPIQ 7', manufacturer: 'Philips', serialNumber: 'US-2025-1234', location: 'Ultrasound Room 1', department: 'Radiology', purchaseDate: '2025-01-10', purchasePrice: 150000, status: 'operational', lastMaintenance: '2026-06-20', nextMaintenance: '2026-09-20', warrantyExpiry: '2028-01-10', assignedTo: 'Dr. Emily Rodriguez', condition: 'good' },
  { id: 'EQ-004', name: 'Ventilator', category: 'Life Support', model: 'Evita V500', manufacturer: 'Drager', serialNumber: 'VENT-2024-5678', location: 'ICU Bed 1', department: 'ICU', purchaseDate: '2024-02-28', purchasePrice: 45000, status: 'operational', lastMaintenance: '2026-08-10', nextMaintenance: '2026-11-10', warrantyExpiry: '2027-02-28', assignedTo: 'ICU Team', condition: 'good' },
  { id: 'EQ-005', name: 'Patient Monitor', category: 'Monitoring', model: 'IntelliVue MX800', manufacturer: 'Philips', serialNumber: 'PM-2023-9012', location: 'ICU Bed 3', department: 'ICU', purchaseDate: '2023-09-05', purchasePrice: 25000, status: 'maintenance', lastMaintenance: '2026-08-28', nextMaintenance: '2026-09-15', warrantyExpiry: '2026-09-05', assignedTo: '', condition: 'fair' },
  { id: 'EQ-006', name: 'Defibrillator', category: 'Emergency', model: 'HeartStart MRx', manufacturer: 'Philips', serialNumber: 'DEF-2024-3456', location: 'Emergency Room', department: 'Emergency', purchaseDate: '2024-05-15', purchasePrice: 35000, status: 'operational', lastMaintenance: '2026-07-25', nextMaintenance: '2026-10-25', warrantyExpiry: '2027-05-15', assignedTo: 'ER Team', condition: 'excellent' },
  { id: 'EQ-007', name: 'Anesthesia Machine', category: 'Surgical', model: 'Aisys CS²', manufacturer: 'GE Healthcare', serialNumber: 'AN-2022-7890', location: 'Operating Room 1', department: 'Surgery', purchaseDate: '2022-11-20', purchasePrice: 120000, status: 'out-of-service', lastMaintenance: '2026-08-20', nextMaintenance: '2026-09-10', warrantyExpiry: '2025-11-20', assignedTo: '', condition: 'poor' },
  { id: 'EQ-008', name: 'Blood Gas Analyzer', category: 'Laboratory', model: 'ABL90 FLEX', manufacturer: 'Radiometer', serialNumber: 'BGA-2025-2345', location: 'Lab Room 1', department: 'Laboratory', purchaseDate: '2025-04-12', purchasePrice: 65000, status: 'operational', lastMaintenance: '2026-08-05', nextMaintenance: '2026-11-05', warrantyExpiry: '2028-04-12', assignedTo: 'Lab Team', condition: 'excellent' },
  { id: 'EQ-009', name: 'X-Ray Machine', category: 'Imaging', model: 'DigitalDiagnost C50', manufacturer: 'Philips', serialNumber: 'XR-2023-6789', location: 'Radiology Room 3', department: 'Radiology', purchaseDate: '2023-08-18', purchasePrice: 280000, status: 'operational', lastMaintenance: '2026-07-30', nextMaintenance: '2026-10-30', warrantyExpiry: '2026-08-18', assignedTo: 'Radiology Tech', condition: 'good' },
  { id: 'EQ-010', name: 'Autoclave', category: 'Sterilization', model: 'AMSCO V-PRO', manufacturer: 'Steris', serialNumber: 'AC-2024-8901', location: 'Central Sterile', department: 'Central Sterile Supply', purchaseDate: '2024-01-25', purchasePrice: 42000, status: 'operational', lastMaintenance: '2026-08-15', nextMaintenance: '2026-11-15', warrantyExpiry: '2027-01-25', assignedTo: 'CSSD Team', condition: 'good' },
];

const categories = ['All', 'Imaging', 'Life Support', 'Monitoring', 'Emergency', 'Surgical', 'Laboratory', 'Sterilization'];
const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  operational: { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-3 h-3" /> },
  maintenance: { color: 'bg-yellow-100 text-yellow-800', icon: <Wrench className="w-3 h-3" /> },
  'out-of-service': { color: 'bg-red-100 text-red-800', icon: <XCircle className="w-3 h-3" /> },
  retired: { color: 'bg-gray-100 text-gray-800', icon: <Package className="w-3 h-3" /> },
};
const conditionColors: Record<string, string> = {
  excellent: 'text-green-600',
  good: 'text-blue-600',
  fair: 'text-yellow-600',
  poor: 'text-red-600',
};

export default function InventoryPage() {
  const [equipment] = useState<Equipment[]>(mockEquipment);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<Equipment | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredEquipment = useMemo(() => {
    return equipment.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [equipment, searchQuery, selectedCategory, selectedStatus]);

  const stats = useMemo(() => {
    const total = equipment.length;
    const operational = equipment.filter((e) => e.status === 'operational').length;
    const maintenance = equipment.filter((e) => e.status === 'maintenance').length;
    const outOfService = equipment.filter((e) => e.status === 'out-of-service').length;
    const totalValue = equipment.reduce((sum, e) => sum + e.purchasePrice, 0);
    const needsMaintenance = equipment.filter((e) => {
      const next = new Date(e.nextMaintenance);
      const now = new Date();
      return (next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) < 30;
    }).length;
    return { total, operational, maintenance, outOfService, totalValue, needsMaintenance };
  }, [equipment]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-2">Track equipment, maintenance schedules, and asset status</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg"><Package className="w-5 h-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.total}</p><p className="text-xs text-gray-500">Total Items</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg"><CheckCircle className="w-5 h-5 text-green-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.operational}</p><p className="text-xs text-gray-500">Operational</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg"><Wrench className="w-5 h-5 text-yellow-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.maintenance}</p><p className="text-xs text-gray-500">Maintenance</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg"><XCircle className="w-5 h-5 text-red-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.outOfService}</p><p className="text-xs text-gray-500">Out of Service</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg"><DollarSign className="w-5 h-5 text-green-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">${(stats.totalValue / 1000000).toFixed(1)}M</p><p className="text-xs text-gray-500">Total Value</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg"><AlertTriangle className="w-5 h-5 text-orange-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.needsMaintenance}</p><p className="text-xs text-gray-500">Due Soon</p></div>
            </div>
          </div>
        </div>

        {/* Maintenance Alerts */}
        {equipment.filter((e) => {
          const next = new Date(e.nextMaintenance);
          const now = new Date();
          return (next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) < 30 && (next.getTime() - now.getTime()) > 0;
        }).length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-orange-800">Upcoming Maintenance (Within 30 Days)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {equipment.filter((e) => {
                const next = new Date(e.nextMaintenance);
                const now = new Date();
                return (next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) < 30 && (next.getTime() - now.getTime()) > 0;
              }).map((item) => (
                <div key={item.id} className="bg-white p-3 rounded-lg border border-orange-200">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.location}</p>
                  <p className="text-sm text-orange-600 mt-1">Due: {item.nextMaintenance}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search equipment, serial numbers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <select className="px-3 py-2 border border-gray-200 rounded-lg" value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
            </select>
            <select className="px-3 py-2 border border-gray-200 rounded-lg" value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="operational">Operational</option>
              <option value="maintenance">Maintenance</option>
              <option value="out-of-service">Out of Service</option>
              <option value="retired">Retired</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>

        {/* Equipment Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Maintenance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEquipment.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.model}</p>
                        <p className="text-xs text-gray-400 font-mono">{item.serialNumber}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{item.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{item.location}</p>
                      <p className="text-xs text-gray-500">{item.department}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{item.nextMaintenance}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium capitalize ${conditionColors[item.condition]}`}>{item.condition}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${item.purchasePrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[item.status].color}`}>
                        {statusConfig[item.status].icon}
                        {item.status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setSelectedItem(item); setShowDetailModal(true); }}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Settings className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg">
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredEquipment.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No equipment found.</p>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedItem.name}</h2>
                  <p className="text-sm text-gray-500">{selectedItem.id}</p>
                </div>
                <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs text-gray-500">Model</label><p className="text-sm font-medium">{selectedItem.model}</p></div>
                  <div><label className="text-xs text-gray-500">Manufacturer</label><p className="text-sm font-medium">{selectedItem.manufacturer}</p></div>
                  <div><label className="text-xs text-gray-500">Serial Number</label><p className="text-sm font-medium font-mono">{selectedItem.serialNumber}</p></div>
                  <div><label className="text-xs text-gray-500">Category</label><p className="text-sm font-medium">{selectedItem.category}</p></div>
                  <div><label className="text-xs text-gray-500">Location</label><p className="text-sm font-medium">{selectedItem.location}</p></div>
                  <div><label className="text-xs text-gray-500">Department</label><p className="text-sm font-medium">{selectedItem.department}</p></div>
                  <div><label className="text-xs text-gray-500">Purchase Date</label><p className="text-sm font-medium">{selectedItem.purchaseDate}</p></div>
                  <div><label className="text-xs text-gray-500">Purchase Price</label><p className="text-sm font-medium">${selectedItem.purchasePrice.toLocaleString()}</p></div>
                  <div><label className="text-xs text-gray-500">Last Maintenance</label><p className="text-sm font-medium">{selectedItem.lastMaintenance}</p></div>
                  <div><label className="text-xs text-gray-500">Next Maintenance</label><p className="text-sm font-medium">{selectedItem.nextMaintenance}</p></div>
                  <div><label className="text-xs text-gray-500">Warranty Expiry</label><p className="text-sm font-medium">{selectedItem.warrantyExpiry}</p></div>
                  <div><label className="text-xs text-gray-500">Condition</label><p className={`text-sm font-medium capitalize ${conditionColors[selectedItem.condition]}`}>{selectedItem.condition}</p></div>
                  {selectedItem.assignedTo && (
                    <div className="col-span-2"><label className="text-xs text-gray-500">Assigned To</label><p className="text-sm font-medium">{selectedItem.assignedTo}</p></div>
                  )}
                </div>
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Wrench className="w-4 h-4" /> Schedule Maintenance
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
