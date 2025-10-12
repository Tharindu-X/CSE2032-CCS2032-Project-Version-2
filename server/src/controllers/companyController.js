import pool from '../config/db.js';

export const updateCompany = async (req, res) => {
  try {
    const companyId = req.user.id; // from JWT
    const {
      com_name,
      email,
      bussiness_type,
      url,
      bio,
      contact_no,
      address,
      no_of_employees,
      image,
      status
    } = req.body;

    const fields = [];
    const values = [];

    if (com_name !== undefined) { fields.push('com_name = ?'); values.push(com_name); }
    if (email !== undefined) { fields.push('email = ?'); values.push(email); }
    if (bussiness_type !== undefined) { fields.push('bussiness_type = ?'); values.push(bussiness_type); }
    if (url !== undefined) { fields.push('url = ?'); values.push(url); }
    if (bio !== undefined) { fields.push('bio = ?'); values.push(bio); }
    if (contact_no !== undefined) { fields.push('contact_no = ?'); values.push(contact_no); }
    if (address !== undefined) { fields.push('address = ?'); values.push(address); }
    if (no_of_employees !== undefined) { fields.push('no_of_employees = ?'); values.push(no_of_employees); }
    if (image !== undefined) { fields.push('image = ?'); values.push(image); }
    if (status !== undefined) { fields.push('status = ?'); values.push(status); }

    if (fields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    const sql = `UPDATE company SET ${fields.join(', ')} WHERE id = ?`;
    values.push(companyId);

    const [result] = await pool.execute(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json({ message: 'Company updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
