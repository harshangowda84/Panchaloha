import React, { useState } from 'react';
import { WELCOME_IMAGE } from '../data/products';
import { Check, ArrowRight } from 'lucide-react';

export const WelcomePrivilege: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="w-full bg-[#FAF9F5] border-y border-neutral-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center">
        
        {/* Left Column: High-Key Portrait Image */}
        <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[540px] w-full overflow-hidden bg-neutral-200">
          <img
            src={WELCOME_IMAGE}
            alt="Panchaloha Model Portrait"
            className="w-full h-full object-cover object-center filter grayscale contrast-[1.05]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85';
            }}
          />
        </div>

        {/* Right Column: Editorial Copy & Offer Unlock */}
        <div className="p-8 sm:p-14 lg:p-20 flex flex-col justify-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 font-sans block mb-3">
            Exclusive Invitation
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight mb-5">
            The Welcome Privilege
          </h2>

          <p className="text-neutral-600 text-sm sm:text-base font-sans font-light leading-relaxed mb-8 max-w-md">
            Enjoy 15% off your first acquisition when you subscribe to our private client communications. Receive preview invitations to seasonal capsules and bespoke salon events.
          </p>

          {isSubmitted ? (
            <div className="bg-white border border-neutral-300 p-6 max-w-md animate-in fade-in">
              <div className="flex items-center space-x-2 text-neutral-900 font-medium mb-1">
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-sm uppercase tracking-[0.15em] font-sans">Privilege Code Unlocked</span>
              </div>
              <p className="text-xs text-neutral-500 font-sans mb-3">
                Apply this VIP invitation code at checkout:
              </p>
              <div className="font-mono text-base tracking-widest bg-neutral-100 py-2 px-3 border border-dashed border-neutral-300 text-center font-bold text-neutral-800">
                PANCHALOHA-PRIVILEGE-15
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-white border border-neutral-300 px-4 py-3 text-sm font-sans placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 text-xs uppercase tracking-[0.2em] font-sans font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center space-x-2 whitespace-nowrap"
              >
                <span>Unlock Offer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-sans mt-4">
            No spam. You may withdraw your consent at any time.
          </p>
        </div>

      </div>
    </section>
  );
};
