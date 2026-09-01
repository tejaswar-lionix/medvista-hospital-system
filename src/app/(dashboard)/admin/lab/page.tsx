'use client';

import { useState, useMemo } from 'react';
import React from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  TestTube,
  Filter,
  X,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  Tag,
  FlaskConical,
  Microscope,
  Activity,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Download,
  BarChart3,
  Beaker,
  Stethoscope,
  Thermometer,
} from 'lucide-react';

interface LabTest {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  turnaroundTime: string;
  sampleType: string;
  normalRange: string;
  preparationInstructions: string;
  status: 'active' | 'inactive' | 'pending-approval';
  ordersCount: number;
  department: string;
  method: string;
  requiresFasting: boolean;
}

const mockTests: LabTest[] = [
  {
    id: 'LAB-001', name: 'Complete Blood Count (CBC)', category: 'Hematology',
    description: 'Measures red and white blood cells, platelets, hemoglobin, and hematocrit.',
    price: 35.00, turnaroundTime: '4-6 hours', sampleType: 'Blood (EDTA)',
    normalRange: 'WBC: 4.5-11.0 K/uL, RBC: 4.5-5.5 M/uL, Platelets: 150-400 K/uL',
    preparationInstructions: 'No special preparation required.', status: 'active',
    ordersCount: 1250, department: 'Pathology', method: 'Automated Cell Counter',
    requiresFasting: false,
  },
  {
    id: 'LAB-002', name: 'Lipid Panel', category: 'Chemistry',
    description: 'Measures total cholesterol, LDL, HDL, and triglycerides.',
    price: 45.00, turnaroundTime: '2-4 hours', sampleType: 'Blood (Serum)',
    normalRange: 'Total Cholesterol: <200 mg/dL, LDL: <100 mg/dL, HDL: >40 mg/dL',
    preparationInstructions: 'Fast for 9-12 hours before test.', status: 'active',
    ordersCount: 980, department: 'Chemistry', method: 'Enzymatic Assay',
    requiresFasting: true,
  },
  {
    id: 'LAB-003', name: 'Thyroid Panel (TSH, T3, T4)', category: 'Endocrinology',
    description: 'Evaluates thyroid function including TSH, Free T3, and Free T4 levels.',
    price: 65.00, turnaroundTime: '6-8 hours', sampleType: 'Blood (Serum)',
    normalRange: 'TSH: 0.4-4.0 mIU/L, Free T3: 2.3-4.2 pg/mL, Free T4: 0.8-1.8 ng/dL',
    preparationInstructions: 'No special preparation required. Morning draw preferred.',
    status: 'active', ordersCount: 720, department: 'Endocrinology',
    method: 'Chemiluminescent Immunoassay', requiresFasting: false,
  },
  {
    id: 'LAB-004', name: 'Urinalysis', category: 'Urinalysis',
    description: 'Analyzes urine for color, clarity, pH, specific gravity, and presence of glucose, protein, or blood.',
    price: 20.00, turnaroundTime: '1-2 hours', sampleType: 'Urine (Clean Catch)',
    normalRange: 'Color: Yellow, pH: 4.5-8.0, Specific Gravity: 1.005-1.030',
    preparationInstructions: 'Clean catch midstream sample preferred.',
    status: 'active', ordersCount: 1500, department: 'Clinical Lab',
    method: 'Dipstick & Microscopy', requiresFasting: false,
  },
  {
    id: 'LAB-005', name: 'Hemoglobin A1c (HbA1c)', category: 'Endocrinology',
    description: 'Measures average blood sugar levels over the past 2-3 months.',
    price: 50.00, turnaroundTime: '4-6 hours', sampleType: 'Blood (EDTA)',
    normalRange: 'Normal: <5.7%, Pre-diabetes: 5.7-6.4%, Diabetes: ≥6.5%',
    preparationInstructions: 'No fasting required.', status: 'active',
    ordersCount: 890, department: 'Endocrinology', method: 'HPLC',
    requiresFasting: false,
  },
  {
    id: 'LAB-006', name: 'Comprehensive Metabolic Panel (CMP)', category: 'Chemistry',
    description: 'Measures glucose, calcium, electrolytes, kidney and liver function markers.',
    price: 40.00, turnaroundTime: '2-4 hours', sampleType: 'Blood (Serum)',
    normalRange: 'Glucose: 70-100 mg/dL, BUN: 7-20 mg/dL, Creatinine: 0.6-1.2 mg/dL',
    preparationInstructions: 'Fast for 8-12 hours before test.', status: 'active',
    ordersCount: 1100, department: 'Chemistry', method: 'Colorimetric/Enzymatic',
    requiresFasting: true,
  },
  {
    id: 'LAB-007', name: 'Coagulation Panel (PT/INR, aPTT)', category: 'Hematology',
    description: 'Evaluates blood clotting ability including prothrombin time and activated partial thromboplastin time.',
    price: 30.00, turnaroundTime: '1-2 hours', sampleType: 'Blood (Citrate)',
    normalRange: 'PT: 11-13.5 seconds, INR: 0.8-1.2, aPTT: 25-35 seconds',
    preparationInstructions: 'Inform lab of any anticoagulant therapy.',
    status: 'active', ordersCount: 650, department: 'Hematology',
    method: 'Clot-based Assay', requiresFasting: false,
  },
  {
    id: 'LAB-008', name: 'Urine Culture & Sensitivity', category: 'Microbiology',
    description: 'Identifies bacteria in urine and determines antibiotic sensitivity.',
    price: 55.00, turnaroundTime: '24-48 hours', sampleType: 'Uine (Clean Catch)',
    normalRange: 'No growth (<10,000 CFU/mL)',
    preparationInstructions: 'Collect first morning urine. Clean catch midstream.',
    status: 'active', ordersCount: 420, department: 'Microbiology',
    method: 'Culture & Kirby-Bauer', requiresFasting: false,
  },
  {
    id: 'LAB-009', name: 'Thyroid Stimulating Hormone (TSH)', category: 'Endocrinology',
    description: 'Screens for thyroid disorders by measuring TSH levels.',
    price: 30.00, turnaroundTime: '2-4 hours', sampleType: 'Blood (Serum)',
    normalRange: '0.4-4.0 mIU/L',
    preparationInstructions: 'No special preparation required.',
    status: 'active', ordersCount: 850, department: 'Endocrinology',
    method: 'Chemiluminescent Immunoassay', requiresFasting: false,
  },
  {
    id: 'LAB-010', name: 'C-Reactive Protein (CRP)', category: 'Immunology',
    description: 'Measures inflammation levels in the body.',
    price: 25.00, turnaroundTime: '2-4 hours', sampleType: 'Blood (Serum)',
    normalRange: '<3.0 mg/L',
    preparationInstructions: 'No special preparation required.',
    status: 'active', ordersCount: 380, department: 'Immunology',
    method: 'Immunoturbidimetric', requiresFasting: false,
  },
  {
    id: 'LAB-011', name: 'Vitamin D Level', category: 'Endocrinology',
    description: 'Measures 25-hydroxyvitamin D levels to assess vitamin D status.',
    price: 60.00, turnaroundTime: '6-8 hours', sampleType: 'Blood (Serum)',
    normalRange: 'Sufficient: 30-100 ng/mL, Deficient: <20 ng/mL',
    preparationInstructions: 'No special preparation required.',
    status: 'pending-approval', ordersCount: 290, department: 'Endocrinology',
    method: 'LC-MS/MS', requiresFasting: false,
  },
  {
    id: 'LAB-012', name: 'Stool Occult Blood Test', category: 'Gastroenterology',
    description: 'Detects hidden blood in stool which may indicate GI bleeding.',
    price: 15.00, turnaroundTime: '1-2 hours', sampleType: 'Stool',
    normalRange: 'Negative',
    preparationInstructions: 'Avoid red meat, vitamin C, and NSAIDs 3 days before test.',
    status: 'inactive', ordersCount: 180, department: 'Gastroenterology',
    method: 'Immunological', requiresFasting: false,
  },
];

