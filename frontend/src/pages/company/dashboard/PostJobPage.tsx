import React, { useState, useEffect, type ChangeEvent } from "react";
import { ArrowLeft, MapPin, Tag, Plus, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CompanyData {
  name: string;
  logo: string;
}

const PostJobPage: React.FC = () => {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState<CompanyData>({ name: "", logo: "" });
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobType: "",
    jobCategory: "",
    jobLocation: "",
    jobTags: "",
    closingDate: "",
    jobDescription: "",
  });
  const [requirements, setRequirements] = useState<string[]>([]);
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [currentRequirement, setCurrentRequirement] = useState("");
  const [currentResponsibility, setCurrentResponsibility] = useState("");

  // Load company data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setCompanyData({
        name: parsedUser.com_name,
        logo: parsedUser.image || "/generic-company-logo.png",
      });
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addRequirement = () => {
    if (currentRequirement.trim()) {
      setRequirements((prev) => [...prev, currentRequirement.trim()]);
      setCurrentRequirement("");
    }
  };

  const addResponsibility = () => {
    if (currentResponsibility.trim()) {
      setResponsibilities((prev) => [...prev, currentResponsibility.trim()]);
      setCurrentResponsibility("");
    }
  };

  const removeRequirement = (index: number) => setRequirements((prev) => prev.filter((_, i) => i !== index));
  const removeResponsibility = (index: number) => setResponsibilities((prev) => prev.filter((_, i) => i !== index));

  const handlePublishJob = async () => {
    try {
      const token = localStorage.getItem("token");
      const closingDate = formData.closingDate ? new Date(formData.closingDate).toISOString().split("T")[0] : "";

      const payload = {
        job_title: formData.jobTitle,
        job_type: formData.jobType,
        job_category: formData.jobCategory,
        job_location: formData.jobLocation,
        job_description: formData.jobDescription,
        requirements,
        responsibilities,
        job_tags: formData.jobTags.split(",").map((t) => t.trim()),
        closing_date: closingDate,
      };

      const res = await fetch("http://localhost:5000/api/jobs/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to add job: ${text}`);
      }

      const data = await res.json();
      alert(`Job added successfully! Job ID: ${data.jobId}`);
      // After posting, go to jobs page to see it
      navigate("/jobs");
    } catch (err: any) {
      console.error(err);
      alert(`Error adding job: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/company/dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center overflow-hidden">
                <img src={companyData.logo || "/placeholder.svg"} alt={companyData.name} className="w-full h-full object-cover" />
              </div>
              <span className="font-semibold text-gray-900">{companyData.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
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
            {/* Form Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">JOB TITLE *</label>
                <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} placeholder="Senior Software Engineer" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"/>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">JOB TYPE *</label>
                <select name="jobType" value={formData.jobType} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white">
                  <option value="">Select job type</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">JOB CATEGORY *</label>
                <select name="jobCategory" value={formData.jobCategory} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white">
                  <option value="">Select job category</option>
                  <option value="engineering">Engineering</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="product">Product</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">JOB LOCATION *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-600" />
                  <input type="text" name="jobLocation" value={formData.jobLocation} onChange={handleInputChange} placeholder="Colombo, Sri Lanka" className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"/>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">CLOSING DATE *</label>
                <input type="date" name="closingDate" value={formData.closingDate} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"/>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">JOB TAGS</label>
                <input type="text" name="jobTags" value={formData.jobTags} onChange={handleInputChange} placeholder="e.g. React, Node.js, Remote" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"/>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-900 mb-2">JOB DESCRIPTION *</label>
                <textarea name="jobDescription" value={formData.jobDescription} onChange={handleInputChange} rows={6} placeholder="Describe the role..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"/>
              </div>
            </div>

            {/* Requirements Section */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">REQUIREMENTS</label>
              <div className="space-y-3">
                {requirements.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-lg">
                    <span className="flex-1 text-gray-700">{req}</span>
                    <button onClick={() => removeRequirement(idx)} className="text-red-500 hover:text-red-700 text-sm font-medium">Remove</button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input type="text" value={currentRequirement} onChange={(e) => setCurrentRequirement(e.target.value)} placeholder="Add requirement" className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"/>
                  <button onClick={addRequirement} className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"><Plus className="w-4 h-4"/>Add</button>
                </div>
              </div>
            </div>

            {/* Responsibilities Section */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">RESPONSIBILITIES</label>
              <div className="space-y-3">
                {responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-lg">
                    <span className="flex-1 text-gray-700">{resp}</span>
                    <button onClick={() => removeResponsibility(idx)} className="text-red-500 hover:text-red-700 text-sm font-medium">Remove</button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input type="text" value={currentResponsibility} onChange={(e) => setCurrentResponsibility(e.target.value)} placeholder="Add responsibility" className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"/>
                  <button onClick={addResponsibility} className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"><Plus className="w-4 h-4"/>Add</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;
