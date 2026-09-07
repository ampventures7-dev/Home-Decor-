import { Link } from "react-router-dom";
import { formatPrice } from "../data/products";
import SafeImage from "./SafeImage";

export default function CollectionCarousel({ products }) {
  return (
    <section className="py-16 sm:py-24 bg-ivory">
      <div className="container-page">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="display text-3xl sm:text-4xl text-wood">New From The Workshop</h2>
            <span className="hidden sm:inline-block bg-[#A85C3A] text-white text-[8px] tracking-[0.15em] px-2 py-1 uppercase font-medium rounded-sm">New Collection</span>
          </div>
          <div className="flex items-center gap-3 text-wood/30">
            <button className="h-6 w-6 rounded-full border border-wood/20 flex items-center justify-center hover:border-wood/60 hover:text-wood transition"><span className="text-[10px]">&larr;</span></button>
            <button className="h-6 w-6 rounded-full border border-wood/20 flex items-center justify-center hover:border-wood/60 hover:text-wood transition"><span className="text-[10px]">&rarr;</span></button>
          </div>
        </div>
        <div className="mt-10 flex gap-4 overflow-x-auto pb-4 snap-x">
          {products.slice(0,5).map(p => (
            <Link to={`/product/${p.id}`} key={p.id} className="min-w-[280px] sm:min-w-[340px] snap-start flex bg-[#F8F5F0] border border-wood/5 group">
              <div className="w-2/5 aspect-square overflow-hidden shrink-0">
                <SafeImage
                  src={p.image}
                  alt={p.name}
                  dimensions="600x600px"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col justify-center">
                <p className="display text-lg text-wood leading-tight">{p.name}</p>
                <p className="mt-2 text-sm text-wood/60 font-medium">{formatPrice(p.price)}</p>
                <span className="mt-4 text-[9px] tracking-[0.18em] text-terracotta flex items-center gap-1 group-hover:text-wood transition">View Product <span className="text-[10px]">&rarr;</span></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
