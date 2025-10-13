import express from "express";
import studentController from "../controllers/studentController.js";

const { updateStudent, getStudent, deleteStudent, getAllStudents, getAllStudentEmails } = studentController;

const router = express.Router();

router.get("/:email", getStudent);

export default router;
