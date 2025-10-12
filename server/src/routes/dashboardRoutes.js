import express from 'express';
import { authenticateToken } from '../middlewears/authMiddlewear.js';
import { getCompanyDashboard } from '../controllers/dashboardController.js';

const router = express.Router();

// GET dashboard for the logged-in company (ID comes from JWT)
router.get('/dashboard', authenticateToken, getCompanyDashboard);

export default router;
