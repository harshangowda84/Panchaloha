import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import {
  ArrowLeft,
  ShieldCheck,
  Award,
  Truck,
  RefreshCw,
  Heart,
  Share2,
  Check,
  Ruler,
  ZoomIn,
  X
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, selectedSize?: string, selectedMaterial?: string) => void;
  onBack: () => void;
  onOpenCart: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onSelectProduct,
  onAddToCart,
  onBack,
  onOpenCart
}) => {
  const [activeImage, setActiveImage] = useState<string>(product.primaryImage);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [selectedMaterial, setSelectedMaterial] = useState<string>(product.materials[0] || '22KT Yellow Gold');
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [addedToast, setAddedToast] = useState<boolean>(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [pincode, setPincode] = useState<string>('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'shipping'>('details');

  // When product changes, reset active image and selections
  useEffect(() => {
    setActiveImage(product.primaryImage);
    setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);
    setSelectedMaterial(product.materials[0] || '22KT Yellow Gold');
    setQuantity(1);
    setAddedToast(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const uniqueImages = Array.from(
    new Set([product.primaryImage, product.secondaryImage, ...product.galleryImages].filter(Boolean))
  );

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedSize, selectedMaterial);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    onAddToCart(product, quantity, selectedSize, selectedMaterial);
    onOpenCart();
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode.trim())) {
      const today = new Date();
      const deliveryDate = new Date(today.setDate(today.getDate() + 3));
      const formatted = deliveryDate.toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      setPincodeStatus(`Guaranteed Delivery by ${formatted} • Free 100% Insured Courier`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  // Related products from same category or collection
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.isPopular))
    .slice(0, 4);

  const categoryNameMap: Record<string, string> = {
    necklaces: 'Chains & Necklaces',
    rings: 'Rings & Bands',
    earrings: 'Earrings & Jhumkas',
    bracelets: 'Bangles & Bracelets'
  };

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 pb-24">
      
      {/* 1. Breadcrumbs & Back Navigation Header */}
      <div className="border-b border-neutral-100 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3.5 flex items-center justify-between text-xs font-sans">
          
          <div className="flex items-center space-x-2 text-neutral-500 overflow-x-auto">
            <button
              onClick={onBack}
              className="hover:text-black transition-colors flex items-center space-x-1 uppercase tracking-[0.15em]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <span className="text-neutral-300">/</span>
            <span className="uppercase tracking-[0.15em] hover:text-black cursor-pointer" onClick={onBack}>
              {categoryNameMap[product.category] || product.category}
            </span>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-800 font-medium truncate max-w-[200px] sm:max-w-md">
              {product.name}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="p-1.5 text-neutral-600 hover:text-red-500 transition-colors flex items-center space-x-1.5"
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="hidden sm:inline text-[11px] uppercase tracking-[0.15em]">
                {isWishlisted ? 'Wishlisted' : 'Wishlist'}
              </span>
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 text-neutral-600 hover:text-black transition-colors flex items-center space-x-1.5"
              title="Share Design"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px] uppercase tracking-[0.15em]">Share</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Main Product Viewport: Gallery + Buying Suite */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 lg:pt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: Multi-Angle Interactive Studio Gallery (7 cols) */}
          <div className="md:col-span-6 lg:col-span-7 md:sticky md:top-24 flex flex-col-reverse md:flex-row gap-4 lg:gap-6">
            
            {/* Desktop Vertical Thumbnails / Mobile Horizontal */}
            {uniqueImages.length > 1 && (
              <div className="flex md:flex-col space-x-3 md:space-x-0 md:space-y-3 overflow-x-auto md:overflow-y-auto max-h-[620px] pb-2 md:pb-0 scrollbar-none flex-shrink-0">
                {uniqueImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 border-2 overflow-hidden flex-shrink-0 bg-[#FAF9F6] transition-all duration-200 ${
                      activeImage === img ? 'border-neutral-900 shadow-sm' : 'border-neutral-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                    <span className="absolute bottom-1 right-1 text-[9px] bg-black/60 text-white px-1 py-0.2 rounded font-sans">
                      {idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Main Interactive Stage Photo */}
            <div className="relative flex-1 bg-[#FAF9F6] border border-neutral-100 overflow-hidden group aspect-square flex items-center justify-center">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 cursor-zoom-in"
                onClick={() => setIsLightboxOpen(true)}
              />

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col space-y-1.5 pointer-events-none">
                {product.isNewArrival && (
                  <span className="bg-black text-white text-[10px] uppercase tracking-[0.2em] font-sans px-3 py-1 shadow-sm">
                    New Arrival
                  </span>
                )}
                <span className="bg-white/95 backdrop-blur-sm text-neutral-800 text-[10px] uppercase tracking-[0.18em] font-sans font-medium px-2.5 py-1 border border-neutral-200 shadow-sm">
                  100% Certified BIS 916
                </span>
              </div>

              {/* Click to Zoom Pill */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-black hover:text-white text-neutral-700 text-xs px-3 py-1.5 flex items-center space-x-1.5 rounded-full shadow-md transition-all duration-300 opacity-80 group-hover:opacity-100"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span className="text-[11px] uppercase tracking-[0.15em] font-sans">Inspect View</span>
              </button>
            </div>

          </div>

          {/* RIGHT: Bespoke Atelier Buying Box (5 cols) */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col">
            <div>
              {/* Category & Hallmark Badge */}
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] font-sans font-medium">
                  Artisanal Collection
                </span>
                <span className="text-neutral-300">•</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-sans">
                  SKU: {product.id.slice(0, 14).toUpperCase()}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-light text-neutral-900 tracking-tight leading-tight mb-3">
                {product.name}
              </h1>

              {/* Pricing in Rupees */}
              <div className="flex items-baseline space-x-3 mb-4">
                <span className="font-serif text-3xl sm:text-4xl font-normal text-neutral-900">
                  {product.currency} {product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-neutral-500 font-sans">
                  (MRP inclusive of all taxes & insurance)
                </span>
              </div>

              {/* Short Editorial Blurb */}
              <p className="text-sm font-sans text-neutral-600 font-light leading-relaxed mb-6 pb-6 border-b border-neutral-100">
                {product.description}
              </p>

              {/* Material / Metal Karat Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs uppercase tracking-[0.18em] font-sans font-medium text-neutral-900">
                    Noble Metal / Karat:
                  </span>
                  <span className="text-xs font-sans text-neutral-600 font-medium">
                    {selectedMaterial}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.materials.map((mat) => (
                    <button
                      key={mat}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`px-3.5 py-2 text-xs uppercase tracking-[0.15em] font-sans transition-all ${
                        selectedMaterial === mat
                          ? 'bg-neutral-900 text-white font-medium border border-neutral-900'
                          : 'bg-white text-neutral-700 border border-neutral-200 hover:border-black'
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector with Size Guide (if applicable) */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs uppercase tracking-[0.18em] font-sans font-medium text-neutral-900">
                      Select Size:
                    </span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-xs text-neutral-600 hover:text-black underline underline-offset-4 flex items-center space-x-1"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-sans transition-all ${
                          selectedSize === sz
                            ? 'bg-neutral-900 text-white font-medium border border-neutral-900'
                            : 'bg-white text-neutral-700 border border-neutral-200 hover:border-black'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & CTA Actions */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-4">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-neutral-300 h-12 px-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-neutral-500 hover:text-black px-2 py-1 text-sm font-sans"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-sans font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-neutral-500 hover:text-black px-2 py-1 text-sm font-sans"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary Add to Bag Button */}
                  <button
                    onClick={handleAdd}
                    className={`flex-1 h-12 uppercase tracking-[0.2em] text-xs font-sans font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                      addedToast
                        ? 'bg-emerald-700 text-white'
                        : 'bg-neutral-900 hover:bg-black text-white shadow-md'
                    }`}
                  >
                    {addedToast ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <span>Add to Bag</span>
                    )}
                  </button>
                </div>

                {/* Instant Luxury Buy Now */}
                <button
                  onClick={handleBuyNow}
                  className="w-full h-12 border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white uppercase tracking-[0.2em] text-xs font-sans font-medium transition-colors"
                >
                  Buy Now with Express Insured Dispatch
                </button>
              </div>

              {/* Pincode Delivery Availability Checker */}
              <div className="p-4 bg-[#FAF9F6] border border-neutral-200 mb-8">
                <span className="block text-xs uppercase tracking-[0.18em] font-sans font-medium text-neutral-800 mb-2">
                  Delivery Availability & Dispatch Estimate
                </span>
                <form onSubmit={handleCheckPincode} className="flex space-x-2">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit Pincode (e.g. 560001)"
                    maxLength={6}
                    className="flex-1 bg-white border border-neutral-300 px-3 py-2 text-xs font-sans focus:outline-none focus:border-black"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neutral-900 text-white text-xs uppercase tracking-[0.15em] font-sans hover:bg-black transition-colors"
                  >
                    Check
                  </button>
                </form>
                {pincodeStatus && (
                  <p className="mt-2 text-xs font-sans text-neutral-700 font-medium">
                    {pincodeStatus}
                  </p>
                )}
              </div>

              {/* Trust Provenance 4-Icon Matrix */}
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-neutral-100 text-neutral-700 text-xs">
                <div className="flex items-center space-x-2.5">
                  <Award className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                  <span>100% Certified BIS Hallmark</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Truck className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                  <span>Free 100% Insured Transit</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <RefreshCw className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                  <span>Lifetime Exchange Guarantee</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                  <span>15-Day Authenticity Return</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 3. Detailed Specifications & Atelier Provenance Tabs */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16 pt-10 border-t border-neutral-200">
        
        {/* Tab Headers */}
        <div className="flex space-x-8 border-b border-neutral-200 text-xs uppercase tracking-[0.2em] font-sans font-medium mb-8">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-4 transition-colors ${
              activeTab === 'details'
                ? 'text-black border-b-2 border-black font-semibold'
                : 'text-neutral-400 hover:text-black'
            }`}
          >
            Design & Details
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-4 transition-colors ${
              activeTab === 'specs'
                ? 'text-black border-b-2 border-black font-semibold'
                : 'text-neutral-400 hover:text-black'
            }`}
          >
            Product Specifications
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-4 transition-colors ${
              activeTab === 'shipping'
                ? 'text-black border-b-2 border-black font-semibold'
                : 'text-neutral-400 hover:text-black'
            }`}
          >
            Insured Shipping & Warranty
          </button>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl font-sans">
          {activeTab === 'details' && (
            <div className="space-y-6 text-sm text-neutral-600 font-light leading-relaxed">
              <p>{product.description}</p>
              <div className="bg-[#FAF9F6] p-6 border border-neutral-100">
                <h4 className="font-serif text-lg font-normal text-neutral-900 mb-3">
                  Highlights of this Masterpiece
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-700">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-[#C5A880] mt-0.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="border border-neutral-200 overflow-hidden">
              <table className="w-full text-xs text-left font-sans">
                <tbody className="divide-y divide-neutral-100">
                  <tr className="bg-neutral-50/50">
                    <td className="py-3 px-4 font-medium text-neutral-900 w-1/3">Product Category</td>
                    <td className="py-3 px-4 text-neutral-700 capitalize">{product.category}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-neutral-900">Hallmark Standard</td>
                    <td className="py-3 px-4 text-neutral-700">BIS Hallmarked with Laser HUID</td>
                  </tr>
                  {product.details.map((d, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-neutral-50/50' : ''}>
                      <td className="py-3 px-4 font-medium text-neutral-900">Specification {i + 1}</td>
                      <td className="py-3 px-4 text-neutral-700">{d}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-3 px-4 font-medium text-neutral-900">Available Metals</td>
                    <td className="py-3 px-4 text-neutral-700">{product.materials.join(', ')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 text-xs text-neutral-600 font-light leading-relaxed">
              <p>
                <strong>100% Insured Delivery:</strong> Every Panchaloha creation is transported via specialized armored courier services (Sequel Logistics & Blue Dart Apex) in tamper-evident steel-sealed security packaging. Your order is fully insured from the moment it leaves our atelier until it is delivered into your hands.
              </p>
              <p>
                <strong>Lifetime Exchange & Buyback:</strong> We stand behind the perpetual intrinsic value of noble gold and natural diamonds. Enjoy transparent lifetime exchange and buyback at prevailing market bullion rates across India.
              </p>
              <p>
                <strong>15-Day Return Privileges:</strong> In the rare event your piece does not exceed expectations, return it in original condition within 15 days of receipt for a 100% full refund.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* 4. "You May Also Admire" (Curated Matching Ensemble) */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-20 pt-12 border-t border-neutral-200">
          <div className="flex items-end justify-between mb-10 pb-4 border-b border-neutral-100">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-sans block mb-1">
                Harmonious Pairings
              </span>
              <h2 className="font-serif text-3xl font-light text-neutral-900 tracking-tight">
                You May Also Admire
              </h2>
            </div>
            <button
              onClick={onBack}
              className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-neutral-800 hover:text-black transition-colors"
            >
              View Full Collection →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((relProd) => (
              <ProductCard
                key={relProd.id}
                product={relProd}
                onSelect={(p) => {
                  onSelectProduct(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onQuickAdd={(p) => onAddToCart(p, 1)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 5. Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-white pb-4 border-b border-white/10">
            <span className="font-serif text-lg text-neutral-300">
              {product.name} — High Resolution Inspection
            </span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-4">
            <img
              src={activeImage}
              alt={product.name}
              className="max-h-[75vh] max-w-[85vw] object-contain shadow-2xl"
            />
          </div>

          <div className="flex justify-center space-x-3 overflow-x-auto py-3">
            {uniqueImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-16 h-16 border-2 overflow-hidden flex-shrink-0 transition-all ${
                  activeImage === img ? 'border-white' : 'border-neutral-700 opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 6. Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-100">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-6">
              <h3 className="font-serif text-2xl font-light text-neutral-900">
                Atelier Sizing Guide
              </h3>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1 text-neutral-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-neutral-600 font-sans space-y-4 leading-relaxed mb-6">
              <p>
                <strong>Indian Standard Sizing:</strong> All our rings and bangles adhere strictly to Bureau of Indian Standards (BIS) jewelers gauge measurements.
              </p>
              <table className="w-full border border-neutral-200 divide-y divide-neutral-200">
                <thead className="bg-neutral-50 text-[11px] uppercase tracking-[0.1em] text-neutral-700">
                  <tr>
                    <th className="py-2 px-3 text-left">Indian Size</th>
                    <th className="py-2 px-3 text-left">Diameter (mm)</th>
                    <th className="py-2 px-3 text-left">Circumference (mm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <tr><td className="py-2 px-3 font-medium">Size 10</td><td className="py-2 px-3">15.9 mm</td><td className="py-2 px-3">50.0 mm</td></tr>
                  <tr><td className="py-2 px-3 font-medium">Size 12</td><td className="py-2 px-3">16.5 mm</td><td className="py-2 px-3">51.8 mm</td></tr>
                  <tr><td className="py-2 px-3 font-medium">Size 14</td><td className="py-2 px-3">17.2 mm</td><td className="py-2 px-3">54.0 mm</td></tr>
                  <tr><td className="py-2 px-3 font-medium">Size 16</td><td className="py-2 px-3">17.8 mm</td><td className="py-2 px-3">56.0 mm</td></tr>
                  <tr><td className="py-2 px-3 font-medium">Size 18</td><td className="py-2 px-3">18.5 mm</td><td className="py-2 px-3">58.1 mm</td></tr>
                </tbody>
              </table>
              <p className="text-[11px] text-neutral-400">
                Need bespoke custom sizing? Our concierge will assist you upon order confirmation.
              </p>
            </div>

            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-[0.2em] font-sans hover:bg-black transition-colors"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* 7. Mobile Sticky Bottom Buy Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div className="flex items-center space-x-3 overflow-hidden">
          <img
            src={product.primaryImage}
            alt={product.name}
            className="w-11 h-11 object-cover border border-neutral-200 flex-shrink-0"
          />
          <div className="overflow-hidden">
            <h4 className="font-serif text-sm text-neutral-900 truncate">
              {product.name}
            </h4>
            <span className="font-sans text-xs font-semibold text-neutral-900">
              {product.currency} {product.price.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="ml-3 px-5 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs uppercase tracking-[0.18em] font-sans font-medium flex-shrink-0"
        >
          {addedToast ? 'Added' : 'Add to Bag'}
        </button>
      </div>

    </div>
  );
};
