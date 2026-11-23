import React, { useState } from 'react';
import { Order } from '../types';
import { JewelleryTaxInvoiceModal } from '../components/JewelleryTaxInvoiceModal';
import {
  CheckCircle2,
  FileText,
  ArrowRight,
  Award,
  Truck,
  Package,
  CreditCard,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

interface OrderConfirmationPageProps {
  order: Order;
  onContinueShopping: () => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  order,
  onContinueShopping
}) => {
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const cgst = Math.round(order.gstAmount / 2);
  const sgst = order.gstAmount - cgst;

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans text-neutral-900 pt-8 sm:pt-12 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        
        {/* Success Banner Card */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-10 shadow-sm mb-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C5A880] via-neutral-900 to-[#C5A880]" />
          
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 border border-emerald-100">
            <CheckCircle2 className="w-9 h-9 stroke-[1.5]" />
          </div>

          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-medium block mb-2">
            Acquisition Confirmed
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-light text-neutral-900 tracking-tight mb-3">
            Thank You for Choosing Panchaloha
          </h1>

          <p className="text-neutral-600 text-xs sm:text-sm font-light max-w-lg mx-auto leading-relaxed mb-6">
            Your fine jewellery acquisition has been secured. Our master goldsmiths are preparing your pieces for sealed armored transport with 100% complimentary transit insurance.
          </p>

          {/* Quick Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF9F5] p-4 rounded-xl border border-neutral-200/70 text-left">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-0.5">Order ID</span>
              <span className="font-mono text-xs sm:text-sm font-semibold text-neutral-900">{order.id}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-0.5">Order Date</span>
              <span className="text-xs sm:text-sm font-medium text-neutral-800">{order.date}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-0.5">Estimated Delivery</span>
              <span className="text-xs sm:text-sm font-medium text-emerald-700">{order.deliveryDate}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-0.5">Armored Tracking</span>
              <span className="font-mono text-xs sm:text-sm font-semibold text-neutral-900">{order.trackingNumber}</span>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 pt-6 border-t border-neutral-100">
            <button
              onClick={() => setIsInvoiceOpen(true)}
              className="px-6 py-2.5 bg-neutral-900 hover:bg-black text-white rounded-lg text-xs uppercase tracking-[0.18em] font-medium flex items-center space-x-2 transition-colors shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-[#E0C79B]" />
              <span>View Official Tax Invoice / Bill</span>
            </button>
            <button
              onClick={onContinueShopping}
              className="px-5 py-2.5 border border-neutral-300 hover:border-black text-neutral-700 hover:text-black rounded-lg text-xs uppercase tracking-[0.18em] font-medium flex items-center space-x-2 transition-colors"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Order Details & Receipt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Acquired Items (7 cols) */}
          <div className="md:col-span-7 space-y-6">
            
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100">
                <h3 className="font-serif text-xl font-normal text-neutral-900 flex items-center space-x-2">
                  <Package className="w-5 h-5 text-[#C5A880]" />
                  <span>Acquired Pieces ({order.items.reduce((s, i) => s + i.quantity, 0)})</span>
                </h3>
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-sans">
                  BIS Certified
                </span>
              </div>

              <div className="divide-y divide-neutral-100">
                {order.items.map((item, idx) => {
                  const lineTotal = item.product.price * item.quantity;
                  const itemGstRate = item.product.gstRate || 3;
                  const itemBase = Math.round(lineTotal / (1 + itemGstRate / 100));
                  const itemGst = lineTotal - itemBase;

                  return (
                    <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-start space-x-4">
                      <img
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-neutral-100 bg-[#FAF9F5] flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] block mb-0.5">
                          {item.product.category}
                        </span>
                        <h4 className="font-serif text-base font-normal text-neutral-900 truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-xs text-neutral-500 mt-0.5">
                          <span>Qty: {item.quantity}</span>
                          {item.selectedMaterial && <span> • {item.selectedMaterial}</span>}
                          {item.selectedSize && <span> • Size: {item.selectedSize}</span>}
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-1">
                          Base: ₹{itemBase.toLocaleString('en-IN')} + GST ({itemGstRate}%): ₹{itemGst.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="font-sans text-sm font-semibold text-neutral-900 block">
                          ₹{lineTotal.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-neutral-400">Incl. GST</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Provenance & Hallmarking Guarantee Card */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 pb-3 mb-3 border-b border-neutral-100">
                <Award className="w-5 h-5 text-[#C5A880]" />
                <h4 className="font-serif text-lg font-normal text-neutral-900">
                  Government Certified Provenance
                </h4>
              </div>
              <p className="text-xs text-neutral-600 font-light leading-relaxed mb-4">
                Each masterpiece in this consignment has undergone individual spectrometer assays and bears laser-engraved Bureau of Indian Standards (BIS) 916 Hallmark with unique HUID traceability.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs bg-[#FAF9F5] p-3 rounded-lg border border-neutral-100">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Certificate Number</span>
                  <span className="font-mono font-medium text-neutral-800">BIS-HUID-916-2026</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Assay Purity</span>
                  <span className="font-mono font-medium text-neutral-800">22 Karat (91.6% Pure)</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Customer, Shipping & Financial Receipt (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            
            {/* Delivery Destination */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 pb-3 mb-3 border-b border-neutral-100">
                <MapPin className="w-4 h-4 text-[#C5A880]" />
                <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-900">
                  Insured Delivery Destination
                </h4>
              </div>
              
              <div className="text-xs text-neutral-700 space-y-1 font-light">
                <div className="font-semibold text-neutral-900 text-sm mb-1">{order.customer.name}</div>
                <div>{order.customer.address}</div>
                <div>{order.customer.city}, {order.customer.state} — {order.customer.pincode}</div>
                <div className="pt-2 mt-2 border-t border-neutral-100 flex items-center space-x-1.5 text-neutral-600">
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91 {order.customer.phone}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-neutral-600">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{order.customer.email}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center space-x-2 text-[11px] text-emerald-700 font-medium">
                <Truck className="w-4 h-4" />
                <span>Sequel Armored Logistics • Tamper Seal Packaging</span>
              </div>
            </div>

            {/* Payment & Tax Breakdown Receipt */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-neutral-100">
                <CreditCard className="w-4 h-4 text-[#C5A880]" />
                <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-900">
                  Tax Invoice & Payment Summary
                </h4>
              </div>

              <div className="space-y-2.5 text-xs text-neutral-600 font-sans pb-4 border-b border-neutral-100">
                <div className="flex justify-between">
                  <span>Base Jewellery Value</span>
                  <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-neutral-700 bg-[#FAF9F5] p-2 rounded border border-neutral-100">
                  <div>
                    <span className="font-medium text-neutral-900 block">Total GST ({order.gstRate}%)</span>
                    <span className="text-[10px] text-neutral-500">CGST 1.5% + SGST 1.5%</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-neutral-900 block">₹{order.gstAmount.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-neutral-500">CGST ₹{cgst.toLocaleString('en-IN')} • SGST ₹{sgst.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>VIP Privilege Voucher Discount</span>
                    <span>-₹{order.discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Armored Courier & Transit Insurance</span>
                  <span className="text-neutral-900 font-medium">Complimentary (₹0)</span>
                </div>

                <div className="flex justify-between items-baseline pt-3 border-t border-neutral-200 text-neutral-900">
                  <span className="text-sm font-semibold uppercase tracking-wider">Total Paid</span>
                  <span className="font-serif text-2xl font-normal text-neutral-900">
                    ₹{order.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="mt-4 text-xs text-neutral-500 space-y-1">
                <div>Payment Method: <span className="font-medium text-neutral-800">{order.paymentMethod}</span></div>
                <div>Status: <span className="text-emerald-700 font-medium">PAID & VERIFIED</span></div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Customized Official Jewellery Tax Invoice Bill Modal */}
      <JewelleryTaxInvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        order={order}
      />
    </div>
  );
};
