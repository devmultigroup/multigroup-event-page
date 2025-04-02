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
    <div className="min-h-screen flex flex-col items-center" style={{background: "linear-gradient(to top, #000000, #002B28, #0f172a)",}}>
      {/* The grid now has padding-top set to 50vh, ensuring it starts halfway down the viewport. */}
      <div className="pt-[25vh] grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">
        {filteredEvents
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((event, index) => {
            // Check if this is the last item in an odd-length list.
            const isLastOddItem =
              filteredEvents.length % 2 !== 0 &&
              index === filteredEvents.length - 1;
            return (
              <div
                key={event.id}
                // If it's a lone item in its row, span both columns and center its content.
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
