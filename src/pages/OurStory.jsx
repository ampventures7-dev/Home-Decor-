import { Link } from "react-router-dom";
import { Sparkles, Compass, HeartHandshake, TreeDeciduous, Flame, ArrowRight } from "lucide-react";
import SafeImage from "../components/SafeImage";

export default function OurStory() {
  return (
    <main className="min-h-screen bg-offwhite page-enter">
      {/* 1. HERO INTRO */}
      <section className="bg-beige-light/40 border-b border-beige-border/70 py-16 sm:py-24">
        <div className="container-page max-w-5xl text-center mx-auto">
          <p className="eyebrow flex items-center justify-center gap-1.5">
            <Sparkles size={12} className="text-terracotta" />
            THE MALHAR NARRATIVE
          </p>
          <h1 className="display mt-4 text-4xl sm:text-6xl lg:text-7xl text-walnut leading-[1.08]">
            Between Salt Air, Seasoned Teak & Ancient Earth.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-charcoal/75 font-sans leading-relaxed max-w-3xl mx-auto">
            Born in the tranquil coastal hamlet of Ganpatipule, Malhar is an atelier devoted to preserving authentic Indian karigari. We create soulful furniture, wheel-thrown ceramics, and hand-carved decor designed to outlive trends.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/shop" className="btn-primary">
              <span>Explore The Creations</span>
              <ArrowRight size={14} />
            </Link>
            <Link to="/contact" className="btn-secondary">
              <span>Visit the Atelier</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FOUNDER'S STORY */}
      <section className="container-page py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Portrait Image Slot */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] bg-beige-light border border-beige-border shadow-warm-md rounded-[2px] overflow-hidden">
              <SafeImage
                src="/images/banners/about-founder.jpg"
                alt="Malhar Rane, Founder and Master Craftsman"
                dimensions="800x1000px"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-walnut/90 via-walnut/40 to-transparent p-5 text-offwhite">
                <p className="font-serif text-lg font-bold">Malhar Rane</p>
                <p className="text-[11px] font-sans text-brass-light tracking-wider uppercase">
                  Founder & Principal Craftsman
                </p>
              </div>
            </div>
          </div>

          {/* Narrative Text */}
          <div className="lg:col-span-7 space-y-6">
            <p className="eyebrow">OUR ORIGINS</p>
            <h2 className="display text-3xl sm:text-4xl lg:text-5xl text-walnut leading-tight">
              A rebellion against disposable furniture and soulless assembly lines.
            </h2>
            <div className="space-y-4 text-sm font-sans text-charcoal/80 leading-relaxed">
              <p>
                Growing up surrounded by ancestral wadas along the Konkan shoreline, Malhar spent his youth marveling at 150-year-old teak pillars that withstood monsoon rains, salt-laden sea breezes, and the passage of time without warping.
              </p>
              <p>
                When modern retail filled homes with veneer-coated particle boards destined for landfills in three years, Malhar returned to his hometown of Ganpatipule to establish a sanctuary for patient, slow craftsmanship.
              </p>
              <blockquote className="my-6 border-l-2 border-terracotta pl-4 italic text-walnut font-serif text-lg leading-snug">
                "A home should never be an assemblage of disposable novelties. It should be a quiet sanctuary of objects that hold memories, soften with age, and tell stories to the children who will inherit them."
              </blockquote>
              <p>
                Today, our studio is home to over 35 artisan families from Ratnagiri district—wood-carvers, wheel-potters, brass smiths, and cane weavers whose lineages span generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WIDE WORKSHOP PANORAMA */}
      <section className="bg-beige-light/30 border-t border-b border-beige-border/70 py-16">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="eyebrow">THE GANPATIPULE ATELIER</p>
            <h2 className="display mt-2 text-3xl sm:text-4xl text-walnut">
              Where sea breeze meets wood shavings.
            </h2>
            <p className="mt-3 text-xs sm:text-sm font-sans text-charcoal/70">
              Surrounded by coconut groves and red laterite clay pits, our open-air workshops follow the rhythm of nature.
            </p>
          </div>

          <div className="relative aspect-[2/1] sm:aspect-[21/9] w-full bg-beige-light border border-beige-border shadow-warm-md rounded-[2px] overflow-hidden">
            <SafeImage
              src="/images/banners/about-workshop.jpg"
              alt="Panoramic view of the Malhar Workshop in Ganpatipule"
              dimensions="1200x600px"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. THE 4 PILLARS OF KARIGARI */}
      <section className="container-page py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow">OUR PHILOSOPHY</p>
          <h2 className="display mt-2 text-3xl sm:text-4xl lg:text-5xl text-walnut">
            Four Pillars of Honest Craft.
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: TreeDeciduous,
              title: "Ethical Seasoned Timber",
              desc: "We work exclusively with certified plantation teak, reclaimed wada timber, and fallen mango wood, naturally seasoned for months."
            },
            {
              icon: Flame,
              title: "Living Earth Pigments",
              desc: "Our ceramic urns and wall panels use natural mineral slips, crushed terracotta, turmeric wash, and raw Konkan beeswax polish."
            },
            {
              icon: Compass,
              title: "Zero Assembly Lines",
              desc: "Every joint is joined with mortise-and-tenon interlocking woodwork and traditional brass dowels, never quick industrial staples."
            },
            {
              icon: HeartHandshake,
              title: "Fair Artisan Lineages",
              desc: "We ensure our master karigars receive transparent profit sharing, medical security, and safe, dignified atelier environments."
            }
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-beige-border p-6 sm:p-7 rounded-[2px] shadow-warm-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-beige-light border border-beige-border flex items-center justify-center text-terracotta mb-5">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-walnut mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-sans text-charcoal/70 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <span className="font-mono text-[10px] text-brass font-bold mt-6 block">
                  0{idx + 1} / PILLAR
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. STEP-BY-STEP KARIGARI PROCESS WITH 2 PHOTO SLOTS */}
      <section className="bg-beige/25 border-t border-b border-beige-border py-16 sm:py-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Process Left: Timber Craft */}
            <div className="space-y-6">
              <div className="aspect-[4/3] bg-beige-light border border-beige-border shadow-warm-sm rounded-[2px] overflow-hidden">
                <SafeImage
                  src="/images/banners/about-process-1.jpg"
                  alt="Carving seasoned teakwood at the Malhar atelier"
                  dimensions="600x450px"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-mono text-xs font-semibold text-terracotta uppercase tracking-wider">
                  Step 01 & 02 • Woodcraft
                </span>
                <h3 className="font-serif text-2xl font-bold text-walnut mt-1">
                  Hand-Turning & Chisel Calibration
                </h3>
                <p className="text-xs sm:text-sm font-sans text-charcoal/70 mt-2 leading-relaxed">
                  Timber blocks are seasoned in shaded drying yards before being planed by hand. Chisel cuts reveal natural golden-brown grain patterns unique to every tree.
                </p>
              </div>
            </div>

            {/* Process Right: Ceramic Wheel Craft */}
            <div className="space-y-6">
              <div className="aspect-[4/3] bg-beige-light border border-beige-border shadow-warm-sm rounded-[2px] overflow-hidden">
                <SafeImage
                  src="/images/banners/about-process-2.jpg"
                  alt="Wheel throwing terracotta and ceramic vases"
                  dimensions="600x450px"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-mono text-xs font-semibold text-terracotta uppercase tracking-wider">
                  Step 03 & 04 • Wheel & Fire
                </span>
                <h3 className="font-serif text-2xl font-bold text-walnut mt-1">
                  Wheel-Throwing & Kiln Glazing
                </h3>
                <p className="text-xs sm:text-sm font-sans text-charcoal/70 mt-2 leading-relaxed">
                  Konkan red clay is kneaded by foot, centered on manual potter wheels, and fired in small wood-burning kilns for organic, variegated color depths.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STUDIO TIMELINE */}
      <section className="container-page py-16 sm:py-24">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="eyebrow">MILESTONES</p>
          <h2 className="display mt-2 text-3xl sm:text-4xl text-walnut">
            The Journey So Far.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-4 max-w-5xl mx-auto">
          {[
            {
              year: "2018",
              title: "The First Wheel",
              desc: "Malhar sets up a single pottery wheel and carpenter's bench in a humble shed in Ganpatipule."
            },
            {
              year: "2021",
              title: "Furniture Collective",
              desc: "Five master teak carpenters join the atelier, creating our signature coastal daybeds and lounge chairs."
            },
            {
              year: "2023",
              title: "Heritage Recognition",
              desc: "Awarded the National Artisan Heritage Guild recognition for reviving traditional Konkan wood-carving."
            },
            {
              year: "Today",
              title: "35+ Artisan Families",
              desc: "Shipping handcrafted living pieces across India with white-glove transit and custom bespoke commissions."
            }
          ].map((m, i) => (
            <div key={i} className="border-t-2 border-brass/60 pt-4">
              <span className="font-serif text-2xl font-bold text-terracotta block">
                {m.year}
              </span>
              <h4 className="font-serif text-base font-bold text-walnut mt-1">
                {m.title}
              </h4>
              <p className="text-xs font-sans text-charcoal/70 mt-2 leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="bg-walnut text-offwhite py-16 sm:py-20 text-center">
        <div className="container-page max-w-2xl mx-auto">
          <p className="eyebrow text-brass-light">HANDCRAFTED FOR YOUR HOME</p>
          <h2 className="display mt-3 text-3xl sm:text-5xl text-white">
            Bring Soulful Art Into Your Living Space.
          </h2>
          <p className="mt-4 text-xs sm:text-sm font-sans text-offwhite/75 leading-relaxed">
            Every piece arrives with an authenticity certificate hand-signed by the master karigar who made it.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/shop" className="btn-primary bg-brass text-walnut hover:bg-white w-full sm:w-auto">
              <span>Explore The Catalog</span>
              <ArrowRight size={14} />
            </Link>
            <Link to="/contact" className="btn-secondary border-offwhite/40 text-offwhite hover:bg-offwhite hover:text-walnut w-full sm:w-auto">
              <span>Schedule a Studio Visit</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