const categories = ['All', 'Hematology', 'Chemistry', 'Endocrinology', 'Urinalysis', 'Microbiology', 'Immunology', 'Gastroenterology'];

export default function LabPage() {
  const [tests] = useState<LabTest[]>(mockTests);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTest, setEditingTest] = useState<LabTest | null>(null);
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [newTest, setNewTest] = useState({
    name: '', category: 'Hematology', description: '', price: 0,
    turnaroundTime: '', sampleType: '', normalRange: '',
    preparationInstructions: '', department: '', method: '',
    requiresFasting: false,
  });

  const filteredTests = useMemo(() => {
    return tests.filter((test) => {
      const matchesSearch =
        test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [tests, searchQuery, selectedCategory]);

  const stats = useMemo(() => {
    const total = tests.length;
    const active = tests.filter((t) => t.status === 'active').length;
    const pending = tests.filter((t) => t.status === 'pending-approval').length;
    const inactive = tests.filter((t) => t.status === 'inactive').length;
    const totalOrders = tests.reduce((sum, t) => sum + t.ordersCount, 0);
    const avgPrice = tests.reduce((sum, t) => sum + t.price, 0) / total;
    return { total, active, pending, inactive, totalOrders, avgPrice };
  }, [tests]);

  const categoryIcons: Record<string, React.ReactNode> = {
    Hematology: <Activity className="w-4 h-4" />,
    Chemistry: <FlaskConical className="w-4 h-4" />,
    Endocrinology: <Beaker className="w-4 h-4" />,
    Urinalysis: <TestTube className="w-4 h-4" />,
    Microbiology: <Microscope className="w-4 h-4" />,
    Immunology: <Stethoscope className="w-4 h-4" />,
    Gastroenterology: <Thermometer className="w-4 h-4" />,
  };

  const handleAddTest = () => {
    const test: LabTest = {
      ...newTest,
      id: `LAB-${String(tests.length + 1).padStart(3, '0')}`,
      status: 'active',
      ordersCount: 0,
    };
    mockTests.push(test);
    setShowAddModal(false);
    setNewTest({
      name: '', category: 'Hematology', description: '', price: 0,
      turnaroundTime: '', sampleType: '', normalRange: '',
      preparationInstructions: '', department: '', method: '',
      requiresFasting: false,
    });
  };

  const handleEditTest = () => {
    if (!editingTest) return;
    const idx = mockTests.findIndex((t) => t.id === editingTest.id);
    if (idx !== -1) mockTests[idx] = { ...mockTests[idx], ...newTest };
    setShowAddModal(false);
    setEditingTest(null);
  };

  const openEditModal = (test: LabTest) => {
    setEditingTest(test);
    setNewTest({
      name: test.name, category: test.category, description: test.description,
      price: test.price, turnaroundTime: test.turnaroundTime, sampleType: test.sampleType,
      normalRange: test.normalRange, preparationInstructions: test.preparationInstructions,
      department: test.department, method: test.method, requiresFasting: test.requiresFasting,
    });
    setShowAddModal(true);
  };

  const handleDeleteTest = (id: string) => {
    const idx = mockTests.findIndex((t) => t.id === id);
    if (idx !== -1) mockTests.splice(idx, 1);
  };

  const statusColors = {
    'active': 'bg-green-100 text-green-800',
    'inactive': 'bg-gray-100 text-gray-800',
    'pending-approval': 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Laboratory Management</h1>
          <p className="text-gray-600 mt-2">Manage lab tests, categories, pricing, and turnaround times</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg"><TestTube className="w-5 h-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.total}</p><p className="text-xs text-gray-500">Total Tests</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg"><CheckCircle className="w-5 h-5 text-green-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.active}</p><p className="text-xs text-gray-500">Active</p></div>
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
              <div className="p-2 bg-gray-100 rounded-lg"><AlertTriangle className="w-5 h-5 text-gray-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.inactive}</p><p className="text-xs text-gray-500">Inactive</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg"><BarChart3 className="w-5 h-5 text-purple-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p><p className="text-xs text-gray-500">Total Orders</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg"><DollarSign className="w-5 h-5 text-green-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">${stats.avgPrice.toFixed(2)}</p><p className="text-xs text-gray-500">Avg Price</p></div>
            </div>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search tests..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <select className="px-3 py-2 border border-gray-200 rounded-lg" value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
            </select>
            <button onClick={() => { setEditingTest(null); setShowAddModal(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-4 h-4" /> Add Test
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-7 gap-3 mb-6">
          {categories.map((cat) => {
            const count = cat === 'All' ? tests.length : tests.filter((t) => t.category === cat).length;
            return (
              <button key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`p-3 rounded-xl border text-left transition-all ${selectedCategory === cat ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
                <div className="flex items-center gap-2 mb-1">
                  {cat !== 'All' && categoryIcons[cat]}
                  <span className="text-xs font-medium text-gray-600 truncate">{cat}</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{count}</p>
              </button>
            );
          })}
        </div>

        {/* Tests Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turnaround</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTests.map((test) => (
                  <tr key={test.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{test.name}</p>
                        <p className="text-xs text-gray-500">{test.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {categoryIcons[test.category]}
                        {test.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{test.sampleType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{test.turnaroundTime}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${test.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{test.ordersCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[test.status]}`}>
                        {test.status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setSelectedTest(test); setShowDetailModal(true); }}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <TestTube className="w-4 h-4" />
                        </button>
                        <button onClick={() => openEditModal(test)}
                          className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteTest(test.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredTests.length === 0 && (
            <div className="text-center py-12">
              <TestTube className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No tests found.</p>
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">{editingTest ? 'Edit Test' : 'Add New Test'}</h2>
                <button onClick={() => { setShowAddModal(false); setEditingTest(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Test Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newTest.name}
                      onChange={(e) => setNewTest({ ...newTest, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newTest.category}
                      onChange={(e) => setNewTest({ ...newTest, category: e.target.value })}>
                      {categories.filter((c) => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <input type="number" step="0.01" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newTest.price}
                      onChange={(e) => setNewTest({ ...newTest, price: parseFloat(e.target.value) || 0 })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Turnaround Time</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newTest.turnaroundTime}
                      onChange={(e) => setNewTest({ ...newTest, turnaroundTime: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sample Type</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newTest.sampleType}
                      onChange={(e) => setNewTest({ ...newTest, sampleType: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newTest.department}
                      onChange={(e) => setNewTest({ ...newTest, department: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newTest.method}
                      onChange={(e) => setNewTest({ ...newTest, method: e.target.value })} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg" rows={2} value={newTest.description}
                      onChange={(e) => setNewTest({ ...newTest, description: e.target.value })} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Normal Range</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={newTest.normalRange}
                      onChange={(e) => setNewTest({ ...newTest, normalRange: e.target.value })} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preparation Instructions</label>
                    <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg" rows={2} value={newTest.preparationInstructions}
                      onChange={(e) => setNewTest({ ...newTest, preparationInstructions: e.target.value })} />
                  </div>
                  <div className="col-span-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" checked={newTest.requiresFasting}
                        onChange={(e) => setNewTest({ ...newTest, requiresFasting: e.target.checked })} />
                      <span className="text-sm font-medium text-gray-700">Requires Fasting</span>
                    </label>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={editingTest ? handleEditTest : handleAddTest}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    {editingTest ? 'Save Changes' : 'Add Test'}
                  </button>
                  <button onClick={() => { setShowAddModal(false); setEditingTest(null); }}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedTest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedTest.name}</h2>
                  <p className="text-sm text-gray-500">{selectedTest.id}</p>
                </div>
                <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs text-gray-500">Category</label><p className="text-sm font-medium">{selectedTest.category}</p></div>
                  <div><label className="text-xs text-gray-500">Department</label><p className="text-sm font-medium">{selectedTest.department}</p></div>
                  <div><label className="text-xs text-gray-500">Sample Type</label><p className="text-sm font-medium">{selectedTest.sampleType}</p></div>
                  <div><label className="text-xs text-gray-500">Method</label><p className="text-sm font-medium">{selectedTest.method}</p></div>
                  <div><label className="text-xs text-gray-500">Turnaround Time</label><p className="text-sm font-medium">{selectedTest.turnaroundTime}</p></div>
                  <div><label className="text-xs text-gray-500">Price</label><p className="text-sm font-medium">${selectedTest.price.toFixed(2)}</p></div>
                  <div><label className="text-xs text-gray-500">Total Orders</label><p className="text-sm font-medium">{selectedTest.ordersCount}</p></div>
                  <div><label className="text-xs text-gray-500">Requires Fasting</label><p className="text-sm font-medium">{selectedTest.requiresFasting ? 'Yes' : 'No'}</p></div>
                </div>
                <div><label className="text-xs text-gray-500">Description</label><p className="text-sm text-gray-600">{selectedTest.description}</p></div>
                <div><label className="text-xs text-gray-500">Normal Range</label><p className="text-sm text-gray-600">{selectedTest.normalRange}</p></div>
                <div><label className="text-xs text-gray-500">Preparation Instructions</label><p className="text-sm text-gray-600">{selectedTest.preparationInstructions}</p></div>
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button onClick={() => { setShowDetailModal(false); openEditModal(selectedTest); }}
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
