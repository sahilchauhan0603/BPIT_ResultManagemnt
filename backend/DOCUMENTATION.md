# Backend Documentation - BPIT Result Management System

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Project Structure](#project-structure)
5. [API Endpoints](#api-endpoints)
6. [Database Models](#database-models)
7. [Authentication](#authentication)
8. [Testing](#testing)
9. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
copy .env.example .env

# 3. Update .env with your MongoDB URI and JWT secret

# 4. Start server
npm run dev
```

Server runs on: **http://localhost:5000**

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Steps

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**
```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

4. **Configure .env file** (see Configuration section)

5. **Start the server:**
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

---

## 🔧 Configuration

### Environment Variables (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/bpit_results
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bpit_results

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

**Important:** Change `JWT_SECRET` to a secure random string in production!

---

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js              # MongoDB connection
├── controllers/
│   ├── auth.controller.js       # Authentication logic
│   ├── admin.controller.js      # Admin CRUD operations
│   ├── student.controller.js    # Student operations
│   └── result.controller.js     # Result operations
├── middleware/
│   ├── auth.js                  # JWT verification & authorization
│   └── errorHandler.js          # Global error handling
├── models/
│   ├── User.model.js            # User schema & methods
│   └── Result.model.js          # Result schema
├── routes/
│   ├── auth.routes.js           # Auth endpoints
│   ├── admin.routes.js          # Admin endpoints
│   ├── student.routes.js        # Student endpoints
│   └── result.routes.js         # Result endpoints
├── uploads/                     # File uploads directory
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── .gitignore
├── package.json
├── DOCUMENTATION.md             # This file
└── server.js                    # Application entry point
```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/auth/register` | Register new user | Public |
| POST | `/auth/login` | Login user | Public |
| GET | `/auth/me` | Get current user | Protected |
| PUT | `/auth/profile` | Update profile | Protected |

**Register Example:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@bpit.edu",
    "password": "admin123",
    "role": "admin"
  }'
```

**Login Example:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@bpit.edu",
    "password": "admin123"
  }'
```

### Students (`/api/students`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/students/profile` | Get student profile | Student |
| PUT | `/students/profile` | Update student profile | Student |

### Results (`/api/results`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/results/my-results` | Get my results | Protected |
| GET | `/results/semester/:semester` | Get semester result | Protected |
| GET | `/results/search/:enrollmentNumber` | Search by enrollment | Public |

### Admin - Students (`/api/admin/students`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/admin/students` | Get all students | Admin |
| POST | `/admin/students` | Create student | Admin |
| GET | `/admin/students/:id` | Get student by ID | Admin |
| PUT | `/admin/students/:id` | Update student | Admin |
| DELETE | `/admin/students/:id` | Delete student | Admin |

### Admin - Results (`/api/admin/results`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/admin/results` | Get all results | Admin |
| POST | `/admin/results` | Create result | Admin |
| PUT | `/admin/results/:id` | Update result | Admin |
| DELETE | `/admin/results/:id` | Delete result | Admin |
| PUT | `/admin/results/:id/publish` | Publish/unpublish result | Admin |

### Admin - Analytics (`/api/admin/analytics`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/admin/analytics` | Get analytics data | Admin |

### Health Check

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/health` | Server health check | Public |

---

## 🗄️ Database Models

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed, minlength: 6),
  role: String (enum: ['student', 'admin'], default: 'student'),
  enrollmentNumber: String (unique, sparse),
  course: String,
  semester: Number,
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

**Methods:**
- `matchPassword(enteredPassword)` - Compare password with hashed password

### Result Model

```javascript
{
  student: ObjectId (ref: 'User', required),
  enrollmentNumber: String (required),
  semester: Number (required),
  academicYear: String (required),
  subjects: [
    {
      subjectCode: String (required),
      subjectName: String (required),
      credits: Number (required),
      grade: String (enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F']),
      gradePoint: Number (required),
      marks: Number (required)
    }
  ],
  sgpa: Number (required),
  cgpa: Number,
  totalCredits: Number (required),
  status: String (enum: ['Pass', 'Fail', 'Pending'], default: 'Pending'),
  publishedDate: Date,
  isPublished: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `{ student: 1, semester: 1 }`
- `{ enrollmentNumber: 1 }`

---

## 🔐 Authentication

### JWT Token Flow

1. **User registers/logs in**
2. **Server generates JWT token** with user ID
3. **Client stores token** in localStorage
4. **Client sends token** in Authorization header for protected routes
5. **Server verifies token** and attaches user to request

### Protected Routes

Use the `protect` middleware:
```javascript
router.get('/profile', protect, getProfile);
```

### Role-Based Authorization

Use the `authorize` middleware:
```javascript
router.get('/admin/students', protect, authorize('admin'), getAllStudents);
```

### Request Headers

```javascript
{
  'Authorization': 'Bearer <JWT_TOKEN>',
  'Content-Type': 'application/json'
}
```

---

## 🧪 Testing

### Health Check
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Create Admin User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@bpit.edu",
    "password": "admin123",
    "role": "admin"
  }'
```

### Create Student User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@student.bpit.edu",
    "password": "student123",
    "role": "student",
    "enrollmentNumber": "2024001",
    "course": "B.Tech CSE",
    "semester": 1
  }'
```

### Get Profile (with token)
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🐛 Troubleshooting

### MongoDB Connection Failed

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions:**
- Ensure MongoDB service is running
- Check if MongoDB is running on port 27017: `netstat -an | findstr 27017`
- Verify MONGODB_URI in .env
- Try using 127.0.0.1 instead of localhost

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solutions:**
- Change PORT in .env to another port
- Kill the process using port 5000:
  - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
  - Mac/Linux: `lsof -ti:5000 | xargs kill`

### JWT Token Errors

**Error:** `Not authorized, token failed`

**Solutions:**
- Ensure JWT_SECRET is set in .env
- Check token format: `Bearer <token>`
- Verify token hasn't expired

### Module Not Found

**Error:** `Cannot find module 'express'`

**Solutions:**
- Delete node_modules folder
- Delete package-lock.json
- Run `npm install` again

### CORS Errors

**Solutions:**
- Verify FRONTEND_URL in .env matches your frontend URL
- Ensure backend server is running
- Check CORS configuration in server.js

---

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token authentication
- ✅ Role-based access control
- ✅ Protected routes with middleware
- ✅ CORS protection
- ✅ Input validation
- ✅ Error handling middleware

---

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "count": 10  // For list endpoints
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🚀 Deployment

### Production Checklist

- [ ] Set NODE_ENV=production
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Use MongoDB Atlas or managed database
- [ ] Enable HTTPS
- [ ] Configure proper CORS
- [ ] Add rate limiting
- [ ] Set up logging
- [ ] Configure backups
- [ ] Add monitoring
- [ ] Use environment-specific .env files

### Environment Variables for Production

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/bpit_results
JWT_SECRET=very_long_random_secure_string_here
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-domain.com
```

---

## 📝 NPM Scripts

```bash
npm start       # Production mode
npm run dev     # Development mode (with nodemon)
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

**For frontend integration, see: `../frontend/DOCUMENTATION.md`**
