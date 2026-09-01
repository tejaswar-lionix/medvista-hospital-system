interface HealthSummaryData {
  overallScore: number;
  activeConditions: number;
  conditions: { name: string; severity: 'mild' | 'moderate' | 'severe' }[];
  upcomingAppointments: { id: string; doctor: string; specialty: string; date: string; time: string }[];
  pendingPrescriptions: number;
  recentLabResults: { testName: string; status: 'normal' | 'abnormal' | 'critical'; date: string }[];
  nextCheckup: string;
  lastVisit: string;
  healthMetrics: { label: string; value: number; max: number; color: string }[];
}

interface HealthSummaryProps {
  data: HealthSummaryData;
}

export function HealthSummary({ data }: HealthSummaryProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Attention';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-yellow-100 text-yellow-800';
      case 'moderate': return 'bg-orange-100 text-orange-800';
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLabStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600';
      case 'abnormal': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">Health Summary</h3>

      <div className="flex items-center gap-6 mb-6">
        <div className="relative w-28 h-28">
          <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#E5E7EB" strokeWidth="8" fill="none" />
            <circle cx="50" cy="50" r="40" stroke="url(#scoreGradient)" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray={`${(data.overallScore / 100) * 251.2} 251.2`} />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={data.overallScore >= 80 ? '#22C55E' : data.overallScore >= 60 ? '#F59E0B' : '#EF4444'} />
                <stop offset="100%" stopColor={data.overallScore >= 80 ? '#16A34A' : data.overallScore >= 60 ? '#D97706' : '#DC2626'} />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">{data.overallScore}</span>
            <span className="text-xs text-gray-500">/100</span>
          </div>
        </div>
        <div>
          <div className={`text-xl font-bold bg-gradient-to-r ${getScoreColor(data.overallScore)} bg-clip-text text-transparent`}>{getScoreLabel(data.overallScore)}</div>
          <p className="text-sm text-gray-500 mt-1">Overall Health Score</p>
          <p className="text-xs text-gray-400 mt-1">Last visit: {new Date(data.lastVisit).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            <span className="text-sm font-medium text-gray-700">Active Conditions</span>
          </div>
          <div className="text-2xl font-bold text-blue-600 mt-1">{data.activeConditions}</div>
        </div>
        <div className="p-3 bg-purple-50 rounded-lg">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="text-sm font-medium text-gray-700">Pending Rx</span>
          </div>
          <div className="text-2xl font-bold text-purple-600 mt-1">{data.pendingPrescriptions}</div>
        </div>
      </div>

      {data.conditions.length > 0 && (
        <div className="mb-5">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Active Conditions</h4>
          <div className="flex flex-wrap gap-2">
            {data.conditions.map((condition, i) => (
              <span key={i} className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(condition.severity)}`}>
                {condition.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mb-5">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Health Metrics</h4>
        <div className="space-y-3">
          {data.healthMetrics.map((metric, i) => (
            <div key={i}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">{metric.label}</span>
                <span className="font-medium">{metric.value}/{metric.max}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`h-2 rounded-full transition-all ${metric.color}`} style={{ width: `${(metric.value / metric.max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Upcoming Appointments</h4>
        {data.upcomingAppointments.length > 0 ? (
          <div className="space-y-2">
            {data.upcomingAppointments.map((appt) => (
              <div key={appt.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{appt.doctor}</div>
                  <div className="text-xs text-gray-500">{appt.specialty}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{new Date(appt.date).toLocaleDateString()}</div>
                  <div className="text-xs text-gray-500">{appt.time}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No upcoming appointments</p>
        )}
      </div>

      <div className="mb-5">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Lab Results</h4>
        <div className="space-y-2">
          {data.recentLabResults.map((lab, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">{lab.testName}</span>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${getLabStatusColor(lab.status)}`}>{lab.status}</span>
                <span className="text-xs text-gray-400">{new Date(lab.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <div>
            <span className="text-sm font-medium text-green-800">Next Checkup: </span>
            <span className="text-sm text-green-700">{new Date(data.nextCheckup).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
