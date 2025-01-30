import { useCountdown } from "@/lib/useCounter";
import React from "react";

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  console.log(new Date(targetDate))
  const { days, hours, minutes, seconds } = useCountdown(new Date(targetDate));
  console.log(days, hours, minutes, seconds)

  return (
    <div className="text-center">
      <p className="text-2xl">
        {days}g {hours}sa {minutes}d {seconds}s
      </p>
    </div>
  );
}