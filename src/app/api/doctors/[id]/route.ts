import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { doctorSchema } from '@/lib/validations/doctor';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        department: {
          select: { name: true, floor: true },
        },
        availability: true,
        _count: {
          select: { appointments: true },
        },
      },
    });

    if (!doctor || !doctor.isActive) {
      return NextResponse.json(
        { error: 'Doctor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(doctor);
  } catch (error) {
    console.error('Failed to fetch doctor:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doctor' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !['ADMIN', 'DOCTOR'].includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const result = doctorSchema.partial().safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const existingDoctor = await prisma.doctor.findUnique({
      where: { id: params.id },
    });

    if (!existingDoctor || !existingDoctor.isActive) {
      return NextResponse.json(
        { error: 'Doctor not found' },
        { status: 404 }
      );
    }

    const doctor = await prisma.doctor.update({
      where: { id: params.id },
      data: result.data,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        department: {
          select: { name: true },
        },
      },
    });

    return NextResponse.json(doctor);
  } catch (error) {
    console.error('Failed to update doctor:', error);
    return NextResponse.json(
      { error: 'Failed to update doctor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    const doctor = await prisma.doctor.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { appointments: true },
        },
      },
    });

    if (!doctor || !doctor.isActive) {
      return NextResponse.json(
        { error: 'Doctor not found' },
        { status: 404 }
      );
    }

    const hasUpcomingAppointments = await prisma.appointment.findFirst({
      where: {
        doctorId: params.id,
        status: { in: ['SCHEDULED', 'CONFIRMED'] },
        date: { gte: new Date() },
      },
    });

    if (hasUpcomingAppointments) {
      return NextResponse.json(
        { error: 'Cannot delete doctor with upcoming appointments' },
        { status: 400 }
      );
    }

    await prisma.doctor.update({
      where: { id: params.id },
      data: { isActive: false },
    });

    return NextResponse.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Failed to delete doctor:', error);
    return NextResponse.json(
      { error: 'Failed to delete doctor' },
      { status: 500 }
    );
  }
}