import express from 'express';
const router = express.Router();
import { getBusinesses, getBusinessById } from '../controllers/businessController.js';

router.route('/').get(getBusinesses);

router.route('/:id').get(getBusinessById);

export default router;