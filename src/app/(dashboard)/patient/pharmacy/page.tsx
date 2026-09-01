"use client";

import { useState } from "react";
import {
  Search,
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Plus,
  Minus,
  Pill,
  AlertCircle,
  CreditCard,
  MapPin,
} from "lucide-react";

const prescriptions = [
  {
    id: 1,
    doctor: "Dr. Sarah Mitchell",
    date: "2024-01-15",
    medications: [
      { name: "Lisinopril 10mg", dosage: "1 tablet daily", quantity: 30, refills: 2 },
      { name: "Metformin 500mg", dosage: "1 tablet twice daily", quantity: 60, refills: 3 },
    ],
    status: "active",
  },
  {
    id: 2,
    doctor: "Dr. Emily Chen",
    date: "2024-01-10",
    medications: [
      { name: "Sumatriptan 50mg", dosage: "As needed for migraine", quantity: 9, refills: 1 },
    ],
    status: "active",
  },
  {
    id: 3,
    doctor: "Dr. James Wilson",
    date: "2023-12-20",
    medications: [
      { name: "Ibuprofen 400mg", dosage: "1 tablet every 6 hours", quantity: 30, refills: 0 },
    ],
    status: "expired",
  },
];

const availableMedicines = [
  { id: 1, name: "Aspirin 81mg", price: 8.99, category: "Pain Relief", inStock: true },
  { id: 2, name: "Vitamin D3 2000IU", price: 12.49, category: "Supplements", inStock: true },
  { id: 3, name: "Cetirizine 10mg", price: 9.99, category: "Allergy", inStock: true },
  { id: 4, name: "Omeprazole 20mg", price: 15.99, category: "Digestive", inStock: true },
  { id: 5, name: "Metformin 500mg", price: 11.49, category: "Diabetes", inStock: true },
  { id: 6, name: "Lisinopril 10mg", price: 10.99, category: "Blood Pressure", inStock: false },
];

const orders = [
  {
    id: "ORD-2024-001",
    items: ["Lisinopril 10mg", "Metformin 500mg"],
    total: 22.48,
    date: "2024-01-15",
    status: "delivered",
    deliveryDate: "2024-01-17",
  },
  {
    id: "ORD-2024-002",
    items: ["Aspirin 81mg", "Vitamin D3 2000IU"],
    total: 21.48,
    date: "2024-01-18",
    status: "in-transit",
    estimatedDelivery: "2024-01-20",
  },
  {
    id: "ORD-2024-003",
    items: ["Cetirizine 10mg"],
    total: 9.99,
    date: "2024-01-19",
    status: "processing",
    estimatedDelivery: "2024-01-22",
  },
];

export default function PharmacyPage() {
  const [activeTab, setActiveTab] = useState("prescriptions");
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMedicines = availableMedicines.filter((med) =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (medicine) => {
    const existing = cart.find((item) => item.id === medicine.id);
    if (existing) {
      setCart(cart.map((item) => (item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const statusIcons = {
    delivered: <CheckCircle className="text-green-500" size={20} />,
    "in-transit": <Truck className="text-blue-500" size={20} />,
    processing: <Clock className="text-amber-500" size={20} />,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pharmacy</h1>
            <p className="text-gray-500 mt-1">Manage prescriptions and order medicines</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <ShoppingCart size={18} />
            Cart ({cart.length})
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          {["prescriptions", "order-medicine", "orders"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </button>
          ))}
        </div>

        {activeTab === "prescriptions" && (
          <div className="space-y-4">
            {prescriptions.map((rx) => (
              <div key={rx.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Prescribed by {rx.doctor}</p>
                    <p className="text-sm text-gray-500">Date: {rx.date}</p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      rx.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {rx.status}
                  </span>
                </div>
                <div className="space-y-3">
                  {rx.medications.map((med, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Pill className="text-blue-500" size={20} />
                        <div>
                          <p className="font-medium text-gray-900">{med.name}</p>
                          <p className="text-sm text-gray-500">{med.dosage}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Qty: {med.quantity}</p>
                        <p className="text-xs text-gray-500">Refills: {med.refills}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {rx.status === "active" && (
                  <button className="mt-4 w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium">
                    Refill Prescription
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "order-medicine" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search medicines..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMedicines.map((med) => (
                  <div key={med.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{med.name}</h3>
                        <p className="text-sm text-gray-500">{med.category}</p>
                        <p className="text-lg font-bold text-blue-600 mt-2">${med.price}</p>
                      </div>
                      {med.inStock ? (
                        <button
                          onClick={() => addToCart(med)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                        >
                          <Plus size={18} />
                        </button>
                      ) : (
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded">Out of Stock</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-fit">
              <h3 className="font-semibold text-gray-900 mb-4">Shopping Cart</h3>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-3 mb-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">${item.price} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between mb-4">
                      <span className="font-medium">Total:</span>
                      <span className="font-bold text-lg">${cartTotal.toFixed(2)}</span>
                    </div>
                    <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2">
                      <CreditCard size={18} />
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    <p className="text-sm text-gray-500">Ordered on {order.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {statusIcons[order.status]}
                    <span className="text-sm font-medium capitalize">{order.status.replace("-", " ")}</span>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Items:</span> {order.items.join(", ")}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</div>
                  {order.status === "in-transit" && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                      <MapPin size={16} />
                      Track Order
                    </button>
                  )}
                  {order.status === "delivered" && (
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
