import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "../data/products";
import SafeImage from "./SafeImage";
import DiscountBadge from "./DiscountBadge";

export default function ProductCard({ product, wished, onWishlist, onAdd }) {
  const discountLabel = product.discount || (product.originalPrice && product.originalPrice > product.price
    ? `${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF`
    : null);

  return (
    <article className="group flex flex-col bg-transparent">
      <div className="relative aspect-[4/5] overflow-hidden bg-beige-light border border-beige-border/50">
        {/* Discount Badge */}
        {discountLabel && (
          <div className="absolute top-3 left-3 z-10">
            <DiscountBadge discount={discountLabel} size="sm" />
          </div>
        )}

        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <SafeImage
            src={product.image}
            alt={product.name}
            dimensions="600x600px"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={() => onWishlist(product.id)}
          className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-offwhite/90 backdrop-blur-sm transition-all hover:scale-110 shadow-warm-sm ${
            wished ? "text-terracotta" : "text-walnut/60 hover:text-walnut"
          }`}
          aria-label="Wishlist"
        >
          <Heart size={15} fill={wished ? "currentColor" : "none"} strokeWidth={1.75} />
        </button>

        {/* Quick Add Slide-up */}
        <button
          onClick={() => onAdd(product)}
          className="absolute bottom-3 left-3 right-3 translate-y-2 z-10 bg-walnut/95 backdrop-blur-sm py-3 text-[10px] font-semibold tracking-[0.18em] uppercase text-offwhite opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-terracotta"
        >
          ADD TO CART
        </button>
      </div>

      <div className="pt-3.5 flex flex-col flex-1">
        <p className="eyebrow text-[9px] tracking-[0.2em]">{product.category}</p>
        <Link
          to={`/product/${product.id}`}
          className="display mt-1 block font-serif text-xl sm:text-2xl text-walnut leading-snug hover:text-terracotta transition-colors"
        >
          {product.name}
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-base text-walnut font-medium">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs line-through text-walnut-muted/60 font-sans">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <ShoppingBag size={14} strokeWidth={1.5} className="text-walnut/40 transition group-hover:text-terracotta" />
        </div>
      </div>
    </article>
  );
}
