/**
 * DiscountBadge Component
 * Premium artisanal badge displaying discounts or product highlights.
 *
 * @param {string} discount - e.g. "20% OFF", "-15%", "SAVE ₹500"
 * @param {string} variant - "terracotta" | "walnut" | "neutral" | "gold"
 * @param {string} className - extra CSS classes
 */
export default function DiscountBadge({
  discount,
  variant = "terracotta",
  className = "",
  size = "md"
}) {
  if (!discount) return null;

  const sizeClasses = {
    sm: "text-[9px] px-2 py-0.5 tracking-[0.14em]",
    md: "text-[10px] px-2.5 py-1 tracking-[0.16em]",
    lg: "text-[11px] px-3 py-1.5 tracking-[0.18em]"
  }[size] || "text-[10px] px-2.5 py-1 tracking-[0.16em]";

  const variantClasses = {
    terracotta: "bg-terracotta text-offwhite font-semibold shadow-warm-sm",
    walnut: "bg-walnut text-brass-light font-semibold border border-brass/20",
    neutral: "bg-beige-light text-walnut-muted border border-beige-border font-medium",
    gold: "bg-[#D4A373] text-walnut-dark font-bold shadow-warm-sm"
  }[variant] || "bg-terracotta text-offwhite font-semibold";

  return (
    <span
      className={`inline-flex items-center gap-1 font-sans uppercase rounded-[2px] select-none transition-all ${sizeClasses} ${variantClasses} ${className}`}
    >
      <span className="w-1 h-1 rounded-full bg-current opacity-70" />
      {discount}
    </span>
  );
}
