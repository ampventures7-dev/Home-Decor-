import HeroBanner from "../components/HeroBanner";
import TrustStrip from "../components/TrustStrip";
import CategoryGrid from "../components/CategoryGrid";
import NewArrivalsCarousel from "../components/NewArrivalsCarousel";
import PromoBannerStrip from "../components/PromoBannerStrip";
import TopSellingCarousel from "../components/TopSellingCarousel";
import ShopByBudget from "../components/ShopByBudget";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import AppDownloadCTA from "../components/AppDownloadCTA";
import { products } from "../data/products";

export default function Home({ wishlist, onWishlist, onAdd }) {
  return (
    <main className="min-h-screen bg-offwhite text-charcoal">
      {/* 1. Hero Banner Carousel */}
      <HeroBanner />

      {/* 2. Trust Strip Guarantees */}
      <TrustStrip />

      {/* 3. Category Grid (8 Cards) */}
      <CategoryGrid />

      {/* 4. New Arrivals Horizontal Scroll Carousel */}
      <NewArrivalsCarousel
        products={products}
        wishlist={wishlist}
        onWishlist={onWishlist}
        onAdd={onAdd}
      />

      {/* 5. Promotional Banner Strip (Full-Width) */}
      <PromoBannerStrip />

      {/* 6. Top Selling Product Carousel */}
      <TopSellingCarousel
        wishlist={wishlist}
        onWishlist={onWishlist}
        onAdd={onAdd}
      />

      {/* 7. Shop by Budget Grid (4 Image Cards) */}
      <ShopByBudget />

      {/* 8. Customer Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* 9. Newsletter & App Download CTA Section */}
      <AppDownloadCTA />
    </main>
  );
}
