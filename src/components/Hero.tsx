import React from 'react';
import { HERO_IMAGE } from '../data/products';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#F7F5F0]">
      {/* Background Editorial Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Panchaloha Fine Jewellery Editorial"
          className="w-full h-full object-cover object-center filter brightness-[0.96]"
          onError={(e) => {
            // High-res luxury jewelry fallback if Wix CDN has origin block
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2000&q=85';
          }}
        />
        {/* Subtle warm atmospheric gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent lg:bg-gradient-to-r lg:from-black/45 lg:via-black/20 lg:to-transparent" />
      </div>

      {/* Hero Typography & CTA Content */}
      <div className="relative z-10 max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full py-24 flex flex-col justify-end lg:justify-center items-start text-white">
        <div className="max-w-2xl animate-in fade-in duration-700">
          
          {/* Eyebrow */}
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-neutral-200 font-sans mb-4 drop-shadow-sm">
            Quietly Extraordinary
          </p>

          {/* Headline H1 */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] mb-8 drop-shadow-md">
            Intentionally <br />
            <span className="italic font-normal">Timeless</span> Jewelry
          </h1>

          {/* Underlined Minimalist CTA */}
          <button
            onClick={onExplore}
            className="group inline-flex items-center space-x-3 text-sm sm:text-base uppercase tracking-[0.25em] font-sans font-medium text-white pb-2 border-b-2 border-white hover:border-brand-gold hover:text-brand-gold transition-all"
          >
            <span>New Arrivals</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

        </div>
      </div>
    </section>
  );
};
