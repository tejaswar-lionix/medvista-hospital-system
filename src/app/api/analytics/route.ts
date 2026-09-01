import { NextResponse } from "next/server";

export async function GET() {
  const analyticsData = {
    keyMetrics: {
      totalPatients: 12847,
      patientChange: 12.5,
      appointmentsToday: 186,
      appointmentChange: 8.2,
      monthlyRevenue: 2400000,
      revenueChange: 15.3,
      bedOccupancy: 78,
      occupancyChange: -3.1,
    },
    demographics: {
      ageGroups: [
        { age: "0-18", male: 1200, female: 1100 },
        { age: "19-35", male: 2100, female: 2400 },
        { age: "36-50", male: 1800, female: 2000 },
        { age: "51-65", male: 1500, female: 1700 },
        { age: "65+", male: 900, female: 1100 },
      ],
      totalMale: 7500,
      totalFemale: 8300,
    },
    appointmentTrends: [
      { month: "Jan", consultations: 1200, surgeries: 180, followUps: 800 },
      { month: "Feb", consultations: 1350, surgeries: 200, followUps: 850 },
      { month: "Mar", consultations: 1100, surgeries: 160, followUps: 750 },
      { month: "Apr", consultations: 1450, surgeries: 220, followUps: 900 },
      { month: "May", consultations: 1600, surgeries: 250, followUps: 950 },
      { month: "Jun", consultations: 1300, surgeries: 190, followUps: 820 },
    ],
    revenueData: [
      { department: "Cardiology", revenue: 450000, target: 500000 },
      { department: "Orthopedics", revenue: 380000, target: 400000 },
      { department: "Neurology", revenue: 320000, target: 350000 },
      { department: "Oncology", revenue: 290000, target: 300000 },
      { department: "Pediatrics", revenue: 210000, target: 250000 },
      { department: "General", revenue: 180000, target: 200000 },
    ],
    departmentPerformance: [
      { name: "Cardiology", patients: 1850, satisfaction: 4.8, waitTime: 15 },
      { name: "Orthopedics", patients: 1420, satisfaction: 4.6, waitTime: 18 },
      { name: "Neurology", patients: 980, satisfaction: 4.7, waitTime: 20 },
      { name: "Oncology", patients: 760, satisfaction: 4.9, waitTime: 25 },
      { name: "Pediatrics", patients: 2100, satisfaction: 4.5, waitTime: 12 },
      { name: "Emergency", patients: 3200, satisfaction: 4.3, waitTime: 8 },
    ],
    doctorProductivity: [
      { name: "Dr. Sarah Mitchell", specialty: "Cardiology", patients: 342, surgeries: 48, rating: 4.9 },
      { name: "Dr. James Wilson", specialty: "Orthopedics", patients: 298, surgeries: 52, rating: 4.8 },
      { name: "Dr. Emily Chen", specialty: "Neurology", patients: 256, surgeries: 28, rating: 4.7 },
      { name: "Dr. Michael Brown", specialty: "Oncology", patients: 198, surgeries: 35, rating: 4.9 },
      { name: "Dr. Lisa Anderson", specialty: "Pediatrics", patients: 420, surgeries: 0, rating: 4.6 },
      { name: "Dr. David Kim", specialty: "General", patients: 380, surgeries: 15, rating: 4.5 },
    ],
  };

  return NextResponse.json(analyticsData);
}
