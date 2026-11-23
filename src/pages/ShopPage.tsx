import React, { useState, useMemo, useEffect } from 'react';
import { Product, FilterState } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ChevronDown, Search, X } from 'lucide-react';

interface ShopPageProps {
  products: Product[];
  initialCategory?: string;
  searchQuery?: string;
  onClearSearch?: () => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  initialCategory = 'all',
  searchQuery = '',
  onClearSearch,
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

    // Filter by Search Query if present
    if (searchQuery && searchQuery.trim()) {
      const term = searchQuery.trim().toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.id.toLowerCase().includes(term)
      );
    }

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
  }, [products, selectedCategory, sortBy, searchQuery]);

  const categoryTitles: Record<string, string> = {
    'all': 'All Fine Jewellery',
    'new-arrivals': 'New Arrivals',
    'necklaces': 'Chains, Harams & Chokers',
    'rings': 'Solitaires, Bands & Cocktail Rings',
    'earrings': 'Jhumkas, Chandbalis & Studs',
    'bracelets': 'Temple Kadas, Bangles & Tennis Bracelets'
  };

  const pageHeading = searchQuery.trim()
    ? `Search Results for "${searchQuery}"`
    : categoryTitles[selectedCategory] || 'Fine Jewellery';

  return (
    <div className="min-h-screen bg-white font-sans pt-4 sm:pt-8 pb-16 sm:pb-20">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Compact Single-Row Header Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 sm:mb-8 border-b border-neutral-200 gap-3">
          <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
            <h1 className="font-serif text-xl sm:text-3xl font-light text-neutral-900 tracking-tight">
              {pageHeading}
            </h1>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-neutral-400 font-sans font-medium">
              ({filteredProducts.length} {filteredProducts.length === 1 ? 'Design' : 'Designs'})
            </span>
            {searchQuery.trim() && onClearSearch && (
              <button
                onClick={onClearSearch}
                className="inline-flex items-center space-x-1 text-xs uppercase tracking-wider text-neutral-600 hover:text-black font-medium border border-neutral-200 px-2.5 py-1 rounded-full hover:bg-neutral-100 transition-colors ml-1"
              >
                <span>Clear Search</span>
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end space-x-2">
            <span className="text-xs uppercase tracking-[0.15em] text-neutral-400">Sort:</span>
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

        {/* 2 to 4-Column Product Grid (2 columns on mobile, 4 on desktop) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 xl:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-400">
              <Search className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl text-neutral-900 font-normal mb-2">
              No Masterpieces Found for "{searchQuery}"
            </h3>
            <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto mb-6">
              We could not find pieces matching your search query. Explore our handcrafted collections or reset your search.
            </p>
            {onClearSearch && (
              <button
                onClick={onClearSearch}
                className="px-5 py-2.5 bg-neutral-900 text-white rounded-xl text-xs uppercase tracking-wider font-medium hover:bg-neutral-800 transition-colors"
              >
                View All Fine Jewellery
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
