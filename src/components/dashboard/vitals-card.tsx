interface VitalsData {
  bloodPressure: { systolic: number; diastolic: number; trend: 'up' | 'down' | 'same' };
  heartRate: { value: number; trend: 'up' | 'down' | 'same' };
  temperature: { value: number; unit: 'F' | 'C'; trend: 'up' | 'down' | 'same' };
  weight: { value: number; unit: 'lbs' | 'kg'; trend: 'up' | 'down' | 'same' };
  height: { feet: number; inches: number };
  respiratoryRate: { value: number; trend: 'up' | 'down' | 'same' };
  oxygenSaturation: { value: number; trend: 'up' | 'down' | 'same' };
  lastUpdated: string;
}

interface VitalsCardProps {
  vitals: VitalsData;
}

export function VitalsCard({ vitals }: VitalsCardProps) {
  const getTrendIcon = (trend: 'up' | 'down' | 'same') => {
    switch (trend) {
      case 'up': return <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>;
      case 'down': return <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>;
      case 'same': return <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>;
    }
  };

  const getBPStatus = (systolic: number, diastolic: number) => {
    if (systolic >= 180 || diastolic >= 120) return { label: 'Crisis', color: 'text-red-600 bg-red-50' };
    if (systolic >= 140 || diastolic >= 90) return { label: 'High', color: 'text-orange-600 bg-orange-50' };
    if (systolic >= 130 || diastolic >= 80) return { label: 'Elevated', color: 'text-yellow-600 bg-yellow-50' };
    if (systolic < 90 || diastolic < 60) return { label: 'Low', color: 'text-blue-600 bg-blue-50' };
    return { label: 'Normal', color: 'text-green-600 bg-green-50' };
  };

  const calculateBMI = (weightValue: number, weightUnit: string, heightFeet: number, heightInches: number) => {
    const weightKg = weightUnit === 'lbs' ? weightValue * 0.453592 : weightValue;
    const totalInches = heightFeet * 12 + heightInches;
    const heightM = totalInches * 0.0254;
    return (weightKg / (heightM * heightM)).toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { label: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-600' };
    return { label: 'Obese', color: 'text-red-600' };
  };

  const bmi = parseFloat(calculateBMI(vitals.weight.value, vitals.weight.unit, vitals.height.feet, vitals.height.inches));
  const bmiCategory = getBMICategory(bmi);
  const bpStatus = getBPStatus(vitals.bloodPressure.systolic, vitals.bloodPressure.diastolic);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-900">Patient Vitals</h3>
        <span className="text-xs text-gray-500">Updated: {new Date(vitals.lastUpdated).toLocaleString()}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              <span className="text-sm font-medium text-gray-700">Blood Pressure</span>
            </div>
            {getTrendIcon(vitals.bloodPressure.trend)}
          </div>
          <div className="text-2xl font-bold text-gray-900">{vitals.bloodPressure.systolic}/{vitals.bloodPressure.diastolic}</div>
          <div className="text-xs text-gray-500 mt-1">mmHg</div>
          <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${bpStatus.color}`}>{bpStatus.label}</span>
        </div>

        <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              <span className="text-sm font-medium text-gray-700">Heart Rate</span>
            </div>
            {getTrendIcon(vitals.heartRate.trend)}
          </div>
          <div className="text-2xl font-bold text-gray-900">{vitals.heartRate.value}</div>
          <div className="text-xs text-gray-500 mt-1">bpm</div>
          <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${vitals.heartRate.value >= 60 && vitals.heartRate.value <= 100 ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'}`}>
            {vitals.heartRate.value >= 60 && vitals.heartRate.value <= 100 ? 'Normal' : 'Abnormal'}
          </span>
        </div>

        <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              <span className="text-sm font-medium text-gray-700">Temperature</span>
            </div>
            {getTrendIcon(vitals.temperature.trend)}
          </div>
          <div className="text-2xl font-bold text-gray-900">{vitals.temperature.value}°{vitals.temperature.unit}</div>
          <div className="text-xs text-gray-500 mt-1">Temperature</div>
          <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${vitals.temperature.value >= 97.0 && vitals.temperature.value <= 99.0 ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'}`}>
            {vitals.temperature.value >= 97.0 && vitals.temperature.value <= 99.0 ? 'Normal' : 'Abnormal'}
          </span>
        </div>

        <div className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <span className="text-sm font-medium text-gray-700">Oxygen Sat</span>
            </div>
            {getTrendIcon(vitals.oxygenSaturation.trend)}
          </div>
          <div className="text-2xl font-bold text-gray-900">{vitals.oxygenSaturation.value}%</div>
          <div className="text-xs text-gray-500 mt-1">SpO2</div>
          <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${vitals.oxygenSaturation.value >= 95 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
            {vitals.oxygenSaturation.value >= 95 ? 'Normal' : 'Low'}
          </span>
        </div>

        <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
              <span className="text-sm font-medium text-gray-700">Weight</span>
            </div>
            {getTrendIcon(vitals.weight.trend)}
          </div>
          <div className="text-2xl font-bold text-gray-900">{vitals.weight.value}</div>
          <div className="text-xs text-gray-500 mt-1">{vitals.weight.unit}</div>
        </div>

        <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              <span className="text-sm font-medium text-gray-700">Height</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{vitals.height.feet}'{vitals.height.inches}"</div>
          <div className="text-xs text-gray-500 mt-1">Height</div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-700">BMI: </span>
            <span className="text-lg font-bold text-gray-900">{bmi}</span>
            <span className={`ml-2 text-sm font-medium ${bmiCategory.color}`}>({bmiCategory.label})</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500">Respiratory Rate:</span>
            <span className="font-medium">{vitals.respiratoryRate.value} rpm</span>
            {getTrendIcon(vitals.respiratoryRate.trend)}
          </div>
        </div>
      </div>
    </div>
  );
}
