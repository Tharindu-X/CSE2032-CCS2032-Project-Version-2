import React, { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "./components/ui/avatar"
import { Button } from "./components/ui/button"
import { Card } from "./components/ui/card"
import { Mail, GraduationCap, Phone, Calendar } from "lucide-react"

interface Student {
  id: number
  f_name: string
  l_name: string
  year: number
  email: string
  dgree: string
  dep_name: string
  reg_no: string
}

interface Application {
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

const mockGetJobApplications = (jobId: string): Promise<{ job: JobDetails; applications: Application[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        job: {
          id: Number(jobId),
          title: "Frontend Developer",
          company: "Virtusa",
        },
        applications: [
          {
            application_id: 1,
            student_id: 1,
            job_id: Number(jobId),
            status: "pending",
            applied_date: "2024-01-15",
            student: {
              id: 1,
              f_name: "Tharindu",
              l_name: "Dananjaya",
              year: 4,
              email: "tharindu@gmail.com",
              dgree: "Bsc Hons",
              dep_name: "Computer Science",
              reg_no: "CS/2020/001",
            },
          },
          {
            application_id: 2,
            student_id: 2,
            job_id: Number(jobId),
            status: "pending",
            applied_date: "2024-01-17",
            student: {
              id: 2,
              f_name: "Nimal",
              l_name: "Perera",
              year: 3,
              email: "nimal@gmail.com",
              dgree: "Bsc Hons",
              dep_name: "Information Technology",
              reg_no: "IT/2020/005",
            },
          },
        ],
      })
    }, 500)
  })
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

export default function JobApplicationsPage({ jobId }: { jobId: string }) {
  const [job, setJob] = useState<JobDetails | null>(null)
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    mockGetJobApplications(jobId).then((data) => {
      setJob(data.job)
      setApplications(data.applications)
    })
  }, [jobId])

  if (!job) return <div className="p-8">Loading...</div>

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
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="font-medium">Dashboard</span>
            </a>
            <div className="flex items-center gap-3 px-3 py-2 bg-purple-600 text-white rounded-lg mt-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="font-medium">Applications</span>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-5xl">
          {/* Back Button */}
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
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
                      {/* Avatar */}
                      <Avatar className="w-14 h-14 bg-purple-600 text-white">
                        <AvatarFallback className="bg-purple-600 text-white text-lg font-semibold">
                          {getInitials(application.student.f_name, application.student.l_name)}
                        </AvatarFallback>
                      </Avatar>

                      {/* Student Info */}
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

                          <div className="flex items-center gap-1.5">
                            <Phone className="w-4 h-4" />
                            <span className="text-gray-500">undefined</span>
                          </div>
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

                    {/* Contact Button */}
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
