"use client";

import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function PasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const newPassword = watch("newPassword") || "";

  const passwordStrength = useMemo(() => {
    let score = 0;
    if (newPassword.length >= 8) score++;
    if (newPassword.length >= 12) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/[a-z]/.test(newPassword)) score++;
    if (/[0-9]/.test(newPassword)) score++;
    if (/[^A-Za-z0-9]/.test(newPassword)) score++;
    return score;
  }, [newPassword]);

  const strengthLabel = passwordStrength <= 2 ? "Weak" : passwordStrength <= 4 ? "Medium" : "Strong";
  const strengthColor = passwordStrength <= 2 ? "bg-red-500" : passwordStrength <= 4 ? "bg-yellow-500" : "bg-green-500";

  const requirements = [
    { label: "At least 8 characters", met: newPassword.length >= 8 },
    { label: "At least 12 characters", met: newPassword.length >= 12 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(newPassword) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(newPassword) },
    { label: "Contains number", met: /[0-9]/.test(newPassword) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(newPassword) },
  ];

  const onSubmit = async (data: PasswordFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Password changed successfully!");
      } else {
        throw new Error("Failed to change password");
      }
    } catch {
      alert("Failed to change password. Please check your current password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Change Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Current Password</label>
          <div className="relative">
            <input {...register("currentPassword")} type={showCurrent ? "text" : "password"} className="w-full border rounded-lg px-3 py-2 pr-10" placeholder="Enter current password" />
            <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-2.5 text-gray-500 text-sm">
              {showCurrent ? "Hide" : "Show"}
            </button>
          </div>
          {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <div className="relative">
            <input {...register("newPassword")} type={showNew ? "text" : "password"} className="w-full border rounded-lg px-3 py-2 pr-10" placeholder="Enter new password" />
            <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-2.5 text-gray-500 text-sm">
              {showNew ? "Hide" : "Show"}
            </button>
          </div>
          {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}

          {newPassword && (
            <div className="mt-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full ${strengthColor} transition-all`} style={{ width: `${(passwordStrength / 6) * 100}%` }} />
                </div>
                <span className="text-xs font-medium">{strengthLabel}</span>
              </div>
              <div className="grid grid-cols-2 gap-1 mt-2">
                {requirements.map((req) => (
                  <div key={req.label} className={`text-xs ${req.met ? "text-green-600" : "text-gray-400"}`}>
                    {req.met ? "✓" : "○"} {req.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Confirm New Password</label>
          <div className="relative">
            <input {...register("confirmPassword")} type={showConfirm ? "text" : "password"} className="w-full border rounded-lg px-3 py-2 pr-10" placeholder="Confirm new password" />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-2.5 text-gray-500 text-sm">
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium">
          {isSubmitting ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
