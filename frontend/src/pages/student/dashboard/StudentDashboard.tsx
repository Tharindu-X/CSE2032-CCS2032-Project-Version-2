import { useState, useRef, useEffect } from "react";

import cloudIcon from "../../../assets/cloud.svg";
import folderIcon from "../../../assets/folder.svg";
import trophyIcon from "../../../assets/trophy.svg";
import companyIcon from "../../../assets/company.svg";
import searchIcon from "../../../assets/search2.svg";
import sortIcon from "../../../assets/sort.svg";

import Sidebar from "../../../components/common/sidebar/studentSidebar";
import Navbar from "../../../components/common/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../darkmodecontext/DarkModeContext";
import { useAuth } from "../../../context/AuthContext";

export default function StudentDashboard() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUploadClick = () => {
    fileInputRef.current?.click(); // triggers hidden file input
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [userName, setUserName] = useState("John Doe");
  const [avatarUrl, setAvatarUrl] = useState("https://avatars.githubusercontent.com/u/9919?s=64");
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();

  const [applicationsSubmitted, setApplicationsSubmitted] = useState<number | null>(null);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [companiesFollowed, setCompaniesFollowed] = useState<number | null>(null);
  const [companiesError, setCompaniesError] = useState<string | null>(null);
  const [recentApplications, setRecentApplications] = useState<Array<{ application_id: number; application_date: string; status: string; job_title: string; company_name: string; }>|null>(null);
  const [recentAppsError, setRecentAppsError] = useState<string | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  const handleProfileUpdate = (username: string, avatarUrl: string) => {
    setUserName(username);
    setAvatarUrl(avatarUrl);
  };

  const handleProfilePopupChange = (isOpen: boolean) => {
    setIsProfilePopupOpen(isOpen);
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (!user?.email || !token) return;
        const response = await fetch(`http://localhost:5000/api/student/${encodeURIComponent(user.email)}/stats`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json?.message || "Failed to fetch stats");
        }
        const total = json?.data?.total_applications ?? null;
        setApplicationsSubmitted(typeof total === "number" ? total : null);
        setStatsError(null);
      } catch (err: any) {
        setStatsError(err?.message || "Failed to fetch stats");
      }
    };
    fetchStats();
  }, [user?.email, token]);

  useEffect(() => {
    const fetchCompaniesFollowed = async () => {
      try {
        if (!user?.email || !token) return;
        const response = await fetch(`http://localhost:5000/api/student/${encodeURIComponent(user.email)}/companies-followed`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json?.message || "Failed to fetch companies followed");
        }
        const count = json?.data?.count ?? null;
        setCompaniesFollowed(typeof count === "number" ? count : null);
        setCompaniesError(null);
      } catch (err: any) {
        setCompaniesError(err?.message || "Failed to fetch companies followed");
      }
    };
    fetchCompaniesFollowed();
  }, [user?.email, token]);

  useEffect(() => {
    const fetchRecentApplications = async () => {
      try {
        if (!user?.email || !token) return;
        const response = await fetch(`http://localhost:5000/api/student/${encodeURIComponent(user.email)}/applications/recent?limit=5`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json?.message || "Failed to fetch recent applications");
        }
        const apps = Array.isArray(json?.data) ? json.data : [];
        setRecentApplications(apps);
        setRecentAppsError(null);
      } catch (err: any) {
        setRecentAppsError(err?.message || "Failed to fetch recent applications");
        setRecentApplications([]);
      }
    };
    fetchRecentApplications();
  }, [user?.email, token]);

  return (
    <div className="flex min-h-screen font-display" style={{ backgroundColor: isDarkMode ? '#111827' : '#f8fafc' }}>
          <Sidebar
            activeKey="dashboard"
            isOpen={isSidebarOpen}
            onNavigate={(key) => {
              if (key === "applications") navigate("/student/applications");
              if (key === "dashboard") navigate("/student/dashboard");
              if (key === "settings") navigate("/student/settings");
              if (key === "browse") navigate("/jobs");
              if (key === "companies") navigate("/companies");
            }}
            onLogout={() => { logout(); navigate("/"); }}
            onLogoutPopupChange={setIsLogoutPopupOpen}
            isDarkMode={isDarkMode}
            userName={userName}
            avatarUrl={avatarUrl}
            onProfileUpdate={handleProfileUpdate}
            onProfilePopupChange={handleProfilePopupChange}
          />
          <section className="flex-1" style={{ 
            marginLeft: isSidebarOpen ? '300px' : '0', 
            transition: 'margin-left 0.3s ease',
            backgroundColor: isDarkMode ? '#111827' : '#f8fafc',
            color: isDarkMode ? '#f9fafb' : '#0f172a'
          }}>
            <Navbar 
              isSidebarOpen={isSidebarOpen} 
              onToggleSidebar={() => setIsSidebarOpen((v) => !v)} 
              isBlurred={isLogoutPopupOpen || isProfilePopupOpen}
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
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleUploadClick();
        }}
        className="bg-purple-600 text-white no-underline rounded-xl py-2.5 px-4 font-semibold shadow-lg shadow-purple-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-600/40 inline-flex items-center"
      >
        <img src={cloudIcon} alt="Cloud" className="w-4.5 h-4.5 mr-2" />
        Upload Your CV
      </a>
    </div>
          </div>

          {/* KPI Cards */}
          <ul className="list-none grid grid-cols-3 gap-5 p-0 mb-7">
            {[
              { icon: <img src={folderIcon} alt="Applications" className="w-6 h-6" />, title: "Applications Submitted", color: "bg-blue-100" },
              { icon: <img src={trophyIcon} alt="Trophy" className="w-6 h-6" />, title: "Selected for interview", color: "bg-green-100" },
              { icon: <img src={companyIcon} alt="Company" className="w-6 h-6" />, title: "Companies you follow", color: "bg-yellow-100" },
            ].map((c, i) => (
              <li key={i} className="flex items-center gap-4 rounded-2xl p-5 border transition-all hover:-translate-y-1 hover:shadow-lg hover:border-purple-600 cursor-pointer" style={{
                backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                borderColor: isDarkMode ? '#374151' : '#e2e8f0'
              }}>
                <div className={`w-16 h-16 grid place-items-center rounded-2xl text-2xl transition-transform hover:scale-110 ${c.color}`}>
                  {c.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold" style={{ color: isDarkMode ? '#f9fafb' : '#0f172a' }}>
                    {i === 0
                      ? (applicationsSubmitted !== null ? applicationsSubmitted : (statsError ? '—' : '...'))
                      : i === 2
                        ? (companiesFollowed !== null ? companiesFollowed : (companiesError ? '—' : '...'))
                        : '—'}
                  </span>
                  <span className="font-semibold" style={{ color: isDarkMode ? '#d1d5db' : '#475569' }}>{c.title}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* Recently Applied */}
          <div className="rounded-2xl border transition-all hover:-translate-y-0.5 hover:shadow-lg" style={{
            backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
            borderColor: isDarkMode ? '#374151' : '#e2e8f0'
          }}>
            <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: isDarkMode ? '#374151' : '#e2e8f0' }}>
              <h3 className="m-0" style={{ color: isDarkMode ? '#f9fafb' : '#0f172a' }}>Recently Applied</h3>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search..."
                  className="rounded-lg py-2 px-3 outline-none transition focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10"
                  style={{
                    backgroundColor: isDarkMode ? '#374151' : '#ffffff',
                    borderColor: isDarkMode ? '#4b5563' : '#e2e8f0',
                    color: isDarkMode ? '#f9fafb' : '#0f172a'
                  }}
                />
                <img src={searchIcon} alt="Search applications" className="w-6 h-6 cursor-pointer transition-transform hover:scale-110" />
                <img src={sortIcon} alt="Sort" className="w-6 h-6 cursor-pointer transition-transform hover:scale-110" />
              </div>
            </div>
            <div className="p-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left" style={{ color: isDarkMode ? '#9ca3af' : '#475569' }}>
                    <th className="py-2.5 px-1.5 border-b" style={{ borderColor: isDarkMode ? '#374151' : '#e2e8f0' }}>Company</th>
                    <th className="py-2.5 px-1.5 border-b" style={{ borderColor: isDarkMode ? '#374151' : '#e2e8f0' }}>Job Title</th>
                    <th className="py-2.5 px-1.5 border-b" style={{ borderColor: isDarkMode ? '#374151' : '#e2e8f0' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppsError ? (
                    <tr>
                      <td colSpan={3} className="py-3.5 px-1.5 text-red-500">{recentAppsError}</td>
                    </tr>
                  ) : recentApplications === null ? (
                    <tr>
                      <td colSpan={3} className="py-3.5 px-1.5" style={{ color: isDarkMode ? '#d1d5db' : '#475569' }}>Loading recent applications...</td>
                    </tr>
                  ) : recentApplications.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-3.5 px-1.5" style={{ color: isDarkMode ? '#d1d5db' : '#475569' }}>No recent applications.</td>
                    </tr>
                  ) : (
                    recentApplications.map(app => (
                      <tr key={app.application_id}>
                        <td className="py-2.5 px-1.5" style={{ color: isDarkMode ? '#f9fafb' : '#0f172a' }}>{app.company_name}</td>
                        <td className="py-2.5 px-1.5" style={{ color: isDarkMode ? '#f9fafb' : '#0f172a' }}>{app.job_title}</td>
                        <td className="py-2.5 px-1.5" style={{ color: isDarkMode ? '#f9fafb' : '#0f172a' }}>{new Date(app.application_date).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}


