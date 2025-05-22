
import { useState, useEffect } from "react";
import { DisclaimerModal } from "@/components/DisclaimerModal";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ReviewStats } from "@/components/ReviewStats";
import { ReviewSection } from "@/components/ReviewSection";
import { WriteReviewSection } from "@/components/WriteReviewSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ErrorBoundary } from "react-error-boundary";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Fallback component to render when errors occur
const ErrorFallback = () => {
  return (
    <Alert variant="destructive" className="m-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        Something went wrong loading the 3D components. Please refresh the page or try again later.
      </AlertDescription>
    </Alert>
  );
};

const Index = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);

  // Set up scroll animations
  useScrollAnimation(".animate-on-scroll", "animate-fade-in", { threshold: 0.2 });

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="overflow-hidden">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <HeroSection />
        </ErrorBoundary>
        <ReviewStats />
        <WriteReviewSection />
        <ReviewSection />
      </main>
    </div>
  );
};

export default Index;
