import express from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getAllResults,
  createResult,
  updateResult,
  deleteResult,
  publishResult,
  getAnalytics
} from '../controllers/admin.controller.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Protect all admin routes
router.use(protect);
router.use(authorize('admin'));

// Student management
router.route('/students')
  .get(getAllStudents)
  .post(createStudent);

router.route('/students/:id')
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

// Result management
router.route('/results')
  .get(getAllResults)
  .post(createResult);

router.route('/results/:id')
  .put(updateResult)
  .delete(deleteResult);

router.put('/results/:id/publish', publishResult);

// Analytics
router.get('/analytics', getAnalytics);

export default router;
