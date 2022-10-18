import { Router } from 'express';
import { login, getProfile } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/me', protect, getProfile);
router.post('/login', login);

export default router;
