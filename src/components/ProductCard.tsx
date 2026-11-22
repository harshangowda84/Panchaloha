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
      className="group flex flex-col cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(product)}
    >
      {/* Image Container with Hover Flip */}
      <div className="relative aspect-square w-full bg-[#FBFBFA] overflow-hidden mb-4 border border-neutral-100">
        
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
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-[0.2em] font-sans px-2.5 py-1 text-neutral-800">
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
            className="absolute bottom-3 right-3 w-9 h-9 bg-white text-black hover:bg-black hover:text-white rounded-full flex items-center justify-center shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
            title="Quick Add to Bag"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col space-y-1 text-left">
        <h3 className="font-serif text-lg font-normal text-neutral-900 group-hover:text-neutral-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="font-sans text-sm text-neutral-800 font-medium">
          {product.currency} {product.price.toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  );
};
