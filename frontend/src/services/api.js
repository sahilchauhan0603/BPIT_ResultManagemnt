import axios from '../utils/axios';

// Auth API
export const authAPI = {
  login: (credentials) => axios.post('/api/auth/login', credentials),
  register: (userData) => axios.post('/api/auth/register', userData),
  getMe: () => axios.get('/api/auth/me'),
  updateProfile: (data) => axios.put('/api/auth/profile', data)
};

// Student API
export const studentAPI = {
  getProfile: () => axios.get('/api/students/profile'),
  updateProfile: (data) => axios.put('/api/students/profile', data),
  // Admin endpoints
  getAll: () => axios.get('/api/admin/students'),
  getById: (id) => axios.get(`/api/admin/students/${id}`),
  create: (data) => axios.post('/api/admin/students', data),
  update: (id, data) => axios.put(`/api/admin/students/${id}`, data),
  delete: (id) => axios.delete(`/api/admin/students/${id}`)
};

// Results API
export const resultsAPI = {
  getMyResults: () => axios.get('/api/results/my-results'),
  getBySemester: (semester) => axios.get(`/api/results/semester/${semester}`),
  searchByEnrollment: (enrollmentNumber) => axios.get(`/api/results/search/${enrollmentNumber}`),
  // Admin endpoints
  getAll: () => axios.get('/api/admin/results'),
  create: (data) => axios.post('/api/admin/results', data),
  update: (id, data) => axios.put(`/api/admin/results/${id}`, data),
  delete: (id) => axios.delete(`/api/admin/results/${id}`),
  publish: (id) => axios.put(`/api/admin/results/${id}/publish`)
};

// Analytics API (Admin)
export const analyticsAPI = {
  getAnalytics: () => axios.get('/api/admin/analytics')
};

// Health Check
export const healthAPI = {
  check: () => axios.get('/api/health')
};

export default {
  auth: authAPI,
  students: studentAPI,
  results: resultsAPI,
  analytics: analyticsAPI,
  health: healthAPI
};
