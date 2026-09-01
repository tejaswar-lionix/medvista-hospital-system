import { cn } from "@/lib/utils";

type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "in-progress"
  | "completed"
  | "cancelled"
  | "no-show";

type BillStatus = "pending" | "paid" | "overdue" | "partial" | "refunded";

type GeneralStatus = "active" | "inactive" | "pending" | "error" | "success";

type StatusVariant = "appointment" | "bill" | "general";

interface StatusBadgeProps {
  status: AppointmentStatus | BillStatus | GeneralStatus;
  variant?: StatusVariant;
}

const statusConfig: Record<
  string,
  { label: string; className: string }
> = {
  // Appointment statuses
  scheduled: {
    label: "Scheduled",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-800 border-red-200",
  },
  "no-show": {
    label: "No Show",
    className: "bg-gray-100 text-gray-800 border-gray-200",
  },
  // Bill statuses
  pending: {
    label: "Pending",
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
  paid: {
    label: "Paid",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  overdue: {
    label: "Overdue",
    className: "bg-red-100 text-red-800 border-red-200",
  },
  partial: {
    label: "Partial",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  refunded: {
    label: "Refunded",
    className: "bg-purple-100 text-purple-800 border-purple-200",
  },
  // General statuses
  active: {
    label: "Active",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  inactive: {
    label: "Inactive",
    className: "bg-gray-100 text-gray-800 border-gray-200",
  },
  error: {
    label: "Error",
    className: "bg-red-100 text-red-800 border-red-200",
  },
  success: {
    label: "Success",
    className: "bg-green-100 text-green-800 border-green-200",
  },
};

export function StatusBadge({ status, variant = "general" }: StatusBadgeProps) {
  const config = statusConfig[status] ?? {
    label: status,
    className: "bg-gray-100 text-gray-800 border-gray-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
