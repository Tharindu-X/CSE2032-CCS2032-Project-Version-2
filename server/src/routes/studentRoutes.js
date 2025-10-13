import express from "express";
import * as studentController from "../controllers/studentController.js";

const { 
  updateStudent, 
  getStudent, 
  getStudentStats, 
  getCountFollowedCompanies, 
  getRecentApplications, 
  getStudentApplications, 
  getSreachResults,
  getStudentSettings
} = studentController;

const router = express.Router();

// Place specific routes before parameterized ones to avoid shadowing
// Search routes
router.get("/search/results", getSreachResults);


// Student dashboard routes
router.get("/:email/stats", getStudentStats);
router.get("/:email/companies-followed", getCountFollowedCompanies);
router.get("/:email/applications/recent", getRecentApplications);
router.get("/:email/applications", getStudentApplications);
router.get("/:email/settings", getStudentSettings);

// Student profile routes
router.get("/:email", getStudent);
router.put("/:email", updateStudent);

export default router;
