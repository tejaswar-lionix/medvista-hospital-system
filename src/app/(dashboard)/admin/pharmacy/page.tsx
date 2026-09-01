'use client';

import { useState, useMemo } from 'react';
import React from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  AlertTriangle,
  Package,
  Clock,
  TrendingDown,
  TrendingUp,
  Filter,
  ChevronDown,
  X,
  CheckCircle,
  Pill,
  RefreshCw,
  Download,
  Barcode,
  ShoppingCart,
  Calendar,
  Building2,
  DollarSign,
  Boxes,
  RotateCcw,
} from 'lucide-react';

interface Medicine {
  id: string;
  name: string;
  genericName: string;
  category: string;
  manufacturer: string;
  dosageForm: string;
  strength: string;
  batchNumber: string;
  expiryDate: string;
  price: number;
  cost: number;
  quantityInStock: number;
  minimumStock: number;
  unit: string;
  shelf: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired';
  lastRestocked: string;
  supplier: string;
  requiresPrescription: boolean;
  storageTemp: string;
}

const mockMedicines: Medicine[] = [
  {
    id: 'MED-001', name: 'Amoxicillin', genericName: 'Amoxicillin Trihydrate', category: 'Antibiotics',
    manufacturer: 'PharmaCorp Inc.', dosageForm: 'Capsule', strength: '500mg',
    batchNumber: 'BN-2026-0123', expiryDate: '2027-06-15', price: 12.99, cost: 8.50,
    quantityInStock: 2500, minimumStock: 500, unit: 'capsules', shelf: 'A-12',
    status: 'in-stock', lastRestocked: '2026-08-15', supplier: 'MedSupply Co.',
    requiresPrescription: true, storageTemp: 'Room Temperature',
  },
  {
    id: 'MED-002', name: 'Lisinopril', genericName: 'Lisinopril Dihydrate', category: 'Cardiovascular',
    manufacturer: 'HeartCare Labs', dosageForm: 'Tablet', strength: '10mg',
    batchNumber: 'BN-2026-0456', expiryDate: '2027-03-20', price: 8.50, cost: 4.25,
    quantityInStock: 1800, minimumStock: 300, unit: 'tablets', shelf: 'B-08',
    status: 'in-stock', lastRestocked: '2026-08-20', supplier: 'CardioMed Supply',
    requiresPrescription: true, storageTemp: 'Room Temperature',
  },
  {
    id: 'MED-003', name: 'Metformin', genericName: 'Metformin Hydrochloride', category: 'Antidiabetics',
    manufacturer: 'DiabetCare Pharma', dosageForm: 'Tablet', strength: '500mg',
    batchNumber: 'BN-2026-0789', expiryDate: '2026-12-31', price: 6.75, cost: 3.10,
    quantityInStock: 150, minimumStock: 200, unit: 'tablets', shelf: 'C-05',
    status: 'low-stock', lastRestocked: '2026-07-10', supplier: 'DiabetCare Supply',
    requiresPrescription: true, storageTemp: 'Room Temperature',
  },
  {
    id: 'MED-004', name: 'Paracetamol', genericName: 'Acetaminophen', category: 'Analgesics',
    manufacturer: 'PainRelief Inc.', dosageForm: 'Tablet', strength: '500mg',
    batchNumber: 'BN-2026-1011', expiryDate: '2028-01-15', price: 3.99, cost: 1.50,
    quantityInStock: 5000, minimumStock: 1000, unit: 'tablets', shelf: 'D-01',
    status: 'in-stock', lastRestocked: '2026-08-25', supplier: 'General Pharma',
    requiresPrescription: false, storageTemp: 'Room Temperature',
  },
  {
    id: 'MED-005', name: 'Insulin Glargine', genericName: 'Insulin Glargine', category: 'Antidiabetics',
    manufacturer: 'DiabetCare Pharma', dosageForm: 'Injection', strength: '100 units/mL',
    batchNumber: 'BN-2026-1213', expiryDate: '2026-11-30', price: 89.99, cost: 55.00,
    quantityInStock: 25, minimumStock: 30, unit: 'vials', shelf: 'F-02',
    status: 'low-stock', lastRestocked: '2026-08-01', supplier: 'DiabetCare Supply',
    requiresPrescription: true, storageTemp: 'Refrigerated (2-8°C)',
  },
  {
    id: 'MED-006', name: 'Omeprazole', genericName: 'Omeprazole', category: 'Gastrointestinal',
    manufacturer: 'GastroPharm', dosageForm: 'Capsule', strength: '20mg',
    batchNumber: 'BN-2026-1415', expiryDate: '2027-09-10', price: 15.50, cost: 9.00,
    quantityInStock: 800, minimumStock: 200, unit: 'capsules', shelf: 'A-08',
    status: 'in-stock', lastRestocked: '2026-08-18', supplier: 'GastroMed Supply',
    requiresPrescription: false, storageTemp: 'Room Temperature',
  },
  {
    id: 'MED-007', name: 'Ciprofloxacin', genericName: 'Ciprofloxacin HCl', category: 'Antibiotics',
    manufacturer: 'AntiBio Labs', dosageForm: 'Tablet', strength: '250mg',
    batchNumber: 'BN-2026-1617', expiryDate: '2026-08-30', price: 18.75, cost: 11.00,
    quantityInStock: 0, minimumStock: 100, unit: 'tablets', shelf: 'A-15',
    status: 'expired', lastRestocked: '2025-12-01', supplier: 'MedSupply Co.',
    requiresPrescription: true, storageTemp: 'Room Temperature',
  },
  {
    id: 'MED-008', name: 'Atorvastatin', genericName: 'Atorvastatin Calcium', category: 'Cardiovascular',
    manufacturer: 'HeartCare Labs', dosageForm: 'Tablet', strength: '20mg',
    batchNumber: 'BN-2026-1819', expiryDate: '2027-12-25', price: 22.00, cost: 14.50,
    quantityInStock: 1200, minimumStock: 250, unit: 'tablets', shelf: 'B-10',
    status: 'in-stock', lastRestocked: '2026-08-22', supplier: 'CardioMed Supply',
    requiresPrescription: true, storageTemp: 'Room Temperature',
  },
  {
    id: 'MED-009', name: 'Salbutamol Inhaler', genericName: 'Albuterol Sulfate', category: 'Respiratory',
    manufacturer: 'BreatheEasy Inc.', dosageForm: 'Inhaler', strength: '100mcg/puff',
    batchNumber: 'BN-2026-2021', expiryDate: '2027-05-18', price: 28.99, cost: 18.00,
    quantityInStock: 45, minimumStock: 50, unit: 'inhalers', shelf: 'E-04',
    status: 'low-stock', lastRestocked: '2026-07-28', supplier: 'RespiratoryMed Supply',
    requiresPrescription: true, storageTemp: 'Room Temperature',
  },
  {
    id: 'MED-010', name: 'Ibuprofen', genericName: 'Ibuprofen', category: 'Analgesics',
    manufacturer: 'PainRelief Inc.', dosageForm: 'Tablet', strength: '400mg',
    batchNumber: 'BN-2026-2223', expiryDate: '2028-03-20', price: 4.50, cost: 2.00,
    quantityInStock: 3500, minimumStock: 800, unit: 'tablets', shelf: 'D-03',
    status: 'in-stock', lastRestocked: '2026-08-26', supplier: 'General Pharma',
    requiresPrescription: false, storageTemp: 'Room Temperature',
  },
];

