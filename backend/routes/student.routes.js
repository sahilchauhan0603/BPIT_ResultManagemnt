import express from 'express';
import { getStudentProfile, updateStudentProfile } from '../controllers/student.controller.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(authorize('student'));

router.get('/profile', getStudentProfile);
router.put('/profile', updateStudentProfile);

export default router;
