import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Filter,
  X,
  ChevronDown,
  ChevronRight,
  Grid,
  List,
  SlidersHorizontal,
  RotateCcw,
  Star,
  Sparkles,
  Check,
  ShoppingBag,
  Heart
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import SafeImage from "../components/SafeImage";
import DiscountBadge from "../components/DiscountBadge";
import { products, categories, formatPrice } from "../data/products";

export default function Shop({ wishlist = [], onWishlist, onAdd }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query parameter sync
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";
  const initialMaxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : null;
  const initialMinPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : null;

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(initialMaxPrice || 50000);
  const [minPrice, setMinPrice] = useState(initialMinPrice || 0);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [minRating, setMinRating] = useState(0);

  // Layout & Sorting States
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [seoExpanded, setSeoExpanded] = useState(false);

  // Sync state if URL query params change (e.g. from header mega-menu click)
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
    const maxP = searchParams.get("maxPrice");
    if (maxP) setPriceRange(Number(maxP));
    const minP = searchParams.get("minPrice");
    if (minP) setMinPrice(Number(minP));
  }, [searchParams]);

  // Filter option presets
  const materialOptions = [
    "Seasoned Teak",
    "Natural Cane",
    "Terracotta Clay",
    "Pure Linen",
    "Brass Inlay"
  ];

  const colorOptions = [
    { name: "Walnut Brown", hex: "#2C1E18" },
    { name: "Warm Beige", hex: "#E5DDD0" },
    { name: "Terracotta", hex: "#A85C3A" },
    { name: "Chalk White", hex: "#F5F2EB" },
    { name: "Forest Jade", hex: "#3B533E" },
    { name: "Charcoal", hex: "#1D1B1A" }
  ];

  const collectionOptions = [
    "Malhar Atelier",
    "Ganpatipule Heritage",
    "Coastal Veranda",
    "Karigari Special"
  ];

  // Toggle Handlers
  const toggleMaterial = (mat) => {
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    );
  };

  const toggleColor = (colName) => {
    setSelectedColors((prev) =>
      prev.includes(colName) ? prev.filter((c) => c !== colName) : [...prev, colName]
    );
  };

  const toggleCollection = (col) => {
    setSelectedCollections((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setPriceRange(50000);
    setMinPrice(0);
    setSelectedMaterials([]);
    setSelectedColors([]);
    setSelectedCollections([]);
    setMinRating(0);
    setSearchParams({});
  };

  // Active filter count
  const activeFilterCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (priceRange < 50000 || minPrice > 0 ? 1 : 0) +
    selectedMaterials.length +
    selectedColors.length +
    selectedCollections.length +
    (minRating > 0 ? 1 : 0);

  // Dynamic Filtering Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category Filter
        if (selectedCategory !== "All" && p.category !== selectedCategory) {
          return false;
        }
        // Search Query Filter
        if (initialSearch && !p.name.toLowerCase().includes(initialSearch.toLowerCase()) && !p.category.toLowerCase().includes(initialSearch.toLowerCase())) {
          return false;
        }
        // Price Filter
        if (p.price > priceRange || p.price < minPrice) {
          return false;
        }
        // Material Filter
        if (selectedMaterials.length > 0 && !selectedMaterials.includes(p.material)) {
          return false;
        }
        // Color Filter
        if (selectedColors.length > 0 && !selectedColors.includes(p.color)) {
          return false;
        }
        // Collection Filter
        if (selectedCollections.length > 0 && !selectedCollections.includes(p.collection)) {
          return false;
        }
        // Rating Filter
        if (minRating > 0 && p.rating < minRating) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "newest") return b.id - a.id;
        return 0; // "featured" keeps catalog order
      });
  }, [
    selectedCategory,
    initialSearch,
    priceRange,
    minPrice,
    selectedMaterials,
    selectedColors,
    selectedCollections,
    minRating,
    sortBy
  ]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-offwhite text-charcoal select-none pb-24">
      {/* 1. BREADCRUMB STRIP */}
      <div className="bg-white border-b border-beige-border/80 py-3 text-xs font-sans">
        <div className="container-page flex items-center gap-2 text-charcoal/60">
          <Link to="/" className="hover:text-walnut transition">
            Home
          </Link>
          <ChevronRight size={13} className="text-neutral-400" />
          <Link to="/home-decor" className="hover:text-walnut transition">
            Home Decor
          </Link>
          {selectedCategory !== "All" && (
            <>
              <ChevronRight size={13} className="text-neutral-400" />
              <span className="font-semibold text-walnut">{selectedCategory}</span>
            </>
          )}
        </div>
      </div>

      {/* Hero Category Header */}
      <div className="container-page pt-8 pb-6">
        <div className="max-w-3xl">
          <span className="eyebrow">HANDMADE LIVING ARCHIVE</span>
          <h1 className="display text-4xl sm:text-6xl text-walnut mt-1">
            {selectedCategory === "All" ? "Home Decor & Furniture" : selectedCategory}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-charcoal/70 font-sans leading-relaxed">
            Crafted patiently in our Ganpatipule atelier using kiln-seasoned teak, handwoven natural cane, terracotta, and mineral glazes.
          </p>
        </div>
      </div>

      <div className="container-page">
        {/* 3. TOP BAR: RESULT COUNT, SORT DROPDOWN, VIEW TOGGLE, MOBILE FILTER TRIGGER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-beige-border/80 bg-white px-4 rounded-[2px] shadow-warm-sm">
          {/* Left: Result Count & Active Filter Indicator */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 btn-secondary py-2 px-3 text-[10px]"
            >
              <SlidersHorizontal size={14} />
              <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}</span>
            </button>

            <span className="text-xs font-sans text-charcoal/70">
              Showing <strong className="font-semibold text-walnut">{displayedProducts.length}</strong> of{" "}
              <strong className="font-semibold text-walnut">{filteredProducts.length}</strong> pieces
            </span>
          </div>

          {/* Right: Sort Dropdown & Grid/List Toggle */}
          <div className="flex items-center gap-4 justify-between sm:justify-end">
            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-xs font-sans text-neutral-500">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products"
                className="bg-offwhite border border-beige-border text-xs font-sans font-medium text-walnut px-3 py-1.5 rounded-[1px] outline-none focus:border-walnut cursor-pointer"
              >
                <option value="featured">Featured &amp; Curated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

            {/* Grid vs List Mode Toggle */}
            <div className="flex items-center border border-beige-border rounded-[2px] overflow-hidden bg-offwhite">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Grid View"
                className={`p-1.5 transition ${
                  viewMode === "grid"
                    ? "bg-walnut text-white"
                    : "text-neutral-500 hover:text-walnut"
                }`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                aria-label="List View"
                className={`p-1.5 transition ${
                  viewMode === "list"
                    ? "bg-walnut text-white"
                    : "text-neutral-500 hover:text-walnut"
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ACTIVE FILTER PILLS */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap py-3">
            <span className="text-[11px] font-sans text-neutral-500">Active Filters:</span>

            {selectedCategory !== "All" && (
              <span className="inline-flex items-center gap-1 bg-beige-light border border-beige-border px-2.5 py-1 text-[10px] font-sans font-medium rounded text-walnut">
                Category: {selectedCategory}
                <X size={12} className="cursor-pointer hover:text-terracotta" onClick={() => setSelectedCategory("All")} />
              </span>
            )}

            {(priceRange < 50000 || minPrice > 0) && (
              <span className="inline-flex items-center gap-1 bg-beige-light border border-beige-border px-2.5 py-1 text-[10px] font-sans font-medium rounded text-walnut">
                Price: {formatPrice(minPrice)} - {formatPrice(priceRange)}
                <X size={12} className="cursor-pointer hover:text-terracotta" onClick={() => { setPriceRange(50000); setMinPrice(0); }} />
              </span>
            )}

            {selectedMaterials.map((mat) => (
              <span key={mat} className="inline-flex items-center gap-1 bg-beige-light border border-beige-border px-2.5 py-1 text-[10px] font-sans font-medium rounded text-walnut">
                {mat}
                <X size={12} className="cursor-pointer hover:text-terracotta" onClick={() => toggleMaterial(mat)} />
              </span>
            ))}

            {selectedColors.map((col) => (
              <span key={col} className="inline-flex items-center gap-1 bg-beige-light border border-beige-border px-2.5 py-1 text-[10px] font-sans font-medium rounded text-walnut">
                {col}
                <X size={12} className="cursor-pointer hover:text-terracotta" onClick={() => toggleColor(col)} />
              </span>
            ))}

            {selectedCollections.map((col) => (
              <span key={col} className="inline-flex items-center gap-1 bg-beige-light border border-beige-border px-2.5 py-1 text-[10px] font-sans font-medium rounded text-walnut">
                {col}
                <X size={12} className="cursor-pointer hover:text-terracotta" onClick={() => toggleCollection(col)} />
              </span>
            ))}

            <button
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold text-terracotta hover:underline ml-2"
            >
              <RotateCcw size={12} /> Clear All
            </button>
          </div>
        )}

        {/* MAIN BODY: SIDEBAR + PRODUCT GRID */}
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-4 items-start">
          
          {/* 2. LEFT SIDEBAR FILTERS (DESKTOP) */}
          <aside className="hidden lg:block space-y-6 bg-white p-6 border border-beige-border/80 rounded-[2px] shadow-warm-sm sticky top-28">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-serif text-lg text-walnut font-medium">Filters</h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] font-sans text-terracotta hover:underline font-semibold"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Filter: Department / Category */}
            <div className="space-y-2 border-b border-neutral-100 pb-5">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-walnut block">
                Departments
              </span>
              <div className="space-y-1 text-xs font-sans">
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left py-1 flex items-center justify-between transition ${
                      selectedCategory === cat.name
                        ? "text-terracotta font-semibold"
                        : "text-charcoal/75 hover:text-walnut"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {selectedCategory === cat.name && <Check size={13} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter: Price Range */}
            <div className="space-y-3 border-b border-neutral-100 pb-5">
              <div className="flex items-center justify-between text-[11px] font-sans font-semibold uppercase tracking-wider text-walnut">
                <span>Max Price</span>
                <span className="font-mono text-terracotta">{formatPrice(priceRange)}</span>
              </div>
              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-walnut cursor-pointer"
              />
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                <span>₹500</span>
                <span>₹25,000</span>
                <span>₹50,000</span>
              </div>
            </div>

            {/* Filter: Material */}
            <div className="space-y-2 border-b border-neutral-100 pb-5">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-walnut block">
                Artisan Material
              </span>
              <div className="space-y-1.5 text-xs font-sans">
                {materialOptions.map((mat) => (
                  <label
                    key={mat}
                    className="flex items-center gap-2.5 text-charcoal/80 hover:text-walnut cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(mat)}
                      onChange={() => toggleMaterial(mat)}
                      className="rounded-[1px] accent-walnut"
                    />
                    <span>{mat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter: Color Swatches */}
            <div className="space-y-2.5 border-b border-neutral-100 pb-5">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-walnut block">
                Color Palette
              </span>
              <div className="flex items-center gap-2.5 flex-wrap">
                {colorOptions.map((c) => {
                  const isSelected = selectedColors.includes(c.name);
                  return (
                    <button
                      key={c.name}
                      onClick={() => toggleColor(c.name)}
                      title={c.name}
                      className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                        isSelected
                          ? "ring-2 ring-terracotta ring-offset-1 scale-110 border-transparent"
                          : "border-neutral-300 hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {isSelected && (
                        <Check
                          size={12}
                          className={c.name === "Chalk White" ? "text-walnut" : "text-white"}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter: Brand / Collection */}
            <div className="space-y-2">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-walnut block">
                Collection
              </span>
              <div className="space-y-1.5 text-xs font-sans">
                {collectionOptions.map((col) => (
                  <label
                    key={col}
                    className="flex items-center gap-2.5 text-charcoal/80 hover:text-walnut cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCollections.includes(col)}
                      onChange={() => toggleCollection(col)}
                      className="rounded-[1px] accent-walnut"
                    />
                    <span>{col}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* 4. RESPONSIVE PRODUCT GRID (4 COLS DESKTOP, 2 COLS MOBILE) */}
          <div className="lg:col-span-3">
            {displayedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white border border-beige-border rounded-[2px] p-8 space-y-4">
                <p className="font-serif text-3xl text-walnut">No creations match your filters.</p>
                <p className="text-xs text-charcoal/70 font-sans max-w-sm mx-auto">
                  Try clearing some filter criteria or selecting a different price range to view our handcrafted items.
                </p>
                <button onClick={clearAllFilters} className="btn-primary text-[10px]">
                  CLEAR ALL FILTERS
                </button>
              </div>
            ) : viewMode === "grid" ? (
              /* GRID VIEW: 4 COLS DESKTOP, 2 COLS MOBILE */
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                {displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    wished={wishlist.includes(product.id)}
                    onWishlist={onWishlist}
                    onAdd={onAdd}
                  />
                ))}
              </div>
            ) : (
              /* LIST VIEW */
              <div className="space-y-4">
                {displayedProducts.map((product) => (
                  <article
                    key={product.id}
                    className="flex flex-col sm:flex-row bg-white border border-beige-border/80 rounded-[2px] overflow-hidden shadow-warm-sm group"
                  >
                    <div className="sm:w-60 aspect-[4/3] sm:aspect-square shrink-0 overflow-hidden bg-beige-light relative">
                      {product.discount && (
                        <div className="absolute top-2.5 left-2.5 z-10">
                          <DiscountBadge discount={product.discount} size="sm" />
                        </div>
                      )}
                      <Link to={`/product/${product.id}`} className="block w-full h-full">
                        <SafeImage
                          src={product.image}
                          dimensions="600x600px"
                          alt={product.name}
                          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      </Link>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="eyebrow text-[9px]">{product.category}</span>
                          <button
                            onClick={() => onWishlist?.(product.id)}
                            className="text-neutral-400 hover:text-terracotta transition"
                            aria-label="Wishlist"
                          >
                            <Heart
                              size={16}
                              fill={wishlist.includes(product.id) ? "#A85C3A" : "none"}
                              stroke={wishlist.includes(product.id) ? "#A85C3A" : "currentColor"}
                            />
                          </button>
                        </div>
                        <Link
                          to={`/product/${product.id}`}
                          className="font-serif text-2xl text-walnut mt-1 block hover:text-terracotta transition"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs text-charcoal/75 font-sans mt-2 leading-relaxed line-clamp-2">
                          {product.description}
                        </p>
                        <div className="mt-3 flex items-center gap-4 text-[11px] font-sans text-charcoal/60">
                          <span>Material: <strong className="text-walnut">{product.material}</strong></span>
                          <span>•</span>
                          <span>Collection: <strong className="text-walnut">{product.collection}</strong></span>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-xl text-walnut font-medium">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs line-through text-neutral-400 font-sans">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => onAdd?.(product)}
                          className="btn-primary py-2 px-4 text-[10px]"
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* 5. LOAD MORE BUTTON / COUNTER */}
            {filteredProducts.length > visibleCount && (
              <div className="mt-12 text-center space-y-3">
                <p className="text-xs font-sans text-charcoal/60">
                  Showing {displayedProducts.length} of {filteredProducts.length} handcrafted pieces
                </p>
                <button
                  onClick={() => setVisibleCount((prev) => prev + 8)}
                  className="btn-secondary py-3 px-8 text-[11px]"
                >
                  LOAD MORE CREATIONS &rarr;
                </button>
              </div>
            )}
          </div>

        </div>

        {/* 6. SEO CONTENT BLOCK AT BOTTOM */}
        <section className="mt-24 pt-12 border-t border-beige-border bg-white p-8 sm:p-12 rounded-[2px] shadow-warm-sm">
          <div className="max-w-4xl space-y-4">
            <span className="eyebrow">ABOUT OUR CRAFT TRADITION</span>
            <h2 className="display text-2xl sm:text-4xl text-walnut">
              The Art of Handcrafted Indian Home Decor: Generational Karigari From the Konkan Coast
            </h2>
            
            <p className="text-xs sm:text-sm text-charcoal/80 font-sans leading-relaxed">
              At <strong>Malhar Handcrafted Home Decor</strong>, our mission is to revive and celebrate traditional Indian karigari through authentic, slow-made living artifacts. Every daybed, console, ceramic vessel, and carved wall panel in our catalog is created in small ateliers situated in Ganpatipule, Maharashtra. Unlike factory-stamped particle board furniture, our master carpenters work exclusively with 100% seasoned solid teakwood and kiln-dried timber, ensuring structural stability across varying humidities and seasons.
            </p>

            {seoExpanded && (
              <div className="space-y-4 pt-2 text-xs sm:text-sm text-charcoal/80 font-sans leading-relaxed animate-fadeIn">
                <h3 className="font-serif text-lg text-walnut font-semibold">
                  Why Seasoned Solid Teak &amp; Natural Cane Matter
                </h3>
                <p>
                  Solid teakwood is naturally rich in organic protective oils, conferring unparalleled resistance to moisture, termites, and warp. When paired with handwoven rattan cane, our daybeds and dining chairs provide breathable ergonomic support ideal for tropical and temperate climates alike. Each joint employs traditional mortise-and-tenon craftsmanship without exposed plastic fittings.
                </p>

                <h3 className="font-serif text-lg text-walnut font-semibold">
                  Wheel-Thrown Earthenware &amp; Mineral Pigments
                </h3>
                <p>
                  Our pottery collection is hand-thrown on potters' wheels using riverbed silt and terracotta clay from the Konkan coast. The pigments are derived from red laterite earth, turmeric, iron oxides, and natural plant resins, fired at high temperatures for durable daily use. No two pieces are strictly identical — subtle finger throwing rings and color variations are the authentic signature of human karigari.
                </p>
              </div>
            )}

            <button
              onClick={() => setSeoExpanded(!seoExpanded)}
              className="text-xs font-sans font-semibold tracking-wider text-terracotta uppercase hover:underline inline-block pt-2"
            >
              {seoExpanded ? "Read Less ↑" : "Read More About Our Craftsmanship ↓"}
            </button>
          </div>
        </section>

      </div>

      {/* MOBILE FILTER SLIDE-OUT DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <aside className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            <div className="p-4 border-b border-beige-border flex items-center justify-between bg-walnut text-white">
              <h3 className="font-serif text-lg font-medium">Filters ({activeFilterCount})</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-white/80 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 flex-1 space-y-6">
              {/* Mobile Departments */}
              <div className="space-y-2">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-walnut">
                  Department
                </span>
                <div className="space-y-1 text-xs font-sans">
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left py-1.5 flex items-center justify-between ${
                        selectedCategory === cat.name ? "text-terracotta font-semibold" : "text-charcoal/80"
                      }`}
                    >
                      <span>{cat.name}</span>
                      {selectedCategory === cat.name && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div className="space-y-2 border-t border-neutral-100 pt-4">
                <div className="flex justify-between text-xs font-sans">
                  <span>Max Price:</span>
                  <span className="font-mono text-terracotta font-semibold">{formatPrice(priceRange)}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-walnut"
                />
              </div>

              {/* Mobile Materials */}
              <div className="space-y-2 border-t border-neutral-100 pt-4">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-walnut block">
                  Material
                </span>
                <div className="space-y-1.5 text-xs font-sans">
                  {materialOptions.map((mat) => (
                    <label key={mat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(mat)}
                        onChange={() => toggleMaterial(mat)}
                        className="accent-walnut"
                      />
                      <span>{mat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Colors */}
              <div className="space-y-2 border-t border-neutral-100 pt-4">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-walnut block">
                  Color Swatches
                </span>
                <div className="flex items-center gap-3 flex-wrap">
                  {colorOptions.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => toggleColor(c.name)}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColors.includes(c.name) ? "ring-2 ring-terracotta ring-offset-1" : "border-neutral-300"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-beige-border bg-beige-light flex gap-2">
              <button
                onClick={clearAllFilters}
                className="flex-1 btn-secondary py-2.5 text-[10px]"
              >
                RESET
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 btn-primary py-2.5 text-[10px]"
              >
                APPLY ({filteredProducts.length})
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
