import SafeImage from "./SafeImage";

export default function InstagramGrid() {
  const imgs = [
    "/images/banners/instagram-1.jpg",
    "/images/banners/instagram-2.jpg",
    "/images/banners/instagram-3.jpg",
    "/images/banners/instagram-4.jpg",
    "/images/banners/instagram-5.jpg"
  ];
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page text-center">
        <p className="eyebrow text-terracotta">@MALHAR.HOMEDECOR</p>
        <h2 className="display mt-3 text-5xl">Follow The Journey</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-wood/65">Behind the scenes, new creations and everyday karigari.</p>
        <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-5">
          {imgs.map((img, i) => (
            <div key={img} className={`aspect-square h-full w-full overflow-hidden ${i === 1 ? "md:translate-y-6" : ""}`}>
              <SafeImage
                src={img}
                alt={`Malhar Instagram ${i + 1}`}
                dimensions="600x600px"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        <a href="https://instagram.com/malhar.homedecor" target="_blank" rel="noreferrer" className="btn-outline mt-10">FOLLOW ON INSTAGRAM</a>
      </div>
    </section>
  );
}
