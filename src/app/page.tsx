"use client";

import CountdownTimer from "@/components/countdown-timer";
import SessionContainer from "@/components/session-container";
import SpeakerCarousel from "@/components/speaker-carousel";
import { getFormattedDate, getLatestEvent } from "@/lib/event-utils";

export default function Home() {
  const latestEventDetails = getLatestEvent();

  if (!latestEventDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Etkinlik bulunamadı.</p>
      </div>
    );
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
          {latestEventDetails.name}
        </div>

        {/* Sol alt köşe: Tarih ve Konum */}
        <div className="absolute bottom-24 left-24 text-white text-xl px-2 py-1 rounded-lg" style={{ fontFamily: "TanNimbus" }}>
          <p>{getFormattedDate(latestEventDetails.date)}</p>
          <p>{latestEventDetails.locationName}</p>
        </div>

        {/* Sağ alt köşe: Orijinal Tarih Nesnesi */}
        <div className="absolute bottom-24 right-24 text-white text-xl px-2 py-1 rounded-lg" style={{ fontFamily: "TanNimbus" }}>
          <CountdownTimer targetDate={latestEventDetails.date} />
        </div>
      </div>

      <div className="w-screen bg-zinc-800 h-40"></div>
      
      <div className="text-center p-8 text-xl max-w-lg m-auto">
        <p className="text-2xl font italic">{latestEventDetails.title}</p>
        <p className="text-4xl">{latestEventDetails.subTitle}</p>
        <p className="text-justify pt-4" style={{ whiteSpace: "pre-line" }}>
          {latestEventDetails.description}
        </p>
      </div>
      <SpeakerCarousel speakers={latestEventDetails.speakers} />
      <div className="w-screen bg-zinc-800 h-40"></div>
      <h2 id="#etkinlik-akisi" className="text-2xl font-bold text-center my-4">Etkinlik Akışı</h2>
      <SessionContainer event={latestEventDetails} />
    </>
  );
}
