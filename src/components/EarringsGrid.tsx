import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';

interface EarringsGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onViewAll: () => void;
}

export const EarringsGrid: React.FC<EarringsGridProps> = ({
  products,
  onSelectProduct,
  onQuickAdd,
  onViewAll
}) => {
  const earrings = products.filter(p => p.category === 'earrings').slice(0, 4);

  return (
    <section className="py-14 sm:py-20 lg:py-28 max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 bg-white">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 pb-4 border-b border-neutral-100 gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-sans block mb-1">
            Artisanal Silhouettes
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight">
            Popular Earrings
          </h2>
        </div>

        <button
          onClick={onViewAll}
          className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-sans font-medium text-neutral-800 hover:text-black transition-colors self-start sm:self-auto"
        >
          <span>Shop Earrings</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 2-Col Mobile to 4-Col Desktop Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 xl:gap-8">
        {earrings.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
            onQuickAdd={onQuickAdd}
          />
        ))}
      </div>
    </section>
  );
};
