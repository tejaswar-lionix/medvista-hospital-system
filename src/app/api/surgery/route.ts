import { NextResponse } from "next/server";

let surgeries = [
  {
    id: 1,
    patient: "Robert Johnson",
    procedure: "Coronary Artery Bypass",
    type: "Cardiac",
    surgeon: "Dr. Sarah Mitchell",
    date: "2024-01-20",
    time: "08:00",
    duration: "4 hours",
    status: "scheduled",
    room: "OR-1",
    preOpChecklist: ["Blood work complete", "ECG done", "Consent signed", "NPO confirmed"],
    preOpInstructions: "No food or drink after midnight.",
    notes: "",
  },
  {
    id: 2,
    patient: "Maria Garcia",
    procedure: "Knee Replacement",
    type: "Orthopedic",
    surgeon: "Dr. James Wilson",
    date: "2024-01-19",
    time: "10:30",
    duration: "2.5 hours",
    status: "in-progress",
    room: "OR-3",
    preOpChecklist: ["Blood work complete", "X-ray reviewed", "Consent signed", "Antibiotics given"],
    preOpInstructions: "Shower with antiseptic soap.",
    notes: "",
  },
  {
    id: 3,
    patient: "David Lee",
    procedure: "Appendectomy",
    type: "General",
    surgeon: "Dr. Emily Chen",
    date: "2024-01-19",
    time: "14:00",
    duration: "1.5 hours",
    status: "completed",
    room: "OR-2",
    preOpChecklist: ["Blood work complete", "Consent signed", "IV started", "Allergies verified"],
    preOpInstructions: "Nothing by mouth for 8 hours.",
    notes: "Successful procedure. Patient stable.",
  },
];

export async function GET() {
  return NextResponse.json(surgeries);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newSurgery = {
    id: surgeries.length + 1,
    patient: body.patient,
    procedure: body.procedure,
    type: body.type,
    surgeon: body.surgeon,
    date: body.date,
    time: body.time,
    duration: body.duration || "2 hours",
    status: "scheduled",
    room: body.room,
    preOpChecklist: [],
    preOpInstructions: body.instructions || "",
    notes: body.notes || "",
  };

  surgeries.push(newSurgery);

  return NextResponse.json(newSurgery, { status: 201 });
}
