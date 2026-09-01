import { NextResponse } from "next/server";

let pharmacyOrders = [
  {
    id: "ORD-2024-001",
    patient: "Robert Johnson",
    items: [
      { name: "Lisinopril 10mg", quantity: 30, price: 10.99 },
      { name: "Metformin 500mg", quantity: 60, price: 11.49 },
    ],
    total: 22.48,
    status: "delivered",
    date: "2024-01-15",
    deliveryDate: "2024-01-17",
    address: "123 Main St, Apt 4B",
  },
  {
    id: "ORD-2024-002",
    patient: "Maria Garcia",
    items: [
      { name: "Aspirin 81mg", quantity: 30, price: 8.99 },
      { name: "Vitamin D3 2000IU", quantity: 60, price: 12.49 },
    ],
    total: 21.48,
    status: "in-transit",
    date: "2024-01-18",
    estimatedDelivery: "2024-01-20",
    address: "456 Oak Ave, Suite 12",
  },
];

const availableMedicines = [
  { id: 1, name: "Aspirin 81mg", price: 8.99, category: "Pain Relief", inStock: true, stock: 500 },
  { id: 2, name: "Vitamin D3 2000IU", price: 12.49, category: "Supplements", inStock: true, stock: 300 },
  { id: 3, name: "Cetirizine 10mg", price: 9.99, category: "Allergy", inStock: true, stock: 200 },
  { id: 4, name: "Omeprazole 20mg", price: 15.99, category: "Digestive", inStock: true, stock: 150 },
  { id: 5, name: "Metformin 500mg", price: 11.49, category: "Diabetes", inStock: true, stock: 400 },
  { id: 6, name: "Lisinopril 10mg", price: 10.99, category: "Blood Pressure", inStock: false, stock: 0 },
];

export async function GET() {
  return NextResponse.json({
    orders: pharmacyOrders,
    medicines: availableMedicines,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const newOrder = {
    id: `ORD-2024-${String(pharmacyOrders.length + 1).padStart(3, "0")}`,
    patient: body.patient,
    items: body.items,
    total: body.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0),
    status: "processing",
    date: new Date().toISOString().split("T")[0],
    estimatedDelivery: body.estimatedDelivery || "",
    address: body.address || "",
  };

  pharmacyOrders.push(newOrder);

  return NextResponse.json(newOrder, { status: 201 });
}
