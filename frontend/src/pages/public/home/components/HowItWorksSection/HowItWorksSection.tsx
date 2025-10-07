import React, { useState, useEffect, useRef } from "react";
import { UserPlus, User, Send, Handshake } from "lucide-react";

// ✅ Step type
type Step = {
  id: number;
  number: string;
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  description: string;
};

const HowItWorksSection: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);

  const steps: Step[] = [
    {
      id: 1,
      number: "01",
      icon: UserPlus,
      title: "Create Your Account",
      description:
        "Create your free CareerLink account as a Student, Company just a few clicks to unlock exclusive access to a world of job opportunities and landing your dream job. It's quick, easy, and completely free.",
    },
    {
      id: 2,
      number: "02",
      icon: User,
      title: "Complete Your Profile",
      description:
        "Add your details, interests, and goals to stand out. For companies, showcase your brand and job offerings. A complete profile increases visibility and trust.",
    },
    {
      id: 3,
      number: "03",
      icon: Send,
      title: "Explore & Post Opportunities",
      description:
        "Students can explore internships, part-time, and full-time jobs. Companies and career units can post exciting openings. The platform keeps everything organized and easy to access.",
    },
    {
      id: 4,
      number: "04",
      icon: Handshake,
      title: "Connect & Get Hired",
      description:
        "Apply, communicate, and take the next step in your career. Companies can review applicants and schedule interviews. Build meaningful connections and launch your future.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll<HTMLElement>(
              ".step-card"
            );
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-fadeInUp");
              }, index * 200);
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
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It Works in{" "}
            <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              4 Quick Easy Steps
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started with CareerConnect in just a few simple steps and unlock
            thousands of job opportunities
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const IconComponent = step.icon;

            return (
              <div
                key={step.id}
                className="step-card group relative bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl opacity-0"
                style={{
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Top Border Animation */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                {/* Step Number */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl flex items-center justify-center text-white">
                  <IconComponent size={32} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-4 text-gray-900 text-left">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-left leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default HowItWorksSection;
