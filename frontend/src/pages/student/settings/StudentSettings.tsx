import { useState } from "react";
import Sidebar from "../../../components/common/sidebar/studentSidebar";
import Navbar from "../../../components/common/navbar/Navbar";
import { useNavigate } from "react-router-dom";

export default function StudentSettings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-slate-50 font-display">
      {isSidebarOpen && (
        <Sidebar
          activeKey="studentsettings"
          onNavigate={(key) => {
            if (key === "applications") navigate("/applications");
            if (key === "dashboard") navigate("/");
            if (key === "settings") navigate("/studentsettings");
          }}
          onSettingsClick={() => navigate("/settings")}
        />
      )}
      <section className="flex-1">
        <Navbar isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen((v) => !v)} />
        <main className="p-6">
          <div className="w-full max-w-6xl mx-auto p-8 bg-white rounded-2xl border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Profile Section */}
          <div className="md:col-span-8">
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-3">
                1
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
                  className="w-full px-4 py-3 bg-field-light dark:bg-field-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary text-gray-700 dark:text-black-300"
                />
              </div>

              <div>
                <label
                  htmlFor="personal-phone"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1"
                >
                  Personal phone number
                </label>
                <div className="flex">
                  <select className="px-3 py-3 bg-field-light dark:bg-field-dark border border-border-light dark:border-border-dark rounded-l-lg focus:ring-primary focus:border-primary text-gray-700 dark:text-gray-300">
                    <option>+94</option>
                  </select>
                  <input
                    id="personal-phone"
                    type="text"
                    placeholder="7x xxx xx xx"
                    className="w-full px-4 py-3 bg-field-light dark:bg-field-dark border-t border-r border-b border-border-light dark:border-border-dark rounded-r-lg focus:ring-primary focus:border-primary text-gray-700 dark:text-blacks-300"
                  />
                </div>
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
                  className="w-full px-4 py-3 bg-field-light dark:bg-field-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary text-gray-700 dark:text-black-300"
                />
              </div>

              <div>
                <label
                  htmlFor="work-phone"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1"
                >
                  Work phone number
                </label>
                <div className="flex">
                  <select className="px-3 py-3 bg-field-light dark:bg-field-dark border border-border-light dark:border-border-dark rounded-l-lg focus:ring-primary focus:border-primary text-gray-700 dark:text-black-300">
                    <option>+94</option>
                  </select>
                  <input
                    id="work-phone"
                    type="text"
                    placeholder="xx xxx xx xx"
                    className="w-full px-4 py-3 bg-field-light dark:bg-field-dark border-t border-r border-b border-border-light dark:border-border-dark rounded-r-lg focus:ring-primary focus:border-primary text-gray-700 dark:text-black-300"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1"
                >
                  Username (not your e-mail)
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-3 bg-field-light dark:bg-field-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary text-gray-700 dark:text-black-300"
                />
              </div>

              <div>
                <label
                  htmlFor="country-city"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1"
                >
                  Country, City
                </label>
                <input
                  id="country-city"
                  type="text"
                  placeholder="Sri Lanka - Colombo"
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
                  className="w-full px-4 py-3 bg-field-light dark:bg-field-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary text-gray-700 dark:text-black-300"
                />
              </div>

              <div>
                <label
                  htmlFor="organization"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1"
                >
                  Organization
                </label>
                <input
                  id="organization"
                  type="text"
                  placeholder="University of Sri Jayewardenapura"
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
                <button className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                  Correct. Save info
                </button>
              </div>
            </div>
          </div>
        </div>
        <a href="#" className="bg-purple-600 text-white no-underline rounded-xl py-2.5 px-4 font-semibold shadow-lg shadow-purple-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-600/40">
          <img src="/save.svg" alt="Cloud" className="w-4.5 h-4.5 mr-2 inline" /> save
        </a>
          </div>
        </main>
      </section>
    </div>
  );
};

