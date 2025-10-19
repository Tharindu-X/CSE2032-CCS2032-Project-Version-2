import express from 'express';
import { getAllCompanies, getCompanyById, getApprovedCompanies, getActiveCompanies, updateCompany, getPendingCompanies, approveCompany } from '../controllers/companyController.js';
import { getCompanyDashboard, getJobApplications } from '../controllers/dashboardController.js';
import { authenticateToken } from '../middlewears/authMiddleware.js';

const router = express.Router();

// Protected routes (require authentication) - must come before /:id route
router.get('/dashboard', authenticateToken, getCompanyDashboard);
router.get('/jobs/:jobId/applications', authenticateToken, getJobApplications);
router.patch('/update', authenticateToken, updateCompany);

// CGU (admin) utilities - for simplicity, leave unprotected or protect as needed
router.get('/pending', getPendingCompanies);
router.post('/:id/approve', approveCompany);

// Public routes
// Get all companies (for admin purposes)
router.get('/', getAllCompanies);

// Get approved companies only (for public display)
router.get('/approved', getApprovedCompanies);

// Get active companies (non-deleted, regardless of approval status)
router.get('/active', getActiveCompanies);

// Get company by ID (must be after specific routes)
router.get('/:id', getCompanyById);

export default router;
