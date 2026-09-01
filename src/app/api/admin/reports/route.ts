import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Revenue report
    const [dailyRevenue, weeklyRevenue, monthlyRevenue] = await Promise.all([
      prisma.bill.aggregate({
        _sum: { paidAmount: true },
        where: {
          status: "PAID",
          createdAt: { gte: startOfDay },
        },
      }),
      prisma.bill.aggregate({
        _sum: { paidAmount: true },
        where: {
          status: "PAID",
          createdAt: { gte: startOfWeek },
        },
      }),
      prisma.bill.aggregate({
        _sum: { paidAmount: true },
        where: {
          status: "PAID",
          createdAt: { gte: startOfMonth },
        },
      }),
    ]);

    // Appointment statistics
    const [
      totalAppointments,
      scheduledAppointments,
      completedAppointments,
      cancelledAppointments,
      todayAppointments,
    ] = await Promise.all([
      prisma.appointment.count(),
      prisma.appointment.count({ where: { status: "SCHEDULED" } }),
      prisma.appointment.count({ where: { status: "COMPLETED" } }),
      prisma.appointment.count({ where: { status: "CANCELLED" } }),
      prisma.appointment.count({
        where: {
          appointmentDate: {
            gte: startOfDay.toISOString(),
            lt: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000).toISOString(),
          },
        },
      }),
    ]);

    // Department-wise breakdown
    const departments = await prisma.department.findMany({
      include: {
        doctors: {
          include: {
            appointments: {
              select: {
                status: true,
              },
            },
          },
        },
      },
    });

    const departmentBreakdown = departments.map((dept) => {
      const totalDoctors = dept.doctors.length;
      const totalDeptAppointments = dept.doctors.reduce(
        (sum, doc) => sum + doc.appointments.length,
        0
      );
      const completedDeptAppointments = dept.doctors.reduce(
        (sum, doc) => sum + doc.appointments.filter((a) => a.status === "COMPLETED").length,
        0
      );
      return {
        id: dept.id,
        name: dept.name,
        totalDoctors,
        totalAppointments: totalDeptAppointments,
        completedAppointments: completedDeptAppointments,
        completionRate:
          totalDeptAppointments > 0
            ? Math.round((completedDeptAppointments / totalDeptAppointments) * 100)
            : 0,
      };
    });

    // Doctor performance metrics
    const doctors = await prisma.doctor.findMany({
      include: {
        user: { select: { name: true } },
        department: { select: { name: true } },
        appointments: { select: { status: true } },
        medicalRecords: true,
      },
    });

    const doctorPerformance = doctors.map((doc) => {
      const totalAppointments = doc.appointments.length;
      const completedAppointments = doc.appointments.filter(
        (a) => a.status === "COMPLETED"
      ).length;
      return {
        id: doc.id,
        name: doc.user.name,
        department: doc.department?.name || "N/A",
        totalAppointments,
        completedAppointments,
        completionRate:
          totalAppointments > 0
            ? Math.round((completedAppointments / totalAppointments) * 100)
            : 0,
        totalRecords: doc.medicalRecords.length,
        consultationFee: doc.consultationFee,
      };
    });

    return NextResponse.json({
      revenue: {
        daily: dailyRevenue._sum.paidAmount || 0,
        weekly: weeklyRevenue._sum.paidAmount || 0,
        monthly: monthlyRevenue._sum.paidAmount || 0,
      },
      appointments: {
        total: totalAppointments,
        scheduled: scheduledAppointments,
        completed: completedAppointments,
        cancelled: cancelledAppointments,
        today: todayAppointments,
        completionRate:
          totalAppointments > 0
            ? Math.round((completedAppointments / totalAppointments) * 100)
            : 0,
      },
      departments: departmentBreakdown,
      doctors: doctorPerformance,
    });
  } catch (error) {
    console.error("Error generating reports:", error);
    return NextResponse.json(
      { error: "Failed to generate reports" },
      { status: 500 }
    );
  }
}
