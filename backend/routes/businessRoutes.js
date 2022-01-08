import express from 'express';
const router = express.Router();
import { getBusinesses } from '../controllers/businessController.js';

router.route('/').get(getBusinesses);

export default router;