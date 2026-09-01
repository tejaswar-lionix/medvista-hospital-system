import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Services | City General Hospital",
  description:
    "Explore our comprehensive healthcare services including emergency care, laboratory, pharmacy, and specialized medical departments.",
};

const services = [
  {
    id: "emergency",
    title: "Emergency Services",
    description:
      "24/7 emergency care with state-of-the-art facilities and experienced emergency physicians. Our emergency department is equipped to handle all types of medical emergencies.",
    icon: "🚑",
    features: [
      "24/7 Emergency Care",
      "Trauma Center",
      "Fast Track Services",
      "Critical Care Transport",
    ],
    link: "/services/emergency",
  },
  {
    id: "laboratory",
    title: "Laboratory Services",
    description:
      "Comprehensive diagnostic laboratory services with quick turnaround times. Our lab is accredited and uses the latest technology for accurate results.",
    icon: "🔬",
    features: [
      "Blood Testing",
      "Pathology",
      "Microbiology",
      "Genetic Testing",
    ],
    link: "/services/laboratory",
  },
  {
    id: "pharmacy",
    title: "Pharmacy",
    description:
      "Full-service pharmacy with a wide range of medications and pharmaceutical care services. Our pharmacists provide medication counseling and management.",
    icon: "💊",
    features: [
      "Inpatient Pharmacy",
      "Outpatient Pharmacy",
      "Medication Therapy Management",
      "Compounding Services",
    ],
    link: "/services/pharmacy",
  },
  {
    id: "ambulance",
    title: "Ambulance Services",
    description:
      "Professional ambulance services for safe and comfortable patient transport. Our fleet is equipped with advanced life support systems.",
    icon: "🚑",
    features: [
      "Advanced Life Support",
      "Basic Life Support",
      "Inter-facility Transfers",
      "Event Medical Coverage",
    ],
    link: "/services/ambulance",
  },
  {
    id: "radiology",
    title: "Radiology & Imaging",
    description:
      "Advanced imaging services including MRI, CT scan, X-ray, and ultrasound. Our radiologists provide accurate diagnoses using cutting-edge technology.",
    icon: "📸",
    features: [
      "MRI",
      "CT Scan",
      "X-Ray",
      "Ultrasound",
      "Mammography",
    ],
    link: "/services/radiology",
  },
  {
    id: "rehabilitation",
    title: "Rehabilitation Services",
    description:
      "Comprehensive rehabilitation programs including physical therapy, occupational therapy, and speech therapy to help patients recover and regain independence.",
    icon: "🏥",
    features: [
      "Physical Therapy",
      "Occupational Therapy",
      "Speech Therapy",
      "Cardiac Rehabilitation",
    ],
    link: "/services/rehabilitation",
  },
];

const specialServices = [
  {
    title: "Telemedicine",
    description:
      "Connect with our doctors from the comfort of your home through our secure telemedicine platform.",
    icon: "💻",
  },
  {
    title: "Home Healthcare",
    description:
      "Professional medical care delivered to your home for patients who need ongoing treatment.",
    icon: "🏠",
  },
  {
    title: "Health Screenings",
    description:
      "Preventive health screening packages to help detect potential health issues early.",
    icon: "🩺",
  },
  {
    title: "International Patients",
    description:
      "Dedicated services for international patients including visa assistance and translation services.",
    icon: "🌍",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We offer a comprehensive range of healthcare services designed to
            meet all your medical needs under one roof.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="bg-blue-50 p-6 text-center">
                <span className="text-5xl">{service.icon}</span>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
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
                <Link
                  href={service.link}
                  className="text-blue-600 font-medium hover:text-blue-700 flex items-center"
                >
                  Learn More
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
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Services */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Additional Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <span className="text-4xl mb-4 block">{service.icon}</span>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-red-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Emergency? Call Now</h2>
          <p className="text-xl text-red-100 mb-6">
            Our emergency department is open 24/7 to provide immediate care.
          </p>
          <a
            href="tel:5551234568"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-xl hover:bg-red-50 transition-colors"
          >
            (555) 123-4568
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Need Help Choosing a Service?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our patient navigation team can help you find the right service for
            your needs. Contact us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/appointments/book"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}