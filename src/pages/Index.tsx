
import { useState, useEffect } from "react";
import { DisclaimerModal } from "@/components/DisclaimerModal";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ReviewStats } from "@/components/ReviewStats";
import { ReviewSection } from "@/components/ReviewSection";
import { WriteReviewSection } from "@/components/WriteReviewSection";

const Index = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);

  // Set up scroll animations
  useEffect(() => {
    // Add animation classes to our main sections
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.classList.add("animate-on-scroll");
      section.classList.add("opacity-0");
    });
    
    // Simple scroll animation observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    // Observe all sections with animate-on-scroll class
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });
    
    // Check if user has already accepted disclaimer in this session
    const disclaimerAccepted = sessionStorage.getItem('disclaimerAccepted');
    if (!disclaimerAccepted) {
      setShowDisclaimer(true);
    } else {
      setHasAcceptedDisclaimer(true);
    }
    
    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleDisclaimerAccept = () => {
    setShowDisclaimer(false);
    setHasAcceptedDisclaimer(true);
    sessionStorage.setItem('disclaimerAccepted', 'true');
  };

  if (!hasAcceptedDisclaimer && showDisclaimer) {
    return <DisclaimerModal onAccept={handleDisclaimerAccept} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="overflow-hidden">
        <HeroSection />
        <ReviewStats />
        <WriteReviewSection />
        <ReviewSection />
      </main>
    </div>
  );
};

export default Index;
