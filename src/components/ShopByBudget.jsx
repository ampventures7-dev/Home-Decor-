import { Link } from "react-router-dom";
import { ArrowRight, Tag } from "lucide-react";
import SafeImage from "./SafeImage";

const budgetTiers = [
  {
    title: "Under ₹999",
    subtitle: "Little coastal magnets, keepsakes & tabletop minis",
    tag: "POCKET LUXURY",
    image: "/images/banners/budget-under-999.jpg",
    dimensions: "600x400px",
    link: "/shop?maxPrice=999"
  },
  {
    title: "Under ₹2,499",
    subtitle: "Hand-painted folk art, ceramic urns & wall plaques",
    tag: "MOST POPULAR",
    image: "/images/banners/budget-under-2499.jpg",
    dimensions: "600x400px",
    link: "/shop?maxPrice=2499"
  },
  {
    title: "Under ₹4,999",
    subtitle: "Carved wooden mirrors, large panels & throws",
    tag: "STATEMENT DECOR",
    image: "/images/banners/budget-under-4999.jpg",
    dimensions: "600x400px",
    link: "/shop?maxPrice=4999"
  },
  {
    title: "Heirloom & Furniture",
    subtitle: "Solid teak dining tables, daybeds & armoires",
    tag: "LIFETIME CRAFT",
    image: "/images/banners/budget-above-9999.jpg",
    dimensions: "600x400px",
    link: "/shop?minPrice=10000"
  }
];

export default function ShopByBudget() {
  return (
    <section className="bg-beige-light/60 py-16 sm:py-24 border-y border-beige-border/70 select-none">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-terracotta text-[10px] font-sans font-semibold tracking-[0.24em] uppercase">
            <Tag size={11} />
            <span>CURATED PRICE TIERS</span>
          </div>
          <h2 className="display text-3xl sm:text-5xl text-walnut mt-1">
            Shop By Budget
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/70 font-sans mt-2">
            Discover authentic handcrafted Konkan decor tailored to your interior aspirations and budget.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {budgetTiers.map((tier, idx) => (
            <Link
              key={idx}
              to={tier.link}
              className="group relative flex flex-col bg-white border border-beige-border/80 rounded-[2px] overflow-hidden shadow-warm-sm hover:shadow-warm-md hover:border-walnut/50 transition-all duration-300"
            >
              {/* Image Container with SafeImage */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-beige-light">
                <SafeImage
                  src={tier.image}
                  dimensions={tier.dimensions}
                  alt={tier.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-walnut/90 backdrop-blur-sm text-brass-light text-[9px] font-sans font-bold tracking-widest uppercase px-2.5 py-1 rounded-[1px]">
                  {tier.tag}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <h3 className="font-serif text-2xl text-walnut font-medium group-hover:text-terracotta transition-colors">
                    {tier.title}
                  </h3>
                  <p className="text-xs text-charcoal/70 font-sans mt-1.5 leading-relaxed">
                    {tier.subtitle}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[10px] font-sans font-semibold tracking-wider text-terracotta uppercase">
                    Explore Pieces
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-terracotta transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
