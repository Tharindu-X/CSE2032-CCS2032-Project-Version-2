import express from 'express';
import { authenticateToken } from '../middlewears/authMiddlewear.js';
import { updateCompany } from '../controllers/companyController.js';

const router = express.Router();

router.patch('/update', authenticateToken, updateCompany);

export default router;
