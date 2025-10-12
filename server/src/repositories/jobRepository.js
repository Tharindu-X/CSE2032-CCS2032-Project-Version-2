import db from "../config/db.js";
import { Job } from "../models/jobModel.js";

export const jobRepository = {
  // Get all jobs
  getAllJobs: async () => {
  try {
    const [rows] = await db.query("SELECT * FROM job ORDER BY created_at DESC");
    return rows.map((row) => new Job(row));
  } catch (error) {
    throw error;
  }
},


  // Get job by ID
  getJobById: async (id) => {
  try {
    const [rows] = await db.query("SELECT * FROM job WHERE job_id = ?", [id]);
    return rows.length ? new Job(rows[0]) : null;
  } catch (error) {
    throw error;
  }
},


  // Add new job
 createJob: async (jobData) => {
  try {
    const sql = `
      INSERT INTO job (
        com_id, job_title, job_type, job_location, job_description,
        job_category, requirements, responsibilities, no_of_applicants,
        job_tags, closing_date, created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    const values = [
      jobData.com_id,
      jobData.job_title,
      jobData.job_type,
      jobData.job_location,
      jobData.job_description,
      jobData.job_category,
      jobData.requirements,
      jobData.responsibilities,
      jobData.no_of_applicants || 0,
      jobData.job_tags,
      jobData.closing_date,
    ];

    const [result] = await db.query(sql, values);
    return result.insertId;
  } catch (error) {
    throw error;
  }
},
};