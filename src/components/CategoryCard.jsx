import { Link } from "react-router-dom";
import SafeImage from "./SafeImage";

export default function CategoryCard({ category }) {
  return (
    <Link to={`/shop?category=${encodeURIComponent(category.name)}`} className="group flex flex-col bg-white overflow-hidden shadow-sm card-3d-hover">
      <div className="relative aspect-[4/3] overflow-hidden">
        <SafeImage
          src={category.image}
          alt={category.name}
          dimensions="600x600px"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-5 flex flex-col items-start">
        <p className="text-[10px] font-semibold tracking-[0.15em] text-wood uppercase">{category.name}</p>
        <p className="mt-1.5 text-[11px] text-wood/60">{category.subtitle}</p>
        <span className="mt-4 inline-block text-[10px] tracking-[0.18em] text-wood border-b border-wood/20 pb-0.5 transition group-hover:border-wood group-hover:text-terracotta">Explore &rarr;</span>
      </div>
    </Link>
  );
}
