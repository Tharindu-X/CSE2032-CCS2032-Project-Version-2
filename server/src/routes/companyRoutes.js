import express from 'express';
import { getAllCompanies, getCompanyById, getApprovedCompanies, getActiveCompanies, updateCompany } from '../controllers/companyController.js';
import { addJob, getCompanyDashboard, getJobApplications } from '../controllers/dashboardController.js';
import { authenticateToken } from '../middlewears/authMiddlewear.js';

const router = express.Router();

// Public routes
// Get all companies (for admin purposes)
router.get('/', getAllCompanies);

// Get approved companies only (for public display)
router.get('/approved', getApprovedCompanies);

// Get active companies (non-deleted, regardless of approval status)
router.get('/active', getActiveCompanies);

// Get company by ID (must be after specific routes)
router.get('/:id', getCompanyById);

// Protected routes (require authentication)
router.post('/jobs', authenticateToken, addJob);
router.get('/dashboard', authenticateToken, getCompanyDashboard);
router.get('/jobs/:jobId/applications', authenticateToken, getJobApplications);
router.patch('/update', authenticateToken, updateCompany);

export default router;
