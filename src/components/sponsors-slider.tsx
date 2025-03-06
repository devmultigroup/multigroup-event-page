import { Sponsor } from "@/types";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

const SponsorSlider = ({
  sponsors,
  reverse = false,
}: {
  sponsors: Sponsor[];
  reverse?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const firstItem = container.firstElementChild as HTMLElement;
    if (!firstItem) return;

    const scroll = () => {
      if (!container) return;
      
      if (reverse) {
        if (container.scrollLeft === 0) {
          container.scrollLeft = container.scrollWidth / 2;
        }
        container.scrollLeft -= 2;
      } else {
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
        container.scrollLeft += 2;
      }
    };

    const animation = setInterval(scroll, 10);
    return () => clearInterval(animation);
  }, [reverse]);

  // Create two sets of sponsors for seamless looping
  const duplicatedSponsors = [...sponsors, ...sponsors];

  return (
    <div className="w-full bg-blue-500">
      <div 
        ref={containerRef}
        className="flex items-center h-40 overflow-hidden"
        style={{ scrollBehavior: 'auto' }}
      >
        {duplicatedSponsors.map((sponsor, index) => (
          <div
            key={`${sponsor.sponsorSlug}-${index}`}
            className="mx-8 flex-shrink-0"
          >
            <Image
              src={`/images/sponsors/${sponsor.sponsorSlug}.webp`}
              alt={`${sponsor.sponsorSlug} logo`}
              width={160}
              height={56}
              className="object-contain opacity-70 hover:opacity-100 select-none brightness-0 hover:brightness-100 hover:invert-0 ease-in-out duration-200 transition-all"
              draggable={false}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorSlider;
