import { useState, useEffect } from "react";

/**
 * SafeImage Component
 * - Displays the image if found at `src`.
 * - While loading or if missing/404, renders a clean, muted gray placeholder box
 *   with the exact expected filename and suggested dimensions.
 * - Suppresses browser broken-image icons completely.
 * - Once an image is dropped into the folder, it shows automatically without code changes.
 */
export default function SafeImage({
  src,
  alt = "",
  className = "",
  dimensions = "400x400px",
  label = "",
  style = {},
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setHasError(false);
  }, [src]);

  // Derive human-readable filename from path e.g. "/images/products/product-1.jpg" -> "product-1.jpg"
  const filename = label || (src ? src.split("/").pop() : "image.jpg");

  const isAbsolute = className.includes("absolute");
  const containerClasses = [
    isAbsolute ? "absolute inset-0" : "relative w-full h-full",
    "flex flex-col items-center justify-center text-[#5C5549] p-3 text-center select-none border border-neutral-300/70 transition-colors duration-300",
    !loaded && !hasError ? "skeleton-shimmer" : "bg-[#ECEAE5]",
    className.replace(/object-[a-z]+/g, ""),
  ].join(" ");

  return (
    <>
      {(!loaded || hasError || !src) && (
        <div
          className={containerClasses}
          style={style}
          title={`Expected image: ${src} (${dimensions})`}
        >
          <div className="flex flex-col items-center justify-center max-w-full px-2 pointer-events-none">
            {/* Minimalist image outline icon */}
            <svg
              className={`w-5 h-5 mb-1.5 opacity-40 shrink-0 text-current ${!loaded && !hasError ? "animate-pulse" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>

            {/* Expected Filename */}
            <span className="font-mono text-xs font-semibold tracking-wide text-[#3D372E] break-all leading-tight max-w-full">
              {filename}
            </span>

            {/* Target Dimensions */}
            <span className="font-mono text-[11px] text-[#7A7265] mt-0.5 tracking-tight flex items-center gap-1">
              {!loaded && !hasError && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brass animate-ping" />
              )}
              {dimensions}
            </span>
          </div>
        </div>
      )}

      {src && !hasError && (
        <img
          src={src}
          alt={alt || filename}
          className={`${className} ${!loaded ? "opacity-0 absolute inset-0 pointer-events-none" : "opacity-100 transition-opacity duration-300"}`}
          style={style}
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
          {...props}
        />
      )}
    </>
  );
}
