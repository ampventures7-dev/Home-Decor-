import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck } from "lucide-react";
import SafeImage from "./SafeImage";

export default function PromoBannerStrip() {
  return (
    <section className="relative w-full overflow-hidden bg-walnut text-offwhite my-12 sm:my-16 select-none">
      {/* Full-width image slot with SafeImage */}
      <div className="relative min-h-[420px] sm:min-h-[500px] w-full">
        <SafeImage
          src="/images/banners/promo-banner-strip.jpg"
          dimensions="1920x550px"
          alt="The Seasoned Teak & Brass Archive"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Gradient dark overlays for luxury atmosphere and text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E140F]/95 via-[#1E140F]/80 to-transparent sm:max-w-4xl" />
        <div className="absolute inset-0 bg-black/20" />

        {/* Content Container */}
        <div className="container-page relative z-10 flex min-h-[420px] sm:min-h-[500px] flex-col justify-center py-16">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-brass/20 text-brass-light px-3 py-1 text-[9px] font-sans font-semibold tracking-[0.24em] uppercase rounded-[1px] border border-brass/30 backdrop-blur-sm">
              <Sparkles size={11} />
              <span>LIMITED KARIGARI ARCHIVE</span>
            </div>

            <h2 className="display text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.08] tracking-tight">
              The Seasoned Teak &amp; Brass Heritage Edit.
            </h2>

            <p className="text-xs sm:text-sm text-offwhite/85 font-sans leading-relaxed">
              Every timber beam is seasoned for four monsoon cycles, hand-planed by master woodworkers, and appointed with antique brass inlays.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-sans text-brass-light pt-1">
              <ShieldCheck size={14} />
              <span>Includes 10-Year Structural Timber Guarantee &amp; White-Glove Setup</span>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                to="/shop?category=Living"
                className="btn-accent py-3.5 px-7 text-[11px]"
              >
                EXPLORE THE EDIT &rarr;
              </Link>
              <Link
                to="/our-story"
                className="inline-flex items-center justify-center border border-white/30 text-white hover:bg-white/10 px-6 py-3.5 text-[11px] font-semibold tracking-[0.18em] uppercase transition rounded-[1px]"
              >
                OUR WORKSHOP STORY
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
