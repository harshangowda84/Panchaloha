import React, { useState } from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd?: (product: Product) => void;
}

const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  necklaces: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85',
  rings: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
  earrings: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=85',
  bracelets: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=85',
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const fallback = CATEGORY_FALLBACK_IMAGES[product.category] || CATEGORY_FALLBACK_IMAGES.necklaces;

  return (
    <div 
      className="group flex flex-col cursor-pointer transition-all duration-300 bg-white border border-neutral-200/90 hover:border-neutral-400 p-2 sm:p-3 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(product)}
    >
      {/* Image Container with Hover Flip */}
      <div className="relative aspect-square w-full bg-[#FAF9F6] overflow-hidden mb-2.5 sm:mb-3 rounded-lg border border-neutral-200/60">
        
        {/* Primary Studio Image */}
        <img
          src={product.primaryImage}
          alt={product.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallback;
          }}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
            isHovered && product.secondaryImage ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />

        {/* Secondary Worn / Lifestyle Image on Hover */}
        {product.secondaryImage && (
          <img
            src={product.secondaryImage}
            alt={`${product.name} worn`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallback;
            }}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
          />
        )}

        {/* Badge (New Arrival / Spotlight) */}
        {product.isNewArrival && (
          <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-white/95 backdrop-blur-sm text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-sans px-2 py-0.5 rounded text-neutral-800 shadow-sm border border-neutral-200/50">
            New
          </span>
        )}

        {/* Quick Add Overlay Button */}
        {onQuickAdd && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 w-7 h-7 sm:w-8 sm:h-8 bg-white text-black hover:bg-black hover:text-white rounded-full flex items-center justify-center shadow-md transition-all duration-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
            title="Quick Add to Bag"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col space-y-0.5 sm:space-y-1 text-left px-0.5">
        <h3 className="font-serif text-xs sm:text-sm md:text-base font-normal text-neutral-900 group-hover:text-neutral-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="font-sans text-xs sm:text-sm text-neutral-800 font-medium">
          {product.currency} {product.price.toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  );
};
