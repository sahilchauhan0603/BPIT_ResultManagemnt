import express from 'express';
import { 
  getMyResults, 
  getResultBySemester,
  searchResultByEnrollment 
} from '../controllers/result.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/search/:enrollmentNumber', searchResultByEnrollment);
router.use(protect);
router.get('/my-results', getMyResults);
router.get('/semester/:semester', getResultBySemester);

export default router;
