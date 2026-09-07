import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Youtube,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Check
} from "lucide-react";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [footerToast, setFooterToast] = useState(null);

  const triggerFooterToast = (platform) => {
    setFooterToast(`Malhar ${platform} App: In private artisan beta. Launching soon!`);
    setTimeout(() => setFooterToast(null), 3500);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#201511] text-offwhite border-t border-brass/25 select-none relative">
      {/* Footer Toast Notification */}
      {footerToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-walnut text-offwhite px-5 py-3.5 shadow-warm-lg border border-brass/40 animate-fadeIn rounded-[2px]">
          <div className="w-5 h-5 rounded-full bg-brass text-walnut flex items-center justify-center shrink-0">
            <Sparkles size={12} />
          </div>
          <span className="text-xs font-sans tracking-wide">{footerToast}</span>
        </div>
      )}
      
      {/* 1. NEWSLETTER & ARTISAN DISPATCH STRIP */}
      <div className="border-b border-white/10 bg-walnut py-12">
        <div className="container-page flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="eyebrow text-brass-light tracking-[0.26em] text-[9px]">
              JOIN THE CRAFT CIRCLE
            </span>
            <h3 className="display text-3xl sm:text-4xl text-white mt-1">
              The Karigari Chronicles
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-offwhite/75 font-sans leading-relaxed">
              Stories from coastal workshops, wood seasoning insights, early access to limited edition pieces, and artisan care tips.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 bg-[#1E3025] text-brass-light px-5 py-3 border border-brass/30 text-xs font-sans rounded-[2px] animate-fadeIn">
                <Check size={16} />
                <span>Dhanyavaad! You have joined the Karigari circle.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-2 w-full max-w-md"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-white/10 border border-white/20 focus:border-brass-light px-4 py-3 text-xs font-sans text-white placeholder-white/50 rounded-[2px] outline-none flex-1 min-w-[240px]"
                  required
                />
                <button
                  type="submit"
                  className="btn-accent whitespace-nowrap text-[10px] py-3 px-6"
                >
                  SUBSCRIBE &rarr;
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN 5-COLUMN FOOTER */}
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          
          {/* Column 1: Company */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-white font-medium tracking-wide border-b border-white/10 pb-2">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-offwhite/70">
              <li>
                <Link to="/our-story" className="hover:text-brass-light transition">
                  About Malhar
                </Link>
              </li>
              <li>
                <Link to="/our-story" className="hover:text-brass-light transition">
                  Our Konkan Heritage
                </Link>
              </li>
              <li>
                <Link to="/our-story" className="hover:text-brass-light transition">
                  Karigari & Master Craftsmen
                </Link>
              </li>
              <li>
                <Link to="/our-story" className="hover:text-brass-light transition">
                  Sustainable Teak Forestry
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brass-light transition">
                  Press & Media Features
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brass-light transition">
                  Careers at the Atelier
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Useful Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-white font-medium tracking-wide border-b border-white/10 pb-2">
              Useful Links
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-offwhite/70">
              <li>
                <Link to="/contact" className="hover:text-brass-light transition">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brass-light transition">
                  White-Glove Delivery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brass-light transition">
                  Returns & Exchange Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brass-light transition">
                  Wood & Cane Care Guide
                </Link>
              </li>
              <li>
                <Link to="/style-guide" className="hover:text-brass-light text-brass-light font-medium flex items-center gap-1">
                  <Sparkles size={11} /> Design System Guide
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brass-light transition">
                  Architect & Bulk Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Shop by Room */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-white font-medium tracking-wide border-b border-white/10 pb-2">
              Shop by Room
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-offwhite/70">
              <li>
                <Link to="/shop?category=Living" className="hover:text-brass-light transition">
                  Living Room Sanctuary
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Dining" className="hover:text-brass-light transition">
                  Dining & Feast Hall
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Bedroom" className="hover:text-brass-light transition">
                  Coastal Bedroom Retreat
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Outdoor%20Decor" className="hover:text-brass-light transition">
                  Veranda, Balcony & Garden
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Storage" className="hover:text-brass-light transition">
                  Study & Writing Nook
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Special%20Creations" className="hover:text-brass-light transition">
                  Pooja & Sacred Corners
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Need Help */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-white font-medium tracking-wide border-b border-white/10 pb-2">
              Need Help?
            </h4>
            <div className="space-y-3 text-xs font-sans text-offwhite/75">
              <div className="flex items-start gap-2.5">
                <Phone size={14} className="text-brass-light shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+919988776655" className="hover:text-brass-light font-semibold block text-white">
                    +91 99887 76655
                  </a>
                  <span className="text-[10px] text-offwhite/50">Mon – Sat, 9am – 7pm IST</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MessageCircle size={14} className="text-brass-light shrink-0 mt-0.5" />
                <div>
                  <a
                    href="https://wa.me/919988776655"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-brass-light font-semibold block text-white"
                  >
                    Chat on WhatsApp
                  </a>
                  <span className="text-[10px] text-offwhite/50">Average response: 15 mins</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail size={14} className="text-brass-light shrink-0 mt-0.5" />
                <div>
                  <a href="mailto:care@malharhomedecor.com" className="hover:text-brass-light block text-white">
                    care@malharhomedecor.com
                  </a>
                  <span className="text-[10px] text-offwhite/50">Order & bespoke inquiries</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <MapPin size={14} className="text-brass-light shrink-0 mt-0.5" />
                <p className="text-[11px] text-offwhite/65 leading-relaxed">
                  Atelier Malhar, Sea Coast Road, Ganpatipule, Ratnagiri, MH — 415615
                </p>
              </div>
            </div>
          </div>

          {/* Column 5: Socials & App Download Badges */}
          <div className="space-y-5">
            <h4 className="font-serif text-lg text-white font-medium tracking-wide border-b border-white/10 pb-2">
              Connect & Experience
            </h4>

            {/* Social Icons */}
            <div className="space-y-2">
              <span className="text-[10px] font-sans font-semibold tracking-wider text-offwhite/60 uppercase">
                Follow The Karigari
              </span>
              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href="https://instagram.com/malhar.homedecor"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-terracotta hover:scale-110 transition shadow-sm"
                >
                  <Instagram size={15} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-terracotta hover:scale-110 transition shadow-sm"
                >
                  <Facebook size={15} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-terracotta hover:scale-110 transition shadow-sm"
                >
                  <Youtube size={15} />
                </a>
                <a
                  href="https://wa.me/919988776655"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-terracotta hover:scale-110 transition shadow-sm"
                >
                  <MessageCircle size={15} />
                </a>
              </div>
            </div>

            {/* App Download Badges */}
            <div className="space-y-2.5 pt-2">
              <span className="text-[10px] font-sans font-semibold tracking-wider text-offwhite/60 uppercase block">
                Experience in 3D AR
              </span>

              {/* Apple App Store Badge */}
              <button
                type="button"
                onClick={() => triggerFooterToast("iOS")}
                className="flex items-center gap-3 bg-black/50 hover:bg-black/80 border border-white/20 px-3 py-2 rounded-[4px] transition group w-fit text-left"
              >
                {/* Apple Logo SVG */}
                <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.83-11.97-14.36-6.13-9.39-10.9-20.08-14.32-32.06-3.42-11.98-5.13-23.27-5.13-33.86 0-14.58 3.73-26.68 11.19-36.31 7.46-9.63 16.79-14.54 27.99-14.73 4.9 0 10.36 1.34 16.39 4.03 6.03 2.68 10.02 4.09 11.97 4.22 1.63-.13 5.89-1.63 12.78-4.5 6.89-2.87 12.74-4.14 17.55-3.81 12.96.98 23.36 5.88 31.2 14.71-11.45 6.91-17.06 16.4-16.84 28.47.22 9.53 3.86 17.56 10.92 24.1 7.07 6.53 15.42 10.23 25.07 11.09-2.07 6.13-4.57 12.27-7.51 18.42zM119.22 33.64c0-7.25 2.65-14.18 7.95-20.78 5.3-6.61 11.83-10.96 19.59-13.06.33 1.09.49 2.21.49 3.37 0 7.47-2.73 14.52-8.2 21.14-5.47 6.63-12.08 10.82-19.83 12.57-.22-1.09-.33-2.18-.33-3.24z"/>
                </svg>
                <div className="leading-tight">
                  <span className="block text-[8px] uppercase tracking-wider text-offwhite/60">
                    Download on the
                  </span>
                  <span className="block font-sans font-semibold text-xs text-white">
                    App Store
                  </span>
                </div>
              </button>

              {/* Google Play Store Badge */}
              <button
                type="button"
                onClick={() => triggerFooterToast("Android")}
                className="flex items-center gap-3 bg-black/50 hover:bg-black/80 border border-white/20 px-3 py-2 rounded-[4px] transition group w-fit text-left"
              >
                {/* Google Play Logo SVG */}
                <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 512 512">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                </svg>
                <div className="leading-tight">
                  <span className="block text-[8px] uppercase tracking-wider text-offwhite/60">
                    GET IT ON
                  </span>
                  <span className="block font-sans font-semibold text-xs text-white">
                    Google Play
                  </span>
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. BOTTOM UTILITY BAR & PAYMENT BADGES */}
      <div className="border-t border-white/10 bg-[#170E0B] py-6 text-xs text-offwhite/55 font-sans">
        <div className="container-page flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-center md:text-left space-y-1">
            <p className="text-[11px]">
              © {new Date().getFullYear()} Malhar Handcrafted Home Decor Pvt. Ltd. All rights reserved.
            </p>
            <p className="text-[10px] text-offwhite/40">
              Each piece is created, numbered and inspected at our Ganpatipule atelier.
            </p>
          </div>

          {/* Secure Payment Badges */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <div className="flex items-center gap-1.5 text-[10px] text-offwhite/70">
              <ShieldCheck size={14} className="text-brass-light" />
              <span>100% Encrypted & Safe Payments</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-2">
              <span className="bg-white/10 px-2 py-0.5 text-[9px] font-mono rounded text-white/80">UPI</span>
              <span className="bg-white/10 px-2 py-0.5 text-[9px] font-mono rounded text-white/80">VISA</span>
              <span className="bg-white/10 px-2 py-0.5 text-[9px] font-mono rounded text-white/80">MASTERCARD</span>
              <span className="bg-white/10 px-2 py-0.5 text-[9px] font-mono rounded text-white/80">RUPAY</span>
              <span className="bg-white/10 px-2 py-0.5 text-[9px] font-mono rounded text-white/80">NETBANKING</span>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
