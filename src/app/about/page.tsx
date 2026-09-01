import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | City General Hospital",
  description:
    "Learn about our hospital's mission, values, and the team of dedicated healthcare professionals committed to providing exceptional care.",
};

const stats = [
  { number: "25+", label: "Years of Service" },
  { number: "500+", label: "Healthcare Professionals" },
  { number: "50,000+", label: "Patients Treated Annually" },
  { number: "98%", label: "Patient Satisfaction" },
];

const values = [
  {
    title: "Compassion",
    description:
      "We treat every patient with empathy, dignity, and respect, understanding that healthcare is deeply personal.",
    icon: "❤️",
  },
  {
    title: "Excellence",
    description:
      "We strive for the highest standards in medical care, continuously improving our services and outcomes.",
    icon: "⭐",
  },
  {
    title: "Integrity",
    description:
      "We conduct ourselves with honesty and transparency, building trust with patients and colleagues alike.",
    icon: "🤝",
  },
  {
    title: "Innovation",
    description:
      "We embrace new technologies and approaches to deliver cutting-edge healthcare solutions.",
    icon: "💡",
  },
  {
    title: "Teamwork",
    description:
      "We collaborate across disciplines to provide comprehensive, coordinated care for every patient.",
    icon: "👥",
  },
  {
    title: "Accessibility",
    description:
      "We are committed to making quality healthcare accessible to all members of our community.",
    icon: "🌍",
  },
];

const milestones = [
  {
    year: "1998",
    title: "Hospital Founded",
    description:
      "City General Hospital opened its doors with 50 beds and a commitment to community healthcare.",
  },
  {
    year: "2005",
    title: "Expansion Complete",
    description:
      "Added new wing with state-of-the-art surgical suites and ICU facilities.",
  },
  {
    year: "2010",
    title: "Cancer Center Opens",
    description:
      "Launched comprehensive oncology center with radiation therapy and chemotherapy services.",
  },
  {
    year: "2015",
    title: "Research Institute",
    description:
      "Established the hospital research institute to advance medical knowledge and clinical trials.",
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description:
      "Implemented electronic health records and telemedicine services for improved patient care.",
  },
  {
    year: "2023",
    title: "New Children's Hospital",
    description:
      "Opened dedicated pediatric facility with specialized services for children and families.",
  },
];

const team = [
  {
    name: "Dr. James Wilson",
    role: "Chief Executive Officer",
    image: "/images/team/james-wilson.jpg",
    bio: "20+ years of healthcare leadership experience.",
  },
  {
    name: "Dr. Maria Santos",
    role: "Chief Medical Officer",
    image: "/images/team/maria-santos.jpg",
    bio: "Board-certified internist with a passion for patient safety.",
  },
  {
    name: "Robert Chen",
    role: "Chief Financial Officer",
    image: "/images/team/robert-chen.jpg",
    bio: "Expert in healthcare finance and operations management.",
  },
  {
    name: "Dr. Aisha Patel",
    role: "Director of Nursing",
    image: "/images/team/aisha-patel.jpg",
    bio: "Dedicated nurse leader committed to excellence in patient care.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About City General Hospital
            </h1>
            <p className="text-xl text-blue-100">
              For over 25 years, we have been providing compassionate,
              high-quality healthcare to our community. Our mission is to improve
              the health and well-being of those we serve.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To provide exceptional healthcare services with compassion,
                dignity, and respect. We are committed to improving the health of
                our community through innovative medical practices, preventive
                care, and health education.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We strive to be the healthcare provider of choice by delivering
                safe, effective, patient-centered, timely, efficient, and
                equitable care to all.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To be the leading healthcare institution in the region, recognized
                for clinical excellence, innovative treatments, and outstanding
                patient experience. We envision a community where everyone has
                access to the highest quality healthcare.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Through continuous improvement, research, and collaboration, we
                aim to set new standards in healthcare delivery and outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </p>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-1/2 px-8">
                    <div
                      className={`bg-white rounded-lg shadow-md p-6 ${
                        index % 2 === 0 ? "ml-auto" : "mr-auto"
                      } max-w-md`}
                    >
                      <span className="text-blue-600 font-bold text-lg">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-bold text-gray-800 mt-2 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience Healthcare excellence?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you need routine care or specialized treatment, our team is
            here to help. Schedule your appointment today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/appointments/book"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Book Appointment
            </a>
            <a
              href="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}