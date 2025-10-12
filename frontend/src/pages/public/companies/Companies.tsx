// CompanyCardGrid.tsx
import React from 'react';
import CompanyCard, { type CompanyCardProps } from '../../../components/cards/companyCard/CompanyCard';

interface CompanyCardGridProps {
  companies: CompanyCardProps[];
}

const CompanyCardGrid: React.FC<CompanyCardGridProps> = ({ companies }) => {
  return (

    <div className="max-w-7xl mx-auto px-4 text-center">
         <h2 className="text-3xl font-bold text-gray-800 mb-4">Browse by Categories</h2>
        <p className="text-gray-600 mb-10">
          Explore job opportunities across different industries and specializations
        </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
      {companies.map((company) => (
        <CompanyCard key={company.id} {...company} />
      ))}
    </div>
    </div>
  );
};

export default CompanyCardGrid;