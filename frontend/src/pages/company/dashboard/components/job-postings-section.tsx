"use client"

import { useState } from "react"
import { JobCard } from "./job-card"
import { Button } from "../components/ui/button"

interface Job {
  job_id: string
  job_title: string
  job_type: string
  job_description: string
  benefits: string[]
  skills: string[]
  no_of_applicants: number
  job_location: string
  closing_date: string
  job_category: string
  job_tags: string[]
  created_at: string
}

interface JobPostingsSectionProps {
  jobs: Job[]
  isLoading?: boolean
}

export function JobPostingsSection({ jobs, isLoading = false }: JobPostingsSectionProps) {
  const [showError] = useState(false) // Set to true to show error state

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground transition-colors duration-200 hover:text-primary">
            Job Postings
          </h2>
          <Button
            variant="link"
            className="text-primary p-0 transition-all duration-200 hover:scale-105 hover:underline"
          >
            View All
          </Button>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-2 animate-in fade-in-0 duration-500">
            <div className="text-4xl animate-spin">⏳</div>
            <div className="font-medium text-foreground animate-pulse">Loading job postings...</div>
            <div className="text-sm text-muted-foreground animate-pulse delay-100">
              Please wait while we fetch your data.
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showError || jobs.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground transition-colors duration-200 hover:text-primary">
            Job Postings
          </h2>
          <Button
            variant="link"
            className="text-primary p-0 transition-all duration-200 hover:scale-105 hover:underline"
          >
            View All
          </Button>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-2 animate-in fade-in-0 duration-500">
            <div className="text-4xl animate-bounce">😞</div>
            <div className="font-medium text-foreground">Unable to load job data</div>
            <div className="text-sm text-muted-foreground">Failed to load data. Please try again.</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground transition-colors duration-200 hover:text-primary">
          Job Postings
        </h2>
        <Button variant="link" className="text-primary p-0 transition-all duration-200 hover:scale-105 hover:underline">
          View All
        </Button>
      </div>
      <div className="grid gap-4">
        {jobs.map((job, index) => (
          <div
            key={job.job_id}
            className="animate-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </div>
  )
}
