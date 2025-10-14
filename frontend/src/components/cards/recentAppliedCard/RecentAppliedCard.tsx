import React from 'react';
import { useDarkMode } from '../../../pages/student/darkmodecontext/DarkModeContext';

interface RecentlyAppliedProps {
  imageUrl: string;
  jobTitle: string;
  companyName: string;
  appliedDate: string;
  status?: 'pending' | 'approved' | 'rejected';
}

const RecentlyApplied: React.FC<RecentlyAppliedProps> = ({
  imageUrl,
  jobTitle,
  companyName,
  appliedDate,
  status
}) => {
  const { isDarkMode } = useDarkMode();

  const getStatusColor = (status?: string) => {
    if (!status) return '';
    switch (status) {
      case 'pending':
        return 'text-yellow-600';
      case 'approved':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return '';
    }
  };

  const getStatusBgColor = (status?: string) => {
    if (!status) return '';
    switch (status) {
      case 'pending':
        return 'bg-yellow-100';
      case 'approved':
        return 'bg-green-100';
      case 'rejected':
        return 'bg-red-100';
      default:
        return '';
    }
  };

  return (
    <div
      className="w-full rounded-3xl border-2 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl p-6 mb-4"
      style={{
        // Use a slightly different bg than the parent so the rounding is visible
        backgroundColor: isDarkMode ? '#111827' : '#ffffff',
        borderColor: isDarkMode ? '#4b5563' : '#e2e8f0'
      }}
    >
      <div className="flex items-start gap-4">
        {/* Company Image */}
        <div
          className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0"
          style={{ backgroundColor: isDarkMode ? '#374151' : '#f3f4f6' }}
        >
          <img
            src={imageUrl}
            alt={companyName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3
                className="text-lg font-semibold mb-1 truncate"
                style={{ color: isDarkMode ? '#f9fafb' : '#1f2937' }}
              >
                {jobTitle}
              </h3>
              <p
                className="text-sm font-medium mb-2"
                style={{ color: isDarkMode ? '#d1d5db' : '#6b7280' }}
              >
                {companyName}
              </p>
              <p
                className="text-xs"
                style={{ color: isDarkMode ? '#9ca3af' : '#9ca3af' }}
              >
                Applied on {appliedDate}
              </p>
            </div>

            {/* Status Badge */}
            {status && (
              <div
                className={`px-4 py-2 rounded-2xl text-xs font-medium ${getStatusColor(status)} ${getStatusBgColor(status)}`}
                style={{
                  backgroundColor: isDarkMode 
                    ? status === 'pending' ? '#451a03' 
                      : status === 'approved' ? '#064e3b' 
                      : '#7f1d1d'
                    : getStatusBgColor(status).replace('bg-', 'bg-'),
                  color: isDarkMode 
                    ? status === 'pending' ? '#fbbf24'
                      : status === 'approved' ? '#10b981'
                      : '#ef4444'
                    : getStatusColor(status).replace('text-', 'text-')
                }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentlyApplied;
