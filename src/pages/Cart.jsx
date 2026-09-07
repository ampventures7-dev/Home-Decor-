import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  Heart,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Tag,
  CheckCircle2,
  X,
  CreditCard,
  Building2,
  Smartphone
} from "lucide-react";
import { formatPrice } from "../data/products";
import SafeImage from "../components/SafeImage";

export default function Cart({
  cart = [],
  onQty,
  onRemove,
  onWishlist,
  onClearCart,
  onResetCart
}) {
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState({ code: "MALHAR1000", discount: 1000, type: "flat" });
  const [couponError, setCouponError] = useState("");
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [pincode, setPincode] = useState("400050");
  const [pincodeVerified, setPincodeVerified] = useState(true);

  // Subtotal calculation
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Free shipping threshold: ₹10,000
  const freeShippingThreshold = 10000;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const shippingFee = subtotal === 0 ? 0 : isFreeShipping ? 0 : 499;

  // Coupon discount calculation
  let discountAmount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.type === "flat") {
      discountAmount = Math.min(subtotal, appliedCoupon.discount);
    } else if (appliedCoupon.type === "percent") {
      discountAmount = Math.round((subtotal * appliedCoupon.discount) / 100);
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError("");
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (code === "MALHAR1000") {
      if (subtotal < 3000) {
        setCouponError("MALHAR1000 requires a minimum order of ₹3,000.");
        return;
      }
      setAppliedCoupon({ code: "MALHAR1000", discount: 1000, type: "flat" });
      setCouponInput("");
    } else if (code === "FIRST10") {
      setAppliedCoupon({ code: "FIRST10", discount: 10, type: "percent" });
      setCouponInput("");
    } else if (code === "ARTISAN5") {
      setAppliedCoupon({ code: "ARTISAN5", discount: 5, type: "percent" });
      setCouponInput("");
    } else {
      setCouponError("Invalid coupon. Try MALHAR1000 or FIRST10.");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  const handleCloseCheckout = () => {
    setCheckoutModalOpen(false);
    if (orderPlaced) {
      if (onClearCart) onClearCart();
      setOrderPlaced(false);
    }
  };

  return (
    <main className="min-h-screen bg-offwhite page-enter">
      {/* Page Header */}
      <section className="bg-beige-light/40 border-b border-beige-border/70 py-10 sm:py-14">
        <div className="container-page">
          <nav className="flex items-center gap-2 text-xs font-sans text-walnut/60 mb-3 select-none">
            <Link to="/" className="hover:text-terracotta transition">Home</Link>
            <span>/</span>
            <span className="text-walnut font-medium">Shopping Bag</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="eyebrow flex items-center gap-1.5">
                <Sparkles size={12} className="text-terracotta" />
                YOUR SELECTIONS ({cart.reduce((s, x) => s + x.qty, 0)} ITEMS)
              </p>
              <h1 className="display mt-2 text-4xl sm:text-5xl lg:text-6xl text-walnut">
                Shopping Bag.
              </h1>
            </div>
            {cart.length > 0 && onClearCart && (
              <button
                onClick={onClearCart}
                className="text-xs font-sans text-charcoal/60 hover:text-terracotta underline transition self-start sm:self-end"
              >
                Clear Entire Bag
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Cart Section */}
      <section className="container-page py-10 sm:py-16">
        {cart.length === 0 ? (
          /* Empty Bag State */
          <div className="max-w-xl mx-auto text-center py-16 px-4 bg-white/60 border border-beige-border/80 rounded-[2px] shadow-warm-sm">
            <div className="w-16 h-16 mx-auto rounded-full bg-beige-light border border-beige-border flex items-center justify-center text-walnut/50 mb-5">
              <Sparkles size={28} strokeWidth={1.5} />
            </div>
            <h2 className="display text-2xl sm:text-3xl text-walnut">
              Your Bag is Waiting
            </h2>
            <p className="mt-3 text-sm text-charcoal/65 font-sans leading-relaxed">
              No handcrafted creations added yet. Explore our seasoned teakwood furniture, coastal wall hangings, and terracotta accents.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/shop" className="btn-primary w-full sm:w-auto">
                <span>Explore The Shop</span>
                <ArrowRight size={14} />
              </Link>
              {onResetCart && (
                <button
                  onClick={onResetCart}
                  className="btn-secondary w-full sm:w-auto text-xs"
                >
                  Load Sample Bag
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
            {/* Left Column: Cart Items List & Shipping Bar */}
            <div className="space-y-6">
              {/* Free Shipping Progress Card */}
              <div className="bg-beige-light/50 border border-beige-border p-5 rounded-[2px]">
                <div className="flex items-center justify-between text-xs font-sans mb-2">
                  <span className="font-semibold text-walnut flex items-center gap-1.5">
                    <Truck size={14} className="text-terracotta" />
                    {isFreeShipping ? (
                      <span className="text-emerald-800 font-bold">
                        ✓ You qualify for Complimentary White-Glove Delivery!
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-terracotta">{formatPrice(amountToFreeShipping)}</strong> more for FREE White-Glove Delivery!
                      </span>
                    )}
                  </span>
                  <span className="text-[11px] font-mono text-charcoal/60">{shippingProgress}%</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 bg-beige-border/70 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      isFreeShipping ? "bg-emerald-600" : "bg-terracotta"
                    }`}
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Table */}
              <div className="divide-y divide-beige-border border-t border-b border-beige-border">
                {cart.map((item) => {
                  const itemTotal = item.price * item.qty;
                  return (
                    <div
                      key={item.id}
                      className="py-6 sm:py-7 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                    >
                      {/* Product Thumbnail & Details */}
                      <div className="flex gap-4 sm:gap-5 items-center flex-1">
                        <Link
                          to={`/product/${item.id}`}
                          className="w-24 h-28 sm:w-28 sm:h-32 bg-beige-light shrink-0 overflow-hidden rounded-[2px] border border-beige-border/70 group"
                        >
                          <SafeImage
                            src={item.image}
                            alt={item.name}
                            dimensions="200x240px"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>

                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-sans font-semibold tracking-wider uppercase text-terracotta">
                            {item.category}
                          </p>
                          <Link
                            to={`/product/${item.id}`}
                            className="font-serif text-base sm:text-lg font-bold text-walnut hover:text-terracotta transition block truncate mt-0.5"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-charcoal/60 font-sans mt-0.5">
                            {item.material || "Seasoned Timber"} • Natural Wax Finish
                          </p>

                          <div className="mt-2 text-xs font-sans text-walnut flex items-baseline gap-2">
                            <span className="font-semibold">{formatPrice(item.price)}</span>
                            {item.originalPrice && (
                              <span className="text-[11px] text-charcoal/40 line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>

                          {/* Mobile Actions */}
                          <div className="flex sm:hidden items-center gap-4 mt-3 pt-2 border-t border-beige-border/40">
                            {onWishlist && (
                              <button
                                onClick={() => {
                                  onWishlist(item.id);
                                  onRemove(item.id);
                                }}
                                className="text-[11px] font-sans text-walnut-muted hover:text-terracotta flex items-center gap-1"
                              >
                                <Heart size={12} />
                                <span>Save for later</span>
                              </button>
                            )}
                            <button
                              onClick={() => onRemove(item.id)}
                              className="text-[11px] font-sans text-red-700 hover:text-red-900 flex items-center gap-1"
                            >
                              <Trash2 size={12} />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Stepper & Price Calculation */}
                      <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-6 sm:gap-8 pt-2 sm:pt-0">
                        {/* Stepper */}
                        <div className="flex items-center border border-beige-border rounded-[1px] bg-white">
                          <button
                            onClick={() => onQty(item.id, Math.max(1, item.qty - 1))}
                            className="w-8 h-8 flex items-center justify-center text-walnut hover:bg-beige-light transition disabled:opacity-30"
                            disabled={item.qty <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-9 text-center font-mono text-xs font-bold text-walnut">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => onQty(item.id, item.qty + 1)}
                            className="w-8 h-8 flex items-center justify-center text-walnut hover:bg-beige-light transition"
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right min-w-[90px]">
                          <span className="font-serif text-base sm:text-lg font-bold text-walnut block">
                            {formatPrice(itemTotal)}
                          </span>
                          <span className="text-[10px] font-mono text-charcoal/50">
                            {item.qty} × {formatPrice(item.price)}
                          </span>
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden sm:flex items-center gap-2 text-charcoal/40">
                          {onWishlist && (
                            <button
                              onClick={() => {
                                onWishlist(item.id);
                                onRemove(item.id);
                              }}
                              className="p-1.5 hover:text-terracotta transition"
                              title="Move to Wishlist"
                            >
                              <Heart size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => onRemove(item.id)}
                            className="p-1.5 hover:text-red-700 transition"
                            title="Remove Item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Pincode Checker Strip */}
              <div className="p-4 bg-white border border-beige-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans">
                <div className="flex items-center gap-2 text-walnut">
                  <Truck size={16} className="text-brass shrink-0" />
                  <span>
                    Delivering to <strong>{pincode}</strong> (Mumbai Coastal Region)
                  </span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                    className="w-24 px-2.5 py-1 text-xs border border-beige-border focus:border-walnut outline-none font-mono"
                    placeholder="Pincode"
                  />
                  <button
                    onClick={() => setPincodeVerified(pincode.length === 6)}
                    className="px-3 py-1 bg-walnut text-offwhite text-[10px] font-semibold tracking-wider uppercase hover:bg-terracotta transition"
                  >
                    Check
                  </button>
                </div>
              </div>

              {/* Continue Shopping Link */}
              <div className="pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-walnut hover:text-terracotta transition uppercase tracking-wider"
                >
                  <span>← Continue Curating Living Spaces</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Order Summary Card */}
            <aside className="h-fit space-y-6">
              <div className="bg-white border border-beige-border p-6 sm:p-7 shadow-warm-sm rounded-[2px]">
                <h2 className="font-serif text-xl font-bold text-walnut border-b border-beige-border pb-4">
                  Order Summary
                </h2>

                {/* Pricing Line Items */}
                <div className="mt-5 space-y-3.5 text-xs font-sans">
                  <div className="flex justify-between text-charcoal/80">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-walnut">{formatPrice(subtotal)}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span className="flex items-center gap-1">
                        <Tag size={12} />
                        Coupon ({appliedCoupon.code})
                      </span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-charcoal/80">
                    <span>White-Glove Shipping</span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase text-[10px] tracking-wider">
                        FREE
                      </span>
                    ) : (
                      <span className="font-semibold text-walnut">{formatPrice(shippingFee)}</span>
                    )}
                  </div>

                  <div className="flex justify-between text-[11px] text-charcoal/50 pt-1 border-t border-dashed border-beige-border">
                    <span>Applicable GST / Taxes</span>
                    <span>Included in Price</span>
                  </div>

                  <div className="pt-4 border-t border-beige-border flex justify-between items-baseline">
                    <div>
                      <span className="font-serif text-lg font-bold text-walnut block">
                        Grand Total
                      </span>
                      <span className="text-[10px] text-charcoal/50 font-sans">
                        All inclusive, fully insured transit
                      </span>
                    </div>
                    <span className="font-serif text-2xl font-bold text-terracotta">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Coupon Input Area */}
                <div className="mt-6 pt-5 border-t border-beige-border">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-[2px]">
                      <div className="flex items-center gap-2">
                        <Tag size={13} className="text-emerald-700" />
                        <span className="text-xs font-mono font-bold text-emerald-800">
                          {appliedCoupon.code}
                        </span>
                        <span className="text-[11px] text-emerald-700">
                          (-{formatPrice(discountAmount)})
                        </span>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-emerald-700 hover:text-emerald-900 p-1"
                        title="Remove Coupon"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Coupon (e.g. MALHAR1000)"
                          className="flex-1 bg-beige-light/50 border border-beige-border px-3 py-2 text-xs font-mono uppercase focus:border-walnut outline-none"
                        />
                        <button
                          type="submit"
                          className="bg-walnut text-offwhite px-4 py-2 text-[10px] font-sans font-semibold tracking-wider uppercase hover:bg-terracotta transition"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-red-600 font-sans">{couponError}</p>
                      )}
                      <p className="text-[10px] text-charcoal/50 font-sans">
                        Tip: Use code <strong className="text-walnut">MALHAR1000</strong> for ₹1,000 off or <strong className="text-walnut">FIRST10</strong> for 10% off.
                      </p>
                    </form>
                  )}
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => setCheckoutModalOpen(true)}
                  className="btn-primary mt-6 w-full py-3.5 text-xs shadow-warm-md"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={14} />
                </button>

                {/* Delivery Timeline Pill */}
                <div className="mt-4 text-center">
                  <p className="text-[11px] font-sans text-charcoal/60">
                    Estimated Atelier Dispatch: <strong>Within 48 Hours</strong>
                  </p>
                </div>
              </div>

              {/* Artisan Trust Guarantees */}
              <div className="bg-beige/30 border border-beige-border p-5 rounded-[2px] space-y-3.5 text-xs font-sans text-walnut/80">
                <div className="flex items-start gap-3">
                  <ShieldCheck size={18} className="text-terracotta shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-walnut">100% Solid Wood Guarantee</strong>
                    <span className="text-[11px] text-charcoal/65">
                      Authentic Konkan seasoned timber and lead-free natural glazes.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck size={18} className="text-terracotta shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-walnut">Safe Wooden Crate Transit</strong>
                    <span className="text-[11px] text-charcoal/65">
                      Double-crated packaging built specifically for delicate ceramics & heavy furniture.
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </section>

      {/* Checkout Drawer / Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-offwhite border border-beige-border shadow-warm-lg rounded-[2px] p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={handleCloseCheckout}
              className="absolute top-5 right-5 text-walnut/60 hover:text-terracotta transition"
            >
              <X size={20} />
            </button>

            {!orderPlaced ? (
              <div>
                <p className="eyebrow">FINAL STEP</p>
                <h3 className="display mt-1 text-2xl sm:text-3xl text-walnut">
                  Secure Checkout
                </h3>

                <div className="mt-6 space-y-5">
                  {/* Shipping Address Summary */}
                  <div className="p-4 bg-white border border-beige-border text-xs font-sans">
                    <div className="flex justify-between items-center mb-2">
                      <strong className="text-walnut">White-Glove Delivery Address</strong>
                      <span className="text-terracotta text-[10px] font-semibold cursor-pointer">Edit</span>
                    </div>
                    <p className="text-charcoal/70 leading-relaxed">
                      Patron Residence, Flat 402, Sea View Apartments<br />
                      Bandstand Road, Bandra West, Mumbai, MH - 400050<br />
                      Ph: +91 98765 43210
                    </p>
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label className="text-xs font-sans font-bold text-walnut block mb-2">
                      Select Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-2.5 text-xs font-sans">
                      {[
                        { id: "upi", label: "UPI / QR / GPay", icon: Smartphone },
                        { id: "card", label: "Credit / Debit Card", icon: CreditCard },
                        { id: "netbanking", label: "Net Banking", icon: Building2 },
                        { id: "cod", label: "Cash on Delivery", icon: ShieldCheck }
                      ].map((item) => {
                        const Icon = item.icon;
                        const isSelected = paymentMethod === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setPaymentMethod(item.id)}
                            className={`p-3 border text-left flex items-center gap-2.5 rounded-[1px] transition ${
                              isSelected
                                ? "border-walnut bg-white shadow-warm-sm font-semibold text-walnut"
                                : "border-beige-border bg-beige-light/30 text-charcoal/70 hover:border-walnut/40"
                            }`}
                          >
                            <Icon size={16} className={isSelected ? "text-terracotta" : "text-walnut/50"} />
                            <span className="text-[11px]">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Order Total Review */}
                  <div className="p-4 bg-beige-light/40 border border-beige-border text-xs font-sans flex justify-between items-center">
                    <div>
                      <span className="text-charcoal/60 block">Amount Payable</span>
                      <span className="font-serif text-xl font-bold text-walnut">
                        {formatPrice(grandTotal)}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-sm">
                      256-bit SSL Encrypted
                    </span>
                  </div>

                  {/* Place Order CTA */}
                  <button
                    onClick={handlePlaceOrder}
                    className="btn-primary w-full py-3.5 text-xs shadow-warm-md"
                  >
                    <span>Confirm & Place Handcrafted Order</span>
                    <ArrowRight size={14} />
                  </button>

                  <p className="text-[10px] text-center text-charcoal/50 font-sans">
                    By confirming, you support artisan families across the Konkan coast.
                  </p>
                </div>
              </div>
            ) : (
              /* Order Confirmation Screen */
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <CheckCircle2 size={36} />
                </div>
                <p className="eyebrow text-emerald-800">ORDER CONFIRMED</p>
                <h3 className="display mt-1 text-3xl text-walnut">
                  Dhanyavaad!
                </h3>
                <p className="mt-2 font-mono text-xs text-brass font-bold">
                  Order ID: #MLH-{Math.floor(100000 + Math.random() * 900000)}
                </p>
                <p className="mt-4 text-xs font-sans text-charcoal/70 max-w-sm mx-auto leading-relaxed">
                  Your handcrafted pieces are being prepared with care in our Ganpatipule workshop. We will notify you when the wooden crate dispatches.
                </p>

                <div className="mt-6 p-4 bg-white border border-beige-border text-left text-xs font-sans space-y-1.5">
                  <p className="font-semibold text-walnut">Order Summary:</p>
                  <p className="text-charcoal/70">Total Paid: {formatPrice(grandTotal)} ({paymentMethod.toUpperCase()})</p>
                  <p className="text-charcoal/70">Estimated Delivery: Within 5 to 7 business days</p>
                </div>

                <div className="mt-8 flex justify-center gap-3">
                  <button
                    onClick={handleCloseCheckout}
                    className="btn-primary text-xs py-3 px-6"
                  >
                    Return to Atelier
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
