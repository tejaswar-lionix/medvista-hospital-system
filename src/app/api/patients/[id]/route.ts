import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const patient = await prisma.patient.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            createdAt: true,
          },
        },
        appointments: {
          where: {
            status: { in: ['SCHEDULED', 'CONFIRMED'] },
            date: { gte: new Date() },
          },
          include: {
            doctor: {
              include: {
                user: {
                  select: { firstName: true, lastName: true },
                },
                department: {
                  select: { name: true },
                },
              },
            },
          },
          orderBy: { date: 'asc' },
          take: 5,
        },
        medicalRecords: {
          include: {
            doctor: {
              include: {
                user: {
                  select: { firstName: true, lastName: true },
                },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        bills: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!patient) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }

    if (session.user.role === 'PATIENT') {
      if (patient.userId !== session.user.id) {
        return NextResponse.json(
          { error: 'Unauthorized to view this patient profile' },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error('Failed to fetch patient:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patient' },
      { status: 500 }
    );
  }
}