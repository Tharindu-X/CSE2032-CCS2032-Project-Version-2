import React, { useState } from "react";
import JobCard from "../../../../components/cards/jobCard/JobCard";
import JobDetail from "../jobDetails/JobDetails";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  date: string;
  description: string;
  applicants: number;
  requirements: string[];
  responsibilities: string[];
}

interface JobListingsProps {
  jobs: Job[];
}

const JobListings: React.FC<JobListingsProps> = ({ jobs }) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [sortBy, setSortBy] = useState<"recent" | "applicants">("recent");

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const handleCloseDetails = () => {
    setSelectedJob(null);
  };

  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.applicants - a.applicants;
    }
  });

  if (selectedJob) {
    return <JobDetail job={selectedJob} onClose={handleCloseDetails} />;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Job Listings</h2>
          <p className="text-gray-500 text-sm mt-1">{jobs.length} jobs found</p>
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "recent" | "applicants")}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-700"
        >
          <option value="recent">Most Recent</option>
          <option value="applicants">Most Applicants</option>
        </select>
      </div>

      {/* Job Cards */}
      <div className="p-6 space-y-4">
        {sortedJobs.length > 0 ? (
          sortedJobs.map((job) => (
            <JobCard key={job.id} job={job} onViewDetails={handleViewDetails} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No jobs found matching your filters
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListings;
