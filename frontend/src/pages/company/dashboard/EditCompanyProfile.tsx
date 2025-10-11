import React, { useState } from "react"
import { ArrowLeft, Save, Upload } from "lucide-react"

interface CompanyDetails {
  id: number
  com_name: string
  reg_no: string
  email: string
  password: string
  business_type: string
  url: string
  bio: string
  contact_no: string
  address: string
  no_of_employees: number
  image: string
}

const placeholderCompanies: CompanyDetails[] = [
  {
    id: 1,
    com_name: "Virtua",
    reg_no: "12345",
    email: "virtusa@gmail.com",
    password: "",
    business_type: "Technology",
    url: "https://www.virtusa.com",
    bio: "Virtuzo is a US-based global digital engineering and digital transformation company founded in 1996. Headquartered in Southborough, Massachusetts, it delivers digital transformation. A cloud, data analytics, and application services across industries like banking, healthcare, and telecom. It operates in 35+ countries with ~35,000 employees.",
    contact_no: "0769046448",
    address: "Colombo",
    no_of_employees: 201,
    image: "",
  },
  {
    id: 2,
    com_name: "Technova",
    reg_no: "54321",
    email: "info@technova.com",
    password: "",
    business_type: "Finance",
    url: "https://www.technova.com",
    bio: "Technova is a financial tech company specializing in digital banking solutions and fintech applications for modern businesses worldwide.",
    contact_no: "0771234567",
    address: "Galle",
    no_of_employees: 120,
    image: "",
  },
]

export default function EditCompanyPage() {
  // Use first company as initial data
  const [companyData, setCompanyData] = useState<CompanyDetails>(placeholderCompanies[0])
  const [logoPreview, setLogoPreview] = useState<string>(companyData.image)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCompanyData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setLogoPreview(reader.result as string)
      reader.readAsDataURL(file)
      setCompanyData((prev) => ({ ...prev, image: file.name }))
    }
  }

  const handleSaveDraft = () => console.log("Saving as draft...", companyData)
  const handleUpdateCompany = () => console.log("Updating company...", companyData)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="font-semibold text-gray-900">{companyData.com_name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveDraft}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save as Draft
            </button>
            <button
              onClick={handleUpdateCompany}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm"
            >
              <Upload className="w-4 h-4" />
              Update Company
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Company Details</h1>
          <p className="text-gray-600">Update your company information below</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" />
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                name="com_name"
                value={companyData.com_name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
              <input
                type="text"
                name="reg_no"
                value={companyData.reg_no}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
              <select
                name="business_type"
                value={companyData.business_type}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
              >
                <option>Select Type</option>
                <option>Technology</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>Retail</option>
                <option>Manufacturing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Employees</label>
              <input
                type="number"
                name="no_of_employees"
                value={companyData.no_of_employees}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Email</label>
              <input
                type="email"
                name="email"
                value={companyData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
              <input
                type="tel"
                name="contact_no"
                value={companyData.contact_no}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
              <input
                type="url"
                name="url"
                value={companyData.url}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={companyData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition-colors">
              <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" id="logo-input" />
              <label htmlFor="logo-input" className="flex flex-col items-center gap-3 cursor-pointer">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-purple-500" />
                </div>
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo Preview" className="w-24 h-24 object-cover rounded-lg mx-auto" />
                ) : (
                  <p className="text-sm text-gray-600">Choose file or drag here</p>
                )}
              </label>
            </div>
          </div>

          {/* Company Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Bio</label>
            <textarea
              name="bio"
              value={companyData.bio}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
