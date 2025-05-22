
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

  useEffect(() => {
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <ReviewStats />
        <WriteReviewSection />
        <ReviewSection />
      </main>
    </div>
  );
};

export default Index;
