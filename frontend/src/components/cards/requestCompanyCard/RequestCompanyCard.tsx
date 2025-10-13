import React from 'react';
import { useDarkMode } from  '../../../pages/student/darkmodecontext/DarkModeContext';

interface RequestCompanyCardProps {
  imageUrl: string;
  companyName: string;
  jobTitle: string;
  description: string;
  moreInfoUrl: string;
  onConfirm: () => void;
  onReject: () => void;
}

const RequestCompanyCard: React.FC<RequestCompanyCardProps> = ({
  imageUrl,
  companyName,
  jobTitle,
  description,
  moreInfoUrl,
  onConfirm,
  onReject,
}) => {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className="w-80 h-80 rounded-2xl border-2 border-[#9333ea] shadow-lg flex flex-col p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-600/30"
      style={{ backgroundColor: isDarkMode ? '#1f2937' : '#ffffff' }}
    >
      {/* Image Section */}
      <div
        className="w-full h-32 mb-3 rounded-lg overflow-hidden"
        style={{ backgroundColor: isDarkMode ? '#374151' : '#f3f4f6' }}
      >
        <img
          src={imageUrl}
          alt={companyName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Description Section */}
      <div className="flex-1 mb-3">
        <h3
          className="text-lg font-bold mb-1"
          style={{ color: isDarkMode ? '#f9fafb' : '#1f2937' }}
        >
          {companyName}
        </h3>
        <h4 className="text-md font-semibold text-[#9333ea] mb-2">{jobTitle}</h4>
        <p
          className="text-sm line-clamp-3"
          style={{ color: isDarkMode ? '#d1d5db' : '#475569' }}
        >
          {description}
        </p>
      </div>

      {/* More Info Button */}
      <a
        href={moreInfoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-center text-sm underline mb-3 hover:text-purple-700"
        style={{ color: '#9333ea' }}
      >
        More Info
      </a>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onConfirm}
          className="flex-1 py-2 px-4 border border-[#9333ea] rounded-full text-[#9333ea] font-medium hover:bg-[#9333ea] hover:text-white transition-colors"
          style={{ backgroundColor: isDarkMode ? 'transparent' : '#ffffff' }}
        >
          Confirm
        </button>
        <button
          onClick={onReject}
          className="flex-1 py-2 px-4 border border-red rounded-full text-red-500 font-medium hover:bg-red-500 hover:text-white transition-colors"
          style={{ backgroundColor: isDarkMode ? 'transparent' : '#ffffff' }}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default RequestCompanyCard;
