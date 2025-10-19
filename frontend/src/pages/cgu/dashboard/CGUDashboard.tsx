import React, { useState, useRef, useEffect} from "react";
import CGUSidebar from "../sidebar/Sidebar";
import Navbar from "../../../components/common/navbar/Navbar";
import RequestCompanyCard from "../../../components/cards/requestCompanyCard/RequestCompanyCard";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../student/darkmodecontext/DarkModeContext";
import { useAuth } from "../../../context/AuthContext";



interface Company {
  id: number;
  com_name: string;
  email: string;
  bussiness_type: string;
  bio: string;
  address: string;
  no_of_employees: number;
  image?: string;
  status: number;
}

export default function CGUDashboard() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUploadClick = () => {
    fileInputRef.current?.click(); 
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    console.log("Selected file:", file.name);  }
  };

  // Fetch pending companies from database
  useEffect(() => {
    const fetchPendingCompanies = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/company/pending');
        if (!response.ok) {
          throw new Error('Failed to fetch pending companies');
        }
        const data = await response.json();
        setCompanies(data);
      } catch (err) {
        console.error('Error fetching pending companies:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch companies');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingCompanies();
  }, []);

  // Handle company approval
  const handleApprove = async (companyId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/company/${companyId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to approve company');
      }

      const result = await response.json();
      
      // Remove approved company from the list
      setCompanies(prev => prev.filter(company => company.id !== companyId));
      alert(`Company approved and activated successfully! Status updated.`);
    } catch (err) {
      console.error('Error approving company:', err);
      alert('Failed to approve company. Please try again.');
    }
  };

  // Handle company rejection (for now, just remove from list)
  const handleReject = (companyId: number) => {
    setCompanies(prev => prev.filter(company => company.id !== companyId));
    alert('Company rejected');
  };

  return (
    <div className="flex min-h-screen font-display" style={{ backgroundColor: isDarkMode ? '#111827' : '#f8fafc' }}>
       <CGUSidebar
        activeKey="dashboard"
        isOpen={isSidebarOpen}
        isDarkMode={isDarkMode}
        onNavigate={(key) => {
          if (key === "dashboard") navigate("/admin/dashboard");
          if (key === "settings") navigate("/settings");
        }}
        onLogout={() => { logout(); navigate("/"); }}
      />
          <section className="flex-1" style={{ marginLeft: isSidebarOpen ? '300px' : '0', transition: 'margin-left 0.3s ease', backgroundColor: isDarkMode ? '#111827' : '#f8fafc', color: isDarkMode ? '#f9fafb' : '#0f172a' }}>
            <Navbar 
              isSidebarOpen={isSidebarOpen} 
              onToggleSidebar={() => setIsSidebarOpen((v) => !v)} 
              isBlurred={false}
              isDarkMode={isDarkMode}
              onToggleDarkMode={toggleDarkMode}
            />
        <main className="p-6">
          {/* Header + breadcrumb */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="m-0 text-4xl" style={{ color: isDarkMode ? '#f9fafb' : '#0f172a' }}>Dashboard Overview</h1>
              <ul className="list-none flex p-0 mt-2 gap-2" style={{ color: isDarkMode ? '#9ca3af' : '#475569' }}>
                <li>
                  <a href="#" className="no-underline" style={{ color: isDarkMode ? '#9ca3af' : '#475569' }}>Dashboard Overview</a>
                </li>
                <li>›</li>
                <li>
                  <a href="#" className="no-underline" style={{ color: isDarkMode ? '#9ca3af' : '#475569' }}>Home</a>
                </li>
              </ul>
            </div>
            <div>
              {/* Upload button or other header actions can go here */}
            </div>
          </div>
          <div className="min-h-screen p-8" style={{ backgroundColor: isDarkMode ? '#1f2937' : '#ffffff' }}>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-lg" style={{ color: isDarkMode ? '#f9fafb' : '#0f172a' }}>
                  Loading pending companies...
                </div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-lg text-red-500">
                  Error: {error}
                </div>
              </div>
            ) : companies.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-lg" style={{ color: isDarkMode ? '#f9fafb' : '#0f172a' }}>
                  No pending companies to review
                </div>
              </div>
            ) : (
              <ul className="list-none grid p-0 m-0 gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
                {companies.map((company) => (
                  <li key={company.id} className="m-0 p-0">
                    <RequestCompanyCard
                      imageUrl={company.image || "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=400&h=300&fit=crop"}
                      companyName={company.com_name}
                      jobTitle={company.bussiness_type}
                      description={company.bio || `Company located at ${company.address}. ${company.no_of_employees} employees.`}
                      moreInfoUrl={`mailto:${company.email}`}
                      onConfirm={() => handleApprove(company.id)}
                      onReject={() => handleReject(company.id)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          
        </main>
      </section>
    </div>
  );
}


