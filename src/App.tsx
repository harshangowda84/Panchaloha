import { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, ViewState } from './types';
import { Header } from './components/Header';
import { NavigationDrawer } from './components/NavigationDrawer';
import { HeroCarousel } from './components/HeroCarousel';
import { TrustProvenanceBar } from './components/TrustProvenanceBar';
import { ChainsCarousel } from './components/ChainsCarousel';
import { AsymmetricPromoSplit } from './components/AsymmetricPromoSplit';
import { SpotlightFeature } from './components/SpotlightFeature';
import { BridalHeritageCuration } from './components/BridalHeritageCuration';
import { EarringsGrid } from './components/EarringsGrid';
import { GiftingBentoMatrix } from './components/GiftingBentoMatrix';
import { AtelierConciergeBanner } from './components/AtelierConciergeBanner';
import { WelcomePrivilege } from './components/WelcomePrivilege';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { BackToTopFloating } from './components/BackToTopFloating';
import { ShopPage } from './pages/ShopPage';
import { AboutPage } from './pages/AboutPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

export function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  
  // Modals & Drawers
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // User State
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Cart State (Persisted)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('panchaloha_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('panchaloha_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Handle URL hash routing on mount & hash change
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product-')) {
        const prodId = hash.replace('#product-', '');
        const found = PRODUCTS.find(p => p.id === prodId);
        if (found) {
          setSelectedProduct(found);
          setCurrentCategory(found.category);
          setCurrentView('pdp');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      } else if (hash.startsWith('#shop')) {
        const cat = hash.replace('#shop-', '').replace('#shop', '');
        setCurrentCategory(cat || 'all');
        setCurrentView('shop');
      } else if (hash === '#about') {
        setCurrentView('about');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Navigate helper
  const handleNavigate = (view: ViewState, category: string = 'all') => {
    setCurrentView(view);
    if (category) {
      setCurrentCategory(category);
    }
    if (view === 'shop') {
      try {
        window.history.pushState(null, '', category !== 'all' ? `#shop-${category}` : '#shop');
      } catch {
        // ignore
      }
    } else if (view === 'home') {
      try {
        window.history.pushState(null, '', ' ');
      } catch {
        // ignore
      }
    } else if (view === 'about') {
      try {
        window.history.pushState(null, '', '#about');
      } catch {
        // ignore
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Full PDP Page
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentCategory(product.category);
    setCurrentView('pdp');
    try {
      window.history.pushState(null, '', `#product-${product.id}`);
    } catch {
      window.location.hash = `product-${product.id}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number = 1, selectedSize?: string, selectedMaterial?: string) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        i => i.product.id === product.id && i.selectedSize === selectedSize && i.selectedMaterial === selectedMaterial
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prev, {
          product,
          quantity,
          selectedSize: selectedSize || (product.sizes ? product.sizes[0] : undefined),
          selectedMaterial: selectedMaterial || product.materials[0]
        }];
      }
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.product.id === productId ? { ...item, quantity } : item)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Find spotlight masterpiece product
  const spotlightProduct = PRODUCTS.find(p => p.isSpotlight) || PRODUCTS[0];

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-[#C5A880]/20 selection:text-neutral-900">
      
      {/* Navigation Header */}
      <Header
        currentView={currentView}
        currentCategory={currentCategory}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenNavDrawer={() => setIsNavDrawerOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* 1. Multi-Slide Hero Carousel with Hover Zoom & Indicators */}
            <HeroCarousel onExplore={(cat) => handleNavigate('shop', cat || 'new-arrivals')} />

            {/* 2. Trust & Provenance Bar (BIS Hallmark, IGI Diamonds, Insured Delivery) */}
            <TrustProvenanceBar />

            {/* 3. Chains & Pendants Carousel */}
            <ChainsCarousel
              products={PRODUCTS}
              onSelectProduct={handleSelectProduct}
              onQuickAdd={(p) => handleAddToCart(p, 1)}
              onViewAll={() => handleNavigate('shop', 'necklaces')}
            />

            {/* 4. Joyalukkas Style Asymmetric Promo Split with Hover Zoom */}
            <AsymmetricPromoSplit onNavigate={handleNavigate} />

            {/* 5. Spotlight Masterpiece Feature */}
            <SpotlightFeature
              product={spotlightProduct}
              onSelect={handleSelectProduct}
            />

            {/* 6. Curated Regional Bridal & Occasion Collection Grid */}
            <BridalHeritageCuration onNavigate={handleNavigate} />

            {/* 7. Popular Earrings Showcase */}
            <EarringsGrid
              products={PRODUCTS}
              onSelectProduct={handleSelectProduct}
              onQuickAdd={(p) => handleAddToCart(p, 1)}
              onViewAll={() => handleNavigate('shop', 'earrings')}
            />

            {/* 8. 4-Zone Gifting & Milestones Bento Matrix with Hover Scale */}
            <GiftingBentoMatrix onNavigate={handleNavigate} />

            {/* 9. Atelier Consultation & Bespoke Concierge Banner */}
            <AtelierConciergeBanner />

            {/* 10. The Welcome Privilege (15% VIP Voucher Unlock) */}
            <WelcomePrivilege />
          </>
        )}

        {currentView === 'shop' && (
          <ShopPage
            products={PRODUCTS}
            initialCategory={currentCategory}
            onSelectProduct={handleSelectProduct}
            onQuickAdd={(p) => handleAddToCart(p, 1)}
          />
        )}

        {currentView === 'pdp' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onBack={() => handleNavigate('shop', selectedProduct.category)}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {currentView === 'about' && (
          <AboutPage onExplore={() => handleNavigate('shop', 'all')} />
        )}
      </main>

      {/* Section 7: Footer (The Inner Circle) */}
      <Footer onNavigate={handleNavigate} />

      {/* Drawers & Modals */}
      <NavigationDrawer
        isOpen={isNavDrawerOpen}
        onClose={() => setIsNavDrawerOpen(false)}
        onNavigate={handleNavigate}
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(u) => setUser(u)}
      />

      {/* Persistent Floating Back-to-Top Button */}
      <BackToTopFloating />

    </div>
  );
}

export default App;
