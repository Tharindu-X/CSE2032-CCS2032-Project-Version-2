import React from 'react';
import { MapPin, Calendar, Users, Eye } from 'lucide-react';
import { type Job } from "./../../../types/job";
import CompanyCard from '../companyCard/CompanyCard';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails }) => {
  // Generate a color based on company name for consistency
  const getCompanyColor = (company: string) => {
    const colors = [
      'bg-purple-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500'
    ];
    const index = company.length % colors.length;
    return colors[index];
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time':
        return 'bg-blue-100 text-blue-700';
      case 'part-time':
        return 'bg-green-100 text-green-700';
      case 'internship':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          {/* Company Logo */}
          <div className={`${getCompanyColor(job.company)} w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
            {job.company.charAt(0).toUpperCase()}
          </div>
          
          {/* Job Info */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl  font-montserrat font-bold text-gray-800">{job.title}</h3>
              <span className={`${getTypeBadgeColor(job.type)} px-3 py-1 rounded-full text-xs font-medium`}>
                {job.type}
              </span>
            </div>
            
            <p className=" font-montserrat text-gray-700 font-medium mb-2">{job.company}</p>
            
            <div className="flex items-center gap-4 text-sm font-montserrat text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{new Date(job.date).toISOString().split("T")[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className=" font-montserrat text-gray-600 text-sm mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2 font-montserrat text-gray-500 text-sm">
          <Users size={16} />
          <span>{job.applicants} applicants</span>
        </div>
        
        <button
          onClick={() => onViewDetails(job)}
          className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors font-medium"
        >
          <Eye size={18} />
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;