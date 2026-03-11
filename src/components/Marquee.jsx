function MarqueeRow({ logos = [], direction = "left", speed, loading }) {
  const skeletonLogos = Array.from({ length: 10 });
  const repeatedLogos = [...logos, ...logos];

  return (
    <div className="overflow-hidden w-full">
      <div
        className={`flex w-max gap-12 py-2 ${
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {loading
          ? skeletonLogos.map((_, index) => (
              <div
                key={index}
                className="h-20 w-32 shrink-0 bg-white rounded-md animate-pulse"
              ></div>
            ))
          : repeatedLogos.map((logo, i) => (
              <img
                key={`${logo}-${i}`}
                src={logo}
                alt={`client-logo-${i}`}
                className="h-20 shrink-0 object-contain bg-white rounded-md"
              />
            ))}
      </div>
    </div>
  );
}

export default MarqueeRow;
