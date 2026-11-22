import React, { useState, useMemo, useEffect } from 'react';
import { Product, FilterState } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ChevronDown } from 'lucide-react';

interface ShopPageProps {
  products: Product[];
  initialCategory?: string;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  initialCategory = 'all',
  onSelectProduct,
  onQuickAdd
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FilterState['category']>(
    (initialCategory as FilterState['category']) || 'all'
  );
  const [sortBy, setSortBy] = useState<FilterState['sortBy']>('recommended');

  // React to navbar navigation category clicks immediately
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory as FilterState['category']);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [initialCategory]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory === 'new-arrivals') {
      result = result.filter(p => p.isNewArrival);
    } else if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, sortBy]);

  const categoryTitles: Record<string, string> = {
    'all': 'All Fine Jewellery',
    'new-arrivals': 'New Arrivals',
    'necklaces': 'Chains, Harams & Chokers',
    'rings': 'Solitaires, Bands & Cocktail Rings',
    'earrings': 'Jhumkas, Chandbalis & Studs',
    'bracelets': 'Temple Kadas, Bangles & Tennis Bracelets'
  };

  return (
    <div className="min-h-screen bg-white font-sans pt-6 sm:pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Compact Single-Row Header Toolbar */}
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-neutral-200">
          <div className="flex items-baseline space-x-3">
            <h1 className="font-serif text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
              {categoryTitles[selectedCategory] || 'Fine Jewellery'}
            </h1>
            <span className="text-xs uppercase tracking-[0.18em] text-neutral-400 font-sans font-medium">
              ({filteredProducts.length} {filteredProducts.length === 1 ? 'Design' : 'Designs'})
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase tracking-[0.15em] text-neutral-400 hidden sm:inline">Sort:</span>
            <div className="relative inline-flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as FilterState['sortBy'])}
                className="appearance-none bg-transparent pl-2 pr-7 py-1 text-xs uppercase tracking-[0.15em] font-medium text-neutral-800 border-b border-neutral-300 focus:outline-none focus:border-black cursor-pointer"
              >
                <option value="recommended">Curated</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-1 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
