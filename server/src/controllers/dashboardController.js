import db from '../config/db.js';
import { jobStore } from '../stores/jobStore.js';

// Get company dashboard info
export const getCompanyDashboard = async (req, res) => {
  try {
    const companyId = req.user?.id || '1'; // Use mock company ID if no user

    console.log('Fetching dashboard for company:', companyId);

    // Mock company data
    const companyData = {
      id: companyId,
      name: 'Test Company',
      type: 'Technology',
      logo: '/generic-company-logo.png',
      bio: 'A leading technology company specializing in innovative solutions.',
      contact_no: '+1-555-0123',
      address: '123 Tech Street, Silicon Valley, CA',
      no_of_employees: 150,
      image: '/company-image.jpg'
    };

    // Get jobs posted by this company from job store
    const companyJobs = Array.from(jobStore.values()).filter(job => job.com_id === companyId);

    // Mock analytics based on actual posted jobs
    const analytics = {
      activeJobs: companyJobs.length,
      totalApplications: companyJobs.reduce((sum, j) => sum + parseInt(j.no_of_applicants || 0), 0),
      profileViews: 1250,
      avgResponseTime: "2 days",
      changes: {
        activeJobs: companyJobs.length > 0 ? "+12%" : "+0%",
        totalApplications: companyJobs.length > 0 ? "+8%" : "+0%",
        profileViews: "+15%",
        avgResponseTime: "-1 day"
      }
    };

    res.json({
      company: companyData,
      jobs: companyJobs, // Only show jobs posted by this company
      analytics
    });

  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get a single job and all its applications
export const getJobApplications = async (req, res) => {
  const { jobId } = req.params;

  try {
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
        s.reg_no
      FROM application a
      JOIN student s ON a.student_id = s.id
      WHERE a.job_id = ?
      `,
      [jobId]
    );

    // Return empty array if no applications
    res.json(applications); // this will be [] if no rows
  } catch (error) {
    console.error('Error fetching job applications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};