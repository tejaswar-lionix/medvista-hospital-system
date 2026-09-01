import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
        doctor: {
          select: {
            id: true,
            specialization: true,
            experience: true,
            consultationFee: true,
            department: { select: { id: true, name: true } },
          },
        },
        patient: {
          select: {
            id: true,
            dateOfBirth: true,
            gender: true,
            bloodGroup: true,
            address: true,
            emergencyContact: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, phone } = body;

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      },
    });

    // Update doctor-specific fields
    if (session.user.role === "DOCTOR") {
      const { specialization, consultationFee, departmentId } = body;
      const doctor = await prisma.doctor.findFirst({
        where: { userId: session.user.id },
      });
      if (doctor) {
        await prisma.doctor.update({
          where: { id: doctor.id },
          data: {
            ...(specialization && { specialization }),
            ...(consultationFee && { consultationFee: parseFloat(consultationFee) }),
            ...(departmentId && { departmentId }),
          },
        });
      }
    }

    // Update patient-specific fields
    if (session.user.role === "PATIENT") {
      const { dateOfBirth, gender, bloodGroup, address, emergencyContact } = body;
      const patient = await prisma.patient.findFirst({
        where: { userId: session.user.id },
      });
      if (patient) {
        await prisma.patient.update({
          where: { id: patient.id },
          data: {
            ...(dateOfBirth && { dateOfBirth }),
            ...(gender && { gender }),
            ...(bloodGroup && { bloodGroup }),
            ...(address !== undefined && { address }),
            ...(emergencyContact !== undefined && { emergencyContact }),
          },
        });
      }
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
