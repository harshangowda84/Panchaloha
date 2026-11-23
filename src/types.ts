export interface Product {
  id: string;
  name: string;
  category: 'necklaces' | 'rings' | 'earrings' | 'bracelets';
  price: number; // Final price (inclusive of GST)
  currency: string;
  primaryImage: string;
  secondaryImage: string;
  galleryImages: string[];
  description: string;
  details: string[];
  materials: string[];
  sizes?: string[];
  isNewArrival?: boolean;
  isPopular?: boolean;
  isSpotlight?: boolean;
  gstRate?: number; // GST percentage, e.g., 3 for 3% standard gold/jewellery
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedMaterial?: string;
}

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  date: string;
  deliveryDate: string;
  trackingNumber: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  gstAmount: number;
  gstRate: number;
  discountAmount: number;
  total: number;
  paymentMethod: string;
}

export type ViewState = 'home' | 'shop' | 'about' | 'pdp' | 'cart' | 'checkout' | 'order-confirmation' | 'admin';

export interface FilterState {
  category: 'all' | 'new-arrivals' | 'necklaces' | 'rings' | 'earrings' | 'bracelets';
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'newest';
}
