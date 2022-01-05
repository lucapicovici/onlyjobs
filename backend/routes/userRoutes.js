import express from 'express';
const router = express.Router();
import { authUser, registerUser, getUsers } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/')
  .post(registerUser)
  .get(protect, admin, getUsers);

router.route('/login').post(authUser);

export default router;