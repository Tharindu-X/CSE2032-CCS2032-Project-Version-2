import React from "react";
import { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  percentage?: string;
  bgColor?: string;
  Icon?: IconType;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  percentage,
  bgColor,
  Icon,
}) => {
  const isNegative = percentage?.startsWith("-");
  const percentageTextColor = isNegative ? "text-red-600" : "text-green-600";
  const percentageBgColor = isNegative ? "bg-red-100/50 backdrop-blur-sm" : "bg-green-100/50 backdrop-blur-sm";

  return (
    <div className={`p-6 rounded-xl shadow-md relative ${bgColor || "bg-white"} flex flex-col items-start`}>
      {/* Vertical stack: left-aligned */}
      {Icon && React.createElement(Icon as React.ElementType, { size: 28, className: "text-gray-600 mb-2" })}

      <h2 className="text-2xl font-bold mb-1">{value}</h2>
      <p className="text-black font-bold mb-2">{title}</p>
      {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}

      {/* Percentage top-right */}
      {percentage && (
        <div className="absolute top-4 right-4">
          <span
            className={`inline-block px-2 py-1 rounded-md ${percentageBgColor} ${percentageTextColor} font-semibold text-sm`}
          >
            {percentage}
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;