import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "./components/sidebar.tsx"
import { MetricCard } from "./components/metric-card.tsx"
import { JobPostingsSection } from "./components/job-postings-section.tsx"
import { Button } from "./components/ui/button.tsx"
import { FileText, Users, Eye, Clock, Download, Plus, User, LogOut } from "lucide-react"
import mockData from "./data/mock-data.json"
import { useAuth } from "../../../context/AuthContext";

export default function Dashboard() {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();
  const { logout } = useAuth();

useEffect(() => {
  const fetchDashboard = async () => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token"); // token saved after login
      const res = await fetch("http://localhost:5000/api/company/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) throw new Error("Failed to fetch dashboard");

      const data = await res.json();
      setData(data);
    } catch (err) {
      console.error("Error fetching dashboard:", err);
      // Optional: show error to user
    } finally {
      setIsLoading(false);
    }
  };

  fetchDashboard();
}, []);

  const company = data?.company || {
    name: "Loading...",
    type: "Loading...",
    logo: "/generic-company-logo.png",
    isLoading: true
  }

  const jobs = data?.jobs || []
  const totalApplications = jobs.reduce((sum: number, j: any) => sum + Number(j.no_of_applicants || 0), 0)

  const analytics = data?.analytics || {
    activeJobs: jobs.length,
    totalApplications: totalApplications,
    profileViews: 0,
    avgResponseTime: "0h",
    changes: { activeJobs: "+0%", totalApplications: "+0%", profileViews: "+0%", avgResponseTime: "+0%" }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar company={company} jobCount={jobs.length} applicationCount={totalApplications} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{`Dashboard Overview`}</h1>
              <p className="text-gray-500">Manage your job postings and track performance</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export Data
              </Button>
              {company.status === 1 && (
                <Link to="/company/post-job">
                  <Button className="gap-2 bg-purple-600 text-white hover:bg-purple-700">
                    <Plus className="w-4 h-4" />
                    Post New Job
                  </Button>
                </Link>
              )}
              {company.status === 0 && (
                <div className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium">
                  Pending Approval - Job posting disabled
                </div>
              )}
              <Link to="/company/dashboard/editCompanyProfile">
                <Button variant="ghost" className="p-2">
                  <User className="w-4 h-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Quick Overview</h2>
                <select className="border border-gray-300 rounded-md px-3 py-1">
                  <option>Last 30 days</option>
                  <option>Last 7 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard title="Active Jobs" value={analytics.activeJobs} description="Currently accepting applications" change={analytics.changes.activeJobs} icon={<FileText className="w-5 h-5 text-orange-600" />} />
                <MetricCard title="Total Applications" value={analytics.totalApplications} description="Across all job postings" change={analytics.changes.totalApplications} icon={<Users className="w-5 h-5 text-blue-600" />} />
                <MetricCard title="Profile Views" value={analytics.profileViews} description="Company page visits" change={analytics.changes.profileViews} icon={<Eye className="w-5 h-5 text-green-600" />} />
                <MetricCard title="Avg Response Time" value={analytics.avgResponseTime} description="Time to respond to applications" change={analytics.changes.avgResponseTime} icon={<Clock className="w-5 h-5 text-purple-600" />} />
              </div>
            </div>

            <JobPostingsSection jobs={jobs} isLoading={isLoading} />
          </div>
        </main>
      </div>
    </div>
  )
}
