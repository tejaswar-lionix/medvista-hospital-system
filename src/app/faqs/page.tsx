"use client";

import { useState } from "react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface FAQCategory {
  name: string;
  icon: string;
  questions: FAQ[];
}

const faqData: FAQCategory[] = [
  {
    name: "General",
    icon: "🏥",
    questions: [
      {
        id: 1,
        question: "What are your hospital visiting hours?",
        answer:
          "Our general visiting hours are from 8:00 AM to 8:00 PM daily. However, we understand that family support is important for recovery, so we offer flexible visiting arrangements. Please check with the nursing station for specific ward policies, as some units may have different hours.",
      },
      {
        id: 2,
        question: "Do I need a referral to see a specialist?",
        answer:
          "While referrals are recommended for insurance purposes, you can schedule appointments directly with many of our specialists. We recommend checking with your insurance provider about their referral requirements before scheduling your appointment.",
      },
      {
        id: 3,
        question: "What should I bring to my first appointment?",
        answer:
          "Please bring a valid photo ID, your insurance card, a list of current medications, any relevant medical records or test results, and a list of questions or concerns you'd like to discuss with your doctor.",
      },
      {
        id: 4,
        question: "Is parking available at the hospital?",
        answer:
          "Yes, we offer both surface lot and garage parking for patients and visitors. The parking garage is located adjacent to the main hospital entrance. Parking is free for the first 2 hours, with validated parking available for patients with extended stays.",
      },
      {
        id: 5,
        question: "Do you offer telemedicine appointments?",
        answer:
          "Yes, we offer telemedicine appointments for many specialties. This allows you to consult with your doctor from the comfort of your home. Ask about telemedicine options when scheduling your appointment.",
      },
    ],
  },
  {
    name: "Appointments",
    icon: "📅",
    questions: [
      {
        id: 6,
        question: "How do I schedule an appointment?",
        answer:
          "You can schedule appointments by calling our central scheduling line at (555) 123-4567, using our online patient portal, or by contacting specific departments directly. For urgent needs, same-day appointments may be available.",
      },
      {
        id: 7,
        question: "How can I cancel or reschedule my appointment?",
        answer:
          "You can cancel or reschedule appointments through the patient portal, by calling our scheduling line, or by contacting the specific department. We kindly request at least 24 hours notice for cancellations so we can offer the time to other patients.",
      },
      {
        id: 8,
        question: "What happens if I'm late for my appointment?",
        answer:
          "We understand that delays can happen. If you're running late, please call ahead to let us know. Depending on how late you are and the provider's schedule, we may be able to accommodate you or help reschedule for the earliest available time.",
      },
      {
        id: 9,
        question: "Do you offer same-day appointments?",
        answer:
          "Yes, we offer same-day appointments for urgent medical needs in our Primary Care and Urgent Care departments. These are subject to availability, so we recommend calling early in the day.",
      },
    ],
  },
  {
    name: "Billing",
    icon: "💳",
    questions: [
      {
        id: 10,
        question: "What payment methods do you accept?",
        answer:
          "We accept cash, checks, and all major credit cards (Visa, MasterCard, American Express, Discover). We also offer payment plans for qualifying patients. Payment is expected at the time of service unless other arrangements have been made.",
      },
      {
        id: 11,
        question: "How do I get a copy of my bill?",
        answer:
          "You can view and print your bills through the patient portal, or request a copy by contacting our billing department at (555) 123-4570. Paper statements are mailed monthly for any outstanding balances.",
      },
      {
        id: 12,
        question: "Do you offer financial assistance?",
        answer:
          "Yes, we have financial assistance programs for qualifying patients based on income and need. Please contact our financial counseling department to learn more about eligibility and how to apply.",
      },
      {
        id: 13,
        question: "What is a facility fee?",
        answer:
          "A facility fee covers the overhead costs of operating the hospital, including building maintenance, utilities, equipment, nursing staff, and support services. This fee is separate from the provider's professional fee.",
      },
    ],
  },
  {
    name: "Insurance",
    icon: "📋",
    questions: [
      {
        id: 14,
        question: "What insurance plans do you accept?",
        answer:
          "We accept most major insurance plans including Medicare, Medicaid, and many private insurers. Please contact our insurance verification department to confirm coverage for your specific plan before your visit.",
      },
      {
        id: 15,
        question: "Do I need pre-authorization for procedures?",
        answer:
          "Many procedures and tests require pre-authorization from your insurance company. Our scheduling team will verify whether pre-authorization is needed and help coordinate this process before your appointment.",
      },
      {
        id: 16,
        question:
          "What should I do if my insurance claim is denied?",
        answer:
          "If your claim is denied, contact our billing department immediately. We can help you understand the reason for denial, gather additional documentation if needed, and guide you through the appeals process.",
      },
      {
        id: 17,
        question: "Will I have out-of-pocket costs?",
        answer:
          "Out-of-pocket costs depend on your specific insurance plan, including deductibles, copayments, and coinsurance. We recommend contacting your insurance provider to understand your benefits before receiving care.",
      },
    ],
  },
];

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  const toggleQuestion = (id: number) => {
    setOpenQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Find answers to common questions about our services, appointments,
            billing, and insurance.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <h2 className="font-bold text-gray-800 mb-4 px-2">
                Categories
              </h2>
              <nav className="space-y-1">
                {faqData.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(index)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${
                      activeCategory === index
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-3">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                <span className="mr-3">
                  {faqData[activeCategory].icon}
                </span>
                {faqData[activeCategory].name} Questions
              </h2>
              <p className="text-gray-600">
                {activeCategory === 0 &&
                  "General information about our hospital and services."}
                {activeCategory === 1 &&
                  "Everything you need to know about scheduling and managing appointments."}
                {activeCategory === 2 &&
                  "Questions about billing, payments, and financial assistance."}
                {activeCategory === 3 &&
                  "Information about insurance coverage and claims."}
              </p>
            </div>

            <div className="space-y-4">
              {faqData[activeCategory].questions.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => toggleQuestion(faq.id)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-800 pr-4">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform ${
                        openQuestions.includes(faq.id) ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openQuestions.includes(faq.id) && (
                    <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Still Have Questions */}
            <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Still Have Questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Can't find the answer you're looking for? Our team is here to
                help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Contact Us
                </a>
                <a
                  href="tel:5551234567"
                  className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Call (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}