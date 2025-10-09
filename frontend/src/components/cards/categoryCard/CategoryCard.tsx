import React from "react";
import type { LucideIcon } from "lucide-react"; // optional for typing
 // optional for typing

interface CategoryCardProps {
  id: number;
  name: string;
  description: string;
  icon: LucideIcon; // <- this tells TS that icon is a Lucide icon component
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, description, icon: Icon }) => {
  return (
    <div
      key={id}
      className="relative bg-white rounded-2xl shadow-md p-6 w-72 hover:shadow-xl transition-all cursor-pointer"
    >
      {/* Purple circle in top-right corner */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">
        O
      </div>

      {/* Icon in center */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-4">
        <Icon size={28} /> {/* Render the icon dynamically */}
      </div>

      {/* Title + Description */}
      <h3 className="text-lg font-montserrat text-gray-800 font-bold">{name}</h3>
      <p className="text-sm font-montserrat text-gray-500 mt-2">{description}</p>
    </div>
  );
};

export default CategoryCard;
