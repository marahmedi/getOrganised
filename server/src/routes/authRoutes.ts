// authRoutes.ts

import express, { Router } from 'express';
import { loginUser } from '../controllers/authController';
import { newUser } from '../controllers/authController';

const router: Router = express.Router();

// POST route for user login
router.post('/login', loginUser);

// POST route for user signup
router.post('/signup', newUser);

export default router;
