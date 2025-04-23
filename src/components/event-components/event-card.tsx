"use client";
import { useState } from "react";
import { Event } from "@/types";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  MapPin,
  UsersThree,
  Star,
} from "@phosphor-icons/react";
import { Loader2 } from "lucide-react"; // Spinner icon
import { slugify } from "@/lib/slugify";
import { useRouter } from "next/navigation";
import { getFormattedDate } from "@/lib/event-utils";
import Image from "next/image";

export default function EventCard({ event }: { event: Event }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const eventImage =
    event.images && event.images.length > 0
      ? event.images[0].startsWith("/")
        ? event.images[0]
        : `/${event.images[0]}`
      : "/bg-2.webp";

  const handleNavigation = () => {
    setLoading(true);
    const route = `/etkinlikler/${slugify(event.name)}`;
    router.push(route);
  };

  return (
    <div className="max-w-lg bg-color-primary rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 m-4">
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
        <h3 className="text-xl font-bold text-zinc-900 mb-4 border-b border-color-tertiary pb-3">
          {event.name}
        </h3>

        <div className="flex flex-col justify-between items-start py-2 text-gray-700">
          <div className="flex items-center gap-2">
            <Calendar weight="fill" size={20} className="text-color-tertiary" />
            <p className="font-semibold">{getFormattedDate(event.date)}</p>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <UsersThree
              weight="fill"
              size={20}
              className="text-color-tertiary"
            />
            <p>{event.afterMetrics?.speakers}+ Konuşmacı</p>
          </div>

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

          <div className="hidden md:flex items-center gap-2 mt-2">
            <MapPin weight="fill" size={20} className="text-color-tertiary" />
            <p>{event.location.name}</p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center pt-4 gap-4 mt-2 border-t border-gray-100">
          <Button
            onClick={handleNavigation}
            disabled={loading}
            className={`bg-color-secondary text-white hover:bg-color-accent hover:shadow-md active:bg-color-accent transition-all duration-300 w-full md:w-auto ${
              loading ? "opacity-70 cursor-wait" : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={16} />
                Yükleniyor...
              </span>
            ) : (
              <>
                Daha Fazla{" "}
                <ArrowRight className="ml-2" weight="bold" size={16} />
              </>
            )}
          </Button>

          <div className="hidden md:flex items-center gap-2">
            <Star weight="fill" size={20} className="text-color-tertiary" />
            <p>{event.afterMetrics?.satisfaction} Memnuniyet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
