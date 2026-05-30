import Navbar from '../components/Navbar';
import { HiAcademicCap, HiUsers, HiLightBulb, HiShieldCheck } from 'react-icons/hi';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About BPIT Results Portal
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Official academic results management system for Bhagwan Parshuram Institute of Technology
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            The BPIT Results Portal is designed to provide students, faculty, and administrators with a secure, 
            efficient, and user-friendly platform for managing and accessing academic results. We are committed 
            to maintaining the highest standards of data security and accuracy while ensuring seamless access to 
            academic information.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <HiAcademicCap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Academic Excellence</h3>
            <p className="text-sm text-gray-600">
              Comprehensive result management for all programs and semesters
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <HiShieldCheck className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Data Security</h3>
            <p className="text-sm text-gray-600">
              Industry-standard encryption and secure authentication protocols
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <HiUsers className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">User-Friendly</h3>
            <p className="text-sm text-gray-600">
              Intuitive interface designed for easy navigation and quick access
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <HiLightBulb className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
            <p className="text-sm text-gray-600">
              Continuous improvements based on user feedback and technology
            </p>
          </div>
        </div>

        {/* About BPIT */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About Bhagwan Parshuram Institute of Technology
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              Bhagwan Parshuram Institute of Technology (BPIT) is a premier engineering institution 
              affiliated with Guru Gobind Singh Indraprastha University, Delhi. Established with the 
              vision of providing quality technical education, BPIT has consistently maintained high 
              academic standards and produced skilled professionals.
            </p>
            <p className="mb-4">
              The institute offers undergraduate and postgraduate programs in various engineering 
              disciplines, fostering innovation, research, and holistic development of students.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600 mb-2">500+</p>
                <p className="text-sm text-gray-700">Students</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600 mb-2">150+</p>
                <p className="text-sm text-gray-700">Faculty Members</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600 mb-2">20+</p>
                <p className="text-sm text-gray-700">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
