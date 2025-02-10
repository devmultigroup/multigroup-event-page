import EventCard from "@/components/event-card";
import events from "@/data/events";

export default function Events() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url('../../dmg-main-bg.png')`,
      }}
    >
      <div className="grid md:grid-cols-1 xl:grid-cols-2">
        {events
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
