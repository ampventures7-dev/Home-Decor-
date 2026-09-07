import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Minus,
  Plus,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Check,
  ChevronRight,
  ShoppingBag,
  Share2,
  HelpCircle,
  Clock,
  Ruler,
  Maximize2,
  X
} from "lucide-react";
import { products, formatPrice } from "../data/products";
import SafeImage from "../components/SafeImage";
import DiscountBadge from "../components/DiscountBadge";
import ProductCard from "../components/ProductCard";

export default function ProductDetails({ wishlist = [], onWishlist, onAdd }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find current product or fallback to first product
  const product = products.find((p) => p.id === Number(id)) || products[0];

  // Gallery State
  const galleryImages = useMemo(() => {
    return [
      { id: "main", src: product.image, label: `product-${product.id}.jpg`, dimensions: "800x800px", title: "Front View" },
      { id: "angle", src: `/images/products/product-${product.id}-angle.jpg`, label: `product-${product.id}-angle.jpg`, dimensions: "800x800px", title: "Artisan Angle" },
      { id: "detail", src: `/images/products/product-${product.id}-detail.jpg`, label: `product-${product.id}-detail.jpg`, dimensions: "800x800px", title: "Joinery Detail" },
      { id: "context", src: `/images/products/product-${product.id}-context.jpg`, label: `product-${product.id}-context.jpg`, dimensions: "800x800px", title: "Room Setting" }
    ];
  }, [product]);

  const [activeImage, setActiveImage] = useState(galleryImages[0].src);
  const [activeDimensions, setActiveDimensions] = useState(galleryImages[0].dimensions);
  const [activeLabel, setActiveLabel] = useState(galleryImages[0].label);

  // Zoom on Hover State
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);

  // Variant States
  const colorVariants = [
    { name: "Walnut Brown", hex: "#2C1E18", finish: "Hand-rubbed natural teak oil" },
    { name: "Warm Beige", hex: "#E5DDD0", finish: "Limewash coastal matte" },
    { name: "Terracotta", hex: "#A85C3A", finish: "Kiln-baked natural clay" },
    { name: "Chalk White", hex: "#F5F2EB", finish: "Satin mineral glaze" }
  ];

  const sizeVariants = [
    { label: "Standard Atelier", desc: '20" x 20" x 18"', priceMod: 0 },
    { label: "Grand Edition", desc: '28" x 28" x 22"', priceMod: 1200 },
    { label: "Custom Bespoke", desc: "Crafted to room specs", priceMod: 2500 }
  ];

  const [selectedColor, setSelectedColor] = useState(colorVariants[0]);
  const [selectedSize, setSelectedSize] = useState(sizeVariants[0]);
  const [qty, setQty] = useState(1);

  // Delivery Pincode State
  const [pincodeInput, setPincodeInput] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState(null);

  // Tabs State: "description" | "specifications" | "reviews"
  const [activeTab, setActiveTab] = useState("description");

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincodeInput.trim().length === 6 && /^\d+$/.test(pincodeInput.trim())) {
      setPincodeStatus({
        valid: true,
        pincode: pincodeInput.trim(),
        city: "Mumbai / Pune / Metro Express",
        eta: "2-3 business days",
        assembly: "Complimentary White-Glove Setup"
      });
    } else {
      setPincodeStatus({
        valid: false,
        message: "Please enter a valid 6-digit Indian PIN code."
      });
    }
  };

  const handleAddToCart = () => {
    onAdd?.({
      ...product,
      selectedColor: selectedColor.name,
      selectedSize: selectedSize.label,
      price: product.price + selectedSize.priceMod
    }, qty);
    showToast(`Added "${product.name}" (${qty} item${qty > 1 ? "s" : ""}) to your Karigari Bag!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  // Mouse hover zoom calculation
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  // Related products from same category or catalog
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const isWished = wishlist.includes(product.id);
  const currentCalculatedPrice = product.price + selectedSize.priceMod;
  const currentCalculatedMRP = product.originalPrice ? product.originalPrice + selectedSize.priceMod : null;

  return (
    <div className="min-h-screen bg-offwhite text-charcoal select-none pb-24">
      {/* 1. BREADCRUMB */}
      <nav className="bg-white border-b border-beige-border/80 py-3 text-xs font-sans">
        <div className="container-page flex items-center gap-2 text-charcoal/60 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-walnut transition">Home</Link>
          <ChevronRight size={13} className="text-neutral-400" />
          <Link to="/home-decor" className="hover:text-walnut transition">Home Decor</Link>
          <ChevronRight size={13} className="text-neutral-400" />
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-walnut transition">
            {product.category}
          </Link>
          <ChevronRight size={13} className="text-neutral-400" />
          <span className="font-semibold text-walnut truncate max-w-[200px]">{product.name}</span>
        </div>
      </nav>

      {/* MAIN PRODUCT SHOWCASE CONTAINER */}
      <main className="container-page pt-8 sm:pt-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          
          {/* LEFT: IMAGE GALLERY (7 of 12 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnails list */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
              {galleryImages.map((img) => {
                const isSelected = activeImage === img.src;
                return (
                  <button
                    key={img.id}
                    onClick={() => {
                      setActiveImage(img.src);
                      setActiveDimensions(img.dimensions);
                      setActiveLabel(img.label);
                    }}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-[2px] overflow-hidden border-2 transition-all shrink-0 bg-white ${
                      isSelected
                        ? "border-walnut ring-1 ring-walnut shadow-warm-sm scale-[1.03]"
                        : "border-beige-border/80 hover:border-walnut/50 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <SafeImage
                      src={img.src}
                      dimensions="160x160px"
                      label={img.label}
                      alt={img.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>

            {/* Main Active Image with Smooth Hover Zoom */}
            <div
              className="relative aspect-square w-full bg-white border border-beige-border/90 rounded-[2px] overflow-hidden shadow-warm-md cursor-crosshair group"
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
            >
              {product.discount && (
                <div className="absolute top-4 left-4 z-20 pointer-events-none">
                  <DiscountBadge discount={product.discount} variant="terracotta" size="md" />
                </div>
              )}

              <div
                className="w-full h-full transition-transform duration-200 ease-out"
                style={{
                  transform: isZooming ? "scale(1.75)" : "scale(1)",
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                }}
              >
                <SafeImage
                  src={activeImage}
                  dimensions={activeDimensions}
                  label={activeLabel}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Hover Zoom Hint Badge */}
              <div className="absolute bottom-3 right-3 bg-black/65 backdrop-blur-sm text-white text-[10px] font-sans px-2.5 py-1 rounded-[1px] flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none">
                <Maximize2 size={12} />
                <span>Hover to Zoom</span>
              </div>
            </div>

          </div>

          {/* RIGHT: DETAILS, VARIANTS, ACTIONS & PINCODE (5 of 12 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header: Eyebrow, Title, Rating */}
            <div className="space-y-2 border-b border-beige-border/80 pb-5">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-[9px]">{product.category}</span>
                <span className="text-[10px] font-mono text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-[1px] uppercase font-semibold">
                  100% HANDMADE IN KONKAN
                </span>
              </div>

              <h1 className="display text-3xl sm:text-4xl text-walnut font-semibold leading-tight">
                {product.name}
              </h1>

              {/* Star Rating & Reviews */}
              <div className="flex items-center gap-2 pt-1 text-xs font-sans">
                <div className="flex items-center gap-0.5 text-amber-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="font-semibold text-charcoal">{product.rating || 4.9}</span>
                <span className="text-neutral-400">({product.reviews || 84} patron reviews)</span>
                <span className="text-neutral-300">•</span>
                <span className="text-emerald-700 font-medium">In Stock</span>
              </div>
            </div>

            {/* Price Block */}
            <div className="space-y-1 bg-white p-4 border border-beige-border/80 rounded-[2px] shadow-warm-sm">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl text-walnut font-bold">
                  {formatPrice(currentCalculatedPrice)}
                </span>
                {currentCalculatedMRP && (
                  <span className="text-base line-through text-neutral-400 font-sans">
                    MRP {formatPrice(currentCalculatedMRP)}
                  </span>
                )}
                {product.discount && (
                  <DiscountBadge discount={product.discount} variant="terracotta" size="sm" />
                )}
              </div>
              <p className="text-[11px] font-sans text-neutral-500">
                Price inclusive of all taxes. Free White-Glove Delivery &amp; Assembly.
              </p>
              <p className="text-[11px] font-sans text-terracotta pt-0.5 flex items-center gap-1">
                <Clock size={12} />
                <span>Made in small batches. Only 4 pieces ready in this finish.</span>
              </p>
            </div>

            {/* Variant 1: Color Swatches */}
            <div className="space-y-2.5">
              <div className="flex justify-between text-xs font-sans">
                <span className="font-semibold text-walnut uppercase tracking-wider text-[11px]">
                  Finish / Glaze:
                </span>
                <span className="text-terracotta font-medium">{selectedColor.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {colorVariants.map((c) => {
                  const isSelected = selectedColor.name === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      title={`${c.name} — ${c.finish}`}
                      className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                        isSelected
                          ? "ring-2 ring-walnut ring-offset-2 scale-110 border-transparent shadow-warm-sm"
                          : "border-neutral-300 hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {isSelected && (
                        <Check
                          size={14}
                          className={c.name === "Chalk White" ? "text-walnut" : "text-white"}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] font-sans text-charcoal/60 italic">
                {selectedColor.finish}
              </p>
            </div>

            {/* Variant 2: Size Selection Buttons */}
            <div className="space-y-2.5 border-t border-neutral-100 pt-4">
              <div className="flex justify-between text-xs font-sans">
                <span className="font-semibold text-walnut uppercase tracking-wider text-[11px]">
                  Dimensions / Size:
                </span>
                <span className="text-neutral-500">{selectedSize.desc}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {sizeVariants.map((s) => {
                  const isSelected = selectedSize.label === s.label;
                  return (
                    <button
                      key={s.label}
                      onClick={() => setSelectedSize(s)}
                      className={`p-3 text-left border rounded-[2px] transition ${
                        isSelected
                          ? "border-walnut bg-white text-walnut shadow-warm-sm ring-1 ring-walnut"
                          : "border-beige-border bg-offwhite/50 text-charcoal/75 hover:border-walnut/40"
                      }`}
                    >
                      <span className="block text-xs font-semibold font-serif">{s.label}</span>
                      <span className="block text-[10px] font-sans text-neutral-500 mt-0.5">{s.desc}</span>
                      {s.priceMod > 0 && (
                        <span className="block text-[10px] font-mono text-terracotta mt-1">+{formatPrice(s.priceMod)}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center border border-beige-border rounded-[2px] bg-white h-12 shrink-0">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease Quantity"
                    className="px-3 h-full text-walnut hover:text-terracotta hover:bg-beige-light/50 transition"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center font-mono text-sm font-semibold text-walnut">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase Quantity"
                    className="px-3 h-full text-walnut hover:text-terracotta hover:bg-beige-light/50 transition"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary h-12 text-[11px] tracking-wider"
                >
                  <ShoppingBag size={16} />
                  <span>ADD TO CART</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => onWishlist?.(product.id)}
                  aria-label="Wishlist"
                  className={`w-12 h-12 rounded-[2px] border flex items-center justify-center transition shadow-warm-sm ${
                    isWished
                      ? "border-terracotta bg-terracotta/10 text-terracotta"
                      : "border-beige-border bg-white text-walnut/60 hover:text-walnut hover:border-walnut"
                  }`}
                >
                  <Heart size={18} fill={isWished ? "#A85C3A" : "none"} strokeWidth={1.75} />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full btn-accent h-12 text-[11px] tracking-widest font-bold"
              >
                BUY NOW &bull; EXPRESS CHECKOUT &rarr;
              </button>
            </div>

            {/* 5. DELIVERY PINCODE CHECKER */}
            <div className="bg-white p-4 border border-beige-border/80 rounded-[2px] shadow-warm-sm space-y-3">
              <div className="flex items-center gap-2 text-walnut">
                <Truck size={16} className="text-terracotta" />
                <span className="font-serif text-sm font-medium">Estimated Dispatch &amp; Delivery</span>
              </div>

              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value)}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 border border-beige-border px-3 py-2 text-xs font-mono text-charcoal rounded-[2px] outline-none focus:border-walnut"
                />
                <button
                  type="submit"
                  className="bg-walnut text-offwhite text-[10px] font-sans font-semibold tracking-wider uppercase px-4 py-2 rounded-[1px] hover:bg-terracotta transition"
                >
                  CHECK
                </button>
              </form>

              {pincodeStatus && (
                <div
                  className={`p-3 rounded-[2px] text-xs font-sans space-y-1 animate-fadeIn ${
                    pincodeStatus.valid
                      ? "bg-[#1E3025]/10 text-[#1E3025] border border-[#1E3025]/20"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {pincodeStatus.valid ? (
                    <>
                      <div className="flex items-center gap-1.5 font-semibold">
                        <Check size={14} className="text-emerald-700" />
                        <span>Delivery Available to {pincodeStatus.pincode}</span>
                      </div>
                      <p className="text-[11px] text-charcoal/75 pl-5">
                        Dispatch within <strong>{pincodeStatus.eta}</strong> with {pincodeStatus.assembly}.
                      </p>
                    </>
                  ) : (
                    <p className="text-[11px]">{pincodeStatus.message}</p>
                  )}
                </div>
              )}

              {/* Guarantees micro-strip */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-sans text-charcoal/70 pt-2 border-t border-neutral-100">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-terracotta" />
                  <span>10-Year Timber Warranty</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw size={14} className="text-terracotta" />
                  <span>7-Day Return Guarantee</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 6. TABS / ACCORDION: DESCRIPTION, SPECIFICATIONS, REVIEWS */}
        <section className="mt-16 bg-white border border-beige-border rounded-[2px] shadow-warm-sm overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-beige-border bg-beige-light/40 overflow-x-auto">
            {[
              { key: "description", label: "Craft Description" },
              { key: "specifications", label: "Specifications & Details" },
              { key: "reviews", label: `Patron Reviews (${product.reviews || 84})` }
            ].map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-6 sm:px-8 text-xs font-sans font-semibold tracking-wider uppercase transition border-b-2 whitespace-nowrap ${
                    isActive
                      ? "border-terracotta text-terracotta bg-white"
                      : "border-transparent text-charcoal/70 hover:text-walnut"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels */}
          <div className="p-6 sm:p-10">
            {/* Tab 1: Description */}
            {activeTab === "description" && (
              <div className="max-w-3xl space-y-4 font-sans text-xs sm:text-sm text-charcoal/80 leading-relaxed animate-fadeIn">
                <h3 className="font-serif text-2xl text-walnut font-medium">
                  The Story Behind {product.name}
                </h3>
                <p>
                  Born in our Ganpatipule atelier along the Konkan coast, each {product.name} is shaped, planed, and finished with generational patient hands. We select exclusively kiln-seasoned timbers and earthen clays that have rested through varying monsoon seasons to ensure zero shrinkage, cracking, or surface warp over time.
                </p>
                <p>
                  {product.description}
                </p>
                <p>
                  No factory conveyor lines or chemical polyurethanes are permitted in our workshops. The piece is sealed with raw linseed and teak oils that preserve the breathing pore structure of the wood, allowing it to develop a rich, luminous heirloom patina over decades of living with you.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-100">
                  <div className="p-4 bg-offwhite border border-beige-border rounded-[2px]">
                    <span className="font-serif text-base text-walnut font-semibold block">Generational Mortise Joinery</span>
                    <span className="text-[11px] text-charcoal/60 mt-1 block">Zero hidden staples or flimsy screw brackets.</span>
                  </div>
                  <div className="p-4 bg-offwhite border border-beige-border rounded-[2px]">
                    <span className="font-serif text-base text-walnut font-semibold block">Organic Coastal Oils</span>
                    <span className="text-[11px] text-charcoal/60 mt-1 block">Non-toxic, safe for children and pets.</span>
                  </div>
                  <div className="p-4 bg-offwhite border border-beige-border rounded-[2px]">
                    <span className="font-serif text-base text-walnut font-semibold block">Authentic Artisan Stamp</span>
                    <span className="text-[11px] text-charcoal/60 mt-1 block">Numbered and signed by the master maker.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Specifications */}
            {activeTab === "specifications" && (
              <div className="max-w-3xl animate-fadeIn">
                <h3 className="font-serif text-2xl text-walnut font-medium mb-6">
                  Technical Specifications
                </h3>
                <table className="w-full text-left font-sans text-xs divide-y divide-neutral-200">
                  <tbody className="divide-y divide-neutral-100">
                    <tr className="py-2.5">
                      <td className="py-3 font-semibold text-walnut w-1/3">Primary Material</td>
                      <td className="py-3 text-charcoal/80">{product.material || "100% Seasoned Solid Teakwood"}</td>
                    </tr>
                    <tr className="py-2.5">
                      <td className="py-3 font-semibold text-walnut">Surface Finish</td>
                      <td className="py-3 text-charcoal/80">{selectedColor.finish}</td>
                    </tr>
                    <tr className="py-2.5">
                      <td className="py-3 font-semibold text-walnut">Selected Dimensions</td>
                      <td className="py-3 text-charcoal/80">{selectedSize.desc}</td>
                    </tr>
                    <tr className="py-2.5">
                      <td className="py-3 font-semibold text-walnut">Assembly Requirement</td>
                      <td className="py-3 text-charcoal/80">Delivered assembled or with complimentary White-Glove installation.</td>
                    </tr>
                    <tr className="py-2.5">
                      <td className="py-3 font-semibold text-walnut">Origin &amp; Karigari</td>
                      <td className="py-3 text-charcoal/80">Ganpatipule Atelier, Ratnagiri District, Maharashtra.</td>
                    </tr>
                    <tr className="py-2.5">
                      <td className="py-3 font-semibold text-walnut">Care Instructions</td>
                      <td className="py-3 text-charcoal/80">Wipe with soft lint-free cloth. Re-oil with natural beeswax or teak oil annually to retain depth.</td>
                    </tr>
                    <tr className="py-2.5">
                      <td className="py-3 font-semibold text-walnut">Warranty</td>
                      <td className="py-3 text-charcoal/80">10-Year Structural Timber Guarantee against wood rot and termite infestation.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 3: Reviews */}
            {activeTab === "reviews" && (
              <div className="max-w-3xl space-y-8 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-4xl text-walnut font-bold">4.9</span>
                      <div className="text-amber-600 flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={18} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-charcoal/60 font-sans mt-1">
                      Based on {product.reviews || 84} verified homeowner reviews across India
                    </p>
                  </div>

                  <button
                    onClick={() => showToast("Review submission portal: Open for verified buyers after delivery.")}
                    className="btn-secondary py-2.5 px-5 text-[10px]"
                  >
                    WRITE A PATRON REVIEW
                  </button>
                </div>

                {/* Sample Verified Reviews */}
                <div className="space-y-6">
                  <div className="space-y-2 border-b border-neutral-100 pb-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex text-amber-600">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill="currentColor" />
                          ))}
                        </div>
                        <span className="font-serif text-sm text-walnut font-semibold">Gauri Tendulkar</span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-sans">
                          Verified Buyer
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-400 font-mono">2 weeks ago</span>
                    </div>
                    <p className="text-xs text-charcoal/80 font-sans leading-relaxed">
                      "Extremely impressed by the joinery and timber scent. Photos do not do justice to the velvety feel of the hand-rubbed oil finish. Delivered securely packaged in eco-friendly burlap and recycled corrugated wrap."
                    </p>
                  </div>

                  <div className="space-y-2 border-b border-neutral-100 pb-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex text-amber-600">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill="currentColor" />
                          ))}
                        </div>
                        <span className="font-serif text-sm text-walnut font-semibold">Devashish Roy</span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-sans">
                          Verified Buyer
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-400 font-mono">1 month ago</span>
                    </div>
                    <p className="text-xs text-charcoal/80 font-sans leading-relaxed">
                      "Sturdy, timeless and authentic. We have paired this in our living room and it immediately added grounded warmth to the space. Proud to support real Maharashtra artisans."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 7. "YOU MAY ALSO LIKE" RELATED PRODUCTS CAROUSEL */}
        <section className="mt-20 select-none">
          <div className="border-b border-walnut/15 pb-4">
            <span className="eyebrow">COMPLEMENTARY PIECES</span>
            <h2 className="display text-3xl sm:text-4xl text-walnut mt-1">
              You May Also Like
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
                wished={wishlist.includes(relProduct.id)}
                onWishlist={onWishlist}
                onAdd={onAdd}
              />
            ))}
          </div>
        </section>
      </main>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-walnut text-offwhite px-5 py-4 rounded-[2px] shadow-warm-lg border border-brass/30 flex items-center gap-3 animate-fadeIn max-w-sm">
          <Check size={18} className="text-brass-light shrink-0" />
          <div className="text-xs font-sans">
            <p className="font-medium text-white">{toastMessage}</p>
            <Link to="/cart" className="text-brass-light font-semibold hover:underline block mt-0.5">
              View Bag &amp; Checkout &rarr;
            </Link>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 text-white/60 hover:text-white ml-2"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
