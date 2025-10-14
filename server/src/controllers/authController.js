import { StudentRepository } from '../repositories/studentRepository.js';
import { CompanyRepository } from '../repositories/companyRepository.js';
import { AdminRepository } from '../repositories/adminRepository.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export const registerUser = async (req, res) => {
  try {
    const { accountType } = req.body;
    
    if (!accountType) {
      return res.status(400).json({ message: 'Account type is required' });
    }

    const generateToken = (userId, role) => jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

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
      return res.status(201).json({ 
        message: 'Student registered', 
        userId: id,
        email: studentData.email,
        role: 'student',
        name: `${studentData.f_name} ${studentData.l_name}`,
        token: generateToken(id, 'student')
      });
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
        no_of_employees
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
        no_of_employees
      };

      const id = await CompanyRepository.create(companyData);
      return res.status(201).json({ 
        message: 'Company registered', 
        userId: id,
        email: companyData.email,
        role: 'company',
        name: companyData.com_name,
        token: generateToken(id, 'company')
      });
    }

    res.status(400).json({ message: 'Invalid account type' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const generateToken = (userId, role) => jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    console.log('Attempting login for email:', email);

    const student = await StudentRepository.findByEmail(email);
    if (student && await bcrypt.compare(password, student.password)) {
      console.log('Student login successful:', student.email);
      return res.json({ 
        role: 'student', 
        userId: student.id,
        email: student.email,
        name: `${student.f_name} ${student.l_name}`,
        token: generateToken(student.id, 'student') 
      });
    }

    const company = await CompanyRepository.findByEmail(email);
    if (company && await bcrypt.compare(password, company.password)) {
      console.log('Company login successful:', company.email);
      return res.json({ 
        role: 'company', 
        userId: company.id,
        email: company.email,
        name: company.com_name,
        token: generateToken(company.id, 'company') 
      });
    }

    const admin = await AdminRepository.findByEmail(email);
    if (admin && await bcrypt.compare(password, admin.password)) {
      console.log('Admin login successful:', admin.email);
      return res.json({ 
        role: 'admin', 
        userId: admin.id,
        email: admin.email,
        name: admin.name || 'Admin',
        token: generateToken(admin.id, 'admin') 
      });
    }
    
    console.log('Login failed - invalid credentials for:', email);
    res.status(401).json({ message: 'Invalid email or password' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
