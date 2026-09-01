import { NextResponse } from "next/server";

let labTests = [
  {
    id: 1,
    patient: "Robert Johnson",
    test: "Complete Blood Count",
    category: "Hematology",
    status: "completed",
    date: "2024-01-18",
    results: "All values within normal range",
    orderedBy: "Dr. Sarah Mitchell",
    technician: "Lab Tech Smith",
  },
  {
    id: 2,
    patient: "Maria Garcia",
    test: "Lipid Panel",
    category: "Chemistry",
    status: "in-progress",
    date: "2024-01-19",
    results: "",
    orderedBy: "Dr. James Wilson",
    technician: "Lab Tech Johnson",
  },
  {
    id: 3,
    patient: "David Lee",
    test: "Urinalysis",
    category: "Urinalysis",
    status: "completed",
    date: "2024-01-17",
    results: "Normal. No infection detected.",
    orderedBy: "Dr. Emily Chen",
    technician: "Lab Tech Davis",
  },
  {
    id: 4,
    patient: "Jennifer White",
    test: "Thyroid Function Test",
    category: "Endocrinology",
    status: "pending",
    date: "2024-01-20",
    results: "",
    orderedBy: "Dr. Lisa Anderson",
    technician: "",
  },
];

export async function GET() {
  return NextResponse.json(labTests);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newTest = {
    id: labTests.length + 1,
    patient: body.patient,
    test: body.test,
    category: body.category,
    status: "pending",
    date: body.date || new Date().toISOString().split("T")[0],
    results: "",
    orderedBy: body.orderedBy,
    technician: "",
  };

  labTests.push(newTest);

  return NextResponse.json(newTest, { status: 201 });
}
