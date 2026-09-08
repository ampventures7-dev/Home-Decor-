import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Send,
  ExternalLink
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "Custom Bespoke Furniture",
    preferredContact: "WhatsApp",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Please enter your name.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errs.phone = "Please enter a valid 10-digit phone number.";
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = "Please describe what you are looking for (at least 10 characters).";
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const faqs = [
    {
      q: "How are heavy solid teak pieces delivered across India?",
      a: "All furniture is wrapped in non-abrasive soft padding, double-crated inside industrial wooden frames, and transported via dedicated white-glove logistics. Delivery includes unboxing and placement in your room of choice."
    },
    {
      q: "Can I commission bespoke dimensions for lounge seating, daybeds, or dining tables?",
      a: "Yes. Because every piece is made by our master carpenters in Ganpatipule, we routinely customize dimensions, timber stains (natural teak, walnut, or smoked charcoal), and fabric choices to fit your room."
    },
    {
      q: "Can I visit the Ganpatipule atelier to watch the karigars work?",
      a: "We welcome patrons! Our studio is open Tuesday to Sunday, 10:00 AM to 7:00 PM. We recommend booking an appointment via this contact form or WhatsApp so Master Craftsman Malhar or a senior artisan can guide you."
    },
    {
      q: "What is your replacement policy for handcrafted ceramics and decor?",
      a: "If any piece arrives damaged during transit, simply share photos with us within 48 hours. We provide immediate complimentary replacement or a full refund under our Safe Transit Crating Guarantee."
    },
    {
      q: "How should I maintain seasoned teakwood and natural cane?",
      a: "Dust gently with a dry microfibre cloth. Avoid harsh chemical cleaners. To maintain the rich golden lustre of the teak, apply a dab of beeswax polish once or twice a year."
    }
  ];

  return (
    <main className="min-h-screen bg-offwhite page-enter">
      {/* 1. HERO HEADER */}
      <section className="bg-beige-light/40 border-b border-beige-border/70 py-14 sm:py-20">
        <div className="container-page max-w-4xl text-center mx-auto">
          <p className="eyebrow flex items-center justify-center gap-1.5">
            <Sparkles size={12} className="text-terracotta" />
            CONNECT WITH THE ATELIER
          </p>
          <h1 className="display mt-3 text-4xl sm:text-6xl text-walnut">
            Let's Shape Something Timeless.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-charcoal/70 font-sans leading-relaxed max-w-2xl mx-auto">
            Whether you are commissioning a bespoke dining table, designing a complete residence, or planning a visit to our coastal workshop, we'd love to converse.
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTACT DETAILS & FORM */}
      <section className="container-page py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Studio Information & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-beige-border p-6 sm:p-8 rounded-[2px] shadow-warm-sm">
              <h2 className="font-serif text-2xl font-bold text-walnut mb-6">
                Ganpatipule Studio
              </h2>

              <div className="space-y-6 text-xs font-sans">
                {/* Physical Location */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-beige-light border border-beige-border flex items-center justify-center text-terracotta shrink-0 mt-0.5">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <strong className="block text-walnut text-sm">Workshop & Atelier</strong>
                    <span className="text-charcoal/70 leading-relaxed block mt-1">
                      Beach Road, Near Temple Pathway<br />
                      Ganpatipule, Ratnagiri District<br />
                      Maharashtra — 415615, India
                    </span>
                  </div>
                </div>

                {/* Visiting Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-beige-light border border-beige-border flex items-center justify-center text-terracotta shrink-0 mt-0.5">
                    <Clock size={16} />
                  </div>
                  <div>
                    <strong className="block text-walnut text-sm">Visiting Hours</strong>
                    <span className="text-charcoal/70 leading-relaxed block mt-1">
                      Tuesday – Sunday: 10:00 AM – 7:00 PM IST<br />
                      <em className="text-terracotta not-italic font-medium">Mondays Closed for Timber Seasoning</em>
                    </span>
                  </div>
                </div>

                {/* Direct Phone Helpline */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-beige-light border border-beige-border flex items-center justify-center text-terracotta shrink-0 mt-0.5">
                    <Phone size={16} />
                  </div>
                  <div>
                    <strong className="block text-walnut text-sm">Direct Phone Line</strong>
                    <a
                      href="tel:+919988776655"
                      className="text-terracotta hover:underline font-semibold block mt-1"
                    >
                      +91 99887 76655
                    </a>
                    <span className="text-charcoal/50 text-[11px] block mt-0.5">
                      Direct line to our customer craft concierge
                    </span>
                  </div>
                </div>

                {/* WhatsApp Direct Chat */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <strong className="block text-walnut text-sm">WhatsApp Craft Concierge</strong>
                    <a
                      href="https://wa.me/919988776655?text=Hello%20Malhar%20Atelier,%20I%20would%20like%20to%20inquire%20about%20handcrafted%20decor."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-emerald-800 font-bold hover:underline mt-1"
                    >
                      <span>Chat on WhatsApp (+91 99887 76655)</span>
                      <ExternalLink size={12} />
                    </a>
                    <span className="text-charcoal/50 text-[11px] block mt-0.5">
                      Fastest response for finish photos & custom sizing
                    </span>
                  </div>
                </div>
              </div>

              {/* Department Inquiries Table */}
              <div className="mt-8 pt-6 border-t border-beige-border space-y-3 text-xs font-sans">
                <p className="font-semibold text-walnut uppercase tracking-wider text-[10px]">
                  Specialized Correspondence:
                </p>
                <div className="flex justify-between text-charcoal/70">
                  <span>Custom Bespoke Furniture:</span>
                  <a href="mailto:bespoke@malhardecor.com" className="text-walnut hover:text-terracotta font-mono font-medium">
                    bespoke@malhardecor.com
                  </a>
                </div>
                <div className="flex justify-between text-charcoal/70">
                  <span>Architects & Interior Designers:</span>
                  <a href="mailto:trade@malhardecor.com" className="text-walnut hover:text-terracotta font-mono font-medium">
                    trade@malhardecor.com
                  </a>
                </div>
                <div className="flex justify-between text-charcoal/70">
                  <span>General Support:</span>
                  <a href="mailto:care@malhardecor.com" className="text-walnut hover:text-terracotta font-mono font-medium">
                    care@malhardecor.com
                  </a>
                </div>
              </div>
            </div>

            {/* Coastal Landmark Location Card */}
            <div className="p-5 bg-beige-light/50 border border-beige-border rounded-[2px] text-xs font-sans text-charcoal/75 flex items-center justify-between">
              <div>
                <p className="font-serif font-bold text-walnut text-sm">Travelling to Ganpatipule?</p>
                <p className="mt-0.5 text-[11px]">Located 45 mins from Ratnagiri Railway Station. Guest parking available.</p>
              </div>
              <a
                href="https://maps.google.com/?q=Ganpatipule+Maharashtra"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary py-2 px-3 text-[10px] shrink-0"
              >
                Open Maps →
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-beige-border p-6 sm:p-10 rounded-[2px] shadow-warm-sm">
              {!isSuccess ? (
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-walnut">
                    Send an Inquiry
                  </h2>
                  <p className="mt-1 text-xs text-charcoal/60 font-sans">
                    Fill out the details below and our atelier team will respond within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {/* Full Name & Phone Number */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-sans font-bold text-walnut uppercase tracking-wider mb-2">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Radhika Apte"
                          className="w-full bg-beige-light/30 border border-beige-border px-3.5 py-2.5 text-xs text-charcoal focus:border-walnut focus:bg-white outline-none rounded-[1px] transition"
                        />
                        {errors.name && (
                          <p className="mt-1 text-[11px] text-red-600 font-sans">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-sans font-bold text-walnut uppercase tracking-wider mb-2">
                          Contact Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-beige-light/30 border border-beige-border px-3.5 py-2.5 text-xs text-charcoal focus:border-walnut focus:bg-white outline-none rounded-[1px] transition"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-[11px] text-red-600 font-sans">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Email Address & Inquiry Type */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-sans font-bold text-walnut uppercase tracking-wider mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. radhika@example.com"
                          className="w-full bg-beige-light/30 border border-beige-border px-3.5 py-2.5 text-xs text-charcoal focus:border-walnut focus:bg-white outline-none rounded-[1px] transition"
                        />
                        {errors.email && (
                          <p className="mt-1 text-[11px] text-red-600 font-sans">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-sans font-bold text-walnut uppercase tracking-wider mb-2">
                          Inquiry Nature
                        </label>
                        <select
                          value={formData.inquiryType}
                          onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                          className="w-full bg-beige-light/30 border border-beige-border px-3.5 py-2.5 text-xs text-charcoal focus:border-walnut focus:bg-white outline-none rounded-[1px] transition"
                        >
                          <option>Custom Bespoke Furniture</option>
                          <option>Trade / Architect Bulk Order</option>
                          <option>Studio Visit Appointment</option>
                          <option>Online Order Tracking</option>
                          <option>Press & Media Feature</option>
                        </select>
                      </div>
                    </div>

                    {/* Preferred Mode of Reply */}
                    <div>
                      <label className="block text-xs font-sans font-bold text-walnut uppercase tracking-wider mb-2">
                        Preferred Mode of Reply
                      </label>
                      <div className="flex gap-4 text-xs font-sans">
                        {["WhatsApp", "Phone Call", "Email"].map((mode) => (
                          <label key={mode} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="preferredContact"
                              value={mode}
                              checked={formData.preferredContact === mode}
                              onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                              className="accent-walnut"
                            />
                            <span className="text-charcoal/80">{mode}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Message Area */}
                    <div>
                      <label className="block text-xs font-sans font-bold text-walnut uppercase tracking-wider mb-2">
                        Your Project or Inquiry Details *
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about the room, preferred timber finish, dimensions, or specific pieces you're interested in..."
                        className="w-full bg-beige-light/30 border border-beige-border p-3.5 text-xs text-charcoal focus:border-walnut focus:bg-white outline-none rounded-[1px] transition resize-none"
                      />
                      {errors.message && (
                        <p className="mt-1 text-[11px] text-red-600 font-sans">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full py-3.5 text-xs shadow-warm-md flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Transmitting to Atelier...</span>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Submit Atelier Inquiry</span>
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-center text-charcoal/50 font-sans">
                      We respect your privacy. No marketing spam, only direct master craft correspondence.
                    </p>
                  </form>
                </div>
              ) : (
                /* Success Confirmation State */
                <div className="text-center py-10 animate-fadeIn">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5">
                    <CheckCircle2 size={36} />
                  </div>
                  <p className="eyebrow text-emerald-800">MESSAGE DELIVERED</p>
                  <h3 className="display mt-1 text-3xl text-walnut">
                    Inquiry Received.
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm font-sans text-charcoal/70 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Your inquiry regarding <em>"{formData.inquiryType}"</em> has been routed directly to our Ganpatipule atelier. A craftsman will connect via <strong>{formData.preferredContact}</strong> within 24 hours.
                  </p>

                  <div className="mt-8 flex justify-center gap-4">
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          inquiryType: "Custom Bespoke Furniture",
                          preferredContact: "WhatsApp",
                          message: ""
                        });
                      }}
                      className="btn-secondary text-xs"
                    >
                      Send Another Message
                    </button>
                    <Link to="/shop" className="btn-primary text-xs">
                      Explore Handcrafted Decor
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAQ ACCORDION SECTION */}
      <section className="bg-beige-light/30 border-t border-beige-border/70 py-16 sm:py-24">
        <div className="container-page max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow">COMMON QUERIES</p>
            <h2 className="display mt-2 text-3xl sm:text-4xl text-walnut">
              Frequently Asked Questions.
            </h2>
            <p className="mt-2 text-xs text-charcoal/60 font-sans">
              Everything you need to know about our slow-crafted decor and nationwide transit.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-beige-border rounded-[2px] overflow-hidden transition-all shadow-warm-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-beige-light/20 transition"
                  >
                    <span className="font-serif text-base font-bold text-walnut">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-walnut/60 transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180 text-terracotta" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm font-sans text-charcoal/75 leading-relaxed border-t border-beige-border/40 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
