import express from 'express';
import { addJob, getCompanyDashboard, getJobApplications } from '../controllers/dashboardController.js';
import { authenticateToken } from '../middlewears/authMiddlewear.js';
import {  updateCompany } from '../controllers/companyController.js';

const router = express.Router();

router.post('/jobs', authenticateToken, addJob);
router.get('/dashboard', authenticateToken, getCompanyDashboard);
router.get('/jobs/:jobId/applications', authenticateToken, getJobApplications);
router.patch('/update', authenticateToken,updateCompany);

export default router;
