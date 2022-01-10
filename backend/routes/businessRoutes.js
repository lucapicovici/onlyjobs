import express from 'express';
const router = express.Router();
import { getBusinesses, getBusinessByUserId } from '../controllers/businessController.js';

router.route('/').get(getBusinesses);

router.route('/:userId').get(getBusinessByUserId);

export default router;