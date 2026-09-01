import { useState } from 'react';

interface InsuranceCardProps {
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
    coverageType: string;
    deductible: number;
    deductibleMet: number;
    outOfPocketMax: number;
    outOfPocketMet: number;
    expiryDate: string;
    dependents: string[];
    claims: {
      id: string;
      date: string;
      description: string;
      amount: number;
      status: 'pending' | 'approved' | 'denied';
    }[];
  };
}

export function InsuranceCard({ insurance }: InsuranceCardProps) {
  const [showClaims, setShowClaims] = useState(false);
  const deductibleProgress = (insurance.deductibleMet / insurance.deductible) * 100;
  const outOfPocketProgress = (insurance.outOfPocketMet / insurance.outOfPocketMax) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'denied': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Insurance Information</h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {insurance.coverageType}
        </span>
      </div>

      <div className="mb-4 p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
        <div className="text-sm opacity-90 mb-1">Provider</div>
        <div className="text-xl font-bold">{insurance.provider}</div>
        <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="opacity-75">Policy #</div>
            <div className="font-medium">{insurance.policyNumber}</div>
          </div>
          <div>
            <div className="opacity-75">Group #</div>
            <div className="font-medium">{insurance.groupNumber}</div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Deductible Progress</span>
          <span className="font-medium">${insurance.deductibleMet.toLocaleString()} / ${insurance.deductible.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${Math.min(deductibleProgress, 100)}%` }} />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Out-of-Pocket Maximum</span>
          <span className="font-medium">${insurance.outOfPocketMet.toLocaleString()} / ${insurance.outOfPocketMax.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-orange-500 h-2 rounded-full transition-all" style={{ width: `${Math.min(outOfPocketProgress, 100)}%` }} />
        </div>
      </div>

      <div className="flex items-center justify-between py-3 border-t border-gray-100">
        <div>
          <div className="text-sm text-gray-500">Expiry Date</div>
          <div className="font-medium">{new Date(insurance.expiryDate).toLocaleDateString()}</div>
        </div>
        {insurance.dependents.length > 0 && (
          <div className="text-right">
            <div className="text-sm text-gray-500">Dependents</div>
            <div className="font-medium">{insurance.dependents.length}</div>
          </div>
        )}
      </div>

      <div className="mt-4">
        <button onClick={() => setShowClaims(!showClaims)} className="w-full text-left text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center justify-between">
          <span>Claims History ({insurance.claims.length})</span>
          <svg className={`w-4 h-4 transition-transform ${showClaims ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showClaims && (
          <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
            {insurance.claims.map((claim) => (
              <div key={claim.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{claim.description}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(claim.status)}`}>{claim.status}</span>
                </div>
                <div className="flex items-center justify-between mt-1 text-sm text-gray-500">
                  <span>{new Date(claim.date).toLocaleDateString()}</span>
                  <span className="font-medium text-gray-900">${claim.amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
