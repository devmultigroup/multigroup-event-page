"use client";

import { Event } from "@/types";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { slugify } from "@/lib/slugify";
import { useRouter } from "next/navigation";
import { getFormattedDate } from "@/lib/event-utils";

export default function EventCard({ event }: { event: Event }) {
  const router = useRouter();

  const handleNavigation = () => {
    const route = `/etkinlikler/${slugify(event.name)}`;
    router.push(route);
  };

  return (
    <div className="max-w-lg bg-white rounded-lg p-4 m-4 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all">
      <p
        className="text-xl text-center font-bold italic py-8 bg-cover bg-center text-zinc-900 rounded-lg break-words w-full p-4 whitespace-normal"
        style={{
          backgroundImage: `url('../../bg-2.png')`,
        }}
      >
        {event.name}
      </p>

      <div className="flex justify-between items-center py-4 text-gray-700">
        <p className="font-semibold">{getFormattedDate(event.date)}</p>
        <p className="text-right">{event.location.name}</p>
      </div>

      <div className="flex justify-between items-center py-4 text-gray-700">
        <Button
          onClick={handleNavigation}
          className="hover:bg-gray-800 hover:text-white mt-4"
          variant="outline"
        >
          Daha Fazla <ArrowRight />
        </Button>
        <div className="text-right my-auto">
          <p>{event.afterMetrics?.speakers}+ Konuşmacı</p>
          <p>{event.afterMetrics?.satisfaction} Memnuniyet</p>
        </div>
      </div>
    </div>
  );
}
