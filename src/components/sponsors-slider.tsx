import React from "react";

const SponsorSlider = ({ sponsors }: { sponsors: string[] }) => {
  // Duplicate sponsors array once to ensure enough content for the loop
  const duplicatedSponsors = [
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
  ];

  return (
    <div className="w-full bg-zinc-800">
      <div className="relative flex overflow-hidden h-40">
        {/* Main track */}
        <div className="animate-[marquee_15s_linear_infinite] flex items-center">
          {duplicatedSponsors.map((sponsor, index) => (
            <div
              key={`first-${sponsor}-${index}`}
              className="mx-8 flex-shrink-0"
            >
              <img
              draggable={false}
                src={`/images/sponsors/${sponsor}.png`}
                alt={`${sponsor} logo`}
                className="h-20 w-auto object-contain  opacity-70 hover:opacity-100 transition-opacity select-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorSlider;
