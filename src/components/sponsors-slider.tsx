"use client";

import type { Sponsor } from "@/types";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SponsorSlider = ({
  sponsors,
  reverse = false,
  speed = 1, // Pixels per animation frame
}: {
  sponsors: Sponsor[];
  reverse?: boolean;
  speed?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner || sponsors.length === 0) return;

    // Wait for images to load to get accurate measurements
    const timer = setTimeout(() => {
      setInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [sponsors]);

  useEffect(() => {
    if (!initialized) return;

    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner || sponsors.length === 0) return;

    // Get all sponsor items
    const items = Array.from(inner.querySelectorAll(".sponsor-item"));
    if (items.length === 0) return;

    // Calculate the total width of all original sponsor items
    const totalWidth = items.slice(0, sponsors.length).reduce((sum, item) => {
      const style = window.getComputedStyle(item);
      const marginLeft = Number.parseFloat(style.marginLeft || "0");
      const marginRight = Number.parseFloat(style.marginRight || "0");
      return (
        sum + item.getBoundingClientRect().width + marginLeft + marginRight
      );
    }, 0);

    // Set the initial position
    let position = 0;

    const animate = () => {
      // Move in the specified direction
      position += reverse ? speed : -speed;

      // Check if we need to reset position
      if (!reverse && position <= -totalWidth) {
        // If scrolling left (normal), reset when first set is completely scrolled out
        position += totalWidth;
      } else if (reverse && position >= totalWidth) {
        // If scrolling right (reverse), reset when first set is completely scrolled out
        position -= totalWidth;
      }

      // Apply the transform
      inner.style.transform = `translateX(${position}px)`;

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [sponsors, reverse, speed, initialized]);

  // Create enough duplicates to ensure continuous scrolling
  // We need at least 3 sets to ensure there's always content visible
  const duplicatedSponsors = [
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
  ];

  return (
    <div className="w-full flex justify-center bg-color-background overflow-hidden">
      <div className="w-2/3 relative">
        {/* Fading edge - left */}
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-color-background to-transparent z-10"></div>
        
        {/* Carousel container */}
        <div ref={containerRef} className="relative h-40 overflow-hidden">
          <div
            ref={innerRef}
            className="flex items-center absolute h-full"
            style={{ willChange: "transform" }}
          >
            {duplicatedSponsors.map((sponsor, index) => (
              <div
                key={`${sponsor.sponsorSlug}-${index}`}
                className="mx-8 flex-shrink-0 sponsor-item"
              >
                <Image
                  src={`/images/sponsors/${sponsor.sponsorSlug}.webp`}
                  alt={`${sponsor.sponsorSlug} logo`}
                  width={160}
                  height={56}
                  className="object-contain opacity-80 filter transition-all duration-200 ease-in-out grayscale brightness-[15%] contrast-[100%] hover:opacity-100 hover:grayscale-0 hover:brightness-110 hover:contrast-100"
                  draggable={false}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Fading edge - right */}
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-color-background to-transparent z-10"></div>
      </div>
    </div>
  );
};

export default SponsorSlider;
