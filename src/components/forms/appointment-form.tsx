"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const appointmentSchema = z.object({
  department: z.string().min(1, "Please select a department"),
  doctor: z.string().min(1, "Please select a doctor"),
  date: z.string().min(1, "Please select a date"),
  timeSlot: z.string().min(1, "Please select a time slot"),
  patientName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  reason: z.string().min(5, "Please provide a reason for visit"),
  previousVisits: z.boolean().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

const departments = [
  { id: "cardiology", name: "Cardiology", icon: "🫀", description: "Heart & Cardiovascular" },
  { id: "neurology", name: "Neurology", icon: "🧠", description: "Brain & Nervous System" },
  { id: "orthopedics", name: "Orthopedics", icon: "🦴", description: "Bones & Joints" },
  { id: "pediatrics", name: "Pediatrics", icon: "👶", description: "Child Healthcare" },
  { id: "dermatology", name: "Dermatology", icon: "🩺", description: "Skin & Hair Care" },
  { id: "ophthalmology", name: "Ophthalmology", icon: "👁️", description: "Eye Care" },
];

const doctorsByDepartment: Record<string, { id: string; name: string; photo: string; fee: number; rating: number }[]> = {
  cardiology: [
    { id: "d1", name: "Dr. Sarah Johnson", photo: "/doctors/sarah.jpg", fee: 150, rating: 4.8 },
    { id: "d2", name: "Dr. Michael Chen", photo: "/doctors/michael.jpg", fee: 120, rating: 4.6 },
  ],
  neurology: [
    { id: "d3", name: "Dr. Emily Williams", photo: "/doctors/emily.jpg", fee: 180, rating: 4.9 },
  ],
  orthopedics: [
    { id: "d4", name: "Dr. James Brown", photo: "/doctors/james.jpg", fee: 130, rating: 4.7 },
    { id: "d5", name: "Dr. Lisa Davis", photo: "/doctors/lisa.jpg", fee: 140, rating: 4.5 },
  ],
  pediatrics: [
    { id: "d6", name: "Dr. Rachel Green", photo: "/doctors/rachel.jpg", fee: 100, rating: 4.8 },
  ],
  dermatology: [
    { id: "d7", name: "Dr. Anna Taylor", photo: "/doctors/anna.jpg", fee: 110, rating: 4.4 },
  ],
  ophthalmology: [
    { id: "d8", name: "Dr. David Wilson", photo: "/doctors/david.jpg", fee: 125, rating: 4.6 },
  ],
};

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00",
];

const steps = ["Department", "Doctor", "Date & Time", "Details", "Confirm"];

