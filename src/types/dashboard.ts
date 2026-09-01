export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface AdminDashboardData {
  totalDoctors: number;
  totalPatients: number;
  totalAppointments: number;
  revenue: number;
  appointmentsToday: number;
  occupancyRate: number;
  recentAppointments: Array<{
    id: string;
    patientName: string;
    doctorName: string;
    time: string;
    status: string;
  }>;
  appointmentsByMonth: ChartDataPoint[];
  departmentDistribution: ChartDataPoint[];
}

export interface DoctorDashboardData {
  totalAppointments: number;
  todayAppointments: number;
  totalPatients: number;
  pendingPrescriptions: number;
  upcomingAppointments: Array<{
    id: string;
    patientName: string;
    time: string;
    type: string;
  }>;
  appointmentsByDay: ChartDataPoint[];
  patientsByAgeGroup: ChartDataPoint[];
}

export interface PatientDashboardData {
  totalAppointments: number;
  upcomingAppointments: number;
  activePrescriptions: number;
  pendingBills: number;
  recentVisits: Array<{
    id: string;
    doctorName: string;
    date: string;
    diagnosis: string;
  }>;
  upcomingSchedule: Array<{
    id: string;
    doctorName: string;
    date: string;
    time: string;
    department: string;
  }>;
  healthMetrics: ChartDataPoint[];
}
