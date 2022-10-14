import { Router } from 'express';
import {
  getQuestions,
  getQuestion,
  createQuestion,
} from '../controllers/questionsController.js';

const router = Router();

router.route('/').get(getQuestions).post(createQuestion);

router.route('/:slug').get(getQuestion);

export default router;
