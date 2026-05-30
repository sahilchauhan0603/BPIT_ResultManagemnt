# BPIT Result Management System

A full-stack web application for managing student results with separate frontend and backend services in a monorepo structure.
# BPIT Result Management System

Monorepo for a full-stack student result management portal with a React frontend and an Express backend.

## Project Structure

```text
BPIT_Results/
|-- frontend/   React + Vite app
|-- backend/    Node.js + Express API
|-- README.md
```

## Getting Started

### Prerequisites

- Node.js 16 or newer
- MongoDB
- npm

### Backend

```powershell
cd backend
npm install
copy .env.example .env
npm run dev
```

The backend runs on `http://localhost:5000`.

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Documentation

- [Backend docs](backend/DOCUMENTATION.md)
- [Frontend docs](frontend/DOCUMENTATION.md)

## Environment Variables

Backend `.env` example:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/bpit_results
JWT_SECRET=change_this_secret
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

Frontend `.env` example:

```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=BPIT Results Portal
VITE_APP_VERSION=1.0.0
```

## API Overview

Base URL: `http://localhost:5000/api`

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `GET /students/profile`
- `GET /admin/students`
- `POST /admin/students`
- `GET /results/my-results`
- `GET /results/search/:enrollmentNumber`
- `GET /admin/results`
- `POST /admin/results`
- `GET /admin/analytics`

## Notes

- Students can view their own results and profile.
- Admins can manage students, results, and analytics.
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
