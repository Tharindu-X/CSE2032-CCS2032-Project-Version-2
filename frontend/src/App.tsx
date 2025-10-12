import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/company/dashboard/CompanyDashboard.tsx";
import AddJob from "./pages/company/dashboard/PostJobPage.tsx";
import EditCompanyPage from "./pages/company/dashboard/EditCompanyProfile.tsx";
import { Login } from "./pages/company/dashboard/login.tsx";
import JobApplicationsPageWrapper from "./pages/company/dashboard/JobApplicationsPageWrapper.tsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addjob" element={<AddJob />} />
       <Route path="/job/:jobId/applications" element={<JobApplicationsPageWrapper />} />
      <Route path="/edit-profile" element={<EditCompanyPage />} />
    </Routes>
  );
}
