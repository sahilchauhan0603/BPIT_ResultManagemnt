# BPIT Result Management System

A full-stack web application for managing student results with separate frontend and backend services in a monorepo structure.

## 📁 Project Structure

```
BPIT_ResultManagement/
├── frontend/          # React + Vite frontend (Port 5173)
├── backend/           # Node.js + Express backend (Port 5000)
├── .gitignore         # Root gitignore
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd BPIT_ResultManagement
```

### 2. Backend Setup
```bash
cd backend
npm install
copy .env.example .env    # Windows
# cp .env.example .env    # Mac/Linux

# Edit .env file with your MongoDB URI and JWT secret
npm run dev
```

Backend runs on: **http://localhost:5000**

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: **http://localhost:5173**

## 📚 Documentation

- **Backend Documentation:** [`backend/DOCUMENTATION.md`](./backend/DOCUMENTATION.md)
- **Frontend Documentation:** [`frontend/DOCUMENTATION.md`](./frontend/DOCUMENTATION.md)

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router v7
- Tailwind CSS v4
- Axios
- Chart.js
- Framer Motion
- Vite

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- CORS

## 🔧 Configuration

### Backend Environment Variables
Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/bpit_results
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend Environment Variables
Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=BPIT Results Portal
VITE_APP_VERSION=1.0.0
```

## 📡 API Endpoints

Base URL: `http://localhost:5000/api`

### Authentication
- `POST /auth/register` - Register user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user (Protected)

### Students
- `GET /students/profile` - Get profile (Student)
- `GET /admin/students` - Get all students (Admin)
- `POST /admin/students` - Create student (Admin)

### Results
- `GET /results/my-results` - Get my results (Protected)
- `GET /results/search/:enrollmentNumber` - Search results (Public)
- `GET /admin/results` - Get all results (Admin)
- `POST /admin/results` - Create result (Admin)

### Analytics
- `GET /admin/analytics` - Get analytics (Admin)

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| **Student** | View own results, update profile |
| **Admin** | Manage students, manage results, view analytics |

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Use `npm start` for production
3. Ensure MongoDB connection is configured

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist/` folder
3. Update `VITE_API_URL` to production backend URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 Git Workflow

```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to remote
git push origin main
```

## 🐛 Troubleshooting

### Backend Issues
- Ensure MongoDB is running
- Check `.env` configuration
- Verify port 5000 is available

### Frontend Issues
- Ensure backend is running
- Check `VITE_API_URL` in `.env`
- Clear browser cache

## 📄 License

MIT License

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Made with ❤️ for BPIT**
