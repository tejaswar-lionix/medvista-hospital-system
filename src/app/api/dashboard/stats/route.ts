import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const today = new Date();
    const todayStart = startOfDay(today);
    const todayEnd = endOfDay(today);
    const weekStart = startOfWeek(today);
    const weekEnd = endOfWeek(today);
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);

    let stats: any = {};

    if (session.user.role === 'ADMIN') {
      const [
        totalPatients,
        totalDoctors,
        totalDepartments,
        todayAppointments,
        weekAppointments,
        monthAppointments,
        pendingBills,
        totalRevenue,
        recentAppointments,
        departmentStats,
      ] = await Promise.all([
        prisma.patient.count({ where: { user: { isActive: true } } }),
        prisma.doctor.count({ where: { isActive: true } }),
        prisma.department.count({ where: { isActive: true } }),
        prisma.appointment.count({
          where: {
            date: { gte: todayStart, lte: todayEnd },
            status: { not: 'CANCELLED' },
          },
        }),
        prisma.appointment.count({
          where: {
            date: { gte: weekStart, lte: weekEnd },
            status: { not: 'CANCELLED' },
          },
        }),
        prisma.appointment.count({
          where: {
            date: { gte: monthStart, lte: monthEnd },
            status: { not: 'CANCELLED' },
          },
        }),
        prisma.bill.aggregate({
          where: { paymentStatus: { in: ['PENDING', 'PARTIAL'] } },
          _sum: { totalAmount: true },
        }),
        prisma.bill.aggregate({
          where: { paymentStatus: 'PAID' },
          _sum: { paidAmount: true },
        }),
        prisma.appointment.findMany({
          where: {
            date: { gte: todayStart },
            status: { in: ['SCHEDULED', 'CONFIRMED'] },
          },
          include: {
            doctor: {
              include: {
                user: { select: { firstName: true, lastName: true } },
                department: { select: { name: true } },
              },
            },
            patient: {
              include: {
                user: { select: { firstName: true, lastName: true } },
              },
            },
          },
          orderBy: { startTime: 'asc' },
          take: 10,
        }),
        prisma.appointment.groupBy({
          by: ['status'],
          where: {
            date: { gte: monthStart, lte: monthEnd },
          },
          _count: true,
        }),
      ]);

      stats = {
        totalPatients,
        totalDoctors,
        totalDepartments,
        todayAppointments,
        weekAppointments,
        monthAppointments,
        pendingBillsAmount: pendingBills._sum.totalAmount || 0,
        totalRevenue: totalRevenue._sum.paidAmount || 0,
        recentAppointments,
        appointmentStats: departmentStats,
      };
    } else if (session.user.role === 'DOCTOR') {
      const doctor = await prisma.doctor.findUnique({
        where: { userId: session.user.id },
      });

      if (!doctor) {
        return NextResponse.json(
          { error: 'Doctor profile not found' },
          { status: 404 }
        );
      }

      const [
        todayAppointments,
        weekAppointments,
        monthAppointments,
        totalPatients,
        recentAppointments,
        appointmentStats,
      ] = await Promise.all([
        prisma.appointment.count({
          where: {
            doctorId: doctor.id,
            date: { gte: todayStart, lte: todayEnd },
            status: { not: 'CANCELLED' },
          },
        }),
        prisma.appointment.count({
          where: {
            doctorId: doctor.id,
            date: { gte: weekStart, lte: weekEnd },
            status: { not: 'CANCELLED' },
          },
        }),
        prisma.appointment.count({
          where: {
            doctorId: doctor.id,
            date: { gte: monthStart, lte: monthEnd },
            status: { not: 'CANCELLED' },
          },
        }),
        prisma.appointment.findMany({
          where: {
            doctorId: doctor.id,
            status: { not: 'CANCELLED' },
          },
          select: { patientId: true },
          distinct: ['patientId'],
        }),
        prisma.appointment.findMany({
          where: {
            doctorId: doctor.id,
            date: { gte: todayStart },
            status: { in: ['SCHEDULED', 'CONFIRMED'] },
          },
          include: {
            patient: {
              include: {
                user: { select: { firstName: true, lastName: true } },
              },
            },
          },
          orderBy: { startTime: 'asc' },
          take: 10,
        }),
        prisma.appointment.groupBy({
          by: ['status'],
          where: {
            doctorId: doctor.id,
            date: { gte: monthStart, lte: monthEnd },
          },
          _count: true,
        }),
      ]);

      stats = {
        todayAppointments,
        weekAppointments,
        monthAppointments,
        totalPatients: totalPatients.length,
        recentAppointments,
        appointmentStats,
      };
    } else if (session.user.role === 'PATIENT') {
      const patient = await prisma.patient.findUnique({
        where: { userId: session.user.id },
      });

      if (!patient) {
        return NextResponse.json(
          { error: 'Patient profile not found' },
          { status: 404 }
        );
      }

      const [
        upcomingAppointments,
        totalAppointments,
        pendingBills,
        totalBilled,
        recentRecords,
      ] = await Promise.all([
        prisma.appointment.findMany({
          where: {
            patientId: patient.id,
            date: { gte: todayStart },
            status: { in: ['SCHEDULED', 'CONFIRMED'] },
          },
          include: {
            doctor: {
              include: {
                user: { select: { firstName: true, lastName: true } },
                department: { select: { name: true } },
              },
            },
          },
          orderBy: { date: 'asc' },
          take: 5,
        }),
        prisma.appointment.count({
          where: {
            patientId: patient.id,
            status: { not: 'CANCELLED' },
          },
        }),
        prisma.bill.aggregate({
          where: {
            patientId: patient.id,
            paymentStatus: { in: ['PENDING', 'PARTIAL'] },
          },
          _sum: { totalAmount: true },
        }),
        prisma.bill.aggregate({
          where: { patientId: patient.id },
          _sum: { totalAmount: true },
        }),
        prisma.medicalRecord.findMany({
          where: { patientId: patient.id },
          include: {
            doctor: {
              include: {
                user: { select: { firstName: true, lastName: true } },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 5,
        }),
      ]);

      stats = {
        upcomingAppointments,
        totalAppointments,
        pendingBillsAmount: pendingBills._sum.totalAmount || 0,
        totalBilled: totalBilled._sum.totalAmount || 0,
        recentRecords,
      };
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}