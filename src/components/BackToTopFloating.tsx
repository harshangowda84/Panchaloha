import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTopFloating: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 right-6 z-40 font-sans">
      <button
        onClick={scrollToTop}
        className="w-11 h-11 rounded-full bg-neutral-900/90 hover:bg-black text-white backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border border-neutral-700 animate-in fade-in"
        title="Back to Top"
        aria-label="Back to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
};
