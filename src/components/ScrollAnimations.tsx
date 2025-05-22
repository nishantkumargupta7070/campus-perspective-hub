
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { GraduationCap, Award, BookOpen, Users } from "lucide-react";

export const FloatingIcons = () => {
  const { scrollY } = useScroll();
  
  // Create transforms for icons based on scroll position
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const y3 = useTransform(scrollY, [0, 500], [0, -150]);
  const y4 = useTransform(scrollY, [0, 500], [0, -70]);
  
  const opacity = useTransform(scrollY, [0, 300], [0.8, 0]);
  
  const icons = [
    { component: GraduationCap, y: y1, x: -30, delay: 0 },
    { component: BookOpen, y: y2, x: 80, delay: 0.2 },
    { component: Award, y: y3, x: 30, delay: 0.4 },
    { component: Users, y: y4, x: -80, delay: 0.6 }
  ];
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ 
            y: icon.y, 
            x: icon.x, 
            opacity, 
            top: `${Math.random() * 30 + 20}%`,
            left: `${Math.random() * 60 + 20}%`
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: icon.delay, 
            ease: "easeOut" 
          }}
        >
          <icon.component 
            className="text-white/80 drop-shadow-lg" 
            size={Math.floor(Math.random() * 20) + 30} 
          />
        </motion.div>
      ))}
    </div>
  );
};

export const ScrollSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        y: isInView ? 0 : 30 
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export const ParallaxContainer = ({ children, speed = 0.5 }: { children: React.ReactNode, speed?: number }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * speed]);
  
  return (
    <motion.div style={{ y }} className="relative">
      {children}
    </motion.div>
  );
};
