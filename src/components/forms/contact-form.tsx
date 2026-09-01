"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  department: z.string().min(1, "Please select a department"),
  message: z.string().min(20, "Message must be at least 20 characters").max(2000, "Message cannot exceed 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const departments = ["General Inquiry", "Appointments", "Billing", "Patient Records", "Complaints", "Feedback"];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setIsError(false);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsSuccess(true);
        reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-lg mx-auto p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">✉️</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
        <p className="text-gray-600 mb-6">We&apos;ll get back to you within 24 hours.</p>
        <button onClick={() => setIsSuccess(false)} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
          Send Another
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          Failed to send message. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input {...register("name")} className="w-full border rounded-lg px-3 py-2" placeholder="Your name" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input {...register("email")} type="email" className="w-full border rounded-lg px-3 py-2" placeholder="you@email.com" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input {...register("phone")} className="w-full border rounded-lg px-3 py-2" placeholder="+1 234 567 890" />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input {...register("subject")} className="w-full border rounded-lg px-3 py-2" placeholder="Subject" />
            {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <select {...register("department")} className="w-full border rounded-lg px-3 py-2">
              <option value="">Select</option>
              {departments.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
            </select>
            {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea {...register("message")} rows={5} className="w-full border rounded-lg px-3 py-2" placeholder="How can we help you?" />
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium">
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
