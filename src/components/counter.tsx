import { useCountdown } from "@/lib/useCounter";
import React from "react";

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const { days, hours, minutes, seconds } = useCountdown(new Date(targetDate));

  return (
    <div className="text-center">
      <p className="text-2xl">
        {days === 0 && hours === 0 && minutes === 0 && seconds === 0
          ? "Katıldığınız için teşekkürler"
          : `${days}g ${hours}sa ${minutes}d ${seconds}s`}
      </p>
    </div>
  );
}
