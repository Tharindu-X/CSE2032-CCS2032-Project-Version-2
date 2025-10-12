import pool from '../config/db.js';

export const CompanyRepository = {
  async create(companyData) {
    const sql = `
      INSERT INTO company 
      (com_name, reg_no, email, password, bussiness_type, contact_no, address, no_of_employees)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      companyData.com_name,
      companyData.reg_no,
      companyData.email,
      companyData.password,
      companyData.bussiness_type,
      companyData.contact_no,
      companyData.address,
      companyData.no_of_employees
    ];

    const [result] = await pool.execute(sql, values);
    return result.insertId;
  },

  async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM company WHERE email = ?', [email]);
    return rows[0] || null;
  },

  async findAll() {
    const [rows] = await pool.execute(`
      SELECT 
        id,
        com_name,
        reg_no,
        email,
        bussiness_type,
        url,
        bio,
        contact_no,
        address,
        no_of_employees,
        image,
        status,
        isDeleted
      FROM company 
      WHERE isDeleted = 0
    `);
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.execute(`
      SELECT 
        id,
        com_name,
        reg_no,
        email,
        bussiness_type,
        url,
        bio,
        contact_no,
        address,
        no_of_employees,
        image,
        status,
        isDeleted
      FROM company 
      WHERE id = ? AND isDeleted = 0
    `, [id]);
    return rows[0] || null;
  },

  async findApproved() {
    const [rows] = await pool.execute(`
      SELECT 
        id,
        com_name,
        reg_no,
        email,
        bussiness_type,
        url,
        bio,
        contact_no,
        address,
        no_of_employees,
        image,
        status,
        isDeleted
      FROM company 
      WHERE status = 1 AND isDeleted = 0
    `);
    return rows;
  },

  async findActive() {
    const [rows] = await pool.execute(`
      SELECT 
        id,
        com_name,
        reg_no,
        email,
        bussiness_type,
        url,
        bio,
        contact_no,
        address,
        no_of_employees,
        image,
        status,
        isDeleted
      FROM company 
      WHERE isDeleted = 0
    `);
    return rows;
  }
};
