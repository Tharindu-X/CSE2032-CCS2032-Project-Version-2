import { StudentRepository } from '../repositories/studentRepository.js';
import { CompanyRepository } from '../repositories/companyRepository.js';
import { AdminRepository } from '../repositories/adminRepository.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

function isValidExpiresIn(value) {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (trimmed === '') return false;
  if (/^\d+$/.test(trimmed)) return true; // seconds
  if (/^\d+\s*[smhd]$/i.test(trimmed)) return true; // 10m, 2h, 7d, 30s
  return false;
}

function signToken(userId, role) {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET not set');
  }
  const payload = { id: userId, role };
  if (isValidExpiresIn(JWT_EXPIRES_IN)) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN.trim().replace(/\s+/g, '') });
  }
  return jwt.sign(payload, JWT_SECRET);
}

function normalizeEmail(email) {
  return typeof email === 'string' ? email.trim().toLowerCase() : email;
}

async function verifyPassword(storedPassword, inputPassword) {
  if (!storedPassword) return false;
  const isBcrypt = typeof storedPassword === 'string' && storedPassword.startsWith('$2');
  if (isBcrypt) {
    return bcrypt.compare(inputPassword, storedPassword);
  }
  // Fallback for legacy plaintext passwords in DB
  return storedPassword === inputPassword;
}

function coerceNumber(input) {
  if (input === null || input === undefined) return null;
  if (typeof input === 'number' && Number.isFinite(input)) return input;
  const str = String(input).trim();
  if (str === '') return null;
  if (/^\d+$/.test(str)) return Number(str);
  const match = str.match(/\d+/);
  return match ? Number(match[0]) : null;
}

export const registerUser = async (req, res) => {
  try {
    const { accountType } = req.body;
    
    if (!accountType) {
      return res.status(400).json({ message: 'Account type is required' });
    }

    const generateToken = (userId, role) => signToken(userId, role);

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
        year: coerceNumber(year),
        email: normalizeEmail(email),
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
        email: normalizeEmail(email),
        password: hashedPassword,
        bussiness_type,
        contact_no,
        address,
        no_of_employees: coerceNumber(no_of_employees)
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
    const message = err && err.code ? `${err.code}: ${err.message}` : err.message;
    res.status(500).json({ message: 'Server error', error: message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const generateToken = (userId, role) => signToken(userId, role);

    const normalizedEmail = normalizeEmail(email);
    console.log('Attempting login for email:', normalizedEmail);

    const student = await StudentRepository.findByEmail(normalizedEmail);
    if (student && await verifyPassword(student.password, password)) {
      console.log('Student login successful:', student.email);
      return res.json({ 
        role: 'student', 
        userId: student.id,
        email: student.email,
        name: `${student.f_name} ${student.l_name}`,
        token: generateToken(student.id, 'student') 
      });
    }

    const company = await CompanyRepository.findByEmail(normalizedEmail);
    if (company && await verifyPassword(company.password, password)) {
      console.log('Company login successful:', company.email);
      return res.json({ 
        role: 'company', 
        userId: company.id,
        email: company.email,
        name: company.com_name,
        token: generateToken(company.id, 'company') 
      });
    }

    const admin = await AdminRepository.findByEmail(normalizedEmail);
    if (admin && await verifyPassword(admin.password, password)) {
      console.log('Admin login successful:', admin.email);
      return res.json({ 
        role: 'admin', 
        userId: admin.id,
        email: admin.email,
        name: admin.admin_name || 'Admin',
        token: generateToken(admin.id, 'admin') 
      });
    }
    
    console.log('Login failed - invalid credentials for:', normalizedEmail);
    res.status(401).json({ message: 'Invalid email or password' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
