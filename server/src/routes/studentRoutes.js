import express from "express";
import studentController from "../controllers/studentController.js";

const { updateStudent, getStudent, getStudentStats, getCountFollowedCompanies, getRecentApplications, getStudentApplications, getSreachResults } = studentController;

const router = express.Router();

router.get("/:email", getStudent);
//router.get("/api/student/:email/stats", getStudentStats);
//router.get("/api/student/:email/companies-followed", getCountFollowedCompanies);
router.get("/api/applications/recent/:email", getRecentApplications);
router.get("/api/applications/:email", getStudentApplications);


export default router;
