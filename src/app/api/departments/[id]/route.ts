import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { departmentSchema } from '@/lib/validations/department';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const department = await prisma.department.findUnique({
      where: { id: params.id },
      include: {
        doctors: {
          where: { isActive: true },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            specialization: true,
          },
        },
        _count: {
          select: { doctors: true },
        },
      },
    });

    if (!department || !department.isActive) {
      return NextResponse.json(
        { error: 'Department not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(department);
  } catch (error) {
    console.error('Failed to fetch department:', error);
    return NextResponse.json(
      { error: 'Failed to fetch department' },
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

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const result = departmentSchema.partial().safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const existingDepartment = await prisma.department.findUnique({
      where: { id: params.id },
    });

    if (!existingDepartment || !existingDepartment.isActive) {
      return NextResponse.json(
        { error: 'Department not found' },
        { status: 404 }
      );
    }

    const department = await prisma.department.update({
      where: { id: params.id },
      data: result.data,
    });

    return NextResponse.json(department);
  } catch (error) {
    console.error('Failed to update department:', error);
    return NextResponse.json(
      { error: 'Failed to update department' },
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

    const department = await prisma.department.findUnique({
      where: { id: params.id },
      include: { _count: { select: { doctors: true } } },
    });

    if (!department || !department.isActive) {
      return NextResponse.json(
        { error: 'Department not found' },
        { status: 404 }
      );
    }

    if (department._count.doctors > 0) {
      return NextResponse.json(
        { error: 'Cannot delete department with active doctors' },
        { status: 400 }
      );
    }

    await prisma.department.update({
      where: { id: params.id },
      data: { isActive: false },
    });

    return NextResponse.json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error('Failed to delete department:', error);
    return NextResponse.json(
      { error: 'Failed to delete department' },
      { status: 500 }
    );
  }
}