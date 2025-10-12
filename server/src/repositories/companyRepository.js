import pool from '../config/db.js';

export const CompanyRepository = {
  async create(companyData) {
    const sql = `
      INSERT INTO company 
      (com_name, reg_no, email, password, bussiness_type, contact_no, address, no_of_employees, url, bio, image, status, isDeleted)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      companyData.com_name,
      companyData.reg_no,
      companyData.email,
      companyData.password,
      companyData.bussiness_type,
      companyData.contact_no,
      companyData.address,
      companyData.no_of_employees,
      companyData.url,
      companyData.bio || '',
      companyData.image || '',
      companyData.status === 'active' ? 1 : 0,
      companyData.isDeleted ?? 0
    ];

    const [result] = await pool.execute(sql, values);
    return result.insertId;
  },

  async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM company WHERE email = ?', [email]);
    return rows[0] || null;
  }
};
