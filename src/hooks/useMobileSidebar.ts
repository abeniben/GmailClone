
import { useState, useEffect } from "react";

export function useMobileSidebar() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    
    // Set initial value
    checkIsMobile();
    
    // Add event listener
    window.addEventListener("resize", checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);
  
  return {
    isMobile,
    isOpen,
    setIsOpen,
    toggle: () => setIsOpen(prev => !prev)
  };
}
