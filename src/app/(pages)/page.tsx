"use client";

import {
  getClosestUpcomingEvent,
  getSecondLatestEvent,
  getMostRecentPastEvent,
} from "@/lib/event-utils";
import { useEffect } from "react";
import { useEventColor } from "@/context/EventColorContext";
import EventPage from "@/components/event-page/EventPage";
// import { LanyardCard } from "@/components/lanyard-badge";

export default function HeroPage() {
  const upcomingEvent = getClosestUpcomingEvent();
  const mostRecentPastEvent = getMostRecentPastEvent();
  
  // Determine which event to show
  let latestEventDetails;
  if (upcomingEvent && upcomingEvent.navigable !== false) {
    // If there's an upcoming event and it's navigable, use it
    latestEventDetails = upcomingEvent;
  } else {
    // Otherwise, use the most recent past event
    latestEventDetails = mostRecentPastEvent;
  }
  
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
    <>
      {/* <LanyardCard className="rounded-lg shadow-xl" height="80vh" /> */}
      <EventPage event={latestEventDetails} previousEvent={secondLatest} hero />
    </>
  );
}
