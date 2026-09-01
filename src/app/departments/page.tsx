"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Department {
  id: string;
  name: string;
  description: string;
  image: string;
  doctorCount: number;
}

const departments: Department[] = [
  {
    id: "cardiology",
    name: "Cardiology",
    description: "Comprehensive heart care including diagnostics, treatment, and preventive cardiology services.",
    image: "/images/departments/cardiology.jpg",
    doctorCount: 8,
  },
  {
    id: "neurology",
    name: "Neurology",
    description: "Specialized care for disorders of the nervous system, brain, and spinal cord.",
    image: "/images/departments/neurology.jpg",
    doctorCount: 6,
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    description: "Expert treatment for musculoskeletal conditions, fractures, and joint replacement.",
    image: "/images/departments/orthopedics.jpg",
    doctorCount: 7,
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    description: "Dedicated healthcare for infants, children, and adolescents.",
    image: "/images/departments/pediatrics.jpg",
    doctorCount: 5,
  },
  {
    id: "oncology",
    name: "Oncology",
    description: "Advanced cancer treatment and care with multidisciplinary approach.",
    image: "/images/departments/oncology.jpg",
    doctorCount: 9,
  },
  {
    id: "dermatology",
    name: "Dermatology",
    description: "Treatment for skin, hair, and nail conditions with cosmetic procedures.",
    image: "/images/departments/dermatology.jpg",
    doctorCount: 4,
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    description: "Complete eye care from routine exams to complex surgical procedures.",
    image: "/images/departments/ophthalmology.jpg",
    doctorCount: 5,
  },
  {
    id: "general-medicine",
    name: "General Medicine",
    description: "Primary care and treatment for a wide range of common health conditions.",
    image: "/images/departments/general-medicine.jpg",
    doctorCount: 12,
  },
];

export default function DepartmentsPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Departments</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We offer a wide range of specialized medical services to meet your
            healthcare needs. Explore our departments below.
          </p>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {departments.map((dept) => (
            <Link
              key={dept.id}
              href={`/departments/${dept.id}`}
              onMouseEnter={() => setHoveredId(dept.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48">
                <Image
                  src={dept.image}
                  alt={dept.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {dept.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {dept.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 text-sm font-medium">
                    {dept.doctorCount} Doctors
                  </span>
                  <span className="text-blue-600 text-sm font-medium flex items-center">
                    View Department
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Need Help Finding the Right Department?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Our patient care coordinators are here to help you find the right
            specialist for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/doctors"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Browse All Doctors
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}