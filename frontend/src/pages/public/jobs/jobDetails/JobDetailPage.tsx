import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../../components/common/header/Header';
import Footer from '../../../../components/common/footer/Footer';
import { ArrowLeft, MapPin, Calendar, Users, Briefcase, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '../../../../context/AuthContext';

interface Job {
  job_id: number;
  com_id: number;
  job_title: string;
  job_type: string;
  job_location: string;
  job_description: string;
  job_category: string;
  requirements: string;
  responsibilities: string;
  no_of_applicants: number;
  job_tags: string;
  closing_date: string;
  created_at: string;
  company_name?: string;
}

const JobDetailPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
        setJob(response.data);
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  const handleApply = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    if (user?.role !== 'student') {
      alert('Only students can apply for jobs');
      return;
    }

    setApplying(true);
    try {
      await axios.post(
        'http://localhost:5000/api/student/apply',
        { jobId: job?.job_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Application submitted successfully!');
    } catch (error: any) {
      console.error('Error applying for job:', error);
      alert(error.response?.data?.message || 'Failed to apply for job');
    } finally {
      setApplying(false);
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time':
        return 'bg-blue-100 text-blue-700';
      case 'part-time':
        return 'bg-green-100 text-green-700';
      case 'contract':
        return 'bg-purple-100 text-purple-700';
      case 'internship':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCompanyColor = (company: string = '') => {
    const colors = [
      'bg-purple-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500'
    ];
    const index = company.length % colors.length;
    return colors[index];
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center pt-16">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center pt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Not Found</h2>
          <button
            onClick={() => navigate('/jobs')}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Jobs
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const requirements = job.requirements ? job.requirements.split('\n').filter(req => req.trim()) : [];
  const responsibilities = job.responsibilities ? job.responsibilities.split('\n').filter(resp => resp.trim()) : [];
  const tags = job.job_tags ? job.job_tags.split(',').map(tag => tag.trim()) : [];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>

          {/* Job Header Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className="p-8">
              {/* Company Logo & Title */}
              <div className="flex items-start gap-6 mb-6">
                <div className={`w-20 h-20 ${getCompanyColor(job.company_name || '')} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <span className="text-3xl font-bold text-white">
                    {(job.company_name || 'C')[0].toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.job_title}</h1>
                  <p className="text-xl text-gray-600 mb-4">{job.company_name || 'Company'}</p>
                  <div className="flex flex-wrap gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getTypeBadgeColor(job.job_type)}`}>
                      {job.job_type}
                    </span>
                    {job.job_category && (
                      <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-gray-100 text-gray-700">
                        {job.job_category}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Job Meta Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Location</p>
                    <p className="text-sm font-semibold text-gray-800">{job.job_location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Closing Date</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {new Date(job.closing_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Applicants</p>
                    <p className="text-sm font-semibold text-gray-800">{job.no_of_applicants}</p>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              {user?.role === 'student' && (
                <button
                  onClick={handleApply}
                  disabled={applying}
                  className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {applying ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Applying...
                    </>
                  ) : (
                    <>
                      <Briefcase className="w-5 h-5" />
                      Apply Now
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{job.job_description}</p>
          </div>

          {/* Requirements */}
          {requirements.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-3">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Responsibilities */}
          {responsibilities.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsibilities</h2>
              <ul className="space-y-3">
                {responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills & Tags</h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobDetailPage;
