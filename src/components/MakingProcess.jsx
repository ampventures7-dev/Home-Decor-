import SafeImage from "./SafeImage";

const steps = [
  ["SHAPE", "Raw material", "/images/banners/process-shape.jpg"],
  ["CRAFT", "Shaping & carving", "/images/banners/process-craft.jpg"],
  ["PAINT", "Hand painting", "/images/banners/process-paint.jpg"],
  ["CREATE", "Finished creation", "/images/banners/process-create.jpg"]
];

export default function MakingProcess() {
  return (
    <section className="bg-[#1E3025] py-16 sm:py-24 border-y border-wood/10 relative text-white">
      <div className="container-page relative flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
        <div className="max-w-sm shrink-0">
          <p className="eyebrow text-white/60 normal-case text-sm tracking-wider">The Making of Malhar</p>
          <h2 className="display mt-3 text-4xl leading-tight text-white sm:text-5xl">From Giving It Shape<br/>to Painting It by Hand.</h2>
        </div>
        <div className="flex w-full items-center justify-between overflow-x-auto pb-4 lg:pb-0 gap-4">
          {steps.map(([label, sub, image], index) => (
            <div key={label} className="flex items-center shrink-0 w-full justify-between" style={{maxWidth: 'max-content'}}>
              <div className="group flex flex-col items-center">
                <div className="h-24 w-32 sm:h-28 sm:w-40 overflow-hidden card-3d-hover shadow-md border border-white/10">
                  <SafeImage
                    src={image}
                    alt={sub}
                    dimensions="400x300px"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <span className="mt-3 text-[10px] tracking-[0.2em] text-white/80 uppercase">{label}</span>
              </div>
              {index < steps.length - 1 && <span className="text-white/40 text-sm mx-4 sm:mx-8">&rarr;</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
