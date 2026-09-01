"use client";

import React from "react";
import { Users, Calendar, TrendingUp, ArrowRight } from "lucide-react";

interface Department {
  id: string;
  name: string;
  doctorCount: number;
  appointmentCount: number;
  patientCount: number;
  utilization: number;
  color: string;
  bgColor: string;
  trend: number;
}

const departmentsData: Department[] = [
  {
    id: "cardiology",
    name: "Cardiology",
    doctorCount: 12,
    appointmentCount: 156,
    patientCount: 1250,
    utilization: 87,
    color: "text-red-600",
    bgColor: "bg-red-50",
    trend: 12.5,
  },
  {
    id: "neurology",
    name: "Neurology",
    doctorCount: 8,
    appointmentCount: 98,
    patientCount: 820,
    utilization: 72,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    trend: 8.3,
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    doctorCount: 10,
    appointmentCount: 134,
    patientCount: 980,
    utilization: 81,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    trend: 5.7,
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    doctorCount: 9,
    appointmentCount: 112,
    patientCount: 1100,
    utilization: 68,
    color: "text-green-600",
    bgColor: "bg-green-50",
    trend: 15.2,
  },
  {
    id: "oncology",
    name: "Oncology",
    doctorCount: 7,
    appointmentCount: 89,
    patientCount: 650,
    utilization: 76,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    trend: 3.4,
  },
  {
    id: "emergency",
    name: "Emergency",
    doctorCount: 15,
    appointmentCount: 245,
    patientCount: 1400,
    utilization: 92,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    trend: 22.1,
  },
];

const DepartmentOverview: React.FC = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Department Overview
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Current status across departments
          </p>
        </div>
        <button className="flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700">
          View All
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {departmentsData.map((dept) => (
          <div
            key={dept.id}
            className="group rounded-xl border border-gray-200 p-4 transition-all hover:border-gray-300 hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${dept.bgColor}`}
              >
                <span className={`text-lg font-bold ${dept.color}`}>
                  {dept.name.charAt(0)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">
                  +{dept.trend}%
                </span>
              </div>
            </div>

            <h4 className="font-semibold text-gray-900">{dept.name}</h4>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Doctors</p>
                  <p className="font-medium text-gray-900">{dept.doctorCount}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Appointments</p>
                  <p className="font-medium text-gray-900">
                    {dept.appointmentCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-gray-500">Utilization</span>
                <span className="font-medium text-gray-900">
                  {dept.utilization}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full transition-all ${
                    dept.utilization >= 90
                      ? "bg-red-500"
                      : dept.utilization >= 75
                        ? "bg-amber-500"
                        : "bg-green-500"
                  }`}
                  style={{ width: `${dept.utilization}%` }}
                />
              </div>
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Total Patients</span>
                <span className="font-semibold text-gray-900">
                  {dept.patientCount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentOverview;
