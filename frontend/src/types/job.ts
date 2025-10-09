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
