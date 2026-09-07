import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  Heart,
  User,
  Phone,
  Truck,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Sparkles,
  MapPin,
  ExternalLink
} from "lucide-react";
import SafeImage from "./SafeImage";
import DiscountBadge from "./DiscountBadge";

// Mega-Menu Category Data with Subcategories and Promo Image Slots
export const megaMenuData = [
  {
    id: "sofas",
    title: "Sofas",
    path: "/shop?category=Sofas",
    columns: [
      {
        heading: "By Seating Type",
        items: [
          { name: "3-Seater Sofas", path: "/shop?category=Sofas" },
          { name: "2-Seater Loveseats", path: "/shop?category=Sofas" },
          { name: "L-Shaped Sectionals", path: "/shop?category=Sofas" },
          { name: "Daybeds & Divans", path: "/shop?category=Sofas" },
          { name: "Recliners & Chaise", path: "/shop?category=Sofas" }
        ]
      },
      {
        heading: "Artisan Materials",
        items: [
          { name: "Seasoned Teak Wood", path: "/shop?category=Sofas" },
          { name: "Konkan Cane & Wicker", path: "/shop?category=Sofas" },
          { name: "Pure Linen Upholstery", path: "/shop?category=Sofas" },
          { name: "Handloom Cotton Weaves", path: "/shop?category=Sofas" }
        ]
      },
      {
        heading: "Curated Collections",
        items: [
          { name: "Ganpatipule Heritage", path: "/shop?category=Sofas" },
          { name: "Coastal Veranda Lounge", path: "/shop?category=Sofas" },
          { name: "Minimalist Japandi-Konkan", path: "/shop?category=Sofas" },
          { name: "New Workshop Arrivals", path: "/shop?category=Sofas" }
        ]
      }
    ],
    promo: {
      image: "/images/categories/mega-sofas.jpg",
      dimensions: "320x220px",
      badge: "LIMITED CRAFT",
      title: "Aarambh Olive Teak & Cane Sofa",
      subtitle: "Solid teak frame with hand-woven cane & olive linen weave",
      link: "/product/11"
    }
  },
  {
    id: "living",
    title: "Living",
    path: "/shop?category=Living",
    columns: [
      {
        heading: "Tables & Consoles",
        items: [
          { name: "Carved Coffee Tables", path: "/shop?category=Living" },
          { name: "Console & Entryway Tables", path: "/shop?category=Living" },
          { name: "Nest of Wooden Tables", path: "/shop?category=Living" },
          { name: "Side & Lamp Tables", path: "/shop?category=Living" }
        ]
      },
      {
        heading: "Lounge Seating",
        items: [
          { name: "Accent Armchairs", path: "/shop?category=Living" },
          { name: "Upholstered Ottomans", path: "/shop?category=Living" },
          { name: "Low Wooden Stools", path: "/shop?category=Living" },
          { name: "Traditional Rocking Chairs", path: "/shop?category=Living" }
        ]
      },
      {
        heading: "Room Accents",
        items: [
          { name: "Brass & Glass Sconces", path: "/shop?category=Living" },
          { name: "Hand-knotted Dhurries", path: "/shop?category=Living" },
          { name: "Cane Room Dividers", path: "/shop?category=Living" },
          { name: "Embroidered Bolsters", path: "/shop?category=Living" }
        ]
      }
    ],
    promo: {
      image: "/images/categories/mega-living.jpg",
      dimensions: "320x220px",
      badge: "BESTSELLER",
      title: "Sylvan Ribbed Linen Lounge Suite",
      subtitle: "Contemporary fluted upholstery with woven cane table",
      link: "/product/12"
    }
  },
  {
    id: "bedroom",
    title: "Bedroom",
    path: "/shop?category=Bedroom",
    columns: [
      {
        heading: "Beds & Bedframes",
        items: [
          { name: "King Size Timber Beds", path: "/shop?category=Bedroom" },
          { name: "Queen Platform Beds", path: "/shop?category=Bedroom" },
          { name: "Four-Poster Heritage Beds", path: "/shop?category=Bedroom" },
          { name: "Hydraulic Storage Beds", path: "/shop?category=Bedroom" }
        ]
      },
      {
        heading: "Bedside & Dressing",
        items: [
          { name: "Bedside Nightstands", path: "/shop?category=Bedroom" },
          { name: "Dressing Mirrors", path: "/shop?category=Bedroom" },
          { name: "Upholstered Bed Benches", path: "/shop?category=Bedroom" },
          { name: "Solid Teak Wardrobes", path: "/shop?category=Bedroom" }
        ]
      },
      {
        heading: "Artisanal Bedding",
        items: [
          { name: "Hand-Block Printed Quilts", path: "/shop?category=Bedroom" },
          { name: "Mulmul Cotton Dohars", path: "/shop?category=Bedroom" },
          { name: "Crisp Linen Bedcovers", path: "/shop?category=Bedroom" },
          { name: "Natural Fibre Pillows", path: "/shop?category=Bedroom" }
        ]
      }
    ],
    promo: {
      image: "/images/categories/mega-bedroom.jpg",
      dimensions: "320x220px",
      badge: "ARTISAN FAVORITE",
      title: "Ganpatipule Platform Bed",
      subtitle: "Low-profile silhouette in warm walnut oil finish",
      link: "/shop?category=Bedroom"
    }
  },
  {
    id: "dining",
    title: "Dining",
    path: "/shop?category=Dining",
    columns: [
      {
        heading: "Dining Sets & Tables",
        items: [
          { name: "6-Seater Feast Tables", path: "/shop?category=Dining" },
          { name: "4-Seater Family Tables", path: "/shop?category=Dining" },
          { name: "Round Pedestal Tables", path: "/shop?category=Dining" },
          { name: "Balcony Bistro Tables", path: "/shop?category=Dining" }
        ]
      },
      {
        heading: "Dining Chairs & Benches",
        items: [
          { name: "Cane Back Dining Chairs", path: "/shop?category=Dining" },
          { name: "Solid Teak Dining Benches", path: "/shop?category=Dining" },
          { name: "Upholstered Carver Chairs", path: "/shop?category=Dining" },
          { name: "Counter & Bar Stools", path: "/shop?category=Dining" }
        ]
      },
      {
        heading: "Karigari Tableware",
        items: [
          { name: "Handcrafted Ceramic Bowls", path: "/shop?category=Dining" },
          { name: "Terracotta Water Jugs", path: "/shop?category=Dining" },
          { name: "Teak Serving Platters", path: "/shop?category=Dining" },
          { name: "Woven Linen Placemats", path: "/shop?category=Dining" }
        ]
      }
    ],
    promo: {
      image: "/images/categories/mega-dining.jpg",
      dimensions: "320x220px",
      badge: "SOLID TIMBER",
      title: "Artisan Feast Table",
      subtitle: "Comfortably seats eight with heirloom joinery",
      link: "/shop?category=Dining"
    }
  },
  {
    id: "storage",
    title: "Storage",
    path: "/shop?category=Storage",
    columns: [
      {
        heading: "Display & Sideboards",
        items: [
          { name: "Fluted Glass Crockery Units", path: "/shop?category=Storage" },
          { name: "Carved Dining Sideboards", path: "/shop?category=Storage" },
          { name: "Heritage Bar Cabinets", path: "/shop?category=Storage" },
          { name: "Low TV & Media Consoles", path: "/shop?category=Storage" }
        ]
      },
      {
        heading: "Wardrobes & Drawers",
        items: [
          { name: "2 & 3-Door Teak Armoires", path: "/shop?category=Storage" },
          { name: "Chest of 5 Drawers", path: "/shop?category=Storage" },
          { name: "Shoe & Entryway Cabinets", path: "/shop?category=Storage" },
          { name: "Linen Keepsake Chests", path: "/shop?category=Storage" }
        ]
      },
      {
        heading: "Shelving & Organizers",
        items: [
          { name: "Open Wood Bookshelves", path: "/shop?category=Storage" },
          { name: "Brass-Braced Wall Shelves", path: "/shop?category=Storage" },
          { name: "Woven Jute Baskets", path: "/shop?category=Storage" },
          { name: "Handmade Trunks", path: "/shop?category=Storage" }
        ]
      }
    ],
    promo: {
      image: "/images/categories/mega-storage.jpg",
      dimensions: "320x220px",
      badge: "HEIRLOOM PIECE",
      title: "Archway Crockery Unit",
      subtitle: "With hand-cast antique brass latches",
      link: "/shop?category=Storage"
    }
  },
  {
    id: "decor",
    title: "Decor & Furnishing",
    path: "/shop?category=Decor%20%26%20Furnishing",
    columns: [
      {
        heading: "Wall Art & Hangings",
        items: [
          { name: "Konkan Folk Wall Art", path: "/shop?category=Wall%20Hangings" },
          { name: "Hand-Carved Wall Panels", path: "/shop?category=Wall%20Hangings" },
          { name: "Terracotta Statement Mirrors", path: "/shop?category=Special%20Creations" },
          { name: "Sculpted Peacock Plaques", path: "/shop?category=Wall%20Hangings" }
        ]
      },
      {
        heading: "Sculptures & Tabletop",
        items: [
          { name: "Artisan Elephant Statues", path: "/shop?category=Tabletop%20Decor" },
          { name: "Ceramic Pottery Urns", path: "/shop?category=Tabletop%20Decor" },
          { name: "Coastal Village Magnets", path: "/shop?category=Magnets" },
          { name: "Balcony Sun Tiles", path: "/shop?category=Outdoor%20Decor" }
        ]
      },
      {
        heading: "Soft Home Furnishings",
        items: [
          { name: "Handloom Cushion Covers", path: "/shop?category=Decor%20%26%20Furnishing" },
          { name: "Block-Printed Drapes", path: "/shop?category=Decor%20%26%20Furnishing" },
          { name: "Natural Fibre Table Runners", path: "/shop?category=Decor%20%26%20Furnishing" },
          { name: "Brass Incense Burners", path: "/shop?category=Decor%20%26%20Furnishing" }
        ]
      }
    ],
    promo: {
      image: "/images/categories/mega-decor.jpg",
      dimensions: "320x220px",
      badge: "KONKAN KARIGARI",
      title: "Royal Etched Vintage Urli Planters",
      subtitle: "Studded metal planters crafted with chevron motifs",
      link: "/product/14"
    }
  }
];

