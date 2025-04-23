"use client";
import { motion, Variants } from "framer-motion";
import { useState, MouseEvent } from "react";

export default function EventBadge() {
  const [isClicked, setIsClicked] = useState(false);
  const [tilt, setTilt] = useState(0);

  const badgeVariants: Variants = {
    // A subtle "swing" effect continuously runs in the background.
    swing: {
      rotateZ: [-0.5, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
    click: {
      y: [0, -5, 0],
      transition: {
        duration: 0.3,
        type: "tween",
      },
    },
  };

  // Update tilt based on the mouse position relative to the badge center.
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const diffX = e.clientX - centerX;
    // Calculate ratio; the maximum tilt (in degrees) is set to 10° at the far edges.
    const maxTilt = 10;
    const tiltAngle = (diffX / (bounds.width / 2)) * maxTilt;
    setTilt(tiltAngle);
  };

  const handleMouseLeave = () => {
    setTilt(0);
  };

  return (
    <motion.div
      className="absolute sm:top-40 lg:right-40 w-56 h-72 sm:w-64 sm:h-84 lg:w-72 lg:h-96"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="h-full w-full bg-black rounded-lg shadow-2xl relative overflow-hidden border border-neutral-800"
        // Combine variants for continuous swing and click effects.
        variants={badgeVariants}
        animate={["swing", isClicked ? "click" : ""]}
        // Add our dynamic tilt using inline style.
        style={{ rotateZ: tilt }}
        whileTap={{ scale: 0.98 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTapStart={() => setIsClicked(true)}
        onTap={() => setIsClicked(false)}
      >
        {/* Reflective Borders but more subtle */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: tilt !== 0 ? "100%" : "-100%",
              opacity: tilt !== 0 ? 0.7 : 0,
            }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Two-section design similar to the image */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Top Section - Contains the main title on black background (70% height) */}
          <div
            className="flex-grow flex flex-col items-center justify-center px-3"
            style={{ height: "70%" }}
          >
            <h1
              className="text-white text-center font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl w-full"
              style={{
                fontFamily: "serif",
                letterSpacing: "-0.02em",
                lineHeight: "1.1",
                fontWeight: "800",
                fontStyle: "normal",
                transform: "scaleY(1.05)",
              }}
            >
              <span className="block mb-1">MOBILE</span>
              <span className="block mb-1">DEVELOPER</span>
              <span className="block">SUMMIT</span>
            </h1>
          </div>

          {/* Bottom Section - White background with speaker info (30% height) */}
          <div
            className="bg-white text-black flex flex-col justify-between p-4 relative"
            style={{ height: "30%" }}
          >
            <div>
              <h2 className="text-neutral-800 text-xs sm:text-sm md:text-base font-semibold mb-0.5">
                Speaker
              </h2>
              <h1 className="text-black font-bold text-base sm:text-lg md:text-xl">
                Serkan Alıç
              </h1>
              <p className="text-red-500 font-medium text-[10px] sm:text-xs md:text-sm mt-0.5">
                Founder at DMG
              </p>
            </div>

            {/* Image logo in bottom right */}
            <div className="absolute bottom-4 right-4 h-8 w-8">
              <img
                src="/images/logo/logo-small.png" // Replace with your actual image path
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
