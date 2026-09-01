"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  image: string;
  availability: "available" | "busy" | "on-leave";
  rating: number;
  experience: string;
  consultationFee: number;
}

const doctors: Doctor[] = [
  {
    id: "dr-smith",
    name: "Dr. Sarah Smith",
    specialty: "Interventional Cardiology",
    department: "Cardiology",
    image: "/images/doctors/sarah-smith.jpg",
    availability: "available",
    rating: 4.9,
    experience: "15 years",
    consultationFee: 150,
  },
  {
    id: "dr-patel",
    name: "Dr. Raj Patel",
    specialty: "Electrophysiology",
    department: "Cardiology",
    image: "/images/doctors/raj-patel.jpg",
    availability: "busy",
    rating: 4.8,
    experience: "12 years",
    consultationFee: 140,
  },
  {
    id: "dr-chen",
    name: "Dr. Emily Chen",
    specialty: "Neuro-oncology",
    department: "Neurology",
    image: "/images/doctors/emily-chen.jpg",
    availability: "available",
    rating: 4.7,
    experience: "10 years",
    consultationFee: 130,
  },
  {
    id: "dr-williams",
    name: "Dr. David Williams",
    specialty: "Joint Replacement",
    department: "Orthopedics",
    image: "/images/doctors/david-williams.jpg",
    availability: "available",
    rating: 4.9,
    experience: "20 years",
    consultationFee: 160,
  },
  {
    id: "dr-thompson",
    name: "Dr. Lisa Thompson",
    specialty: "Pediatric Medicine",
    department: "Pediatrics",
    image: "/images/doctors/lisa-thompson.jpg",
    availability: "on-leave",
    rating: 4.8,
    experience: "11 years",
    consultationFee: 120,
  },
  {
    id: "dr-brown",
    name: "Dr. Robert Brown",
    specialty: "Medical Oncology",
    department: "Oncology",
    image: "/images/doctors/robert-brown.jpg",
    availability: "available",
    rating: 4.6,
    experience: "16 years",
    consultationFee: 170,
  },
  {
    id: "dr-garcia",
    name: "Dr. Maria Garcia",
    specialty: "Sports Medicine",
    department: "Orthopedics",
    image: "/images/doctors/maria-garcia.jpg",
    availability: "available",
    rating: 4.7,
    experience: "8 years",
    consultationFee: 125,
  },
  {
    id: "dr-kumar",
    name: "Dr. Amit Kumar",
    specialty: "Stroke Neurology",
    department: "Neurology",
    image: "/images/doctors/amit-kumar.jpg",
    availability: "busy",
    rating: 4.9,
    experience: "14 years",
    consultationFee: 145,
  },
];

const departments = ["All Departments", "Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Oncology", "Dermatology"];
const availabilityFilters = ["All", "Available", "Busy", "On Leave"];

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedAvailability, setSelectedAvailability] = useState("All");

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment =
        selectedDepartment === "All Departments" || doctor.department === selectedDepartment;
      const matchesAvailability =
        selectedAvailability === "All" ||
        doctor.availability === selectedAvailability.toLowerCase().replace(" ", "-");

      return matchesSearch && matchesDepartment && matchesAvailability;
    });
  }, [searchQuery, selectedDepartment, selectedAvailability]);

  const getAvailabilityBadge = (availability: string) => {
    const styles = {
      available: "bg-green-100 text-green-800",
      busy: "bg-yellow-100 text-yellow-800",
      "on-leave": "bg-red-100 text-red-800",
    };

    const labels = {
      available: "Available",
      busy: "Busy",
      "on-leave": "On Leave",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${styles[availability as keyof typeof styles]}`}
      >
        {labels[availability as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Doctors</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Meet our team of experienced healthcare professionals dedicated to
            providing you with the best care.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Department Filter */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            {/* Availability Filter */}
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {availabilityFilters.map((filter) => (
                <option key={filter} value={filter}>
                  {filter === "All" ? "All Availability" : filter}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? "s" : ""}
        </p>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor) => (
            <Link
              key={doctor.id}
              href={`/doctors/${doctor.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  {getAvailabilityBadge(doctor.availability)}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {doctor.name}
                </h2>
                <p className="text-blue-600 font-medium mb-2">
                  {doctor.specialty}
                </p>
                <p className="text-gray-500 text-sm mb-3">{doctor.department}</p>
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(doctor.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      {doctor.rating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{doctor.experience} experience</span>
                  <span className="font-semibold text-green-600">
                    ${doctor.consultationFee}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No doctors found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}