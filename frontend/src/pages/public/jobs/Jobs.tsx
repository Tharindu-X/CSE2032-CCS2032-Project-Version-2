import React, { useState } from "react";
import { Briefcase, Grid, Building2 } from "lucide-react";
import SearchBar from "../../../components/common/searchbar/Searchbar";
import JobListings from "./jobListening/JobListening";

// Mock data - will be replaced with Firebase data later
const mockJobs = [
  {
    id: "1",
    title: "Finance manager",
    company: "Virtusa",
    location: "Colombo",
    type: "Full-time",
    date: "7/18/2025",
    description: "This is the finance based accounting base job",
    applicants: 0,
    requirements: [],
    responsibilities: [],
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "Virtusa",
    location: "Colombo",
    type: "Internship",
    date: "6/30/2025",
    description:
      "Join our dynamic team to work on cutting-edge web applications using React and TypeScript.",
    applicants: 15,
    requirements: [
      "Proficiency in React and JavaScript",
      "Experience with TypeScript",
      "Knowledge of CSS and responsive design",
      "Understanding of version control (Git)",
    ],
    responsibilities: [
      "Develop user-facing features using React",
      "Collaborate with design team to implement UI/UX",
      "Write clean, maintainable code",
      "Participate in code reviews",
    ],
  },
  {
    id: "3",
    title: "Backend Developer",
    company: "TechCorp",
    location: "Remote",
    type: "Full-time",
    date: "7/15/2025",
    description:
      "Looking for an experienced backend developer to build scalable APIs.",
    applicants: 23,
    requirements: [
      "Strong knowledge of Node.js",
      "Experience with databases (SQL/NoSQL)",
      "RESTful API design",
      "Cloud platform experience (AWS/GCP)",
    ],
    responsibilities: [
      "Design and develop backend services",
      "Optimize database queries",
      "Implement security best practices",
      "Work with frontend team for integration",
    ],
  },
  {
    id: "4",
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Colombo",
    type: "Part-time",
    date: "7/20/2025",
    description:
      "Creative designer needed for exciting projects with modern design approaches.",
    applicants: 8,
    requirements: [
      "Proficiency in Figma/Adobe XD",
      "Strong portfolio",
      "Understanding of design principles",
      "Experience with user research",
    ],
    responsibilities: [
      "Create wireframes and prototypes",
      "Conduct user research",
      "Design intuitive interfaces",
      "Collaborate with development team",
    ],
  },
  {
    id: "5",
    title: "Data Analyst",
    company: "DataWorks",
    location: "Remote",
    type: "Full-time",
    date: "7/22/2025",
    description:
      "Analyze complex datasets and provide actionable insights for business decisions.",
    applicants: 12,
    requirements: [
      "Strong SQL skills",
      "Experience with Python/R",
      "Data visualization tools (Tableau/Power BI)",
      "Statistical analysis knowledge",
    ],
    responsibilities: [
      "Analyze business data",
      "Create reports and dashboards",
      "Identify trends and patterns",
      "Present findings to stakeholders",
    ],
  },
  {
    id: "6",
    title: "Marketing Intern",
    company: "Growth Agency",
    location: "Colombo",
    type: "Internship",
    date: "7/25/2025",
    description:
      "Great opportunity to learn digital marketing in a fast-paced environment.",
    applicants: 31,
    requirements: [
      "Interest in digital marketing",
      "Basic knowledge of social media",
      "Good communication skills",
      "Creative thinking",
    ],
    responsibilities: [
      "Assist in social media campaigns",
      "Create content for marketing",
      "Research market trends",
      "Support the marketing team",
    ],
  },
  {
    id: "7",
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Remote",
    type: "Full-time",
    date: "7/28/2025",
    description:
      "Manage cloud infrastructure and deployment pipelines for enterprise applications.",
    applicants: 7,
    requirements: [
      "Experience with Docker/Kubernetes",
      "CI/CD pipeline knowledge",
      "Cloud platforms (AWS/Azure)",
      "Linux system administration",
    ],
    responsibilities: [
      "Manage cloud infrastructure",
      "Automate deployment processes",
      "Monitor system performance",
      "Ensure security and compliance",
    ],
  },
];

const JobPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "jobs" | "categories" | "companies"
  >("jobs");
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [filters, setFilters] = useState({
    search: "",
    type: [] as string[],
    location: [] as string[],
  });

  const handleSearch = (searchTerm: string) => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
    applyFilters({ ...filters, search: searchTerm });
  };

  const handleFilterChange = (
    filterType: "type" | "location",
    value: string
  ) => {
    const currentFilters = filters[filterType];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter((item) => item !== value)
      : [...currentFilters, value];

    const updatedFilters = { ...filters, [filterType]: newFilters };
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const applyFilters = (currentFilters: typeof filters) => {
    let filtered = mockJobs;

    // Search filter
    if (currentFilters.search) {
      filtered = filtered.filter(
        (job) =>
          job.title
            .toLowerCase()
            .includes(currentFilters.search.toLowerCase()) ||
          job.company
            .toLowerCase()
            .includes(currentFilters.search.toLowerCase()) ||
          job.description
            .toLowerCase()
            .includes(currentFilters.search.toLowerCase())
      );
    }

    // Type filter
    if (currentFilters.type.length > 0) {
      filtered = filtered.filter((job) =>
        currentFilters.type.includes(job.type)
      );
    }

    // Location filter
    if (currentFilters.location.length > 0) {
      filtered = filtered.filter((job) =>
        currentFilters.location.includes(job.location)
      );
    }

    setFilteredJobs(filtered);
  };

  const clearAllFilters = () => {
    setFilters({ search: "", type: [], location: [] });
    setFilteredJobs(mockJobs);
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
            <div className="text-3xl font-bold">1000+</div>
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

      {/* ✅ Fixed Wave (Now Visible and Smooth Transition) */}
      <div className="relative w-full overflow-hidden leading-[2] rotate-180">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="block w-[calc(100%+1.3px)] h-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-gray-50"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-gray-50"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-gray-50"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="bg-gray-100 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tabs */}
          <div className="flex gap-4 mb-8 bg-white rounded-lg p-2 shadow-sm">
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

          {/* Content Area */}
          {activeTab === "jobs" && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Sidebar - Search & Filters */}
              <div className="lg:col-span-1">
                <SearchBar
                  onSearch={handleSearch}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={clearAllFilters}
                />
              </div>

              {/* Right Content - Job Listings */}
              <div className="lg:col-span-3">
                <JobListings jobs={filteredJobs} />
              </div>
            </div>
          )}

          {activeTab === "categories" && (
            <div className="bg-white rounded-lg p-8 shadow-sm text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Categories Coming Soon
              </h2>
              <p className="text-gray-600">Browse jobs by category</p>
            </div>
          )}

          {activeTab === "companies" && (
            <div className="bg-white rounded-lg p-8 shadow-sm text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Companies Coming Soon
              </h2>
              <p className="text-gray-600">Explore companies hiring now</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPage;
