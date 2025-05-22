
import { useState, useEffect } from "react";
import { DisclaimerModal } from "@/components/DisclaimerModal";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ReviewStats } from "@/components/ReviewStats";
import { ReviewSection } from "@/components/ReviewSection";
import { WriteReviewSection } from "@/components/WriteReviewSection";
import { BackgroundSky } from "@/components/BackgroundSky";
import { FloatingIcons, ScrollSection, ParallaxContainer } from "@/components/ScrollAnimations";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);

  // Use our custom hook for scroll animations
  useScrollAnimation(".animate-on-scroll", "animate-fade-in", { threshold: 0.2 });

  // Set up scroll animations
  useEffect(() => {
    // Add animation classes to our main sections
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.classList.add("animate-on-scroll");
      section.classList.add("opacity-0");
    });
    
    // Check if user has already accepted disclaimer in this session
    const disclaimerAccepted = sessionStorage.getItem('disclaimerAccepted');
    if (!disclaimerAccepted) {
      setShowDisclaimer(true);
    } else {
      setHasAcceptedDisclaimer(true);
    }
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
    <div className="min-h-screen">
      <BackgroundSky />
      <FloatingIcons />
      
      <Header />
      <main className="overflow-hidden relative z-10">
        <ParallaxContainer speed={0.2}>
          <HeroSection />
        </ParallaxContainer>
        
        <ScrollSection>
          <ReviewStats />
        </ScrollSection>
        
        <ScrollSection>
          <WriteReviewSection />
        </ScrollSection>
        
        <ScrollSection>
          <ReviewSection />
        </ScrollSection>
      </main>
    </div>
  );
};

export default Index;
