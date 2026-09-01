import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { medicalRecordUpdateSchema } from '@/lib/validations/medical-record';

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

    const record = await prisma.medicalRecord.findUnique({
      where: { id: params.id },
      include: {
        doctor: {
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
        },
        patient: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        appointment: {
          select: {
            date: true,
            startTime: true,
            endTime: true,
            reason: true,
          },
        },
      },
    });

    if (!record) {
      return NextResponse.json(
        { error: 'Medical record not found' },
        { status: 404 }
      );
    }

    if (session.user.role === 'PATIENT') {
      const patient = await prisma.patient.findUnique({
        where: { userId: session.user.id },
      });
      if (patient?.id !== record.patientId) {
        return NextResponse.json(
          { error: 'Unauthorized to view this record' },
          { status: 403 }
        );
      }
    }

    if (session.user.role === 'DOCTOR') {
      const doctor = await prisma.doctor.findUnique({
        where: { userId: session.user.id },
      });
      if (doctor?.id !== record.doctorId) {
        return NextResponse.json(
          { error: 'Unauthorized to view this record' },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(record);
  } catch (error) {
    console.error('Failed to fetch medical record:', error);
    return NextResponse.json(
      { error: 'Failed to fetch medical record' },
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

    if (!session || session.user.role !== 'DOCTOR') {
      return NextResponse.json(
        { error: 'Unauthorized. Doctor access required.' },
        { status: 403 }
      );
    }

    const record = await prisma.medicalRecord.findUnique({
      where: { id: params.id },
    });

    if (!record) {
      return NextResponse.json(
        { error: 'Medical record not found' },
        { status: 404 }
      );
    }

    const doctor = await prisma.doctor.findUnique({
      where: { userId: session.user.id },
    });

    if (doctor?.id !== record.doctorId) {
      return NextResponse.json(
        { error: 'Unauthorized to update this record' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const result = medicalRecordUpdateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const updatedRecord = await prisma.medicalRecord.update({
      where: { id: params.id },
      data: result.data,
      include: {
        doctor: {
          include: {
            user: {
              select: { firstName: true, lastName: true },
            },
          },
        },
        patient: {
          include: {
            user: {
              select: { firstName: true, lastName: true },
            },
          },
        },
      },
    });

    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error('Failed to update medical record:', error);
    return NextResponse.json(
      { error: 'Failed to update medical record' },
      { status: 500 }
    );
  }
}