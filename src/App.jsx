import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminResultsPage from './pages/admin/AdminResultsPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminStudentsPage from './pages/admin/AdminStudentsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="results" element={<AdminResultsPage />} />
          <Route path="students" element={<AdminStudentsPage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          {/* Add more admin routes here as needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
