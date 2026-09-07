import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import SafeImage from "./SafeImage";

const slides = [
  {
    id: 1,
    tag: "SIGNATURE LIVING SANCTUARY",
    headline: "Contemporary Comfort in Fluted Linen & Teak.",
    subtext: "The Sylvan ribbed 3-seater sofa paired with an artisanal hand-woven rattan coffee table, bringing serene coastal elegance to your home.",
    primaryCta: { text: "EXPLORE LIVING SUITE", link: "/product/12" },
    secondaryCta: { text: "SHOP LIVING ROOM", link: "/shop?category=Living" },
    image: "/images/hero/hero-banner-1.jpg",
    dimensions: "1920x800px"
  },
  {
    id: 2,
    tag: "KONKAN ATELIER SEATING",
    headline: "The Aarambh Handcrafted Olive Teak & Cane Sofa.",
    subtext: "Architectural solid teak frame with airy woven wicker sides, forest-olive linen upholstery, and solid brass detailing.",
    primaryCta: { text: "VIEW OLIVE CANE SOFA", link: "/product/11" },
    secondaryCta: { text: "EXPLORE ALL SOFAS", link: "/shop?category=Sofas" },
    image: "/images/hero/hero-banner-2.jpg",
    dimensions: "1920x800px"
  },
  {
    id: 3,
    tag: "FESTIVE BOTANICAL ARCHIVE",
    headline: "Grand Hand-Etched Vintage Urlis & Planters.",
    subtext: "Traditional bell-metal and studded brass urlis crafted for welcoming entryways, floating blossoms, and flourishing indoor botanicals.",
    primaryCta: { text: "EXPLORE VINTAGE URLIS", link: "/product/14" },
    secondaryCta: { text: "SPECIAL CREATIONS", link: "/shop?category=Special%20Creations" },
    image: "/images/hero/hero-banner-4.jpg",
    dimensions: "1920x800px"
  },
  {
    id: 4,
    tag: "CEREMONIAL LIVING ACCENTS",
    headline: "Royal Hand-painted Nandi & Folk Sculptures.",
    subtext: "Intricately enamelled cast brass and heirloom figurines with traditional diamond saddle borders, crafted by master metalsmiths.",
    primaryCta: { text: "DISCOVER ROYAL NANDI", link: "/product/6" },
    secondaryCta: { text: "OUR HERITAGE STORY", link: "/our-story" },
    image: "/images/hero/hero-banner-3.jpg",
    dimensions: "1920x800px"
  }
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isPaused) {
      timeoutRef.current = setTimeout(nextSlide, 6500);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, isPaused]);

  return (
    <section
      className="relative w-full overflow-hidden bg-offwhite select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative min-h-[560px] sm:min-h-[620px] lg:min-h-[680px] w-full">
        {slides.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
              }`}
            >
              {/* Background Image slot using SafeImage */}
              <div className="absolute inset-0 w-full h-full">
                <SafeImage
                  src={slide.image}
                  dimensions={slide.dimensions}
                  alt={slide.headline}
                  className="w-full h-full object-cover object-center"
                />
                {/* Warm editorial gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-offwhite via-offwhite/85 to-transparent sm:max-w-3xl" />
                <div className="absolute inset-0 bg-black/15" />
              </div>

              {/* Text Content Overlay */}
              <div className="container-page relative h-full flex flex-col justify-center py-20">
                <div className="max-w-2xl text-walnut space-y-5">
                  <div className="inline-flex items-center gap-2 bg-walnut text-offwhite px-3 py-1 rounded-[1px] text-[10px] font-sans font-semibold tracking-[0.22em] uppercase">
                    <Sparkles size={11} className="text-brass-light" />
                    <span>{slide.tag}</span>
                  </div>

                  <h1 className="display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.06] text-walnut tracking-tight">
                    {slide.headline}
                  </h1>

                  <p className="text-sm sm:text-base text-charcoal/85 font-sans leading-relaxed max-w-xl">
                    {slide.subtext}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link to={slide.primaryCta.link} className="btn-primary">
                      {slide.primaryCta.text} &rarr;
                    </Link>
                    <Link to={slide.secondaryCta.link} className="btn-secondary">
                      {slide.secondaryCta.text}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-offwhite/90 hover:bg-white text-walnut flex items-center justify-center shadow-warm-sm border border-beige-border/60 hover:scale-110 transition backdrop-blur-sm"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-offwhite/90 hover:bg-white text-walnut flex items-center justify-center shadow-warm-sm border border-beige-border/60 hover:scale-110 transition backdrop-blur-sm"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              idx === current
                ? "w-8 h-2 bg-walnut"
                : "w-2 h-2 bg-walnut/35 hover:bg-walnut/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
