import { Link } from "react-router-dom";
import SafeImage from "./SafeImage";

export default function Hero() {
  return (
    <section className="container-page pb-16 pt-4 sm:pb-24">
      <div className="relative min-h-[620px] overflow-hidden rounded-[2px] bg-ivory">
        <SafeImage
          className="absolute inset-0 h-full w-full object-cover object-right"
          src="/images/hero/hero-banner-1.jpg"
          dimensions="1800x800px"
          alt="Handcrafted warm Indian interior"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/90 via-ivory/60 to-transparent"/>
        <div className="relative flex min-h-[620px] max-w-2xl flex-col justify-center px-7 py-20 text-wood sm:px-14 lg:px-20">
          <h1 className="display text-5xl leading-[1.05] sm:text-7xl">Handcrafted Art,<br/>From the Heart of Konkan.</h1>
          <p className="mt-6 text-lg text-wood/80 font-medium">Tradition, imagination & karigari by Malhar Rane.</p>
          <p className="mt-6 max-w-sm text-sm leading-6 text-wood/70">Discover handcrafted pieces inspired by the colours, stories and spirit of Konkan.</p>
          <div className="mt-9 flex flex-wrap gap-3 items-center">
            <Link to="/shop" className="btn-primary bg-[#A85C3A] text-white hover:bg-[#8F4E31] border-none">EXPLORE COLLECTION →</Link>
            <Link to="/our-story" className="btn-outline border-wood/30 text-wood hover:bg-wood/5">OUR STORY↗</Link>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[9px] tracking-[0.25em] text-wood/60">
          <div className="h-6 w-3.5 rounded-full border border-wood/40 flex justify-center pt-1"><div className="h-1 w-1 rounded-full bg-wood/40 animate-bounce"/></div>
          Scroll Down
        </div>
      </div>
    </section>
  );
}
