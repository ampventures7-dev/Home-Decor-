import { useState, useRef, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from "lucide-react";
import SafeImage from "./SafeImage";

const testimonials = [
  {
    id: 1,
    name: "Ananya Deshmukh",
    city: "South Mumbai",
    role: "Interior Stylist & Homeowner",
    stars: 5,
    review: "The Konkan Folk Wall Art is the centerpiece of our living room. Guests invariably stop to admire the hand-painted brushwork. The woodwork textures and pigments feel authentically coastal and grounded.",
    purchasedItem: "Konkan Folk Wall Art",
    image: "/images/testimonials/testimonial-1.jpg",
    dimensions: "200x200px"
  },
  {
    id: 2,
    name: "Vikramaditya Rao",
    city: "Indiranagar, Bengaluru",
    role: "Architect",
    stars: 5,
    review: "We ordered the solid teak dining feast table. The white-glove delivery team assembled it with utmost care. The timber grain, natural oil finish, and traditional mortise-tenon joinery are truly heirloom standard.",
    purchasedItem: "Coastal Feast Dining Table",
    image: "/images/testimonials/testimonial-2.jpg",
    dimensions: "200x200px"
  },
  {
    id: 3,
    name: "Sneha Kulkarni",
    city: "Kothrud, Pune",
    role: "Ceramics Collector",
    stars: 5,
    review: "Malhar's wheel-thrown ceramic urns and magnet sets bring quiet coastal calm to our home. The glazes have subtle throwing rings that show the maker's touch. Delivered in plastic-free packaging.",
    purchasedItem: "Handcrafted Ceramic Urn Vase",
    image: "/images/testimonials/testimonial-3.jpg",
    dimensions: "200x200px"
  },
  {
    id: 4,
    name: "Rohan & Meera Mehta",
    city: "Greater Kailash, New Delhi",
    role: "Patrons since 2024",
    stars: 5,
    review: "The Ganpatipule platform bed is sublime. Robust seasoned wood, zero creaks, and the warm walnut tone makes our room feel like a quiet Konkan resort retreat. Exemplary customer service.",
    purchasedItem: "Ganpatipule Platform Bed",
    image: "/images/testimonials/testimonial-4.jpg",
    dimensions: "200x200px"
  }
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentItem = testimonials[current];

  return (
    <section className="container-page py-16 sm:py-24 select-none">
      <div className="text-center max-w-xl mx-auto">
        <span className="eyebrow">WORDS OF PATRONAGE</span>
        <h2 className="display text-3xl sm:text-5xl text-walnut mt-1">
          Loved in Homes Across India
        </h2>
        <p className="text-xs sm:text-sm text-charcoal/70 font-sans mt-2">
          Real experiences from homeowners, architects and interior collectors who welcomed Malhar into their spaces.
        </p>
      </div>

      <div className="mt-12 max-w-4xl mx-auto bg-white border border-beige-border rounded-[2px] p-6 sm:p-12 shadow-warm-md relative">
        <Quote
          size={56}
          className="absolute top-6 right-6 sm:top-10 sm:right-10 text-beige/50 pointer-events-none"
        />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">
          {/* Customer Avatar Slot with SafeImage */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 border-2 border-beige-border shadow-warm-sm bg-beige-light relative">
            <SafeImage
              src={currentItem.image}
              dimensions={currentItem.dimensions}
              alt={currentItem.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Testimonial Content */}
          <div className="flex-1 text-center sm:text-left space-y-4">
            {/* Star Rating */}
            <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-600">
              {[...Array(currentItem.stars)].map((_, i) => (
                <Star key={i} size={15} fill="currentColor" />
              ))}
              <span className="ml-2 text-[10px] font-sans font-semibold tracking-wider text-charcoal/70 uppercase">
                5.0 Verified Review
              </span>
            </div>

            {/* Review Quote */}
            <p className="font-serif text-lg sm:text-2xl text-walnut italic leading-relaxed">
              "{currentItem.review}"
            </p>

            {/* Patron Details */}
            <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-serif text-base text-walnut font-semibold">
                  {currentItem.name}
                </h4>
                <p className="text-xs text-charcoal/60 font-sans">
                  {currentItem.city} • <span className="text-neutral-400">{currentItem.role}</span>
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs text-terracotta bg-terracotta/10 px-3 py-1 rounded-[1px] font-sans font-medium self-center sm:self-auto">
                <ShieldCheck size={13} />
                <span>Verified Buyer: {currentItem.purchasedItem}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                aria-label={`Go to review ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === current
                    ? "w-7 h-2 bg-walnut"
                    : "w-2 h-2 bg-walnut/25 hover:bg-walnut/60"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous Review"
              className="w-9 h-9 rounded-full border border-walnut/25 flex items-center justify-center text-walnut hover:border-walnut hover:bg-walnut hover:text-white transition"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              aria-label="Next Review"
              className="w-9 h-9 rounded-full border border-walnut/25 flex items-center justify-center text-walnut hover:border-walnut hover:bg-walnut hover:text-white transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
