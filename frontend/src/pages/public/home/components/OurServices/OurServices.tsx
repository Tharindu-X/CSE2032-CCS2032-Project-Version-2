import React from 'react';
import { Search, Building2, GraduationCap, Star, UserPlus, BarChart3 } from 'lucide-react';
import ServiceCard from "../../../../../components/cards/serviceCard/ServiceCard";

const OurServices: React.FC = () => {
  const services = [
    {
      icon: Search,
      title: "Job & Internship Listings",
      description: "Find full-time jobs, part-time roles, and internships from top companies.",
      features: ["Verified listings", "Easy apply options", "Up-to-date openings"]
    },
    {
      icon: Building2,
      title: "Company & Career Unit Dashboard",
      description: "Manage job posts, track applications, and engage with top talent.",
      features: ["Post full-time/part-time jobs", "Manage applications", "Analytics & reports"]
    },
    {
      icon: GraduationCap,
      title: "Advanced Search & Filters",
      description: "Find opportunities faster with smart search and filtering tools.",
      features: ["Degree-based search", "Location filters", "Type of work"]
    },
    {
      icon: Star,
      title: "Featured Job Highlights",
      description: "Companies can promote key openings with featured listings that attract top talent fast.",
      features: ["Priority placement", "More candidate views", "Highlighted design"]
    },
    {
      icon: UserPlus,
      title: "User Role Selection & Sign-Up",
      description: "Seamlessly register as a student, graduate, company, or career unit to access custom features.",
      features: ["Quick sign-up", "Role-specific dashboards", "Easy account management"]
    },
    {
      icon: BarChart3,
      title: "Statistics & Insights",
      description: "View live platform stats on jobs, companies, and student participation.",
      features: ["Real-time stats", "Growth tracking", "Visual insights"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-purple-600">Services</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions to help you succeed in your career journey and business growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;