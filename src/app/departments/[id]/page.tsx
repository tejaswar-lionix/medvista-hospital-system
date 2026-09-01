import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const departments = {
  cardiology: {
    name: "Cardiology",
    description:
      "Our cardiology department provides comprehensive heart care including diagnostics, treatment, and preventive cardiology services. We specialize in interventional cardiology, electrophysiology, and cardiac rehabilitation.",
    image: "/images/departments/cardiology.jpg",
    features: [
      "24/7 Emergency Cardiac Care",
      "Advanced Cardiac Imaging",
      "Minimally Invasive Procedures",
      "Cardiac Rehabilitation Programs",
      "Preventive Cardiology Screenings",
    ],
    doctors: [
      {
        id: "dr-smith",
        name: "Dr. Sarah Smith",
        specialty: "Interventional Cardiology",
        image: "/images/doctors/sarah-smith.jpg",
        experience: "15 years",
      },
      {
        id: "dr-patel",
        name: "Dr. Raj Patel",
        specialty: "Electrophysiology",
        image: "/images/doctors/raj-patel.jpg",
        experience: "12 years",
      },
      {
        id: "dr-johnson",
        name: "Dr. Michael Johnson",
        specialty: "Cardiac Surgery",
        image: "/images/doctors/michael-johnson.jpg",
        experience: "18 years",
      },
    ],
  },
  neurology: {
    name: "Neurology",
    description:
      "Our neurology department specializes in disorders of the nervous system, brain, and spinal cord. We offer advanced diagnostics and treatments for neurological conditions.",
    image: "/images/departments/neurology.jpg",
    features: [
      "Advanced Neuroimaging",
      "Stroke Treatment Center",
      "Epilepsy Monitoring",
      "Movement Disorder Clinic",
      "Neuro-oncology Services",
    ],
    doctors: [
      {
        id: "dr-chen",
        name: "Dr. Emily Chen",
        specialty: "Neuro-oncology",
        image: "/images/doctors/emily-chen.jpg",
        experience: "10 years",
      },
      {
        id: "dr-kumar",
        name: "Dr. Amit Kumar",
        specialty: "Stroke Neurology",
        image: "/images/doctors/amit-kumar.jpg",
        experience: "14 years",
      },
    ],
  },
  orthopedics: {
    name: "Orthopedics",
    description:
      "Expert treatment for musculoskeletal conditions, fractures, and joint replacement. Our orthopedic surgeons use the latest techniques for faster recovery.",
    image: "/images/departments/orthopedics.jpg",
    features: [
      "Joint Replacement Surgery",
      "Sports Medicine",
      "Spine Surgery",
      "Fracture Care",
      "Physical Rehabilitation",
    ],
    doctors: [
      {
        id: "dr-williams",
        name: "Dr. David Williams",
        specialty: "Joint Replacement",
        image: "/images/doctors/david-williams.jpg",
        experience: "20 years",
      },
      {
        id: "dr-garcia",
        name: "Dr. Maria Garcia",
        specialty: "Sports Medicine",
        image: "/images/doctors/maria-garcia.jpg",
        experience: "8 years",
      },
    ],
  },
  pediatrics: {
    name: "Pediatrics",
    description:
      "Dedicated healthcare for infants, children, and adolescents. Our pediatricians provide compassionate care in a child-friendly environment.",
    image: "/images/departments/pediatrics.jpg",
    features: [
      "Well-child Visits",
      "Immunizations",
      "Developmental Assessments",
      "Pediatric Emergencies",
      "Adolescent Medicine",
    ],
    doctors: [
      {
        id: "dr-thompson",
        name: "Dr. Lisa Thompson",
        specialty: "Pediatric Medicine",
        image: "/images/doctors/lisa-thompson.jpg",
        experience: "11 years",
      },
      {
        id: "dr-lee",
        name: "Dr. James Lee",
        specialty: "Neonatology",
        image: "/images/doctors/james-lee.jpg",
        experience: "9 years",
      },
    ],
  },
  oncology: {
    name: "Oncology",
    description:
      "Advanced cancer treatment and care with a multidisciplinary approach. We offer chemotherapy, radiation therapy, and surgical oncology services.",
    image: "/images/departments/oncology.jpg",
    features: [
      "Chemotherapy Infusion Center",
      "Radiation Therapy",
      "Clinical Trials",
      "Palliative Care",
      "Cancer Support Groups",
    ],
    doctors: [
      {
        id: "dr-brown",
        name: "Dr. Robert Brown",
        specialty: "Medical Oncology",
        image: "/images/doctors/robert-brown.jpg",
        experience: "16 years",
      },
      {
        id: "dr-taylor",
        name: "Dr. Jennifer Taylor",
        specialty: "Radiation Oncology",
        image: "/images/doctors/jennifer-taylor.jpg",
        experience: "13 years",
      },
    ],
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return Object.keys(departments).map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const department = departments[id as keyof typeof departments];

  if (!department) {
    return { title: "Department Not Found" };
  }

  return {
    title: `${department.name} | City General Hospital`,
    description: department.description,
  };
}

export default async function DepartmentDetailPage({ params }: PageProps) {
  const { id } = await params;
  const department = departments[id as keyof typeof departments];

  if (!department) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-80">
        <Image
          src={department.image}
          alt={department.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-4">
              {department.name}
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              {department.description}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Department Features
              </h2>
              <ul className="space-y-3">
                {department.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            {/* Doctors */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Our Specialists
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {department.doctors.map((doctor) => (
                  <Link
                    key={doctor.id}
                    href={`/doctors/${doctor.id}`}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                  >
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                      <p className="text-xs text-gray-500">
                        {doctor.experience} experience
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Book Appointment */}
            <div className="bg-blue-600 text-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Book an Appointment</h3>
              <p className="text-blue-100 mb-6">
                Schedule a consultation with one of our specialists today.
              </p>
              <Link
                href={`/appointments/book?department=${id}`}
                className="block w-full bg-white text-blue-600 text-center py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Book Appointment
              </Link>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Department Contact
              </h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>(555) 123-4567 ext 101</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Mon-Fri: 8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Building B, 2nd Floor</span>
                </div>
              </div>
            </div>

            {/* Back to Departments */}
            <Link
              href="/departments"
              className="block text-center text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to All Departments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}