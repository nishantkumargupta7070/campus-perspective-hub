
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Calendar } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Madhupur Polytechnic Institute
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Discover honest student experiences and make informed decisions about your education
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-sm opacity-90">Madhupur, Jharkhand</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2">Student Community</h3>
              <p className="text-sm opacity-90">Active & Diverse</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2">Programs</h3>
              <p className="text-sm opacity-90">Diploma Courses</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
