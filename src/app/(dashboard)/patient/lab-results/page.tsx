'use client';

import { useState, useMemo } from 'react';
import React from 'react';
import {
  Search,
  TestTube,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  Eye,
  X,
  Filter,
  Calendar,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  FileText,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';

interface LabResult {
  id: string;
  testName: string;
  category: string;
  date: string;
  orderedBy: string;
  status: 'completed' | 'pending' | 'in-progress';
  results: { parameter: string; value: string; unit: string; normalRange: string; status: 'normal' | 'high' | 'low' | 'critical'; previousValue?: string; trend?: 'up' | 'down' | 'stable' }[];
  notes: string;
  interpretation: string;
}

const mockResults: LabResult[] = [
  {
    id: 'RES-2026-001', testName: 'Complete Blood Count (CBC)', category: 'Hematology',
    date: '2026-09-01', orderedBy: 'Dr. Michael Chen', status: 'completed',
    results: [
      { parameter: 'White Blood Cells', value: '7.2', unit: 'K/uL', normalRange: '4.5-11.0', status: 'normal', previousValue: '6.8', trend: 'up' },
      { parameter: 'Red Blood Cells', value: '4.8', unit: 'M/uL', normalRange: '4.5-5.5', status: 'normal', previousValue: '4.7', trend: 'stable' },
      { parameter: 'Hemoglobin', value: '13.5', unit: 'g/dL', normalRange: '12.0-16.0', status: 'normal', previousValue: '13.2', trend: 'up' },
      { parameter: 'Hematocrit', value: '40.2', unit: '%', normalRange: '36.0-46.0', status: 'normal', previousValue: '39.8', trend: 'stable' },
      { parameter: 'Platelets', value: '245', unit: 'K/uL', normalRange: '150-400', status: 'normal', previousValue: '252', trend: 'down' },
      { parameter: 'MCV', value: '83.8', unit: 'fL', normalRange: '80.0-100.0', status: 'normal' },
      { parameter: 'MCH', value: '28.1', unit: 'pg', normalRange: '27.0-31.0', status: 'normal' },
    ],
    notes: 'All values within normal range. No significant changes from previous test.',
    interpretation: 'Normal complete blood count. No evidence of infection, anemia, or blood disorders.',
  },
  {
    id: 'RES-2026-002', testName: 'Lipid Panel', category: 'Chemistry',
    date: '2026-08-30', orderedBy: 'Dr. Michael Chen', status: 'completed',
    results: [
      { parameter: 'Total Cholesterol', value: '225', unit: 'mg/dL', normalRange: '<200', status: 'high', previousValue: '218', trend: 'up' },
      { parameter: 'LDL Cholesterol', value: '142', unit: 'mg/dL', normalRange: '<100', status: 'high', previousValue: '135', trend: 'up' },
      { parameter: 'HDL Cholesterol', value: '48', unit: 'mg/dL', normalRange: '>40', status: 'normal', previousValue: '50', trend: 'down' },
      { parameter: 'Triglycerides', value: '178', unit: 'mg/dL', normalRange: '<150', status: 'high', previousValue: '165', trend: 'up' },
    ],
    notes: 'Elevated lipid levels. Recommend lifestyle modifications and consider statin therapy.',
    interpretation: 'Dyslipidemia identified. Elevated LDL and triglycerides increase cardiovascular risk. Dietary changes and exercise recommended.',
  },
  {
    id: 'RES-2026-003', testName: 'Comprehensive Metabolic Panel', category: 'Chemistry',
    date: '2026-08-28', orderedBy: 'Dr. David Kim', status: 'completed',
    results: [
      { parameter: 'Glucose', value: '102', unit: 'mg/dL', normalRange: '70-100', status: 'high', previousValue: '98', trend: 'up' },
      { parameter: 'BUN', value: '15', unit: 'mg/dL', normalRange: '7-20', status: 'normal', previousValue: '14', trend: 'stable' },
      { parameter: 'Creatinine', value: '0.9', unit: 'mg/dL', normalRange: '0.6-1.2', status: 'normal', previousValue: '0.88', trend: 'stable' },
      { parameter: 'Sodium', value: '140', unit: 'mEq/L', normalRange: '136-145', status: 'normal' },
      { parameter: 'Potassium', value: '4.2', unit: 'mEq/L', normalRange: '3.5-5.0', status: 'normal' },
      { parameter: 'Calcium', value: '9.5', unit: 'mg/dL', normalRange: '8.5-10.5', status: 'normal' },
      { parameter: 'ALT', value: '28', unit: 'U/L', normalRange: '7-56', status: 'normal' },
      { parameter: 'AST', value: '24', unit: 'U/L', normalRange: '10-40', status: 'normal' },
    ],
    notes: 'Fasting glucose slightly elevated. Monitor for pre-diabetes.',
    interpretation: 'Most values normal. Fasting glucose borderline high. Recommend repeat testing in 3 months with dietary modifications.',
  },
  {
    id: 'RES-2026-004', testName: 'Hemoglobin A1c', category: 'Endocrinology',
    date: '2026-08-25', orderedBy: 'Dr. David Kim', status: 'completed',
    results: [
      { parameter: 'HbA1c', value: '6.2', unit: '%', normalRange: '<5.7', status: 'high', previousValue: '5.9', trend: 'up' },
      { parameter: 'Estimated Average Glucose', value: '131', unit: 'mg/dL', normalRange: '70-100', status: 'high', previousValue: '122', trend: 'up' },
    ],
    notes: 'Pre-diabetic range. Lifestyle modifications recommended.',
    interpretation: 'HbA1c in pre-diabetic range (5.7-6.4%). Impaired glucose metabolism. Weight management and dietary changes strongly recommended.',
  },
  {
    id: 'RES-2026-005', testName: 'Thyroid Panel', category: 'Endocrinology',
    date: '2026-08-20', orderedBy: 'Dr. Sarah Thompson', status: 'completed',
    results: [
      { parameter: 'TSH', value: '2.8', unit: 'mIU/L', normalRange: '0.4-4.0', status: 'normal', previousValue: '2.5', trend: 'up' },
      { parameter: 'Free T4', value: '1.2', unit: 'ng/dL', normalRange: '0.8-1.8', status: 'normal', previousValue: '1.1', trend: 'stable' },
      { parameter: 'Free T3', value: '3.1', unit: 'pg/mL', normalRange: '2.3-4.2', status: 'normal' },
    ],
    notes: 'Thyroid function normal. No evidence of hypo- or hyperthyroidism.',
    interpretation: 'Normal thyroid function tests. No intervention needed.',
  },
  {
    id: 'RES-2026-006', testName: 'Urinalysis', category: 'Urinalysis',
    date: '2026-09-01', orderedBy: 'Dr. Emily Rodriguez', status: 'pending',
    results: [],
    notes: 'Sample collected. Awaiting lab processing.',
    interpretation: '',
  },
];

const resultStatusColors: Record<string, string> = {
  normal: 'text-green-600 bg-green-50',
  high: 'text-red-600 bg-red-50',
  low: 'text-blue-600 bg-blue-50',
  critical: 'text-red-800 bg-red-100 font-bold',
};
const trendIcons: Record<string, React.ReactNode> = {
  up: <TrendingUp className="w-3 h-3 text-red-500" />,
  down: <TrendingDown className="w-3 h-3 text-blue-500" />,
  stable: <Minus className="w-3 h-3 text-gray-400" />,
};

export default function PatientLabResultsPage() {
  const [results] = useState<LabResult[]>(mockResults);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedResult, setSelectedResult] = useState<LabResult | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const filteredResults = useMemo(() => {
    return results.filter((r) => {
      const matchesSearch =
        r.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [results, searchQuery, selectedCategory]);

  const stats = useMemo(() => {
    const total = results.length;
    const completed = results.filter((r) => r.status === 'completed').length;
    const pending = results.filter((r) => r.status === 'pending').length;
    const abnormal = results.filter((r) => r.results.some((res) => res.status !== 'normal')).length;
    return { total, completed, pending, abnormal };
  }, [results]);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < 2 ? [...prev, id] : prev
    );
  };

  const compareResults = compareIds.map((id) => results.find((r) => r.id === id)).filter(Boolean) as LabResult[];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Lab Results</h1>
          <p className="text-gray-600 mt-2">View your test results, compare with previous tests, and track trends</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg"><TestTube className="w-5 h-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.total}</p><p className="text-xs text-gray-500">Total Tests</p></div>
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
              <div className="p-2 bg-yellow-100 rounded-lg"><Clock className="w-5 h-5 text-yellow-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.pending}</p><p className="text-xs text-gray-500">Pending</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg"><AlertTriangle className="w-5 h-5 text-orange-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{stats.abnormal}</p><p className="text-xs text-gray-500">Abnormal</p></div>
            </div>
          </div>
        </div>

        {/* Compare Bar */}
        {compareMode && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-blue-800">
                Compare Mode: Select {2 - compareIds.length} more test{compareIds.length === 0 ? 's' : ''}
              </span>
              {compareIds.map((id) => {
                const r = results.find((res) => res.id === id);
                return r ? (
                  <span key={id} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    {r.testName} <button onClick={() => toggleCompare(id)} className="ml-1">×</button>
                  </span>
                ) : null;
              })}
            </div>
            <div className="flex gap-2">
              {compareIds.length === 2 && (
                <button onClick={() => { setSelectedResult(compareResults[0]); setShowDetailModal(true); }}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                  View Comparison
                </button>
              )}
              <button onClick={() => { setCompareMode(false); setCompareIds([]); }}
                className="px-3 py-1.5 border border-blue-200 rounded-lg text-sm hover:bg-blue-50">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search test results..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <select className="px-3 py-2 border border-gray-200 rounded-lg" value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="All">All Categories</option>
              <option value="Hematology">Hematology</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Endocrinology">Endocrinology</option>
              <option value="Urinalysis">Urinalysis</option>
            </select>
            <button onClick={() => setCompareMode(!compareMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${compareMode ? 'bg-blue-600 text-white' : 'border border-gray-200 hover:bg-gray-50'}`}>
              <ArrowLeft className="w-4 h-4" /> Compare
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {filteredResults.map((result) => {
            const hasAbnormal = result.results.some((r) => r.status !== 'normal');
            return (
              <div key={result.id}
                className={`bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition-shadow ${compareMode ? 'cursor-pointer' : ''} ${compareIds.includes(result.id) ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-100'}`}
                onClick={() => compareMode ? toggleCompare(result.id) : null}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${hasAbnormal ? 'bg-orange-50' : 'bg-green-50'}`}>
                      <TestTube className={`w-6 h-6 ${hasAbnormal ? 'text-orange-600' : 'text-green-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{result.testName}</h3>
                      <p className="text-sm text-gray-500">Ordered by {result.orderedBy}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {result.date}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${result.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {result.status === 'completed' ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {result.status === 'completed' && (
                      <button onClick={(e) => { e.stopPropagation(); setSelectedResult(result); setShowDetailModal(true); }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                        <Eye className="w-4 h-4" /> View Results
                      </button>
                    )}
                    {result.status === 'completed' && (
                      <button onClick={(e) => e.stopPropagation()}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg">
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Results Preview */}
                {result.results.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {result.results.slice(0, 4).map((r, idx) => (
                        <div key={idx} className={`p-2 rounded-lg ${resultStatusColors[r.status]}`}>
                          <p className="text-xs font-medium">{r.parameter}</p>
                          <p className="text-sm font-bold">{r.value} {r.unit}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <p className="text-[10px] opacity-70">Ref: {r.normalRange}</p>
                            {r.trend && trendIcons[r.trend]}
                          </div>
                        </div>
                      ))}
                    </div>
                    {result.results.length > 4 && (
                      <p className="text-xs text-gray-500 mt-2">+ {result.results.length - 4} more parameters</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {filteredResults.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 text-center py-12">
              <TestTube className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No lab results found.</p>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedResult && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedResult.testName}</h2>
                  <p className="text-sm text-gray-500">{selectedResult.id} - {selectedResult.date}</p>
                </div>
                <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs text-gray-500">Ordered By</label><p className="text-sm font-medium">{selectedResult.orderedBy}</p></div>
                  <div><label className="text-xs text-gray-500">Category</label><p className="text-sm font-medium">{selectedResult.category}</p></div>
                  <div><label className="text-xs text-gray-500">Date</label><p className="text-sm font-medium">{selectedResult.date}</p></div>
                  <div><label className="text-xs text-gray-500">Status</label>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${selectedResult.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {selectedResult.status === 'completed' ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                </div>

                {selectedResult.results.length > 0 && (
                  <div>
                    <label className="text-xs text-gray-500 uppercase mb-2 block">Detailed Results</label>
                    <div className="bg-gray-50 rounded-xl overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Parameter</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Value</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Range</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Previous</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {selectedResult.results.map((r, idx) => (
                            <tr key={idx}>
                              <td className="px-4 py-2 text-sm font-medium text-gray-900">{r.parameter}</td>
                              <td className="px-4 py-2 text-sm font-bold">{r.value} {r.unit}</td>
                              <td className="px-4 py-2 text-sm text-gray-500">{r.normalRange}</td>
                              <td className="px-4 py-2 text-sm text-gray-500">
                                {r.previousValue ? (
                                  <span className="flex items-center gap-1">
                                    {r.previousValue} {r.trend && trendIcons[r.trend]}
                                  </span>
                                ) : '-'}
                              </td>
                              <td className="px-4 py-2">
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${resultStatusColors[r.status]}`}>
                                  {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div><label className="text-xs text-gray-500">Notes</label><p className="text-sm text-gray-600">{selectedResult.notes}</p></div>
                {selectedResult.interpretation && (
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <label className="text-xs text-blue-600 font-medium">Interpretation</label>
                    <p className="text-sm text-blue-800 mt-1">{selectedResult.interpretation}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Download className="w-4 h-4" /> Download PDF
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
