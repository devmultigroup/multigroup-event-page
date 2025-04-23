"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { usePathname } from "next/navigation";
import events from "@/data/events";
import { Event } from "@/types";

type EventColorContextType = {
  currentEvent: Event | null;
  setCurrentEvent: (event: Event) => void;
};

const EventColorContext = createContext<EventColorContextType>({
  currentEvent: null,
  setCurrentEvent: () => {},
});

const notFoundColors = {
  primary: "348 83% 47%", // Pure black
  secondary: "348 83% 47%", // Pure white
  accent: "348 83% 47%", // Vibrant red
  background: "0 0% 6%", // Near-black
  text: "0 0% 100%", // White text
};

export const EventColorProvider = ({ children }: { children: ReactNode }) => {
  const [currentEvent, setCurrentEvent] = useState<Event | null>(events[0]);
  const pathname = usePathname();

  React.useEffect(() => {
    const isNotFound = pathname === "/404" || pathname === "/not-found"; // Adjust if you use a custom not-found route

    const palette = isNotFound ? notFoundColors : currentEvent?.colorPalette;

    if (palette) {
      document.documentElement.style.setProperty(
        "--color-primary",
        palette.primary,
      );
      document.documentElement.style.setProperty(
        "--color-secondary",
        palette.secondary,
      );
      document.documentElement.style.setProperty(
        "--color-accent",
        palette.accent,
      );
      document.documentElement.style.setProperty(
        "--color-background",
        palette.background,
      );
      document.documentElement.style.setProperty("--color-text", palette.text);
    }
  }, [currentEvent, pathname]);

  return (
    <EventColorContext.Provider value={{ currentEvent, setCurrentEvent }}>
      {children}
    </EventColorContext.Provider>
  );
};

export const useEventColor = () => useContext(EventColorContext);
