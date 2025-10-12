import db from '../config/db.js';

export const getCompanyDashboard = async (req, res) => {
  try {
    // 1️⃣ Get company ID from JWT
    const companyId = req.user.id;

    // 2️⃣ Fetch company info
    const [companyRows] = await db.query(
      `SELECT 
         id, com_name, bussiness_type, url, bio, contact_no, address, no_of_employees, image
       FROM company 
       WHERE id = ?`,
      [companyId]
    );
    const company = companyRows[0];
    if (!company) return res.status(404).json({ message: 'Company not found' });

    const companyData = {
      id: company.id,
      name: company.com_name,
      type: company.bussiness_type,
      logo: company.url || '/generic-company-logo.png',
      bio: company.bio,
      contact_no: company.contact_no,
      address: company.address,
      no_of_employees: company.no_of_employees,
      image: company.image
    };

    // 3️⃣ Fetch all jobs with application counts
    const [jobs] = await db.query(
      `SELECT 
         j.job_id,
         j.com_id,
         j.job_title,
         j.job_type,
         j.job_location,
         j.job_description,
         j.job_category,
         j.requirements,
         j.responsibilities,
         j.no_of_applicants,
         j.job_tags,
         j.closing_date,
         j.created_at,
         COUNT(a.application_id) AS total_applications
       FROM job j
       LEFT JOIN application a ON j.job_id = a.job_id
       WHERE j.com_id = ?
       GROUP BY j.job_id`,
      [companyId]
    );

    // 4️⃣ Compute analytics
    const analytics = {
      activeJobs: jobs.length,
      totalApplications: jobs.reduce((sum, j) => sum + parseInt(j.total_applications || 0), 0),
      profileViews: 0,          // placeholder if you want to track views later
      avgResponseTime: "—",     // placeholder
      changes: {
        activeJobs: "+0%",
        totalApplications: "+0%",
        profileViews: "+0%",
        avgResponseTime: "+0%"
      }
    };

    // 5️⃣ Return JSON response
    res.json({
      company: companyData,
      jobs,
      analytics
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
