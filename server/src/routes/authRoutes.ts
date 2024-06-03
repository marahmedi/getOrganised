// authRoutes.ts
import express, { Router } from 'express';
import { loginUser, newUser, isVerified, getUserInfo } from '../controllers/authController';

const validInfo = require("../middleware/validInfo")
const authorization = require("../middleware/authorization");

const router: Router = express.Router();

// POST route for user login
router.post('/login',validInfo, loginUser);

// POST route for user signup
router.post('/signup',validInfo, newUser);

//GET route to verify user with token
router.post('/is-verify',authorization, isVerified)

// GET route to fetch user info
router.get('/user-info', authorization, getUserInfo);

export default router;
