import { useState } from 'react';
import Navbar from '../components/Navbar';
import { HiSearch, HiUser, HiMail, HiAcademicCap, HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { resultsAPI } from '../services/api';

export default function ResultsPage() {
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!enrollmentNumber.trim()) return;
    
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const response = await resultsAPI.searchByEnrollment(enrollmentNumber);
      if (response.data.success) {
        setResult(response.data.data);
      } else {
        setError('No results found for this enrollment number');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Check Your Results
          </h1>
          <p className="text-lg text-gray-600">
            Enter your enrollment number to view your examination results
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="enrollment" className="block text-sm font-medium text-gray-700 mb-2">
                  Enrollment Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiAcademicCap className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="enrollment"
                    className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    placeholder="Enter your enrollment number"
                    value={enrollmentNumber}
                    onChange={(e) => setEnrollmentNumber(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !enrollmentNumber.trim()}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </>
                ) : (
                  <>
                    <HiSearch className="mr-2 h-5 w-5" />
                    Search Results
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <div className="flex">
                  <HiXCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <p className="ml-3 text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Display */}
        {result && !error && (
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Student Information Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{result.student?.name}</h2>
                    <p className="text-blue-100">{result.student?.course}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                    <p className="text-sm font-medium text-blue-100">Enrollment No.</p>
                    <p className="text-xl font-bold">{result.student?.enrollmentNumber}</p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-6 grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiUser className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Student Name</p>
                    <p className="text-base font-medium text-gray-900">{result.student?.name}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiMail className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-base font-medium text-gray-900">{result.student?.email || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiAcademicCap className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Course</p>
                    <p className="text-base font-medium text-gray-900">{result.student?.course}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiAcademicCap className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Enrollment Number</p>
                    <p className="text-base font-medium text-gray-900">{result.student?.enrollmentNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Table */}
            {result.results && result.results.length > 0 ? (
              result.results.map((semesterResult, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Semester {semesterResult.semester} - {semesterResult.academicYear}
                      </h3>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-500">SGPA</p>
                          <p className="text-lg font-bold text-gray-900">{semesterResult.sgpa?.toFixed(2)}</p>
                        </div>
                        {semesterResult.cgpa && (
                          <div className="text-right">
                            <p className="text-sm text-gray-500">CGPA</p>
                            <p className="text-lg font-bold text-gray-900">{semesterResult.cgpa?.toFixed(2)}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subject
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Code
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Credits
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Marks
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Grade
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {semesterResult.subjects?.map((subject, subIndex) => (
                          <tr key={subIndex} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <p className="text-sm font-medium text-gray-900">{subject.subjectName}</p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-gray-500">{subject.subjectCode}</p>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <p className="text-sm text-gray-900">{subject.credits}</p>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {subject.marks}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                subject.grade === 'F' 
                                  ? 'bg-red-100 text-red-800' 
                                  : subject.grade === 'A+' || subject.grade === 'A'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {subject.grade}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              {subject.grade === 'F' ? (
                                <span className="inline-flex items-center text-sm text-red-600">
                                  <HiXCircle className="mr-1 h-4 w-4" />
                                  Failed
                                </span>
                              ) : (
                                <span className="inline-flex items-center text-sm text-green-600">
                                  <HiCheckCircle className="mr-1 h-4 w-4" />
                                  Passed
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary Footer */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-6">
                        <div>
                          <span className="text-gray-500">Total Credits: </span>
                          <span className="font-semibold text-gray-900">{semesterResult.totalCredits}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Status: </span>
                          <span className={`font-semibold ${
                            semesterResult.status === 'Pass' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {semesterResult.status}
                          </span>
                        </div>
                      </div>
                      {semesterResult.publishedDate && (
                        <div className="text-gray-500">
                          Published: {new Date(semesterResult.publishedDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <HiAcademicCap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No results available yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
