import express from 'express';
import { authenticateToken } from '../middlewears/authMiddlewear.js';
import { getCompanyDashboard } from '../controllers/dashboardController.js';
import {  updateCompany } from '../controllers/companyController.js';

const router = express.Router();

// GET dashboard for the logged-in company (ID comes from JWT)
// router.get('/dashboard', authenticateToken, getCompanyDashboard);
// router.get('/update', authenticateToken,updateCompany);

export default router;
