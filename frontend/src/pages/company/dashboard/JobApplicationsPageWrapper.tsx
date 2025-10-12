import { useParams } from "react-router-dom";
import JobApplicationsPage from "./jobApplicationPage";

export default function JobApplicationsPageWrapper() {
  const { jobId } = useParams<{ jobId: string }>();
  if (!jobId) return <div>Invalid Job ID</div>;
  return <JobApplicationsPage jobId={jobId} />;
}