export default function Navbar({ cartCount = 0, wishlistCount = 1 }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [trackOrderInput, setTrackOrderInput] = useState("");
  const [trackStatusResult, setTrackStatusResult] = useState(null);
  
  const navRef = useRef(null);
  const navigate = useNavigate();

  // Scroll detection for sticky header shadow and backdrop
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mega-menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveMega(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileOpen(false);
      setActiveMega(null);
    }
  };

  const handleTrackOrderSubmit = (e) => {
    e.preventDefault();
    if (trackOrderInput.trim()) {
      setTrackStatusResult({
        orderId: trackOrderInput.trim().toUpperCase(),
        status: "In Transit — White Glove Delivery",
        eta: "2-3 business days",
        carrier: "Blue Dart Handcrafted Express",
        origin: "Ganpatipule Workshop, Maharashtra"
      });
    }
  };

  return (
    <>
      {/* 1. TOP UTILITY BAR (Desktop Only) */}
      <div className="hidden lg:block bg-[#201511] text-offwhite/85 text-[11px] font-sans border-b border-white/10 select-none">
        <div className="container-page flex h-9 items-center justify-between">
          {/* Left: Contact Hotline */}
          <div className="flex items-center gap-6">
            <a
              href="tel:+919988776655"
              className="flex items-center gap-1.5 hover:text-brass-light transition"
            >
              <Phone size={12} className="text-brass-light" />
              <span>Helpline: +91 99887 76655 (9am – 7pm IST)</span>
            </a>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-1.5 text-offwhite/70">
              <MapPin size={12} className="text-brass-light" />
              <span>Studio: Ganpatipule, Maharashtra</span>
            </div>
          </div>

          {/* Center Announcement */}
          <div className="flex items-center gap-2">
            <span className="text-brass-light font-semibold tracking-wider uppercase text-[9px] bg-white/10 px-2 py-0.5 rounded-sm">
              Craft Privilege
            </span>
            <span className="text-offwhite/90">
              Complimentary White-Glove Installation on Orders Above ₹10,000
            </span>
          </div>

          {/* Right: Quick Action Links */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setTrackModalOpen(true)}
              className="flex items-center gap-1 hover:text-brass-light transition"
            >
              <Truck size={12} className="text-brass-light" />
              <span>Track Order</span>
            </button>
            <span className="text-white/20">|</span>
            <Link
              to="/contact"
              className="flex items-center gap-1 hover:text-brass-light transition"
            >
              <HelpCircle size={12} className="text-brass-light" />
              <span>Help Center</span>
            </Link>
            <span className="text-white/20">|</span>
            <span className="font-mono text-[10px] text-brass-light font-semibold">
              INR (₹)
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN STICKY HEADER */}
      <header
        ref={navRef}
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-offwhite/95 backdrop-blur-md shadow-warm-md border-b border-beige-border"
            : "bg-offwhite border-b border-beige-border/60"
        }`}
      >
        {/* Main Header Row: Logo, Search Bar, Account & Cart Icons */}
        <div className="container-page flex h-20 items-center justify-between gap-4 lg:gap-8">
          
          {/* Mobile Hamburger & Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-walnut hover:text-terracotta transition focus:outline-none"
              aria-label="Open Mobile Menu"
            >
              <Menu size={24} />
            </button>

            {/* Brand Logo with SafeImage Local Reference */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="h-10 sm:h-12 w-auto max-w-[200px] flex items-center justify-center overflow-hidden">
                <SafeImage
                  src="/images/logo/logo.png"
                  dimensions="240x60px"
                  label="logo.png"
                  alt="Malhar Handcrafted Home Decor"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
              <div className="hidden sm:block leading-tight">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.14em] text-walnut block group-hover:text-terracotta transition">
                  MALHAR
                </span>
                <span className="text-[8px] font-sans tracking-[0.26em] uppercase text-walnut-muted block">
                  KONKAN KARIGARI
                </span>
              </div>
            </Link>
          </div>

          {/* Search Bar (Desktop & Tablet) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-2 lg:mx-6">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search handcrafted sofas, wall art, dining tables, urns..."
                className="w-full bg-beige-light/70 border border-beige-border focus:border-walnut px-4 py-2.5 pl-10 pr-24 text-xs font-sans text-charcoal placeholder-charcoal/45 rounded-[2px] outline-none transition-all focus:bg-white focus:shadow-warm-sm"
              />
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-walnut/50 pointer-events-none"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-walnut text-offwhite text-[10px] font-sans font-semibold tracking-wider uppercase px-3 py-1.5 rounded-[1px] hover:bg-terracotta transition"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right Icons: Profile, Wishlist, Cart */}
          <div className="flex items-center gap-3 sm:gap-5 text-walnut">
            {/* Track Order Mobile Icon */}
            <button
              onClick={() => setTrackModalOpen(true)}
              className="lg:hidden p-1.5 text-walnut/75 hover:text-terracotta transition"
              title="Track Order"
            >
              <Truck size={20} />
            </button>

            {/* Profile Icon */}
            <div className="relative group">
              <button
                className="flex items-center gap-1.5 p-1.5 hover:text-terracotta transition"
                title="Account & Profile"
              >
                <div className="w-8 h-8 rounded-full bg-beige-light border border-beige-border flex items-center justify-center text-walnut group-hover:border-walnut transition">
                  <User size={16} />
                </div>
                <span className="hidden xl:inline text-xs font-sans font-medium text-walnut/80">
                  Account
                </span>
              </button>
              {/* Profile Tooltip / Quick Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-beige-border shadow-warm-md rounded-[2px] p-3 hidden group-hover:block animate-fadeIn z-50">
                <p className="font-serif text-sm text-walnut font-medium">Welcome to Malhar</p>
                <p className="text-[10px] text-charcoal/60 font-sans mt-0.5">Craft patron portal</p>
                <div className="mt-3 pt-2 border-t border-neutral-100 space-y-1.5 text-xs font-sans">
                  <button
                    onClick={() => setTrackModalOpen(true)}
                    className="block w-full text-left py-1 text-charcoal/80 hover:text-terracotta"
                  >
                    Track Orders
                  </button>
                  <Link to="/contact" className="block py-1 text-charcoal/80 hover:text-terracotta">
                    Help & Custom Requests
                  </Link>
                  <Link to="/style-guide" className="block py-1 text-terracotta font-medium">
                    Design System Guide
                  </Link>
                </div>
              </div>
            </div>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative flex items-center gap-1.5 p-1.5 hover:text-terracotta transition"
              title="Wishlist"
            >
              <div className="w-8 h-8 rounded-full bg-beige-light border border-beige-border flex items-center justify-center text-walnut hover:border-walnut transition relative">
                <Heart size={16} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-terracotta text-white text-[9px] font-sans font-bold flex items-center justify-center shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="hidden xl:inline text-xs font-sans font-medium text-walnut/80">
                Wishlist
              </span>
            </Link>

            {/* Cart Icon with Dummy Badge */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 p-1.5 hover:text-terracotta transition"
              title="Cart"
            >
              <div className="w-8 h-8 rounded-full bg-walnut text-offwhite flex items-center justify-center relative hover:bg-terracotta transition shadow-warm-sm">
                <ShoppingBag size={16} />
                <span className="absolute -top-1 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-terracotta text-white text-[9px] font-sans font-bold flex items-center justify-center px-1 shadow-sm border border-offwhite">
                  {cartCount}
                </span>
              </div>
              <span className="hidden xl:inline text-xs font-sans font-medium text-walnut/80">
                Bag ({cartCount})
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar (under row on small screens) */}
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search handcrafted furniture & decor..."
              className="w-full bg-beige-light/70 border border-beige-border focus:border-walnut px-3 py-2 pl-9 pr-16 text-xs font-sans text-charcoal rounded-[2px] outline-none"
            />
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-walnut/50"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-walnut text-white text-[9px] font-semibold uppercase px-2.5 py-1 rounded-[1px]"
            >
              Search
            </button>
          </form>
        </div>

        {/* 3. DESKTOP MEGA-MENU NAVIGATION BAR */}
        <nav className="hidden lg:block border-t border-beige-border/70 bg-offwhite">
          <div className="container-page flex items-center justify-between">
            <ul className="flex items-center gap-1 xl:gap-2">
              {megaMenuData.map((cat) => {
                const isActive = activeMega === cat.id;
                return (
                  <li
                    key={cat.id}
                    className="relative"
                    onMouseEnter={() => setActiveMega(cat.id)}
                  >
                    <button
                      onClick={() => setActiveMega(isActive ? null : cat.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-3 text-[11px] font-sans font-semibold tracking-[0.14em] uppercase transition border-b-2 ${
                        isActive
                          ? "text-terracotta border-terracotta"
                          : "text-walnut/80 border-transparent hover:text-walnut hover:border-walnut/30"
                      }`}
                    >
                      <span>{cat.title}</span>
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${
                          isActive ? "rotate-180 text-terracotta" : "opacity-50"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}

              {/* Extra Editorial Navigation Links */}
              <li>
                <NavLink
                  to="/our-story"
                  className={({ isActive }) =>
                    `block px-3.5 py-3 text-[11px] font-sans font-semibold tracking-[0.14em] uppercase transition border-b-2 ${
                      isActive
                        ? "text-terracotta border-terracotta"
                        : "text-walnut/80 border-transparent hover:text-walnut hover:border-walnut/30"
                    }`
                  }
                >
                  Our Story
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/style-guide"
                  className={({ isActive }) =>
                    `flex items-center gap-1 px-3.5 py-3 text-[11px] font-sans font-semibold tracking-[0.14em] uppercase transition border-b-2 ${
                      isActive
                        ? "text-terracotta border-terracotta"
                        : "text-walnut/80 border-transparent hover:text-walnut hover:border-walnut/30"
                    }`
                  }
                >
                  <Sparkles size={11} className="text-terracotta" />
                  <span>Style Guide</span>
                </NavLink>
              </li>
            </ul>

            {/* Special Highlight on Right */}
            <Link
              to="/shop?category=Special%20Creations"
              className="flex items-center gap-1.5 text-[10px] font-sans font-semibold tracking-[0.18em] uppercase text-terracotta hover:text-walnut transition"
            >
              <span>Explore Karigari Atelier</span>
              <ChevronRight size={13} />
            </Link>
          </div>

          {/* MEGA MENU FULL-WIDTH FLYOUT PANEL */}
          {activeMega && (
            <div
              onMouseLeave={() => setActiveMega(null)}
              className="absolute left-0 right-0 top-full bg-white shadow-warm-lg border-b border-beige-border animate-fadeIn z-40"
            >
              {(() => {
                const current = megaMenuData.find((m) => m.id === activeMega);
                if (!current) return null;

                return (
                  <div className="container-page py-8">
                    <div className="grid grid-cols-12 gap-8">
                      {/* Subcategory Columns (9 of 12 cols) */}
                      <div className="col-span-8 lg:col-span-9 grid grid-cols-3 gap-6">
                        {current.columns.map((col, idx) => (
                          <div key={idx} className="space-y-3">
                            <h4 className="font-serif text-sm font-semibold text-walnut uppercase tracking-wider pb-1.5 border-b border-neutral-100">
                              {col.heading}
                            </h4>
                            <ul className="space-y-2">
                              {col.items.map((sub, sIdx) => (
                                <li key={sIdx}>
                                  <Link
                                    to={sub.path}
                                    onClick={() => setActiveMega(null)}
                                    className="text-xs font-sans text-charcoal/75 hover:text-terracotta hover:translate-x-0.5 transition-all inline-block"
                                  >
                                    {sub.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Promo Image Card Slot (3 of 12 cols) */}
                      <div className="col-span-4 lg:col-span-3 bg-beige-light/50 p-4 border border-beige-border/80 rounded-[2px] flex flex-col justify-between group">
                        <div>
                          <div className="relative aspect-[4/3] w-full overflow-hidden bg-beige border border-neutral-200">
                            <SafeImage
                              src={current.promo.image}
                              dimensions={current.promo.dimensions}
                              alt={current.promo.title}
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-2 left-2">
                              <DiscountBadge discount={current.promo.badge} variant="terracotta" size="sm" />
                            </div>
                          </div>
                          <h5 className="font-serif text-base text-walnut font-medium mt-3 leading-snug">
                            {current.promo.title}
                          </h5>
                          <p className="text-[11px] font-sans text-charcoal/70 mt-1 leading-relaxed">
                            {current.promo.subtitle}
                          </p>
                        </div>
                        <Link
                          to={current.promo.link}
                          onClick={() => setActiveMega(null)}
                          className="mt-4 inline-flex items-center gap-1 text-[10px] font-sans font-semibold tracking-widest text-terracotta uppercase hover:text-walnut transition"
                        >
                          <span>Explore Collection</span>
                          <ChevronRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </nav>
      </header>

      {/* 4. MOBILE HAMBURGER ACCORDION DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop overlay */}
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
          />

          {/* Slide-out Drawer */}
          <aside className="relative w-4/5 max-w-sm bg-offwhite h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 border-b border-beige-border flex items-center justify-between bg-walnut text-white">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-widest text-white">
                  MALHAR
                </span>
                <span className="text-[8px] tracking-widest text-brass-light uppercase">
                  HOME DECOR
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 text-white/80 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Accordion Categories */}
            <div className="p-4 flex-1 space-y-1">
              <p className="eyebrow text-terracotta text-[9px] mb-2 px-2">DEPARTMENTS</p>

              {megaMenuData.map((cat) => {
                const isOpen = mobileAccordion === cat.id;
                return (
                  <div key={cat.id} className="border-b border-neutral-200/60 pb-1">
                    <button
                      onClick={() => setMobileAccordion(isOpen ? null : cat.id)}
                      className="w-full flex items-center justify-between py-2.5 px-2 text-left font-serif text-base text-walnut font-medium hover:text-terracotta transition"
                    >
                      <span>{cat.title}</span>
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-terracotta" : "text-neutral-400"
                        }`}
                      />
                    </button>

                    {/* Accordion Content */}
                    {isOpen && (
                      <div className="pl-4 pr-2 pb-3 space-y-3 bg-beige-light/40 rounded-sm pt-2 animate-fadeIn">
                        {cat.columns.map((col, cIdx) => (
                          <div key={cIdx} className="space-y-1">
                            <p className="text-[10px] font-sans font-semibold tracking-wider text-walnut-muted uppercase">
                              {col.heading}
                            </p>
                            <ul className="space-y-1 pl-2">
                              {col.items.map((item, iIdx) => (
                                <li key={iIdx}>
                                  <Link
                                    to={item.path}
                                    onClick={() => setMobileOpen(false)}
                                    className="block text-xs font-sans text-charcoal/80 py-0.5 hover:text-terracotta"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}

                        {/* Mobile Promo Box */}
                        <div className="mt-3 p-2 bg-white border border-beige-border rounded">
                          <p className="text-[9px] font-mono text-neutral-500 uppercase">
                            Featured: {cat.promo.title}
                          </p>
                          <Link
                            to={cat.promo.link}
                            onClick={() => setMobileOpen(false)}
                            className="text-xs font-sans text-terracotta font-semibold mt-1 inline-block"
                          >
                            Shop {cat.title} Collection &rarr;
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Extra Mobile Links */}
              <div className="pt-4 space-y-2 border-t border-neutral-200">
                <div className="grid grid-cols-2 gap-2 pb-2">
                  <Link
                    to="/wishlist"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 p-2.5 bg-beige-light/70 border border-beige-border text-xs font-sans font-medium text-walnut rounded-[1px] hover:border-walnut transition"
                  >
                    <Heart size={14} className="text-terracotta" />
                    <span>Wishlist ({wishlistCount})</span>
                  </Link>
                  <Link
                    to="/cart"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 p-2.5 bg-walnut text-offwhite text-xs font-sans font-medium rounded-[1px] hover:bg-terracotta transition"
                  >
                    <ShoppingBag size={14} />
                    <span>Bag ({cartCount})</span>
                  </Link>
                </div>
                <Link
                  to="/our-story"
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 px-2 font-serif text-base text-walnut hover:text-terracotta"
                >
                  Our Story & Karigari
                </Link>
                <Link
                  to="/style-guide"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-1.5 py-2 px-2 font-serif text-base text-walnut hover:text-terracotta"
                >
                  <Sparkles size={14} className="text-terracotta" />
                  <span>Design System Guide</span>
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 px-2 font-serif text-base text-walnut hover:text-terracotta"
                >
                  Contact & Atelier Studio
                </Link>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 bg-beige-light border-t border-beige-border space-y-3">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setTrackModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 btn-secondary py-2.5 text-[10px]"
              >
                <Truck size={14} /> TRACK YOUR ORDER
              </button>

              <a
                href="https://wa.me/919988776655"
                className="w-full flex items-center justify-center gap-2 bg-[#1E3025] text-white py-2.5 text-[10px] tracking-wider uppercase font-semibold rounded-[2px]"
              >
                WHATSAPP ARTISAN SUPPORT
              </a>
            </div>
          </aside>
        </div>
      )}

      {/* TRACK ORDER MODAL */}
      {trackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-[2px] shadow-warm-lg border border-beige-border p-6 relative">
            <button
              onClick={() => {
                setTrackModalOpen(false);
                setTrackStatusResult(null);
              }}
              className="absolute top-4 right-4 p-1 text-charcoal/60 hover:text-walnut"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 text-terracotta">
              <Truck size={20} />
              <span className="eyebrow text-terracotta">White-Glove Delivery</span>
            </div>
            <h3 className="font-serif text-2xl text-walnut mt-1">Track Your Order</h3>
            <p className="text-xs text-charcoal/70 font-sans mt-1">
              Enter your Order Number or Tracking AWB from your SMS/Email.
            </p>

            <form onSubmit={handleTrackOrderSubmit} className="mt-5 space-y-3">
              <input
                type="text"
                value={trackOrderInput}
                onChange={(e) => setTrackOrderInput(e.target.value)}
                placeholder="e.g. MLH-84920 or BDT-402910"
                className="w-full border border-beige-border px-3 py-2.5 text-xs font-mono uppercase text-charcoal rounded-[2px] outline-none focus:border-walnut"
                required
              />
              <button type="submit" className="w-full btn-primary py-2.5 text-[10px]">
                CHECK SHIPMENT STATUS &rarr;
              </button>
            </form>

            {/* Live Sample Status Result */}
            {trackStatusResult && (
              <div className="mt-5 p-4 bg-offwhite border border-beige-border rounded-[2px] text-xs font-sans space-y-2">
                <div className="flex justify-between items-baseline border-b border-neutral-200 pb-2">
                  <span className="font-mono text-walnut font-bold">{trackStatusResult.orderId}</span>
                  <span className="badge-discount text-[9px]">Active</span>
                </div>
                <p className="text-charcoal font-semibold text-sm">{trackStatusResult.status}</p>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-charcoal/70 pt-1">
                  <div>
                    <span className="block text-neutral-400">Carrier:</span>
                    <span>{trackStatusResult.carrier}</span>
                  </div>
                  <div>
                    <span className="block text-neutral-400">Estimated Delivery:</span>
                    <span className="text-walnut font-semibold">{trackStatusResult.eta}</span>
                  </div>
                </div>
                <p className="text-[10px] text-neutral-400 pt-1">Dispatched from {trackStatusResult.origin}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
