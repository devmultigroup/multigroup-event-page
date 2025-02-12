import events from "@/data/events";
import { Event } from "@/types";
import { slugify } from "./slugify";

export function getFormattedDate(date: string) {
  const formattedDate = new Date(date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate;
}

export function sortEventsByDate(events: Event[]): Event[] {
  return events
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getLatestEvent(): Event {
  const sortedEvents = sortEventsByDate(events);
  return sortedEvents[sortedEvents.length - 1];
}

export function getEventBySlug(slug: string) {
  return events.find((event) => slugify(event.name) === slug) || null;
}

export function getLatestEventLink(): string {
  const latestEvent = getLatestEvent();
  return latestEvent.registerLink;
}

export function getSecondLatestEvent(): Event {
  const sortedEvents = sortEventsByDate(events);

  // Return the second latest event
  return sortedEvents[sortedEvents.length - 2];
}
