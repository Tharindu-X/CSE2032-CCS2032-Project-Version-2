// src/types/job.ts

export interface Job {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
  date: string;
  applicants: number;
  description: string;
  requirements: string[];
  responsibilities: string[];
}


// Company data is now fetched from the backend API
// See: frontend/src/services/api/companyService.js