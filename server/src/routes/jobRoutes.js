import express from 'express';
import { authenticateToken } from '../middlewears/authMiddlewear.js';
import { addJob } from '../controllers/jobController.js';

const router = express.Router();

// POST /api/jobs/add - Add a job for the logged-in company
router.post('/add', authenticateToken, addJob);

export default router;
