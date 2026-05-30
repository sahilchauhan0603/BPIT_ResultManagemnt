# Frontend Documentation - BPIT Result Management System

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Project Structure](#project-structure)
5. [API Integration](#api-integration)
6. [Components](#components)
7. [Routing](#routing)
8. [Authentication](#authentication)
9. [Styling](#styling)
10. [Building & Deployment](#building--deployment)
11. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Verify .env file exists with correct API URL

# 3. Start development server
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend server running on port 5000

### Steps

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Verify .env file:**
```bash
# Should contain:
VITE_API_URL=http://localhost:5000
```

4. **Start development server:**
```bash
npm run dev
```

---

## 🔧 Configuration

### Environment Variables (.env)

```env
# Backend API URL
VITE_API_URL=http://localhost:5000

# App Configuration
VITE_APP_NAME=BPIT Results Portal
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true

# External Services (Optional)
VITE_GOOGLE_ANALYTICS_ID=
VITE_SENTRY_DSN=
```

### Accessing Environment Variables

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
const appName = import.meta.env.VITE_APP_NAME;
```

---

## 📁 Project Structure

```
frontend/
├── public/
│   └── vite.svg                 # Static assets
├── src/
│   ├── assets/
│   │   └── react.svg            # Images and assets
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation component
│   │   └── ProtectedRoute.jsx   # Route protection
│   ├── contexts/
│   │   └── AuthContext.jsx      # Authentication state
│   ├── pages/
│   │   ├── admin/               # Admin pages
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── AdminDashboardPage.jsx
│   │   │   ├── AdminStudentsPage.jsx
│   │   │   ├── AdminResultsPage.jsx
│   │   │   ├── AdminAnalyticsPage.jsx
│   │   │   └── AdminSettingsPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ResultsPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── AboutPage.jsx
│   │   └── ContactPage.jsx
│   ├── services/
│   │   └── api.js               # API service layer
│   ├── utils/
│   │   └── axios.js             # Axios configuration
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
├── DOCUMENTATION.md             # This file
└── README.md
```

---

## 📡 API Integration

### Axios Configuration (`src/utils/axios.js`)

```javascript
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
```

### API Service (`src/services/api.js`)

```javascript
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
  searchByEnrollment: (enrollmentNumber) => 
    axios.get(`/api/results/search/${enrollmentNumber}`),
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
```

### Usage Example

```javascript
import { authAPI, resultsAPI } from '../services/api';

// Login
const handleLogin = async (credentials) => {
  try {
    const response = await authAPI.login(credentials);
    const { token, ...user } = response.data.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Get results
const fetchResults = async () => {
  try {
    const response = await resultsAPI.getMyResults();
    setResults(response.data.data);
  } catch (error) {
    console.error('Failed to fetch results:', error);
  }
};
```

---

## 🧩 Components

### AuthContext (`src/contexts/AuthContext.jsx`)

Manages authentication state across the application.

```javascript
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### ProtectedRoute (`src/components/ProtectedRoute.jsx`)

Protects routes that require authentication.

```javascript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

### Navbar (`src/components/Navbar.jsx`)

Navigation component with authentication-aware links.

---

## 🛣️ Routing

### Route Structure (`src/App.jsx`)

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Protected Routes */}
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <ResultsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="students" element={<AdminStudentsPage />} />
          <Route path="results" element={<AdminResultsPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 🔐 Authentication

### Login Flow

1. User enters credentials
2. Frontend sends POST request to `/api/auth/login`
3. Backend validates and returns JWT token
4. Frontend stores token in localStorage
5. Frontend updates AuthContext
6. User is redirected to dashboard

### Logout Flow

1. User clicks logout
2. Frontend removes token from localStorage
3. Frontend clears AuthContext
4. User is redirected to login page

### Token Storage

```javascript
// Store token
localStorage.setItem('token', token);
localStorage.setItem('user', JSON.stringify(user));

// Get token
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

// Remove token
localStorage.removeItem('token');
localStorage.removeItem('user');
```

---

## 🎨 Styling

### Tailwind CSS

This project uses Tailwind CSS v4 for styling.

**Configuration:** `@tailwindcss/vite` plugin in `vite.config.js`

**Global Styles:** `src/index.css`

```css
@import "tailwindcss";

/* Custom styles */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### Using Tailwind Classes

```jsx
<div className="container mx-auto px-4">
  <h1 className="text-3xl font-bold text-blue-600">
    Welcome to BPIT Results Portal
  </h1>
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Click Me
  </button>
</div>
```

---

## 🏗️ Building & Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

Output: `dist/` folder

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

### Deployment Checklist

- [ ] Update VITE_API_URL to production backend URL
- [ ] Build the project: `npm run build`
- [ ] Test the build: `npm run preview`
- [ ] Deploy `dist/` folder to hosting service
- [ ] Configure environment variables on hosting platform
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS

### Deployment Platforms

- **Vercel:** `vercel deploy`
- **Netlify:** Drag & drop `dist/` folder
- **GitHub Pages:** Use `gh-pages` package
- **AWS S3:** Upload `dist/` folder to S3 bucket

---

## 🐛 Troubleshooting

### Backend Connection Issues

**Error:** `Network Error` or `ERR_CONNECTION_REFUSED`

**Solutions:**
- Ensure backend server is running on port 5000
- Verify VITE_API_URL in .env
- Check CORS settings in backend
- Clear browser cache

### CORS Errors

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solutions:**
- Verify backend FRONTEND_URL matches frontend URL
- Ensure backend CORS middleware is configured
- Check that backend is running

### Authentication Issues

**Error:** `401 Unauthorized`

**Solutions:**
- Check if token exists in localStorage
- Verify token hasn't expired
- Clear localStorage and login again
- Check Authorization header format

### Build Errors

**Error:** `Module not found`

**Solutions:**
- Delete node_modules and package-lock.json
- Run `npm install` again
- Check import paths are correct
- Verify all dependencies are installed

### Environment Variables Not Working

**Solutions:**
- Ensure variables start with `VITE_`
- Restart development server after changing .env
- Check variable names are correct
- Use `import.meta.env.VITE_VARIABLE_NAME`

---

## 📦 Dependencies

### Core Dependencies
- **React 19** - UI library
- **React Router v7** - Routing
- **Axios** - HTTP client
- **Tailwind CSS v4** - Styling
- **Chart.js** - Charts and graphs
- **React Chart.js 2** - React wrapper for Chart.js
- **Framer Motion** - Animations
- **React Icons** - Icon library

### Dev Dependencies
- **Vite** - Build tool
- **ESLint** - Linting
- **@vitejs/plugin-react** - React plugin for Vite

---

## 🔄 State Management

Currently using:
- **React Context API** for authentication state
- **Local component state** with useState
- **localStorage** for persistence

For larger applications, consider:
- Redux Toolkit
- Zustand
- Jotai
- Recoil

---

## 🧪 Testing (Future)

Recommended testing setup:
- **Vitest** - Unit testing
- **React Testing Library** - Component testing
- **Cypress** - E2E testing

---

## 📝 NPM Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

## 📄 License

MIT License

---

**For backend documentation, see: `../backend/DOCUMENTATION.md`**
