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

export function formatIsoDate(isoDate: string): string {
  const date = new Date(isoDate);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid ISO date provided.");
  }

  const day = date.getDate();
  const year = date.getFullYear();
  // Using Turkish locale to get a long month name (e.g., "Mart")
  const month = date.toLocaleString("tr-TR", { month: "long" });

  return `${day} ${month} ${year}`;
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

export function getClosestUpcomingEvent(): Event | null {
  const now = new Date();
  const upcoming = events
    .filter((e) => new Date(e.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return upcoming[0] || null;
}

export function getMostRecentPastEvent(): Event | null {
  const now = new Date();
  const past = events
    .filter((e) => new Date(e.date) <= now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return past[0] || null;
}

// Returns the event for a given base name and year (e.g., 'Mobile Developer Conference', '2024')
export function getEventByBaseNameAndYear(
  baseName: string,
  year: string,
): Event | null {
  // Normalize baseName for comparison
  const normalizedBase = baseName
    .trim()
    .toLowerCase()
    .replace(/[-\s]+/g, "-");
  return (
    events.find((event) => {
      const eventName = event.name.trim().toLowerCase();
      // Remove year from event name for base comparison
      const eventBase = eventName
        .replace(/[-\s]?\d{4}$/, "")
        .replace(/[-\s]+/g, "-");
      const eventYear = eventName.match(/(\d{4})$/)?.[1];
      return eventBase === normalizedBase && eventYear === year;
    }) || null
  );
}
