import React from "react";
import { Search, Briefcase, MapPin } from "lucide-react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  filters: {
    search: string;
    type: string[];
    location: string[];
  };
  onFilterChange: (filterType: "type" | "location", value: string) => void;
  onClearFilters: () => void;
}

const jobTypes = [
  { label: "Internship", count: 45 },
  { label: "Part-time", count: 32 },
  { label: "Full-time", count: 128 },
];

const locations = [
  { label: "Remote", count: 67 },
  { label: "Colombo", count: 89 },
  { label: "Online", count: 54 },
];

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Search className="text-purple-600" size={18} />
        <h2 className="text-lg font-semibold text-gray-800">Smart Filters</h2>
      </div>

      <hr className="mb-4" />

      {/* Search Input */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Job title, keywords, company..."
          className="w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
          value={filters.search}
          onChange={(e) => onSearch(e.target.value)}
        />
        <Search
          size={18}
          className="absolute right-3 top-2.5 text-purple-600"
        />
      </div>

      {/* Job Type Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2 text-gray-700 font-medium">
          <Briefcase size={16} />
          <span>Job Type</span>
        </div>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <label
              key={type.label}
              className="flex items-center justify-between text-gray-700 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.type.includes(type.label)}
                  onChange={() => onFilterChange("type", type.label)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span>{type.label}</span>
              </div>
              <span className="text-gray-400 text-sm">({type.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2 text-gray-700 font-medium">
          <MapPin size={16} />
          <span>Location</span>
        </div>
        <div className="space-y-2">
          {locations.map((loc) => (
            <label
              key={loc.label}
              className="flex items-center justify-between text-gray-700 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.location.includes(loc.label)}
                  onChange={() => onFilterChange("location", loc.label)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span>{loc.label}</span>
              </div>
              <span className="text-gray-400 text-sm">({loc.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={onClearFilters}
        className="w-full bg-red-500 text-white py-2 rounded-md font-medium hover:bg-red-600 transition-colors"
      >
        ✕ Clear All Filters
      </button>
    </div>
  );
};

export default SearchBar;
