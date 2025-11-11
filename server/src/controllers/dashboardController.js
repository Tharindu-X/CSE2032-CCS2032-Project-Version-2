import db from '../config/db.js';
import { JobRepository } from '../repositories/jobRepository.js';

// Get company dashboard info
export const getCompanyDashboard = async (req, res) => {
  try {
    const companyId = req.user?.id; // from JWT
    if (!companyId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Fetch company from DB
    const [companyRows] = await db.query(
      `SELECT id, com_name, bussiness_type, image, bio, contact_no, address, no_of_employees, status
       FROM company WHERE id = ? AND isDeleted = 0`,
      [companyId]
    );

    if (!companyRows || companyRows.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const companyRow = companyRows[0];
    const companyData = {
      id: companyRow.id,
      name: companyRow.com_name,
      type: companyRow.bussiness_type,
      logo: companyRow.image || '/generic-company-logo.png',
      bio: companyRow.bio || '',
      contact_no: companyRow.contact_no || '',
      address: companyRow.address || '',
      no_of_employees: companyRow.no_of_employees || 0,
      status: companyRow.status, // 0=pending,1=active
    };

    // Fetch jobs for this company from DB
    const jobs = await JobRepository.getJobsByCompanyId(companyId);

    // Basic analytics derived from DB jobs
    const analytics = {
      activeJobs: jobs.length,
      totalApplications: jobs.reduce((sum, j) => sum + Number(j.no_of_applicants || 0), 0),
      profileViews: 0,
      avgResponseTime: '0h',
      changes: { activeJobs: '+0%', totalApplications: '+0%', profileViews: '+0%', avgResponseTime: '+0%' }
    };

    res.json({ company: companyData, jobs, analytics });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get a single job and all its applications
export const getJobApplications = async (req, res) => {
  const { jobId } = req.params;

  try {
    // First, get the job details
    const [jobDetails] = await db.query(
      `
      SELECT 
        j.job_id,
        j.job_title,
        j.com_id,
        c.com_name
      FROM job j
      JOIN company c ON j.com_id = c.id
      WHERE j.job_id = ?
      `,
      [jobId]
    );

    if (jobDetails.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const job = jobDetails[0];

    // Then get all applications
    const [applications] = await db.query(
      `
      SELECT 
        a.application_id, 
        a.student_id, 
        a.job_id, 
        a.status, 
        a.application_date AS applied_date,
        s.f_name, 
        s.l_name, 
        s.year, 
        s.email, 
        s.dgree, 
        s.dep_name, 
        s.reg_no,
        s.linkedin_url
      FROM application a
      JOIN student s ON a.student_id = s.id
      WHERE a.job_id = ?
      ORDER BY a.application_date DESC
      `,
      [jobId]
    );

    // Return job details along with applications
    res.json({
      job: {
        job_id: job.job_id,
        job_title: job.job_title,
        com_name: job.com_name
      },
      applications: applications
    });
  } catch (error) {
    console.error('Error fetching job applications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update application status (approve/reject)
export const updateApplicationStatus = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  // Validate status
  const validStatuses = ['pending', 'approved', 'rejected', 'interview', 'selected'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status. Must be one of: pending, approved, rejected, interview, selected' });
  }

  try {
    const [result] = await db.execute(
      'UPDATE application SET status = ? WHERE application_id = ?',
      [status, applicationId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ message: 'Application status updated successfully', status });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};