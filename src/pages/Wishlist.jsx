import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles, Check, PackageOpen } from "lucide-react";
import SafeImage from "../components/SafeImage";
import DiscountBadge from "../components/DiscountBadge";
import { formatPrice, products } from "../data/products";

export default function Wishlist({
  wishlist = [],
  onWishlist,
  onAdd,
  onClearWishlist,
  onResetWishlist
}) {
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Resolve product objects from IDs
  const wishlistItems = wishlist
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const handleMoveToCart = (product) => {
    onAdd(product, 1);
    onWishlist(product.id); // Removes from wishlist
    showToast(`Moved "${product.name}" to your bag!`);
  };

  const handleMoveAllToCart = () => {
    wishlistItems.forEach((product) => {
      onAdd(product, 1);
      onWishlist(product.id);
    });
    showToast(`Moved ${wishlistItems.length} handcrafted pieces to your bag!`);
  };

  return (
    <main className="min-h-screen bg-offwhite page-enter">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-walnut text-offwhite px-5 py-3.5 shadow-warm-lg border border-brass/40 animate-fadeIn">
          <div className="w-5 h-5 rounded-full bg-brass text-walnut flex items-center justify-center shrink-0">
            <Check size={12} strokeWidth={3} />
          </div>
          <span className="text-xs font-sans tracking-wide">{toastMessage}</span>
          <Link
            to="/cart"
            className="ml-3 text-xs font-bold text-brass-light underline uppercase tracking-wider hover:text-white"
          >
            View Bag →
          </Link>
        </div>
      )}

      {/* Hero / Header Section */}
      <section className="bg-beige-light/40 border-b border-beige-border/70 py-10 sm:py-16">
        <div className="container-page">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-sans text-walnut/60 mb-4 select-none">
            <Link to="/" className="hover:text-terracotta transition">Home</Link>
            <span>/</span>
            <span className="text-walnut font-medium">Patron's Wishlist</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="eyebrow flex items-center gap-1.5">
                <Sparkles size={12} className="text-terracotta" />
                SAVED CREATIONS ({wishlistItems.length})
              </p>
              <h1 className="display mt-2 text-4xl sm:text-5xl lg:text-6xl text-walnut">
                Curated Sanctuary.
              </h1>
              <p className="mt-2 text-sm text-charcoal/70 max-w-xl font-sans leading-relaxed">
                Handcrafted pieces saved for your living spaces. Each piece is crafted in small artisan batches in Ganpatipule.
              </p>
            </div>

            {wishlistItems.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleMoveAllToCart}
                  className="btn-primary py-2.5 px-5 text-xs shadow-warm-sm"
                >
                  <ShoppingBag size={14} />
                  <span>Move All to Bag</span>
                </button>
                {onClearWishlist && (
                  <button
                    onClick={onClearWishlist}
                    className="btn-secondary py-2.5 px-4 text-xs text-charcoal/75"
                  >
                    Clear All
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container-page py-12 sm:py-16">
        {wishlistItems.length === 0 ? (
          /* Empty State */
          <div className="max-w-xl mx-auto text-center py-16 px-4 bg-white/60 border border-beige-border/80 rounded-[2px] shadow-warm-sm">
            <div className="w-16 h-16 mx-auto rounded-full bg-beige-light border border-beige-border flex items-center justify-center text-walnut/50 mb-5">
              <Heart size={28} strokeWidth={1.5} />
            </div>
            <h2 className="display text-2xl sm:text-3xl text-walnut">
              Your Wishlist is Empty
            </h2>
            <p className="mt-3 text-sm text-charcoal/65 font-sans leading-relaxed">
              You haven't saved any handcrafted creations yet. Explore our coastal teakwood furniture, wheel-thrown ceramics, and folk wall hangings.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/shop" className="btn-primary w-full sm:w-auto">
                <span>Explore The Shop</span>
                <ArrowRight size={14} />
              </Link>
              {onResetWishlist && (
                <button
                  onClick={onResetWishlist}
                  className="btn-secondary w-full sm:w-auto text-xs"
                >
                  Restore Demo Wishlist
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Responsive Wishlist Grid */
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white border border-beige-border/80 rounded-[2px] flex flex-col overflow-hidden transition-all duration-300 hover:shadow-warm-md hover:border-walnut/30"
                >
                  {/* Card Image Area */}
                  <div className="relative aspect-square w-full bg-beige-light overflow-hidden">
                    <Link to={`/product/${item.id}`} className="block w-full h-full">
                      <SafeImage
                        src={item.image}
                        alt={item.name}
                        dimensions="400x400px"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {/* Discount Badge */}
                    {item.discount && (
                      <div className="absolute top-3 left-3 z-10">
                        <DiscountBadge discount={item.discount} />
                      </div>
                    )}

                    {/* Remove Button */}
                    <button
                      onClick={() => onWishlist(item.id)}
                      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-walnut/60 hover:text-terracotta hover:bg-white flex items-center justify-center shadow-sm transition"
                      title="Remove from Wishlist"
                    >
                      <Trash2 size={15} />
                    </button>

                    {/* Collection Tag */}
                    <div className="absolute bottom-2.5 left-3">
                      <span className="text-[9px] font-sans font-semibold tracking-wider uppercase bg-walnut/80 backdrop-blur-sm text-offwhite px-2 py-0.5 rounded-[1px]">
                        {item.collection || "Konkan Craft"}
                      </span>
                    </div>
                  </div>

                  {/* Card Details Area */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-sans text-walnut-muted mb-1">
                        <span>{item.category}</span>
                        <span className="text-terracotta font-medium">★ {item.rating}</span>
                      </div>

                      <Link
                        to={`/product/${item.id}`}
                        className="font-serif text-base sm:text-lg font-bold text-walnut hover:text-terracotta transition line-clamp-1"
                      >
                        {item.name}
                      </Link>

                      <p className="text-xs text-charcoal/60 font-sans mt-1 line-clamp-1">
                        {item.material} • {item.color}
                      </p>

                      {/* Stock Status */}
                      <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-sans text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                        <span>In Stock — Ganpatipule Workshop</span>
                      </div>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="mt-5 pt-3 border-t border-beige-border/60">
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="font-serif text-lg font-bold text-walnut">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-charcoal/40 line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="btn-primary w-full py-2.5 text-[10px] tracking-[0.16em]"
                      >
                        <ShoppingBag size={13} />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Guarantee Banner */}
            <div className="mt-14 p-6 sm:p-8 bg-beige/30 border border-beige-border flex flex-col md:flex-row items-center justify-between gap-6 rounded-[2px]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-walnut text-brass-light flex items-center justify-center shrink-0">
                  <PackageOpen size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-walnut">
                    White-Glove Delivery on Artisan Pieces
                  </h3>
                  <p className="text-xs text-charcoal/70 font-sans mt-0.5">
                    Complimentary heavy wooden crating and transit insurance on all orders above ₹10,000.
                  </p>
                </div>
              </div>
              <Link to="/shop" className="btn-secondary text-xs shrink-0">
                Continue Curating
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
