import React from 'react';
import { Gift, ArrowRight, Heart, Sparkles, Award } from 'lucide-react';

interface GiftingBentoMatrixProps {
  onNavigate: (view: 'shop', category?: string) => void;
}

export const GiftingBentoMatrix: React.FC<GiftingBentoMatrixProps> = ({ onNavigate }) => {
  return (
    <section className="py-14 sm:py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 bg-white font-sans">
      
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-neutral-400 mb-2">
          <Gift className="w-4 h-4 text-[#C5A880]" />
          <span>Heirloom Gifting</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight mb-3">
          Jewels That Commemorate A Lifetime
        </h2>
        <p className="text-neutral-500 text-xs sm:text-sm font-light">
          Honor life's most sacred milestones with signature hand-forged noble gold and certified solitaires.
        </p>
      </div>

      {/* 4-Zone Bento Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        
        {/* Card 1: Anniversary & Wedding Milestone (Large Left Bento) */}
        <div 
          onClick={() => onNavigate('shop', 'rings')}
          className="md:col-span-2 group relative rounded-2xl overflow-hidden cursor-pointer shadow-md min-h-[300px] sm:min-h-[400px] flex flex-col justify-end p-5 sm:p-8 md:p-12 transition-all duration-500 hover:shadow-2xl bg-[#1A1A1A]"
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85"
              alt="Anniversary Bands"
              className="w-full h-full object-cover object-center filter brightness-[0.82] transition-transform duration-700 ease-out group-hover:scale-106"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
          </div>

          <div className="relative z-10 text-white max-w-md">
            <div className="flex items-center space-x-1.5 text-[10px] uppercase tracking-[0.25em] text-[#E0C79B] font-medium mb-2">
              <Heart className="w-3.5 h-3.5 fill-[#E0C79B]" />
              <span>Anniversary & Eternal Commitments</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-white mb-2 leading-tight">
              Shared-Prong Eternity Rings
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm font-light mb-4 sm:mb-6 leading-relaxed">
              Celebrate decade milestones with unbroken circles of calibrated round diamonds set in solid 18KT gold.
            </p>
            <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-white border-b border-white pb-1 group-hover:border-[#E0C79B] group-hover:text-[#E0C79B] transition-colors">
              <span>Explore Eternity Bands</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* Card 2: Auspicious Puja & Festivities */}
        <div 
          onClick={() => onNavigate('shop', 'necklaces')}
          className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md min-h-[280px] sm:min-h-[380px] flex flex-col justify-end p-5 sm:p-8 transition-all duration-500 hover:shadow-2xl bg-[#2A1D12]"
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=85"
              alt="Auspicious Gold Coins & Pendants"
              className="w-full h-full object-cover object-center filter brightness-[0.80] transition-transform duration-700 ease-out group-hover:scale-106"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 text-white">
            <div className="flex items-center space-x-1.5 text-[10px] uppercase tracking-[0.25em] text-[#E0C79B] font-medium mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Auspicious Blessings</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-white mb-2">
              Lakshmi Harams & Coins
            </h3>
            <p className="text-neutral-300 text-xs font-light mb-4 leading-relaxed">
              Pure 22KT gold stamped with Goddess Lakshmi for prosperity and sacred auspiciousness.
            </p>
            <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-white border-b border-white pb-1 group-hover:border-[#E0C79B] group-hover:text-[#E0C79B] transition-colors">
              <span>View Auspicious Suite</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* Card 3: Newborn & Milestone Keepsakes */}
        <div 
          onClick={() => onNavigate('shop', 'bracelets')}
          className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md min-h-[260px] sm:min-h-[320px] flex flex-col justify-end p-5 sm:p-8 transition-all duration-500 hover:shadow-2xl bg-[#1F1E24]"
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=85"
              alt="Baby Nazariya & Charms"
              className="w-full h-full object-cover object-center filter brightness-[0.82] transition-transform duration-700 ease-out group-hover:scale-106"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
          </div>

          <div className="relative z-10 text-white">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#E0C79B] font-medium block mb-1">
              Newborn Keepsakes
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-light text-white mb-2">
              Sacred Nazariya Kadas
            </h3>
            <p className="text-neutral-300 text-xs font-light mb-4">
              Traditional protective black beads and 22KT gold kadas for baby naming & Anna-prasanam ceremonies.
            </p>
            <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-white border-b border-white pb-1 group-hover:text-[#E0C79B] transition-colors">
              <span>Explore Kadas</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 4: Bespoke Private Client Gift Certificate (Span 2) */}
        <div 
          onClick={() => onNavigate('shop', 'all')}
          className="md:col-span-2 group relative rounded-2xl overflow-hidden cursor-pointer shadow-md min-h-[280px] sm:min-h-[320px] flex flex-col justify-end p-5 sm:p-8 md:p-10 transition-all duration-500 hover:shadow-2xl bg-[#141414] border border-neutral-800"
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1611591475870-760759089053?auto=format&fit=crop&w=1200&q=85"
              alt="Bespoke Gift Voucher"
              className="w-full h-full object-cover object-center filter brightness-[0.70] transition-transform duration-700 ease-out group-hover:scale-106"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          </div>

          <div className="relative z-10 text-white max-w-lg">
            <div className="flex items-center space-x-1.5 text-[10px] uppercase tracking-[0.25em] text-[#E0C79B] font-medium mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Privileged Atelier Acquisition</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-white mb-2 leading-snug">
              Bespoke Heirloom Gift Vouchers
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm font-light mb-4 leading-relaxed">
              Allow your recipient to commission custom iconometry or select their signature bridal piece with our Master Goldsmiths.
            </p>
            <button className="px-5 sm:px-6 py-2.5 bg-white text-black group-hover:bg-[#E0C79B] transition-colors rounded-full text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium inline-flex items-center space-x-2">
              <span>View All 56 Pieces</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
