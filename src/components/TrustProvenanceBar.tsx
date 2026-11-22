import React from 'react';
import { Award, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const TrustProvenanceBar: React.FC = () => {
  const assurances = [
    {
      icon: Award,
      title: '100% BIS Hallmarked 916 Gold',
      desc: 'Govt. registered purity with unique HUID laser engraving'
    },
    {
      icon: ShieldCheck,
      title: 'Certified Natural Diamonds',
      desc: 'Individually graded with official IGI & GIA grading reports'
    },
    {
      icon: Truck,
      title: 'Insured Transit Across India',
      desc: 'Complimentary door-to-door express courier in tamper-evident vaults'
    },
    {
      icon: RefreshCw,
      title: 'Lifetime Exchange & Buyback',
      desc: 'Guaranteed transparent prevailing metal rates with zero deductions'
    }
  ];

  return (
    <section className="bg-[#FAF9F6] border-y border-neutral-200 py-6 sm:py-8 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
          {assurances.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className={`flex items-start space-x-3.5 pt-4 sm:pt-0 ${idx !== 0 ? 'sm:pl-6' : ''}`}>
                <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center flex-shrink-0 text-neutral-800 shadow-sm mt-0.5">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-neutral-900 font-normal leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-neutral-500 text-xs font-light mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
