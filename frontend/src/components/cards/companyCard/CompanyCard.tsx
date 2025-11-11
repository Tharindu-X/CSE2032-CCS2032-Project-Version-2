// CompanyCard.tsx
import React, { useState, useEffect } from 'react';
import { MapPin, Users, Briefcase, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface JobListing {
  job_id: number;
  job_title: string;
  job_type: string;
  location: string;
}

export interface CompanyCardProps {
  id: string;
  name: string;
  logo: string;
  industry?: string;
  description: string;
  location: string;
  employeeCount: number;
  openPositions: number;
  websiteUrl?: string;
  jobListings?: JobListing[];
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  id,
  name,
  logo,
  industry,
  description,
  location,
  employeeCount,
  openPositions,
  websiteUrl,
  jobListings = []
}) => {
  const [showJobs, setShowJobs] = useState(false);
  const [jobs, setJobs] = useState<JobListing[]>(jobListings);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch jobs when "View Jobs" is clicked
  useEffect(() => {
    const fetchJobs = async () => {
      if (showJobs && jobs.length === 0) {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:5000/api/company/${id}/jobs`);
          setJobs(response.data.jobs || []);
        } catch (error) {
          console.error('Error fetching jobs:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchJobs();
  }, [showJobs, id, jobs.length]);

  const handleJobClick = (jobId: number) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-purple-600">{logo}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 text-center">{name}</h3>
          {industry && (
            <span className="mt-2 px-4 py-1 bg-yellow-400 text-xs font-semibold text-gray-800 rounded-full uppercase">
              {industry}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm text-center leading-relaxed mb-6 min-h-[120px]">
          {description}
        </p>

        {/* Info Section */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-700">
            <MapPin className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0" />
            <span className="text-sm font-medium">{location}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Users className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0" />
            <span className="text-sm font-medium">{employeeCount} employees</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Briefcase className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0" />
            <span className="text-sm font-medium">{openPositions} open positions</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {websiteUrl && (
            <button className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-purple-600 hover:text-purple-600 transition-colors duration-200 flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Website
            </button>
          )}
          <button 
            onClick={() => setShowJobs(!showJobs)}
            className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200"
          >
            {showJobs ? 'Hide Jobs' : `View Jobs${openPositions > 0 ? ` (${openPositions})` : ''}`}
          </button>
        </div>

        {/* Job Listings (Collapsible) */}
        {showJobs && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            {loading ? (
              <div className="text-center text-gray-500 py-4">Loading jobs...</div>
            ) : jobs.length > 0 ? (
              <div className="space-y-3">
                {jobs.map((job) => (
                  <div 
                    key={job.job_id} 
                    onClick={() => handleJobClick(job.job_id)}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-purple-50 hover:border-purple-300 border border-transparent transition-all cursor-pointer"
                  >
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">{job.job_title}</h4>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {job.job_type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-4">No jobs available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyCard;