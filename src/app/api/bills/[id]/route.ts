import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { billUpdateSchema } from '@/lib/validations/bill';

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

    const bill = await prisma.bill.findUnique({
      where: { id: params.id },
      include: {
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
        },
        payments: true,
      },
    });

    if (!bill) {
      return NextResponse.json(
        { error: 'Bill not found' },
        { status: 404 }
      );
    }

    if (session.user.role === 'PATIENT') {
      const patient = await prisma.patient.findUnique({
        where: { userId: session.user.id },
      });
      if (patient?.id !== bill.patientId) {
        return NextResponse.json(
          { error: 'Unauthorized to view this bill' },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(bill);
  } catch (error) {
    console.error('Failed to fetch bill:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bill' },
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

    const bill = await prisma.bill.findUnique({
      where: { id: params.id },
    });

    if (!bill) {
      return NextResponse.json(
        { error: 'Bill not found' },
        { status: 404 }
      );
    }

    const body = await req.json();
    const result = billUpdateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { paymentStatus, paymentMethod, paidAmount, paymentDate, notes } = result.data;

    const updateData: any = {};

    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
    }

    if (paymentMethod) {
      updateData.paymentMethod = paymentMethod;
    }

    if (paidAmount !== undefined) {
      updateData.paidAmount = paidAmount;
      if (paidAmount >= bill.totalAmount) {
        updateData.paymentStatus = 'PAID';
        updateData.paymentDate = paymentDate || new Date();
      } else if (paidAmount > 0) {
        updateData.paymentStatus = 'PARTIAL';
      }
    }

    if (paymentDate) {
      updateData.paymentDate = new Date(paymentDate);
    }

    if (notes !== undefined) {
      updateData.notes = notes;
    }

    const updatedBill = await prisma.bill.update({
      where: { id: params.id },
      data: updateData,
      include: {
        patient: {
          include: {
            user: {
              select: { firstName: true, lastName: true },
            },
          },
        },
        payments: true,
      },
    });

    return NextResponse.json(updatedBill);
  } catch (error) {
    console.error('Failed to update bill:', error);
    return NextResponse.json(
      { error: 'Failed to update bill' },
      { status: 500 }
    );
  }
}