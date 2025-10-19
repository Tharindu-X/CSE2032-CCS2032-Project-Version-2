import React, { useEffect, useState } from "react";
import { Briefcase, Grid, Building2 } from "lucide-react";
import SearchBar from "../../../components/common/searchbar/Searchbar";
import JobListings from "./jobListening/JobListening";
import CategoryGrid from "../category/Category";
import CompanyCardGrid from "../companies/Companies";
import type { CompanyCardProps } from "../../../components/cards/companyCard/CompanyCard";

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

// Database company interface (matches MySQL)
interface DBCompany {
  id: number;
  com_name: string;
  reg_no: string;
  email: string;
  bussiness_type: string;
  url: string;
  bio: string;
  contact_no: string;
  address: string;
  no_of_employees: number;
  image: string;
  status: string;
  isDeleted: number;
}

const JobPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"jobs" | "categories" | "companies">("jobs");
  const [jobs, setJobs] = useState<DBJob[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<DBJob[]>([]);
  const [companies, setCompanies] = useState<CompanyCardProps[]>([]);
  const [loading, setLoading] = useState(false);
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

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/company/approved");
      const data = await res.json();

      console.log("Fetched companies:", data);

      if (Array.isArray(data)) {
        // Transform database companies to CompanyCard format
        const transformedCompanies: CompanyCardProps[] = data.map((company: DBCompany) => ({
          id: company.id.toString(),
          name: company.com_name,
          logo: company.com_name.substring(0, 2).toUpperCase(),
          industry: company.bussiness_type,
          description: company.bio || 'No description available',
          location: company.address,
          employeeCount: company.no_of_employees,
          openPositions: 0, // This would need to be fetched separately from jobs table
          websiteUrl: company.url,
          jobListings: [] // This would need to be fetched separately from jobs table
        }));
        setCompanies(transformedCompanies);
      } else {
        console.error("API did not return an array:", data);
        setCompanies([]);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  fetchJobs();
  fetchCompanies();
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
          {activeTab === "companies" && (
            loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-gray-600">Loading companies...</div>
              </div>
            ) : (
              <CompanyCardGrid companies={companies} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPage;
