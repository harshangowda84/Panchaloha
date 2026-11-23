import React, { useState, useEffect, useRef } from 'react';
import { User as UserIcon, Search, X, ArrowRight } from 'lucide-react';
import { ViewState, Product } from '../types';

interface HeaderProps {
  currentView: ViewState;
  currentCategory?: string;
  onNavigate: (view: ViewState, category?: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenNavDrawer: () => void;
  onOpenAuth: () => void;
  user: { name: string } | null;
  products?: Product[];
  onSelectProduct?: (product: Product) => void;
  onSearchSubmit?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  currentCategory = 'all',
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenNavDrawer,
  onOpenAuth,
  user,
  products = [],
  onSelectProduct,
  onSearchSubmit
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchToggleBtnRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when search expands
  useEffect(() => {
    if (isSearchExpanded) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery('');
    }
  }, [isSearchExpanded]);

  // Click outside to collapse search bar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(target) &&
        searchToggleBtnRef.current &&
        !searchToggleBtnRef.current.contains(target)
      ) {
        setIsSearchExpanded(false);
      }
    };
    if (isSearchExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchExpanded]);

  // Escape key collapses search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchExpanded) {
        setIsSearchExpanded(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchExpanded]);

  // Real-time smart keyword filtering with word boundaries
  const trimmed = searchQuery.trim().toLowerCase();
  const searchResults = trimmed
    ? products.filter((p) => {
      const tokens = trimmed.split(/\s+/).filter(Boolean);
      if (!tokens.length) return true;

      return tokens.every((token) => {
        const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escaped}`, 'i');
        const nameMatch = regex.test(p.name);
        const catMatch = regex.test(p.category);
        const idMatch = regex.test(p.id.replace(/-/g, ' '));
        const descMatch = regex.test(p.description);

        return nameMatch || catMatch || idMatch || descMatch;
      });
    })
    : [];

  const isShopActive = (cat: string) => {
    return (currentView === 'shop' || currentView === 'pdp') && currentCategory === cat;
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#1A1A1A] text-[#FAFAFA] text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.25em] py-2 sm:py-2.5 text-center font-sans font-light px-3 sm:px-4">
        Complimentary 100% Insured Delivery Across India & Signature Luxury Packaging
      </div>

      {/* Main Luxury Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 transition-all duration-300">
        <div className="w-full max-w-[1800px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">

          {/* Left: Brand Identity & Desktop Navigation */}
          <div className="flex items-center space-x-3 lg:space-x-5 xl:space-x-7 min-w-0">
            <button
              onClick={() => onNavigate('home')}
              className="text-left group focus:outline-none flex-shrink-0"
            >
              <span className="font-serif text-lg min-[380px]:text-xl sm:text-2xl md:text-3xl tracking-[0.08em] min-[380px]:tracking-[0.12em] sm:tracking-[0.14em] font-light uppercase text-neutral-900 group-hover:text-neutral-600 transition-colors">
                PANCHALOHA
              </span>
              <span className="block text-[7px] sm:text-[8px] uppercase tracking-[0.22em] sm:tracking-[0.35em] text-neutral-400 -mt-0.5 font-sans font-medium">
                Fine Jewellery
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-2.5 xl:space-x-4 2xl:space-x-6 text-[11px] xl:text-[12px] tracking-[0.05em] uppercase font-sans">
              <button
                onClick={() => onNavigate('shop', 'all')}
                className={`relative py-1.5 whitespace-nowrap transition-colors ${isShopActive('all')
                    ? 'text-neutral-900 font-semibold'
                    : 'text-neutral-600 hover:text-black font-medium'
                  }`}
              >
                <span>Shop All</span>
                {isShopActive('all') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900" />
                )}
              </button>

              <button
                onClick={() => onNavigate('shop', 'new-arrivals')}
                className={`relative py-1.5 whitespace-nowrap transition-colors ${isShopActive('new-arrivals')
                    ? 'text-neutral-900 font-semibold'
                    : 'text-neutral-600 hover:text-black font-medium'
                  }`}
              >
                <span>New Arrivals</span>
                {isShopActive('new-arrivals') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900" />
                )}
              </button>

              <button
                onClick={() => onNavigate('shop', 'necklaces')}
                className={`relative py-1.5 whitespace-nowrap transition-colors ${isShopActive('necklaces')
                    ? 'text-neutral-900 font-semibold'
                    : 'text-neutral-600 hover:text-black font-medium'
                  }`}
              >
                <span>Necklaces</span>
                {isShopActive('necklaces') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900" />
                )}
              </button>

              <button
                onClick={() => onNavigate('shop', 'rings')}
                className={`relative py-1.5 whitespace-nowrap transition-colors ${isShopActive('rings')
                    ? 'text-neutral-900 font-semibold'
                    : 'text-neutral-600 hover:text-black font-medium'
                  }`}
              >
                <span>Rings</span>
                {isShopActive('rings') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900" />
                )}
              </button>

              <button
                onClick={() => onNavigate('shop', 'earrings')}
                className={`relative py-1.5 whitespace-nowrap transition-colors ${isShopActive('earrings')
                    ? 'text-neutral-900 font-semibold'
                    : 'text-neutral-600 hover:text-black font-medium'
                  }`}
              >
                <span>Earrings</span>
                {isShopActive('earrings') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900" />
                )}
              </button>

              <button
                onClick={() => onNavigate('shop', 'bracelets')}
                className={`relative py-1.5 whitespace-nowrap transition-colors ${isShopActive('bracelets')
                    ? 'text-neutral-900 font-semibold'
                    : 'text-neutral-600 hover:text-black font-medium'
                  }`}
              >
                <span>Bangles & Bracelets</span>
                {isShopActive('bracelets') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900" />
                )}
              </button>

              <button
                onClick={() => onNavigate('about')}
                className={`relative py-1.5 whitespace-nowrap transition-colors ${currentView === 'about'
                    ? 'text-neutral-900 font-semibold'
                    : 'text-neutral-600 hover:text-black font-medium'
                  }`}
              >
                <span>About Us</span>
                {currentView === 'about' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900" />
                )}
              </button>
            </nav>
          </div>

          {/* Right Action Icons: Search Toggle, Auth, Cart, Mobile Hamburger */}
          <div className="flex items-center space-x-2 sm:space-x-3.5 flex-shrink-0">

            {/* Search Toggle Icon Button (Strictly Fixed 36px Width, Zero Layout Shift) */}
            <button
              ref={searchToggleBtnRef}
              onClick={() => setIsSearchExpanded(prev => !prev)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0 focus:outline-none ${isSearchExpanded
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'text-neutral-800 hover:text-black hover:bg-neutral-100'
                }`}
              title={isSearchExpanded ? "Close Search [ESC]" : "Search Fine Jewellery"}
              aria-label="Toggle Search"
            >
              {isSearchExpanded ? (
                <X className="w-4 h-4 stroke-[2]" />
              ) : (
                <Search className="w-4 h-4 stroke-[1.8]" />
              )}
            </button>

            {/* Account / Login */}
            <button
              onClick={onOpenAuth}
              className="hidden sm:flex items-center space-x-2 text-[12px] uppercase tracking-[0.1em] font-sans text-neutral-700 hover:text-black transition-colors py-1.5 px-2 rounded-full hover:bg-neutral-50"
              title="Client Account"
            >
              <UserIcon className="w-4 h-4 stroke-[1.5]" />
              <span>{user ? user.name.split(' ')[0] : 'Log In'}</span>
            </button>

            {/* Luxury Structured Shopping Tote Bag with Counter Badge */}
            <button
              onClick={onOpenCart}
              className="group relative flex items-center justify-center sm:space-x-2 text-neutral-900 hover:text-neutral-600 transition-colors w-9 h-9 sm:w-auto sm:h-auto py-1.5 px-1.5 sm:px-2 rounded-full sm:rounded-none hover:bg-neutral-100 sm:hover:bg-transparent focus:outline-none"
              aria-label="Shopping Cart"
            >
              <div className="relative flex items-center justify-center">
                <svg
                  className="w-[18px] h-[18px] text-neutral-900 group-hover:scale-105 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.45"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5.5 8h13l1.2 12.2a1.5 1.5 0 0 1-1.5 1.6H5.8a1.5 1.5 0 0 1-1.5-1.6L5.5 8z" />
                  <path d="M9 8V6a3 3 0 0 1 6 0v2" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-neutral-900 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold font-sans">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-[12px] uppercase tracking-[0.1em] font-sans font-medium text-neutral-900">
                Bag ({cartCount})
              </span>
            </button>

            {/* Mobile / Tablet Hamburger Button (Hidden on Desktop/PC >= lg) */}
            <button
              onClick={onOpenNavDrawer}
              className="lg:hidden p-2 -mr-2 text-neutral-900 hover:text-neutral-600 transition-colors focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <div className="w-5 flex flex-col space-y-1.5 items-end">
                <span className="block h-[1.5px] w-5 bg-neutral-900"></span>
                <span className="block h-[1.5px] w-3.5 bg-neutral-900"></span>
                <span className="block h-[1.5px] w-5 bg-neutral-900"></span>
              </div>
            </button>
          </div>

        </div>

        {/* Below Navbar: Smooth Slide-Down Luxury Search Tray & Live Results */}
        {isSearchExpanded && (
          <div
            ref={searchContainerRef}
            className="border-t border-neutral-200/90 bg-white/98 backdrop-blur-md shadow-2xl transition-all duration-300 ease-out animate-in slide-in-from-top-3 fade-in"
          >
            <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4">

              {/* Centered Luxury Search Form (Submit triggers full catalogue search) */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    setIsSearchExpanded(false);
                    if (onSearchSubmit) {
                      onSearchSubmit(searchQuery);
                    } else {
                      onNavigate('shop', 'all');
                    }
                  }
                }}
                className="max-w-2xl mx-auto flex items-center bg-[#FAF9F6] border border-neutral-300 focus-within:border-neutral-900 rounded-full px-4 py-2.5 shadow-sm transition-all duration-200"
              >
                <Search className="w-4 h-4 text-neutral-400 mr-2.5 flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search gold necklaces, solitaire rings, bridal jhumkas..."
                  className="w-full bg-transparent text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none font-sans"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-neutral-400 hover:text-black transition-colors mr-1"
                    title="Clear Query"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchExpanded(false);
                    setSearchQuery('');
                  }}
                  className="text-[10px] uppercase tracking-wider text-neutral-500 hover:text-black border-l border-neutral-300 pl-2 sm:pl-2.5 font-medium flex-shrink-0"
                >
                  <span className="hidden sm:inline">Close [ESC]</span>
                  <span className="sm:hidden font-bold px-1">✕</span>
                </button>
              </form>

              {/* Live Search Results Dropdown (when query typed) */}
              {searchQuery.trim() && (
                <div className="max-w-2xl mx-auto mt-3 bg-white border border-neutral-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="p-3 bg-[#FAF9F6] border-b border-neutral-200/80 flex items-center justify-between text-xs font-sans">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
                      Found {searchResults.length} {searchResults.length === 1 ? 'Design' : 'Designs'} for "{searchQuery}"
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchExpanded(false);
                        if (onSearchSubmit) {
                          onSearchSubmit(searchQuery);
                        } else {
                          onNavigate('shop', 'all');
                        }
                      }}
                      className="text-neutral-900 hover:text-black font-semibold text-[11px] uppercase tracking-wider inline-flex items-center space-x-1"
                    >
                      <span>View All in Catalogue ({searchResults.length})</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="max-h-[360px] overflow-y-auto p-2.5 space-y-1.5 divide-y divide-neutral-100">
                    {searchResults.length > 0 ? (
                      searchResults.slice(0, 8).map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            if (onSelectProduct) {
                              onSelectProduct(product);
                            }
                            setIsSearchExpanded(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center space-x-3.5 p-2 rounded-xl hover:bg-neutral-50 cursor-pointer transition-colors pt-2.5"
                        >
                          {/* Thumbnail with Crisp Border */}
                          <div className="w-12 h-12 rounded-lg bg-[#FAF9F6] border border-neutral-200/70 overflow-hidden flex-shrink-0">
                            <img
                              src={product.primaryImage}
                              alt={product.name}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>

                          {/* Meta */}
                          <div className="flex-1 min-w-0 text-left">
                            <span className="text-[9px] uppercase tracking-wider text-neutral-400 block font-sans">
                              {product.category}
                            </span>
                            <h4 className="font-serif text-sm font-normal text-neutral-900 truncate">
                              {product.name}
                            </h4>
                            <p className="font-sans text-xs font-semibold text-neutral-900 mt-0.5">
                              {product.currency} {product.price.toLocaleString('en-IN')}
                            </p>
                          </div>

                          <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-black flex-shrink-0" />
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-xs text-neutral-500 font-light font-sans">
                        No fine jewellery matches "{searchQuery}". Try searching for gold, necklace, ring, or jhumka.
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </header>
    </>
  );
};
