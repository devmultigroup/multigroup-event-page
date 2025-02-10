"use client";

import CountdownTimer from "@/components/countdown-timer";
import FAQ from "@/components/faq";
import Heading from "@/components/heading";
import SessionContainer from "@/components/session-container";
import SpeakerCarousel from "@/components/speaker-carousel";
import Location from "@/components/location";
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
 className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-6 sm:px-12"
 style={{ backgroundImage: `url('/dmg-main-bg.png')` }}
>
  {/* Event Name (Top Left) */}
  <div
    className="absolute top-16 left-6 sm:top-24 sm:left-24 text-white text-4xl sm:text-6xl font-bold px-2 pt-8 max-w-lg sm:max-w-2xl leading-tight sm:leading-[64px] text-center sm:text-left"
    style={{ fontFamily: "TanNimbus" }}
  >
    {latestEventDetails.name}
  </div>
  
  {/* Bottom Section (Vertical on Mobile/Tablet) */}
  <div className="absolute bottom-16 sm:bottom-24 w-full px-6 sm:px-24 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
    {/* Location */}
    <div 
      className="text-white text-lg sm:text-xl px-2 py-1 rounded-lg text-center sm:text-left w-full"
      style={{ fontFamily: "TanNimbus" }}
    >
      <p>{getFormattedDate(latestEventDetails.date)}</p>
      <p>{latestEventDetails.location.name}</p>
    </div>
    
    {/* Countdown */}
    <div 
      className="text-white text-lg sm:text-xl px-2 py-1 rounded-lg text-center sm:text-right w-full"
      style={{ fontFamily: "TanNimbus" }}
    >
      <CountdownTimer targetDate={latestEventDetails.date} />
    </div>
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
      <span id="konuşmacılar"></span>
      <Heading>Konuşmacılar</Heading>
      <SpeakerCarousel speakers={latestEventDetails.speakers} />
      <div className="w-screen bg-zinc-800 h-40"></div>
      <Heading>Etkinlik Akışı</Heading>
      <SessionContainer event={latestEventDetails} />
      <span id="konum"></span>
      <Heading>Konum</Heading>
      {/* <Location location={latestEventDetails.location}/> */}
      <Heading>Sıkça Sorulan Sorular</Heading>
      <FAQ />
    </>
  );
}
