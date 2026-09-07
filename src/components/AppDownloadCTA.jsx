import { useState } from "react";
import { Sparkles, Check, MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";

export default function AppDownloadCTA() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const [appToast, setAppToast] = useState(null);

  const triggerAppToast = (platform) => {
    setAppToast(`Malhar ${platform} App with 3D AR Room Scanner: Currently in private atelier beta! Public launch coming soon.`);
    setTimeout(() => setAppToast(null), 4000);
  };

  return (
    <section className="container-page pb-16 sm:pb-24 select-none relative">
      {/* Sleek App Toast Notification */}
      {appToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-walnut text-offwhite px-5 py-3.5 shadow-warm-lg border border-brass/40 animate-fadeIn rounded-[2px]">
          <div className="w-5 h-5 rounded-full bg-brass text-walnut flex items-center justify-center shrink-0">
            <Sparkles size={12} />
          </div>
          <span className="text-xs font-sans tracking-wide">{appToast}</span>
        </div>
      )}

      <div className="bg-gradient-to-br from-walnut via-[#35231B] to-walnut text-offwhite rounded-[2px] p-8 sm:p-14 shadow-warm-lg border border-brass/25 relative overflow-hidden">
        
        {/* Subtle decorative artisan watermark */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
          <svg width="280" height="280" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M50 10 L50 90 M10 50 L90 50 M25 25 L75 75 M25 75 L75 25" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>

        <div className="relative z-10 grid gap-12 lg:grid-cols-2 items-center">
          
          {/* Left Column: App Download & AR Experience */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-brass/20 text-brass-light px-3 py-1 text-[9px] font-sans font-semibold tracking-[0.24em] uppercase rounded-[1px] border border-brass/30">
              <Sparkles size={11} />
              <span>EXPERIENCE IN AUGMENTED REALITY</span>
            </div>

            <h2 className="display text-3xl sm:text-5xl text-white font-normal leading-[1.1]">
              Preview Real Teak in Your Living Space.
            </h2>

            <p className="text-xs sm:text-sm text-offwhite/80 font-sans leading-relaxed max-w-md">
              Download the Malhar app to inspect 360° wood grain, place true-to-scale daybeds &amp; tables via AR room scanner, and receive secret artisan collection drops.
            </p>

            {/* App Store & Google Play Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {/* Apple App Store */}
              <button
                type="button"
                onClick={() => triggerAppToast("iOS")}
                className="flex items-center gap-3 bg-black/60 hover:bg-black/90 border border-white/25 px-4 py-2.5 rounded-[4px] transition group shadow-warm-sm"
              >
                <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.83-11.97-14.36-6.13-9.39-10.9-20.08-14.32-32.06-3.42-11.98-5.13-23.27-5.13-33.86 0-14.58 3.73-26.68 11.19-36.31 7.46-9.63 16.79-14.54 27.99-14.73 4.9 0 10.36 1.34 16.39 4.03 6.03 2.68 10.02 4.09 11.97 4.22 1.63-.13 5.89-1.63 12.78-4.5 6.89-2.87 12.74-4.14 17.55-3.81 12.96.98 23.36 5.88 31.2 14.71-11.45 6.91-17.06 16.4-16.84 28.47.22 9.53 3.86 17.56 10.92 24.1 7.07 6.53 15.42 10.23 25.07 11.09-2.07 6.13-4.57 12.27-7.51 18.42zM119.22 33.64c0-7.25 2.65-14.18 7.95-20.78 5.3-6.61 11.83-10.96 19.59-13.06.33 1.09.49 2.21.49 3.37 0 7.47-2.73 14.52-8.2 21.14-5.47 6.63-12.08 10.82-19.83 12.57-.22-1.09-.33-2.18-.33-3.24z"/>
                </svg>
                <div className="leading-tight text-left">
                  <span className="block text-[8px] uppercase tracking-wider text-offwhite/60">
                    Download on the
                  </span>
                  <span className="block font-sans font-semibold text-xs text-white">
                    App Store
                  </span>
                </div>
              </button>

              {/* Google Play Store */}
              <button
                type="button"
                onClick={() => triggerAppToast("Android")}
                className="flex items-center gap-3 bg-black/60 hover:bg-black/90 border border-white/25 px-4 py-2.5 rounded-[4px] transition group shadow-warm-sm"
              >
                <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 512 512">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                </svg>
                <div className="leading-tight text-left">
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

          {/* Right Column: First Order Discount & Newsletter */}
          <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-[2px] border border-white/15 space-y-4">
            <div>
              <span className="text-brass-light font-mono text-[10px] tracking-widest uppercase">
                FIRST ORDER PRIVILEGE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                Receive ₹1,000 Off
              </h3>
              <p className="text-xs text-offwhite/75 font-sans mt-1">
                Subscribe to our patron dispatch. We'll send an instant ₹1,000 gift voucher for your first solid teak or decor order.
              </p>
            </div>

            {subscribed ? (
              <div className="p-4 bg-[#1E3025] border border-brass/40 rounded-[2px] space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 text-brass-light font-serif text-sm">
                  <Check size={16} />
                  <span>Welcome to Malhar Craft Club!</span>
                </div>
                <p className="text-xs text-offwhite/80 font-sans">
                  Your voucher code: <strong className="font-mono text-white bg-black/40 px-2 py-0.5 rounded">MALHAR1000</strong> (Applicable on orders &gt; ₹5,000).
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-black/30 border border-white/20 focus:border-brass-light px-4 py-3 text-xs font-sans text-white placeholder-white/50 rounded-[2px] outline-none flex-1"
                    required
                  />
                  <button type="submit" className="btn-accent py-3 px-5 text-[10px] whitespace-nowrap">
                    CLAIM ₹1,000 VOUCHER &rarr;
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-offwhite/60 font-sans">
                  <ShieldCheck size={12} className="text-brass-light" />
                  <span>Zero spam. Handcrafted stories &amp; invitations only.</span>
                </div>
              </form>
            )}

            {/* Direct WhatsApp Concierge */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-offwhite/70 font-sans">
                Prefer WhatsApp for custom orders?
              </span>
              <a
                href="https://wa.me/919988776655"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-brass-light hover:text-white transition font-sans font-semibold"
              >
                <MessageCircle size={14} />
                <span>Chat Now &rarr;</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
