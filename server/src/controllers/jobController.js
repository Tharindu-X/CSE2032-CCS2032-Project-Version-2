import { jobRepository } from "../repositories/jobRepository.js";
import db from '../config/db.js';
import { jobStore } from '../stores/jobStore.js';

export const getAllJobs = async (req, res) => {
  try {
    // Return jobs from our job store instead of repository
    const jobs = Array.from(jobStore.values());
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const addJob = async (req, res) => {
  try {
    const companyId = req.user?.id || '1'; // Use mock company ID if no user

    const {
      job_title,
      job_type,
      job_location,
      job_description,
      job_category,
      requirements,
      responsibilities,
      job_tags,
      closing_date
    } = req.body;

    // Validate required fields
    if (!job_title || !job_type || !job_location || !job_description || !job_category || !closing_date) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Create job object
    const jobId = Date.now().toString(); // Simple ID generation
    const job = {
      job_id: jobId,
      com_id: companyId,
      job_title,
      job_type,
      job_location,
      job_description,
      job_category,
      requirements: requirements || '',
      responsibilities: responsibilities || '',
      job_tags: job_tags || '',
      closing_date,
      created_at: new Date().toISOString().split('T')[0],
      no_of_applicants: 0,
      total_applications: 0
    };

    // Store job in memory
    jobStore.set(jobId, job);

    console.log('Job created and stored:', {
      jobId,
      companyId,
      job_title,
      job_type,
      job_location,
      job_category
    });

    return res.status(201).json({ 
      message: 'Job added successfully', 
      jobId: jobId
    });
  } catch (err) {
    console.error('Job creation error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};