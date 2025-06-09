"use client";

import { use, useEffect } from "react";
import type { Event } from "@/types";
import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/event-utils";
import { useEventColor } from "@/context/EventColorContext";
import EventPage from "@/components/event-page/EventPage";

export default function DynamicEventPage({
  params: paramsPromise,
}: {
  params: Promise<{ eventName: string }>;
}) {
  const params = use(paramsPromise);
  const { setCurrentEvent } = useEventColor();
  const eventDetails: Event | null = getEventBySlug(params.eventName);

  if (!eventDetails) {
    notFound();
  }

  useEffect(() => {
    if (eventDetails) {
      setCurrentEvent(eventDetails);
    }
  }, [eventDetails]);

  return <EventPage event={eventDetails} hero={false} />;
}
