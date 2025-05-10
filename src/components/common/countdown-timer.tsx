"use client";

import { useCountdown } from "@/lib/useCounter";
import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
  center?: boolean;
}

export default function CountdownTimer({
  targetDate,
  center = false,
}: CountdownTimerProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { days, hours, minutes, seconds } = useCountdown(new Date(targetDate));

  if (!isClient) {
    return <p className="text-2xl">Yükleniyor...</p>; // Avoid rendering dynamic content on SSR
  }

  const containerClasses = `flex ${
    center ? "justify-center" : "justify-center lg:justify-start"
  } items-center`;

  return (
    <div className={containerClasses}>
      {days === 0 && hours === 0 && minutes === 0 && seconds === 0 ? (
        <p
          className={`text-4xl font-extrabold ${
            center ? "text-center" : "text-center md:text-right"
          }`}
          // style={{ fontFamily: "Montserrat" }}
        >
          Katıldığınız için teşekkürler
        </p>
      ) : (
        <>
          {/* Days */}
          <div className="flex flex-col items-center mx-1 md:mx-2">
            <span className="text-3xl md:text-5xl">{days}</span>
            <span className="text-base md:text-xl">Gün</span>
          </div>

          {/* Custom Divider */}
          <div className="mx-1 md:mx-2">
            <div
              className="w-px bg-color-text"
              style={{ height: "3rem", marginTop: "0.5rem" }}
            ></div>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center mx-1 md:mx-2">
            <span className="text-3xl md:text-5xl">{hours}</span>
            <span className="text-base md:text-xl">Saat</span>
          </div>

          {/* Custom Divider */}
          <div className="mx-1 md:mx-2">
            <div
              className="w-px bg-color-text"
              style={{ height: "3rem", marginTop: "0.5rem" }}
            ></div>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center mx-1 md:mx-2">
            <span className="text-3xl md:text-5xl">{minutes}</span>
            <span className="text-base md:text-xl">Dakika</span>
          </div>

          {/* Custom Divider */}
          <div className="mx-1 md:mx-2">
            <div
              className="w-px bg-color-text"
              style={{ height: "3rem", marginTop: "0.5rem" }}
            ></div>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center mx-1 md:mx-2">
            <span className="text-3xl md:text-5xl">{seconds}</span>
            <span className="text-base md:text-xl">Saniye</span>
          </div>
        </>
      )}
    </div>
  );
}
