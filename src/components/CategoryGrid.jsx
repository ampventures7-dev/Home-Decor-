import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SafeImage from "./SafeImage";

const categories = [
  {
    name: "Sofas & Daybeds",
    subtitle: "Teak frames & natural cane",
    count: "18 pieces",
    path: "/shop?category=Sofas",
    image: "/images/categories/category-sofas.jpg",
    dimensions: "500x500px"
  },
  {
    name: "Living Room",
    subtitle: "Coffee tables, consoles & armchairs",
    count: "32 pieces",
    path: "/shop?category=Living",
    image: "/images/categories/category-living.jpg",
    dimensions: "500x500px"
  },
  {
    name: "Bedroom Retreats",
    subtitle: "Platform beds & nightstands",
    count: "24 pieces",
    path: "/shop?category=Bedroom",
    image: "/images/categories/category-bedroom.jpg",
    dimensions: "500x500px"
  },
  {
    name: "Dining & Feast Tables",
    subtitle: "Solid timber 6-seaters & chairs",
    count: "16 pieces",
    path: "/shop?category=Dining",
    image: "/images/categories/category-dining.jpg",
    dimensions: "500x500px"
  },
  {
    name: "Storage & Sideboards",
    subtitle: "Crockery units & brass armoires",
    count: "20 pieces",
    path: "/shop?category=Storage",
    image: "/images/categories/category-storage.jpg",
    dimensions: "500x500px"
  },
  {
    name: "Wall Art & Panels",
    subtitle: "Konkan folk motifs & carvings",
    count: "45 pieces",
    path: "/shop?category=Wall%20Hangings",
    image: "/images/categories/category-wall-hangings.jpg",
    dimensions: "500x500px"
  },
  {
    name: "Ceramic Pottery & Urns",
    subtitle: "Wheel-thrown botanical glazes",
    count: "28 pieces",
    path: "/shop?category=Tabletop%20Decor",
    image: "/images/categories/category-tabletop.jpg",
    dimensions: "500x500px"
  },
  {
    name: "Balcony & Outdoors",
    subtitle: "Terracotta sun tiles & planters",
    count: "14 pieces",
    path: "/shop?category=Outdoor%20Decor",
    image: "/images/categories/category-outdoor.jpg",
    dimensions: "500x500px"
  }
];

export default function CategoryGrid() {
  return (
    <section className="container-page py-16 sm:py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-walnut/15 pb-6">
        <div>
          <span className="eyebrow">CURATED SPACES</span>
          <h2 className="display text-3xl sm:text-5xl text-walnut mt-1.5">
            Explore Handcrafted Categories
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/70 font-sans mt-2 max-w-xl">
            From heirloom solid teak seating to miniature coastal keepsakes, thoughtfully created for spaces with soul.
          </p>
        </div>

        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold tracking-widest text-terracotta hover:text-walnut uppercase transition self-start md:self-end"
        >
          <span>VIEW ALL DEPARTMENTS</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            to={cat.path}
            className="group flex flex-col bg-white border border-beige-border/70 rounded-[2px] overflow-hidden shadow-warm-sm hover:shadow-warm-md hover:border-walnut/40 transition-all duration-300"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-beige-light">
              <SafeImage
                src={cat.image}
                dimensions={cat.dimensions}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white text-[9px] font-mono px-2 py-0.5 rounded-[1px] opacity-0 group-hover:opacity-100 transition-opacity">
                {cat.count}
              </span>
            </div>

            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-serif text-base sm:text-lg text-walnut font-medium leading-snug group-hover:text-terracotta transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-charcoal/65 font-sans mt-1 line-clamp-1">
                  {cat.subtitle}
                </p>
              </div>
              <span className="mt-3 text-[10px] font-sans font-semibold tracking-wider text-terracotta flex items-center gap-1 group-hover:translate-x-1 transition-transform uppercase">
                Explore &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
