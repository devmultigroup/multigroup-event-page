import { Sponsor } from "@/types";
import React from "react";
import Image from "next/image";

const SponsorSlider = ({
  sponsors,
  reverse = false,
}: {
  sponsors: Sponsor[];
  reverse?: boolean;
}) => {
  // Duplicate sponsors array once to ensure enough content for the loop
  const duplicatedSponsors = [
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
  ];

  return (
    <div className="w-full bg-blue-500">
      <div className="relative flex overflow-hidden h-40">
        {/* Main track */}
        <div
          className={`flex items-center ${
            reverse ? "animate-marquee-reverse" : "animate-marquee"
          }`}
        >
          {duplicatedSponsors.map((sponsor, index) => (
            <div
              key={`first-${sponsor.sponsorSlug}-${index}`}
              className="mx-8 flex-shrink-0"
            >
              <Image
                src={`/images/sponsors/${sponsor.sponsorSlug}.webp`}
                alt={`${sponsor.sponsorSlug} logo`}
                width={160}      // Adjust the width as needed
                height={56}      // Adjust the height as needed
                className="object-contain opacity-70 hover:opacity-100 select-none brightness-0 hover:brightness-100 hover:invert-0 ease-in-out duration-200 transition-all"
                draggable={false}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorSlider;
