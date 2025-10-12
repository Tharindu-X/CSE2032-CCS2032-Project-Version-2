import { useState } from "react";
import Sidebar from "../../../components/common/sidebar/studentSidebar";
import Navbar from "../../../components/common/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../darkmodecontext/DarkModeContext";

export default function Applications() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [userName, setUserName] = useState("John Doe");
  const [avatarUrl, setAvatarUrl] = useState("https://avatars.githubusercontent.com/u/9919?s=64");
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

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
                <table id="applicationsTable" className="w-full border-collapse">
                  <thead>
                    <tr className="text-left" style={{ color: isDarkMode ? '#9ca3af' : '#475569' }}>
                      <th className="py-2.5 px-1.5 border-b" style={{ borderColor: isDarkMode ? '#374151' : '#e2e8f0' }}>Company</th>
                      <th className="py-2.5 px-1.5 border-b" style={{ borderColor: isDarkMode ? '#374151' : '#e2e8f0' }}>Job Title</th>
                      <th className="py-2.5 px-1.5 border-b" style={{ borderColor: isDarkMode ? '#374151' : '#e2e8f0' }}>Date</th>
                    </tr>
                  </thead>
                  <tbody id="applicationsTableBody">
                    <tr>
                      <td colSpan={3} className="py-3.5 px-1.5" style={{ color: isDarkMode ? '#6b7280' : '#94a3b8' }}>No applications yet.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}


