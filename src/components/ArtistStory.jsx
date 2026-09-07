import { Link } from "react-router-dom";
import SafeImage from "./SafeImage";

export default function ArtistStory() {
  return (
    <div className="grid overflow-hidden bg-[#E8E0D5] lg:grid-cols-2 col-span-1 md:col-span-2 shadow-sm">
      <div className="min-h-[300px] lg:min-h-full">
        <SafeImage
          className="h-full w-full object-cover"
          src="/images/banners/artist-story.jpg"
          dimensions="800x800px"
          alt="Artist working"
        />
      </div>
      <div className="flex flex-col justify-center px-8 py-10 sm:px-12">
        <h2 className="display text-3xl sm:text-4xl text-wood">Meet the Artist</h2>
        <p className="mt-4 text-[22px] italic leading-[1.2] text-wood/80 font-display">"Every piece begins with an idea, a little imagination and a lot of karigari."</p>
        <p className="mt-5 text-xs leading-6 text-wood/60">Born in Sawantwadi, Malhar Rane creates handcrafted artworks inspired by tradition, nature and the everyday beauty of Konkan.</p>
        <Link to="/our-story" className="mt-7 inline-flex w-fit bg-[#A85C3A] text-white px-5 py-3 text-[10px] tracking-[0.18em] transition hover:bg-[#8F4E31]">READ OUR STORY &rarr;</Link>
      </div>
    </div>
  );
}
