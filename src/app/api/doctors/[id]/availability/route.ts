import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { availabilitySchema } from '@/lib/validations/doctor';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: params.id },
    });

    if (!doctor || !doctor.isActive) {
      return NextResponse.json(
        { error: 'Doctor not found' },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');

    let whereCondition: any = { doctorId: params.id };

    if (date) {
      const dayOfWeek = new Date(date).getDay();
      whereCondition.dayOfWeek = dayOfWeek;
    }

    const availability = await prisma.doctorAvailability.findMany({
      where: whereCondition,
      orderBy: { dayOfWeek: 'asc' },
    });

    return NextResponse.json(availability);
  } catch (error) {
    console.error('Failed to fetch availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}

export async function POST(
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

    const doctor = await prisma.doctor.findUnique({
      where: { id: params.id },
    });

    if (!doctor || !doctor.isActive) {
      return NextResponse.json(
        { error: 'Doctor not found' },
        { status: 404 }
      );
    }

    if (session.user.role === 'DOCTOR' && doctor.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Cannot modify another doctor\'s availability' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const result = availabilitySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { schedule } = result.data;

    await prisma.$transaction(
      schedule.map((slot) =>
        prisma.doctorAvailability.upsert({
          where: {
            doctorId_dayOfWeek: {
              doctorId: params.id,
              dayOfWeek: slot.dayOfWeek,
            },
          },
          update: {
            startTime: slot.startTime,
            endTime: slot.endTime,
            isAvailable: slot.isAvailable,
          },
          create: {
            doctorId: params.id,
            dayOfWeek: slot.dayOfWeek,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isAvailable: slot.isAvailable,
          },
        })
      )
    );

    const updatedAvailability = await prisma.doctorAvailability.findMany({
      where: { doctorId: params.id },
      orderBy: { dayOfWeek: 'asc' },
    });

    return NextResponse.json(updatedAvailability);
  } catch (error) {
    console.error('Failed to update availability:', error);
    return NextResponse.json(
      { error: 'Failed to update availability' },
      { status: 500 }
    );
  }
}