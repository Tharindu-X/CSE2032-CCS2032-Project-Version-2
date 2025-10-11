import React, { useState, useEffect } from "react";
import type { ChangeEvent } from "react";

import { ArrowLeft, MapPin, Tag, Plus, Save, Send } from "lucide-react"

interface CompanyData {
  name: string
  logo: string
}

const PostJobPage: React.FC = () => {
  const [companyData, setCompanyData] = useState<CompanyData>({ name: "", logo: "" })
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobType: "",
    jobCategory: "",
    jobLocation: "",
    jobTags: "",
    closingDate: "",
    jobDescription: "",
  })
  const [requirements, setRequirements] = useState<string[]>([])
  const [responsibilities, setResponsibilities] = useState<string[]>([])
  const [currentRequirement, setCurrentRequirement] = useState("")
  const [currentResponsibility, setCurrentResponsibility] = useState("")

  // Fetch company data from backend
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/company/session")
        const data = await response.json()
        setCompanyData({
          name: data.companyName || "Grag Gig",
          logo: data.companyLogo || "/generic-company-logo.png",
        })
      } catch (error) {
        console.error("Error fetching company data:", error)
        setCompanyData({
          name: "Grag Gig",
          logo: "/generic-company-logo.png",
        })
      }
    }
    fetchCompanyData()
  }, [])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addRequirement = () => {
    if (currentRequirement.trim()) {
      setRequirements((prev) => [...prev, currentRequirement.trim()])
      setCurrentRequirement("")
    }
  }

  const addResponsibility = () => {
    if (currentResponsibility.trim()) {
      setResponsibilities((prev) => [...prev, currentResponsibility.trim()])
      setCurrentResponsibility("")
    }
  }

  const removeRequirement = (index: number) => {
    setRequirements((prev) => prev.filter((_, i) => i !== index))
  }

  const removeResponsibility = (index: number) => {
    setResponsibilities((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSaveAsDraft = async () => {
    console.log("Saving as draft...", { formData, requirements, responsibilities })
    // Example: await fetch("http://localhost:5000/api/jobs/draft", { method: "POST", body: JSON.stringify(...) })
  }

  const handlePublishJob = async () => {
    console.log("Publishing job...", { formData, requirements, responsibilities })
    // Example: await fetch("http://localhost:5000/api/jobs/publish", { method: "POST", body: JSON.stringify(...) })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center overflow-hidden">
                <img
                  src={companyData.logo || "/placeholder.svg"}
                  alt={companyData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold text-gray-900">{companyData.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveAsDraft}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span className="text-sm font-medium">Save as Draft</span>
            </button>
            <button
              onClick={handlePublishJob}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span className="text-sm font-medium">Publish Job</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Post New Job</h1>
          <p className="text-gray-600">Fill in the details below to create your job posting</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-purple-600 to-purple-400"></div>
          <div className="p-8">
            {/* Basic Information */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                    <path d="M9 3v18M15 3v18M3 9h18M3 15h18" strokeWidth="2" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    JOB TITLE <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                {/* Job Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    JOB TYPE <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                  >
                    <option value="">Select job type</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                {/* Job Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    JOB CATEGORY <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="jobCategory"
                    value={formData.jobCategory}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                  >
                    <option value="">Select job category</option>
                    <option value="engineering">Engineering</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                    <option value="product">Product</option>
                  </select>
                </div>

                {/* Job Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    JOB LOCATION <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-600" />
                    <input
                      type="text"
                      name="jobLocation"
                      value={formData.jobLocation}
                      onChange={handleInputChange}
                      placeholder="e.g. New York, NY or Remote"
                      className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                </div>

                {/* Job Tags */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">JOB TAGS</label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-600" />
                    <input
                      type="text"
                      name="jobTags"
                      value={formData.jobTags}
                      onChange={handleInputChange}
                      placeholder="e.g. Engineering, Marketing, Remote"
                      className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                </div>

                {/* Closing Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    APPLICATION CLOSING DATE <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="closingDate"
                    value={formData.closingDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              {/* Job Description */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  JOB DESCRIPTION <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                />
              </div>

              {/* Requirements */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  REQUIREMENTS <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {requirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-lg">
                      <span className="flex-1 text-gray-700">{req}</span>
                      <button
                        onClick={() => removeRequirement(index)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentRequirement}
                      onChange={(e) => setCurrentRequirement(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addRequirement()}
                      placeholder="Add a requirement (e.g. Bachelor's degree in Computer Science)"
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    <button
                      onClick={addRequirement}
                      className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  RESPONSIBILITIES <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {responsibilities.map((resp, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-lg">
                      <span className="flex-1 text-gray-700">{resp}</span>
                      <button
                        onClick={() => removeResponsibility(index)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentResponsibility}
                      onChange={(e) => setCurrentResponsibility(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addResponsibility()}
                      placeholder="Add a responsibility (e.g. Lead development of new features)"
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    <button
                      onClick={addResponsibility}
                      className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handleSaveAsDraft}
            className="flex items-center gap-2 px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
          >
            <Save className="w-4 h-4" />
            Save as Draft
          </button>
          <button
            onClick={handlePublishJob}
            className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
          >
            <Send className="w-4 h-4" />
            Publish Job
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostJobPage
