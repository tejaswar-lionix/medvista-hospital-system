"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const feedbackSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  comment: z.string().min(10, "Comment must be at least 10 characters").max(1000, "Comment cannot exceed 1000 characters"),
  anonymous: z.boolean().optional(),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

export default function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { rating: 0, comment: "", anonymous: false },
  });

  const rating = watch("rating");
  const comment = watch("comment") || "";

  const onSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, appointmentId: "APT-123", doctorId: "D1" }),
      });
      if (response.ok) {
        setIsSuccess(true);
      } else {
        throw new Error("Failed to submit feedback");
      }
    } catch {
      alert("Failed to submit feedback.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-lg mx-auto p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">🎉</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-6">Your feedback has been submitted successfully. It helps us improve our services.</p>
        <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Rate Your Experience</h1>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-500">Appointment with</p>
        <p className="font-semibold">Dr. Sarah Johnson</p>
        <p className="text-sm text-gray-500">Cardiology • Sep 1, 2026</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Star Rating */}
        <div>
          <label className="block text-sm font-medium mb-2">How was your experience?</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button"
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setValue("rating", star)}
                className="text-4xl transition-transform hover:scale-110">
                <span className={star <= (hoveredStar || rating) ? "text-yellow-400" : "text-gray-300"}>★</span>
              </button>
            ))}
          </div>
          {rating > 0 && <p className="text-sm text-gray-500 mt-1">{rating === 5 ? "Excellent!" : rating >= 4 ? "Good" : rating >= 3 ? "Average" : "Below Average"}</p>}
          {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium mb-1">Your Feedback</label>
          <textarea {...register("comment")} rows={4} className="w-full border rounded-lg px-3 py-2" placeholder="Tell us about your experience..." />
          <div className="flex justify-between mt-1">
            {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
            <p className={`text-sm ml-auto ${comment.length > 900 ? "text-red-500" : "text-gray-400"}`}>{comment.length}/1000</p>
          </div>
        </div>

        {/* Anonymous */}
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("anonymous")} className="w-4 h-4" />
          <span className="text-sm">Submit anonymously</span>
        </label>

        <button type="submit" disabled={isSubmitting || rating === 0} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium">
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
}
