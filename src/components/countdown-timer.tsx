import { useCountdown } from "@/lib/useCounter";
import React, { useState, useEffect } from "react";

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { days, hours, minutes, seconds } = useCountdown(new Date(targetDate));

  if (!isClient) {
    return <p className="text-2xl">Yükleniyor...</p>; // Avoid rendering dynamic content on SSR
  }

  return (
    <div className="flex justify-end items-center">
      {days === 0 && hours === 0 && minutes === 0 && seconds === 0 ? (
        <p className="text-4xl font-extrabold text-right" style={{ fontFamily: "Montserrat"}}>Katıldığınız için teşekkürler</p>
      ) : (
        <>
          {/* Days */}
          <div className="flex flex-col items-center mx-2">
            <span className="text-5xl">{days}</span>
            <span className="text-xl">Gün</span>
          </div>

          {/* Custom Divider */}
          <div className="mx-2">
            <div className="w-px bg-white" style={{ height: "4rem" }}></div>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center mx-2">
            <span className="text-5xl">{hours}</span>
            <span className="text-xl">Saat</span>
          </div>

          {/* Custom Divider */}
          <div className="mx-2">
            <div className="w-px bg-white" style={{ height: "4rem" }}></div>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center mx-2">
            <span className="text-5xl">{minutes}</span>
            <span className="text-xl">Dakika</span>
          </div>

          {/* Custom Divider */}
          <div className="mx-2">
            <div className="w-px bg-white" style={{ height: "4rem" }}></div>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center mx-2">
            <span className="text-5xl">{seconds}</span>
            <span className="text-xl">Saniye</span>
          </div>
        </>
      )}
    </div>
  );
}
