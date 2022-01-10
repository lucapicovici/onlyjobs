import express from 'express';
const router = express.Router();
import { getStudentByUserId, getStudents, studentApply } from '../controllers/studentController.js';

router.route('/').get(getStudents);

router.route('/:userId').get(getStudentByUserId);

router.route('/apply/:businessId').post(studentApply);

export default router;