import React, { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "./components/ui/avatar"
import { Button } from "./components/ui/button"
import { Card } from "./components/ui/card"
import { Mail, GraduationCap, Phone, Calendar, Link as LinkIcon } from "lucide-react"
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

  useEffect(() => {
    if (!jobId) return

    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token")
        const companyName = localStorage.getItem("company_name") || "Unknown Company"

        // Fetch applications
        const res = await axios.get(`http://localhost:5000/api/company/jobs/${jobId}/applications`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        // Map backend response to your Application type
        const mappedApplications: Application[] = res.data.map((app: any) => ({
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

        // Get job title safely
        const jobTitle = mappedApplications[0]?.job_title || localStorage.getItem(`job_title_${jobId}`) || "Unknown Job"

        setJob({
          id: Number(jobId),
          title: jobTitle,
          company: companyName,
        })
      } catch (err: any) {
        if (err.response?.status === 404) {
          // Job has no applications, still set job info
          const companyName = localStorage.getItem("company_name") || "Unknown Company"
          const jobTitle = localStorage.getItem(`job_title_${jobId}`) || "Unknown Job"
          setJob({ id: Number(jobId), title: jobTitle, company: companyName })
          setApplications([])
        } else {
          console.error("Error fetching applications:", err)
          setError(err.response?.data?.message || "Failed to fetch applications")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [jobId])

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
                <Card key={application.application_id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar className="w-14 h-14 bg-purple-600 text-white">
                        <AvatarFallback className="bg-purple-600 text-white text-lg font-semibold">
                          {getInitials(application.student.f_name, application.student.l_name)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {application.student.f_name} {application.student.l_name}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-4 h-4" />
                            <span>{application.student.email}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <GraduationCap className="w-4 h-4" />
                            <span>{application.student.dgree}</span>
                          </div>

                          {application.student.linkedin_url && (
                            <a
                              href={application.student.linkedin_url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1.5 text-purple-600 hover:text-purple-700"
                            >
                              <LinkIcon className="w-4 h-4" />
                              LinkedIn
                            </a>
                          )}
                        </div>

                        <div className="mt-2 flex items-center gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {application.student.dep_name}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Year {application.student.year}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center gap-1.5 text-sm text-gray-500">
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

                    <Button
                      variant="outline"
                      className="flex items-center gap-2 bg-transparent"
                      onClick={() => (window.location.href = `mailto:${application.student.email}`)}
                    >
                      <Mail className="w-4 h-4" />
                      Contact
                    </Button>
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
