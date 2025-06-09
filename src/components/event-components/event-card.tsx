"use client";
import { useState } from "react";
import type { Event } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, MapPin } from "@phosphor-icons/react";
import { Loader2 } from "lucide-react";
import { slugify } from "@/lib/slugify";
import { useRouter } from "next/navigation";
import { getFormattedDate } from "@/lib/event-utils";

interface EventCardProps {
  event: Event;
  availableYears: string[];
  selectedYear: string;
  isLatestEvent?: boolean;
}

export default function EventCard({
  event,
  availableYears,
  selectedYear,
  isLatestEvent = false,
}: EventCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNavigation = () => {
    setLoading(true);
    if (isLatestEvent) {
      router.push("/");
    } else {
      const route = `/etkinlikler/${slugify(event.name)}`;
      router.push(route);
    }
  };

  // Extract hashtags from event name
  const getHashtags = (eventName: string) => {
    // Remove year if present
    const baseName = eventName.replace(/[-\s]\d{4}$/, "");
    // Split by space or hyphen, filter out empty, and prefix with #
    const tags = baseName
      .toLowerCase()
      .split(/[-\s]+/)
      .filter(Boolean)
      .map((word) => `#${word}`);
    // Optionally add a generic tag
    // tags.push("#conference");
    return tags;
  };

  const hashtags = getHashtags(event.name);
  const eventTitle = event.name
    .replace(/-\d{4}$/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const eventYear = event.name.match(/-(\d{4})$/)?.[1] || "";

  return (
    <div
      className={`bg-color-primary rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border ${
        isLatestEvent
          ? "border-color-secondary border-2 ring-2 ring-color-secondary/20"
          : "border-gray-100"
      }`}
    >
      <div className="p-8">
        {/* Hashtags */}
        <div className="flex gap-2 mb-6 items-center">
          {hashtags.map((tag, index) => (
            <span key={index} className="text-sm text-color-text font-medium">
              {tag}
            </span>
          ))}
          {isLatestEvent && (
            <span className="bg-color-secondary text-white px-3 py-1 rounded-full text-xs font-semibold ml-2">
              GÜNCEL
            </span>
          )}
        </div>

        <div className="space-y-6">
          {/* Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-color-text mb-2">
              {eventTitle} {eventYear}
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-color-text mb-4">
              <div className="flex items-center gap-2 justify-start">
                <Calendar weight="fill" size={18} />
                <span className="font-medium">
                  {getFormattedDate(event.date)}
                </span>
              </div>
              <div className="flex items-center gap-2 justify-start">
                <MapPin weight="fill" size={18} />
                <span>{event.location.name}</span>
              </div>
            </div>

            <p className="text-color-text leading-relaxed">
              {event.heroDescription}
            </p>
          </div>

          {/* Year Selector */}
          <div className="flex items-center gap-3">
            {availableYears.map((year) => {
              // Construct the event name for this year
              const baseName = event.name.replace(/\s+\d{4}$|-\d{4}$/, "");
              const eventNameForYear = `${baseName} ${year}`;
              const eventSlugForYear = slugify(eventNameForYear);

              // Check if this is the latest year (highest year number)
              const isLatestYear =
                year ===
                Math.max(...availableYears.map((y) => parseInt(y))).toString();

              return (
                <button
                  key={year}
                  onClick={() => {
                    if (isLatestEvent && isLatestYear) {
                      router.push("/");
                    } else {
                      router.push(`/etkinlikler/${eventSlugForYear}`);
                    }
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    year === selectedYear
                      ? "bg-color-accent text-color-text"
                      : "bg-color-accent/20 text-color-text hover:bg-color-accent/40 hover:-translate-y-1 hover:scale-105"
                  }`}
                >
                  {year}
                </button>
              );
            })}
          </div>

          {/* Action Button */}
          <Button
            onClick={handleNavigation}
            disabled={loading}
            className="bg-color-secondary text-white hover:bg-color-accent hover:shadow-md active:bg-color-accent transition-all duration-300 px-6 py-3 rounded-lg"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={16} />
                Yükleniyor...
              </span>
            ) : (
              <>
                {isLatestEvent ? "Ana Sayfaya Git" : "Daha Fazla"}
                <ArrowRight className="ml-2" weight="bold" size={16} />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
