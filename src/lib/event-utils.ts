import events from "@/data/events";
import { Event } from "@/types";

export function sortEventsByDate(events: Event[]): Event[] {
  return events
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getUpcomingEvent(): Event | null {
  const now = new Date().getTime();

  // Filter events to get upcoming ones (events happening in the future)
  const upcomingEvents = events.filter(event => new Date(event.date).getTime() > now);

  if (upcomingEvents.length > 0) {
    // Sort upcoming events and return the closest one
    const sortedUpcomingEvents = sortEventsByDate(upcomingEvents);
    return sortedUpcomingEvents[0]; // closest upcoming event
  } else {
    // If no upcoming event, return the latest event
    return getLatestEvent();
  }
}

export function getLatestEvent(): Event | null {
  const sortedEvents = sortEventsByDate(events);
  return sortedEvents.length > 0 ? sortedEvents[sortedEvents.length - 1] : null;
}
