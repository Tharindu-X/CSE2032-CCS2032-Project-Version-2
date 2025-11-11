import React, { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "./components/ui/avatar"
import { Button } from "./components/ui/button"
import { Card } from "./components/ui/card"
import { Mail, GraduationCap, Calendar, Link as LinkIcon, Check, X, Clock } from "lucide-react"
import axios from "axios"

interface Student {
  id: number
  f_name: string
  l_name: string
  year: number
  email: string
  dgree: string
  dep_name: string
  reg_no: string
  linkedin_url?: string
}

interface Application {
  job_title: string | null
  application_id: number
  student_id: number
  job_id: number
  status: string
  applied_date?: string
  student: Student
}

interface JobDetails {
  id: number
  title: string
  company: string
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

export default function JobApplicationsPage({ jobId }: { jobId: string }) {
  const [job, setJob] = useState<JobDetails | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null)

  useEffect(() => {
    if (!jobId) return

    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token")

        // Fetch applications with job details
        const res = await axios.get(`http://localhost:5000/api/company/jobs/${jobId}/applications`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        // Extract job and applications from new response structure
        const { job: jobData, applications: appsData } = res.data

        // Map backend response to your Application type
        const mappedApplications: Application[] = appsData.map((app: any) => ({
          application_id: app.application_id,
          student_id: app.student_id,
          job_id: app.job_id,
          status: app.status,
          applied_date: app.applied_date,
          student: {
            id: app.student_id,
            f_name: app.f_name,
            l_name: app.l_name,
            year: app.year,
            email: app.email,
            dgree: app.dgree,
            dep_name: app.dep_name,
            reg_no: app.reg_no,
            linkedin_url: app.linkedin_url,
          },
        }))

        setApplications(mappedApplications)

        // Set job details from backend response
        setJob({
          id: Number(jobId),
          title: jobData.job_title,
          company: jobData.com_name,
        })
      } catch (err: any) {
        console.error("Error fetching applications:", err)
        setError(err.response?.data?.message || "Failed to fetch job applications")
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [jobId])

  const handleStatusUpdate = async (applicationId: number, newStatus: string) => {
    try {
      setUpdatingStatus(applicationId)
      const token = localStorage.getItem("token")
      
      await axios.patch(
        `http://localhost:5000/api/company/applications/${applicationId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      // Update local state
      setApplications((prev) =>
        prev.map((app) =>
          app.application_id === applicationId ? { ...app, status: newStatus } : app
        )
      )
    } catch (err: any) {
      console.error("Error updating status:", err)
      alert(err.response?.data?.message || "Failed to update application status")
    } finally {
      setUpdatingStatus(null)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
      approved: { label: "Approved", className: "bg-green-100 text-green-800" },
      rejected: { label: "Rejected", className: "bg-red-100 text-red-800" },
      interview: { label: "Interview", className: "bg-blue-100 text-blue-800" },
      selected: { label: "Selected", className: "bg-purple-100 text-purple-800" },
    }
    const config = statusConfig[status] || statusConfig.pending
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    )
  }

  if (loading) return <div className="p-8">Loading...</div>
  if (error) return <div className="p-8 text-red-500">{error}</div>
  if (!job) return <div className="p-8">Invalid Job</div>

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-lg">V</span>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{job.company}</h2>
              <p className="text-xs text-green-600">Active</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2 px-3">Main</p>
            <a
              href="/company/dashboard"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Dashboard
            </a>
            <div className="flex items-center gap-3 px-3 py-2 bg-purple-600 text-white rounded-lg mt-1">
              Applications
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-5xl">
          {/* Back Button */}
          <a
            href="/company/dashboard"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            Back to Dashboard
          </a>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Applications for {job.title}</h1>
            <p className="text-gray-600">
              {applications.length} {applications.length === 1 ? "applicant" : "applicants"}
            </p>
          </div>

          {/* Applications List */}
          <div className="space-y-4">
            {applications.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-gray-500">No applications yet</p>
              </Card>
            ) : (
              applications.map((application) => (
                <Card key={application.application_id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar className="w-14 h-14 bg-purple-600 text-white">
                        <AvatarFallback className="bg-purple-600 text-white text-lg font-semibold">
                          {getInitials(application.student.f_name, application.student.l_name)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {application.student.f_name} {application.student.l_name}
                          </h3>
                          {getStatusBadge(application.status)}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                          <a
                            href={`mailto:${application.student.email}`}
                            className="flex items-center gap-1.5 hover:text-purple-600 transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            <span>{application.student.email}</span>
                          </a>

                          <div className="flex items-center gap-1.5">
                            <GraduationCap className="w-4 h-4" />
                            <span>{application.student.dgree}</span>
                          </div>

                          {application.student.linkedin_url && (
                            <a
                              href={application.student.linkedin_url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1.5 text-purple-600 hover:text-purple-700 transition-colors"
                            >
                              <LinkIcon className="w-4 h-4" />
                              LinkedIn
                            </a>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {application.student.dep_name}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Year {application.student.year}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Reg: {application.student.reg_no}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Applied:{" "}
                            {application.applied_date
                              ? new Date(application.applied_date).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                              : "Invalid Date"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => (window.location.href = `mailto:${application.student.email}`)}
                      >
                        <Mail className="w-4 h-4" />
                        Contact
                      </Button>
                      
                      {application.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleStatusUpdate(application.application_id, "approved")}
                            disabled={updatingStatus === application.application_id}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => handleStatusUpdate(application.application_id, "rejected")}
                            disabled={updatingStatus === application.application_id}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      
                      {application.status === "approved" && (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => handleStatusUpdate(application.application_id, "interview")}
                          disabled={updatingStatus === application.application_id}
                        >
                          <Clock className="w-4 h-4 mr-1" />
                          Schedule Interview
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