const categories = ['All', 'Antibiotics', 'Cardiovascular', 'Antidiabetics', 'Analgesics', 'Gastrointestinal', 'Respiratory'];
const statusColors = {
  'in-stock': 'bg-green-100 text-green-800',
  'low-stock': 'bg-yellow-100 text-yellow-800',
  'out-of-stock': 'bg-red-100 text-red-800',
  'expired': 'bg-gray-100 text-gray-800',
};
const statusLabels = {
  'in-stock': 'In Stock',
  'low-stock': 'Low Stock',
  'out-of-stock': 'Out of Stock',
  'expired': 'Expired',
};

export default function PharmacyPage() {
  const [medicines] = useState<Medicine[]>(mockMedicines);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [newMedicine, setNewMedicine] = useState({
    name: '', genericName: '', category: 'Antibiotics', manufacturer: '', dosageForm: 'Tablet',
    strength: '', batchNumber: '', expiryDate: '', price: 0, cost: 0, quantityInStock: 0,
    minimumStock: 0, unit: 'tablets', shelf: '', supplier: '', requiresPrescription: true,
    storageTemp: 'Room Temperature',
  });

  const filteredMedicines = useMemo(() => {
    return medicines.filter((med) => {
      const matchesSearch =
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.batchNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [medicines, searchQuery, selectedCategory]);

  const stats = useMemo(() => {
    const total = medicines.length;
    const totalValue = medicines.reduce((sum, m) => sum + m.price * m.quantityInStock, 0);
    const lowStock = medicines.filter((m) => m.status === 'low-stock').length;
    const expired = medicines.filter((m) => m.status === 'expired').length;
    const outOfStock = medicines.filter((m) => m.status === 'out-of-stock').length;
    const totalUnits = medicines.reduce((sum, m) => sum + m.quantityInStock, 0);
    return { total, totalValue, lowStock, expired, outOfStock, totalUnits };
  }, [medicines]);

  const getDaysUntilExpiry = (date: string) => {
    const expiry = new Date(date);
    const today = new Date();
    const diff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const handleAddMedicine = () => {
    const status: Medicine['status'] =
      newMedicine.quantityInStock === 0 ? 'out-of-stock' :
      newMedicine.quantityInStock < newMedicine.minimumStock ? 'low-stock' : 'in-stock';
    const medicine: Medicine = {
      ...newMedicine,
      id: `MED-${String(medicines.length + 1).padStart(3, '0')}`,
      status,
      lastRestocked: new Date().toISOString().split('T')[0],
    };
    mockMedicines.push(medicine);
    setShowAddModal(false);
    setNewMedicine({
      name: '', genericName: '', category: 'Antibiotics', manufacturer: '', dosageForm: 'Tablet',
      strength: '', batchNumber: '', expiryDate: '', price: 0, cost: 0, quantityInStock: 0,
      minimumStock: 0, unit: 'tablets', shelf: '', supplier: '', requiresPrescription: true,
      storageTemp: 'Room Temperature',
    });
  };

  const handleEditMedicine = (med: Medicine) => {
    setEditingMedicine(med);
    setNewMedicine({
      name: med.name, genericName: med.genericName, category: med.category,
      manufacturer: med.manufacturer, dosageForm: med.dosageForm, strength: med.strength,
      batchNumber: med.batchNumber, expiryDate: med.expiryDate, price: med.price,
      cost: med.cost, quantityInStock: med.quantityInStock, minimumStock: med.minimumStock,
      unit: med.unit, shelf: med.shelf, supplier: med.supplier,
      requiresPrescription: med.requiresPrescription, storageTemp: med.storageTemp,
    });
    setShowAddModal(true);
  };

  const handleSaveEdit = () => {
    if (!editingMedicine) return;
    const idx = mockMedicines.findIndex((m) => m.id === editingMedicine.id);
    if (idx !== -1) {
      const status: Medicine['status'] =
        newMedicine.quantityInStock === 0 ? 'out-of-stock' :
        newMedicine.quantityInStock < newMedicine.minimumStock ? 'low-stock' : 'in-stock';
      mockMedicines[idx] = { ...mockMedicines[idx], ...newMedicine, status };
    }
    setShowAddModal(false);
    setEditingMedicine(null);
  };

  const handleDeleteMedicine = (id: string) => {
    const idx = mockMedicines.findIndex((m) => m.id === id);
    if (idx !== -1) mockMedicines.splice(idx, 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pharmacy Management</h1>
          <p className="text-gray-600 mt-2">Manage medicine inventory, stock levels, and expiry tracking</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-xs text-gray-500">Medicines</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">${stats.totalValue.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Total Value</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Boxes className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUnits.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Total Units</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.lowStock}</p>
                <p className="text-xs text-gray-500">Low Stock</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Clock className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.expired}</p>
                <p className="text-xs text-gray-500">Expired</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.outOfStock}</p>
                <p className="text-xs text-gray-500">Out of Stock</p>
              </div>
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        {medicines.filter((m) => m.status === 'low-stock' || m.status === 'out-of-stock').length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <h3 className="font-semibold text-yellow-800">Stock Alerts</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {medicines.filter((m) => m.status === 'low-stock' || m.status === 'out-of-stock').map((med) => (
                <div key={med.id} className="bg-white p-3 rounded-lg border border-yellow-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{med.name}</p>
                      <p className="text-xs text-gray-500">{med.strength} - {med.dosageForm}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[med.status]}`}>
                      {statusLabels[med.status]}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-600">Stock: {med.quantityInStock} / Min: {med.minimumStock}</span>
                    <button className="text-xs text-blue-600 hover:text-blue-800">Reorder</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expiry Alerts */}
        {medicines.filter((m) => getDaysUntilExpiry(m.expiryDate) < 90 && getDaysUntilExpiry(m.expiryDate) > 0).length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-red-800">Expiry Alerts (Expiring within 90 days)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {medicines.filter((m) => getDaysUntilExpiry(m.expiryDate) < 90 && getDaysUntilExpiry(m.expiryDate) > 0).map((med) => (
                <div key={med.id} className="bg-white p-3 rounded-lg border border-red-200">
                  <p className="font-medium text-gray-900">{med.name}</p>
                  <p className="text-xs text-gray-500">{med.strength} - Batch: {med.batchNumber}</p>
                  <p className="text-sm text-red-600 mt-1">Expires: {med.expiryDate} ({getDaysUntilExpiry(m.expiryDate)} days)</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search medicines, batch numbers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-gray-200 rounded-lg"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button
              onClick={() => { setEditingMedicine(null); setShowAddModal(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Add Medicine
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Medicine Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredMedicines.map((med) => {
                  const daysToExpiry = getDaysUntilExpiry(med.expiryDate);
                  const stockPercentage = Math.min((med.quantityInStock / med.minimumStock) * 100, 100);
                  return (
                    <tr key={med.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{med.name}</p>
                          <p className="text-xs text-gray-500">{med.genericName}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm text-gray-900">{med.strength}</p>
                          <p className="text-xs text-gray-500">{med.dosageForm}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{med.batchNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className={`text-sm ${daysToExpiry < 30 ? 'text-red-600 font-medium' : daysToExpiry < 90 ? 'text-yellow-600' : 'text-gray-900'}`}>
                            {med.expiryDate}
                          </p>
                          <p className="text-xs text-gray-500">{daysToExpiry} days left</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-24">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">{med.quantityInStock}</span>
                            <span className="text-gray-400">/ {med.minimumStock} min</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${stockPercentage >= 100 ? 'bg-green-500' : stockPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${stockPercentage}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${med.price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[med.status]}`}>
                          {statusLabels[med.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { setSelectedMedicine(med); setShowDetailModal(true); }}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <Pill className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditMedicine(med)}
                            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteMedicine(med.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredMedicines.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No medicines found.</p>
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">{editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}</h2>
                <button onClick={() => { setShowAddModal(false); setEditingMedicine(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMedicine.name}
                      onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Generic Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMedicine.genericName}
                      onChange={(e) => setNewMedicine({ ...newMedicine, genericName: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMedicine.category}
                      onChange={(e) => setNewMedicine({ ...newMedicine, category: e.target.value })}>
                      {categories.filter((c) => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMedicine.manufacturer}
                      onChange={(e) => setNewMedicine({ ...newMedicine, manufacturer: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dosage Form</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMedicine.dosageForm}
                      onChange={(e) => setNewMedicine({ ...newMedicine, dosageForm: e.target.value })}>
                      <option>Tablet</option><option>Capsule</option><option>Injection</option>
                      <option>Inhaler</option><option>Syrup</option><option>Cream</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Strength</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMedicine.strength}
                      onChange={(e) => setNewMedicine({ ...newMedicine, strength: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMedicine.batchNumber}
                      onChange={(e) => setNewMedicine({ ...newMedicine, batchNumber: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMedicine.expiryDate}
                      onChange={(e) => setNewMedicine({ ...newMedicine, expiryDate: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <input type="number" step="0.01" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMedicine.price}
                      onChange={(e) => setNewMedicine({ ...newMedicine, price: parseFloat(e.target.value) || 0 })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cost ($)</label>
                    <input type="number" step="0.01" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMedicine.cost}
                      onChange={(e) => setNewMedicine({ ...newMedicine, cost: parseFloat(e.target.value) || 0 })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity in Stock</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMedicine.quantityInStock}
                      onChange={(e) => setNewMedicine({ ...newMedicine, quantityInStock: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Stock Level</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMedicine.minimumStock}
                      onChange={(e) => setNewMedicine({ ...newMedicine, minimumStock: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMedicine.unit}
                      onChange={(e) => setNewMedicine({ ...newMedicine, unit: e.target.value })}>
                      <option>tablets</option><option>capsules</option><option>vials</option>
                      <option>inhalers</option><option>tubes</option><option>bottles</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shelf Location</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMedicine.shelf}
                      onChange={(e) => setNewMedicine({ ...newMedicine, shelf: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newMedicine.supplier}
                      onChange={(e) => setNewMedicine({ ...newMedicine, supplier: e.target.value })} />
                  </div>
                  <div className="col-span-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" checked={newMedicine.requiresPrescription}
                        onChange={(e) => setNewMedicine({ ...newMedicine, requiresPrescription: e.target.checked })} />
                      <span className="text-sm font-medium text-gray-700">Requires Prescription</span>
                    </label>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={editingMedicine ? handleSaveEdit : handleAddMedicine}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingMedicine ? 'Save Changes' : 'Add Medicine'}
                  </button>
                  <button
                    onClick={() => { setShowAddModal(false); setEditingMedicine(null); }}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedMedicine && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedMedicine.name}</h2>
                  <p className="text-sm text-gray-500">{selectedMedicine.id}</p>
                </div>
                <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs text-gray-500">Generic Name</label><p className="text-sm font-medium">{selectedMedicine.genericName}</p></div>
                  <div><label className="text-xs text-gray-500">Category</label><p className="text-sm font-medium">{selectedMedicine.category}</p></div>
                  <div><label className="text-xs text-gray-500">Manufacturer</label><p className="text-sm font-medium">{selectedMedicine.manufacturer}</p></div>
                  <div><label className="text-xs text-gray-500">Dosage Form</label><p className="text-sm font-medium">{selectedMedicine.dosageForm}</p></div>
                  <div><label className="text-xs text-gray-500">Strength</label><p className="text-sm font-medium">{selectedMedicine.strength}</p></div>
                  <div><label className="text-xs text-gray-500">Batch Number</label><p className="text-sm font-medium font-mono">{selectedMedicine.batchNumber}</p></div>
                  <div><label className="text-xs text-gray-500">Expiry Date</label><p className="text-sm font-medium">{selectedMedicine.expiryDate}</p></div>
                  <div><label className="text-xs text-gray-500">Shelf Location</label><p className="text-sm font-medium">{selectedMedicine.shelf}</p></div>
                  <div><label className="text-xs text-gray-500">Price</label><p className="text-sm font-medium">${selectedMedicine.price.toFixed(2)}</p></div>
                  <div><label className="text-xs text-gray-500">Cost</label><p className="text-sm font-medium">${selectedMedicine.cost.toFixed(2)}</p></div>
                  <div><label className="text-xs text-gray-500">Stock Level</label><p className="text-sm font-medium">{selectedMedicine.quantityInStock} {selectedMedicine.unit}</p></div>
                  <div><label className="text-xs text-gray-500">Storage</label><p className="text-sm font-medium">{selectedMedicine.storageTemp}</p></div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">Supplier: {selectedMedicine.supplier}</p>
                  <p className="text-xs text-gray-500">Last Restocked: {selectedMedicine.lastRestocked}</p>
                  <p className="text-xs text-gray-500">Requires Prescription: {selectedMedicine.requiresPrescription ? 'Yes' : 'No'}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => { setShowDetailModal(false); handleEditMedicine(selectedMedicine); }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Edit2 className="w-4 h-4" /> Edit
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
