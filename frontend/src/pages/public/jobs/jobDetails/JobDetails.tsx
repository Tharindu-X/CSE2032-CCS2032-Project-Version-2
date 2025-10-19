import React from 'react';
import { X, MapPin, Calendar, Users, Briefcase, CheckCircle2, ArrowLeft } from 'lucide-react';
import { type Job } from '../jobListening/JobListening';
import { useAuth } from '../../../../context/AuthContext';

interface JobDetailProps {
  job: Job;
  onClose: () => void;
}

const JobDetail: React.FC<JobDetailProps> = ({ job, onClose }) => {
  const { token, user } = useAuth();

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

  const handleApply = async () => {
    if (!token || !user || user.role !== 'student') {
      alert('Please login as a student to apply.');
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${job.id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        alert('Applied successfully');
        onClose();
      } else if (res.status === 409) {
        alert('You already applied to this job.');
      } else {
        alert(data?.message || 'Failed to apply');
      }
    } catch (err) {
      alert('Server error while applying');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b bg-gradient-to-r from-purple-50 to-blue-50">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4 font-medium"
        >
          <ArrowLeft size={20} />
          Back to Job Listings
        </button>
        
        <div className="flex items-start gap-4">
          {/* Company Logo */}
          <div className={`${getCompanyColor(job.company)} w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-2xl flex-shrink-0`}>
            {job.company.charAt(0).toUpperCase()}
          </div>
          
          {/* Job Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
              <span className={`${getTypeBadgeColor(job.type)} px-3 py-1 rounded-full text-sm font-medium`}>
                {job.type}
              </span>
            </div>
            
            <p className="text-xl text-gray-700 font-medium mb-3">{job.company}</p>
            
            <div className="flex items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>Posted: {job.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>{job.applicants} applicants</span>
              </div>
            </div>
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Description */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Briefcase size={20} className="text-purple-600" />
            Job Description
          </h2>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </div>

        {/* Requirements and Responsibilities Grid */}
        {(job.requirements.length > 0 || job.responsibilities.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Requirements */}
            {job.requirements.length > 0 && (
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-purple-600" />
                  Requirements
                </h3>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Responsibilities */}
            {job.responsibilities.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-blue-600" />
                  Responsibilities
                </h3>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Apply Button */}
        <div className="flex items-center justify-center pt-6">
          <button onClick={handleApply} className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;