"use client";

import { useState } from "react";

interface Feedback {
  id: string;
  patientName: string;
  doctorName: string;
  department: string;
  rating: number;
  comment: string;
  date: string;
  appointmentId: string;
  categories: {
    punctuality: number;
    communication: number;
    cleanliness: number;
    overall: number;
  };
}

const feedbackData: Feedback[] = [
  {
    id: "FB-001",
    patientName: "Sarah Johnson",
    doctorName: "Dr. Michael Chen",
    department: "Cardiology",
    rating: 5,
    comment: "Excellent care and very thorough explanation of my condition. Dr. Chen took time to answer all my questions.",
    date: "2024-01-12",
    appointmentId: "APT-001",
    categories: { punctuality: 5, communication: 5, cleanliness: 4, overall: 5 },
  },
  {
    id: "FB-002",
    patientName: "James Wilson",
    doctorName: "Dr. Emily Rodriguez",
    department: "Neurology",
    rating: 4,
    comment: "Very professional and knowledgeable. Wait time was a bit long but the consultation was thorough.",
    date: "2024-01-10",
    appointmentId: "APT-002",
    categories: { punctuality: 3, communication: 5, cleanliness: 5, overall: 4 },
  },
  {
    id: "FB-003",
    patientName: "Maria Garcia",
    doctorName: "Dr. David Kim",
    department: "Orthopedics",
    rating: 5,
    comment: "Dr. Kim explained my surgery options clearly and made me feel comfortable. Highly recommend!",
    date: "2024-01-08",
    appointmentId: "APT-003",
    categories: { punctuality: 5, communication: 5, cleanliness: 5, overall: 5 },
  },
  {
    id: "FB-004",
    patientName: "Robert Brown",
    doctorName: "Dr. Sarah Thompson",
    department: "Pediatrics",
    rating: 5,
    comment: "My kids love Dr. Thompson! She is so patient and kind with children. The pediatric ward is very child-friendly.",
    date: "2024-01-06",
    appointmentId: "APT-004",
    categories: { punctuality: 4, communication: 5, cleanliness: 5, overall: 5 },
  },
  {
    id: "FB-005",
    patientName: "Jennifer Lee",
    doctorName: "Dr. Michael Chen",
    department: "Cardiology",
    rating: 3,
    comment: "Good medical care but the billing process was confusing. Had to follow up multiple times.",
    date: "2024-01-04",
    appointmentId: "APT-005",
    categories: { punctuality: 4, communication: 3, cleanliness: 4, overall: 3 },
  },
  {
    id: "FB-006",
    patientName: "David Martinez",
    doctorName: "Dr. James Park",
    department: "Emergency Medicine",
    rating: 4,
    comment: "Quick response in emergency. Dr. Park was calm and professional during a stressful situation.",
    date: "2024-01-02",
    appointmentId: "APT-006",
    categories: { punctuality: 5, communication: 4, cleanliness: 3, overall: 4 },
  },
];

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback[]>(feedbackData);
  const [filterDoctor, setFilterDoctor] = useState("all");
  const [filterRating, setFilterRating] = useState("all");

  const doctors = [...new Set(feedback.map((f) => f.doctorName))];

  const filteredFeedback = feedback.filter((f) => {
    const matchesDoctor = filterDoctor === "all" || f.doctorName === filterDoctor;
    const matchesRating =
      filterRating === "all" || f.rating === parseInt(filterRating);
    return matchesDoctor && matchesRating;
  });

  const averageRating =
    feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length;

  const avgCategories = {
    punctuality:
      feedback.reduce((sum, f) => sum + f.categories.punctuality, 0) /
      feedback.length,
    communication:
      feedback.reduce((sum, f) => sum + f.categories.communication, 0) /
      feedback.length,
    cleanliness:
      feedback.reduce((sum, f) => sum + f.categories.cleanliness, 0) /
      feedback.length,
    overall:
      feedback.reduce((sum, f) => sum + f.categories.overall, 0) /
      feedback.length,
  };

  const doctorRatings = doctors.map((doc) => {
    const docFeedback = feedback.filter((f) => f.doctorName === doc);
    return {
      name: doc,
      avgRating:
        docFeedback.reduce((sum, f) => sum + f.rating, 0) / docFeedback.length,
      count: docFeedback.length,
    };
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patient Feedback</h1>
          <p className="text-sm text-gray-500 mt-1">
            View and analyze patient satisfaction feedback
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Overall Rating</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
            </p>
            <span className="text-yellow-400">★</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Based on {feedback.length} reviews
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Punctuality</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {avgCategories.punctuality.toFixed(1)}
          </p>
          <div className="mt-1 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{ width: `${(avgCategories.punctuality / 5) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Communication</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {avgCategories.communication.toFixed(1)}
          </p>
          <div className="mt-1 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-green-500 rounded-full"
              style={{
                width: `${(avgCategories.communication / 5) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Cleanliness</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">
            {avgCategories.cleanliness.toFixed(1)}
          </p>
          <div className="mt-1 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-purple-500 rounded-full"
              style={{
                width: `${(avgCategories.cleanliness / 5) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Overall Score</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">
            {avgCategories.overall.toFixed(1)}
          </p>
          <div className="mt-1 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-amber-500 rounded-full"
              style={{ width: `${(avgCategories.overall / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={filterDoctor}
                onChange={(e) => setFilterDoctor(e.target.value)}
                className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Doctors</option>
                {doctors.map((doc) => (
                  <option key={doc} value={doc}>
                    {doc}
                  </option>
                ))}
              </select>
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredFeedback.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {renderStars(item.rating)}
                      <span className="text-sm font-medium text-gray-900">
                        {item.rating}.0
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {item.patientName} • {item.doctorName} •{" "}
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-gray-400">
                    {item.id}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-3">{item.comment}</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(item.categories).map(([key, value]) => (
                    <span
                      key={key}
                      className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}: {value}/5
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Doctor Ratings
            </h2>
            <div className="space-y-4">
              {doctorRatings
                .sort((a, b) => b.avgRating - a.avgRating)
                .map((doc) => (
                  <div
                    key={doc.name}
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900">
                        {doc.name}
                      </p>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {doc.avgRating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Based on {doc.count} reviews
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Rating Distribution
            </h2>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = feedback.filter((f) => f.rating === star).length;
                const percentage = (count / feedback.length) * 100;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-8">
                      {star} ★
                    </span>
                    <div className="flex-1 h-3 bg-gray-200 rounded-full">
                      <div
                        className="h-3 bg-yellow-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-8 text-right">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
