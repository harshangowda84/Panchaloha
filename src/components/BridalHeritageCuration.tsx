import React from 'react';
import { ArrowRight } from 'lucide-react';

interface BridalHeritageCurationProps {
  onNavigate: (view: 'shop', category?: string) => void;
}

export const BridalHeritageCuration: React.FC<BridalHeritageCurationProps> = ({ onNavigate }) => {
  const collections = [
    {
      id: 'temple-heritage',
      title: 'Imperial Temple Bridal',
      tagline: 'Antique 22KT Nakshi Gold & Kemp Rubies',
      category: 'necklaces',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=85',
      badge: 'Royal Heirloom'
    },
    {
      id: 'mughal-polki',
      title: 'Mughal Uncut Polki Suite',
      tagline: 'Natural Syndicate Polki & Basra Pearls',
      category: 'necklaces',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=85',
      badge: 'Atelier Signature'
    },
    {
      id: 'modern-solitaire',
      title: 'Diamond Reception Glamour',
      tagline: 'VVS1 Brilliant Diamonds in Platinum & White Gold',
      category: 'rings',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=85',
      badge: 'Solitaire Edit'
    },
    {
      id: 'muhurtham-kadas',
      title: 'Auspicious Muhurtham Kadas',
      tagline: 'Embossed Peacock Kadas & Broad Filigree Bangles',
      category: 'bracelets',
      image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=85',
      badge: 'Bridal Kadas'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF9F5] border-y border-neutral-200 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-4 border-b border-neutral-200 gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-8 h-[1px] bg-neutral-400"></span>
              <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 font-medium">
                Bridal & Occasion
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight">
              Curated Bridal Collections
            </h2>
          </div>

          <button
            onClick={() => onNavigate('shop', 'all')}
            className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-neutral-800 hover:text-black transition-colors"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4-Card Bridal Grid with Hover Zoom & Card Lift */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {collections.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate('shop', item.category)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col cursor-pointer border border-neutral-200/80 transform hover:-translate-y-1.5"
            >
              {/* Image Container with Zoom */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                />
                
                {/* Badge */}
                <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.18em] font-sans font-medium text-neutral-900 shadow-sm border border-neutral-100">
                  {item.badge}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card Footer Details */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif text-xl font-normal text-neutral-900 group-hover:text-[#9A7B38] transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 text-xs font-light leading-relaxed">
                    {item.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs uppercase tracking-[0.18em] font-medium text-neutral-900 group-hover:text-black">
                  <span>Discover More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
