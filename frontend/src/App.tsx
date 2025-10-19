import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/common/protectedRoute/ProtectedRoute";

// Public Pages
import Home from "./pages/public/home/Home";
import Login from "./pages/auth/login/Login";
import Registration from "./pages/auth/register/Registration";
import Jobs from "./pages/public/jobs/Jobs";
import Companies from "./pages/public/companies/Companies";
import Category from "./pages/public/category/Category";

// Company Pages
import CompanyDashboard from "./pages/company/dashboard/CompanyDashboard";
import PostJobPage from "./pages/company/dashboard/PostJobPage";
import EditCompanyProfile from "./pages/company/dashboard/EditCompanyProfile";
import JobApplicationsPageWrapper from "./pages/company/dashboard/JobApplicationsPageWrapper";
// import CompanyProfile from "./pages/company/profile/CompanyProfile";
// import CompanySettings from "./pages/company/settings/CompanySettings";
// import CompanyAnalytics from "./pages/company/analytics/CompanyAnalytics";

// Student Pages
import StudentDashboard from "./pages/student/dashboard/StudentDashboard";
import StudentSettings from "./pages/student/settings/StudentSettings";
import Applications from "./pages/student/applications/Applications";

// Admin Pages
import CGUDashboard from "./pages/cgu/dashboard/CGUDashboard";
// import CompanyApprovals from "./pages/cgu/dashboard/companuApprovels/CompanyApprovals";

// Loading Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
  </div>
);

export default function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/signup" element={<Registration />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/companies" element={<Companies companies={[]} />} />
      <Route path="/category" element={<Category />} />

      {/* Company Routes */}
      <Route 
        path="/company/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['company']}>
            <CompanyDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/company/post-job" 
        element={
          <ProtectedRoute allowedRoles={['company']}>
            <PostJobPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/company/edit-profile" 
        element={
          <ProtectedRoute allowedRoles={['company']}>
            <EditCompanyProfile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/company/job/:jobId/applications" 
        element={
          <ProtectedRoute allowedRoles={['company']}>
            <JobApplicationsPageWrapper />
          </ProtectedRoute>
        } 
      />
      {/* Student Routes */}
      <Route 
        path="/student/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/student/settings" 
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentSettings />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/student/applications" 
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <Applications />
          </ProtectedRoute>
        } 
      />

      {/* Admin Routes */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <CGUDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Legacy Routes - Redirect to new structure */}
      <Route path="/companydashboard" element={<Navigate to="/company/dashboard" replace />} />
      <Route path="/addjob" element={<Navigate to="/company/post-job" replace />} />
      <Route path="/edit-profile" element={<Navigate to="/company/edit-profile" replace />} />
      <Route path="/job/:jobId/applications" element={<Navigate to="/company/job/:jobId/applications" replace />} />
      <Route path="/dashboard" element={<Navigate to="/student/dashboard" replace />} />
      <Route path="/applications" element={<Navigate to="/student/applications" replace />} />
      <Route path="/settings" element={<Navigate to="/student/settings" replace />} />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
