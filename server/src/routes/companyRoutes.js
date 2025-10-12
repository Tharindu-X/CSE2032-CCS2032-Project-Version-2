import express from 'express';
import { getAllCompanies, getCompanyById, getApprovedCompanies, getActiveCompanies } from '../controllers/companyController.js';

const router = express.Router();

// Get all companies (for admin purposes)
router.get('/', getAllCompanies);

// Get approved companies only (for public display)
router.get('/approved', getApprovedCompanies);

// Get active companies (non-deleted, regardless of approval status)
router.get('/active', getActiveCompanies);

// Get company by ID (must be after specific routes)
router.get('/:id', getCompanyById);

export default router;
