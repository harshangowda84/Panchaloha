import React from 'react';
import { Product } from '../types';
import { SPOTLIGHT_BG } from '../data/products';
import { ArrowRight } from 'lucide-react';

interface SpotlightFeatureProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const SpotlightFeature: React.FC<SpotlightFeatureProps> = ({
  product,
  onSelect
}) => {
  return (
    <section className="relative w-full py-14 sm:py-24 lg:py-36 overflow-hidden bg-[#EFECE6]">
      {/* Background Editorial Ambient Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={SPOTLIGHT_BG}
          alt="Baroque Pearl Lifestyle"
          className="w-full h-full object-cover object-center filter brightness-[0.93]"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=85';
          }}
        />
        {/* Ambient Darkened Overlay */}
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Foreground Content Container with Floating Luxury Card */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex justify-center lg:justify-end">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-md p-5 sm:p-8 md:p-12 shadow-2xl border border-white/40 rounded-xl">
          
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-sans block mb-3">
            Spotlight Masterpiece
          </span>

          {/* Product Packshot Thumbnail */}
          <div className="aspect-[4/3] w-full bg-[#FAFAFA] overflow-hidden mb-6 border border-neutral-100">
            <img
              src={product.primaryImage}
              alt={product.name}
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Title & Price */}
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-neutral-900 mb-2">
            {product.name}
          </h2>

          <p className="font-sans text-sm text-neutral-800 mb-4 font-medium">
            {product.currency} {product.price.toLocaleString('en-IN')}
          </p>

          {/* Editorial Description */}
          <p className="text-neutral-600 text-xs sm:text-sm font-sans font-light leading-relaxed mb-8">
            {product.description}
          </p>

          {/* See Details Button */}
          <button
            onClick={() => onSelect(product)}
            className="w-full py-3.5 px-6 border border-black text-black hover:bg-black hover:text-white transition-all duration-300 text-xs uppercase tracking-[0.2em] font-sans font-medium flex items-center justify-center space-x-2 group"
          >
            <span>See Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

        </div>
      </div>
    </section>
  );
};
