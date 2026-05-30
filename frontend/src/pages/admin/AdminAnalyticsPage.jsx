import { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import axios from '../../utils/axios';
import { HiTrendingUp, HiTrendingDown, HiUsers, HiAcademicCap } from 'react-icons/hi';

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('semester');
  const [loading, setLoading] = useState(false);

  // Sample data - replace with actual API calls
  const performanceTrendData = {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
    datasets: [
      {
        label: 'Average Percentage',
        data: [72, 75, 78, 76, 80, 82],
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const branchComparisonData = {
    labels: ['CSE', 'ECE', 'ME', 'EE', 'CE', 'IT'],
    datasets: [
      {
        label: 'Pass Percentage',
        data: [92, 88, 85, 87, 83, 90],
        backgroundColor: [
          'rgba(79, 70, 229, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(129, 140, 248, 0.8)',
          'rgba(165, 180, 252, 0.8)',
          'rgba(199, 210, 254, 0.8)',
          'rgba(224, 231, 255, 0.8)'
        ]
      }
    ]
  };

  const gradeDistributionData = {
    labels: ['A+', 'A', 'B+', 'B', 'C', 'F'],
    datasets: [
      {
        data: [15, 25, 30, 20, 8, 2],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ]
      }
    ]
  };

  const attendanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Average Attendance %',
        data: [85, 87, 84, 88, 86, 89],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Header with Filters */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="flex gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="semester">This Semester</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overall Pass Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">87.5%</p>
              <div className="flex items-center mt-2 text-green-600">
                <HiTrendingUp className="mr-1" />
                <span className="text-sm">+2.3% from last sem</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <HiAcademicCap className="text-2xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Average CGPA</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">7.8</p>
              <div className="flex items-center mt-2 text-green-600">
                <HiTrendingUp className="mr-1" />
                <span className="text-sm">+0.2 from last sem</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <HiTrendingUp className="text-2xl text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Students</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">2,450</p>
              <div className="flex items-center mt-2 text-gray-600">
                <span className="text-sm">Across all branches</span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <HiUsers className="text-2xl text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Attendance</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">86.5%</p>
              <div className="flex items-center mt-2 text-red-600">
                <HiTrendingDown className="mr-1" />
                <span className="text-sm">-1.2% from last month</span>
              </div>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <HiTrendingDown className="text-2xl text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Trend</h3>
          <div className="h-80">
            <Line
              data={performanceTrendData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  y: { beginAtZero: false, min: 60, max: 100 }
                }
              }}
            />
          </div>
        </div>

        {/* Branch Comparison */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Branch-wise Pass Percentage</h3>
          <div className="h-80">
            <Bar
              data={branchComparisonData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  y: { beginAtZero: false, min: 70, max: 100 }
                }
              }}
            />
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Grade Distribution</h3>
          <div className="h-80">
            <Doughnut
              data={gradeDistributionData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'right' }
                }
              }}
            />
          </div>
        </div>

        {/* Attendance Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Trend</h3>
          <div className="h-80">
            <Line
              data={attendanceData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  y: { beginAtZero: false, min: 70, max: 100 }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Top Performers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enrollment No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Branch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CGPA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { rank: 1, name: 'Rahul Sharma', enrollment: '12345678', branch: 'CSE', cgpa: 9.8, percentage: 98 },
                { rank: 2, name: 'Priya Singh', enrollment: '12345679', branch: 'ECE', cgpa: 9.7, percentage: 97 },
                { rank: 3, name: 'Amit Kumar', enrollment: '12345680', branch: 'IT', cgpa: 9.6, percentage: 96 },
                { rank: 4, name: 'Sneha Patel', enrollment: '12345681', branch: 'CSE', cgpa: 9.5, percentage: 95 },
                { rank: 5, name: 'Vikram Reddy', enrollment: '12345682', branch: 'ME', cgpa: 9.4, percentage: 94 }
              ].map((student) => (
                <tr key={student.rank} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                      #{student.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.enrollment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.branch}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.cgpa}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                      {student.percentage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
