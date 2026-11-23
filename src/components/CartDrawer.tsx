import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onViewCartPage?: () => void;
  onProceedToCheckout?: (discountAmount: number, promoCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onViewCartPage,
  onProceedToCheckout
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoSuccess, setPromoSuccess] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);

  // Lock background window scroll when CartDrawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotalWithGst = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const gstRate = 3; // 3% standard on precious jewellery in India
  const discountAmount = subtotalWithGst * appliedDiscount;
  const total = Math.max(0, subtotalWithGst - discountAmount);
  const basePriceTotal = Math.round(subtotalWithGst / 1.03);
  const gstAmount = subtotalWithGst - basePriceTotal;
  const cgstAmount = Math.round(gstAmount / 2);
  const sgstAmount = gstAmount - cgstAmount;
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

  const handleCheckout = () => {
    if (onProceedToCheckout) {
      onClose();
      onProceedToCheckout(discountAmount, promoSuccess ? promoCode : '');
    } else {
      setOrderComplete(true);
      setTimeout(() => {
        onClearCart();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-Over Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-2 sm:pl-10">
        <div className="w-screen max-w-md h-full bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* 1. Header (Sticky Top) */}
          <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between flex-shrink-0 bg-white">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-xl sm:text-2xl font-light text-neutral-900">Your Bag</span>
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-sans">
                ({items.reduce((s, i) => s + i.quantity, 0)} {items.reduce((s, i) => s + i.quantity, 0) === 1 ? 'item' : 'items'})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-500 hover:text-black transition-colors"
              aria-label="Close Bag"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* 2. Main Scrollable Content Area: Shipping Bar + Product List + Voucher + Detailed GST Slip */}
          <div className="flex-1 overflow-y-auto overscroll-contain divide-y divide-neutral-100">
            
            {/* Free Shipping Progress Indicator */}
            <div className="bg-[#FAF9F6] px-4 sm:px-6 py-3 text-xs">
              {subtotalWithGst >= freeShippingThreshold ? (
                <div className="text-neutral-800 flex items-center space-x-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>You qualify for Complimentary Insured Express Courier!</span>
                </div>
              ) : (
                <div className="text-neutral-600">
                  Add <span className="font-semibold text-black">₹{(freeShippingThreshold - subtotalWithGst).toLocaleString('en-IN')}</span> more to unlock Complimentary Insured Shipping.
                </div>
              )}
              <div className="w-full bg-neutral-200 h-1 mt-2 rounded-full overflow-hidden">
                <div 
                  className="bg-black h-full transition-all duration-500"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="p-4 sm:p-6 space-y-5">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <p className="font-serif text-2xl font-light text-neutral-400 mb-2">Your Bag is Empty</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-neutral-400 mb-6">Explore our curated collections</p>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-black text-white text-xs uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
                  >
                    Discover Collections
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}-${item.selectedMaterial}`} className="flex space-x-3.5 pb-5 border-b border-neutral-100 last:border-b-0 last:pb-0">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-[#F9F9F9] flex-shrink-0 overflow-hidden border border-neutral-100 rounded-lg">
                      <img
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm sm:text-base font-normal text-neutral-900 leading-snug line-clamp-2">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-neutral-400 hover:text-red-600 transition-colors p-1 flex-shrink-0"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Variant metadata */}
                        <div className="text-[11px] text-neutral-500 mt-1 space-x-1.5">
                          {item.selectedMaterial && <span>{item.selectedMaterial}</span>}
                          {item.selectedSize && <span>• Size {item.selectedSize}</span>}
                        </div>

                        <div className="text-xs text-neutral-800 font-medium mt-1">
                          {item.product.currency} {item.product.price.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-neutral-400 font-sans">
                          Incl. 3% GST (₹{Math.round((item.product.price * item.quantity) - ((item.product.price * item.quantity) / 1.03)).toLocaleString('en-IN')})
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center space-x-3 mt-2.5">
                        <div className="flex items-center border border-neutral-200 rounded">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-neutral-100 text-neutral-600 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-medium text-neutral-900">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-neutral-100 text-neutral-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs text-neutral-500 font-light">
                          Sub: {item.product.currency} {(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>

                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Voucher Code & Statutory Indian GST Slip (Integrated into Scrollable Area) */}
            {items.length > 0 && (
              <div className="p-4 sm:p-6 bg-[#FAF9F6]/60 space-y-4">
                {/* Voucher Code Form */}
                <form onSubmit={handleApplyPromo}>
                  <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-medium mb-1.5">Privilege Voucher:</span>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. PANCHALOHA15"
                      className="flex-1 bg-white border border-neutral-300 px-3 py-2 text-xs uppercase font-sans placeholder:normal-case focus:outline-none focus:border-black rounded"
                    />
                    <button
                      type="submit"
                      className="bg-neutral-900 text-white px-4 py-2 text-xs uppercase tracking-[0.15em] hover:bg-black transition-colors rounded"
                    >
                      Apply
                    </button>
                  </div>
                  {promoSuccess && (
                    <p className="text-[11px] text-emerald-600 mt-1.5 flex items-center space-x-1">
                      <Check className="w-3 h-3 flex-shrink-0" />
                      <span>VIP Privilege discount applied (-15%)</span>
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-red-500 mt-1.5">{promoError}</p>
                  )}
                </form>

                {/* Statutory Indian GST Breakdown Details */}
                <div className="space-y-2 text-xs text-neutral-600 pt-2 border-t border-neutral-200/80">
                  <div className="flex justify-between">
                    <span>Base Jewellery Value</span>
                    <span className="font-medium text-neutral-800">₹{basePriceTotal.toLocaleString('en-IN')}</span>
                  </div>
                  
                  {/* Statutory 3% GST Breakdown Box */}
                  <div className="bg-white p-2.5 rounded-lg border border-neutral-200 space-y-1">
                    <div className="flex justify-between items-center text-neutral-800 font-medium">
                      <span>Total Statutory GST ({gstRate}%)</span>
                      <span className="text-neutral-900 font-semibold">₹{gstAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-neutral-500 font-mono">
                      <span>CGST (1.5%)</span>
                      <span>₹{cgstAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-neutral-500 font-mono">
                      <span>SGST (1.5%)</span>
                      <span>₹{sgstAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span>Subtotal (Incl. 3% GST)</span>
                    <span className="font-medium text-neutral-800">₹{subtotalWithGst.toLocaleString('en-IN')}</span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Privilege 15% Off</span>
                      <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Insured Express Shipping</span>
                    <span className="text-emerald-700 font-medium">Complimentary</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* 3. Sticky Checkout Footer (Compact & Never Crushes Product List) */}
          {items.length > 0 && (
            <div className="p-4 bg-white border-t border-neutral-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] flex-shrink-0">
              
              {/* Order Status Feedback */}
              {orderComplete ? (
                <div className="bg-emerald-50 border border-emerald-200 p-3 text-center rounded">
                  <Check className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                  <h5 className="font-serif text-base text-emerald-900">Order Placed Successfully!</h5>
                  <p className="text-[11px] text-emerald-700 font-sans mt-0.5">
                    An acquisition confirmation has been dispatched to your email.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-neutral-500 block font-medium">Total Payable</span>
                      <span className="text-[10px] text-neutral-400">Incl. 3% GST & Insured Transit</span>
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-xl sm:text-2xl font-semibold text-neutral-900">
                        ₹{total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={handleCheckout}
                      className="w-full py-3 bg-neutral-950 text-white hover:bg-black transition-all text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center space-x-2 group shadow-md rounded"
                    >
                      <span>Proceed to Private Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {onViewCartPage && (
                      <button
                        onClick={() => {
                          onClose();
                          onViewCartPage();
                        }}
                        className="w-full py-2 border border-neutral-300 hover:border-black text-neutral-800 hover:text-black transition-colors text-[11px] uppercase tracking-[0.16em] font-medium rounded"
                      >
                        View Full Bag & GST Slip
                      </button>
                    )}
                  </div>
                </>
              )}

              <p className="text-[9px] text-center text-neutral-400 mt-2.5 uppercase tracking-[0.08em]">
                Secure 256-bit Encrypted Acquisition • 30-Day Return Guarantee
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
