import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/company/dashboard/CompanyDashboard.tsx";
import AddJob from "./pages/company/dashboard/PostJobPage.tsx";
import EditCompanyPage from "./pages/company/dashboard/EditCompanyProfile.tsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/addjob" element={<AddJob />} />
      <Route path="/edit-profile" element={<EditCompanyPage />} />
    </Routes>
  );
}
