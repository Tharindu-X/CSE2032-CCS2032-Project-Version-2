import db from "../config/db.js"; // your database connection

export const JobRepository = {
  async getJobsByCompanyId(com_id) {
    const [jobs] = await db.query(
      `
      SELECT j.*, 
             COUNT(a.application_id) AS no_of_applicants
      FROM job j
      LEFT JOIN application a ON j.job_id = a.job_id
      WHERE j.com_id = ?
      GROUP BY j.job_id
      ORDER BY j.created_at DESC
      `,
      [com_id]
    );

    return jobs;
  }
};
