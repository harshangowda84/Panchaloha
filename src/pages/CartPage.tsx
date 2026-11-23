import React, { useState } from 'react';
import { CartItem, Product } from '../types';
import {
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  ShoppingBag,
  Award,
  Truck,
  RefreshCw,
  Lock
} from 'lucide-react';

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onSelectProduct: (product: Product) => void;
  onContinueShopping: () => void;
  onProceedToCheckout: (discountAmount: number, promoCode: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onSelectProduct,
  onContinueShopping,
  onProceedToCheckout
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoSuccess, setPromoSuccess] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Computations
  const subtotalWithGst = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  // Calculate Base Price and GST (Assuming price is inclusive of GST, default 3%)
  // Base Price = Total / (1 + GST Rate / 100)
  const gstRate = 3; // 3% standard for gold & fine jewellery in India
  const basePriceTotal = Math.round(subtotalWithGst / (1 + gstRate / 100));
  const gstAmount = subtotalWithGst - basePriceTotal;
  const cgstAmount = Math.round(gstAmount / 2);
  const sgstAmount = gstAmount - cgstAmount;

  const discountAmount = Math.round(subtotalWithGst * appliedDiscount);
  const finalTotal = Math.max(0, subtotalWithGst - discountAmount);
  
  const freeShippingThreshold = 50000;
  const progressToFreeShipping = Math.min(100, (subtotalWithGst / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'PANCHALOHA-PRIVILEGE-15' || code === 'PANCHALOHA15') {
      setAppliedDiscount(0.15);
      setPromoSuccess(true);
      setPromoError('');
    } else {
      setPromoError('Invalid privilege voucher code');
      setPromoSuccess(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-white font-sans flex flex-col items-center justify-center px-4 py-16 sm:py-24">
        <div className="w-20 h-20 bg-[#FAF9F5] rounded-full flex items-center justify-center text-neutral-400 mb-6 border border-neutral-200">
          <ShoppingBag className="w-10 h-10 stroke-[1.2]" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] mb-2 font-medium">
          Your Personal Atelier Bag
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-neutral-900 tracking-tight mb-3">
          Your Bag is Currently Empty
        </h1>
        <p className="text-neutral-500 text-xs sm:text-sm font-light max-w-md text-center mb-8 leading-relaxed">
          Discover our handcrafted 22KT gold necklaces, BIS hallmarked diamond rings, and auspicious temple earrings to begin curating your heirloom ensemble.
        </p>
        <button
          onClick={onContinueShopping}
          className="px-8 py-3.5 bg-neutral-900 text-white hover:bg-black transition-all text-xs uppercase tracking-[0.2em] font-medium flex items-center space-x-2 shadow-md"
        >
          <span>Explore Masterpieces</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 pt-6 pb-20">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-200">
          <div className="flex items-center space-x-2 text-xs text-neutral-500">
            <button
              onClick={onContinueShopping}
              className="hover:text-black transition-colors flex items-center space-x-1.5 uppercase tracking-[0.15em]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </button>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-900 font-medium uppercase tracking-[0.15em]">
              Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
            </span>
          </div>

          <button
            onClick={onClearCart}
            className="text-xs text-neutral-400 hover:text-red-600 transition-colors uppercase tracking-[0.15em]"
          >
            Clear Bag
          </button>
        </div>

        {/* Free Shipping Qualified Banner */}
        <div className="bg-[#FAF9F5] border border-neutral-200 p-4 mb-8 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
            {subtotalWithGst >= freeShippingThreshold ? (
              <div className="flex items-center space-x-2 text-emerald-800 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Complimentary Armored Courier with 100% Transit Insurance Qualified!</span>
              </div>
            ) : (
              <div className="text-neutral-700">
                Add <span className="font-semibold text-black">₹{(freeShippingThreshold - subtotalWithGst).toLocaleString('en-IN')}</span> more to unlock Complimentary Armored Courier.
              </div>
            )}
            <span className="text-[11px] text-neutral-500 font-mono">
              Threshold: ₹50,000
            </span>
          </div>
          <div className="w-full bg-neutral-200 h-1.5 mt-2.5 rounded-full overflow-hidden">
            <div
              className="bg-neutral-900 h-full transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Main 2-Column Split: Cart List + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: Cart Items (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="hidden sm:grid grid-cols-12 pb-3 border-b border-neutral-200 text-xs uppercase tracking-[0.18em] font-medium text-neutral-400">
              <span className="col-span-6">Masterpiece</span>
              <span className="col-span-2 text-center">Quantity</span>
              <span className="col-span-2 text-right">Price (Incl. GST)</span>
              <span className="col-span-2 text-right">Total</span>
            </div>

            {items.map((item) => {
              const itemTotal = item.product.price * item.quantity;
              const itemGstRate = item.product.gstRate || 3;
              const itemBase = Math.round(itemTotal / (1 + itemGstRate / 100));
              const itemGst = itemTotal - itemBase;

              return (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedMaterial}`}
                  className="p-4 sm:p-5 bg-white border border-neutral-200 rounded-xl hover:border-neutral-300 transition-all grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                >
                  {/* Thumbnail & Details */}
                  <div className="sm:col-span-6 flex items-start space-x-4">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      onClick={() => onSelectProduct(item.product)}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover border border-neutral-100 rounded-lg cursor-pointer flex-shrink-0 bg-[#FAF9F5]"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] block mb-0.5">
                        {item.product.category}
                      </span>
                      <h3
                        onClick={() => onSelectProduct(item.product)}
                        className="font-serif text-base sm:text-lg font-normal text-neutral-900 truncate hover:text-[#C5A880] cursor-pointer transition-colors"
                      >
                        {item.product.name}
                      </h3>
                      <div className="text-xs text-neutral-500 space-y-0.5 mt-1 font-sans">
                        {item.selectedMaterial && (
                          <div>Metal: <span className="text-neutral-800 font-medium">{item.selectedMaterial}</span></div>
                        )}
                        {item.selectedSize && (
                          <div>Size: <span className="text-neutral-800 font-medium">{item.selectedSize}</span></div>
                        )}
                        <div className="text-[11px] text-neutral-400">
                          GST: {itemGstRate}% included (₹{itemGst.toLocaleString('en-IN')})
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="sm:col-span-2 flex items-center justify-between sm:justify-center">
                    <span className="sm:hidden text-xs text-neutral-500 uppercase tracking-wider">Quantity:</span>
                    <div className="flex items-center border border-neutral-300 rounded-md">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold font-sans">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="sm:col-span-2 text-left sm:text-right flex items-center justify-between sm:justify-end">
                    <span className="sm:hidden text-xs text-neutral-500 uppercase tracking-wider">Unit Price:</span>
                    <span className="text-xs sm:text-sm font-sans font-medium text-neutral-800">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Line Total & Remove */}
                  <div className="sm:col-span-2 flex items-center justify-between sm:justify-end space-x-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                    <span className="sm:hidden text-xs text-neutral-500 uppercase tracking-wider">Line Total:</span>
                    <div className="text-right">
                      <span className="text-sm font-sans font-semibold text-neutral-900 block">
                        ₹{itemTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors rounded"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              );
            })}

            {/* Delivery Guarantee Notice */}
            <div className="mt-8 p-5 bg-[#FAF9F5] border border-neutral-200/80 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-neutral-700">
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-[#C5A880] flex-shrink-0" />
                <div>
                  <span className="font-medium text-neutral-900 block">BIS Hallmarked 916</span>
                  <span className="text-[11px] text-neutral-500">Laser HUID Authenticated</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-[#C5A880] flex-shrink-0" />
                <div>
                  <span className="font-medium text-neutral-900 block">100% Insured Courier</span>
                  <span className="text-[11px] text-neutral-500">Tamper-Proof Steel Seal</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RefreshCw className="w-5 h-5 text-[#C5A880] flex-shrink-0" />
                <div>
                  <span className="font-medium text-neutral-900 block">Lifetime Exchange</span>
                  <span className="text-[11px] text-neutral-500">Transparent Bullion Buyback</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Order Summary & Checkout Card (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-neutral-200 rounded-xl p-6 sm:p-7 shadow-sm sticky top-24">
            
            <h2 className="font-serif text-2xl font-light text-neutral-900 pb-4 mb-5 border-b border-neutral-200">
              Order Summary
            </h2>

            {/* Promo Voucher Form */}
            <form onSubmit={handleApplyPromo} className="mb-6">
              <label className="block text-[11px] uppercase tracking-[0.18em] text-neutral-500 mb-2 font-medium">
                Privilege / VIP Promo Code
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="e.g. PANCHALOHA15"
                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-md text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-black"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 text-white text-xs uppercase tracking-[0.15em] rounded-md hover:bg-black transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoSuccess && (
                <p className="text-xs text-emerald-600 mt-2 flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>VIP 15% Privilege Discount Applied!</span>
                </p>
              )}
              {promoError && (
                <p className="text-xs text-red-500 mt-2">{promoError}</p>
              )}
              <div className="text-[10px] text-neutral-400 mt-1">
                Try code <span className="font-mono font-medium text-neutral-600">PANCHALOHA15</span> for 15% off.
              </div>
            </form>

            {/* Cost Breakdown */}
            <div className="space-y-3 pb-6 border-b border-neutral-200 text-xs text-neutral-600 font-sans">
              <div className="flex justify-between">
                <span>Base Jewellery Value</span>
                <span>₹{basePriceTotal.toLocaleString('en-IN')}</span>
              </div>
              
              {/* Detailed GST Breakdown */}
              <div className="flex justify-between text-neutral-700 bg-[#FAF9F5] p-2.5 rounded border border-neutral-100">
                <div>
                  <span className="font-medium text-neutral-900 block">Total GST ({gstRate}%)</span>
                  <span className="text-[10px] text-neutral-500">CGST 1.5% + SGST 1.5%</span>
                </div>
                <div className="text-right">
                  <span className="font-medium text-neutral-900 block">₹{gstAmount.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-neutral-500">CGST ₹{cgstAmount.toLocaleString('en-IN')} • SGST ₹{sgstAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <span>Subtotal (Incl. GST)</span>
                <span>₹{subtotalWithGst.toLocaleString('en-IN')}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>VIP Privilege Discount (15%)</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Armored Courier & Transit Insurance</span>
                <span className="text-neutral-900 font-medium">Complimentary</span>
              </div>

              <div className="flex justify-between items-baseline pt-3 border-t border-neutral-200 text-neutral-900">
                <span className="text-sm font-semibold uppercase tracking-wider">Grand Total</span>
                <span className="font-serif text-2xl font-normal text-neutral-900">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 text-right">
                All taxes & insurance included
              </p>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => onProceedToCheckout(discountAmount, promoSuccess ? promoCode : '')}
              className="w-full mt-6 py-4 bg-neutral-900 text-white hover:bg-black transition-all rounded-lg text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center space-x-2 group shadow-md"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Proceed to Insured Checkout</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-4 text-center text-[10px] uppercase tracking-wider text-neutral-400">
              Safe & 256-Bit Encrypted Payment
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
