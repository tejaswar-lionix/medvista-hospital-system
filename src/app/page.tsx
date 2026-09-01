"use client";

import { useState, useEffect, useRef } from "react";

const departments = [
  {
    name: "Cardiology",
    icon: "❤️",
    description: "Comprehensive heart care including diagnostics, treatment, and rehabilitation for all cardiovascular conditions.",
    doctors: 12,
    color: "from-red-500 to-pink-500",
  },
  {
    name: "Neurology",
    icon: "🧠",
    description: "Expert diagnosis and treatment of disorders affecting the brain, spinal cord, and nervous system.",
    doctors: 8,
    color: "from-purple-500 to-indigo-500",
  },
  {
    name: "Orthopedics",
    icon: "🦴",
    description: "Specialized care for musculoskeletal conditions including joints, bones, muscles, and ligaments.",
    doctors: 10,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Pediatrics",
    icon: "👶",
    description: "Dedicated healthcare for infants, children, and adolescents with compassionate and child-friendly approach.",
    doctors: 15,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Oncology",
    icon: "🎗️",
    description: "Advanced cancer treatment and care with multidisciplinary approach to diagnosis and therapy.",
    doctors: 9,
    color: "from-orange-500 to-amber-500",
  },
  {
    name: "Emergency",
    icon: "🚑",
    description: "24/7 emergency medical services with rapid response teams and state-of-the-art critical care facilities.",
    doctors: 20,
    color: "from-rose-500 to-red-500",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    rating: 5,
    text: "The care I received was exceptional. Dr. Smith and the cardiology team saved my life. I cannot thank them enough for their expertise and compassion.",
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Patient's Family",
    rating: 5,
    text: "My mother's treatment at this hospital was outstanding. The staff was attentive, professional, and genuinely caring throughout her entire stay.",
    avatar: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "Patient",
    rating: 4,
    text: "The pediatric department is amazing. My kids actually look forward to their check-ups now! The doctors make everything fun and comfortable.",
    avatar: "ER",
  },
  {
    name: "David Thompson",
    role: "Patient",
    rating: 5,
    text: "After my knee surgery, the orthopedic team provided excellent rehabilitation support. I was back on my feet in no time. Truly world-class care.",
    avatar: "DT",
  },
];

const stats = [
  { label: "Patients Served", value: 50000, suffix: "+" },
  { label: "Expert Doctors", value: 200, suffix: "+" },
  { label: "Departments", value: 30, suffix: "" },
  { label: "Awards Won", value: 45, suffix: "+" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [visible, value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-white">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                H
              </div>
              <span className="text-xl font-bold text-gray-900">HealthCare+</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#departments" className="text-gray-600 hover:text-blue-600 transition">Departments</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition">How It Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition">Testimonials</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition">Contact</a>
              <a href="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                Patient Login
              </a>
            </div>
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t px-4 pb-4 space-y-3">
            <a href="#departments" className="block py-2 text-gray-600">Departments</a>
            <a href="#how-it-works" className="block py-2 text-gray-600">How It Works</a>
            <a href="#testimonials" className="block py-2 text-gray-600">Testimonials</a>
            <a href="#contact" className="block py-2 text-gray-600">Contact</a>
            <a href="/login" className="block bg-blue-600 text-white px-5 py-2 rounded-lg text-center">Patient Login</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-blue-500/20 text-blue-200 px-4 py-1 rounded-full text-sm font-medium mb-6">
                Trusted by 50,000+ Patients
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Your Health Is Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                  Top Priority
                </span>
              </h1>
              <p className="text-lg text-blue-100 mb-8 max-w-lg">
                Experience world-class healthcare with our team of 200+ expert doctors, 
                cutting-edge technology, and compassionate care across 30+ departments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/register"
                  className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition text-center shadow-lg"
                >
                  Book Appointment
                </a>
                <a
                  href="/login"
                  className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition text-center"
                >
                  Patient Portal
                </a>
              </div>
              <div className="mt-10 flex items-center gap-8 text-sm text-blue-200">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  24/7 Emergency
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  Online Consultations
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  Lab Results Online
                </div>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">🏥</div>
                    <div className="text-sm font-medium">Hospital</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">👨‍⚕️</div>
                    <div className="text-sm font-medium">Doctors</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">🔬</div>
                    <div className="text-sm font-medium">Lab Services</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">💊</div>
                    <div className="text-sm font-medium">Pharmacy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-gray-500 mt-2 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section id="departments" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Specialties</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              World-Class Departments
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              From routine check-ups to complex surgeries, our specialized departments provide comprehensive care.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept) => (
              <div
                key={dept.name}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                <div className={`h-2 bg-gradient-to-r ${dept.color}`} />
                <div className="p-8">
                  <div className="text-4xl mb-4">{dept.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {dept.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{dept.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{dept.doctors} Specialists</span>
                    <button className="text-blue-600 font-medium text-sm hover:text-blue-800 transition flex items-center gap-1">
                      Learn More
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              How It Works
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Getting started with HealthCare+ is simple. Follow these three easy steps.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />
            {[
              { step: "01", title: "Create Account", desc: "Sign up in minutes with your basic information. Verify your email and complete your profile to get started.", icon: "📝" },
              { step: "02", title: "Book Appointment", desc: "Choose your department, pick a doctor, select a convenient date and time. Confirm your booking instantly.", icon: "📅" },
              { step: "03", title: "Get Treatment", desc: "Visit the hospital, consult with your doctor, and receive personalized care. Access records online anytime.", icon: "🩺" },
            ].map((item) => (
              <div key={item.step} className="text-center relative">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl text-white mx-auto mb-6 shadow-lg shadow-blue-200 relative z-10">
                  {item.icon}
                </div>
                <div className="text-sm font-bold text-blue-600 mb-2">Step {item.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Patient Stories</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              What Our Patients Say
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`text-lg ${i < t.rating ? "text-yellow-400" : "text-gray-200"}`}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Take Control of Your Health?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust HealthCare+ for their medical needs. Book your first appointment today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg">
              Get Started Free
            </a>
            <a href="tel:+1234567890" className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              Call: (123) 456-7890
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h2>
          <p className="text-gray-500 mb-6">Get health tips, news, and updates delivered to your inbox.</p>
          {subscribed ? (
            <div className="bg-green-50 text-green-700 p-4 rounded-lg border border-green-200">
              Thank you for subscribing! Check your email for confirmation.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  H
                </div>
                <span className="text-xl font-bold text-white">HealthCare+</span>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                Providing world-class healthcare services with compassion and excellence since 1995.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition text-sm">𝕏</a>
                <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition text-sm">f</a>
                <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition text-sm">in</a>
                <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition text-sm">▶</a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Departments</a></li>
                <li><a href="#" className="hover:text-white transition">Our Doctors</a></li>
                <li><a href="#" className="hover:text-white transition">Health Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Patient Services</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition">Book Appointment</a></li>
                <li><a href="#" className="hover:text-white transition">Patient Portal</a></li>
                <li><a href="#" className="hover:text-white transition">Insurance Info</a></li>
                <li><a href="#" className="hover:text-white transition">Medical Records</a></li>
                <li><a href="#" className="hover:text-white transition">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">📍</span>
                  123 Health Street, Medical City, MC 12345
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">📞</span>
                  (123) 456-7890
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✉️</span>
                  info@healthcareplus.com
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">⏰</span>
                  24/7 Emergency Services
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>&copy; 2024 HealthCare+. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">HIPAA Compliance</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
