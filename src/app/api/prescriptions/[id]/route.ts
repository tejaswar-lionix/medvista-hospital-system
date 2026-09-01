import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const prescription = await prisma.prescription.findUnique({
      where: { id: params.id },
      include: {
        patient: { include: { user: { select: { name: true, email: true, phone: true } } } },
        doctor: { include: { user: { select: { name: true, email: true } } } },
        medicalRecord: true,
      },
    });

    if (!prescription) {
      return NextResponse.json({ error: "Prescription not found" }, { status: 404 });
    }

    // Patients can only view their own prescriptions
    if (session.user.role === "PATIENT") {
      const patient = await prisma.patient.findFirst({
        where: { userId: session.user.id },
      });
      if (patient && prescription.patientId !== patient.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    return NextResponse.json(prescription);
  } catch (error) {
    console.error("Error fetching prescription:", error);
    return NextResponse.json(
      { error: "Failed to fetch prescription" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "DOCTOR") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { medications, instructions } = body;

    const existingPrescription = await prisma.prescription.findUnique({
      where: { id: params.id },
    });

    if (!existingPrescription) {
      return NextResponse.json({ error: "Prescription not found" }, { status: 404 });
    }

    const doctor = await prisma.doctor.findFirst({
      where: { userId: session.user.id },
    });

    if (!doctor || existingPrescription.doctorId !== doctor.id) {
      return NextResponse.json(
        { error: "You can only edit your own prescriptions" },
        { status: 401 }
      );
    }

    const updatedPrescription = await prisma.prescription.update({
      where: { id: params.id },
      data: {
        medications: medications || existingPrescription.medications,
        instructions: instructions !== undefined ? instructions : existingPrescription.instructions,
      },
      include: {
        patient: { include: { user: { select: { name: true, email: true } } } },
        doctor: { include: { user: { select: { name: true, email: true } } } },
      },
    });

    return NextResponse.json(updatedPrescription);
  } catch (error) {
    console.error("Error updating prescription:", error);
    return NextResponse.json(
      { error: "Failed to update prescription" },
      { status: 500 }
    );
  }
}
