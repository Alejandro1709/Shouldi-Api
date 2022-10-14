import { Router } from 'express';
import {
  getQuestions,
  getQuestion,
} from '../controllers/questionsController.js';

const router = Router();

router.route('/').get(getQuestions);

router.route('/:slug').get(getQuestion);

export default router;
