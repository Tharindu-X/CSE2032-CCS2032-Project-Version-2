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


// sampleData for company.ts
// sampleData for company.ts
import type { CompanyCardProps } from '../components/cards/companyCard/CompanyCard';

export const sampleCompanies: CompanyCardProps[] = [
  {
    id: '1',
    name: 'Virtusa',
    logo: 'VI',
    description: 'Virtusa is a US-based global digital engineering and IT consulting firm founded in 1996. Headquartered in Southborough, Massachusetts, it delivers digital transformation, AI, cloud, data analytics, and application services across industries like banking, healthcare, and telecom.',
    location: 'Colombo',
    employeeCount: 201,
    openPositions: 2,
    websiteUrl: 'https://virtusa.com',
    jobListings: [
      { title: 'Frontend Developer', type: 'Internship', location: 'Colombo' },
      { title: 'Finance Manager', type: 'Full-time', location: 'Colombo' }
    ]
  },
  {
    id: '2',
    name: 'Brandix',
    logo: 'BR',
    industry: 'Manufacturing',
    description: 'Brandix Apparel Limited, founded in Sri Lanka in 1969, is a major apparel manufacturer headquartered in Colombo. The company specializes in casualwear, intimates, active and sleepwear.',
    location: 'Colombo',
    employeeCount: 501,
    openPositions: 1,
    websiteUrl: 'https://brandix.com',
    jobListings: []
  },
  {
    id: '3',
    name: 'JohnKeels',
    logo: 'JO',
    industry: 'Retail',
    description: 'John Keells Holdings PLC, founded in 1870, is Sri Lanka\'s largest diversified conglomerate. Operating across leisure, transportation, retail, and IT sectors.',
    location: 'Colombo',
    employeeCount: 1000,
    openPositions: 1,
    websiteUrl: 'https://keells.com',
    jobListings: []
  }
];