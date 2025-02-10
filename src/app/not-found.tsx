"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {

  const router = useRouter()

  const handleRoute = () => {
    router.push("/")
  }
    return (
        <div
        className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('/dmg-main-bg.png')`,
        }}
      >
        <p style={{ fontFamily: "TanNimbus" }} className="flex justify-center align-middle text-white text-4xl text-center">
            404
            <br/>
            Öyle bir etkinlik olsa da gitsek!
        </p>
        <Button onClick={handleRoute} className="mt-16">Anasayfaya Dön</Button>
      </div>
    )
}