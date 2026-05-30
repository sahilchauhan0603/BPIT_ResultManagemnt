import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  HiOutlineCog, 
  HiOutlineLogout, 
  HiOutlineViewGrid,
  HiOutlineUsers,
  HiOutlineDocumentReport,
  HiOutlineChartSquareBar,
  HiOutlineUserCircle
} from 'react-icons/hi';
import { FaUserShield, FaUserGraduate } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AdminLayout() {
  const location = useLocation();
  
  // Sidebar navigation items
  const navItems = [
    { path: '/admin/dashboard', icon: HiOutlineViewGrid, label: 'Dashboard' },
    { path: '/admin/results', icon: HiOutlineDocumentReport, label: 'Results' },
    { path: '/admin/students', icon: HiOutlineUsers, label: 'Students' },
    { path: '/admin/analytics', icon: HiOutlineChartSquareBar, label: 'Analytics' },
    { path: '/admin/settings', icon: HiOutlineCog, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-72 bg-gradient-to-b from-indigo-900 to-purple-800 shadow-2xl p-6 flex flex-col gap-8 fixed h-full"
      >
        {/* Logo/Branding */}
        <div className="flex items-center gap-3 mb-8 pl-2">
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ duration: 0.3 }}
          >
            <FaUserShield className="text-3xl text-white drop-shadow-lg" />
          </motion.div>
          <div>
            <span className="text-2xl font-bold text-white tracking-wide">Admin Portal</span>
            <p className="text-xs text-indigo-200 mt-1">Results Management System</p>
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl mb-6">
          <div className="relative">
            <HiOutlineUserCircle className="text-3xl text-white" />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-indigo-900 rounded-full"></span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Admin User</p>
            <p className="text-xs text-indigo-200">Super Administrator</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-6">
          <Link 
            to="/admin/dashboard" 
            className="flex items-center gap-2 text-lg text-white font-semibold hover:bg-white/10 px-4 py-2 rounded-lg transition"
          >
            <HiOutlineDocumentReport className="text-xl" />
            Dashboard
          </Link>
          <Link 
            to="/admin/results" 
            className="flex items-center gap-2 text-lg text-white font-semibold hover:bg-white/10 px-4 py-2 rounded-lg transition"
          >
            <HiOutlineDocumentReport className="text-xl" />
            Manage Results
          </Link>
          <Link 
            to="/admin/students" 
            className="flex items-center gap-2 text-lg text-white font-semibold hover:bg-white/10 px-4 py-2 rounded-lg transition"
          >
            <FaUserGraduate className="text-xl" />
            Manage Students
          </Link>
          {/* Add more admin links here */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-base text-blue-100 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition"
          >
            <HiOutlineLogout className="text-lg" />
            Back to Home
          </Link>
        </nav>

        {/* Footer */}
        <div className="mt-auto">
          <div className="text-xs text-indigo-200/70 pt-4 mt-4 border-t border-indigo-200/10">
            &copy; {new Date().getFullYear()} BPIT Results Portal
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 min-h-screen">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {navItems.find(item => location.pathname.includes(item.path))?.label || 'Dashboard'}
            </h1>
            
            <div className="flex items-center gap-4">
              {/* <button className="relative p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100">
                <HiOutlineBell className="text-xl" />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                    {notificationCount}
                  </span>
                )}
              </button> */}
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <HiOutlineUserCircle className="text-indigo-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-8"
        >
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </motion.div>
      </main>
    </div>
  );
}