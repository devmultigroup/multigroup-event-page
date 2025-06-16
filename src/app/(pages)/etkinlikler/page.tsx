"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/event-components/event-card";
import events from "@/data/events";
import { getLatestEvent } from "@/lib/event-utils";
import { useEventColor } from "@/context/EventColorContext";
import Loading from "@/app/loading";
import type { Event } from "@/types";
import { notFound } from "next/navigation";

interface EventGroup {
  baseEvent: Event;
  availableYears: string[];
  selectedYear: string;
}

export default function Events() {
  const [latestEvent, setLatestEvent] = useState<Event | null>(null);
  const [eventGroups, setEventGroups] = useState<EventGroup[]>([]);
  const { setCurrentEvent } = useEventColor();

  useEffect(() => {
    const fetchLatestEvent = async () => {
      const event = await getLatestEvent();
      if (!event) {
        notFound();
        return;
      }
      setLatestEvent(event);
      setCurrentEvent(event);
    };

    fetchLatestEvent();
  }, [setCurrentEvent]);

  useEffect(() => {
    if (!latestEvent) return;

    // Group events by their base name (without year suffix)
    const eventMap = new Map<string, Event[]>();

    const allEvents = events;

    allEvents.forEach((event) => {
      // Extract base name by removing year suffix (assuming format: name YYYY or name-YYYY)
      const nameMatch = event.name.match(/^(.+?)\s+(\d{4})$|^(.+)-(\d{4})$/);
      if (nameMatch) {
        const baseName = nameMatch[1] || nameMatch[3]; // Use group 1 (space) or group 3 (hyphen)
        const year = nameMatch[2] || nameMatch[4]; // Use group 2 (space) or group 4 (hyphen)

        if (!eventMap.has(baseName)) {
          eventMap.set(baseName, []);
        }
        eventMap.get(baseName)!.push(event);
      }
    });

    // Create event groups with available years
    const groups: EventGroup[] = [];
    eventMap.forEach((eventList, baseName) => {
      // Sort events by year (newest first)
      eventList.sort((a, b) => {
        const yearA = a.name.match(/\s+(\d{4})$|-(\d{4})$/)?.[1] || "0";
        const yearB = b.name.match(/\s+(\d{4})$|-(\d{4})$/)?.[1] || "0";
        return Number.parseInt(yearB) - Number.parseInt(yearA);
      });

      const availableYears = eventList
        .map((event) => {
          const yearMatch = event.name.match(/\s+(\d{4})$|-(\d{4})$/);
          return yearMatch ? yearMatch[1] : "";
        })
        .filter(Boolean);

      groups.push({
        baseEvent: eventList[0], // Use the most recent event as base
        availableYears,
        selectedYear: availableYears[0], // Default to most recent year
      });
    });

    // Sort groups by the most recent event date
    groups.sort(
      (a, b) =>
        new Date(b.baseEvent.date).getTime() -
        new Date(a.baseEvent.date).getTime(),
    );

    // Move the latest event group to the top
    const latestEventIndex = groups.findIndex(
      (group) =>
        group.baseEvent.id === latestEvent.id ||
        groups.some((g) =>
          g.availableYears.some((year) => {
            const baseName = group.baseEvent.name.replace(
              /\s+\d{4}$|-\d{4}$/,
              "",
            );
            const latestBaseName = latestEvent.name.replace(
              /\s+\d{4}$|-\d{4}$/,
              "",
            );
            return baseName === latestBaseName;
          }),
        ),
    );

    if (latestEventIndex > 0) {
      const latestGroup = groups.splice(latestEventIndex, 1)[0];
      groups.unshift(latestGroup);
    }

    setEventGroups(groups);
  }, [latestEvent]);

  if (!latestEvent) {
    return <Loading />;
  }

  // Flatten all event groups into a single array of events (with group info)
  const allEventCards = eventGroups.map((group) => ({
    event: group.baseEvent,
    availableYears: group.availableYears,
    selectedYear: group.selectedYear,
    isLatestEvent: group.baseEvent.id === latestEvent.id,
  }));

  // Split into upcoming and completed events
  const now = new Date();
  const upcomingEvents = allEventCards
    .filter(({ event }) => new Date(event.date) > now)
    .sort(
      (a, b) =>
        new Date(a.event.date).getTime() - new Date(b.event.date).getTime(),
    ); // soonest first
  const completedEvents = allEventCards
    .filter(({ event }) => new Date(event.date) <= now)
    .sort(
      (a, b) =>
        new Date(b.event.date).getTime() - new Date(a.event.date).getTime(),
    ); // most recent first

  // Mark the closest upcoming event as 'güncel'
  if (upcomingEvents.length > 0) {
    upcomingEvents.forEach((e, i) => (e.isLatestEvent = false));
    upcomingEvents[0].isLatestEvent = true;
  }

  return (
    <div className="min-h-screen bg-color-background">
      <div className="pt-[20vh] w-5/6 2xl:w-2/3 mx-auto space-y-8">
        {upcomingEvents.length > 0 && (
          <div className="space-y-8">
            {upcomingEvents.map((props) => (
              <EventCard
                key={`${props.event.id}-${props.selectedYear}`}
                {...props}
              />
            ))}
          </div>
        )}
        {upcomingEvents.length > 0 && completedEvents.length > 0 && (
          <hr className="my-8 border-t border-gray-300" />
        )}
        {completedEvents.length > 0 && (
          <div className="space-y-8 ">
            {completedEvents.map((props) => (
              <EventCard
                key={`${props.event.id}-${props.selectedYear}`}
                {...props}
              />
            ))}
          </div>
        )}
        {upcomingEvents.length === 0 && completedEvents.length === 0 && (
          <div className="flex items-center justify-center min-h-[50vh] text-lg text-gray-600">
            Geçmiş etkinlik bulunmamaktadır.
          </div>
        )}
      </div>
    </div>
  );
}
