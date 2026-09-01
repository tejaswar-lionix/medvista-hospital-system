"use client";

import { useState } from "react";

const completedAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Mitchell",
    department: "Cardiology",
    date: "2026-08-28",
    hasFeedback: false,
  },
  {
    id: 2,
    doctor: "Dr. Emily Carter",
    department: "Dermatology",
    date: "2026-08-15",
    hasFeedback: false,
  },
  {
    id: 3,
    doctor: "Dr. Michael Brown",
    department: "Orthopedics",
    date: "2026-07-22",
    hasFeedback: true,
  },
];

const previousFeedbacks = [
  {
    id: 1,
    doctor: "Dr. Michael Brown",
    department: "Orthopedics",
    date: "2026-07-22",
    rating: 5,
    comment: "Excellent doctor. Very thorough examination and clear explanation of the treatment plan.",
    anonymous: false,
  },
  {
    id: 2,
    doctor: "Dr. James Wilson",
    department: "General Medicine",
    date: "2026-06-10",
    rating: 4,
    comment: "Good experience overall. Wait time was a bit long but the consultation was helpful.",
    anonymous: true,
  },
];

export default function FeedbackPage() {
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comment, setComment] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const pendingAppointments = completedAppointments.filter((a) => !a.hasFeedback);

  const handleSubmit = () => {
    if (rating === 0) return;
    alert(`Feedback submitted! Rating: ${rating}/5. Thank you.`);
    setSubmitted(true);
    setSelectedAppointment(null);
    setRating(0);
    setComment("");
    setAnonymous(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Give Feedback</h1>

      {submitted && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-sm text-green-700">
          Your feedback has been submitted. Thank you for helping us improve!
        </div>
      )}

      {pendingAppointments.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Pending Feedback
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Share your experience from recent appointments
          </p>

          <div className="space-y-3">
            {pendingAppointments.map((appt) => (
              <div
                key={appt.id}
                className="bg-white border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-gray-900">{appt.doctor}</p>
                    <p className="text-sm text-gray-500">
                      {appt.department} ·{" "}
                      {new Date(appt.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setSelectedAppointment(
                        selectedAppointment === appt.id ? null : appt.id
                      )
                    }
                    className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                      selectedAppointment === appt.id
                        ? "bg-gray-100 text-gray-600"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {selectedAppointment === appt.id ? "Cancel" : "Write Feedback"}
                  </button>
                </div>

                {selectedAppointment === appt.id && (
                  <div className="border-t border-gray-100 pt-4 mt-2">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rate your experience
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(0)}
                            className={`text-2xl transition-colors ${
                              star <= (hoveredStar || rating)
                                ? "text-amber-400"
                                : "text-gray-200"
                            }`}
                          >
                            ★
                          </button>
                        ))}
                        {rating > 0 && (
                          <span className="text-sm text-gray-500 ml-2 self-center">
                            {rating}/5
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Comments (optional)
                      </label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Tell us about your experience..."
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={anonymous}
                          onChange={(e) => setAnonymous(e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        Submit anonymously
                      </label>
                      <button
                        onClick={handleSubmit}
                        disabled={rating === 0}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Submit Feedback
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Previous Feedback
        </h2>
        <div className="space-y-3">
          {previousFeedbacks.map((fb) => (
            <div
              key={fb.id}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-gray-900">{fb.doctor}</p>
                  <p className="text-sm text-gray-500">
                    {fb.department} ·{" "}
                    {new Date(fb.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-sm ${
                        star <= fb.rating ? "text-amber-400" : "text-gray-200"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              {fb.comment && (
                <p className="text-sm text-gray-600 mt-2">{fb.comment}</p>
              )}
              {fb.anonymous && (
                <p className="text-xs text-gray-400 mt-2">Submitted anonymously</p>
              )}
            </div>
          ))}
          {previousFeedbacks.length === 0 && (
            <p className="text-gray-400 text-sm py-4">No previous feedback</p>
          )}
        </div>
      </section>
    </div>
  );
}
