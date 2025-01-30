"use client";

import CountdownTimer from "@/components/counter";
import { getLatestEvent } from "@/lib/event-utils";

export default function Home() {
  const latestEventDetails = getLatestEvent();

  // Eğer latestEventDetails boşsa bir hata durumu eklenebilir
  if (!latestEventDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Etkinlik bulunamadı.</p>
      </div>
    );
  }

  // Tarihi string olarak formatlama
  const formattedDate = new Date(latestEventDetails.date).toLocaleDateString(
    "tr-TR",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

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
        <div className="absolute bottom-24 left-24 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded-lg shadow-lg">
          <p>{formattedDate}</p>
          <p>{latestEventDetails.location}</p>
        </div>

        {/* Sağ alt köşe: Orijinal Tarih Nesnesi */}
        <div className="absolute bottom-24 right-24 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded-lg shadow-lg">
          <CountdownTimer targetDate={latestEventDetails.date} />
        </div>
      </div>

      <div className="w-screen bg-zinc-800 h-40"></div>
      
      <div className="text-center py-8 text-xl max-w-lg m-auto">
        <p className="text-2xl font italic">{latestEventDetails.title}</p>
        <p className="text-4xl">{latestEventDetails.subTitle}</p>
        <p className="text-justify pt-4" style={{ whiteSpace: "pre-line" }}>
          {latestEventDetails.description}
        </p>
      </div>
      <div className="w-screen bg-zinc-800 h-40"></div>
    </>
  );
}
