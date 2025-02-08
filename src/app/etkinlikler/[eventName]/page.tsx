import { getEventBySlug } from "@/lib/event-utils";
import type { Event } from "@/types";
import { notFound } from "next/navigation";

export default function EventPage({ params }: { params: { eventName: string } }) {
    const eventDetails: Event | null = getEventBySlug(params.eventName);

    if (!eventDetails) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">{eventDetails.name}</h1>
            <p>{eventDetails.date}</p>
            <p>{eventDetails.location}</p>
        </div>
    );
}
