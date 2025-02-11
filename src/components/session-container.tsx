import { generateCalendarFile } from "@/lib/generateCalendar";
import type { Event } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SessionContainerProps {
  event: Event;
}

export default function SessionContainer({ event }: SessionContainerProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:my-8">
        {event.sessions.map((session) => (
          <Card
            key={session.topic}
            className="bg-white shadow-lg  w-5/6 md:w-full mx-auto"
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
                <p className="text-xl font-bold text-gray-900">
                  {session.speakerName}
                </p>
                <p className="text-gray-700 text-sm mt-1">{session.topic}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center my-4">
        <Button
          onClick={() => generateCalendarFile(event)}
          className="bg-orange-500 hover:bg-orange-600"
        >
          Takvime Ekle
        </Button>
      </div>
    </div>
  );
};