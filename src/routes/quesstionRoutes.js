import { Router } from 'express';
import {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  upvoteQuestion,
  downvoteQuestion,
} from '../controllers/questionsController.js';
import { protect, questionOwner } from '../middlewares/authMiddleware.js';

const router = Router();

router.route('/').get(getQuestions).post(protect, createQuestion);

router
  .route('/:slug')
  .get(getQuestion)
  .patch(protect, questionOwner, updateQuestion)
  .delete(protect, questionOwner, deleteQuestion);

router.put('/:slug/upvote', protect, upvoteQuestion);

router.put('/:slug/downvote', protect, downvoteQuestion);

export default router;
