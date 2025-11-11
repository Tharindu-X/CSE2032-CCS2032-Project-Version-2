import Student from "../models/studentModel.js";
import { StudentRepository } from "../repositories/studentRepository.js";
import HttpStatus from "../enums/httpStatus.js";

const student = new Student(null, null, null, null, null, null, null, null, null, null, null);

const getStudent = async (req, res) => {
  const email = req.params.email;
  student.email = email;
  
  // Validate email if wanted...
  /*
  const validateErrMsg = student.validateEmail(email);
  if (validateErrMsg)
    return res.status(HttpStatus.BAD_REQUEST).send(validateErrMsg);
 
*/

try {
    const result = await StudentRepository.findByEmail(email);
    if (!result) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "Student not found" });
    } 
    return res.status(HttpStatus.OK).json({ data: result });
    
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error ocurred" });
  }
};

const getStudentStats = async (req, res) => {
  const email = req.params.email;
  
  try {
    const stats = await StudentRepository.getStudentStats(email);
    return res.status(HttpStatus.OK).json({ 
      data: {
        total_applications: stats.total_applications,
        selected_for_interview: stats.selected_for_interview,
        companies_followed: stats.companies_followed
      }
    });
  } catch (error) {
    console.error('Error fetching student stats:', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
      message: "An error occurred while fetching student statistics" 
    });
  }
};

const getCountFollowedCompanies = async (req, res) => {
  const email = req.params.email;
  
  try {
    const count = await StudentRepository.getCountFollowedCompanies(email);
    return res.status(HttpStatus.OK).json({ 
      data: { count } 
    });
  } catch (error) {
    console.error('Error fetching followed companies count:', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
      message: "An error occurred while fetching followed companies count" 
    });
  }
};

const getRecentApplications = async (req, res) => {
  const email = req.params.email;
  const limit = req.query.limit ? parseInt(req.query.limit) : 5;
  
  try {
    const applications = await StudentRepository.getRecentApplications(email, limit);
    return res.status(HttpStatus.OK).json({ 
      data: applications 
    });
  } catch (error) {
    console.error('Error fetching recent applications:', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
      message: "An error occurred while fetching recent applications" 
    });
  }
};

const getStudentApplications = async (req, res) => {
  const email = req.params.email;
  
  try {
    const applications = await StudentRepository.getStudentApplications(email);
    return res.status(HttpStatus.OK).json({ 
      data: applications 
    });
  } catch (error) {
    console.error('Error fetching student applications:', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
      message: "An error occurred while fetching student applications" 
    });
  }
};

const getStudentSettings = async (req, res) => {
  const email = req.params.email;
  
  try {
    const settings = await StudentRepository.getSettingsByEmail(email);
    if (!settings) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Student not found' });
    }
    return res.status(HttpStatus.OK).json({ data: settings });
  } catch (error) {
    console.error('Error fetching student settings:', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
      message: 'An error occurred while fetching student settings' 
    });
  }
};

const applyForJob = async (req, res) => {
  try {
    const studentId = req.user?.id; // From JWT token
    const { jobId } = req.body;

    if (!studentId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Student not authenticated' });
    }

    if (!jobId) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Job ID is required' });
    }

    // Check if student has already applied
    const existingApplication = await StudentRepository.checkExistingApplication(studentId, jobId);
    if (existingApplication) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'You have already applied for this job' });
    }

    // Create new application
    await StudentRepository.createApplication(studentId, jobId);
    return res.status(HttpStatus.CREATED).json({ message: 'Application submitted successfully' });

  } catch (error) {
    console.error('Error applying for job:', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
      message: 'An error occurred while submitting your application' 
    });
  }
};

const updateStudent = async (req, res) => {
  // Implementation for updating student profile
  // This can be implemented later if needed
};

const getSreachResults = async (req, res) => {
  // Implementation for search results
  // This can be implemented later if needed
};


export {
  getStudent,
  getStudentStats,
  getCountFollowedCompanies,
  getRecentApplications,
  getStudentApplications,
  getStudentSettings,
  applyForJob,
  updateStudent,
  getSreachResults
};
