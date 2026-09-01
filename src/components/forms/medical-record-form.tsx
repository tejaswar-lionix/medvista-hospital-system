"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const prescriptionItemSchema = z.object({
  name: z.string().min(1, "Medicine name is required"),
  dosage: z.string().min(1, "Dosage is required"),
  frequency: z.string().min(1, "Frequency is required"),
  duration: z.string().min(1, "Duration is required"),
  instructions: z.string().optional(),
});

const medicalRecordSchema = z.object({
  patientId: z.string().min(1, "Please select a patient"),
  symptoms: z.string().min(5, "Please describe symptoms (min 5 characters)"),
  diagnosis: z.string().min(2, "Diagnosis is required"),
  prescriptions: z.array(prescriptionItemSchema).min(1, "At least one prescription is required"),
  notes: z.string().optional(),
  followUpDate: z.string().optional(),
});

type MedicalRecordFormData = z.infer<typeof medicalRecordSchema>;

const commonSymptoms = ["Fever", "Headache", "Cough", "Fatigue", "Nausea", "Dizziness", "Pain", "Swelling", "Shortness of breath", "Chest pain"];

const frequencyOptions = ["Once daily", "Twice daily", "Three times daily", "Four times daily", "As needed", "Before meals", "After meals", "At bedtime"];

export default function MedicalRecordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addedSymptoms, setAddedSymptoms] = useState<string[]>([]);

  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<MedicalRecordFormData>({
    resolver: zodResolver(medicalRecordSchema),
    defaultValues: {
      prescriptions: [{ name: "", dosage: "", frequency: "", duration: "", instructions: "" }],
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "prescriptions" });
  const symptomsText = watch("symptoms") || "";

  const addSymptom = (symptom: string) => {
    if (!addedSymptoms.includes(symptom)) {
      const newSymptoms = [...addedSymptoms, symptom];
      setAddedSymptoms(newSymptoms);
      const current = symptomsText ? symptomsText + ", " + symptom : symptom;
      setValue("symptoms", current);
    }
  };

  const onSubmit = async (data: MedicalRecordFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/medical-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Medical record saved successfully!");
      } else {
        throw new Error("Failed to save record");
      }
    } catch {
      alert("Failed to save medical record.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">New Medical Record</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Patient Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Patient</label>
          <select {...register("patientId")} className="w-full border rounded-lg px-3 py-2">
            <option value="">Select Patient</option>
            <option value="p1">John Smith (ID: P001)</option>
            <option value="p2">Jane Doe (ID: P002)</option>
            <option value="p3">Robert Johnson (ID: P003)</option>
          </select>
          {errors.patientId && <p className="text-red-500 text-sm">{errors.patientId.message}</p>}
        </div>

        {/* Symptoms */}
        <div>
          <label className="block text-sm font-medium mb-1">Symptoms</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {commonSymptoms.map((symptom) => (
              <button key={symptom} type="button" onClick={() => addSymptom(symptom)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors">
                + {symptom}
              </button>
            ))}
          </div>
          <textarea {...register("symptoms")} rows={3} className="w-full border rounded-lg px-3 py-2" placeholder="Describe symptoms..." />
          {errors.symptoms && <p className="text-red-500 text-sm">{errors.symptoms.message}</p>}
        </div>

        {/* Diagnosis */}
        <div>
          <label className="block text-sm font-medium mb-1">Diagnosis</label>
          <input {...register("diagnosis")} className="w-full border rounded-lg px-3 py-2" placeholder="Enter diagnosis" />
          {errors.diagnosis && <p className="text-red-500 text-sm">{errors.diagnosis.message}</p>}
        </div>

        {/* Prescriptions */}
        <div>
          <label className="block text-sm font-medium mb-2">Prescriptions</label>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Medicine Name</label>
                    <input {...register(`prescriptions.${index}.name`)} className="w-full border rounded px-3 py-2 text-sm" placeholder="Medicine name" />
                    {errors.prescriptions?.[index]?.name && <p className="text-red-500 text-xs">{errors.prescriptions[index]?.name?.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Dosage</label>
                    <input {...register(`prescriptions.${index}.dosage`)} className="w-full border rounded px-3 py-2 text-sm" placeholder="e.g., 500mg" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Frequency</label>
                    <select {...register(`prescriptions.${index}.frequency`)} className="w-full border rounded px-3 py-2 text-sm">
                      <option value="">Select</option>
                      {frequencyOptions.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Duration</label>
                    <input {...register(`prescriptions.${index}.duration`)} className="w-full border rounded px-3 py-2 text-sm" placeholder="e.g., 7 days" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-500 mb-1">Instructions</label>
                    <input {...register(`prescriptions.${index}.instructions`)} className="w-full border rounded px-3 py-2 text-sm" placeholder="Special instructions" />
                  </div>
                </div>
                {fields.length > 1 && (
                  <button type="button" onClick={() => remove(index)} className="mt-2 text-red-500 text-sm hover:text-red-700">
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <button type="button" onClick={() => append({ name: "", dosage: "", frequency: "", duration: "", instructions: "" })}
            className="mt-2 text-blue-600 text-sm hover:text-blue-800">
            + Add Prescription
          </button>
          {errors.prescriptions && <p className="text-red-500 text-sm">{errors.prescriptions.message}</p>}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-1">Doctor Notes</label>
          <textarea {...register("notes")} rows={3} className="w-full border rounded-lg px-3 py-2" placeholder="Additional notes..." />
        </div>

        {/* Follow-up Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Follow-up Date (Optional)</label>
          <input {...register("followUpDate")} type="date" className="w-full border rounded-lg px-3 py-2" />
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium">
          {isSubmitting ? "Saving..." : "Save Medical Record"}
        </button>
      </form>
    </div>
  );
}
