import * as React from "react";
import CareerOptionCard from "../../../../../components/cards/CareerOptionCard/CareerOptionCard";
import {
  Monitor,
  Briefcase,
  Settings,
  TrendingUp,
  Heart,
  Scale,
  Sprout,
  Palmtree,
} from "lucide-react";



const CareerOptions: React.FC = () => {
  const categories = [
    {
      id: 1,
      icon: <Monitor size={32} strokeWidth={2} />,
      title: "Information & Communication Technology (ICT)",
      jobCount: "1.2K+ job openings",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 2,
      icon: <Briefcase size={32} strokeWidth={2} />,
      title: "Business Management / Administration",
      jobCount: "900+ job openings",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 3,
      icon: <Settings size={32} strokeWidth={2} />,
      title: "Engineering (Civil, Electrical, Mechanical)",
      jobCount: "1k+ job openings",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 4,
      icon: <TrendingUp size={32} strokeWidth={2} />,
      title: "Accounting & Finance",
      jobCount: "800+ job openings",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 5,
      icon: <Heart size={32} strokeWidth={2} />,
      title: "Health Sciences / Nursing / Pharmacy",
      jobCount: "700+ job openings",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 6,
      icon: <Scale size={32} strokeWidth={2} />,
      title: "Law / Legal Studies",
      jobCount: "200+ job openings",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 7,
      icon: <Sprout size={32} strokeWidth={2} />,
      title: "Agriculture & Food Technology",
      jobCount: "350+ job openings",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 8,
      icon: <Palmtree size={32} strokeWidth={2} />,
      title: "Tourism & Hospitality Management",
      jobCount: "450+ job openings",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-purple-600">Countless Career Options</span>{" "}
            <span className="text-gray-900">Are Waiting For You To Explore</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Discover job openings tailored to your degree and expertise. Find roles that match your academic background and career goals. Start your journey by selecting a field that aligns with your passion!
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CareerOptionCard
              key={category.id}
              icon={category.icon}
              title={category.title}
              jobCount={category.jobCount}
              iconBgColor={category.iconBgColor}
              iconColor={category.iconColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerOptions;