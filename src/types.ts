export interface Product {
  id: string;
  name: string;
  category: 'necklaces' | 'rings' | 'earrings' | 'bracelets';
  price: number;
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
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedMaterial?: string;
}

export type ViewState = 'home' | 'shop' | 'about' | 'pdp';

export interface FilterState {
  category: 'all' | 'new-arrivals' | 'necklaces' | 'rings' | 'earrings' | 'bracelets';
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'newest';
}
