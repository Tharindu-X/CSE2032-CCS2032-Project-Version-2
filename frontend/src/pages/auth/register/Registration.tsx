import React, { useState } from 'react';
import { User, Building2, GraduationCap, ArrowLeft } from 'lucide-react';
import { BsBriefcaseFill } from 'react-icons/bs';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

type AccountType = 'student' | 'company';

export default function SignupPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [accountType, setAccountType] = useState<AccountType>('student');
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 Common Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 🔹 Student Fields
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [year, setYear] = useState('');
  const [dgree, setDegree] = useState('');
  const [depName, setDepName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');

  // 🔹 Company Fields
  const [comName, setComName] = useState('');
  const [comRegNo, setComRegNo] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [address, setAddress] = useState('');
  const [noOfEmployees, setNoOfEmployees] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      setIsLoading(false);
      return;
    }

    try {
      let payload: any = { accountType, email, password };

      if (accountType === 'student') {
        payload = {
          ...payload,
          f_name: fName,
          l_name: lName,
          year,
          dgree,
          dep_name: depName,
          reg_no: regNo,
          linkedin_url: linkedinUrl,
        };
      } else {
        payload = {
          ...payload,
          com_name: comName,
          reg_no: comRegNo,
          bussiness_type: businessType,
          contact_no: contactNo,
          address,
          no_of_employees: noOfEmployees,
        };
      }

      const success = await register(payload);
      
      if (success) {
        alert(`${accountType === 'student' ? 'Student' : 'Company'} registered successfully!`);
        
        // Get user role from localStorage to determine redirect
        const role = localStorage.getItem('role');
        
        // Redirect based on role
        if (role === "student") {
          navigate("/student/dashboard");
        } else if (role === "company") {
          navigate("/company/dashboard");
        } else if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 p-4">
      <div className="w-full max-w-2xl rounded-4xl bg-white p-11 shadow-5xl">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <ArrowLeft className="text-gray-500 text-lg cursor-pointer" />
          <div className="flex items-center flex-1 justify-center -ml-6">
            <BsBriefcaseFill className="text-purple-700 text-2xl mr-2" />
            <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
              GragGig
            </h1>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <p className="text-lg font-medium text-gray-800">Create Your Account</p>
          <p className="text-sm text-gray-500">Join our community today</p>
        </div>

        {/* Account Type Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setAccountType('student')}
            className={`flex-1 py-2 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${
              accountType === 'student'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <GraduationCap size={20} />
            Student
          </button>
          <button
            onClick={() => setAccountType('company')}
            className={`flex-1 py-2 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${
              accountType === 'company'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Building2 size={20} />
            Company
          </button>
        </div>

        {/* Student Form */}
        {accountType === 'student' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" value={fName} onChange={(e) => setFName(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" value={lName} onChange={(e) => setLName(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select value={depName} onChange={(e) => setDepName(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2">
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Business">Business</option>
                  <option value="Arts">Arts</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                <select value={dgree} onChange={(e) => setDegree(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2">
                  <option value="">Select Degree</option>
                  <option value="BSc">BSc</option>
                  <option value="BA">BA</option>
                  <option value="BEng">BEng</option>
                  <option value="MSc">MSc</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select value={year} onChange={(e) => setYear(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2">
                  <option value="">Select Year</option>
                  <option value="1">Year 1</option>
                  <option value="2">Year 2</option>
                  <option value="3">Year 3</option>
                  <option value="4">Year 4</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                <input type="text" value={regNo} onChange={(e) => setRegNo(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile URL</label>
              <input type="url" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
            </div>

            <button 
              type="submit" 
              className="w-full flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 py-2.5 text-white font-semibold disabled:opacity-50"
              disabled={isLoading}
            >
              <User size={20} className="mr-2" />
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        )}

        {/* Company Form */}
        {accountType === 'company' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input type="text" value={comName} onChange={(e) => setComName(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Registration Number</label>
                <input type="text" value={comRegNo} onChange={(e) => setComRegNo(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                <select value={businessType} onChange={(e) => setBusinessType(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2">
                  <option value="">Select Business Type</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Services">Services</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input type="tel" value={contactNo} onChange={(e) => setContactNo(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Employees</label>
                <select value={noOfEmployees} onChange={(e) => setNoOfEmployees(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2">
                  <option value="">Select Range</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="500+">500+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Address</label>
              <textarea rows={3} value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2 resize-none" />
            </div>

            <button 
              type="submit" 
              className="w-full flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 py-2.5 text-white font-semibold disabled:opacity-50"
              disabled={isLoading}
            >
              <User size={20} className="mr-2" />
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
