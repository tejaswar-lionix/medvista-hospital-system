import { NextResponse } from "next/server";

let insuranceClaims = [
  {
    id: "CLM-2024-001",
    patient: "Robert Johnson",
    provider: "Blue Cross Blue Shield",
    policyNumber: "BC-123456789",
    claimAmount: 4500.0,
    approvedAmount: 4200.0,
    status: "approved",
    dateSubmitted: "2024-01-10",
    dateProcessed: "2024-01-15",
    service: "Cardiac Consultation & ECG",
    diagnosis: "Hypertension follow-up",
  },
  {
    id: "CLM-2024-002",
    patient: "Maria Garcia",
    provider: "Aetna",
    policyNumber: "AE-987654321",
    claimAmount: 12000.0,
    approvedAmount: 0,
    status: "pending",
    dateSubmitted: "2024-01-18",
    dateProcessed: "",
    service: "Knee Replacement Surgery",
    diagnosis: "Osteoarthritis - Right Knee",
  },
  {
    id: "CLM-2024-003",
    patient: "David Lee",
    provider: "United Healthcare",
    policyNumber: "UH-456789123",
    claimAmount: 2800.0,
    approvedAmount: 2800.0,
    status: "approved",
    dateSubmitted: "2024-01-05",
    dateProcessed: "2024-01-12",
    service: "Emergency Appendectomy",
    diagnosis: "Acute Appendicitis",
  },
  {
    id: "CLM-2024-004",
    patient: "Jennifer White",
    provider: "Cigna",
    policyNumber: "CG-321654987",
    claimAmount: 8500.0,
    approvedAmount: 0,
    status: "denied",
    dateSubmitted: "2024-01-12",
    dateProcessed: "2024-01-19",
    service: "Cosmetic Procedure",
    diagnosis: "Elective surgery - not covered",
    denialReason: "Procedure not covered under current policy",
  },
];

const insuranceProviders = [
  { id: 1, name: "Blue Cross Blue Shield", contactPhone: "1-800-555-0100" },
  { id: 2, name: "Aetna", contactPhone: "1-800-555-0200" },
  { id: 3, name: "United Healthcare", contactPhone: "1-800-555-0300" },
  { id: 4, name: "Cigna", contactPhone: "1-800-555-0400" },
  { id: 5, name: "Humana", contactPhone: "1-800-555-0500" },
];

export async function GET() {
  return NextResponse.json({
    claims: insuranceClaims,
    providers: insuranceProviders,
    summary: {
      totalClaims: insuranceClaims.length,
      approved: insuranceClaims.filter((c) => c.status === "approved").length,
      pending: insuranceClaims.filter((c) => c.status === "pending").length,
      denied: insuranceClaims.filter((c) => c.status === "denied").length,
      totalClaimed: insuranceClaims.reduce((sum, c) => sum + c.claimAmount, 0),
      totalApproved: insuranceClaims.reduce((sum, c) => sum + c.approvedAmount, 0),
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const newClaim = {
    id: `CLM-2024-${String(insuranceClaims.length + 1).padStart(3, "0")}`,
    patient: body.patient,
    provider: body.provider,
    policyNumber: body.policyNumber,
    claimAmount: body.claimAmount,
    approvedAmount: 0,
    status: "pending",
    dateSubmitted: new Date().toISOString().split("T")[0],
    dateProcessed: "",
    service: body.service,
    diagnosis: body.diagnosis,
  };

  insuranceClaims.push(newClaim);

  return NextResponse.json(newClaim, { status: 201 });
}
