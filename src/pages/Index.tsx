
import { useState, useEffect } from "react";
import { DisclaimerModal } from "@/components/DisclaimerModal";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ReviewStats } from "@/components/ReviewStats";
import { ReviewSection } from "@/components/ReviewSection";
import { WriteReviewSection } from "@/components/WriteReviewSection";
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
