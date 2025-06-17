"use client";
import { useState } from "react";
import type { Event } from "@/types";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  CaretRight,
  MapPin,
} from "@phosphor-icons/react";
import { Loader2 } from "lucide-react";
import { slugify } from "@/lib/slugify";
import { useRouter } from "next/navigation";
import { getFormattedDate, getEventByBaseNameAndYear } from "@/lib/event-utils";
import Image from "next/image";

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
    const eventDate = new Date(event.date);
    const now = new Date();
    const isPast = eventDate < now;
    if (event.navigable === false && isPast && event.registerLink) {
      window.open(event.registerLink, "_blank");
      setLoading(false);
      return;
    }
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
      <div className="flex flex-col md:flex-row items-stretch p-8 gap-6 md:gap-10">
        {/* Left: Text Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          {/* Hashtags and YAKINDA label - Mobile: label on top, hashtags below */}
          {/* Mobile version: label on top, hashtags below */}
          <div className="block md:hidden mb-6">
            {isLatestEvent && (
              <div className="mb-1">
                <span className="bg-color-secondary text-white px-3 py-1 rounded-full text-xs font-semibold">
                  YAKLAŞIYOR
                </span>
              </div>
            )}
            <div className="flex gap-2 items-center">
              {hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm text-color-text font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {/* Desktop version: hashtags and label on the same line */}
          <div className="hidden md:flex gap-2 mb-6 items-center">
            {hashtags.map((tag, index) => (
              <span key={index} className="text-sm text-color-text font-medium">
                {tag}
              </span>
            ))}
            {isLatestEvent && (
              <span className="bg-color-secondary text-white px-3 py-1 rounded-full text-xs font-semibold ml-2">
                YAKLAŞIYOR
              </span>
            )}
          </div>
          {/* Mobile: Banner Image after tags */}
          <div className="block md:hidden mb-4">
            {(() => {
              const baseName = event.name
                .replace(/\s+\d{4}$|-\d{4}$/, "")
                .toLowerCase()
                .replace(/ /g, "-");
              const latestYear = Math.max(
                ...availableYears.map((y) => parseInt(y)),
              );
              const imagePath = `/images/banners/${baseName}-${latestYear}.webp`;
              return (
                <Image
                  src={imagePath}
                  alt={eventTitle}
                  width={480}
                  height={270}
                  className="rounded-2xl w-full h-auto object-cover shadow-md"
                  style={{ background: "#f3f0fa" }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  priority={isLatestEvent}
                />
              );
            })()}
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
                {event.location.name !== "" && (
                  <div className="flex items-center gap-2 justify-start">
                    <MapPin weight="fill" size={18} />
                    <span>{event.location.name}</span>
                  </div>
                )}
              </div>

              <p className="text-color-text leading-relaxed">
                {event.heroDescription}
              </p>
            </div>

            {/* Year Selector */}
            <div className="flex items-center gap-1 mt-2 select-none">
              {availableYears.map((year) => {
                const baseName = event.name.replace(/\s+\d{4}$|-\d{4}$/, "");
                const eventNameForYear = `${baseName} ${year}`;
                const eventSlugForYear = slugify(eventNameForYear);
                const isLatestYear =
                  year ===
                  Math.max(
                    ...availableYears.map((y) => parseInt(y)),
                  ).toString();
                // Get the event for this year
                const eventForYear = getEventByBaseNameAndYear(baseName, year);
                // Fallback to current event if not found (shouldn't happen)
                const eventData = eventForYear || event;
                const eventDate = new Date(eventData.date);
                const now = new Date();
                const isPast = eventDate < now;
                const isDisabled = eventData.navigable === false && !isPast;
                const isSelected = year === selectedYear;
                return (
                  <button
                    key={year}
                    onClick={() => {
                      if (isDisabled) return;
                      if (
                        eventData.navigable === false &&
                        isPast &&
                        eventData.registerLink
                      ) {
                        window.open(eventData.registerLink, "_blank");
                        return;
                      }
                      if (isLatestEvent && isLatestYear) {
                        router.push("/");
                      } else {
                        router.push(`/etkinlikler/${eventSlugForYear}`);
                      }
                    }}
                    disabled={isDisabled}
                    className={`transition-all duration-150 text-base md:text-lg font-semibold pr-2 py-1 rounded-md border-none outline-none focus:outline-none
                      ${isSelected ? "font-extrabold text-[#4d002f] bg-transparent opacity-100" : "font-semibold text-color-text opacity-40 hover:opacity-80 hover:bg-color-accent/10 cursor-pointer"}
                      ${isDisabled ? "opacity-30 cursor-not-allowed" : ""}
                    `}
                    style={{
                      WebkitTextStroke: isSelected
                        ? "0.3px #4d002f"
                        : undefined,
                    }}
                    tabIndex={isDisabled ? -1 : 0}
                    type="button"
                  >
                    {year}
                  </button>
                );
              })}
            </div>

            {/* Action Button */}
            <Button
              onClick={
                event.navigable === false &&
                !(new Date(event.date) < new Date())
                  ? undefined
                  : handleNavigation
              }
              disabled={
                loading ||
                (event.navigable === false &&
                  !(new Date(event.date) < new Date()))
              }
              className={`group bg-color-secondary text-white hover:bg-gray-600 hover:shadow-md active:bg-color-accent transition-all duration-300 px-6 py-3 rounded-lg ${
                event.navigable === false &&
                !(new Date(event.date) < new Date())
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={16} />
                  Yükleniyor...
                </span>
              ) : (
                <>
                  {event.navigable === false &&
                  !(new Date(event.date) < new Date()) ? (
                    <span className="flex items-center">Çok Yakında!</span>
                  ) : (
                    <span className="flex items-center">
                      <span>Daha Fazla</span>
                      <span className="relative ml-2 inline-flex items-center justify-center w-5 h-5 align-middle">
                        <CaretRight
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 opacity-100 group-hover:opacity-0 group-hover:translate-x-2"
                          weight="bold"
                          size={16}
                        />
                        <ArrowRight
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                          weight="bold"
                          size={16}
                        />
                      </span>
                    </span>
                  )}
                </>
              )}
            </Button>
          </div>
        </div>
        {/* Right: Banner Image (desktop only) */}
        <div className="flex-1 items-center justify-center min-w-[200px] max-w-md mx-auto md:mx-0 hidden md:flex">
          {(() => {
            const baseName = event.name
              .replace(/\s+\d{4}$|-\d{4}$/, "")
              .toLowerCase()
              .replace(/ /g, "-");
            const latestYear = Math.max(
              ...availableYears.map((y) => parseInt(y)),
            );
            const imagePath = `/images/banners/${baseName}-${latestYear}.webp`;
            return (
              <Image
                src={imagePath}
                alt={eventTitle}
                width={480}
                height={270}
                className="rounded-2xl w-full h-auto object-cover shadow-md"
                style={{ background: "#f3f0fa" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
                priority={isLatestEvent}
              />
            );
          })()}
        </div>
      </div>
    </div>
  );
}
