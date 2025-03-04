import { generateCalendarFile } from "@/lib/generateCalendar";
import type { Event, Session } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Warning } from "@phosphor-icons/react";
import { slugify } from "@/lib/slugify";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { formatIsoDate } from "@/lib/event-utils";

interface SessionContainerProps {
  event: Event;
}

export default function SessionContainer({ event }: SessionContainerProps) {
  const { toast } = useToast();

  // Check if event date has passed; if so, disable download and selection UI.

  const [selectedSessions, setSelectedSessions] = useState<Session[]>([]);

  const handleCalendarDownload = async (sessions: Session[]) => {
    if (sessions.length === 0) return;

    const eventData = {
      ...event,
      sessions: sessions,
    };
    await generateCalendarFile(eventData);

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
    const hours = Number.parseInt(parts[0], 10);
    const minutes = Number.parseInt(parts[1], 10);
    if (isNaN(hours) || isNaN(minutes)) return 0;
    return hours * 60 + minutes;
  };

  // Only allow for session selection if event is upcoming.
  const hasTimeConflict = (session: Session): boolean => {
    return selectedSessions.some((selected) => {
      if (
        selected.speakerName === session.speakerName &&
        selected.topic === session.topic
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
    const isSelected = selectedSessions.some(
      (s) => s.speakerName === session.speakerName && s.topic === session.topic
    );

    if (isSelected) {
      setSelectedSessions(
        selectedSessions.filter(
          (s) =>
            !(
              s.speakerName === session.speakerName && s.topic === session.topic
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

  // Check if it's a networking event based on speaker info
  const isNetworkingEvent = event.sessions.some(
    (session) =>
      session.topic.toLowerCase().includes("network") ||
      session.speakerName.toLowerCase().includes("network")
  );

  return (
    <div className="max-w-6xl mx-auto md:w-5/6 pb-16 md:px-0 px-4">
      {/* Show selected sessions section only if event is upcoming */}
      {selectedSessions.length > 0 && (
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:items-center mb-4">
            <h3 className="text-lg font-bold text-blue-700">
              Seçilen Oturumlar ({selectedSessions.length})
            </h3>
            <Button
              onClick={() => handleCalendarDownload(selectedSessions)}
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-800 shadow-md"
            >
              <Calendar className="mr-2" size={16} />
              Seçilenleri Ekle
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedSessions.map((session) => (
              <Badge
                key={`selected-${session.speakerName}-${session.topic}`}
                className="bg-blue-200 text-blue-800 hover:bg-blue-300 cursor-pointer flex items-center gap-1 p-2"
                onClick={() => toggleSessionSelection(session)}
              >
                <span className="font-medium">{session.startTime}</span>
                <span className="mx-1">-</span>
                <span>{session.speakerName}</span>
                <button className="ml-1 text-blue-700 hover:text-blue-900">
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {isNetworkingEvent ? (
        // For Networking events, show speaker photos without interactive elements
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {event.sessions.map((session) => {
            const speaker = event.speakers.find(
              (s) => s.fullName === session.speakerName
            );
            return (
              <div
                key={`network-speaker-${session.speakerName}-${session.topic}`}
                className="flex flex-col items-center w-[calc(100%/2-1.5rem)] sm:w-[calc(100%/3-1.5rem)] md:w-[calc(100%/4-1.5rem)] lg:w-[calc(100%/5-1.5rem)]"
              >
                <div className="relative">
                  <Image
                    src={`/images/speakers/${slugify(session.speakerName)}.jpg`}
                    alt={session.speakerName}
                    width={128}
                    height={128}
                    className="rounded-full object-cover mx-auto shadow-lg"
                    loading="lazy"
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
        // For regular sessions, show without interactive controls if event is past.
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {event.sessions.map((session) => {
            const isSelected = selectedSessions.some(
              (s) =>
                s.speakerName === session.speakerName &&
                s.topic === session.topic
            );
            const hasConflict = hasTimeConflict(session) && !isSelected;
            return (
              <Card
                key={`session-card-${session.speakerName}-${session.topic}`}
                className={`select-none bg-white shadow-lg w-full mx-auto transition-all overflow-hidden ${
                  isSelected ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <div className="flex h-full">
                  <div className="relative w-1/4 min-w-[120px] bg-indigo-900">
                    <Image
                      src={`/images/speakers/${slugify(
                        session.speakerName
                      )}.webp`}
                      alt={session.speakerName}
                      fill
                      className="object-cover opacity-80"
                      loading="lazy"
                    />
                  </div>
                  <div
                    className={`flex-1 p-6 flex items-start justify-between relative hover:cursor-pointer ${
                      isSelected ? "bg-blue-50" : "bg-white"
                    }`}
                    onClick={() => {
                      toggleSessionSelection(session);
                    }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-500">
                          {formatIsoDate(session.date)} {session.startTime} -{" "}
                          {session.endTime}
                        </p>
                      </div>
                      <p className="text-xl font-bold text-gray-900 mt-1">
                        {session.speakerName}
                      </p>
                      <p className="text-blue-600 text-sm mt-1">
                        {session.topic}
                      </p>
                    </div>

                    <div className="flex flex-col items-center ml-4 gap-2">
                      <div className="flex items-center gap-2">
                        {hasConflict && (
                          <Warning size={16} className="text-red-500" />
                        )}
                        <Checkbox
                          aria-label="checkbox"
                          checked={isSelected}
                          onCheckedChange={() =>
                            toggleSessionSelection(session)
                          }
                          className={`${
                            isSelected
                              ? "bg-blue-500 text-white"
                              : "border-blue-500"
                          } ${hasConflict ? "border-red-500" : ""}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Only show the download button if event is upcoming */}
      {!isNetworkingEvent && (
        <div className="flex justify-center pt-8">
          <Button
            onClick={() => handleCalendarDownload(event.sessions)}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-800 font-bold shadow-lg hover:shadow-xl transition-all flex items-center p-6"
          >
            <Calendar className="mr-2" />
            Tüm Yayınları Ekle
          </Button>
        </div>
      )}
    </div>
  );
}
