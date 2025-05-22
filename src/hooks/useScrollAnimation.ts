
import { useEffect } from 'react';

export const useScrollAnimation = (selector: string, animationClass: string, options = { threshold: 0.2 }) => {
  useEffect(() => {
    // Add animation classes to elements
    const elements = document.querySelectorAll(selector);
    
    if (elements.length === 0) return;
    
    elements.forEach((element) => {
      if (!element.classList.contains('opacity-0')) {
        element.classList.add('opacity-0');
      }
    });
    
    // Set up intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          observer.unobserve(entry.target);
        }
      });
    }, options);
    
    // Observe all elements with the selector
    elements.forEach((el) => {
      observer.observe(el);
    });
    
    // Cleanup observer on unmount
    return () => {
      observer.disconnect();
    };
  }, [selector, animationClass, options.threshold]);
};
