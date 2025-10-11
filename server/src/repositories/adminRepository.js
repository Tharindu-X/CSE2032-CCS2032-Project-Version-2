// server/src/repositories/adminRepository.js
import pool from '../config/db.js';

export const AdminRepository = {
  async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM admin WHERE email = ?', [email]);
    return rows[0] || null;
  }
};
