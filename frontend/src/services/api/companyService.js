import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const companyService = {
  // Get all companies
  getAllCompanies: async () => {
    const response = await api.get('/company');
    return response.data;
  },

  // Get approved companies
  getApprovedCompanies: async () => {
    const response = await api.get('/company/approved');
    return response.data;
  },

  // Get pending companies (status = 0)
  getPendingCompanies: async () => {
    const response = await api.get('/company/pending');
    return response.data;
  },

  // Get newly registered companies (status = 1)
  getNewlyRegisteredCompanies: async () => {
    const response = await api.get('/company/newly-registered');
    return response.data;
  },

  // Get company by ID
  getCompanyById: async (id) => {
    const response = await api.get(`/company/${id}`);
    return response.data;
  },

  // Approve company
  approveCompany: async (id) => {
    const response = await api.post(`/company/${id}/approve`);
    return response.data;
  },

  // Reject company
  rejectCompany: async (id) => {
    const response = await api.post(`/company/${id}/reject`);
    return response.data;
  },

  // Update company
  updateCompany: async (companyData) => {
    const response = await api.patch('/company/update', companyData);
    return response.data;
  },
};
