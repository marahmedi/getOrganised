// authRoutes.ts
import express, { Router } from 'express';
import { loginUser, newUser, isVerified } from '../controllers/authController';

const validInfo = require("../middleware/validInfo")
const authorization = require("../middleware/authorization");

const router: Router = express.Router();

// POST route for user login
router.post('/login',validInfo, loginUser);

// POST route for user signup
router.post('/signup',validInfo, newUser);

//GET route to verify user with token
router.get('/is-verify',authorization, isVerified)

export default router;
