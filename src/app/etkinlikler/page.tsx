import EventCard from "@/components/event-card";
import events from "@/data/events";
import { Metadata } from "next";
import { getLatestEvent } from "@/lib/event-utils"; // Assuming utility functions are in this path

export const metadata: Metadata = {
  title: "Etkinlikler | Developer MultiGroup",
  description:
    "Developer MultiGroup'un düzenlediği tüm etkinlikleri keşfedin. Her ay düzenlenen ilham verici etkinlikler ile bilgi ve deneyimlerinizi artırın.",
};

export default function Events() {
  const latestEvent = getLatestEvent();
  const filteredEvents = events.filter((event) => event.id !== latestEvent.id);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url('../../dmg-main-bg.png')`,
      }}
    >
      <div className="grid md:grid-cols-1 xl:grid-cols-2">
        {filteredEvents
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
      </div>
    </div>
  );
}
