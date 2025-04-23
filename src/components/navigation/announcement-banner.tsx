"use client";

import { useEffect, useRef } from "react";
import { announcement } from "@/data/announcement";

export const AnnouncementBanner = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run the animation if the banner is shown
    if (!announcement.show) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Set up the animation
    const setupAnimation = () => {
      const scrollContent = scrollContainer.querySelector(
        ".scroll-content",
      ) as HTMLElement;
      if (!scrollContent) return;

      // Calculate the animation duration based on content width
      // Slower speed for longer text
      const contentWidth = scrollContent.offsetWidth;
      const duration = contentWidth * 0.005; // Adjust this multiplier to control speed

      // Apply the animation
      scrollContent.style.animationDuration = `${duration}s`;
    };

    setupAnimation();

    // Recalculate on resize
    window.addEventListener("resize", setupAnimation);
    return () => window.removeEventListener("resize", setupAnimation);
  }, []);

  if (!announcement.show) return null;

  return (
    <div
      className="w-full py-3 overflow-hidden"
      style={{
        backgroundColor: announcement.backgroundColor,
        color: announcement.textColor,
      }}
      ref={scrollRef}
    >
      <div className="scroll-container relative">
        <div className="scroll-content whitespace-nowrap inline-block animate-scroll">
          {/* Repeat the text multiple times with spacing */}
          {[...Array(5)].map((_, i) => (
            <span key={i} className="inline-block px-8">
              {announcement.text}
              {announcement.showLink && (
                <a
                  href={announcement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 underline hover:no-underline"
                >
                  {announcement.linkText || "Daha fazla"}
                </a>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
