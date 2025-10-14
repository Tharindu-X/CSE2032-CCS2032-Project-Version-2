import { jobRepository } from "../repositories/jobRepository.js";
import db from '../config/db.js';
import { jobStore } from '../stores/jobStore.js';

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobRepository.getAllJobs();
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const addJob = async (req, res) => {
  try {
    const companyId = req.user?.id;

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
    if (!companyId || !job_title || !job_type || !job_location || !job_description || !job_category || !closing_date) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Normalize list fields to strings
    const requirementsStr = Array.isArray(requirements) ? requirements.join(', ') : (requirements || '');
    const responsibilitiesStr = Array.isArray(responsibilities) ? responsibilities.join(', ') : (responsibilities || '');
    const tagsStr = Array.isArray(job_tags) ? job_tags.join(',') : (job_tags || '');

    const jobData = {
      com_id: companyId,
      job_title,
      job_type,
      job_location,
      job_description,
      job_category,
      requirements: requirementsStr,
      responsibilities: responsibilitiesStr,
      no_of_applicants: 0,
      job_tags: tagsStr,
      closing_date
    };

    const jobId = await jobRepository.createJob(jobData);

    return res.status(201).json({ 
      message: 'Job created successfully',
      jobId
    });
  } catch (err) {
    console.error('Job creation error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const applyToJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const user = req.user;
    if (!user || user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can apply' });
    }
    const studentId = user.id;

    // Insert application
    await db.execute(
      `INSERT INTO application (job_id, student_id, application_date, status) VALUES (?, ?, NOW(), 'pending')`,
      [jobId, studentId]
    );

    // Increment applicant count (best-effort; ignore failure)
    try {
      await db.execute(`UPDATE job SET no_of_applicants = no_of_applicants + 1 WHERE job_id = ?`, [jobId]);
    } catch (_err) {}

    return res.status(201).json({ message: 'Application submitted' });
  } catch (err) {
    console.error('Apply to job error:', err);
    // Handle duplicate entry gracefully (already applied)
    if (err && err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Already applied' });
    }
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};