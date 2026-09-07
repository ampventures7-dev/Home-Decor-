import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import ProductCard from "./ProductCard";

export default function NewArrivalsCarousel({ products, wishlist = [], onWishlist, onAdd }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const newArrivals = products.slice(0, 6);

  return (
    <section className="bg-white py-16 sm:py-24 border-y border-beige-border/70 select-none">
      <div className="container-page">
        {/* Section Header with Carousel Arrows */}
        <div className="flex items-end justify-between border-b border-neutral-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-terracotta text-[10px] font-sans font-semibold tracking-[0.24em] uppercase">
              <Sparkles size={11} />
              <span>FRESH OFF THE ATELIER BENCH</span>
            </div>
            <h2 className="display text-3xl sm:text-5xl text-walnut mt-1">
              New Arrivals
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/65 font-sans mt-1.5">
              Hand-finished in small batches with kiln-dried wood and organic coastal pigments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous Products"
              className="w-9 h-9 rounded-full border border-walnut/25 flex items-center justify-center text-walnut hover:border-walnut hover:bg-walnut hover:text-white transition shadow-sm"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next Products"
              className="w-9 h-9 rounded-full border border-walnut/25 flex items-center justify-center text-walnut hover:border-walnut hover:bg-walnut hover:text-white transition shadow-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Product Track */}
        <div
          ref={scrollRef}
          className="mt-8 flex gap-6 overflow-x-auto pb-4 pt-1 snap-x scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {newArrivals.map((product) => (
            <div
              key={product.id}
              className="min-w-[260px] sm:min-w-[300px] max-w-[320px] snap-start shrink-0"
            >
              <ProductCard
                product={product}
                wished={wishlist.includes(product.id)}
                onWishlist={onWishlist}
                onAdd={onAdd}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <Link to="/shop" className="btn-secondary text-[10px]">
            VIEW ALL NEW RELEASES &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
