
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const BackgroundSky = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.3]);
  
  // Choose from multiple sky images and randomly select one
  const skyImages = [
    "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=2574&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532767153582-b1a0e5145009?q=80&w=2574&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=2574&auto=format&fit=crop",
  ];
  
  const [selectedImage, setSelectedImage] = useState("");
  
  useEffect(() => {
    // Randomly select a sky image
    const randomIndex = Math.floor(Math.random() * skyImages.length);
    setSelectedImage(skyImages[randomIndex]);
  }, []);
  
  return (
    <motion.div 
      className="fixed inset-0 w-full h-full -z-10 overflow-hidden"
      style={{ y, opacity }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${selectedImage})`,
          filter: "saturate(1.2) brightness(0.9)"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90" />
    </motion.div>
  );
};
