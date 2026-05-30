import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { HiSearch, HiShieldCheck, HiClock, HiDocumentText, HiChartBar, HiUserGroup } from 'react-icons/hi';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Image */}
      <section className="relative bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
            {/* Left Content */}
            <div className="text-left">
              <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
                Official Results Portal
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Bhagwan Parshuram<br />
                Institute of Technology
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Access your academic results securely and instantly. A comprehensive platform for students, 
                faculty, and administrators to manage examination results efficiently.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/results"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <HiSearch className="mr-2" />
                  Check Results
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors border-2 border-gray-200"
                >
                  Student Login
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop"
                  alt="Students studying"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <HiUserGroup className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">500+</p>
                    <p className="text-sm text-gray-600">Active Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Portal</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A modern, secure, and efficient platform designed for seamless result management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 h-full border border-blue-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <HiSearch className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Search</h3>
                <p className="text-gray-600 text-sm">
                  Quick result retrieval using enrollment number with real-time data access
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-6 h-full border border-emerald-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <HiShieldCheck className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Platform</h3>
                <p className="text-gray-600 text-sm">
                  Industry-standard encryption and authentication to protect your data
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-6 h-full border border-amber-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <HiClock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Availability</h3>
                <p className="text-gray-600 text-sm">
                  Access your results anytime, anywhere with our always-on platform
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-6 h-full border border-purple-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <HiDocumentText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Reports</h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive semester-wise results with subject breakdowns
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Image */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop"
                  alt="University campus"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Trusted by the BPIT Community
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our portal serves thousands of students and faculty members, providing reliable and 
                accurate result management services.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-3 mb-2">
                    <HiUserGroup className="h-6 w-6 text-blue-600" />
                    <p className="text-3xl font-bold text-gray-900">500+</p>
                  </div>
                  <p className="text-gray-600">Students</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-3 mb-2">
                    <HiChartBar className="h-6 w-6 text-emerald-600" />
                    <p className="text-3xl font-bold text-gray-900">150+</p>
                  </div>
                  <p className="text-gray-600">Faculty</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-3 mb-2">
                    <HiDocumentText className="h-6 w-6 text-amber-600" />
                    <p className="text-3xl font-bold text-gray-900">10K+</p>
                  </div>
                  <p className="text-gray-600">Results Published</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-3 mb-2">
                    <HiShieldCheck className="h-6 w-6 text-purple-600" />
                    <p className="text-3xl font-bold text-gray-900">100%</p>
                  </div>
                  <p className="text-gray-600">Secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Check Your Results?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Enter your enrollment number to access your academic results instantly
          </p>
          <Link
            to="/results"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <HiSearch className="mr-2 h-5 w-5" />
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="text-white font-bold text-lg mb-4">BPIT Results Portal</h3>
              <p className="text-sm text-gray-400 mb-4">
                Official results management system of Bhagwan Parshuram Institute of Technology, 
                providing secure and instant access to academic results.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/results" className="hover:text-white transition-colors">Check Results</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>PSP Area, Sector 17</li>
                <li>Rohini, New Delhi - 110089</li>
                <li>info@bpit.ac.in</li>
                <li>+91-11-27555121</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Bhagwan Parshuram Institute of Technology. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
