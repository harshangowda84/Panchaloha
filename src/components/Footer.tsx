import React, { useState } from 'react';
import { ViewState } from '../types';
import { Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewState, category?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && consent) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#1A1A1A] text-neutral-300 font-sans pt-20 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pb-16 border-b border-neutral-800">
          
          {/* Column 1: Brand & Philosophy */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="font-serif text-3xl tracking-[0.2em] font-light uppercase text-white block mb-4">
                PANCHALOHA
              </span>
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-sans mb-6">
                Fine Jewellery Atelier
              </p>
              <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-xs mb-8">
                Quiet luxury, organic fluid forms, and substantial noble metals designed to become an enduring extension of the self.
              </p>
            </div>
            <div className="text-[11px] text-neutral-500 font-sans">
              © 2035 by PANCHALOHA Jewellery.<br />
              Powered and Secured by Daiva Tech.
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-medium text-white mb-6">
              Collections
            </h4>
            <ul className="space-y-3.5 text-xs uppercase tracking-[0.18em] font-light text-neutral-400">
              <li>
                <button onClick={() => onNavigate('shop', 'all')} className="hover:text-white transition-colors">
                  Shop All
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'new-arrivals')} className="hover:text-white transition-colors">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'rings')} className="hover:text-white transition-colors">
                  Rings
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'necklaces')} className="hover:text-white transition-colors">
                  Necklaces
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'earrings')} className="hover:text-white transition-colors">
                  Earrings
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'bracelets')} className="hover:text-white transition-colors">
                  Bangles & Bracelets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Policies */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-medium text-white mb-6">
              Client Service
            </h4>
            <ul className="space-y-3.5 text-xs uppercase tracking-[0.18em] font-light text-neutral-400">
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-white transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#refund" className="hover:text-white transition-colors">
                  Refund & Exchange
                </a>
              </li>
              <li>
                <a href="#accessibility" className="hover:text-white transition-colors">
                  Accessibility Statement
                </a>
              </li>
              <li>
                <a href="#care" className="hover:text-white transition-colors">
                  Jewelry Care Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter ("The Inner Circle") */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-medium text-white mb-2">
              The Inner Circle
            </h4>
            <p className="text-xs text-neutral-400 font-light mb-6">
              Join for private previews, invitations to salon exhibitions, and bespoke commissions.
            </p>

            {subscribed ? (
              <div className="bg-neutral-800 p-4 border border-neutral-700 flex items-center space-x-2 text-white text-xs">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You have been added to the Inner Circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full bg-transparent border-b border-neutral-700 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white transition-colors font-sans"
                  />
                </div>

                <label className="flex items-start space-x-2.5 cursor-pointer text-[11px] text-neutral-400 select-none">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="mt-0.5 rounded-none bg-transparent border-neutral-600 text-white focus:ring-0"
                  />
                  <span>Yes, subscribe me to your newsletter.</span>
                </label>

                <button
                  type="submit"
                  disabled={!consent}
                  className="w-full bg-white text-black py-2.5 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Subscribe
                </button>
              </form>
            )}

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center space-x-6 text-xs uppercase tracking-[0.18em]">
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                Pinterest
              </a>
              <span className="text-neutral-700">•</span>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                Instagram
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 font-light">
          <div>
            Panchaloha Fine Jewellery • Heritage & Contemporary Atelier
          </div>
          <div className="mt-4 sm:mt-0">
            Handcrafted with sustainably certified gold and conflict-free gemstones.
          </div>
        </div>

      </div>
    </footer>
  );
};
