import React from 'react';
import { ShoppingBag, User as UserIcon } from 'lucide-react';
import { ViewState } from '../types';

interface HeaderProps {
  currentView: ViewState;
  currentCategory?: string;
  onNavigate: (view: ViewState, category?: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenNavDrawer: () => void;
  onOpenAuth: () => void;
  user: { name: string } | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  currentCategory = 'all',
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenNavDrawer,
  onOpenAuth,
  user
}) => {
  const isShopActive = (cat: string) => {
    return (currentView === 'shop' || currentView === 'pdp') && currentCategory === cat;
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#1A1A1A] text-[#FAFAFA] text-[11px] uppercase tracking-[0.25em] py-2.5 text-center font-sans font-light px-4">
        Complimentary 100% Insured Delivery Across India & Signature Luxury Packaging
      </div>

      {/* Main Luxury Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Left: Brand Identity */}
          <div className="flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className="text-left group focus:outline-none"
            >
              <span className="font-serif text-3xl md:text-4xl tracking-[0.18em] font-light uppercase text-neutral-900 group-hover:text-neutral-600 transition-colors">
                PANCHALOHA
              </span>
              <span className="block text-[8px] uppercase tracking-[0.35em] text-neutral-400 -mt-1 font-sans font-medium">
                Fine Jewellery
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 text-xs tracking-[0.18em] uppercase font-sans font-medium text-neutral-600">
              <button 
                onClick={() => onNavigate('shop', 'all')} 
                className={`py-1 transition-colors ${
                  isShopActive('all')
                    ? 'text-black border-b-2 border-black font-semibold'
                    : 'hover:text-black'
                }`}
              >
                Shop All
              </button>
              <button 
                onClick={() => onNavigate('shop', 'new-arrivals')} 
                className={`py-1 transition-colors ${
                  isShopActive('new-arrivals')
                    ? 'text-black border-b-2 border-black font-semibold'
                    : 'hover:text-black'
                }`}
              >
                New Arrivals
              </button>
              <button 
                onClick={() => onNavigate('shop', 'necklaces')} 
                className={`py-1 transition-colors ${
                  isShopActive('necklaces')
                    ? 'text-black border-b-2 border-black font-semibold'
                    : 'hover:text-black'
                }`}
              >
                Necklaces
              </button>
              <button 
                onClick={() => onNavigate('shop', 'rings')} 
                className={`py-1 transition-colors ${
                  isShopActive('rings')
                    ? 'text-black border-b-2 border-black font-semibold'
                    : 'hover:text-black'
                }`}
              >
                Rings
              </button>
              <button 
                onClick={() => onNavigate('shop', 'earrings')} 
                className={`py-1 transition-colors ${
                  isShopActive('earrings')
                    ? 'text-black border-b-2 border-black font-semibold'
                    : 'hover:text-black'
                }`}
              >
                Earrings
              </button>
              <button 
                onClick={() => onNavigate('shop', 'bracelets')} 
                className={`py-1 transition-colors ${
                  isShopActive('bracelets')
                    ? 'text-black border-b-2 border-black font-semibold'
                    : 'hover:text-black'
                }`}
              >
                Bangles & Bracelets
              </button>
              <button 
                onClick={() => onNavigate('about')} 
                className={`py-1 transition-colors ${
                  currentView === 'about'
                    ? 'text-black border-b-2 border-black font-semibold'
                    : 'hover:text-black'
                }`}
              >
                About Us
              </button>
            </nav>
          </div>

          {/* Right Action Icons: Auth, Cart, Hamburger */}
          <div className="flex items-center space-x-6">
            
            {/* Account / Login */}
            <button
              onClick={onOpenAuth}
              className="hidden sm:flex items-center space-x-2 text-xs uppercase tracking-[0.15em] font-sans text-neutral-700 hover:text-black transition-colors"
              title="Client Account"
            >
              <UserIcon className="w-4 h-4 stroke-[1.5]" />
              <span>{user ? user.name.split(' ')[0] : 'Log In'}</span>
            </button>

            {/* Cart Button with Count */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center space-x-1.5 text-xs uppercase tracking-[0.18em] font-sans font-medium text-neutral-900 hover:text-neutral-600 transition-colors py-2 px-1"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
              <span>Bag ({cartCount})</span>
            </button>

            {/* Minimal Luxury Hamburger Icon for Slide-out Drawer */}
            <button
              onClick={onOpenNavDrawer}
              className="p-2 -mr-2 text-neutral-900 hover:text-neutral-600 transition-colors focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <div className="w-6 flex flex-col space-y-1.5 items-end">
                <span className="block h-[1.5px] w-6 bg-neutral-900"></span>
                <span className="block h-[1.5px] w-4 bg-neutral-900"></span>
                <span className="block h-[1.5px] w-6 bg-neutral-900"></span>
              </div>
            </button>
          </div>

        </div>
      </header>
    </>
  );
};
