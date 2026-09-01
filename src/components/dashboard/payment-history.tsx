import { useState } from 'react';

interface Payment {
  id: string;
  date: string;
  amount: number;
  method: 'credit_card' | 'debit_card' | 'insurance' | 'cash' | 'bank_transfer';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  description: string;
  invoiceNumber: string;
  receiptUrl?: string;
}

interface PaymentHistoryProps {
  payments: Payment[];
  totalPaid: number;
  outstandingBalance: number;
  onDownloadReceipt?: (paymentId: string) => void;
}

export function PaymentHistory({ payments, totalPaid, outstandingBalance, onDownloadReceipt }: PaymentHistoryProps) {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'credit_card': return <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
      case 'debit_card': return <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
      case 'insurance': return <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
      case 'cash': return <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
      case 'bank_transfer': return <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>;
      default: return <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-medium">Completed</span>;
      case 'pending': return <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">Pending</span>;
      case 'failed': return <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs font-medium">Failed</span>;
      case 'refunded': return <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-medium">Refunded</span>;
      default: return null;
    }
  };

  const filteredPayments = filter === 'all' ? payments : payments.filter(p => p.status === filter);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">Payment History</h3>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-lg text-white">
          <div className="text-sm opacity-90">Total Paid</div>
          <div className="text-2xl font-bold mt-1">${totalPaid.toLocaleString()}</div>
        </div>
        <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg text-white">
          <div className="text-sm opacity-90">Outstanding</div>
          <div className="text-2xl font-bold mt-1">${outstandingBalance.toLocaleString()}</div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {(['all', 'completed', 'pending', 'failed'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredPayments.map((payment) => (
          <div key={payment.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
                  {getMethodIcon(payment.method)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{payment.description}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-500">{new Date(payment.date).toLocaleDateString()}</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-sm text-gray-500">#{payment.invoiceNumber}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${payment.status === 'refunded' ? 'text-blue-600' : 'text-gray-900'}`}>
                  {payment.status === 'refunded' ? '-' : ''}${payment.amount.toLocaleString()}
                </div>
                {getStatusBadge(payment.status)}
              </div>
            </div>

            {payment.status === 'completed' && (
              <div className="mt-3 pt-3 border-t border-gray-200 flex justify-end">
                <button onClick={() => onDownloadReceipt?.(payment.id)} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Download Receipt
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredPayments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          <p>No payments found</p>
        </div>
      )}
    </div>
  );
}
