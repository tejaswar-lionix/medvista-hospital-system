import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "patients";
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const dateFilter: any = {};
    if (startDate) {
      dateFilter.gte = new Date(startDate);
    }
    if (endDate) {
      dateFilter.lte = new Date(endDate);
    }

    let data: any[] = [];
    let filename = "";

    switch (type) {
      case "patients":
        const patients = await prisma.patient.findMany({
          include: {
            user: { select: { name: true, email: true, phone: true } },
          },
        });
        data = patients.map((p) => ({
          ID: p.id,
          Name: p.user.name,
          Email: p.user.email,
          Phone: p.user.phone,
          "Date of Birth": p.dateOfBirth,
          Gender: p.gender,
          "Blood Group": p.bloodGroup || "N/A",
          Address: p.address || "N/A",
          "Emergency Contact": p.emergencyContact || "N/A",
          "Created At": p.createdAt,
        }));
        filename = `patients_export_${new Date().toISOString().split("T")[0]}.csv`;
        break;

      case "appointments":
        const appointmentFilter: any = {};
        if (startDate || endDate) {
          appointmentFilter.appointmentDate = dateFilter;
        }
        const appointments = await prisma.appointment.findMany({
          where: appointmentFilter,
          include: {
            patient: { include: { user: { select: { name: true } } } },
            doctor: {
              include: { user: { select: { name: true } } },
            },
          },
          orderBy: { appointmentDate: "desc" },
        });
        data = appointments.map((a) => ({
          ID: a.id,
          "Patient Name": a.patient.user.name,
          "Doctor Name": a.doctor.user.name,
          "Appointment Date": a.appointmentDate,
          Reason: a.reason,
          Status: a.status,
          Notes: a.notes || "N/A",
          "Created At": a.createdAt,
        }));
        filename = `appointments_export_${new Date().toISOString().split("T")[0]}.csv`;
        break;

      case "bills":
        const billFilter: any = {};
        if (startDate || endDate) {
          billFilter.createdAt = dateFilter;
        }
        const bills = await prisma.bill.findMany({
          where: billFilter,
          include: {
            patient: { include: { user: { select: { name: true } } } },
            lineItems: true,
          },
          orderBy: { createdAt: "desc" },
        });
        data = bills.map((b) => ({
          ID: b.id,
          "Patient Name": b.patient.user.name,
          "Total Amount": b.totalAmount,
          "Paid Amount": b.paidAmount,
          Status: b.status,
          "Due Date": b.dueDate,
          "Line Items": b.lineItems.length,
          "Created At": b.createdAt,
        }));
        filename = `bills_export_${new Date().toISOString().split("T")[0]}.csv`;
        break;

      default:
        return NextResponse.json(
          { error: "Invalid export type. Use: patients, appointments, bills" },
          { status: 400 }
        );
    }

    return NextResponse.json({
      filename,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Error exporting data:", error);
    return NextResponse.json(
      { error: "Failed to export data" },
      { status: 500 }
    );
  }
}
