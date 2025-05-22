
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Calendar } from "lucide-react";
import { Suspense, useState, useEffect } from "react";
import { FallbackCollegeText } from "./3D/FallbackCollegeText";
import { SkyBackground } from "./3D/SkyBackground";

// Dynamically import the AnimatedCollegeText component
const AnimatedCollegeTextWrapper = () => {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    // Add error listener
    const handleError = () => {
      setHasError(true);
    };
    
    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);
  
  if (hasError) {
    return <FallbackCollegeText />;
  }
  
  const AnimatedCollegeText = React.lazy(() => 
    import('./3D/AnimatedCollegeText').then(module => ({
      default: module.AnimatedCollegeText
    }))
    .catch(() => {
      setHasError(true);
      return { default: FallbackCollegeText };
    })
  );
  
  return (
    <Suspense fallback={<FallbackCollegeText />}>
      <AnimatedCollegeText />
    </Suspense>
  );
};

export const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] py-16 overflow-hidden">
      <SkyBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 transform transition-all duration-1000 translate-y-0 opacity-100">
          <div className="mb-6">
            <AnimatedCollegeTextWrapper />
          </div>
          <p className="text-xl text-white drop-shadow-lg mb-8 font-medium">
            Discover honest student experiences and make informed decisions about your education
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto transform transition-all duration-1000 opacity-100">
          <Card className="bg-white/80 backdrop-blur-md border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-sm opacity-90">Madhupur, Jharkhand</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-md border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold mb-2">Student Community</h3>
              <p className="text-sm opacity-90">Active & Diverse</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-md border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold mb-2">Programs</h3>
              <p className="text-sm opacity-90">Diploma Courses</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
