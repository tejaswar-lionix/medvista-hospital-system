"use client";

import React, { useState, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const billItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.coerce.number().min(0, "Price must be positive"),
});

const billSchema = z.object({
  patientId: z.string().min(1, "Please select a patient"),
  items: z.array(billItemSchema).min(1, "At least one item is required"),
  taxRate: z.coerce.number().min(0).max(100, "Tax rate cannot exceed 100%"),
  discount: z.coerce.number().min(0, "Discount must be positive"),
  paymentMethod: z.string().min(1, "Select a payment method"),
  notes: z.string().optional(),
});

type BillFormData = z.infer<typeof billSchema>;

export default function BillForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<BillFormData>({
    resolver: zodResolver(billSchema),
    defaultValues: {
      items: [{ description: "", quantity: 1, unitPrice: 0 }],
      taxRate: 18,
      discount: 0,
      paymentMethod: "",
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const watchedItems = watch("items");
  const watchedTaxRate = watch("taxRate");
  const watchedDiscount = watch("discount");

  const calculations = useMemo(() => {
    const subtotal = (watchedItems || []).reduce((sum, item) => sum + (item.quantity || 0) * (item.unitPrice || 0), 0);
    const tax = subtotal * ((watchedTaxRate || 0) / 100);
    const total = subtotal + tax - (watchedDiscount || 0);
    return { subtotal, tax, total };
  }, [watchedItems, watchedTaxRate, watchedDiscount]);

  const onSubmit = async (data: BillFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/bills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ...calculations }),
      });
      if (response.ok) {
        alert("Bill created successfully!");
      } else {
        throw new Error("Failed to create bill");
      }
    } catch {
      alert("Failed to create bill.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Bill</h1>
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

        {/* Bill Items */}
        <div>
          <label className="block text-sm font-medium mb-2">Bill Items</label>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-3 items-start">
                <div className="flex-1">
                  <input {...register(`items.${index}.description`)} className="w-full border rounded px-3 py-2 text-sm" placeholder="Item description" />
                  {errors.items?.[index]?.description && <p className="text-red-500 text-xs">{errors.items[index]?.description?.message}</p>}
                </div>
                <div className="w-20">
                  <input {...register(`items.${index}.quantity`)} type="number" className="w-full border rounded px-3 py-2 text-sm" placeholder="Qty" />
                </div>
                <div className="w-24">
                  <input {...register(`items.${index}.unitPrice`)} type="number" step="0.01" className="w-full border rounded px-3 py-2 text-sm" placeholder="Price" />
                </div>
                <div className="w-24 text-sm font-medium py-2">
                  ${((watchedItems?.[index]?.quantity || 0) * (watchedItems?.[index]?.unitPrice || 0)).toFixed(2)}
                </div>
                {fields.length > 1 && (
                  <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700 py-2">✕</button>
                )}
              </div>
            ))}
          </div>
          <button type="button" onClick={() => append({ description: "", quantity: 1, unitPrice: 0 })}
            className="mt-2 text-blue-600 text-sm hover:text-blue-800">
            + Add Item
          </button>
          {errors.items && <p className="text-red-500 text-sm">{errors.items.message}</p>}
        </div>

        {/* Tax, Discount, Totals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tax Rate (%)</label>
              <input {...register("taxRate")} type="number" step="0.1" className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Discount ($)</label>
              <input {...register("discount")} type="number" step="0.01" className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Payment Method</label>
              <select {...register("paymentMethod")} className="w-full border rounded-lg px-3 py-2">
                <option value="">Select Method</option>
                <option value="cash">Cash</option>
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI</option>
                <option value="insurance">Insurance</option>
              </select>
              {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal:</span><span className="font-medium">${calculations.subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Tax ({watchedTaxRate}%):</span><span className="font-medium">${calculations.tax.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Discount:</span><span className="font-medium text-red-600">-${(watchedDiscount || 0).toFixed(2)}</span></div>
            <hr />
            <div className="flex justify-between text-lg font-bold"><span>Total:</span><span>${calculations.total.toFixed(2)}</span></div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
          <textarea {...register("notes")} rows={2} className="w-full border rounded-lg px-3 py-2" placeholder="Additional notes..." />
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium">
          {isSubmitting ? "Creating..." : "Create Bill"}
        </button>
      </form>
    </div>
  );
}
