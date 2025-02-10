"use client";

import { use } from "react";
import type { Event } from "@/types";
import { notFound } from "next/navigation";
import CountdownTimer from "@/components/countdown-timer";
import FAQ from "@/components/faq";
import Heading from "@/components/heading";
import SessionContainer from "@/components/session-container";
import SpeakerCarousel from "@/components/speaker-carousel";
import Location from "@/components/location";
import { getFormattedDate, getEventBySlug } from "@/lib/event-utils";

export default function EventPage({ params: paramsPromise }: { params: Promise<{ eventName: string }> }) {
  const params = use(paramsPromise);
  const eventDetails: Event | null = getEventBySlug(params.eventName);

  if (!eventDetails) {
    notFound();
  }

  return (
    <>
      <div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('/dmg-main-bg.png')`,
        }}
      >
        {/* Sol üst köşe: Etkinlik Adı */}
        <div
          className="absolute top-24 left-24 text-white text-6xl font-bold px-2 pt-8 space-y-6 max-w-2xl leading-[64px]"
          style={{ fontFamily: "TanNimbus" }}
        >
          {eventDetails.name}
        </div>

        {/* Sol alt köşe: Tarih ve Konum */}
        <div
          className="absolute bottom-24 left-24 text-white text-xl px-2 py-1 rounded-lg"
          style={{ fontFamily: "TanNimbus" }}
        >
          <p>{getFormattedDate(eventDetails.date)}</p>
          <p>{eventDetails.location.name}</p>
        </div>

        {/* Sağ alt köşe: Orijinal Tarih Nesnesi */}
        <div
          className="absolute bottom-24 right-24 text-white text-xl px-2 py-1 rounded-lg"
          style={{ fontFamily: "TanNimbus" }}
        >
          <CountdownTimer targetDate={eventDetails.date} />
        </div>
      </div>

      <div className="w-screen bg-zinc-800 h-40"></div>

      <div className="text-center p-8 text-xl max-w-lg m-auto">
        <p className="text-2xl font italic">{eventDetails.title}</p>
        <p className="text-4xl">{eventDetails.subTitle}</p>
        <p className="text-justify pt-4" style={{ whiteSpace: "pre-line" }}>
          {eventDetails.description}
        </p>
      </div>
      <span id="konuşmacılar"></span>
      <Heading>Konuşmacılar</Heading>
      <SpeakerCarousel speakers={eventDetails.speakers} />
      <div className="w-screen bg-zinc-800 h-40"></div>
      <Heading>Etkinlik Akışı</Heading>
      <SessionContainer event={eventDetails} />
      <span id="konum"></span>
      <Heading>Konum</Heading>
      {/* <Location location={eventDetails.location} /> */}
      <Heading>Sıkça Sorulan Sorular</Heading>
      <FAQ />
    </>
  );
}
