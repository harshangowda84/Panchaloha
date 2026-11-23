import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import {
  Search,
  Edit3,
  Check,
  RotateCcw,
  ArrowLeft,
  FileText,
  Tag,
  Percent,
  Save,
  X,
  ExternalLink
} from 'lucide-react';

interface AdminPageProps {
  products: Product[];
  onUpdateProduct: (updatedProduct: Product) => void;
  onResetToDefaults: () => void;
  onBackToStore: () => void;
  onViewProductPdp: (product: Product) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  products,
  onUpdateProduct,
  onResetToDefaults,
  onBackToStore,
  onViewProductPdp
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Editor Form Fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0); // Final Price with GST
  const [gstRate, setGstRate] = useState<number>(3); // Standard 3% for fine jewellery
  const [priceInputMode, setPriceInputMode] = useState<'with-gst' | 'base'>('with-gst');
  const [basePriceInput, setBasePriceInput] = useState<number>(0);
  const [saveToast, setSaveToast] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [products, searchQuery, selectedCategory]);

  // Open editor for a product
  const handleStartEdit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
    const currentPrice = product.price;
    const currentGst = product.gstRate || 3;
    setPrice(currentPrice);
    setGstRate(currentGst);
    const computedBase = Math.round(currentPrice / (1 + currentGst / 100));
    setBasePriceInput(computedBase);
    setSaveToast(false);
  };

  // When Final Price (with GST) is typed
  const handleFinalPriceChange = (val: number) => {
    setPrice(val);
    const computedBase = Math.round(val / (1 + gstRate / 100));
    setBasePriceInput(computedBase);
  };

  // When Base Price (without GST) is typed
  const handleBasePriceChange = (val: number) => {
    setBasePriceInput(val);
    const computedFinal = Math.round(val * (1 + gstRate / 100));
    setPrice(computedFinal);
  };

  // When GST Rate changes
  const handleGstRateChange = (newRate: number) => {
    setGstRate(newRate);
    if (priceInputMode === 'base') {
      const computedFinal = Math.round(basePriceInput * (1 + newRate / 100));
      setPrice(computedFinal);
    } else {
      const computedBase = Math.round(price / (1 + newRate / 100));
      setBasePriceInput(computedBase);
    }
  };

  // Computed GST Breakdown for the editor
  const calculatedBasePrice = Math.round(price / (1 + gstRate / 100));
  const calculatedGstAmount = price - calculatedBasePrice;
  const calculatedCgst = Math.round(calculatedGstAmount / 2);
  const calculatedSgst = calculatedGstAmount - calculatedCgst;

  // Save changes
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const updated: Product = {
      ...editingProduct,
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      gstRate: Number(gstRate)
    };

    onUpdateProduct(updated);
    setEditingProduct(updated);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F6] font-sans text-neutral-900 pb-20">
      
      {/* Top Administration Bar */}
      <header className="bg-[#1A1A1A] text-white py-6 border-b border-neutral-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#E0C79B] animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#E0C79B] font-medium">
                Panchaloha Atelier Portal
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-light tracking-tight text-white">
              Catalogue & GST Pricing Administration
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onResetToDefaults}
              className="px-4 py-2 border border-neutral-700 hover:border-red-400 hover:text-red-400 text-neutral-300 text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center space-x-1.5"
              title="Reset all products to original initial catalog"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Catalog</span>
            </button>
            <button
              onClick={onBackToStore}
              className="px-5 py-2 bg-[#E0C79B] text-black hover:bg-white text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body Container */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-8">
        
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-neutral-200/80 shadow-sm">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">Masterpieces</span>
            <span className="font-serif text-3xl font-light text-neutral-900">{products.length}</span>
            <span className="text-xs text-neutral-500 block mt-1">In Live Catalogue</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-neutral-200/80 shadow-sm">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">Jewellery GST Standard</span>
            <span className="font-serif text-3xl font-light text-neutral-900">3%</span>
            <span className="text-xs text-neutral-500 block mt-1">1.5% CGST + 1.5% SGST</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-neutral-200/80 shadow-sm">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">Active Categories</span>
            <span className="font-serif text-3xl font-light text-neutral-900">4</span>
            <span className="text-xs text-neutral-500 block mt-1">Chains, Rings, Jhumkas, Bangles</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-neutral-200/80 shadow-sm">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">Persistence</span>
            <span className="font-serif text-3xl font-light text-emerald-700">Active</span>
            <span className="text-xs text-neutral-500 block mt-1">Syncs with Browser Storage</span>
          </div>
        </div>

        {/* Toolbar: Search & Filter */}
        <div className="bg-white p-4 rounded-xl border border-neutral-200/80 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, description or SKU..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:border-black"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <span className="text-xs uppercase tracking-wider text-neutral-400">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:border-black uppercase tracking-wider bg-white"
            >
              <option value="all">All Categories ({products.length})</option>
              <option value="necklaces">Necklaces</option>
              <option value="rings">Rings</option>
              <option value="earrings">Earrings</option>
              <option value="bracelets">Bangles & Bracelets</option>
            </select>
          </div>
        </div>

        {/* Products Table & Quick Action Grid */}
        <div className="bg-white rounded-xl border border-neutral-200/80 shadow-sm overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F6] border-b border-neutral-200 uppercase tracking-wider text-neutral-500 font-medium text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Masterpiece</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4 text-right">Base Price</th>
                  <th className="py-3.5 px-4 text-center">GST %</th>
                  <th className="py-3.5 px-4 text-right">Price with GST</th>
                  <th className="py-3.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredProducts.map((p) => {
                  const pGst = p.gstRate || 3;
                  const pBase = Math.round(p.price / (1 + pGst / 100));

                  return (
                    <tr key={p.id} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={p.primaryImage}
                            alt={p.name}
                            className="w-12 h-12 rounded-lg object-cover border border-neutral-200 bg-[#FAF9F5] flex-shrink-0"
                          />
                          <div className="min-w-0 max-w-xs sm:max-w-md">
                            <h4 className="font-serif text-sm font-normal text-neutral-900 truncate">
                              {p.name}
                            </h4>
                            <p className="text-[11px] text-neutral-400 truncate font-light">
                              {p.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-neutral-600 capitalize">
                        {p.category}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono text-neutral-600">
                        ₹{pBase.toLocaleString('en-IN')}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded-full font-mono text-[10px]">
                          {pGst}%
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono font-medium text-neutral-900">
                        ₹{p.price.toLocaleString('en-IN')}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleStartEdit(p)}
                            className="px-3 py-1.5 bg-neutral-900 hover:bg-black text-white text-[11px] uppercase tracking-wider rounded font-medium transition-colors flex items-center space-x-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => onViewProductPdp(p)}
                            className="p-1.5 text-neutral-400 hover:text-black transition-colors"
                            title="View on Storefront PDP"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Slide-in Editor Drawer / Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white min-h-screen shadow-2xl flex flex-col justify-between p-6 sm:p-8 overflow-y-auto animate-in slide-in-from-right duration-300">
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] block font-medium">
                    Masterpiece Editor
                  </span>
                  <h3 className="font-serif text-2xl font-light text-neutral-900">
                    Edit Product Title, Description & GST Price
                  </h3>
                </div>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="p-2 text-neutral-400 hover:text-black transition-colors rounded-full"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {saveToast && (
                <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center space-x-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Changes saved successfully! Live catalogue updated.</span>
                </div>
              )}

              {/* Edit Form */}
              <form onSubmit={handleSave} className="space-y-6">
                
                {/* Product Thumbnail & Category display */}
                <div className="flex items-center space-x-4 p-3 bg-[#FAF9F5] rounded-xl border border-neutral-200">
                  <img
                    src={editingProduct.primaryImage}
                    alt={editingProduct.name}
                    className="w-16 h-16 rounded-lg object-cover border border-neutral-200 bg-white"
                  />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400">SKU / ID</span>
                    <span className="text-xs font-mono font-medium block text-neutral-800">{editingProduct.id}</span>
                    <span className="text-[11px] uppercase tracking-wider text-[#C5A880] font-medium">{editingProduct.category}</span>
                  </div>
                </div>

                {/* 1. Title / Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-700 font-medium mb-1.5 flex items-center space-x-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Product Title (Name)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-lg text-sm font-serif focus:outline-none focus:border-black"
                    placeholder="Enter product title..."
                  />
                </div>

                {/* 2. Description */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-700 font-medium mb-1.5 flex items-center space-x-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Editorial Description</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-lg text-xs leading-relaxed focus:outline-none focus:border-black"
                    placeholder="Enter detailed description..."
                  />
                </div>

                {/* 3. Pricing with GST Section */}
                <div className="p-5 bg-[#FAF9F5] border border-neutral-200 rounded-xl space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                    <div className="flex items-center space-x-1.5">
                      <Percent className="w-4 h-4 text-[#C5A880]" />
                      <span className="text-xs uppercase tracking-wider font-semibold text-neutral-900">
                        Price & GST Calculator
                      </span>
                    </div>

                    {/* Mode Toggle */}
                    <div className="flex items-center space-x-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setPriceInputMode('with-gst')}
                        className={`px-2.5 py-1 rounded text-[11px] uppercase tracking-wider ${
                          priceInputMode === 'with-gst'
                            ? 'bg-neutral-900 text-white font-medium'
                            : 'bg-white text-neutral-600 border border-neutral-200'
                        }`}
                      >
                        Final Price (MRP)
                      </button>
                      <button
                        type="button"
                        onClick={() => setPriceInputMode('base')}
                        className={`px-2.5 py-1 rounded text-[11px] uppercase tracking-wider ${
                          priceInputMode === 'base'
                            ? 'bg-neutral-900 text-white font-medium'
                            : 'bg-white text-neutral-600 border border-neutral-200'
                        }`}
                      >
                        Base Price
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Input Field 1: Final Price with GST */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-medium">
                        Final Price with GST (₹) {priceInputMode === 'with-gst' && '(Active Input)'}
                      </label>
                      <input
                        type="number"
                        min="100"
                        required
                        value={price || ''}
                        onChange={(e) => handleFinalPriceChange(Number(e.target.value))}
                        disabled={priceInputMode === 'base'}
                        className={`w-full px-3.5 py-2.5 border rounded-lg text-sm font-mono ${
                          priceInputMode === 'with-gst'
                            ? 'border-neutral-900 bg-white font-bold'
                            : 'border-neutral-200 bg-neutral-100 text-neutral-700'
                        }`}
                      />
                    </div>

                    {/* Input Field 2: Base Price without GST */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-medium">
                        Base Price without GST (₹) {priceInputMode === 'base' && '(Active Input)'}
                      </label>
                      <input
                        type="number"
                        min="100"
                        required
                        value={basePriceInput || ''}
                        onChange={(e) => handleBasePriceChange(Number(e.target.value))}
                        disabled={priceInputMode === 'with-gst'}
                        className={`w-full px-3.5 py-2.5 border rounded-lg text-sm font-mono ${
                          priceInputMode === 'base'
                            ? 'border-neutral-900 bg-white font-bold'
                            : 'border-neutral-200 bg-neutral-100 text-neutral-700'
                        }`}
                      />
                    </div>
                  </div>

                  {/* GST Rate Selector */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-medium">
                      Applicable GST Rate (%)
                    </label>
                    <select
                      value={gstRate}
                      onChange={(e) => handleGstRateChange(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs font-mono bg-white focus:outline-none focus:border-black"
                    >
                      <option value={3}>3% (Standard Fine Gold & Gemstone Jewellery)</option>
                      <option value={5}>5% (Semi-precious / Custom Fabrication)</option>
                      <option value={12}>12% (Precious Metal Accessories)</option>
                      <option value={18}>18% (Luxury Horology / Services)</option>
                    </select>
                  </div>

                  {/* Computed GST Tax Slip */}
                  <div className="p-3 bg-white border border-neutral-200 rounded-lg text-xs space-y-1.5 font-mono text-neutral-700">
                    <div className="flex justify-between">
                      <span className="font-sans text-neutral-500">Base Value:</span>
                      <span>₹{calculatedBasePrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span className="font-sans">CGST ({gstRate / 2}%):</span>
                      <span>₹{calculatedCgst.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span className="font-sans">SGST ({gstRate / 2}%):</span>
                      <span>₹{calculatedSgst.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-neutral-200 font-semibold text-neutral-900">
                      <span className="font-sans">Customer MRP (Base + GST):</span>
                      <span className="text-sm">₹{price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                </div>

                {/* Save CTA */}
                <div className="flex items-center space-x-3 pt-4 border-t border-neutral-200">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-neutral-900 hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-medium rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save & Update Masterpiece</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-5 py-3 border border-neutral-300 text-neutral-700 hover:text-black rounded-lg text-xs uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
