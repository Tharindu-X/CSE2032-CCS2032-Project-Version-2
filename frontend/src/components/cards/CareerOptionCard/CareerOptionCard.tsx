// src/components/CareerOptionCard.tsx
import React from "react";

interface CareerOptionCardProps {
  icon: React.ReactNode;
  title: string;
  jobCount: string;
  iconBgColor?: string;
  iconColor?: string;
}

const CareerOptionCard: React.FC<CareerOptionCardProps> = ({
  icon,
  title,
  jobCount,
  iconBgColor = "bg-purple-100",
  iconColor = "text-purple-600",
}) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 cursor-pointer">
      {/* Icon Container */}
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${iconBgColor} ${iconColor} mb-4`}>
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">
        {title}
      </h3>

      {/* Job Count */}
      <p className="text-sm font-medium text-gray-500">
        {jobCount}
      </p>
    </div>
  );
};

export default CareerOptionCard;