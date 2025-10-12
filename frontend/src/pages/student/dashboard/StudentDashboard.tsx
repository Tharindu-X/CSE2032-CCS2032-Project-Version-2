import { useState, useRef} from "react";
import Sidebar from "../../../components/common/sidebar/studentSidebar";
import Navbar from "../../../components/common/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../darkmodecontext/DarkModeContext";

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

  return (
    <div className="flex min-h-screen font-display" style={{ backgroundColor: isDarkMode ? '#111827' : '#f8fafc' }}>
          <Sidebar
            activeKey="dashboard"
            isOpen={isSidebarOpen}
            onNavigate={(key) => {
              if (key === "applications") navigate("/applications");
              if (key === "dashboard") navigate("/");
              if (key === "settings") navigate("/settings");
            }}
            onLogout={() => navigate("/login")}
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
        <img src="/cloud.svg" alt="Cloud" className="w-4.5 h-4.5 mr-2" />
        Upload Your CV
      </a>
    </div>
          </div>

          {/* KPI Cards */}
          <ul className="list-none grid grid-cols-3 gap-5 p-0 mb-7">
            {[
              { icon: <img src="/folder.svg" alt="Applications" className="w-6 h-6" />, title: "Applications Submitted", color: "bg-blue-100" },
              { icon: <img src="/trophy.svg" alt="Trophy" className="w-6 h-6" />, title: "Selected for interview", color: "bg-green-100" },
              { icon: <img src="/company.svg" alt="Company" className="w-6 h-6" />, title: "Companies you follow", color: "bg-yellow-100" },
            ].map((c, i) => (
              <li key={i} className="flex items-center gap-4 rounded-2xl p-5 border transition-all hover:-translate-y-1 hover:shadow-lg hover:border-purple-600 cursor-pointer" style={{
                backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                borderColor: isDarkMode ? '#374151' : '#e2e8f0'
              }}>
                <div className={`w-16 h-16 grid place-items-center rounded-2xl text-2xl transition-transform hover:scale-110 ${c.color}`}>
                  {c.icon}
                </div>
                <span className="font-semibold" style={{ color: isDarkMode ? '#d1d5db' : '#475569' }}>{c.title}</span>
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
                <img src="/search2.svg" alt="Search applications" className="w-6 h-6 cursor-pointer transition-transform hover:scale-110" />
                <img src="/sort.svg" alt="Sort" className="w-6 h-6 cursor-pointer transition-transform hover:scale-110" />
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
                  <tr>
                    <td colSpan={3} className="py-3.5 px-1.5 text-red-500">Failed to load applications.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}


