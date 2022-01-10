import express from 'express';
const router = express.Router();
import { getBusinesses, getBusinessByUserId, studentApplyForInternship } from '../controllers/businessController.js';

router.route('/').get(getBusinesses);

router.route('/:userId').get(getBusinessByUserId);

router.route('/apply/:studentId').post(studentApplyForInternship);

export default router;