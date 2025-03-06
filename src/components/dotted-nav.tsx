"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DottedNavProps {
  sections: {
    id: string;
    label: string;
  }[];
}

export default function DottedNav({ sections }: DottedNavProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [sections]);

  return (
    <AnimatePresence>
      {/* Hide the nav when activeSection is "hero". AnimatePresence will enable exit animation */}
      {activeSection !== "hero" && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 z-50 landscape:block"
        >
          <div className="flex flex-col items-center space-y-6">
            {sections.map((section, index) => (
              <div key={section.id} className="relative">
                {/* Connecting line between dots - centered */}
                {index < sections.length - 1 && (
                  <div className="absolute top-3 right-[20%] -translate-x-1/2 w-0.5 h-6 bg-gray-400"></div>
                )}

                <a
                  href={`#${section.id}`}
                  className="group flex items-center"
                  aria-label={`Navigate to ${section.label} section`}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById(section.id);
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {/* Section name on left side */}
                  <div className="relative mr-2">
                    <span className="absolute whitespace-nowrap right-2 top-1/2 -translate-y-1/2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 px-2 py-1 rounded">
                      {section.label}
                    </span>
                  </div>
                  <motion.div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeSection === section.id
                        ? "bg-[#C55E85]"
                        : "bg-gray-400"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
