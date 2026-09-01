import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { doctorSchema } from '@/lib/validations/doctor';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const departmentId = searchParams.get('departmentId');
    const available = searchParams.get('available');
    const specialization = searchParams.get('specialization');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const where: any = { isActive: true };

    if (departmentId) {
      where.departmentId = departmentId;
    }

    if (specialization) {
      where.specialization = { contains: specialization, mode: 'insensitive' };
    }

    if (available === 'true') {
      where.availability = {
        some: {
          dayOfWeek: new Date().getDay(),
          isAvailable: true,
          startTime: { lte: new Date().toTimeString().slice(0, 5) },
          endTime: { gte: new Date().toTimeString().slice(0, 5) },
        },
      };
    }

    const [doctors, total] = await Promise.all([
      prisma.doctor.findMany({
        where,
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
            select: { name: true },
          },
        },
        skip,
        take: limit,
        orderBy: { user: { lastName: 'asc' } },
      }),
      prisma.doctor.count({ where }),
    ]);

    return NextResponse.json({
      doctors,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Failed to fetch doctors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !['ADMIN', 'DOCTOR'].includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const result = doctorSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { userId, departmentId, specialization, licenseNumber, bio } = result.data;

    const existingDoctor = await prisma.doctor.findFirst({
      where: { userId },
    });

    if (existingDoctor) {
      return NextResponse.json(
        { error: 'Doctor profile already exists for this user' },
        { status: 409 }
      );
    }

    const doctor = await prisma.doctor.create({
      data: {
        userId,
        departmentId,
        specialization,
        licenseNumber,
        bio,
      },
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

    return NextResponse.json(doctor, { status: 201 });
  } catch (error) {
    console.error('Failed to create doctor:', error);
    return NextResponse.json(
      { error: 'Failed to create doctor profile' },
      { status: 500 }
    );
  }
}