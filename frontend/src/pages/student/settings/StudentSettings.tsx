import { useState, useEffect } from "react";
import Sidebar from "../../../components/common/sidebar/studentSidebar";
import Navbar from "../../../components/common/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../darkmodecontext/DarkModeContext";
import { useAuth } from "../../../context/AuthContext";

export default function Settings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [userName, setUserName] = useState("John Doe");
  const [avatarUrl, setAvatarUrl] = useState("https://avatars.githubusercontent.com/u/9919?s=64");
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [year, setYear] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [regNo, setRegNo] = useState("");
  const [degree, setDegree] = useState("");
  const [email, setEmail] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        if (!user?.email || !token) return;
        const response = await fetch(`http://localhost:5000/api/student/${encodeURIComponent(user.email)}/settings`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json?.message || "Failed to load settings");
        }
        const data = json?.data || {};
        setFirstName(data.f_name || "");
        setLastName(data.l_name || "");
        setYear(data.year ? String(data.year) : "");
        setLinkedInUrl(data.linkedin_url || "");
        setRegNo(data.reg_no || "");
        setDegree(data.dgree || "");
        setEmail(data.email || user.email);
        setDepartmentName(data.dep_name || "");
      } catch (err: any) {
        // Non-fatal for page usage; show inline error on save only
        console.error(err);
      }
    };
    fetchSettings();
  }, [user?.email, token]);

  const handleProfileUpdate = (username: string, avatarUrl: string) => {
    setUserName(username);
    setAvatarUrl(avatarUrl);
  };

  const handleProfilePopupChange = (isOpen: boolean) => {
    setIsProfilePopupOpen(isOpen);
  };

  const handleSave = async (e?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e?.preventDefault();
    try {
      if (!user?.email || !token) return;
      setIsSaving(true);
      setSaveError(null);
      setSaveSuccess(null);

      const payload = {
        f_name: firstName,
        l_name: lastName,
        year: year ? Number(year) : null,
        email: email || user.email,
        dgree: degree,
        dep_name: departmentName,
        reg_no: regNo,
        linkedin_url: linkedInUrl,
      };

      const response = await fetch(`http://localhost:5000/api/student/${encodeURIComponent(user.email)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(json?.message || "Failed to save settings");
      }

      setSaveSuccess("Settings saved successfully.");
    } catch (err: any) {
      setSaveError(err?.message || "Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen font-display" style={{ backgroundColor: isDarkMode ? '#111827' : '#f8fafc' }}>
      <Sidebar
        activeKey="settings"
        isOpen={isSidebarOpen}
        onNavigate={(key) => {
          if (key === "applications") navigate("/applications");
          if (key === "dashboard") navigate("/");
          if (key === "settings") navigate("/settings");
        }}
        onLogout={() => navigate("/login")}
        onLogoutPopupChange={setIsLogoutPopupOpen}
        userName={userName}
        avatarUrl={avatarUrl}
        isDarkMode={isDarkMode}
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
          <div className="w-full max-w-6xl mx-auto p-8 rounded-2xl border" style={{
            backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
            borderColor: isDarkMode ? '#374151' : '#e2e8f0'
          }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Profile Section */}
          <div className="md:col-span-8">
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-3">
              </div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                PROFILE
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1"
                >
                  First name
                </label>
                <input
                  id="first-name"
                  type="text"
                  placeholder="Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 bg-field-light dark:bg-field-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary text-gray-700 dark:text-black-300"
                />
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1"
                >
                  Year
                </label>
                <input
                  id="year"
                  type="text"
                  placeholder="1 / 2 / 3 / 4"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-4 py-3 bg-field-light dark:bg-field-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary text-gray-700 dark:text-black-300"
                />
              </div>

              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1"
                >
                  Last name
                </label>
                <input
                  id="last-name"
                  type="text"
                  placeholder="Surname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 bg-field-light dark:bg-field-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary text-gray-700 dark:text-black-300"
                />
              </div>


              <div>
                <label
                  htmlFor="linkedIn-url"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1"
                >
                  LinkedIn URL 
                </label>
                <input
                  id="linkedIn"
                  type="text"
                  placeholder="linkedIn.com/in/yourprofile"
                  value={linkedInUrl}
                  onChange={(e) => setLinkedInUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-field-light dark:bg-field-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary text-gray-700 dark:text-black-300"
                />
              </div>

              <div>
                <label
                  htmlFor="reg-no"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1"
                >
                  Registration No
                </label>
                <input
                  id="reg-no"
                  type="text"
                  placeholder="Fc-xxxxxx"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  className="w-full px-4 py-3 bg-field-light dark:bg-field-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary text-gray-700 dark:text-black-300"
                />
              </div>

              <div>
                <label
                  htmlFor="degree"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1"
                >
                  Degree
                </label>
                <input
                  id="degree"
                  type="text"
                  placeholder="B.Compt (Hons) in Software Engineering"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full px-4 py-3 bg-field-light dark:bg-field-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary text-gray-700 dark:text-black-300"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1"
                >
                  Your e-mail
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="fcxxxxxx@foc.sjp.ac.lk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-field-light dark:bg-field-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary text-gray-700 dark:text-black-300"
                />
              </div>

              <div>
                <label
                  htmlFor="dep-name"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1"
                >
                  Department Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Department of Software Engineering"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  className="w-full px-4 py-3 bg-field-light dark:bg-field-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary text-gray-700 dark:text-black-300"
                />
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="md:col-span-4">
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-3">
                2
              </div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                PASSWORD
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="old-password"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1"
                >
                  Old password *
                </label>
                <input
                  id="old-password"
                  type="password"
                  placeholder="*********"
                  className="w-full px-4 py-3 bg-field-light dark:bg-field-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary text-gray-700 dark:text-black-300"
                />
              </div>

              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1"
                >
                  New password *
                </label>
                <input
                  id="new-password"
                  type="password"
                  placeholder="*********"
                  className="w-full px-4 py-3 bg-field-light dark:bg-field-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary text-gray-700 dark:text-black-300"
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1"
                >
                  Confirm new password *
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="*********"
                  className="w-full px-4 py-3 bg-field-light dark:bg-field-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary text-gray-700 dark:text-black-300"
                />
              </div>

              <div className="pt-16">
                <button onClick={handleSave} disabled={isSaving} className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                  {isSaving ? 'Saving...' : 'Correct. Save info'}
                </button>
                {saveError && (
                  <p className="mt-2 text-red-500 text-sm">{saveError}</p>
                )}
                {saveSuccess && (
                  <p className="mt-2 text-green-600 text-sm">{saveSuccess}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <a href="#" onClick={(e) => handleSave(e as any)} className="bg-purple-600 text-white no-underline rounded-xl py-2.5 px-4 font-semibold shadow-lg shadow-purple-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-600/40">
          <img src="/save.svg" alt="Cloud" className="w-4.5 h-4.5 mr-2 inline" /> {isSaving ? 'Saving...' : 'save'}
        </a>
          </div>
        </main>
      </section>
    </div>
  );
};

