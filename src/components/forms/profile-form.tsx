"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const profileSchema = z.object({
  avatar: z.any().optional(),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email(),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  street: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(5, "Pincode must be at least 5 characters"),
  emergencyName: z.string().min(2, "Emergency contact name is required"),
  emergencyPhone: z.string().min(10, "Emergency phone must be at least 10 digits"),
  emergencyRelation: z.string().min(1, "Relationship is required"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@email.com",
      phone: "+1 234 567 890",
      dateOfBirth: "1990-05-15",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      pincode: "10001",
      emergencyName: "Jane Smith",
      emergencyPhone: "+1 234 567 891",
      emergencyRelation: "Spouse",
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch {
      alert("Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Avatar Upload */}
        <section className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl text-gray-400">👤</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Profile Photo</label>
            <input type="file" accept="image/*" onChange={handleAvatarChange} className="text-sm" />
            <p className="text-xs text-gray-500 mt-1">JPG, PNG. Max 2MB.</p>
          </div>
        </section>

        {/* Personal Info */}
        <section>
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input {...register("firstName")} className="w-full border rounded-lg px-3 py-2" />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input {...register("lastName")} className="w-full border rounded-lg px-3 py-2" />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input {...register("email")} disabled className="w-full border rounded-lg px-3 py-2 bg-gray-100" />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input {...register("phone")} className="w-full border rounded-lg px-3 py-2" />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date of Birth</label>
              <input {...register("dateOfBirth")} type="date" className="w-full border rounded-lg px-3 py-2" />
              {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
            </div>
          </div>
        </section>

        {/* Address */}
        <section>
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Address</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Street Address</label>
              <input {...register("street")} className="w-full border rounded-lg px-3 py-2" />
              {errors.street && <p className="text-red-500 text-sm">{errors.street.message}</p>}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input {...register("city")} className="w-full border rounded-lg px-3 py-2" />
                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <input {...register("state")} className="w-full border rounded-lg px-3 py-2" />
                {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pincode</label>
                <input {...register("pincode")} className="w-full border rounded-lg px-3 py-2" />
                {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode.message}</p>}
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section>
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Emergency Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input {...register("emergencyName")} className="w-full border rounded-lg px-3 py-2" />
              {errors.emergencyName && <p className="text-red-500 text-sm">{errors.emergencyName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input {...register("emergencyPhone")} className="w-full border rounded-lg px-3 py-2" />
              {errors.emergencyPhone && <p className="text-red-500 text-sm">{errors.emergencyPhone.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Relationship</label>
              <input {...register("emergencyRelation")} className="w-full border rounded-lg px-3 py-2" />
              {errors.emergencyRelation && <p className="text-red-500 text-sm">{errors.emergencyRelation.message}</p>}
            </div>
          </div>
        </section>

        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium">
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
