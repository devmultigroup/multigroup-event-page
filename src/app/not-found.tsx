"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CountdownTimer from "@/components/common/countdown-timer";
import { getLatestEvent } from "@/lib/event-utils";
import { Sparkles, Ghost, Home, Coffee } from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  const latestEventDetails = getLatestEvent();
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [stars, setStars] = useState<
    Array<{ id: number; x: number; y: number; size: number; opacity: number }>
  >([]);

  // Generate stars for the background
  useEffect(() => {
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
    }));
    setStars(newStars);
  }, []);

  const handleRoute = () => {
    router.push("/");
  };

  const handleNumberClick = () => {
    setClickCount((prev) => prev + 1);

    // After 5 clicks, show the easter egg
    if (clickCount === 4) {
      setShowEasterEgg(true);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-color-background pt-[25vh] pb-8">
      {/* Animated stars background */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-pulse text-color-text"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: "currentColor",
            opacity: star.opacity,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}

      {/* Floating ghost animation */}
      <div className="absolute animate-bounce duration-1000 opacity-20 top-30 md:top-40 right-10 md:right-20">
        <Ghost size={40} className="text-color-text md:hidden" />
        <Ghost size={80} className="text-color-text hidden md:block" />
      </div>

      {/* 404 with click interaction */}
      <div
        onClick={handleNumberClick}
        className="relative cursor-pointer transition-all duration-300 hover:scale-105"
      >
        <p
          style={{ fontFamily: "TanNimbus" }}
          className="select-none flex justify-center align-middle text-color-text text-7xl md:text-9xl text-center leading-relaxed"
        >
          404
        </p>
        {clickCount > 0 && 5 - clickCount > 0 && (
          <div className="absolute -top-4 -right-4 bg-color-accent rounded-full w-8 h-8 flex items-center justify-center text-color-primary text-xs font-bold">
            {5 - clickCount}
          </div>
        )}
        <Sparkles
          className="absolute -top-6 -left-6 text-color-accent animate-spin"
          style={{ animationDuration: "8s" }}
        />
        <Sparkles
          className="absolute -bottom-6 -right-6 text-color-accent animate-spin"
          style={{ animationDuration: "8s", animationDirection: "reverse" }}
        />
      </div>

      <p className="text-2xl md:text-4xl py-4 md:py-6 text-color-text font-extrabold text-center max-w-xl mx-auto px-4">
        Öyle bir etkinlik olsa da gitsek!
      </p>

      <div className="mt-6 md:mt-8 text-color-text bg-color-primary p-4 md:p-6 rounded-xl backdrop-blur-sm mx-4 w-[90%] max-w-md">
        <p className="text-center mb-2 text-color-accent font-semibold text-sm md:text-base">
          Bir sonraki etkinliğe kalan süre:
        </p>

        <CountdownTimer center targetDate={latestEventDetails.date} />
      </div>

      <Button
        onClick={handleRoute}
        className="mt-5 md:mt-8 mb-12 bg-color-accent hover:bg-color-accent/80 text-color-text px-6 md:px-8 py-5 md:py-6 text-base md:text-lg flex items-center gap-2 animate-pulse"
        style={{ animationDuration: "3s" }}
      >
        <Home size={18} />
        Anasayfaya Dön
      </Button>

      {/* Easter egg content */}
      {showEasterEgg && (
        <>
          <div
            className="fixed inset-0 bg-color-background/90 z-10 flex items-center justify-center flex-col gap-4"
            onClick={() => setShowEasterEgg(false)}
          >
            <div className="relative">
              <Coffee
                size={100}
                className="text-color-accent animate-bounce"
                style={{
                  animationDuration: "2s",
                }}
              />
            </div>
            <p className="text-2xl md:text-4xl text-color-text font-bold mt-8 text-center px-4">
              Kahve molası verelim mi? 🤫
            </p>
            <p className="text-base md:text-xl text-color-accent mt-4 text-center max-w-md px-6">
              404 sayfasını buldun, gizli easter egg'i keşfettin... Şimdi bir
              kave molası vermeyi hak ettin!
            </p>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setShowEasterEgg(false);
              }}
              className="mt-8 bg-color-accent hover:bg-color-accent/80 text-color-primary"
            >
              Geri Dön
            </Button>
          </div>
        </>
      )}

      {/* Hint for the easter egg */}
      <p className="text-color-text/30 text-[10px] md:text-xs px-4 text-center w-full">
        {clickCount > 0 && clickCount < 5
          ? "Devam et, neredeyse başardın..."
          : "Psst... 404'e tıklamayı dene"}
      </p>
    </div>
  );
}
