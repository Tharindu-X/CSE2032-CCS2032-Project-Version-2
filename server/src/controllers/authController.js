import { StudentRepository } from '../repositories/studentRepository.js';
import { CompanyRepository } from '../repositories/companyRepository.js';
import bcrypt from 'bcrypt';

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
      return res.status(201).json({ message: 'Company registered', id });
    }

    res.status(400).json({ message: 'Invalid account type' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
