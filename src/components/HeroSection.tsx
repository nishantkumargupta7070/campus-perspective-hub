
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] py-16 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 transform transition-all duration-1000 translate-y-0 opacity-100">
          <motion.div 
            initial={{ y: -50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Madhupur Polytechnic College
            </h1>
          </motion.div>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl text-white drop-shadow-lg mb-8 font-medium"
          >
            Discover honest student experiences and make informed decisions about your education
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <motion.div whileHover={{ y: -8, scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="bg-white/80 backdrop-blur-md border-white/20 shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <MapPin className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-sm opacity-90">Madhupur, Jharkhand</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div whileHover={{ y: -8, scale: 1.03 }} transition={{ type: "spring", stiffness: 300, delay: 0.05 }}>
            <Card className="bg-white/80 backdrop-blur-md border-white/20 shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold mb-2">Student Community</h3>
                <p className="text-sm opacity-90">Active & Diverse</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div whileHover={{ y: -8, scale: 1.03 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}>
            <Card className="bg-white/80 backdrop-blur-md border-white/20 shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold mb-2">Programs</h3>
                <p className="text-sm opacity-90">Diploma Courses</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
