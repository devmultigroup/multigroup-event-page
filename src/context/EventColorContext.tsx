// src/context/EventColorContext.tsx
"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import events from '@/data/events';
import { Event } from '@/types';

type EventColorContextType = {
  currentEvent: Event | null;
  setCurrentEvent: (event: Event) => void;
};

const EventColorContext = createContext<EventColorContextType>({
  currentEvent: null,
  setCurrentEvent: () => {},
});

export const EventColorProvider = ({ children }: { children: ReactNode }) => {
  const [currentEvent, setCurrentEvent] = useState<Event | null>(events[0]);

  // Update CSS variables when event changes
  React.useEffect(() => {
    if (currentEvent) {
      document.documentElement.style.setProperty(
        '--color-primary', 
        currentEvent.colorPalette.primary
      );
      document.documentElement.style.setProperty(
        '--color-secondary', 
        currentEvent.colorPalette.secondary
      );
      document.documentElement.style.setProperty(
        '--color-background', 
        currentEvent.colorPalette.background
      );
      document.documentElement.style.setProperty(
        '--color-text', 
        currentEvent.colorPalette.text
      );
    }
  }, [currentEvent]);

  return (
    <EventColorContext.Provider value={{ currentEvent, setCurrentEvent }}>
      {children}
    </EventColorContext.Provider>
  );
};

export const useEventColor = () => useContext(EventColorContext);