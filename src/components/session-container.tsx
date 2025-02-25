import { generateCalendarFile } from "@/lib/generateCalendar";
import type { Event, Session } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@phosphor-icons/react";
import { slugify } from "@/lib/slugify";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface SessionContainerProps {
  event: Event;
}

export default function SessionContainer({ event }: SessionContainerProps) {
  const { toast } = useToast();

  // Extract unique room names from sessions
  const [rooms, setRooms] = useState<string[]>([]);
  const [activeRoom, setActiveRoom] = useState<string>("");

  useEffect(() => {
    if (event.sessions && event.sessions.length > 0) {
      // Extract unique rooms
      const uniqueRooms = Array.from(
        new Set(event.sessions.map((session) => session.room))
      );
      setRooms(uniqueRooms);
      // Set first room as active by default
      if (uniqueRooms.length > 0 && !activeRoom) {
        setActiveRoom(uniqueRooms[0]);
      }
    }
  }, [event.sessions, activeRoom]);

  const handleCalendarDownload = async (session?: Session) => {
    // If a specific session is provided, include its room in the calendar event
    if (session) {
      const sessionEvent = {
        ...event,
        location: {
          ...event.location,
          name: `${event.location.name} - ${session.room}`,
        },
        sessions: [session],
      };
      await generateCalendarFile(sessionEvent);
    } else {
      // Download all sessions for the current active room
      const roomSessions = event.sessions.filter((s) => s.room === activeRoom);
      const roomEvent = {
        ...event,
        location: {
          ...event.location,
          name: `${event.location.name} - ${activeRoom}`,
        },
        sessions: roomSessions,
      };
      await generateCalendarFile(roomEvent);
    }

    toast({
      title: "Takvim dosyası indirildi",
      description: "Etkinlik takviminize eklendi.",
      className: "bg-green-500 text-white",
      duration: 3000,
    });
  };

  // Filter sessions for the current active room
  const filteredSessions = event.sessions.filter(
    (session) => session.room === activeRoom
  );

  // Check if current room is Network room
  const isNetworkRoom = activeRoom === "Network";

  return (
    <div className="max-w-6xl mx-auto md:w-5/6 pb-16 md:px-0 px-4">
      {rooms.length > 0 && (
        <Tabs
          value={activeRoom}
          onValueChange={setActiveRoom}
          className="mb-8 flex flex-col items-center"
        >
          <TabsList className="gap-2 flex justify-center items-center">
            {rooms.map((room) => (
              <TabsTrigger
                key={`room-tab-${room}`}
                value={room}
                className="px-4 py-2 text-sm md:text-base font-medium"
              >
                {room}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {isNetworkRoom ? (
        // Special layout for Network room - just speaker photos
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {filteredSessions.map((session) => {
            const speaker = event.speakers.find(
              (s) => s.fullName === session.speakerName
            );
            return (
              <div
                key={`network-speaker-${session.speakerName}-${session.topic}`}
                className="flex flex-col items-center w-[calc(100%/2-1.5rem)] sm:w-[calc(100%/3-1.5rem)] md:w-[calc(100%/4-1.5rem)] lg:w-[calc(100%/5-1.5rem)]"
              >
                <div className="relative">
                  <img
                    src={`/images/speakers/${slugify(session.speakerName)}.jpg`}
                    alt={session.speakerName}
                    className="w-32 h-32 rounded-full object-cover mx-auto shadow-lg"
                  />
                </div>
                <p className="text-lg font-bold text-center mt-3">
                  {session.speakerName}
                </p>
                {speaker && (
                  <p className="text-sm text-gray-600 text-center">
                    {speaker.title}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        // Regular layout for standard sessions
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {filteredSessions.map((session) => (
            <Card
              key={`session-card-${session.room}-${session.speakerName}-${session.topic}`}
              className="bg-white shadow-lg w-full mx-auto"
            >
              <CardContent className="p-6 flex items-center relative">
                <div className="flex flex-col items-center justify-center w-24">
                  <p className="text-lg font-semibold text-gray-800">
                    {session.startTime}
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {session.endTime}
                  </p>
                  <Button
                    onClick={() => handleCalendarDownload(session)}
                    className="mt-2 rounded-full w-8 h-8 p-0 bg-orange-500 hover:bg-orange-600 active:bg-orange-800 shadow-lg"
                  >
                    <Calendar size={16} />
                  </Button>
                </div>
                <div className="flex-1 pl-6">
                  <div className="flex items-center">
                    <img
                      src={`/images/speakers/${slugify(
                        session.speakerName
                      )}.jpg`}
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
      )}

      <div className="flex justify-center pt-8">
        <Button
          onClick={() => handleCalendarDownload()}
          className="bg-orange-500 hover:bg-orange-600 active:bg-orange-800 font-bold shadow-lg hover:shadow-xl transition-all flex items-center p-6"
        >
          <Calendar className="mr-2" />
          Tümünü Ekle
        </Button>
      </div>
    </div>
  );
}
