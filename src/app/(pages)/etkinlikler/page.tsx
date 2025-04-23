"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/event-card";
import events from "@/data/events";
import { getLatestEvent } from "@/lib/event-utils";
import { useEventColor } from "@/context/EventColorContext";
import Loading from "@/app/loading";
import { Event } from "@/types";
import { notFound } from "next/navigation";

export default function Events() {
  const [latestEvent, setLatestEvent] = useState<Event | null>(null);
  const { setCurrentEvent } = useEventColor();

  useEffect(() => {
    const fetchLatestEvent = async () => {
      const event = await getLatestEvent();
      if (!event) {
        notFound(); // Trigger 404
        return;
      }
      setLatestEvent(event);
      setCurrentEvent(event);
    };

    fetchLatestEvent();
  }, [setCurrentEvent]);

  if (!latestEvent) {
    return <Loading />;
  }

  const filteredEvents: Event[] = events.filter(
    (event: Event) => event.id !== latestEvent.id,
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-color-background">
      <div className="pt-[25vh] grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">
        {filteredEvents
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .map((event, index) => {
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
