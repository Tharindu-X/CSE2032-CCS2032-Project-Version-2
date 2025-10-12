import { StudentRepository } from '../repositories/studentRepository.js';
import { CompanyRepository } from '../repositories/companyRepository.js';
import { AdminRepository } from '../repositories/adminRepository.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export const registerUser = async (req, res) => {
  try {
    const { accountType } = req.body;

    if (accountType === 'student') {
      const {
        f_name,
        l_name,
        year,
        email,
        password,
        dgree,
        dep_name,
        reg_no,
        linkedin_url
      } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const studentData = {
        f_name,
        l_name,
        year,
        email,
        password: hashedPassword,
        dgree,
        dep_name,
        reg_no,
        linkedin_url
      };

      const id = await StudentRepository.create(studentData);
      return res.status(201).json({ message: 'Student registered', id });
    }

    if (accountType === 'company') {
      const {
        com_name,
        reg_no,
        email,
        password,
        bussiness_type,
        contact_no,
        address,
        no_of_employees,url
      } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const companyData = {
        com_name,
        reg_no,
        email,
        password: hashedPassword,
        bussiness_type,
        contact_no,
        address,
        no_of_employees,
          url 
      };

      const id = await CompanyRepository.create(companyData);
      return res.status(201).json({ message: 'Company registered', id });
    }

    res.status(400).json({ message: 'Invalid account type' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const generateToken = (userId, role) => jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    const student = await StudentRepository.findByEmail(email);
    if (student && await bcrypt.compare(password, student.password)) {
      return res.json({ role: 'student', user: student, token: generateToken(student.id, 'student') });
    }

    const company = await CompanyRepository.findByEmail(email);
    if (company && await bcrypt.compare(password, company.password)) {
      return res.json({ role: 'company', user: company, token: generateToken(company.id, 'company') });
    }

    const admin = await AdminRepository.findByEmail(email);
    if (admin && await bcrypt.compare(password, admin.password)) {
      return res.json({ role: 'admin', user: admin, token: generateToken(admin.id, 'admin') });
    }
    res.status(401).json({ message: 'Invalid email or password' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
