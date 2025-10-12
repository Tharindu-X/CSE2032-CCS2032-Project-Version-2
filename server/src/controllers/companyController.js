import { CompanyRepository } from '../repositories/companyRepository.js';

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await CompanyRepository.findAll();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await CompanyRepository.findById(id);
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    res.json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getApprovedCompanies = async (req, res) => {
  try {
    const companies = await CompanyRepository.findApproved();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching approved companies:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getActiveCompanies = async (req, res) => {
  try {
    const companies = await CompanyRepository.findActive();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching active companies:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
