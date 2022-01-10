import express from 'express';
const router = express.Router();
import { getStudentByUserId, getStudents } from '../controllers/studentController.js';

router.route('/').get(getStudents);

router.route('/:userId').get(getStudentByUserId);

export default router;