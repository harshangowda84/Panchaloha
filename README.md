# Panchaloha — Fine Jewellery Storefront

A modern, high-fashion **Quiet Luxury** e-commerce storefront for fine jewellery. Handcrafted in 22KT & 18KT gold, natural certified diamonds, and precious gemstones, embodying timeless craftsmanship and contemporary elegance.

---

## 🌟 Key Highlights & Features

- **56+ Authentic Masterpieces**: Scraped directly from real jewellery ateliers with zero mock data.
  - **Chains & Necklaces** (14 authentic necklaces & pendants)
  - **Rings & Bands** (14 authentic rings & solitaires)
  - **Earrings & Jhumkas** (14 authentic jhumkas, drops & studs)
  - **Bangles & Bracelets** (14 authentic kadas, bangles & bracelets)
- **Multi-Angle Studio Gallery**: Every product features **3 to 8 verified photo angles** with high-resolution lightbox inspection and zoom.
- **Dedicated Product Detail Page (PDP)**:
  - URL hash routing (`#product-[id]`) with full browser history support
  - Noble metal and Karat selector (22KT Yellow Gold, 18KT Rose Gold, 950 Platinum)
  - BIS Ring & Bangle Size Guide modal
  - Live 6-digit Indian Pincode delivery and insured dispatch estimator
  - Technical specifications table (gross weight, net weight, purity, BIS hallmark, laser HUID)
  - Curated matching pairings ("You May Also Admire")
  - Mobile sticky buy bar
- **Product Listing Page (PLP)**:
  - Responsive category navigation (Shop All, New Arrivals, Necklaces, Rings, Earrings, Bangles)
  - Dynamic price sorting (Curated, Newest, Price: Low to High, Price: High to Low)
- **Luxury Editorial Homepage**:
  - Full-width hero carousel with slow-zoom animation
  - Trust & Provenance Bar (BIS Hallmark, IGI Diamonds, Insured Blue Dart / Sequel Delivery)
  - Spotlight Masterpiece feature
  - Asymmetric editorial campaign splits & Regional bridal curations
  - 4-zone gifting & milestone bento matrix
  - Atelier concierge consultation booking
- **Cart & Luxury Checkout**:
  - Slide-out bag drawer with quantity controls, promo vouchers (`PANCHALOHA-PRIVILEGE-15`), and free delivery threshold progress
  - LocalStorage state persistence

---

## 🛠️ Tech Stack

- **Framework**: React 18 (TypeScript)
- **Bundler & Tooling**: Vite 6
- **Styling**: Tailwind CSS
- **Typography**: Cormorant Garamond (Serif) & Inter (Sans)
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/harshangowda84/Panchaloha.git
cd Panchaloha
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```
Generates production-optimized static assets in the `dist/` directory.

---

## 🌐 1-Click Deployment (Never Sleeps)

Because Panchaloha compiles to high-performance client-side assets, deploy it to a global edge CDN for **0ms cold starts, 24/7 uptime, and zero sleeping servers**:

- **Vercel**: Run `npx vercel` inside the folder or import the GitHub repository on [vercel.com](https://vercel.com).
- **Cloudflare Pages**: Run `npx wrangler pages deploy dist`.
- **Netlify**: Drag & drop the `dist/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
