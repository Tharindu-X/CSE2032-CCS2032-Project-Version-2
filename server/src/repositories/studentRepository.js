import pool from '../config/db.js';

export const StudentRepository = {
  async create(studentData) {
    const sql = `
      INSERT INTO student 
      (f_name, l_name, year, email, password, dgree, dep_name, reg_no, linkedin_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    ];
    const [result] = await pool.execute(sql, values);
    return result.insertId;
  },
  async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM student WHERE email = ?', [email]);
    return rows[0] || null;
  }
};
