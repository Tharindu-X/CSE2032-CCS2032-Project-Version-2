import React, { useState, useRef, useEffect } from "react";
import { Users, Building, TrendingUp, Briefcase, Star } from "lucide-react";

type Counters = {
  users: number;
  companies: number;
  jobs: number;
};

type Feature = {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  description: string;
};

type FloatingCard = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  text: string;
  position: string;
  delay: string;
};

const AboutSection: React.FC = () => {
  const [counters, setCounters] = useState<Counters>({
    users: 0,
    companies: 0,
    jobs: 0,
  });
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const features: Feature[] = [
    {
      icon: Users,
      title: "50,000+ Active Users",
      description:
        "Join thousands of professionals who trust us with their career journey",
    },
    {
      icon: Building,
      title: "2,500+ Partner Companies",
      description:
        "From startups to Fortune 500 companies, we work with the best",
    },
    {
      icon: TrendingUp,
      title: "95% Success Rate",
      description:
        "Our users find their dream jobs faster than anywhere else",
    },
  ];

  const floatingCards: FloatingCard[] = [
    { icon: Briefcase, text: "15k+ Jobs", position: "top-1/4 -left-4", delay: "0s" },
    { icon: Users, text: "50k+ Users", position: "top-1/2 -right-4", delay: "1s" },
    { icon: Star, text: "4.9 Rating", position: "bottom-1/4 left-1/5", delay: "2s" },
  ];

  // Counter animation
  const animateCounter = (target: number, key: keyof Counters, duration = 2000) => {
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCounters((prev) => ({ ...prev, [key]: Math.floor(current) }));
    }, 16);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Animate counters
            animateCounter(50000, "users");
            animateCounter(2500, "companies");
            animateCounter(15000, "jobs");

            // Animate content
            const targetEl = entry.target as HTMLElement;
            const textContent = targetEl.querySelector(".about-text");
            const imageContent = targetEl.querySelector(".about-image");

            if (textContent) {
              textContent.classList.add("animate-slideInLeft");
            }
            if (imageContent) {
              imageContent.classList.add("animate-slideInRight");
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* About Text Content */}
          <div className="about-text opacity-0">
            {/* Section Header */}
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                About{" "}
                <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                  GragGig
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We're revolutionizing the way people find jobs and companies
                discover talent. Our platform connects ambitious professionals
                with innovative companies worldwide.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-8 mb-12">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex gap-4 items-start group">
                    <div className="w-15 h-15 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-purple-600 to-purple-400 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                Learn More
              </button>
              <button className="border-2 border-purple-600 text-purple-600 font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:bg-purple-600 hover:text-white hover:-translate-y-1">
                Our Story
              </button>
            </div>
          </div>

          {/* About Image with Floating Cards */}
          <div className="about-image opacity-0">
            <div className="relative h-96 lg:h-[500px]">
              {/* Main Container */}
              <div className="relative w-full h-full bg-gradient-to-br from-purple-600 to-purple-400 rounded-2xl overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='pattern' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='10' cy='10' r='1' fill='white' opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23pattern)'/%3E%3C/svg%3E")`,
                    }}
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent" />
              </div>

              {/* Floating Cards */}
              {floatingCards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={index}
                    className={`absolute ${card.position} bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg p-4 flex items-center gap-3 shadow-xl animate-float`}
                    style={{
                      animationDelay: card.delay,
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <IconComponent size={20} className="text-purple-600" />
                    <span className="font-semibold text-gray-900 whitespace-nowrap">
                      {card.text}
                    </span>
                  </div>
                );
              })}

              {/* Stats Display in Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <div className="text-3xl font-bold mb-1">
                        {formatNumber(counters.users)}
                      </div>
                      <div className="text-sm opacity-90">Active Users</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <div className="text-2xl font-bold mb-1">
                          {formatNumber(counters.companies)}
                        </div>
                        <div className="text-xs opacity-90">Companies</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <div className="text-2xl font-bold mb-1">
                          {formatNumber(counters.jobs)}
                        </div>
                        <div className="text-xs opacity-90">Jobs</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style >{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
