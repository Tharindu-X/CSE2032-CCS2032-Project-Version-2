import React, { useEffect, useState } from "react";
import { Briefcase, Grid, Building2 } from "lucide-react";
import SearchBar from "../../../components/common/searchbar/Searchbar";
import JobListings, { type Job as FrontendJob } from "./jobListening/JobListening";
import CategoryGrid from "../category/Category";
import CompanyCardGrid from "../companies/Companies";
import { sampleCompanies } from "../../../types/job";

// Database job interface (matches MySQL)
interface DBJob {
  job_id: number;
  com_id: number;
  job_title: string;
  job_type: string;
  job_location: string;
  job_description: string;
  job_category: string;
  requirements: string;
  responsibilities: string;
  no_of_applicants: number;
  job_tags: string;
  closing_date: string;
  created_at: string;
}

const JobPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"jobs" | "categories" | "companies">("jobs");
  const [jobs, setJobs] = useState<DBJob[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<DBJob[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    type: [] as string[],
    location: [] as string[],
  });

useEffect(() => {
  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/jobs");
      const data = await res.json();

      console.log("Fetched jobs:", data); // Check structure

      if (Array.isArray(data)) {
        // Pass raw data to JobListings component - it will handle the mapping
        setJobs(data);
        setFilteredJobs(data);
      } else {
        console.error("API did not return an array:", data);
        setJobs([]);
        setFilteredJobs([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    }
  };

  fetchJobs();
}, []);




  // 🔍 Search handler
  const handleSearch = (searchTerm: string) => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
    applyFilters({ ...filters, search: searchTerm });
  };

  // 🧩 Filter handler
  const handleFilterChange = (filterType: "type" | "location", value: string) => {
    const currentFilters = filters[filterType];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter((item) => item !== value)
      : [...currentFilters, value];

    const updatedFilters = { ...filters, [filterType]: newFilters };
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  // ⚙️ Apply filters
  const applyFilters = (currentFilters: typeof filters) => {
    let filtered = jobs;

    if (currentFilters.search) {
      const search = currentFilters.search.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          (job.job_title || "").toLowerCase().includes(search) ||
          (job.job_description || "").toLowerCase().includes(search)
      );
    }

    if (currentFilters.type.length > 0) {
      filtered = filtered.filter((job) => currentFilters.type.includes(job.job_type));
    }

    if (currentFilters.location.length > 0) {
      filtered = filtered.filter((job) => currentFilters.location.includes(job.job_location));
    }

    setFilteredJobs(filtered);
  };

  const clearAllFilters = () => {
    setFilters({ search: "", type: [], location: [] });
    setFilteredJobs(jobs);
  };

  return (
    <div className="min-h-screen relative bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] overflow-hidden">
      {/* Hero Section */}
      <div className="relative z-10 pt-16 pb-32 px-4 text-center text-white">
        <h1 className="text-6xl font-bold mb-6">Find Your Next Opportunity</h1>
        <p className="text-2xl mb-8 text-black/90 font-medium">
          Discover internships, part-time, and full-time
          <br />
          positions from top companies
        </p>

        <div className="flex justify-center gap-8 flex-wrap">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-8 py-4 border border-black/40">
            <div className="text-3xl font-bold">{jobs.length}</div>
            <div className="text-sm text-white/80">Active Jobs</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-8 py-4 border border-black/40">
            <div className="text-3xl font-bold">500+</div>
            <div className="text-sm text-white/80">Companies</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-8 py-4 border border-black/40">
            <div className="text-3xl font-bold">50K+</div>
            <div className="text-sm text-white/80">Job Seekers</div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="relative w-full overflow-hidden leading-[2] rotate-180">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="block w-[calc(100%+1.3px)] h-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28..."
            opacity=".25"
            className="fill-gray-50"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="bg-gray-100 pb-12 -pt-6 -mt-1">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tabs */}
          <div className="flex gap-4 mb-8 bg-white rounded-lg p-2 shadow-sm justify-center">
            <button
              onClick={() => setActiveTab("jobs")}
              className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === "jobs"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Briefcase size={20} />
              Job Listings
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === "categories"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Grid size={20} />
              Categories
            </button>
            <button
              onClick={() => setActiveTab("companies")}
              className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === "companies"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Building2 size={20} />
              Companies
            </button>
          </div>

          {/* Job Listings */}
          {activeTab === "jobs" && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <SearchBar
                  onSearch={handleSearch}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={clearAllFilters}
                />
              </div>

              <div className="lg:col-span-3">
                <JobListings jobs={filteredJobs} />
              </div>
            </div>
          )}

          {/* Other Tabs */}
          {activeTab === "categories" && <CategoryGrid />}
          {activeTab === "companies" && <CompanyCardGrid companies={sampleCompanies} />}
        </div>
      </div>
    </div>
  );
};

export default JobPage;
