import { Truck, Users, ShieldCheck, Hammer } from "lucide-react";

export default function TrustStrip() {
  const features = [
    {
      icon: Truck,
      title: "Free White-Glove Delivery",
      subtitle: "Complimentary placement & assembly on orders above ₹10,000"
    },
    {
      icon: Users,
      title: "25,000+ Happy Homes",
      subtitle: "Rated 4.9/5 by craft lovers and architects across India"
    },
    {
      icon: ShieldCheck,
      title: "10-Year Timber Warranty",
      subtitle: "100% kiln-dried seasoned teakwood against termites & warping"
    },
    {
      icon: Hammer,
      title: "100% In-House Karigari",
      subtitle: "Directly made by master artisans in our Ganpatipule atelier"
    }
  ];

  return (
    <section className="border-y border-beige-border bg-white/70 py-8 sm:py-10 select-none">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-beige-border/80">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-start gap-4 ${
                  index > 0 ? "pt-4 sm:pt-0 sm:pl-6" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-beige-light flex items-center justify-center text-terracotta shrink-0 border border-beige-border/60">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-base text-walnut font-medium leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs font-sans text-charcoal/65 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
