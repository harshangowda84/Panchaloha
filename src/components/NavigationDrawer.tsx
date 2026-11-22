import React from 'react';
import { X, User, Instagram, ArrowRight } from 'lucide-react';
import { ViewState } from '../types';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewState, category?: string) => void;
  onOpenAuth: () => void;
  user: { name: string; email: string } | null;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenAuth,
  user
}) => {
  if (!isOpen) return null;

  const handleLinkClick = (view: ViewState, category?: string) => {
    onNavigate(view, category);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between p-8 sm:p-12 animate-in slide-in-from-right duration-300">
          
          {/* Top Header of Drawer */}
          <div>
            <div className="flex items-center justify-between pb-8 border-b border-neutral-100">
              <button
                onClick={() => {
                  onClose();
                  onOpenAuth();
                }}
                className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-sans font-medium text-neutral-800 hover:text-black transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span>{user ? user.name : 'Log In'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 text-neutral-600 hover:text-black transition-colors"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Main Links Stack */}
            <nav className="mt-12 flex flex-col space-y-7">
              <button
                onClick={() => handleLinkClick('shop', 'all')}
                className="text-left font-serif text-3xl sm:text-4xl font-light text-neutral-900 hover:text-neutral-500 hover:translate-x-2 transition-all flex items-center justify-between group"
              >
                <span>Shop All</span>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-neutral-400" />
              </button>

              <button
                onClick={() => handleLinkClick('shop', 'new-arrivals')}
                className="text-left font-serif text-3xl sm:text-4xl font-light text-neutral-900 hover:text-neutral-500 hover:translate-x-2 transition-all flex items-center justify-between group"
              >
                <span>New Arrivals</span>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-neutral-400" />
              </button>

              <button
                onClick={() => handleLinkClick('shop', 'necklaces')}
                className="text-left font-serif text-3xl sm:text-4xl font-light text-neutral-900 hover:text-neutral-500 hover:translate-x-2 transition-all flex items-center justify-between group"
              >
                <span>Necklaces</span>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-neutral-400" />
              </button>

              <button
                onClick={() => handleLinkClick('shop', 'rings')}
                className="text-left font-serif text-3xl sm:text-4xl font-light text-neutral-900 hover:text-neutral-500 hover:translate-x-2 transition-all flex items-center justify-between group"
              >
                <span>Rings</span>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-neutral-400" />
              </button>

              <button
                onClick={() => handleLinkClick('shop', 'earrings')}
                className="text-left font-serif text-3xl sm:text-4xl font-light text-neutral-900 hover:text-neutral-500 hover:translate-x-2 transition-all flex items-center justify-between group"
              >
                <span>Earrings</span>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-neutral-400" />
              </button>

              <button
                onClick={() => handleLinkClick('shop', 'bracelets')}
                className="text-left font-serif text-3xl sm:text-4xl font-light text-neutral-900 hover:text-neutral-500 hover:translate-x-2 transition-all flex items-center justify-between group"
              >
                <span>Bangles & Bracelets</span>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-neutral-400" />
              </button>

              <button
                onClick={() => handleLinkClick('about')}
                className="text-left font-serif text-3xl sm:text-4xl font-light text-neutral-900 hover:text-neutral-500 hover:translate-x-2 transition-all flex items-center justify-between group pt-4 border-t border-neutral-100"
              >
                <span>About Us</span>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-neutral-400" />
              </button>
            </nav>
          </div>

          {/* Bottom Drawer Footer */}
          <div className="pt-8 border-t border-neutral-100">
            <div className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2 font-sans">
              Private Concierge
            </div>
            <a 
              href="mailto:concierge@panchalohajewels.com" 
              className="text-sm text-neutral-800 hover:text-black font-sans block mb-6 transition-colors"
            >
              concierge@panchalohajewels.com
            </a>

            <div className="flex items-center space-x-5 text-neutral-600">
              <a href="#instagram" className="text-xs uppercase tracking-[0.15em] hover:text-black transition-colors flex items-center space-x-1">
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>
              <span className="text-neutral-300">•</span>
              <a href="#pinterest" className="text-xs uppercase tracking-[0.15em] hover:text-black transition-colors">
                Pinterest
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
