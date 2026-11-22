import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface AsymmetricPromoSplitProps {
  onNavigate: (view: 'shop', category?: string) => void;
}

export const AsymmetricPromoSplit: React.FC<AsymmetricPromoSplitProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-12 bg-white font-sans">
      
      {/* Editorial Section Divider */}
      <div className="text-center max-w-xl mx-auto mb-14">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <span className="w-12 h-[1px] bg-neutral-300"></span>
          <span className="text-brand-gold text-sm">✦</span>
          <span className="w-12 h-[1px] bg-neutral-300"></span>
        </div>
        <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 font-sans block mb-2 font-medium">
          Editorial Spotlight
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight">
          The Luminary Diamond Suite
        </h2>
      </div>

      {/* 50/50 Asymmetric Promo Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Column: Tall Portrait Campaign Card with Hover Zoom */}
        <div 
          onClick={() => onNavigate('shop', 'rings')}
          className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg min-h-[520px] lg:min-h-[580px] flex flex-col justify-end p-8 sm:p-12 transition-all duration-500 hover:shadow-2xl"
        >
          {/* Zoom Image */}
          <div className="absolute inset-0 overflow-hidden bg-neutral-900">
            <img
              src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1200&q=85"
              alt="Diamond Luminary Campaign"
              className="w-full h-full object-cover object-center filter brightness-[0.88] transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
          </div>

          {/* Foreground Overlay Content */}
          <div className="relative z-10 text-white">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] uppercase tracking-[0.2em] font-sans text-white mb-4 border border-white/20">
              <Sparkles className="w-3 h-3 text-[#E0C79B]" />
              <span>Certified Solitaire Edit</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-3">
              Unveil Your Inner Luminescence
            </h3>

            <p className="text-neutral-300 text-xs sm:text-sm font-light max-w-md leading-relaxed mb-6 font-sans">
              Hand-selected natural diamonds displaying perfect optical symmetry, secured in precision tension mounts.
            </p>

            <button className="px-6 py-3 bg-white text-black group-hover:bg-[#E0C79B] transition-colors rounded-full text-xs uppercase tracking-[0.2em] font-medium flex items-center space-x-2 shadow-md">
              <span>Explore Solitaires</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: Stacked Promotional Grid */}
        <div className="flex flex-col justify-between space-y-8">
          
          {/* Top Landscape Promo Banner with Hover Zoom */}
          <div 
            onClick={() => onNavigate('shop', 'necklaces')}
            className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md min-h-[250px] flex flex-col justify-center p-8 sm:p-10 transition-all duration-500 hover:shadow-xl bg-neutral-900"
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=85"
                alt="Bespoke Temple Jewellery"
                className="w-full h-full object-cover object-center filter brightness-[0.75] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </div>

            <div className="relative z-10 text-white max-w-sm">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#E0C79B] font-sans block mb-1">
                Atelier Privilege
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl font-light mb-2">
                Bespoke Bridal Harams
              </h4>
              <p className="text-neutral-300 text-xs font-light leading-relaxed mb-4">
                Forged in pure 22KT yellow gold with traditional South Indian Nakshi embossing.
              </p>
              <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-white border-b border-white pb-1 group-hover:border-[#E0C79B] group-hover:text-[#E0C79B] transition-colors">
                <span>View Collection</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

          {/* Bottom 3-Tile Category Entry Matrix with Hover Zoom */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Tile 1: Necklaces */}
            <div 
              onClick={() => onNavigate('shop', 'necklaces')}
              className="group relative rounded-xl overflow-hidden cursor-pointer h-52 bg-neutral-100 border border-neutral-200 transition-all duration-300 hover:shadow-md"
            >
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=85"
                alt="Necklaces"
                className="w-full h-full object-cover object-center filter brightness-90 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <span className="font-serif text-lg font-normal group-hover:text-[#E0C79B] transition-colors">
                  Chains & Harams
                </span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-300">
                  15 Designs →
                </span>
              </div>
            </div>

            {/* Tile 2: Rings */}
            <div 
              onClick={() => onNavigate('shop', 'rings')}
              className="group relative rounded-xl overflow-hidden cursor-pointer h-52 bg-neutral-100 border border-neutral-200 transition-all duration-300 hover:shadow-md"
            >
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=85"
                alt="Rings"
                className="w-full h-full object-cover object-center filter brightness-90 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <span className="font-serif text-lg font-normal group-hover:text-[#E0C79B] transition-colors">
                  Solitaire Rings
                </span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-300">
                  15 Designs →
                </span>
              </div>
            </div>

            {/* Tile 3: Earrings */}
            <div 
              onClick={() => onNavigate('shop', 'earrings')}
              className="group relative rounded-xl overflow-hidden cursor-pointer h-52 bg-neutral-100 border border-neutral-200 transition-all duration-300 hover:shadow-md"
            >
              <img
                src="https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=85"
                alt="Earrings"
                className="w-full h-full object-cover object-center filter brightness-90 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <span className="font-serif text-lg font-normal group-hover:text-[#E0C79B] transition-colors">
                  Temple Jhumkas
                </span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-300">
                  15 Designs →
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
