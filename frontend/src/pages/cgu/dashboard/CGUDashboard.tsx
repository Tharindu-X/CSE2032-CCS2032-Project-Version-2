import React, { useState, useRef} from "react";
import CGUSidebar from "../sidebar/Sidebar";
import Navbar from "../../../components/common/navbar/Navbar";
import RequestCompanyCard from "../../../components/cards/requestCompanyCard/RequestCompanyCard";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../student/darkmodecontext/DarkModeContext";



export default function CGUDashboard() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUploadClick = () => {
    fileInputRef.current?.click(); 
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    console.log("Selected file:", file.name);  }
  };

  return (
    <div className="flex min-h-screen font-display" style={{ backgroundColor: isDarkMode ? '#111827' : '#f8fafc' }}>
       <CGUSidebar
        activeKey="dashboard"
        isOpen={isSidebarOpen}
        isDarkMode={isDarkMode}
        onNavigate={(key) => {
          if (key === "dashboard") navigate("/");
          if (key === "settings") navigate("/settings");
        }}
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
            {(() => {
              const cards = [
                {
                  imageUrl: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=400&h=300&fit=crop",
                  companyName: "Tech Innovations Inc.",
                  jobTitle: "Senior Software Engineer",
                  description: "Join our dynamic team to build cutting-edge web applications using modern technologies. We're looking for passionate developers who love to code and collaborate.",
                  moreInfoUrl: "https://example.com/job-details",
                },
                {
                  imageUrl: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=400&h=300&fit=crop",
                  companyName: "Tech Innovations Inc.",
                  jobTitle: "Senior Software Engineer",
                  description: "Join our dynamic team to build cutting-edge web applications using modern technologies. We're looking for passionate developers who love to code and collaborate.",
                  moreInfoUrl: "https://example.com/job-details",
                },
                {
                  imageUrl: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=400&h=300&fit=crop",
                  companyName: "Tech Innovations Inc.",
                  jobTitle: "Senior Software Engineer",
                  description: "Join our dynamic team to build cutting-edge web applications using modern technologies. We're looking for passionate developers who love to code and collaborate.",
                  moreInfoUrl: "https://example.com/job-details",
                },
              ];
              return (
                <ul className="list-none grid p-0 m-0 gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
                  {cards.map((c, idx) => (
                    <li key={idx} className="m-0 p-0">
                      <RequestCompanyCard
                        imageUrl={c.imageUrl}
                        companyName={c.companyName}
                        jobTitle={c.jobTitle}
                        description={c.description}
                        moreInfoUrl={c.moreInfoUrl}
                        onConfirm={() => alert('Job Confirmed!')}
                        onReject={() => alert('Job Rejected!')}
                      />
                    </li>
                  ))}
                </ul>
              );
            })()}
          </div>
          
          
        </main>
      </section>
    </div>
  );
}


