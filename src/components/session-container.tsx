import { generateCalendarFile } from "@/lib/generateCalendar";
import type { Event } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@phosphor-icons/react";
import { slugify } from "@/lib/slugify";

interface SessionContainerProps {
  event: Event;
}

export default function SessionContainer({ event }: SessionContainerProps) {
  return (
    <div className="max-w-4xl mx-auto md:w-5/6 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {event.sessions.map((session) => (
          <Card
            key={session.topic}
            className="bg-white shadow-lg w-5/6 md:w-full mx-auto"
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
                {/* First line: Speaker image and name */}
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
                {/* Second line: Session topic */}
                <p className="text-gray-700 text-sm mt-1">
                  {session.topic}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center md:justify-start pt-8">
        <Button
          onClick={() => generateCalendarFile(event)}
          className="bg-orange-500 hover:bg-orange-600 font-bold shadow-lg hover:shadow-xl transition-all flex items-center"
        >
          <Calendar className="mr-2" />
          Takvime Ekle
        </Button>
      </div>
    </div>
  );
};
