"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const doctorSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  department: z.string().min(1, "Please select a department"),
  specialization: z.string().min(2, "Specialization is required"),
  qualification: z.string().min(2, "Qualification is required"),
  experience: z.coerce.number().min(0, "Experience must be positive").max(50, "Experience cannot exceed 50 years"),
  consultationFee: z.coerce.number().min(1, "Fee must be greater than 0"),
  bio: z.string().min(10, "Bio must be at least 10 characters").max(500, "Bio cannot exceed 500 characters"),
  availability: z.record(z.object({
    enabled: z.boolean(),
    startTime: z.string(),
    endTime: z.string(),
  })),
});

type DoctorFormData = z.infer<typeof doctorSchema>;

const departments = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology", "Ophthalmology"];
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function DoctorForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<DoctorFormData>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      availability: {
        Monday: { enabled: true, startTime: "09:00", endTime: "17:00" },
        Tuesday: { enabled: true, startTime: "09:00", endTime: "17:00" },
        Wednesday: { enabled: true, startTime: "09:00", endTime: "17:00" },
        Thursday: { enabled: true, startTime: "09:00", endTime: "17:00" },
        Friday: { enabled: true, startTime: "09:00", endTime: "17:00" },
        Saturday: { enabled: false, startTime: "09:00", endTime: "13:00" },
        Sunday: { enabled: false, startTime: "09:00", endTime: "13:00" },
      },
    },
  });

  const availability = watch("availability");

  const toggleDay = (day: string) => {
    const current = availability[day];
    if (current) {
      setValue(`availability.${day}.enabled`, !current.enabled);
    }
  };

  const onSubmit = async (data: DoctorFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Doctor saved successfully!");
      } else {
        throw new Error("Failed to save doctor");
      }
    } catch {
      alert("Failed to save doctor. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Doctor Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Info */}
        <section>
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input {...register("firstName")} className="w-full border rounded-lg px-3 py-2" placeholder="John" />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input {...register("lastName")} className="w-full border rounded-lg px-3 py-2" placeholder="Doe" />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input {...register("email")} type="email" className="w-full border rounded-lg px-3 py-2" placeholder="john.doe@hospital.com" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input {...register("phone")} className="w-full border rounded-lg px-3 py-2" placeholder="+1 234 567 890" />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
          </div>
        </section>

        {/* Professional Info */}
        <section>
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Professional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <select {...register("department")} className="w-full border rounded-lg px-3 py-2">
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Specialization</label>
              <input {...register("specialization")} className="w-full border rounded-lg px-3 py-2" placeholder="e.g., Interventional Cardiology" />
              {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Qualification</label>
              <input {...register("qualification")} className="w-full border rounded-lg px-3 py-2" placeholder="e.g., MD, MBBS, FRCS" />
              {errors.qualification && <p className="text-red-500 text-sm">{errors.qualification.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Years of Experience</label>
              <input {...register("experience")} type="number" className="w-full border rounded-lg px-3 py-2" placeholder="5" />
              {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Consultation Fee ($)</label>
              <input {...register("consultationFee")} type="number" className="w-full border rounded-lg px-3 py-2" placeholder="150" />
              {errors.consultationFee && <p className="text-red-500 text-sm">{errors.consultationFee.message}</p>}
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea {...register("bio")} rows={3} className="w-full border rounded-lg px-3 py-2" placeholder="Brief professional description..." />
            {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
          </div>
        </section>

        {/* Availability Schedule */}
        <section>
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Weekly Availability</h2>
          <div className="space-y-3">
            {weekdays.map((day) => (
              <div key={day} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <label className="flex items-center gap-2 w-32">
                  <input
                    type="checkbox"
                    checked={availability[day]?.enabled || false}
                    onChange={() => toggleDay(day)}
                    className="w-4 h-4"
                  />
                  <span className="font-medium text-sm">{day}</span>
                </label>
                {availability[day]?.enabled && (
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      {...register(`availability.${day}.startTime`)}
                      className="border rounded px-2 py-1 text-sm"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="time"
                      {...register(`availability.${day}.endTime`)}
                      className="border rounded px-2 py-1 text-sm"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium">
          {isSubmitting ? "Saving..." : "Save Doctor"}
        </button>
      </form>
    </div>
  );
}
