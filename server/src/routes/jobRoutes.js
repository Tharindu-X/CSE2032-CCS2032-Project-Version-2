import express from "express";
import { jobRepository } from "../repositories/jobRepository.js";

const router = express.Router();

// GET all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await jobRepository.getAllJobs();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single job by ID
router.get("/:id", async (req, res) => {
  try {
    const job = await jobRepository.getJobById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new job
router.post("/", async (req, res) => {
  try {
    const jobId = await jobRepository.createJob(req.body);
    res.status(201).json({ message: "Job created successfully", jobId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
