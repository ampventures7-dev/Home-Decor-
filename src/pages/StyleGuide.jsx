import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Check, 
  Copy, 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  Tag, 
  Layers, 
  Type, 
  Palette, 
  Square,
  Sliders
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import DiscountBadge from "../components/DiscountBadge";

export default function StyleGuide() {
  const [copiedColor, setCopiedColor] = useState(null);
  const [wishlistDemo, setWishlistDemo] = useState([1]);

  const copyHex = (hex, name) => {
    navigator.clipboard?.writeText(hex);
    setCopiedColor(name);
    setTimeout(() => setCopiedColor(null), 1800);
  };

  const colors = [
    {
      name: "Walnut Brown",
      hex: "#2C1E18",
      token: "bg-walnut",
      textClass: "text-offwhite",
      border: false,
      role: "Primary Brand / Navigation / Headings / Dark Accents",
      description: "Deep organic timber tone inspired by seasoned Konkan teak & walnut."
    },
    {
      name: "Warm Beige",
      hex: "#E5DDD0",
      token: "bg-beige",
      textClass: "text-walnut",
      border: false,
      role: "Secondary Surfaces / Card Backdrops / Gentle Borders",
      description: "Sun-dried natural linen and coastal dune beige."
    },
    {
      name: "Off-White (Ivory)",
      hex: "#FAF7F2",
      token: "bg-offwhite",
      textClass: "text-walnut",
      border: true,
      role: "Base Background / Negative Space / Clean Surface",
      description: "Warm artisanal rice paper and soft limestone off-white."
    },
    {
      name: "Charcoal",
      hex: "#1D1B1A",
      token: "bg-charcoal",
      textClass: "text-offwhite",
      border: false,
      role: "Deep Body Typography / High Contrast Accents",
      description: "Charcoal ink tone for crisp, comfortable editorial reading."
    },
    {
      name: "Terracotta Accent",
      hex: "#A85C3A",
      token: "bg-terracotta",
      textClass: "text-white",
      border: false,
      role: "Accent Buttons / Discount Badges / Eyebrows / Highlights",
      description: "Baked earthen clay inspired by traditional Konkan roof tiles."
    },
    {
      name: "Brass / Konkan Gold",
      hex: "#D4A373",
      token: "bg-brass",
      textClass: "text-walnut-dark",
      border: false,
      role: "Luxury Badges / Delicate Borders / Metallics",
      description: "Warm metallic gold seen in traditional temple handicrafts."
    },
    {
      name: "Muted Sage",
      hex: "#6F7560",
      token: "bg-sage",
      textClass: "text-white",
      border: false,
      role: "Botanical Accent / Sub-labels / Craft Indicators",
      description: "Calm earthen green of coastal betel palm and flora."
    }
  ];

  const typographySamples = [
    { level: "Display Large", size: "64px (4rem)", class: "font-serif text-5xl sm:text-6xl font-normal leading-tight", text: "Handcrafted in Ganpatipule" },
    { level: "Heading 1 (H1)", size: "48px (3rem)", class: "font-serif text-4xl sm:text-5xl font-semibold leading-tight", text: "Tradition, Imagination & Karigari" },
    { level: "Heading 2 (H2)", size: "36px (2.25rem)", class: "font-serif text-3xl sm:text-4xl font-normal leading-snug", text: "Find Something Handmade" },
    { level: "Heading 3 (H3)", size: "28px (1.75rem)", class: "font-serif text-2xl sm:text-3xl font-normal leading-snug", text: "Artisan Ceramic Urn Collection" },
    { level: "Heading 4 (H4)", size: "22px (1.375rem)", class: "font-serif text-xl sm:text-2xl font-normal", text: "Konkan Folk Wall Art" },
    { level: "Body Regular", size: "15px (0.9375rem)", class: "font-sans text-sm sm:text-base text-charcoal/80 leading-relaxed", text: "Every creation carries a little piece of the place it comes from — its colours, traditions, people and memories shaped with patient hands." },
    { level: "Eyebrow / Overline", size: "10px (0.625rem)", class: "font-sans text-[10px] font-semibold tracking-[0.24em] uppercase text-terracotta", text: "MALHAR ATELIER COLLECTION" },
    { level: "Mono / Specs Label", size: "11px (0.6875rem)", class: "font-mono text-xs text-neutral-600", text: "product-1.jpg — 600x600px • 400 GSM RAW COTTON" }
  ];

  const spacingTokens = [
    { token: "space-1", px: "4px", rem: "0.25rem", role: "Micro gaps, icon offsets" },
    { token: "space-2", px: "8px", rem: "0.5rem", role: "Badge padding, tight icon spacing" },
    { token: "space-3", px: "12px", rem: "0.75rem", role: "Card inner padding, button Y-axis" },
    { token: "space-4", px: "16px", rem: "1.0rem", role: "Standard element rhythm, grid gap" },
    { token: "space-6", px: "24px", rem: "1.5rem", role: "Button X-axis, card margins" },
    { token: "space-8", px: "32px", rem: "2.0rem", role: "Module breaks, section sub-gaps" },
    { token: "space-12", px: "48px", rem: "3.0rem", role: "Major group division" },
    { token: "space-16", px: "64px", rem: "4.0rem", role: "Section padding (vertical)" },
    { token: "space-24", px: "96px", rem: "6.0rem", role: "Hero & flagship editorial gaps" }
  ];

  const demoProducts = [
    {
      id: 1,
      name: "Konkan Folk Wall Art",
      category: "Wall Hangings",
      price: 2490,
      originalPrice: 3290,
      discount: "24% OFF",
      image: "/images/products/product-1.jpg",
      description: "A hand-painted folk composition inspired by coastal homes and village life."
    },
    {
      id: 2,
      name: "Peacock Wall Hanging",
      category: "Wall Hangings",
      price: 3290,
      image: "/images/products/product-2.jpg",
      description: "A sculptural peacock artwork shaped and painted by hand."
    },
    {
      id: 5,
      name: "Konkan Panel (Special)",
      category: "Special Creations",
      price: 4190,
      originalPrice: 4990,
      discount: "16% OFF",
      image: "/images/products/product-5.jpg",
      description: "An expressive panel celebrating the rhythms of Konkan."
    }
  ];

  return (
    <div className="min-h-screen bg-offwhite text-charcoal pb-24">
      {/* Header Banner */}
      <section className="bg-walnut text-offwhite border-b border-white/10 pt-12 pb-16">
        <div className="container-page">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-sans tracking-widest text-brass-light hover:text-white uppercase transition"
            >
              <ArrowLeft size={14} /> Back to Storefront
            </Link>
            <span className="font-mono text-[10px] tracking-widest uppercase bg-white/10 px-3 py-1 rounded-sm text-white/70">
              Phase 1 Finalized System
            </span>
          </div>

          <div className="mt-8 max-w-3xl">
            <p className="eyebrow text-brass-light tracking-[0.28em]">
              MALHAR DESIGN SYSTEM & STYLE GUIDE
            </p>
            <h1 className="display text-4xl sm:text-6xl text-white mt-2 leading-[1.1]">
              Crafted Warmth, Editorial Typography & Artisanal Rhythm.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-offwhite/75 font-sans leading-relaxed">
              A comprehensive foundational guide standardizing color tokens, Playfair Display serif headings, Inter sans-serif body, button hierarchy, discount tags, and product components for Malhar Handcrafted Home Decor.
            </p>
          </div>
        </div>
      </section>

      <main className="container-page mt-14 space-y-20">

        {/* 1. COLOR PALETTE */}
        <section id="colors" className="scroll-mt-24">
          <div className="flex items-center justify-between border-b border-walnut/15 pb-4">
            <div className="flex items-center gap-3">
              <Palette className="text-terracotta" size={22} />
              <div>
                <h2 className="display text-2xl sm:text-3xl text-walnut">1. Warm Color Palette</h2>
                <p className="text-xs text-charcoal/60 font-sans mt-0.5">
                  Natural coastal earth tones: Walnut, Warm Beige, Off-White, Charcoal, with Terracotta & Brass accents.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-charcoal/50">Click swatch to copy HEX</span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {colors.map((c) => (
              <div
                key={c.name}
                onClick={() => copyHex(c.hex, c.name)}
                className="group cursor-pointer rounded-[2px] bg-white p-4 shadow-warm-sm border border-beige-border/70 hover:shadow-warm-md hover:border-walnut/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`h-28 w-full rounded-[2px] flex items-center justify-center relative transition-transform group-hover:scale-[1.02] ${
                      c.border ? "border border-neutral-300" : ""
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {copiedColor === c.name ? (
                      <span className="inline-flex items-center gap-1 bg-black/75 backdrop-blur-sm text-white px-2.5 py-1 text-[11px] font-mono rounded">
                        <Check size={12} /> Copied!
                      </span>
                    ) : (
                      <span className="opacity-0 group-hover:opacity-100 transition inline-flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 text-[10px] font-mono rounded">
                        <Copy size={11} /> Copy Hex
                      </span>
                    )}
                  </div>
                  <div className="mt-3.5 flex items-baseline justify-between">
                    <h3 className="font-serif text-lg text-walnut font-medium">{c.name}</h3>
                    <code className="font-mono text-xs text-charcoal/70 bg-beige-light px-1.5 py-0.5 rounded">
                      {c.hex}
                    </code>
                  </div>
                  <p className="mt-1 text-[10px] font-sans font-semibold tracking-wider uppercase text-terracotta">
                    {c.role}
                  </p>
                </div>
                <p className="mt-3 text-xs text-charcoal/70 leading-relaxed border-t border-neutral-100 pt-2 font-sans">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. TYPOGRAPHY HIERARCHY */}
        <section id="typography" className="scroll-mt-24">
          <div className="flex items-center gap-3 border-b border-walnut/15 pb-4">
            <Type className="text-terracotta" size={22} />
            <div>
              <h2 className="display text-2xl sm:text-3xl text-walnut">2. Typography System</h2>
              <p className="text-xs text-charcoal/60 font-sans mt-0.5">
                <strong>Playfair Display</strong> (Editorial Serif) for titles and narrative headings; <strong>Inter</strong> (Geometric Sans) for readable body, specs & buttons.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-6 bg-white p-6 sm:p-10 border border-beige-border/70 rounded-[2px] shadow-warm-sm">
            {typographySamples.map((t, idx) => (
              <div
                key={t.level}
                className={`flex flex-col lg:flex-row lg:items-baseline justify-between gap-3 ${
                  idx !== typographySamples.length - 1 ? "border-b border-neutral-100 pb-6" : ""
                }`}
              >
                <div className="lg:w-1/4 shrink-0">
                  <span className="font-mono text-xs font-semibold text-walnut">{t.level}</span>
                  <div className="text-[11px] font-mono text-neutral-400 mt-0.5">{t.size}</div>
                </div>
                <div className="lg:w-3/4">
                  <p className={t.class}>{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. BUTTON SYSTEM */}
        <section id="buttons" className="scroll-mt-24">
          <div className="flex items-center gap-3 border-b border-walnut/15 pb-4">
            <Sliders className="text-terracotta" size={22} />
            <div>
              <h2 className="display text-2xl sm:text-3xl text-walnut">3. Button Styles & Interactive States</h2>
              <p className="text-xs text-charcoal/60 font-sans mt-0.5">
                Primary walnut actions, secondary outlined buttons, accent terracotta triggers, and clean ghost controls.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* Action Buttons Matrix */}
            <div className="bg-white p-6 sm:p-8 border border-beige-border/70 rounded-[2px] shadow-warm-sm space-y-6">
              <h3 className="font-serif text-xl text-walnut">Button Hierarchy</h3>

              {/* Primary */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-charcoal/60">
                  <span>Primary Button (<code className="font-mono">.btn-primary</code>)</span>
                  <span>Solid Walnut &rarr; Terracotta hover</span>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                  <button className="btn-primary">EXPLORE COLLECTION &rarr;</button>
                  <button className="btn-primary" disabled>DISABLED</button>
                  <button className="btn-primary py-2 px-4 text-[10px]">COMPACT</button>
                </div>
              </div>

              {/* Secondary / Outline */}
              <div className="space-y-2 pt-4 border-t border-neutral-100">
                <div className="flex items-center justify-between text-xs text-charcoal/60">
                  <span>Secondary Button (<code className="font-mono">.btn-secondary</code> / <code className="font-mono">.btn-outline</code>)</span>
                  <span>Walnut border with inversion</span>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                  <button className="btn-secondary">OUR STORY &rarr;</button>
                  <button className="btn-secondary" disabled>DISABLED</button>
                  <button className="btn-secondary py-2 px-4 text-[10px]">SMALL</button>
                </div>
              </div>

              {/* Accent Button */}
              <div className="space-y-2 pt-4 border-t border-neutral-100">
                <div className="flex items-center justify-between text-xs text-charcoal/60">
                  <span>Accent Action (<code className="font-mono">.btn-accent</code>)</span>
                  <span>Burnt Terracotta for high conversion</span>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                  <button className="btn-accent">
                    <ShoppingBag size={14} /> PROCEED TO CHECKOUT
                  </button>
                  <button className="btn-accent py-2 px-4 text-[10px]">QUICK ADD</button>
                </div>
              </div>

              {/* Ghost / Text */}
              <div className="space-y-2 pt-4 border-t border-neutral-100">
                <div className="flex items-center justify-between text-xs text-charcoal/60">
                  <span>Ghost / Underline (<code className="font-mono">.btn-ghost</code>)</span>
                  <span>Editorial text link</span>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                  <button className="btn-ghost">VIEW DETAILS &rarr;</button>
                  <span className="text-xs border-b border-walnut pb-0.5 tracking-wider uppercase font-semibold cursor-pointer hover:text-terracotta hover:border-terracotta transition">
                    Shop All Wall Art &rarr;
                  </span>
                </div>
              </div>
            </div>

            {/* Badges & Micro Tags */}
            <div className="bg-white p-6 sm:p-8 border border-beige-border/70 rounded-[2px] shadow-warm-sm space-y-6">
              <h3 className="font-serif text-xl text-walnut">Artisanal Badges & Tags</h3>
              <p className="text-xs text-charcoal/70 font-sans leading-relaxed">
                Designed for product discounts, craft hallmarks, and limited-edition status banners without shouting.
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="text-xs text-neutral-500 font-mono block">Discount Badges</span>
                  <div className="flex flex-wrap items-center gap-3">
                    <DiscountBadge discount="25% OFF" variant="terracotta" size="lg" />
                    <DiscountBadge discount="20% OFF" variant="terracotta" size="md" />
                    <DiscountBadge discount="15% OFF" variant="terracotta" size="sm" />
                    <DiscountBadge discount="SAVE ₹800" variant="terracotta" size="md" />
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-neutral-100">
                  <span className="text-xs text-neutral-500 font-mono block">Luxury & Status Badges</span>
                  <div className="flex flex-wrap items-center gap-3">
                    <DiscountBadge discount="SPECIAL CREATION" variant="gold" size="md" />
                    <DiscountBadge discount="LIMITED EDITION" variant="walnut" size="md" />
                    <DiscountBadge discount="100% HANDMADE" variant="neutral" size="md" />
                    <span className="badge-dark">
                      <Sparkles size={10} /> Konkan Heritage
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-neutral-100">
                  <span className="text-xs text-neutral-500 font-mono block">Wishlist Action Pill</span>
                  <div className="flex items-center gap-3">
                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-offwhite shadow-warm-sm border border-neutral-200 text-terracotta">
                      <Heart size={16} fill="currentColor" />
                    </button>
                    <span className="text-xs text-charcoal/70 font-sans">Active Heart State</span>
                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-offwhite shadow-warm-sm border border-neutral-200 text-walnut/60 hover:text-walnut">
                      <Heart size={16} fill="none" />
                    </button>
                    <span className="text-xs text-charcoal/70 font-sans">Idle Heart State</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PRODUCT CARD COMPONENT SHOWCASE */}
        <section id="cards" className="scroll-mt-24">
          <div className="flex items-center justify-between border-b border-walnut/15 pb-4">
            <div className="flex items-center gap-3">
              <Layers className="text-terracotta" size={22} />
              <div>
                <h2 className="display text-2xl sm:text-3xl text-walnut">4. Live Product Card Component</h2>
                <p className="text-xs text-charcoal/60 font-sans mt-0.5">
                  Responsive card with discount badge, Playfair Display title, price strikethrough, wishlist toggle, and zero-external-image SafeImage fallback.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-terracotta bg-terracotta/10 px-2.5 py-1 rounded">
              Rule Compliant
            </span>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {demoProducts.map((p) => (
              <div key={p.id} className="bg-white p-4 border border-beige-border/70 rounded-[2px] shadow-warm-sm">
                <ProductCard
                  product={p}
                  wished={wishlistDemo.includes(p.id)}
                  onWishlist={(id) =>
                    setWishlistDemo((prev) =>
                      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
                    )
                  }
                  onAdd={() => alert(`Added "${p.name}" to cart!`)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* 5. SPACING SCALE */}
        <section id="spacing" className="scroll-mt-24">
          <div className="flex items-center gap-3 border-b border-walnut/15 pb-4">
            <Square className="text-terracotta" size={22} />
            <div>
              <h2 className="display text-2xl sm:text-3xl text-walnut">5. Spacing Scale & Rhythm</h2>
              <p className="text-xs text-charcoal/60 font-sans mt-0.5">
                Harmonious 4px base mathematical rhythm ensuring visual breathing room across mobile and desktop.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 sm:p-8 border border-beige-border/70 rounded-[2px] shadow-warm-sm overflow-x-auto">
            <table className="w-full text-left font-sans text-xs">
              <thead>
                <tr className="border-b border-neutral-200 text-charcoal/50 uppercase tracking-widest text-[10px]">
                  <th className="pb-3 font-semibold">Token</th>
                  <th className="pb-3 font-semibold">Pixels</th>
                  <th className="pb-3 font-semibold">Rem</th>
                  <th className="pb-3 font-semibold">Visual Scale</th>
                  <th className="pb-3 font-semibold">Intended Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {spacingTokens.map((s) => (
                  <tr key={s.token} className="hover:bg-offwhite/80 transition">
                    <td className="py-3 font-mono font-semibold text-walnut">{s.token}</td>
                    <td className="py-3 font-mono text-charcoal/80">{s.px}</td>
                    <td className="py-3 font-mono text-neutral-400">{s.rem}</td>
                    <td className="py-3">
                      <div
                        className="h-4 bg-terracotta/75 rounded-sm"
                        style={{ width: s.px }}
                        title={`${s.token}: ${s.px}`}
                      />
                    </td>
                    <td className="py-3 text-charcoal/70 font-sans">{s.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Next Steps Card */}
        <section className="bg-gradient-to-r from-walnut via-[#36251E] to-walnut text-offwhite p-8 sm:p-12 rounded-[2px] border border-brass/20 shadow-warm-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="badge-dark mb-3">
              <Sparkles size={11} /> Phase 1 Foundation Complete
            </span>
            <h3 className="display text-3xl sm:text-4xl text-white">
              Ready for Phase 2 Implementation
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-offwhite/75 font-sans leading-relaxed">
              The warm palette, Playfair Display serif hierarchy, Inter sans body, button system, discount badges, and product card component are fully integrated and live.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link to="/" className="btn-accent">
              RETURN TO HOME &rarr;
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
