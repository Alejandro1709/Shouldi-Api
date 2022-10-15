import { Router } from 'express';
import {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../controllers/questionsController.js';

const router = Router();

router.route('/').get(getQuestions).post(createQuestion);

router
  .route('/:slug')
  .get(getQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion);

export default router;
