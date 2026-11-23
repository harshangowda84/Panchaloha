import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaText: string;
  secondaryCtaText?: string;
  category: string;
  image: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'timeless-luxury',
    eyebrow: 'Quietly Extraordinary',
    title: 'Intentionally Timeless Jewellery',
    subtitle: 'Sculptural organic silhouettes forged in heavy 18KT & 22KT noble gold, accented with baroque pearls and ethically certified diamonds.',
    ctaText: 'Explore New Arrivals',
    secondaryCtaText: 'Discover Rings',
    category: 'new-arrivals',
    image: 'https://static.wixstatic.com/media/c837a6_786fe10486e9494e82b7eb0a01eeebdc~mv2.jpg',
  },
  {
    id: 'bridal-heritage',
    eyebrow: 'Heirloom Masterpieces',
    title: 'The Royal Bridal Heritage Suite',
    subtitle: 'Antique temple harams, uncut polki chokers, and handcrafted 22KT bridal kadas designed to transcend generations.',
    ctaText: 'Explore Bridal Necklaces',
    secondaryCtaText: 'View Temple Kadas',
    category: 'necklaces',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 'solitaire-brilliance',
    eyebrow: 'Certified Natural Diamonds',
    title: 'Imperial Solitaires & Eternity Bands',
    subtitle: 'Precision-cut VVS1 solitaires set in elevated platinum and 18KT gold crowns. Certified by IGI and GIA.',
    ctaText: 'Discover Solitaires',
    secondaryCtaText: 'Explore Earrings',
    category: 'rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=2000&q=85',
  },
];

interface HeroCarouselProps {
  onExplore: (category?: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onExplore }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play slide every 6 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section 
      className="relative w-full min-h-[75vh] sm:min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#111111]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with Slow Cross-Fade and Hover Zoom */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-0 pointer-events-auto' : 'opacity-0 -z-10 pointer-events-none'
          }`}
        >
          {/* Zoom Image Container */}
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center filter brightness-[0.90] transition-transform duration-[7000ms] ease-out transform scale-100 hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=85';
              }}
            />
            {/* Atmospheric Luxury Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20 lg:bg-gradient-to-r lg:from-black/75 lg:via-black/35 lg:to-transparent" />
          </div>
        </div>
      ))}

      {/* Hero Typography & CTA Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full py-16 sm:py-24 flex flex-col justify-end lg:justify-center items-start text-white">
        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 key={activeSlide.id}">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center space-x-2 mb-3 sm:mb-4">
            <span className="w-4 sm:w-6 h-[1px] bg-brand-gold"></span>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#E0C79B] font-sans font-medium">
              {activeSlide.eyebrow}
            </p>
          </div>

          {/* Headline H1 */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-4 sm:mb-6 drop-shadow-md">
            {activeSlide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-neutral-200 text-xs sm:text-sm md:text-base font-light font-sans leading-relaxed mb-6 sm:mb-8 max-w-xl drop-shadow">
            {activeSlide.subtitle}
          </p>

          {/* CTA Button Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => onExplore(activeSlide.category)}
              className="px-6 sm:px-7 py-3 sm:py-3.5 bg-white text-black hover:bg-[#E0C79B] hover:text-black transition-all duration-300 text-xs uppercase tracking-[0.22em] font-sans font-semibold flex items-center justify-center space-x-2 group shadow-xl"
            >
              <span>{activeSlide.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            {activeSlide.secondaryCtaText && (
              <button
                onClick={() => onExplore(activeSlide.category === 'new-arrivals' ? 'rings' : 'earrings')}
                className="px-6 sm:px-7 py-3 sm:py-3.5 border border-white/80 text-white hover:bg-white hover:text-black transition-all duration-300 text-xs uppercase tracking-[0.22em] font-sans font-medium backdrop-blur-sm text-center"
              >
                {activeSlide.secondaryCtaText}
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Navigation Arrows Pinned to Edges (Joyalukkas Style) */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
      </button>

      {/* Slide Pagination Indicator (Joyalukkas Numbered Counter & Dots) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide
                ? 'w-7 h-2 bg-[#E0C79B]'
                : 'w-2 h-2 bg-white/40 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
        <span className="text-[11px] font-mono text-neutral-300 ml-2 tracking-widest pl-2 border-l border-white/20">
          0{currentSlide + 1} / 0{HERO_SLIDES.length}
        </span>
      </div>
    </section>
  );
};
