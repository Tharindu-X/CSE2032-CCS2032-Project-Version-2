import React from "react";
import CategoryCard from "../../../components/cards/categoryCard/CategoryCard";

import { GraduationCap, Cpu, Heart, ShoppingCart, DollarSign, Factory, Coffee, Tractor, Home, Truck, Film, Briefcase, Zap, Phone, Scissors, MoreHorizontal } from "lucide-react";


const categories = [
  { id: 1, name: "Education", description: "Teaching, academic, and educational services", icon: GraduationCap },
  { id: 2, name: "Technology", description: "Software development, IT, and tech innovation roles", icon: Cpu },
  { id: 3, name: "Healthcare", description: "Medical and healthcare-related positions", icon: Heart },
  { id: 4, name: "Retail", description: "Sales, merchandising, and retail management", icon: ShoppingCart },
  { id: 5, name: "Finance", description: "Banking, accounting, and financial analysis", icon: DollarSign },
  { id: 6, name: "Manufacturing", description: "Production, factory, and mechanical roles", icon: Factory },
  { id: 7, name: "Hospitality and Tourism", description: "Hotel, travel, and guest services", icon: Coffee },
  { id: 8, name: "Agriculture", description: "Farming, food production, and rural development", icon: Tractor },
  { id: 9, name: "Construction and Real Estate", description: "Building, property, and real estate services", icon: Home },
  { id: 10, name: "Transportation and Logistics", description: "Transport, delivery, and supply chain roles", icon: Truck },
  { id: 11, name: "Media and Entertainment", description: "Film, TV, music, and creative media", icon: Film },
  { id: 12, name: "Professional Services", description: "Legal, consulting, and administrative roles", icon: Briefcase },
  { id: 13, name: "Energy and Utilities", description: "Power, water, and utility services", icon: Zap },
  { id: 14, name: "Telecommunications", description: "Network, telecom, and communication services", icon: Phone },
  { id: 15, name: "Fashion and Beauty", description: "Apparel, cosmetics, and lifestyle brands", icon: Scissors },
  { id: 16, name: "Other", description: "Uncategorized or unique job roles", icon: MoreHorizontal },
];


const CategoryGrid: React.FC = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Browse by Categories</h2>
        <p className="text-gray-600 mb-10">
          Explore job opportunities across different industries and specializations
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              description={category.description}
              icon={category.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
