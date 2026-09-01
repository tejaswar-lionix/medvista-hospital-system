import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const doctors = {
  "dr-smith": {
    name: "Dr. Sarah Smith",
    specialty: "Interventional Cardiology",
    department: "Cardiology",
    image: "/images/doctors/sarah-smith.jpg",
    availability: "available",
    rating: 4.9,
    reviewCount: 127,
    experience: "15 years",
    consultationFee: 150,
    education: [
      "MD - Harvard Medical School",
      "Residency - Massachusetts General Hospital",
      "Fellowship - Cleveland Clinic",
    ],
    about:
      "Dr. Sarah Smith is a board-certified cardiologist specializing in interventional cardiology. She has performed over 5,000 cardiac catheterizations and is known for her expertise in complex coronary interventions. Dr. Smith is committed to providing personalized care and staying at the forefront of cardiovascular medicine.",
    languages: ["English", "Spanish"],
    schedule: [
      { day: "Monday", time: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", time: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", time: "9:00 AM - 12:00 PM" },
      { day: "Thursday", time: "9:00 AM - 5:00 PM" },
      { day: "Friday", time: "9:00 AM - 3:00 PM" },
    ],
    reviews: [
      {
        id: 1,
        patient: "John D.",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Dr. Smith was incredibly thorough and took the time to explain everything. I felt very comfortable and confident in her care.",
      },
      {
        id: 2,
        patient: "Mary L.",
        rating: 5,
        date: "1 month ago",
        comment:
          "Excellent cardiologist! She caught an issue that my previous doctor missed. Highly recommend.",
      },
      {
        id: 3,
        patient: "Robert K.",
        rating: 4,
        date: "2 months ago",
        comment:
          "Very professional and knowledgeable. The wait time was a bit long, but the quality of care made up for it.",
      },
    ],
  },
  "dr-patel": {
    name: "Dr. Raj Patel",
    specialty: "Electrophysiology",
    department: "Cardiology",
    image: "/images/doctors/raj-patel.jpg",
    availability: "busy",
    rating: 4.8,
    reviewCount: 98,
    experience: "12 years",
    consultationFee: 140,
    education: [
      "MD - Johns Hopkins University",
      "Residency - Mayo Clinic",
      "Fellowship - Duke University Medical Center",
    ],
    about:
      "Dr. Raj Patel is a cardiac electrophysiologist specializing in the diagnosis and treatment of heart rhythm disorders. He is an expert in catheter ablation, pacemaker implantation, and cardiac device management. Dr. Patel has published numerous research papers on arrhythmia treatment.",
    languages: ["English", "Hindi", "Gujarati"],
    schedule: [
      { day: "Monday", time: "8:00 AM - 4:00 PM" },
      { day: "Wednesday", time: "8:00 AM - 4:00 PM" },
      { day: "Friday", time: "8:00 AM - 12:00 PM" },
    ],
    reviews: [
      {
        id: 1,
        patient: "Patricia M.",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "Dr. Patel performed my ablation procedure and it went smoothly. His team was excellent.",
      },
      {
        id: 2,
        patient: "Michael T.",
        rating: 5,
        date: "2 months ago",
        comment:
          "Very skilled electrophysiologist. He explained my condition clearly and the treatment options.",
      },
    ],
  },
  "dr-chen": {
    name: "Dr. Emily Chen",
    specialty: "Neuro-oncology",
    department: "Neurology",
    image: "/images/doctors/emily-chen.jpg",
    availability: "available",
    rating: 4.7,
    reviewCount: 76,
    experience: "10 years",
    consultationFee: 130,
    education: [
      "MD - Stanford University",
      "Residency - UCSF Medical Center",
      "Fellowship - Memorial Sloan Kettering Cancer Center",
    ],
    about:
      "Dr. Emily Chen is a neuro-oncologist who specializes in the treatment of brain tumors and neurological cancers. She combines the latest research with compassionate care to develop individualized treatment plans for her patients. Dr. Chen is actively involved in clinical trials for novel cancer therapies.",
    languages: ["English", "Mandarin"],
    schedule: [
      { day: "Monday", time: "10:00 AM - 6:00 PM" },
      { day: "Tuesday", time: "10:00 AM - 6:00 PM" },
      { day: "Thursday", time: "10:00 AM - 6:00 PM" },
    ],
    reviews: [
      {
        id: 1,
        patient: "Sandra W.",
        rating: 5,
        date: "1 month ago",
        comment:
          "Dr. Chen is not only brilliant but also incredibly empathetic. She guided our family through a difficult time.",
      },
    ],
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return Object.keys(doctors).map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const doctor = doctors[id as keyof typeof doctors];

  if (!doctor) {
    return { title: "Doctor Not Found" };
  }

  return {
    title: `${doctor.name} | City General Hospital`,
    description: `Book an appointment with ${doctor.name}, ${doctor.specialty} specialist.`,
  };
}

export default async function DoctorProfilePage({ params }: PageProps) {
  const { id } = await params;
  const doctor = doctors[id as keyof typeof doctors];

  if (!doctor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Doctor Image */}
            <div className="md:w-1/3">
              <div className="relative h-80 w-full rounded-lg overflow-hidden">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Doctor Info */}
            <div className="md:w-2/3">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {doctor.name}
                  </h1>
                  <p className="text-xl text-blue-600 font-medium mb-2">
                    {doctor.specialty}
                  </p>
                  <p className="text-gray-600">{doctor.department}</p>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
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
                    <span className="text-lg text-gray-600 ml-2">
                      {doctor.rating} ({doctor.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {doctor.experience}
                  </p>
                  <p className="text-sm text-gray-600">Experience</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    ${doctor.consultationFee}
                  </p>
                  <p className="text-sm text-gray-600">Consultation</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">
                    {doctor.rating}
                  </p>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">
                    {doctor.languages.length}
                  </p>
                  <p className="text-sm text-gray-600">Languages</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href={`/appointments/book?doctor=${id}`}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Book Appointment
                </Link>
                <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  Call to Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{doctor.about}</p>
            </section>

            {/* Education */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Education & Qualifications
              </h2>
              <ul className="space-y-3">
                {doctor.education.map((edu, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-blue-600 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    {edu}
                  </li>
                ))}
              </ul>
            </section>

            {/* Reviews */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Patient Reviews
              </h2>
              <div className="space-y-6">
                {doctor.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-100 pb-6 last:border-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-medium">
                            {review.patient.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {review.patient}
                          </p>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Availability Schedule */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Availability Schedule
              </h3>
              <div className="space-y-3">
                {doctor.schedule.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="font-medium text-gray-700">
                      {item.day}
                    </span>
                    <span className="text-gray-600">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Languages Spoken
              </h3>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((lang, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-blue-600 text-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href={`/appointments/book?doctor=${id}`}
                  className="block w-full bg-white text-blue-600 text-center py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Book Appointment
                </Link>
                <button className="block w-full border border-white text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Download Profile
                </button>
              </div>
            </div>

            {/* Back to Doctors */}
            <Link
              href="/doctors"
              className="block text-center text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to All Doctors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}