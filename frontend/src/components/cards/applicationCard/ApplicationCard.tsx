import React from "react";
import { Mail, Phone, MapPin, GraduationCap } from "lucide-react";

interface ApplicationCardProps {
  name: string;
  email: string;
  degree: string;
  phone?: string;
  location?: string;
  appliedDate?: string;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  name,
  email,
  degree,
  phone = "undefined",
  location = "undefined",
  appliedDate = "Invalid Date",
}) => {
  return (
    <div className="max-w-lg w-full rounded-xl border border-gray-200 shadow-md p-4 flex items-start justify-between bg-white">
      {/* Left side - Avatar + Info */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-500 text-white font-bold text-lg">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </div>

        {/* Info */}
        <div>
          <h2 className="font-semibold text-gray-800">{name}</h2>
          <div className="flex items-center text-sm text-gray-600 gap-2">
            <Mail className="w-4 h-4 text-blue-500" />
            {email}
          </div>
          <div className="flex items-center text-sm text-gray-600 gap-2">
            <GraduationCap className="w-4 h-4 text-gray-700" />
            {degree}
          </div>
          <div className="flex items-center text-sm text-gray-600 gap-2">
            <Phone className="w-4 h-4 text-pink-500" />
            {phone}
          </div>
          <div className="flex items-center text-sm text-gray-600 gap-2">
            <MapPin className="w-4 h-4 text-pink-600" />
            {location}
          </div>
          <p className="text-xs text-gray-400">Applied: {appliedDate}</p>
        </div>
      </div>

      {/* Right side - Contact Button */}
      <button className="border px-3 py-1 text-sm rounded-md text-gray-700 hover:bg-gray-100 transition">
        Contact
      </button>
    </div>
  );
};

export default ApplicationCard;