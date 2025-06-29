import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiRefreshCw } from 'react-icons/fi';
import { FaGraduationCap, FaBook, FaChartLine } from 'react-icons/fa';

export default function AdminResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [batchYearFilter, setBatchYearFilter] = useState('');
  const [scoreView, setScoreView] = useState('gpa'); // 'gpa' or 'percentage'

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState('');

  const branchOptions = ['CSE', 'IT', 'ECE', 'EEE', 'AIDS', 'CSE-DS'];
  const batchYearOptions = [2025, 2026, 2027, 2028, 2029, 2030];

  useEffect(() => { 
    fetchResults();
  }, []);

  const fetchResults = () => {
    setLoading(true);
    setError('');
    axios.get('/results/admin')
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load results. Please try again.');
        setLoading(false);
      });
  };

  // Filtering logic
  const filteredResults = results.filter(result => {
    const matchesSearch = Object.values(result).some(
      value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesBranch = branchFilter ? result.branch === branchFilter : true;
    const matchesBatch = batchYearFilter ? String(result.batch_year) === String(batchYearFilter) : true;
    return matchesSearch && matchesBranch && matchesBatch;
  });

  // CSV export handler
  const handleExport = () => {
    if (!filteredResults.length) return;
    const csvRows = [
      [
        'Student Name',
        'Student ID',
        'Branch',
        'Batch Year',
        'Subject',
        'Subject Code',
        'Semester',
        'Internal Marks',
        'External Marks',
        'Total Marks',
        'Grade',
        'Status'
      ],
      ...filteredResults.map(r => [
        r.student_name || '',
        r.student_id || '',
        r.branch || '',
        r.batch_year || '',
        r.subject_name || r.subject_id || '',
        r.subject_code || '',
        r.semester || '',
        r.internal_marks || '',
        r.external_marks || '',
        r.total_marks || '',
        r.grade || '',
        r.grade === 'F' ? 'Failed' : 'Passed'
      ])
    ];
    const csvContent = csvRows.map(e => e.map(x => `"${x}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    let fileName = 'results';
    if (branchFilter) fileName += `_branch_${branchFilter}`;
    if (batchYearFilter) fileName += `_batch_${batchYearFilter}`;
    a.download = `${fileName}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleStudentClick = async (studentId) => {
    setSelectedStudent(studentId);
    setDetailsLoading(true);
    setDetailsError('');
    setStudentDetails(null);
    try {
      const res = await axios.get(`/results/student/${studentId}`);
      setStudentDetails(res.data);
    } catch (err) {
      setDetailsError('Failed to fetch student details.' + err.message);
    }
    setDetailsLoading(false);
  };

  const closeStudentModal = () => {
    setSelectedStudent(null);
    setStudentDetails(null);
    setDetailsError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <FaGraduationCap className="mr-2 text-indigo-600" />
              Results Management
            </h1>
            <p className="mt-2 text-gray-600">View and manage all student examination results</p>
          </div>
          {/* <div className="mt-4 md:mt-0">
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <FiPlus className="mr-2" />
              Add New Result
            </button>
          </div> */}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <FaBook className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Results</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{results.length}</div>
                  </dd>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">Passing Rate</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {results.length > 0 
                        ? `${Math.round((results.filter(r => r.grade !== 'F').length / results.length) * 100)}%` 
                        : '0%'}
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <FaChartLine className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">Average Score</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {results.length > 0 
                        ? Math.round(results.reduce((acc, curr) => acc + curr.total_marks, 0) / results.length) 
                        : 0}
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters, Search and Refresh */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative rounded-md shadow-sm w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search results..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="block w-full sm:w-40 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={branchFilter}
              onChange={e => setBranchFilter(e.target.value)}
            >
              <option value="">All Branches</option>
              {branchOptions.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
            <select
              className="block w-full sm:w-40 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={batchYearFilter}
              onChange={e => setBatchYearFilter(e.target.value)}
            >
              <option value="">All Batch Years</option>
              {batchYearOptions.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <button 
            onClick={fetchResults}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiRefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Download CSV button (only if filtered and results exist) */}
        {(!!branchFilter || !!batchYearFilter) && filteredResults.length > 0 && (
          <div className="mb-4 flex justify-end">
            <button
              onClick={handleExport}
              className="inline-flex items-center px-4 py-2 border border-green-600 rounded-md shadow-sm text-sm font-medium text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Download CSV
            </button>
          </div>
        )}

        {/* Loading and Error States */}
        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>Please check your network connection and try again.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Table (columns always visible, loader inside table) */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Batch Year
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Semester
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      Scores
                      <select
                        className="ml-2 px-2 py-1 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={scoreView}
                        onChange={e => setScoreView(e.target.value)}
                      >
                        <option value="gpa">By GPA</option>
                        <option value="percentage">By %</option>
                      </select>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredResults.length > 0 ? (
                  filteredResults.map((result) => (
                    <tr key={result.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleStudentClick(result.student_id)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{result.student_id}</div>
                        <div className="text-sm text-gray-500">{result.student_name || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{result.batch_year || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Semester {result.semester}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {scoreView === 'gpa' ? (
                          <span className="text-indigo-700 font-semibold">{result.gpa || '-'}</span>
                        ) : (
                          <span className="text-indigo-700 font-semibold">{result.percentage || '-'}</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                      No results found{searchTerm || branchFilter || batchYearFilter ? ' matching your filters' : ''}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Student Details Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={closeStudentModal}>&times;</button>
              <h2 className="text-xl font-bold mb-4">Student Details</h2>
              {detailsLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : detailsError ? (
                <div className="text-red-600">{detailsError}</div>
              ) : studentDetails ? (
                <div>
                  <div className="mb-4">
                    <div className="font-semibold">Name: <span className="font-normal">{studentDetails.student_name}</span></div>
                    <div className="font-semibold">ID: <span className="font-normal">{studentDetails.student_id}</span></div>
                    <div className="font-semibold">Branch: <span className="font-normal">{studentDetails.branch}</span></div>
                    <div className="font-semibold">Batch Year: <span className="font-normal">{studentDetails.batch_year}</span></div>
                    <div className="font-semibold">GPA: <span className="font-normal">{studentDetails.gpa}</span></div>
                    <div className="font-semibold">Percentage: <span className="font-normal">{studentDetails.percentage}</span></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Subject-wise Results</h3>
                  <table className="min-w-full divide-y divide-gray-200 mb-4">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Int</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ext</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {studentDetails.subjects && studentDetails.subjects.length > 0 ? (
                        studentDetails.subjects.map((subj, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-2">{subj.subject_name}</td>
                            <td className="px-4 py-2">{subj.subject_code}</td>
                            <td className="px-4 py-2">{subj.internal_marks}</td>
                            <td className="px-4 py-2">{subj.external_marks}</td>
                            <td className="px-4 py-2">{subj.total_marks}</td>
                            <td className="px-4 py-2">{subj.grade}</td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="6" className="text-center text-gray-500">No subject data</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}