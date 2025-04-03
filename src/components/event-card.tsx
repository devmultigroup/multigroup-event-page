"use client";
import { Event } from "@/types";
import { Button } from "./ui/button";
import {
  ArrowRight,
  Calendar,
  MapPin,
  UsersThree,
  Star,
} from "@phosphor-icons/react";
import { slugify } from "@/lib/slugify";
import { useRouter } from "next/navigation";
import { getFormattedDate } from "@/lib/event-utils";
import Image from "next/image";

export default function EventCard({ event }: { event: Event }) {
  const router = useRouter();
  
  // Get the first image from the event's images array, or fall back to default
  const eventImage =
    event.images && event.images.length > 0 
      ? (event.images[0].startsWith('/') ? event.images[0] : `/${event.images[0]}`)
      : "/bg-2.webp";
  
  const handleNavigation = () => {
    const route = `/etkinlikler/${slugify(event.name)}`;
    router.push(route);
  };

  return (
    <div className="max-w-lg bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 m-4">
      {/* Card Header with Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={eventImage}
          alt={`${event.name} event image`}
          width={500}
          height={192}
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20" />
      </div>
      
      {/* Card Content */}
      <div className="p-6">
        {/* Event Title */}
        <h3 className="text-xl font-bold text-zinc-900 mb-4 border-b border-color-tertiary pb-3">
          {event.name}
        </h3>
        
        <div className="flex flex-col justify-between items-start py-2 text-gray-700">
          <div className="flex items-center gap-2">
            <Calendar weight="fill" size={20} className="text-color-tertiary" />
            <p className="font-semibold">{getFormattedDate(event.date)}</p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <UsersThree weight="fill" size={20} className="text-color-tertiary" />
            <p>{event.afterMetrics?.speakers}+ Konuşmacı</p>
          </div>
          {/* For mobile: Show location and satisfaction together */}
          <div className="flex flex-col mt-2 gap-2 md:hidden">
            <div className="flex items-center gap-2">
              <MapPin weight="fill" size={20} className="text-color-tertiary" />
              <p>{event.location.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <Star weight="fill" size={20} className="text-color-tertiary" />
              <p>{event.afterMetrics?.satisfaction} Memnuniyet</p>
            </div>
          </div>
          {/* For larger devices: show only the location here */}
          <div className="hidden md:flex items-center gap-2 mt-2">
            <MapPin weight="fill" size={20} className="text-color-tertiary" />
            <p>{event.location.name}</p>
          </div>
        </div>

        {/* Bottom row for larger devices with button and satisfaction */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center pt-4 gap-4 mt-2 border-t border-gray-100">
          <Button
            onClick={handleNavigation}
            className="bg-color-tertiary text-white hover:bg-orange-600 hover:shadow-md active:bg-orange-700 transition-colors w-full md:w-auto"
          >
            Daha Fazla <ArrowRight className="ml-2" weight="bold" size={16} />
          </Button>
          {/* For larger devices: show satisfaction next to the button */}
          <div className="hidden md:flex items-center gap-2">
            <Star weight="fill" size={20} className="text-color-tertiary" />
            <p>{event.afterMetrics?.satisfaction} Memnuniyet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
