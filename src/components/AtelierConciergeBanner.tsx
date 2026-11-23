import React, { useState } from 'react';
import { Phone, Calendar, Check, ArrowRight, X } from 'lucide-react';

export const AtelierConciergeBanner: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) {
      setSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitted(false);
        setName('');
        setPhone('');
      }, 2500);
    }
  };

  return (
    <>
      <section className="w-full bg-[#1A1A1A] text-white py-14 sm:py-20 lg:py-28 font-sans overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Overlapping Dual Editorial Frames with Hover Scale */}
          <div className="relative flex justify-center lg:justify-start items-center">
            {/* Primary Frame */}
            <div className="relative w-64 sm:w-80 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-neutral-700 bg-neutral-900 z-10 group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85"
                alt="Atelier Master Craftsman"
                className="w-full h-full object-cover object-center filter brightness-95 transition-transform duration-700 group-hover:scale-106"
              />
            </div>

            {/* Overlapping Secondary Offset Frame */}
            <div className="relative -ml-20 sm:-ml-28 mt-20 w-52 sm:w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C5A880]/40 bg-neutral-800 z-20 group hidden sm:block">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=85"
                alt="Bridal Jewellery Consultation"
                className="w-full h-full object-cover object-center filter brightness-90 transition-transform duration-700 group-hover:scale-106"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <span className="text-[10px] uppercase tracking-widest text-[#E0C79B] font-medium">
                  Private Salon Session
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Consultation Copy & Dual CTAs */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-[#E0C79B] mb-3">
              <span className="w-6 h-[1px] bg-[#E0C79B]"></span>
              <span>Bespoke Concierge Advisory</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight mb-4 sm:mb-5">
              Need Assistance Selecting Your Heirloom?
            </h2>

            <p className="text-neutral-300 text-xs sm:text-base font-light leading-relaxed mb-6 sm:mb-8 max-w-lg">
              Our master gemologists and personal bridal curators are available for private consultations—whether you seek guidance on diamond 4Cs, custom auspicious weights, or bespoke bridal harams.
            </p>

            {/* Dual CTAs (Joyalukkas Style) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 bg-[#E0C79B] text-black hover:bg-white transition-all duration-300 rounded-full text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center space-x-2 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Atelier Consultation</span>
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 border border-neutral-600 hover:border-white text-white transition-all duration-300 rounded-full text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Request Call Back</span>
              </button>
            </div>

            {/* Micro-Features */}
            <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs text-neutral-400">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E0C79B]"></span>
                <span>Virtual Video Walkthrough Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E0C79B]"></span>
                <span>Astrological Vedic Gem Guidance</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Consultation Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="relative w-full max-w-md bg-white text-neutral-900 rounded-2xl shadow-2xl p-8 sm:p-10 animate-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black transition-colors"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>

            {submitted ? (
              <div className="text-center py-6 animate-in fade-in">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl text-neutral-900 mb-1">Appointment Request Received</h4>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Our Senior Jewellery Concierge will reach out within 2 hours to confirm your preferred salon slot.
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-sans block mb-1">
                    Private Appointment
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-neutral-900">
                    Schedule Salon Consultation
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ananya Deshmukh"
                      className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-lg text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">Phone Number (+91)</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-lg text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 bg-black text-white hover:bg-neutral-800 rounded-lg text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Confirm Consultation Request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
};
