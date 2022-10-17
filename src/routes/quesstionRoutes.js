import { Router } from 'express';
import {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../controllers/questionsController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.route('/').get(getQuestions).post(protect, createQuestion);

router
  .route('/:slug')
  .get(getQuestion)
  .patch(protect, updateQuestion)
  .delete(protect, deleteQuestion);

export default router;
