interface TimelineStep {
  id: string;
  title: string;
  description: string;
  time: string;
  status: 'completed' | 'current' | 'upcoming';
  icon: 'check' | 'clock' | 'calendar' | 'user' | 'stethoscope' | 'pill' | 'credit';
}

interface AppointmentTimelineProps {
  steps: TimelineStep[];
  appointmentDate: string;
}

export function AppointmentTimeline({ steps, appointmentDate }: AppointmentTimelineProps) {
  const getStepIcon = (type: string, status: string) => {
    const baseClass = `w-5 h-5 ${status === 'completed' ? 'text-green-600' : status === 'current' ? 'text-blue-600' : 'text-gray-400'}`;
    switch (type) {
      case 'check': return <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      case 'clock': return <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      case 'calendar': return <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
      case 'user': return <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
      case 'stethoscope': return <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;
      case 'pill': return <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>;
      case 'credit': return <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
      default: return <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
    }
  };

  const getLineColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'current': return 'bg-blue-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-900">Appointment Timeline</h3>
        <span className="text-sm text-gray-500">{new Date(appointmentDate).toLocaleDateString()}</span>
      </div>

      <div className="relative">
        {steps.map((step, index) => (
          <div key={step.id} className="flex gap-4 pb-6 last:pb-0">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.status === 'completed' ? 'bg-green-100' : step.status === 'current' ? 'bg-blue-100 ring-4 ring-blue-200' : 'bg-gray-100'}`}>
                {getStepIcon(step.icon, step.status)}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-0.5 flex-1 mt-2 ${getLineColor(step.status)}`} />
              )}
            </div>

            <div className="flex-1 pt-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className={`font-medium ${step.status === 'current' ? 'text-blue-900' : step.status === 'completed' ? 'text-gray-900' : 'text-gray-500'}`}>{step.title}</h4>
                  <p className={`text-sm mt-0.5 ${step.status === 'upcoming' ? 'text-gray-400' : 'text-gray-600'}`}>{step.description}</p>
                </div>
                <span className={`text-xs font-medium ${step.status === 'current' ? 'text-blue-600' : 'text-gray-400'}`}>{step.time}</span>
              </div>
              {step.status === 'current' && (
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                  In Progress
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
