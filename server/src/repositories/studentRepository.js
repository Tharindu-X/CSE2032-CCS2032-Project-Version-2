import pool from '../config/db.js';

export const StudentRepository = {
  async create(studentData) {
    const sql = `
      INSERT INTO student 
      (f_name, l_name, year, email, password, dgree, dep_name, reg_no, linkedin_url, CV)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      studentData.f_name,
      studentData.l_name,
      studentData.year,
      studentData.email,
      studentData.password,
      studentData.dgree,
      studentData.dep_name,
      studentData.reg_no,
      studentData.linkedin_url,
      studentData.CV || '',
    ];
    const [result] = await pool.execute(sql, values);
    return result.insertId;
  },
  
  async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM student WHERE email = ?', [email]);
    return rows[0] || null;
  },

  // Fetch settings/profile data for a student by email (exclude password)
  async getSettingsByEmail(email) {
    const [rows] = await pool.execute(
      `
        SELECT 
          f_name,
          l_name,
          year,
          email,
          dgree,
          dep_name,
          reg_no,
          linkedin_url,
          CV
        FROM student
        WHERE email = ?
      `,
      [email]
    );
    return rows[0] || null;
  },

  // Get student dashboard statistics
  async getStudentStats(email) {
    const [rows] = await pool.execute(`
      SELECT 
        COUNT(a.application_id) AS total_applications,
        COUNT(CASE WHEN a.status IN ('selected','interview') THEN 1 END) AS selected_for_interview,
        COUNT(DISTINCT j.com_id) AS companies_followed
      FROM student s
      LEFT JOIN application a ON s.id = a.student_id
      LEFT JOIN job j ON a.job_id = j.job_id
      WHERE s.email = ?
    `, [email]);
    return rows[0] || { total_applications: 0, selected_for_interview: 0, companies_followed: 0 };
  },

  // Get count of followed companies
  async getCountFollowedCompanies(email) {
    const [rows] = await pool.execute(`
      SELECT COUNT(DISTINCT j.com_id) AS count
      FROM student s
      LEFT JOIN application a ON s.id = a.student_id
      LEFT JOIN job j ON a.job_id = j.job_id
      WHERE s.email = ?
    `, [email]);
    return rows[0]?.count || 0;
  },

  // Get recent applications for a student
  async getRecentApplications(email, limit = 5) {
    const safeLimit = parseInt(limit) || 5;
    const [rows] = await pool.execute(`
      SELECT 
        a.application_id,
        a.application_date,
        a.status,
        j.job_title,
        c.com_name as company_name
      FROM student s
      JOIN application a ON s.id = a.student_id
      JOIN job j ON a.job_id = j.job_id
      JOIN company c ON j.com_id = c.id
      WHERE s.email = ?
      ORDER BY a.application_date DESC
      LIMIT ${safeLimit}
    `, [email]);
    return rows;
  },

  // Get all applications for a student
  async getStudentApplications(email) {
    const [rows] = await pool.execute(`
      SELECT 
        a.application_id,
        a.application_date,
        a.status,
        j.job_title,
        j.job_type,
        j.job_location,
        c.com_name as company_name,
        c.image as company_image
      FROM student s
      JOIN application a ON s.id = a.student_id
      JOIN job j ON a.job_id = j.job_id
      JOIN company c ON j.com_id = c.id
      WHERE s.email = ?
      ORDER BY a.application_date DESC
    `, [email]);
    return rows;
  },

  // Check if student has already applied for a job
  async checkExistingApplication(studentId, jobId) {
    const [rows] = await pool.execute(`
      SELECT application_id 
      FROM application 
      WHERE student_id = ? AND job_id = ?
    `, [studentId, jobId]);
    return rows[0] || null;
  },

  // Create a new job application
  async createApplication(studentId, jobId) {
    const sql = `
      INSERT INTO application (student_id, job_id, status, application_date)
      VALUES (?, ?, 'pending', NOW())
    `;
    const [result] = await pool.execute(sql, [studentId, jobId]);
    return result.insertId;
  }
};
