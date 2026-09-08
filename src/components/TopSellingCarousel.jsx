import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star, Heart } from "lucide-react";
import SafeImage from "./SafeImage";
import DiscountBadge from "./DiscountBadge";
import { formatPrice } from "../data/products";

const topSellingItems = [
  {
    id: 101,
    name: "Handcrafted Teak Daybed",
    category: "Living Room",
    price: 24990,
    originalPrice: 29990,
    discount: "17% OFF",
    rating: 5.0,
    reviews: 42,
    image: "/images/products/product-top-1.jpg",
    dimensions: "600x600px"
  },
  {
    id: 102,
    name: "Archway Crockery Cabinet",
    category: "Storage",
    price: 38500,
    originalPrice: 44000,
    discount: "12% OFF",
    rating: 4.9,
    reviews: 28,
    image: "/images/products/product-top-2.jpg",
    dimensions: "600x600px"
  },
  {
    id: 103,
    name: "Coastline Coffee Table",
    category: "Living Room",
    price: 14200,
    originalPrice: 17500,
    discount: "19% OFF",
    rating: 4.8,
    reviews: 64,
    image: "/images/products/product-top-3.jpg",
    dimensions: "600x600px"
  },
  {
    id: 104,
    name: "Ganpatipule Platform Bed",
    category: "Bedroom",
    price: 46900,
    originalPrice: 54000,
    discount: "13% OFF",
    rating: 5.0,
    reviews: 35,
    image: "/images/products/product-top-4.jpg",
    dimensions: "600x600px"
  },
  {
    id: 1,
    name: "Konkan Folk Wall Art",
    category: "Wall Hangings",
    price: 2490,
    originalPrice: 3290,
    discount: "24% OFF",
    rating: 4.9,
    reviews: 112,
    image: "/images/products/product-1.jpg",
    dimensions: "600x600px"
  },
  {
    id: 8,
    name: "Terracotta Sun Tile",
    category: "Outdoor Decor",
    price: 1590,
    originalPrice: 1990,
    discount: "20% OFF",
    rating: 4.8,
    reviews: 87,
    image: "/images/products/product-8.jpg",
    dimensions: "600x600px"
  }
];

export default function TopSellingCarousel({ wishlist = [], onWishlist, onAdd }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="container-page py-16 sm:py-24 select-none">
      <div className="flex items-end justify-between border-b border-walnut/15 pb-5">
        <div>
          <span className="eyebrow">PATRON FAVORITES</span>
          <h2 className="display text-3xl sm:text-5xl text-walnut mt-1">
            Top Selling Masterpieces
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/65 font-sans mt-1.5">
            Our most celebrated furniture and decor designs, loved by homes across the country.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll("left")}
            aria-label="Previous Top Sellers"
            className="w-9 h-9 rounded-full border border-walnut/25 flex items-center justify-center text-walnut hover:border-walnut hover:bg-walnut hover:text-white transition shadow-sm"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Next Top Sellers"
            className="w-9 h-9 rounded-full border border-walnut/25 flex items-center justify-center text-walnut hover:border-walnut hover:bg-walnut hover:text-white transition shadow-sm"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="mt-8 flex gap-6 overflow-x-auto pb-4 pt-1 snap-x scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {topSellingItems.map((item) => {
          const isWished = wishlist.includes(item.id);
          return (
            <div
              key={item.id}
              className="min-w-[270px] sm:min-w-[310px] max-w-[320px] snap-start shrink-0 flex flex-col bg-white border border-beige-border/70 rounded-[2px] overflow-hidden shadow-warm-sm group"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-beige-light">
                <div className="absolute top-3 left-3 z-10">
                  <DiscountBadge discount={item.discount} size="sm" />
                </div>

                <button
                  onClick={() => onWishlist?.(item.id)}
                  aria-label="Wishlist"
                  className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-offwhite/90 backdrop-blur-sm flex items-center justify-center shadow-warm-sm transition hover:scale-110 ${
                    isWished ? "text-terracotta" : "text-walnut/60 hover:text-walnut"
                  }`}
                >
                  <Heart size={15} fill={isWished ? "currentColor" : "none"} />
                </button>

                <Link to={item.id <= 8 ? `/product/${item.id}` : `/shop`} className="block w-full h-full">
                  <SafeImage
                    src={item.image}
                    dimensions={item.dimensions}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </Link>

                <button
                  onClick={() => onAdd?.(item)}
                  className="absolute bottom-3 left-3 right-3 translate-y-2 z-10 bg-walnut/95 backdrop-blur-sm py-2.5 text-[10px] font-semibold tracking-[0.18em] uppercase text-offwhite opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-terracotta"
                >
                  ADD TO CART
                </button>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-600 text-[11px] font-sans">
                    <Star size={12} fill="currentColor" />
                    <span className="font-semibold text-charcoal">{item.rating}</span>
                    <span className="text-neutral-400">({item.reviews} reviews)</span>
                  </div>
                  <Link
                    to={item.id <= 8 ? `/product/${item.id}` : `/shop`}
                    className="font-serif text-lg text-walnut font-medium mt-1.5 block hover:text-terracotta transition"
                  >
                    {item.name}
                  </Link>
                  <p className="text-[10px] font-sans text-terracotta uppercase tracking-wider mt-0.5">
                    {item.category}
                  </p>
                </div>

                <div className="mt-3 flex items-baseline gap-2 pt-2 border-t border-neutral-100">
                  <span className="font-serif text-base text-walnut font-medium">
                    {formatPrice(item.price)}
                  </span>
                  {item.originalPrice && (
                    <span className="text-xs line-through text-walnut-muted/60 font-sans">
                      {formatPrice(item.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
