import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <span className="text-9xl font-bold text-blue-600">404</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </Link>
          <Link
            href="/contact"
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Contact Support
          </Link>
        </div>
        <div className="mt-12">
          <p className="text-gray-500 mb-4">Quick Links</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/departments"
              className="text-blue-600 hover:text-blue-700"
            >
              Departments
            </Link>
            <Link
              href="/doctors"
              className="text-blue-600 hover:text-blue-700"
            >
              Our Doctors
            </Link>
            <Link
              href="/services"
              className="text-blue-600 hover:text-blue-700"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-blue-600 hover:text-blue-700"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}