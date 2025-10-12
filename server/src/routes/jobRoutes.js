import express from "express";
import { jobRepository } from "../repositories/jobRepository.js";
import { authenticateToken } from '../middlewears/authMiddlewear.js';
import { addJob } from '../controllers/jobController.js';

const router = express.Router();

// POST /api/jobs/add - Add a job for the logged-in company (using controller)
router.post('/add', authenticateToken, addJob);

// GET all jobs
router.get("/", async (req, res) => {
  try {
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new job (using repository)
router.post("/", async (req, res) => {
  try {
    const jobId = await jobRepository.createJob(req.body);
    res.status(201).json({ message: "Job created successfully", jobId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET single job by ID - must be last to avoid conflicts
router.get("/:id", async (req, res) => {
  try {
    const job = await jobRepository.getJobById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