export default function AppointmentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState("");

  const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { previousVisits: false },
  });

  const selectedDepartment = watch("department");
  const selectedDoctor = watch("doctor");
  const selectedDate = watch("date");
  const selectedTimeSlot = watch("timeSlot");

  const getAvailableDoctors = () => {
    if (!selectedDepartment) return [];
    return doctorsByDepartment[selectedDepartment] || [];
  };

  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date.toISOString().split("T")[0],
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        num: date.getDate(),
        month: date.toLocaleDateString("en-US", { month: "short" }),
      });
    }
    return days;
  };

  const nextStep = async () => {
    let valid = false;
    if (currentStep === 0) valid = await trigger("department");
    else if (currentStep === 1) valid = await trigger("doctor");
    else if (currentStep === 2) valid = await trigger(["date", "timeSlot"]);
    else if (currentStep === 3) valid = await trigger(["patientName", "phone", "reason"]);
    if (valid && currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        setConfirmationNumber(result.confirmationNumber || "APT-" + Date.now());
        setIsSuccess(true);
      } else {
        throw new Error("Failed to book appointment");
      }
    } catch {
      alert("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-lg mx-auto p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">✓</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">Appointment Booked!</h2>
        <p className="text-gray-600 mb-4">Your appointment has been confirmed.</p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-500">Confirmation Number</p>
          <p className="text-xl font-mono font-bold">{confirmationNumber}</p>
        </div>
        <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
          Book Another
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Book Appointment</h1>

      {/* Progress Stepper */}
      <div className="flex items-center mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
              }`}>{index + 1}</div>
              <span className="text-xs mt-1 text-gray-600">{step}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-2 ${index < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Department Selection */}
        {currentStep === 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Department</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {departments.map((dept) => (
                <label key={dept.id} className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedDepartment === dept.id ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}>
                  <input type="radio" value={dept.id} {...register("department")} className="sr-only" />
                  <div className="text-3xl mb-2">{dept.icon}</div>
                  <div className="font-medium">{dept.name}</div>
                  <div className="text-sm text-gray-500">{dept.description}</div>
                </label>
              ))}
            </div>
            {errors.department && <p className="text-red-500 text-sm mt-2">{errors.department.message}</p>}
          </div>
        )}

        {/* Step 2: Doctor Selection */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Doctor</h2>
            <div className="space-y-3">
              {getAvailableDoctors().map((doc) => (
                <label key={doc.id} className={`flex items-center gap-4 border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedDoctor === doc.id ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}>
                  <input type="radio" value={doc.id} {...register("doctor")} className="sr-only" />
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">👤</div>
                  <div className="flex-1">
                    <div className="font-medium">{doc.name}</div>
                    <div className="text-sm text-gray-500">Consultation Fee: ${doc.fee}</div>
                    <div className="text-sm text-yellow-600">★ {doc.rating} / 5.0</div>
                  </div>
                </label>
              ))}
            </div>
            {errors.doctor && <p className="text-red-500 text-sm mt-2">{errors.doctor.message}</p>}
          </div>
        )}

        {/* Step 3: Date & Time */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Date & Time</h2>
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Available Dates</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {generateCalendarDays().map((day) => (
                  <label key={day.date} className={`flex-shrink-0 w-20 border-2 rounded-lg p-2 text-center cursor-pointer ${
                    selectedDate === day.date ? "border-blue-600 bg-blue-50" : "border-gray-200"
                  }`}>
                    <input type="radio" value={day.date} {...register("date")} className="sr-only" />
                    <div className="text-xs text-gray-500">{day.day}</div>
                    <div className="text-lg font-bold">{day.num}</div>
                    <div className="text-xs text-gray-500">{day.month}</div>
                  </label>
                ))}
              </div>
            </div>
            {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}

            <div>
              <p className="text-sm font-medium mb-2">Available Time Slots</p>
              <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                {timeSlots.map((slot) => (
                  <label key={slot} className={`border-2 rounded-lg p-2 text-center cursor-pointer text-sm ${
                    selectedTimeSlot === slot ? "border-blue-600 bg-blue-50" : "border-gray-200"
                  }`}>
                    <input type="radio" value={slot} {...register("timeSlot")} className="sr-only" />
                    {slot}
                  </label>
                ))}
              </div>
            </div>
            {errors.timeSlot && <p className="text-red-500 text-sm mt-2">{errors.timeSlot.message}</p>}
          </div>
        )}

        {/* Step 4: Patient Details */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Patient Details</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input {...register("patientName")} className="w-full border rounded-lg px-3 py-2" placeholder="Enter your full name" />
              {errors.patientName && <p className="text-red-500 text-sm">{errors.patientName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input {...register("phone")} className="w-full border rounded-lg px-3 py-2" placeholder="Enter phone number" />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Reason for Visit</label>
              <textarea {...register("reason")} rows={3} className="w-full border rounded-lg px-3 py-2" placeholder="Describe your symptoms or reason" />
              {errors.reason && <p className="text-red-500 text-sm">{errors.reason.message}</p>}
            </div>
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("previousVisits")} className="w-4 h-4" />
              <span className="text-sm">I have visited this hospital before</span>
            </label>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {currentStep === 4 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Confirm Appointment</h2>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between"><span className="text-gray-500">Department:</span><span className="font-medium">{departments.find(d => d.id === selectedDepartment)?.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Doctor:</span><span className="font-medium">{getAvailableDoctors().find(d => d.id === selectedDoctor)?.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Date:</span><span className="font-medium">{selectedDate}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Time:</span><span className="font-medium">{selectedTimeSlot}</span></div>
              <hr />
              <div className="flex justify-between"><span className="text-gray-500">Patient:</span><span className="font-medium">{watch("patientName")}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Phone:</span><span className="font-medium">{watch("phone")}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Reason:</span><span className="font-medium">{watch("reason")}</span></div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 0 && (
            <button type="button" onClick={prevStep} className="px-6 py-2 border rounded-lg hover:bg-gray-50">
              Back
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button type="button" onClick={nextStep} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto">
              Next
            </button>
          ) : (
            <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ml-auto disabled:opacity-50">
              {isSubmitting ? "Booking..." : "Confirm Booking"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
