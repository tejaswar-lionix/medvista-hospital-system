import { useState } from 'react';

interface LabResult {
  id: string;
  testName: string;
  category: string;
  resultValue: number;
  unit: string;
  normalRangeMin: number;
  normalRangeMax: number;
  status: 'normal' | 'abnormal' | 'critical';
  date: string;
  labTechnician: string;
  notes: string;
  previousValues: { date: string; value: number }[];
}

interface LabResultsProps {
  results: LabResult[];
  filter?: string;
}

export function LabResults({ results, filter }: LabResultsProps) {
  const [selectedResult, setSelectedResult] = useState<LabResult | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'graph'>('list');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800 border-green-200';
      case 'abnormal': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
      case 'abnormal': return <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
      case 'critical': return <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      default: return null;
    }
  };

  const isOutOfRange = (value: number, min: number, max: number) => {
    return value < min || value > max;
  };

  const filteredResults = filter ? results.filter(r => r.category === filter) : results;

  const MiniTrendGraph = ({ data }: { data: { date: string; value: number }[] }) => {
    if (data.length < 2) return <span className="text-xs text-gray-400">No trend data</span>;
    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    return (
      <div className="flex items-end gap-0.5 h-8">
        {data.slice(-7).map((d, i) => {
          const height = ((d.value - min) / range) * 100;
          return (
            <div key={i} className="flex flex-col items-center">
              <div className="w-2 bg-blue-400 rounded-t" style={{ height: `${Math.max(height, 10)}%` }} />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-900">Lab Results</h3>
        <div className="flex items-center gap-2">
          <button onClick={() => setViewMode('list')} className={`px-3 py-1 rounded text-sm font-medium ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>List</button>
          <button onClick={() => setViewMode('graph')} className={`px-3 py-1 rounded text-sm font-medium ${viewMode === 'graph' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>Graph</button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="space-y-3">
          {filteredResults.map((result) => (
            <div key={result.id} onClick={() => setSelectedResult(result)} className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${selectedResult?.id === result.id ? 'border-blue-500' : 'border-transparent hover:border-gray-200'}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getStatusIcon(result.status)}
                    <h4 className="font-medium text-gray-900">{result.testName}</h4>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(result.status)}`}>{result.status}</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">{result.category}</div>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl font-bold ${isOutOfRange(result.resultValue, result.normalRangeMin, result.normalRangeMax) ? 'text-red-600' : 'text-gray-900'}`}>
                      {result.resultValue}
                    </span>
                    <span className="text-sm text-gray-500">{result.unit}</span>
                    <span className="text-xs text-gray-400">(Normal: {result.normalRangeMin}-{result.normalRangeMax})</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{new Date(result.date).toLocaleDateString()}</div>
                  <div className="mt-2">
                    <MiniTrendGraph data={result.previousValues} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredResults.map((result) => (
            <div key={result.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{result.testName}</h4>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(result.status)}`}>{result.status}</span>
              </div>
              <div className="h-24 flex items-end">
                <MiniTrendGraph data={result.previousValues} />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{result.previousValues[0]?.date ? new Date(result.previousValues[0].date).toLocaleDateString() : ''}</span>
                <span>{result.previousValues[result.previousValues.length - 1]?.date ? new Date(result.previousValues[result.previousValues.length - 1].date).toLocaleDateString() : ''}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedResult && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-blue-900">{selectedResult.testName} Details</h4>
            <button onClick={() => setSelectedResult(null)} className="text-blue-600 hover:text-blue-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-gray-500">Lab Technician: </span><span className="font-medium">{selectedResult.labTechnician}</span></div>
            <div><span className="text-gray-500">Date: </span><span className="font-medium">{new Date(selectedResult.date).toLocaleDateString()}</span></div>
            {selectedResult.notes && (
              <div className="col-span-2"><span className="text-gray-500">Notes: </span><span className="font-medium">{selectedResult.notes}</span></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
