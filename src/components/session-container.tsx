import { generateCalendarFile } from "@/lib/generateCalendar";
import type { Event, Session } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Check, Warning } from "@phosphor-icons/react";
import { slugify } from "@/lib/slugify";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface SessionContainerProps {
  event: Event;
}

export default function SessionContainer({ event }: SessionContainerProps) {
  const { toast } = useToast();

  // Check if event date has passed; if so, disable download and selection UI.
  const isPastEvent = new Date(event.date) < new Date();

  // Extract unique room names from sessions
  const [rooms, setRooms] = useState<string[]>([]);
  const [activeRoom, setActiveRoom] = useState<string>("");
  const [selectedSessions, setSelectedSessions] = useState<Session[]>([]);

  useEffect(() => {
    if (event.sessions && event.sessions.length > 0) {
      const uniqueRooms = Array.from(
        new Set(event.sessions.map((session) => session.room))
      );
      setRooms(uniqueRooms);
      if (uniqueRooms.length > 0 && !activeRoom) {
        setActiveRoom(uniqueRooms[0]);
      }
    }
  }, [event.sessions, activeRoom]);

  const handleCalendarDownload = async (sessions: Session[]) => {
    if (sessions.length === 0) return;

    const roomEvent = {
      ...event,
      location: {
        ...event.location,
        name:
          sessions.length === 1
            ? `${event.location.name} - ${sessions[0].room}`
            : event.location.name,
      },
      sessions: sessions,
    };
    await generateCalendarFile(roomEvent);

    toast({
      title: "Takvim dosyası indirildi",
      description: "Etkinlik takviminize eklendi.",
      className: "bg-green-500 text-white",
      duration: 3000,
    });
  };

  const timeToMinutes = (timeStr: string | undefined): number => {
    if (!timeStr) return 0;
    const parts = timeStr.split(":");
    if (parts.length !== 2) return 0;
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    if (isNaN(hours) || isNaN(minutes)) return 0;
    return hours * 60 + minutes;
  };

  // Only allow for session selection if event is upcoming.
  const hasTimeConflict = (session: Session): boolean => {
    return selectedSessions.some((selected) => {
      if (
        selected.speakerName === session.speakerName &&
        selected.topic === session.topic &&
        selected.room === session.room
      ) {
        return false;
      }
      const sessionStart = timeToMinutes(session.startTime);
      const sessionEnd = timeToMinutes(session.endTime);
      const selectedStart = timeToMinutes(selected.startTime);
      const selectedEnd = timeToMinutes(selected.endTime);
      return (
        (sessionStart >= selectedStart && sessionStart < selectedEnd) ||
        (sessionEnd > selectedStart && sessionEnd <= selectedEnd) ||
        (sessionStart <= selectedStart && sessionEnd >= selectedEnd)
      );
    });
  };

  const toggleSessionSelection = (session: Session) => {
    if (isPastEvent) return; // disable toggling for past events

    const isSelected = selectedSessions.some(
      (s) =>
        s.speakerName === session.speakerName &&
        s.topic === session.topic &&
        s.room === session.room
    );

    if (isSelected) {
      setSelectedSessions(
        selectedSessions.filter(
          (s) =>
            !(
              s.speakerName === session.speakerName &&
              s.topic === session.topic &&
              s.room === session.room
            )
        )
      );
    } else {
      if (hasTimeConflict(session)) {
        toast({
          title: "Zaman Çakışması",
          description: "Bu oturum, seçtiğiniz diğer oturumlarla çakışıyor.",
          variant: "destructive",
          duration: 3000,
        });
      }
      setSelectedSessions([...selectedSessions, session]);
    }
  };

  // Filter sessions for the current active room
  const filteredSessions = event.sessions.filter(
    (session) => session.room === activeRoom
  );

  // Check if the current room is "Network"
  const isNetworkRoom = activeRoom === "Network";

  return (
    <div className="max-w-6xl mx-auto md:w-5/6 pb-16 md:px-0 px-4">
      {rooms.length > 1 &&
        (() => {
          const sortedRooms = [
            ...rooms.filter((room) => room !== "Network").sort(),
            ...rooms.filter((room) => room === "Network"),
          ];
          return (
            <Tabs
              value={activeRoom}
              onValueChange={(value) => {
                // Allow room change always for viewing purposes.
                setActiveRoom(value);
              }}
              className="mb-8 flex flex-col items-center"
            >
              <TabsList className="gap-2 flex justify-center items-center">
                {sortedRooms.map((room) => (
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
          );
        })()}

      {/* Show selected sessions section only if event is upcoming */}
      {!isPastEvent && selectedSessions.length > 0 && (
        <div className="mb-8 p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:items-center mb-4">
            <h3 className="text-lg font-bold text-orange-700">
              Seçilen Oturumlar ({selectedSessions.length})
            </h3>
            <Button
              onClick={() => handleCalendarDownload(selectedSessions)}
              className="bg-orange-500 hover:bg-orange-600 active:bg-orange-800 shadow-md"
            >
              <Calendar className="mr-2" size={16} />
              Seçilenleri İndir
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedSessions.map((session) => (
              <Badge
                key={`selected-${session.room}-${session.speakerName}-${session.topic}`}
                className="bg-orange-200 text-orange-800 hover:bg-orange-300 cursor-pointer flex items-center gap-1 p-2"
                onClick={() => toggleSessionSelection(session)}
              >
                <span className="font-medium">{session.startTime}</span>
                <span className="mx-1">-</span>
                <span>{session.speakerName}</span>
                <span className="text-xs ml-1">({session.room})</span>
                <button className="ml-1 text-orange-700 hover:text-orange-900">
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {isNetworkRoom ? (
        // For Network room, show speaker photos without interactive elements
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
        // For regular rooms, show sessions without interactive controls if event is past.
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {filteredSessions.map((session) => {
            const isSelected = selectedSessions.some(
              (s) =>
                s.speakerName === session.speakerName &&
                s.topic === session.topic &&
                s.room === session.room
            );
            const hasConflict = hasTimeConflict(session) && !isSelected;
            return (
              <Card
                key={`session-card-${session.room}-${session.speakerName}-${session.topic}`}
                className={`bg-white shadow-lg w-full mx-auto transition-all ${
                  isSelected
                    ? "border-2 border-orange-500 ring-2 ring-orange-200"
                    : ""
                }`}
              >
                <CardContent
                  className="p-6 flex items-start justify-between relative hover:cursor-pointer"
                  onClick={() => {
                    if (!isPastEvent) toggleSessionSelection(session);
                  }}
                >
                  <div className="flex items-start">
                    <div className="flex flex-col items-center justify-center w-24 my-auto">
                      <p className="text-lg font-semibold text-gray-800">
                        {session.startTime}
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {session.endTime}
                      </p>
                    </div>
                    <div className="flex-1 pl-4">
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
                      <p className="text-gray-700 text-sm mt-1">
                        {session.topic}
                      </p>
                    </div>
                  </div>
                  {!isPastEvent && (
                    <div className="flex flex-col items-center ml-4 gap-2">
                      <div className="flex items-center gap-2">
                        {hasConflict && (
                          <Warning size={16} className="text-red-500" />
                        )}
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSessionSelection(session)}
                          className={`${
                            isSelected
                              ? "bg-orange-500 text-white"
                              : "border-orange-500"
                          } ${hasConflict ? "border-red-500" : ""}`}
                        />
                      </div>
                      {isSelected && (
                        <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full p-1">
                          <Check size={16} weight="bold" />
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Only show the download button if event is upcoming */}
      {!isNetworkRoom && !isPastEvent && (
        <div className="flex justify-center pt-8">
          <Button
            onClick={() => handleCalendarDownload(filteredSessions)}
            className="bg-orange-500 hover:bg-orange-600 active:bg-orange-800 font-bold shadow-lg hover:shadow-xl transition-all flex items-center p-6"
          >
            <Calendar className="mr-2" />
            Tüm Konuşmaları Ekle
          </Button>
        </div>
      )}
    </div>
  );
}
