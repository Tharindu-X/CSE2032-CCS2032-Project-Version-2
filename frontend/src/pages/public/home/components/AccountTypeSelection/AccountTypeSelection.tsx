import React, { useState, useRef, useEffect } from "react";
import {
  GraduationCap,
  Building,
  Check,
  UserCheck,
  Briefcase,
} from "lucide-react";

// ✅ Type for account card
type AccountType = {
  id: "student" | "company";
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonIcon: React.ComponentType<{ size?: number }>;
};

const AccountTypeSelection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const accountTypes: AccountType[] = [
    {
      id: "student",
      icon: GraduationCap,
      title: "Student / Job Seeker",
      description:
        "Perfect for students, fresh graduates, and professionals looking for new opportunities",
      features: [
        "Browse unlimited job listings",
        "Create professional profile",
        "Apply to multiple jobs",
        "Track application status",
        "Get job recommendations",
      ],
      buttonText: "Join as Student",
      buttonIcon: UserCheck,
    },
    {
      id: "company",
      icon: Building,
      title: "Company / Employer",
      description:
        "Ideal for companies, startups, and organizations looking to hire talented professionals",
      features: [
        "Post unlimited job listings",
        "Access candidate database",
        "Manage applications",
        "Company branding tools",
        "Analytics and insights",
      ],
      buttonText: "Join as Company",
      buttonIcon: Briefcase,
    },
  ];

  const handleCardClick = (typeId: string) => {
    setSelectedType(typeId);
    // Add selection animation
    const card = document.querySelector<HTMLDivElement>(
      `[data-card="${typeId}"]`
    );
    if (card) {
      card.style.transform = "scale(1.02)";
      setTimeout(() => {
        card.style.transform = "";
      }, 200);
    }
  };

  const handleSignUp = (accountType: string) => {
    // Navigate to signup page with account type
    window.location.href = "signup.html";
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll<HTMLElement>(
              ".account-card"
            );
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-slideInUp");
              }, index * 300);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              Account Type
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the account type that best fits your needs and get started
            with personalized features
          </p>
        </div>

        {/* Account Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {accountTypes.map((type) => {
            const IconComponent = type.icon;
            const ButtonIconComponent = type.buttonIcon;
            const isSelected = selectedType === type.id;

            return (
              <div
                key={type.id}
                data-card={type.id}
                className={`account-card group relative bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer opacity-0 ${
                  isSelected ? "ring-2 ring-purple-500 shadow-xl" : ""
                }`}
                style={{
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
                onClick={() => handleCardClick(type.id)}
              >
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Card Header */}
                <div className="relative z-10 p-8 pb-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl flex items-center justify-center text-white">
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {type.title}
                  </h3>
                </div>

                {/* Card Content */}
                <div className="relative z-10 px-8 pb-8">
                  <p className="text-gray-600 text-center mb-8 leading-relaxed">
                    {type.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {type.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-green-600" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSignUp(type.id);
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group-hover:shadow-purple-500/25"
                  >
                    <ButtonIconComponent size={20} />
                    {type.buttonText}
                  </button>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-purple-600 hover:text-purple-500 font-semibold transition-colors duration-200"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default AccountTypeSelection;
