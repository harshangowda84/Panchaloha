import React from 'react';
import { Sparkles, Shield, Compass, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onExplore: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onExplore }) => {
  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* Editorial Story Header */}
      <section className="py-12 sm:py-20 lg:py-32 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="text-xs uppercase tracking-[0.35em] text-neutral-400 font-sans block mb-3">
          The Spirit of Panchaloha
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-light text-neutral-900 tracking-tight leading-[1.08] mb-6 sm:mb-8">
          Authenticity is the <br />
          <span className="italic font-normal">new luxury</span>
        </h1>
        <p className="font-serif text-lg sm:text-2xl text-neutral-600 font-light italic leading-relaxed max-w-2xl mx-auto">
          "Jewelry should not be a costume. It should be an extension of the self."
        </p>
      </section>

      {/* Hero Studio Image */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mb-14 sm:mb-24">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2000&q=85"
            alt="Panchaloha Atelier Studio"
            className="w-full h-full object-cover object-center filter brightness-[0.97]"
          />
        </div>
      </section>

      {/* Main Narrative Split */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 pb-14 sm:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 text-neutral-700 font-light leading-relaxed text-sm sm:text-base">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 font-normal mb-3 sm:mb-4">
              Permanent Over Fleeting
            </h3>
            <p className="mb-4 sm:mb-6">
              Panchaloha was founded on a simple premise: jewelry is an intimate sculpture meant to endure lifetimes. We moved deliberately away from trend-chasing to focus on heavy gold weights, tactile organic settings, and architectural silhouettes that feel timelessly modern.
            </p>
            <p>
              We are an uncompromising slow-fashion house. Every design is developed in our atelier over months of ergonomic testing, ensuring each torque, band, and hoop moves in complete harmony with the human body.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 font-normal mb-3 sm:mb-4">
              Small Batches, Zero Compromise
            </h3>
            <p className="mb-4 sm:mb-6">
              We produce in strictly limited batches to eliminate deadstock and preserve artisanal purity. Our metals are 100% certified recycled 18k noble gold and sterling silver, cast through ancient lost-wax metallurgy paired with precision tension engineering.
            </p>
            <p>
              Each baroque pearl is individually hand-selected for its unique luster and organic contour—no two pieces in our collections are ever identical.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Hand-Annotated Atelier Sketch Section */}
      <section className="w-full bg-[#FAF9F5] py-14 sm:py-24 border-y border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-16">
            <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 font-sans block mb-2">
              Atelier Blueprint
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-light text-neutral-900">
              The Anatomy of a Form
            </h2>
          </div>

          {/* Sketch Card with Callout Annotations */}
          <div className="relative bg-white border border-neutral-300 p-5 sm:p-8 md:p-14 shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
            
            {/* Visual Sketch Graphic */}
            <div className="relative aspect-square bg-[#FCFCFB] p-6 border border-dashed border-neutral-300 flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=85"
                alt="Fluid Form Study"
                className="w-4/5 h-4/5 object-contain filter contrast-125"
              />

              {/* Callout Tag 1 */}
              <div className="absolute top-10 left-8 bg-neutral-900/90 text-white text-[10px] uppercase tracking-wider py-1 px-2.5 rounded-none font-sans flex items-center space-x-1 shadow-md">
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span>
                <span>Organic Molten Topography</span>
              </div>

              {/* Callout Tag 2 */}
              <div className="absolute bottom-12 right-6 bg-neutral-900/90 text-white text-[10px] uppercase tracking-wider py-1 px-2.5 rounded-none font-sans flex items-center space-x-1 shadow-md">
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span>
                <span>Sustainably Sourced Noble Metal</span>
              </div>
            </div>

            {/* Design Notes */}
            <div className="space-y-6">
              <span className="font-mono text-xs text-neutral-400 tracking-widest block">
                ATELIER STUDY NO. 042 // EARRING I
              </span>

              <h4 className="font-serif text-2xl font-light text-neutral-900">
                Fluid Form Drop Specification
              </h4>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-600 font-light">
                <div className="p-4 bg-neutral-50 border-l-2 border-neutral-900">
                  <div className="font-medium text-neutral-900 mb-1">01. Lost-Wax Casting</div>
                  Sculpted in jewelers wax by hand to achieve fluid negative space without cold mechanical repetition.
                </div>

                <div className="p-4 bg-neutral-50 border-l-2 border-neutral-900">
                  <div className="font-medium text-neutral-900 mb-1">02. Featherlight Ergonomics</div>
                  Engineered with an electroformed hollow interior, allowing substantial visual volume at merely 4.8 grams per lobe.
                </div>

                <div className="p-4 bg-neutral-50 border-l-2 border-neutral-900">
                  <div className="font-medium text-neutral-900 mb-1">03. Unaltered Baroque Pearls</div>
                  Selected from non-nucleated freshwater cultures, preserving every natural wave and high-luster iridescence.
                </div>
              </div>

              <button
                onClick={onExplore}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-sans font-medium text-black hover:text-neutral-600 transition-colors pt-2"
              >
                <span>Discover The Finished Creations</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Sustainable Principles Grid */}
      <section className="py-24 max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center p-8 border border-neutral-100 bg-[#FAFAFA]">
            <Compass className="w-6 h-6 mx-auto mb-4 text-neutral-700" />
            <h4 className="font-serif text-xl font-light mb-2 text-neutral-900">Circular Noble Metals</h4>
            <p className="text-xs text-neutral-500 font-light leading-relaxed">
              Every gram of gold and silver in our collections is verified recycled, reducing environmental extraction while maintaining eternal purity.
            </p>
          </div>

          <div className="text-center p-8 border border-neutral-100 bg-[#FAFAFA]">
            <Sparkles className="w-6 h-6 mx-auto mb-4 text-neutral-700" />
            <h4 className="font-serif text-xl font-light mb-2 text-neutral-900">Singular Irregularity</h4>
            <p className="text-xs text-neutral-500 font-light leading-relaxed">
              We celebrate organic asymmetry and natural gemstone inclusions as signatures of geological history rather than imperfections.
            </p>
          </div>

          <div className="text-center p-8 border border-neutral-100 bg-[#FAFAFA]">
            <Shield className="w-6 h-6 mx-auto mb-4 text-neutral-700" />
            <h4 className="font-serif text-xl font-light mb-2 text-neutral-900">Lifetime Custody</h4>
            <p className="text-xs text-neutral-500 font-light leading-relaxed">
              Each Panchaloha acquisition includes complimentary annual polishing, re-tensioning, and ultrasonic refurbishment at our studio.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
