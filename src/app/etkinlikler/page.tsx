"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/event-card";
import events from "@/data/events"; // Assuming events is an array of Event objects.
import { getLatestEvent } from "@/lib/event-utils";
import { useEventColor } from "@/context/EventColorContext";
import Loading from "@/components/loading";
import { Event } from "@/types";

export default function Events() {
  // Define the type for latestEvent as Event | null.
  const [latestEvent, setLatestEvent] = useState<Event | null>(null);
  const { setCurrentEvent } = useEventColor();

  useEffect(() => {
    const fetchLatestEvent = async () => {
      const event = await getLatestEvent();
      setLatestEvent(event);
      setCurrentEvent(event);
    };

    fetchLatestEvent();
  }, [setCurrentEvent]);

  // If the latest event hasn't been fetched yet, show the loading screen.
  if (!latestEvent) {
    return <Loading />;
  }

  // Filter out the latest event from the rest of the events.
  // Ensure that events array items conform to the Event type.
  const filteredEvents: Event[] = events.filter(
    (event: Event) => event.id !== latestEvent.id,
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-color-background">
      {/* The grid has padding-top set so that it starts roughly 25vh down */}
      <div className="pt-[25vh] grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">
        {filteredEvents
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .map((event, index) => {
            // If there is an odd number of events and this is the last item,
            // span both columns and center its content.
            const isLastOddItem =
              filteredEvents.length % 2 !== 0 &&
              index === filteredEvents.length - 1;
            return (
              <div
                key={event.id}
                className={
                  isLastOddItem ? "col-span-2 flex justify-center" : ""
                }
              >
                <EventCard event={event} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
