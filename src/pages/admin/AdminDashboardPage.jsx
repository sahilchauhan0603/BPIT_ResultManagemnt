import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { 
  FaGraduationCap, 
  FaBook, 
  FaChartLine, 
  FaUserCheck,
  FaCalendarAlt
} from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function AdminDashboardPage() {
  const [stats, setStats] = useState([
    { title: "Total Students", value: "-", icon: FaGraduationCap, change: "", trend: 'neutral' },
    { title: "Results Published", value: "-", icon: FaBook, change: "", trend: 'neutral' },
    { title: "Pass Percentage", value: "-", icon: FaUserCheck, change: "", trend: 'neutral' },
    { title: "Current Semesters", value: "-", icon: FaCalendarAlt, change: "", trend: 'neutral' }
  ]);
  const [branchData, setBranchData] = useState(null);
  const [resultsTrend, setResultsTrend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // TODO: Replace with your backend endpoints when available
    async function fetchDashboardData() {
      setLoading(true);
      try {
        // Example endpoints, update as needed
        const [studentsRes, resultsRes, passRes, semRes, branchRes, trendRes] = await Promise.all([
          axios.get('/dashboard/total-students'),
          axios.get('/dashboard/results-published'),
          axios.get('/dashboard/pass-percentage'),
          axios.get('/dashboard/current-semesters'),
          axios.get('/dashboard/branch-distribution'),
          axios.get('/dashboard/results-trend'),
        ]);
        setStats([
          { title: "Total Students", value: studentsRes.data.value, icon: FaGraduationCap, change: studentsRes.data.change, trend: studentsRes.data.trend },
          { title: "Results Published", value: resultsRes.data.value, icon: FaBook, change: resultsRes.data.change, trend: resultsRes.data.trend },
          { title: "Pass Percentage", value: passRes.data.value, icon: FaUserCheck, change: passRes.data.change, trend: passRes.data.trend },
          { title: "Current Semesters", value: semRes.data.value, icon: FaCalendarAlt, change: semRes.data.change, trend: semRes.data.trend }
        ]);
        setBranchData(branchRes.data);
        setResultsTrend(trendRes.data);
      } catch (err) {
        // Do not show error, just keep default/empty data
        console.error('Error fetching dashboard data:', err);
      }
      setLoading(false);
    }
    fetchDashboardData();
  }, []);

  // Example static URLs for demonstration
  const recentResults = [
    { semester: 1, url: 'https://university.edu/results/sem1.pdf', date: '2025-06-01' },
    { semester: 2, url: 'https://university.edu/results/sem2.pdf', date: '2025-05-01' },
    { semester: 3, url: 'https://university.edu/results/sem3.pdf', date: '2025-04-01' },
    { semester: 4, url: 'http://164.100.158.135/ExamResults/2025/260625/BTECH%2004__MJ025.pdf', date: '2025-03-01' },
    { semester: 5, url: 'https://university.edu/results/sem5.pdf', date: '2025-02-15' },
    { semester: 6, url: 'https://university.edu/results/sem5.pdf', date: '2025-02-01' },
    { semester: 7, url: 'https://university.edu/results/sem5.pdf', date: '2025-01-21' },
    { semester: 8, url: 'https://university.edu/results/sem5.pdf', date: '2025-01-18' },
  ];

  return (
    <div className="space-y-8">
      {/* Always show dashboard, even if loading or error */}
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 flex items-center">
            <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600 mr-4">
              <stat.icon className="text-2xl" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <div className="flex items-center">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                {stat.change && (
                  <span className={`ml-2 flex items-center text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-400'
                  }`}>
                    {stat.change}
                    {stat.trend === 'up' ? (
                      <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    ) : stat.trend === 'down' ? (
                      <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    ) : null}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Results Trend</h3>
          <div className="h-80">
            <Bar 
              data={resultsTrend || {
                labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                datasets: [{
                  label: 'Pass Percentage',
                  data: [0, 0, 0, 0, 0, 0],
                  backgroundColor: 'rgba(79, 70, 229, 0.2)',
                  borderColor: 'rgba(79, 70, 229, 1)',
                  borderWidth: 2,
                  tension: 0.4,
                  fill: true
                }]
              }}
              options={{ 
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: false, min: 80, max: 100 } }
              }} 
            />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Students by Branch</h3>
          <div className="h-80">
            <Pie 
              data={branchData || {
                labels: ['CSE', 'ECE', 'ME', 'EE', 'CE'],
                datasets: [{
                  label: 'Students by Branch',
                  data: [0, 0, 0, 0, 0],
                  backgroundColor: [
                    'rgba(79, 70, 229, 0.8)',
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(129, 140, 248, 0.8)',
                    'rgba(165, 180, 252, 0.8)',
                    'rgba(199, 210, 254, 0.8)'
                  ],
                  borderWidth: 0
                }]
              }}
              options={{ 
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right' } }
              }} 
            />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Results Published</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentResults.map((item) => (
            <div key={item.semester} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-indigo-100 text-indigo-600 mr-4">
                  <FaBook className="text-lg" />
                </div>
                <div>
                  <span
                    className="text-sm font-medium text-indigo-700 hover:underline cursor-pointer relative group"
                  >
                    Semester {item.semester} Results
                    <span className="absolute left-1/2 -translate-x-1/2 mt-2 z-10 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-3 py-1 whitespace-nowrap shadow-lg">
                      To view results, click the Download button
                    </span>
                  </span>
                  <p className="text-xs text-gray-500">Published on {new Date(item.date).toLocaleDateString()}</p>
                </div>
              </div>
              <button
                onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
                className="px-3 py-1 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition shadow cursor-pointer"
              >
                Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}