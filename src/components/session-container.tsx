import { generateCalendarFile } from "@/lib/generateCalendar";
import type { Event } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@phosphor-icons/react";
import { slugify } from "@/lib/slugify";
import { useToast } from "@/hooks/use-toast";

interface SessionContainerProps {
  event: Event;
}

export default function SessionContainer({ event }: SessionContainerProps) {
  const { toast } = useToast();

  const handleCalendarDownload = async () => {
    await generateCalendarFile(event);
    toast({
      title: "Takvim dosyası indirildi",
      description: "Etkinlik takviminize eklendi.",
      className: "bg-green-500 text-white",
      duration: 3000,
    });
  };

  return (
    <div className="max-w-6xl mx-auto md:w-5/6 pb-16 md:px-0 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {event.sessions.map((session) => (
          <Card
            key={session.topic}
            className="bg-white shadow-lg w-full mx-auto"
          >
            <CardContent className="p-6 flex items-center">
              <div className="flex flex-col items-center justify-center w-24">
                <p className="text-lg font-semibold text-gray-800">
                  {session.startTime}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {session.endTime}
                </p>
              </div>
              <div className="flex-1 pl-6">
                <div className="flex items-center">
                  <img
                    src={`/images/speakers/${slugify(session.speakerName)}.jpg`}
                    alt={session.speakerName}
                    className="w-8 h-8 rounded-full object-cover mr-4"
                  />
                  <p className="text-xl font-bold text-gray-900">
                    {session.speakerName}
                  </p>
                </div>
                <p className="text-gray-700 text-sm mt-1">{session.topic}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center md:justify-start pt-8">
        <Button
          onClick={handleCalendarDownload}
          className="bg-orange-500 hover:bg-orange-600 active:bg-orange-800 font-bold shadow-lg hover:shadow-xl transition-all flex items-center p-6"
        >
          <Calendar className="mr-2" />
          Takvime Ekle
        </Button>
      </div>
    </div>
  );
}
