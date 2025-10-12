import db from '../config/db.js';

export const addJob = async (req, res) => {
  try {
    const companyId = req.user.id; // from JWT

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

    const sql = `
      INSERT INTO job 
      (com_id, job_title, job_type, job_location, job_description, job_category, requirements, responsibilities, job_tags, closing_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      companyId,
      job_title,
      job_type,
      job_location,
      job_description,
      job_category,
      requirements || '',
      responsibilities || '',
      job_tags || '',
      closing_date
    ];

    const [result] = await db.query(sql, values);

    return res.status(201).json({ 
      message: 'Job added successfully', 
      jobId: result.insertId 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
