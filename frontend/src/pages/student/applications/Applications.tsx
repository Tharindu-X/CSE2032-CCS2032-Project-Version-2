import { useEffect, useState } from "react";
import Sidebar from "../../../components/common/sidebar/studentSidebar";
import Navbar from "../../../components/common/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../darkmodecontext/DarkModeContext";
import RecentlyApplied from "../../../components/cards/recentAppliedCard/RecentAppliedCard";
import { useAuth } from "../../../context/AuthContext";

export default function Applications() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [userName, setUserName] = useState("John Doe");
  const [avatarUrl, setAvatarUrl] = useState("https://avatars.githubusercontent.com/u/9919?s=64");
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  type Application = {
    id: number;
    imageUrl: string;
    jobTitle: string;
    companyName: string;
    appliedDate: string;
    status?: 'pending' | 'short listed' | 'rejected';
  };

  const [applications, setApplications] = useState<Application[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (!user?.email || !token) return;
        const response = await fetch(`http://localhost:5000/api/student/${encodeURIComponent(user.email)}/applications`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json?.message || 'Failed to fetch applications');
        }

        // Map backend fields to component shape
        const mapped: Application[] = (Array.isArray(json?.data) ? json.data : []).map((app: any) => ({
          id: app.application_id ?? app.id ?? Math.random(),
          imageUrl: app.company_logo_url || app.logoUrl || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
          jobTitle: app.job_title || app.title || 'Job',
          companyName: app.company_name || app.company || 'Company',
          appliedDate: app.application_date ? new Date(app.application_date).toISOString().slice(0,10) : (app.appliedDate || ''),
          status: app.status as Application['status'] | undefined,
        }));
        setApplications(mapped);
        setError(null);
      } catch (err: any) {
        setApplications([]);
        setError(err?.message || 'Failed to fetch applications');
      }
    };
    fetchApplications();
  }, [user?.email, token]);

  const handleProfileUpdate = (username: string, avatarUrl: string) => {
    setUserName(username);
    setAvatarUrl(avatarUrl);
  };

  const handleProfilePopupChange = (isOpen: boolean) => {
    setIsProfilePopupOpen(isOpen);
  };

  return (
    <div className="flex">
      <Sidebar
        activeKey="applications"
        isOpen={isSidebarOpen}
        onNavigate={(key) => {
          if (key === "applications") navigate("/applications");
          if (key === "settings") navigate("/settings");
          if (key === "dashboard") navigate("/");
        }}
        onLogout={() => navigate("/login")}
        onLogoutPopupChange={setIsLogoutPopupOpen}
        userName={userName}
        avatarUrl={avatarUrl}
        isDarkMode={isDarkMode}
        onProfileUpdate={handleProfileUpdate}
        onProfilePopupChange={handleProfilePopupChange}
      />
      <section id="content" className="flex-1 min-h-screen" style={{ 
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="m-0 text-4xl" style={{ color: isDarkMode ? '#f9fafb' : '#0f172a' }}>Applications</h1>
              <ul className="list-none flex p-0 mt-2 gap-2" style={{ color: isDarkMode ? '#9ca3af' : '#475569' }}>
                <li>
                  <a href="#" className="no-underline" style={{ color: isDarkMode ? '#9ca3af' : '#475569' }}>Dashboard</a>
                </li>
                <li>›</li>
                <li>
                  <a className="active no-underline" href="#" style={{ color: isDarkMode ? '#9ca3af' : '#475569' }}>Applications</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Previous Applications card */}
          <div className="mt-6">
            <div className="rounded-2xl border transition-all hover:-translate-y-0.5 hover:shadow-lg" style={{
              backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
              borderColor: isDarkMode ? '#374151' : '#e2e8f0'
            }}>
              <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: isDarkMode ? '#374151' : '#e2e8f0' }}>
                <h3 className="m-0" style={{ color: isDarkMode ? '#f9fafb' : '#0f172a' }}>Previous Applications</h3>
              </div>
              <div className="p-4">
                {applications === null ? (
                  <div className="text-center py-8" style={{ color: isDarkMode ? '#6b7280' : '#94a3b8' }}>
                    <p>Loading applications...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-8 text-red-500">
                    <p>{error}</p>
                  </div>
                ) : applications.length > 0 ? (
                  <div className="space-y-4">
                    {applications.map((application) => (
                      <RecentlyApplied
                        key={application.id}
                        imageUrl={application.imageUrl}
                        jobTitle={application.jobTitle}
                        companyName={application.companyName}
                        appliedDate={application.appliedDate}
                        status={application.status}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8" style={{ color: isDarkMode ? '#6b7280' : '#94a3b8' }}>
                    <p>No applications yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}


