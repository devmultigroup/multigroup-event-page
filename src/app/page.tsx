"use client";

import { getLatestEvent, getSecondLatestEvent } from "@/lib/event-utils";
import { useEffect } from "react";
import { useEventColor } from "@/context/EventColorContext";
import EventPage from "@/components/event-page/EventPage";

export default function HeroPage() {
  const latestEventDetails = getLatestEvent();
  const secondLatest = getSecondLatestEvent();
  const { setCurrentEvent } = useEventColor();

  if (!latestEventDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Etkinlik bulunamadı.</p>
      </div>
    );
  }

  useEffect(() => {
    if (latestEventDetails) {
      setCurrentEvent(latestEventDetails);
    }
  }, [latestEventDetails]);

  return (
    <EventPage event={latestEventDetails} previousEvent={secondLatest} hero />
  );
}
