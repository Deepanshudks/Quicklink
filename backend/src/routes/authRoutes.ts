import { Router } from 'express';
import { login, signup } from '../controllers/authController';

const router = Router();

// Routes
router.post('/signup', signup as any);
router.post('/login', login as any);

export default router;
