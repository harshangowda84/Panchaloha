import { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, ViewState, Order } from './types';
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
import { CartPage } from './pages/CartPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  const [currentView, setCurrentView] = useState<ViewState>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#admin') return 'admin';
      if (hash === '#cart') return 'cart';
      if (hash === '#order-confirmation') return 'order-confirmation';
      if (hash.startsWith('#product-')) return 'pdp';
      if (hash.startsWith('#shop')) return 'shop';
      if (hash === '#about') return 'about';
    }
    return 'home';
  });
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [activeSearchQuery, setActiveSearchQuery] = useState<string>('');
  
  // Dynamic Products State (persisted with fallback to scraped PRODUCTS)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('panchaloha_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

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

  // Last Confirmed Order State (Persisted)
  const [currentOrder, setCurrentOrder] = useState<Order | null>(() => {
    try {
      const saved = localStorage.getItem('panchaloha_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
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
      if (hash === '#admin') {
        setCurrentView('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (hash === '#cart') {
        setCurrentView('cart');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (hash === '#order-confirmation') {
        setCurrentView('order-confirmation');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (hash.startsWith('#product-')) {
        const prodId = hash.replace('#product-', '');
        const found = products.find(p => p.id === prodId) || PRODUCTS.find(p => p.id === prodId);
        if (found) {
          setSelectedProduct(found);
          setCurrentCategory(found.category);
          setCurrentView('pdp');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
      if (hash.startsWith('#shop')) {
        const cat = hash.replace('#shop-', '').replace('#shop', '');
        setCurrentCategory(cat || 'all');
        setCurrentView('shop');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (hash === '#about') {
        setCurrentView('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (!hash || hash === '#' || hash === '#home') {
        setCurrentView('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [products]);

  // Navigate helper
  const handleNavigate = (view: ViewState, category: string = 'all') => {
    setActiveSearchQuery('');
    setCurrentView(view);
    if (category) {
      setCurrentCategory(category);
    }
    
    try {
      if (view === 'shop') {
        window.history.pushState(null, '', category !== 'all' ? `#shop-${category}` : '#shop');
      } else if (view === 'home') {
        window.history.pushState(null, '', ' ');
      } else if (view === 'about') {
        window.history.pushState(null, '', '#about');
      } else if (view === 'cart') {
        window.history.pushState(null, '', '#cart');
      } else if (view === 'admin') {
        window.history.pushState(null, '', '#admin');
      } else if (view === 'order-confirmation') {
        window.history.pushState(null, '', '#order-confirmation');
      }
    } catch {
      // ignore
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit search and display matching results exclusively in catalogue
  const handleSearchSubmit = (query: string) => {
    setActiveSearchQuery(query);
    setCurrentCategory('all');
    setCurrentView('shop');
    try {
      window.history.pushState(null, '', '#shop');
    } catch {
      // ignore
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

  // Checkout Execution -> Generates Order and navigates to Order Confirmation Page
  const handleProceedToCheckout = (discountAmount: number = 0, promoCode: string = '') => {
    const activeItems = cartItems.length > 0 ? cartItems : [
      { product: products[0], quantity: 1, selectedMaterial: products[0].materials[0] }
    ];

    const subtotalWithGst = activeItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const gstRate = 3;
    const baseSubtotal = Math.round(subtotalWithGst / (1 + gstRate / 100));
    const gstAmount = subtotalWithGst - baseSubtotal;
    const total = Math.max(0, subtotalWithGst - discountAmount);

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const deliveryDateObj = new Date(today);
    deliveryDateObj.setDate(today.getDate() + 3);
    const formattedDelivery = deliveryDateObj.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const newOrder: Order = {
      id: `PCL-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      date: formattedDate,
      deliveryDate: formattedDelivery,
      trackingNumber: `SEQUEL-IND-${Math.floor(100000 + Math.random() * 900000)}`,
      customer: {
        name: user ? user.name : 'Sophia Laurent',
        email: user ? user.email : 'sophia.laurent@private-client.com',
        phone: '98801 24789',
        address: 'Villa 14, Lavelle Road Crescent, Shantala Nagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560001'
      },
      items: activeItems,
      subtotal: baseSubtotal,
      gstAmount: gstAmount,
      gstRate: gstRate,
      discountAmount: discountAmount,
      total: total,
      paymentMethod: promoCode ? `100% Insured Escrow (Voucher ${promoCode} Applied)` : '100% Insured Escrow NetBanking'
    };

    setCurrentOrder(newOrder);
    try {
      localStorage.setItem('panchaloha_last_order', JSON.stringify(newOrder));
    } catch {
      // ignore
    }

    setCartItems([]);
    setIsCartOpen(false);
    handleNavigate('order-confirmation');
  };

  // Admin Product Updates
  const handleUpdateProduct = (updated: Product) => {
    setProducts(prev => {
      const next = prev.map(p => p.id === updated.id ? updated : p);
      try {
        localStorage.setItem('panchaloha_products', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });

    if (selectedProduct && selectedProduct.id === updated.id) {
      setSelectedProduct(updated);
    }

    setCartItems(prev =>
      prev.map(item =>
        item.product.id === updated.id ? { ...item, product: updated } : item
      )
    );
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset all product titles, descriptions, and prices to initial catalogue?')) {
      setProducts(PRODUCTS);
      try {
        localStorage.removeItem('panchaloha_products');
      } catch {
        // ignore
      }
      alert('Catalogue restored to initial authentic values!');
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Find spotlight masterpiece product
  const spotlightProduct = products.find(p => p.isSpotlight) || products[0];

  // Dedicated Isolated Admin Panel (#admin) - completely isolated from storefront chrome
  if (currentView === 'admin') {
    return (
      <AdminPage
        products={products}
        onUpdateProduct={handleUpdateProduct}
        onResetToDefaults={handleResetToDefaults}
        onBackToStore={() => handleNavigate('home')}
        onViewProductPdp={(p) => {
          handleSelectProduct(p);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-[#C5A880]/20 selection:text-neutral-900 w-full overflow-x-hidden">
      
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
        products={products}
        onSelectProduct={handleSelectProduct}
        onSearchSubmit={handleSearchSubmit}
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
              products={products}
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
              products={products}
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
            products={products}
            initialCategory={currentCategory}
            searchQuery={activeSearchQuery}
            onClearSearch={() => setActiveSearchQuery('')}
            onSelectProduct={handleSelectProduct}
            onQuickAdd={(p) => handleAddToCart(p, 1)}
          />
        )}

        {currentView === 'pdp' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={products}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onBack={() => handleNavigate('shop', selectedProduct.category)}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {currentView === 'cart' && (
          <CartPage
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onSelectProduct={handleSelectProduct}
            onContinueShopping={() => handleNavigate('shop', 'all')}
            onProceedToCheckout={handleProceedToCheckout}
          />
        )}

        {currentView === 'order-confirmation' && (
          <OrderConfirmationPage
            order={
              currentOrder || {
                id: 'PCL-2026-78421',
                date: '23 Nov 2026',
                deliveryDate: '26 Nov 2026',
                trackingNumber: 'SEQUEL-IND-778219',
                customer: {
                  name: user ? user.name : 'Sophia Laurent',
                  email: user ? user.email : 'sophia.laurent@private-client.com',
                  phone: '98801 24789',
                  address: 'Villa 14, Lavelle Road Crescent, Shantala Nagar',
                  city: 'Bengaluru',
                  state: 'Karnataka',
                  pincode: '560001'
                },
                items: [
                  {
                    product: products[0],
                    quantity: 1,
                    selectedMaterial: '22KT Pure Yellow Gold',
                    selectedSize: '18 Inches'
                  }
                ],
                subtotal: Math.round(products[0].price / 1.03),
                gstAmount: products[0].price - Math.round(products[0].price / 1.03),
                gstRate: 3,
                discountAmount: 0,
                total: products[0].price,
                paymentMethod: '100% Insured Escrow NetBanking'
              }
            }
            onContinueShopping={() => handleNavigate('shop', 'all')}
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
        onViewCartPage={() => handleNavigate('cart')}
        onProceedToCheckout={handleProceedToCheckout}
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
