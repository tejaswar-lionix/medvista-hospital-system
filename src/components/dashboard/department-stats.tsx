interface DepartmentData {
  id: string;
  name: string;
  totalDoctors: number;
  totalAppointments: number;
  revenue: number;
  satisfactionRating: number;
  utilization: number;
  topDoctor: string;
  commonProcedures: string[];
}

interface DepartmentStatsProps {
  departments: DepartmentData[];
  selectedDepartment?: string;
  onSelectDepartment?: (id: string) => void;
}

export function DepartmentStats({ departments, selectedDepartment, onSelectDepartment }: DepartmentStatsProps) {
  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'bg-red-500';
    if (utilization >= 75) return 'bg-orange-500';
    if (utilization >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getSatisfactionColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20"><defs><linearGradient id={`half-${i}`}><stop offset="50%" stopColor="currentColor" /><stop offset="50%" stopColor="#D1D5DB" /></linearGradient></defs><path fill={`url(#half-${i})`} d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>);
      } else {
        stars.push(<svg key={i} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>);
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-900">Department Statistics</h3>
        <span className="text-sm text-gray-500">{departments.length} departments</span>
      </div>

      <div className="space-y-4">
        {departments.map((dept) => (
          <div
            key={dept.id}
            onClick={() => onSelectDepartment?.(dept.id)}
            className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${selectedDepartment === dept.id ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900">{dept.name}</h4>
              <div className="flex items-center gap-1">
                {renderStars(dept.satisfactionRating)}
                <span className={`ml-1 text-sm font-medium ${getSatisfactionColor(dept.satisfactionRating)}`}>{dept.satisfactionRating}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{dept.totalDoctors}</div>
                <div className="text-xs text-gray-500">Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{dept.totalAppointments}</div>
                <div className="text-xs text-gray-500">Appointments</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">${(dept.revenue / 1000).toFixed(0)}k</div>
                <div className="text-xs text-gray-500">Revenue</div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Utilization</span>
                <span className="font-medium">{dept.utilization}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`h-2 rounded-full transition-all ${getUtilizationColor(dept.utilization)}`} style={{ width: `${dept.utilization}%` }} />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-gray-500">Top Doctor: </span>
                <span className="font-medium">{dept.topDoctor}</span>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-1">
              {dept.commonProcedures.slice(0, 3).map((proc, i) => (
                <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{proc}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
