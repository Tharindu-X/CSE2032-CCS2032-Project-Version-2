import * as React from "react";
import Header from "../../../components/common/header/Header";
import Footer from "../../../components/common/footer/Footer";
import HeroSection from "./components/HeroSection/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection/HowItWorksSection";
import AccountTypeSelection from "./components/AccountTypeSelection/AccountTypeSelection";
import OurServices from "./components/OurServices/OurServices";
import AboutSection from "./components/AboutSection/AboutSection";
import CareerOptionsSection from "./components/CareerOptionsSection/CareerOptionsSection";

const Home: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <section id="hero">
          <HeroSection />
        </section>
        <section id="how-it-works">
          <HowItWorksSection />
        </section>
        <section id="account-type">
          <AccountTypeSelection />
        </section>
        <section id="career-options">
          <CareerOptionsSection />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        <section id="services">
          <OurServices />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
