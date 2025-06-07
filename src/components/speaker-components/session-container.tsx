"use client";

import { generateCalendarFile } from "@/lib/generateCalendar";
import type { Event, Session } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Queue, Warning } from "@phosphor-icons/react";
import { slugify } from "@/lib/slugify";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { formatIsoDate } from "@/lib/event-utils";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SessionContainerProps {
  event: Event;
  color: string; // Now expecting an HSL value like "214 83.7% 51%"
}

export default function SessionContainer({
  event,
  color,
}: SessionContainerProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [selectedSessions, setSelectedSessions] = useState<Session[]>([]);

  // New state for room-based filtering
  const [rooms, setRooms] = useState<string[]>([]);
  const [activeRoom, setActiveRoom] = useState<string>("");

  // Parse the HSL value
  const hsl = color.split(" ");
  const h = hsl[0];
  const s = hsl[1];
  const l = hsl[2];

  // Create color variations
  const primaryColor = `hsl(${h} ${s} ${l})`;
  const lightColor = `hsl(${h} ${s} 90%)`; // Light version
  const darkerColor = `hsl(${h} ${s} ${parseInt(l) * 0.7}%)`; // Darker version
  const darkestColor = `hsl(${h} ${s} ${parseInt(l) * 0.5}%)`; // Darkest version
  const bgLight = `hsl(${h} ${s} 95%)`; // Very light background
  const textColor = `hsl(${h} ${s} 25%)`; // Dark text color that matches the hue

  // Check if event date has passed
  const isPastEvent = new Date(event.date) < new Date();

  // Extract unique room names from sessions
  useEffect(() => {
    if (event.sessions && event.sessions.length > 0) {
      const uniqueRooms = Array.from(
        new Set(event.sessions.map((session) => session.room || "Main")),
      );
      setRooms(uniqueRooms);
      if (uniqueRooms.length > 0 && !activeRoom) {
        setActiveRoom(uniqueRooms[0]);
      }
    }
  }, [event.sessions, activeRoom]);

  // Replace the handleCalendarDownload function with this updated version
  const handleCalendarDownload = async (sessions: Session[]) => {
    if (sessions.length === 0) return;

    // Get current date at the start of the day (midnight)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if the event date is in the past
    const eventDate = new Date(event.date);
    if (eventDate < today) {
      toast({
        title: "Bilgi",
        description: "Bu etkinlik geçmiş bir tarihte gerçekleşmiştir.",
        className: "bg-yellow-500 text-white",
        duration: 3000,
      });
      return;
    }

    const roomEvent = {
      ...event,
      location: {
        ...event.location,
        name:
          sessions.length === 1
            ? `${event.location.name} - ${sessions[0].room || "Main"}`
            : event.location.name,
      },
      sessions: sessions,
    };

    await generateCalendarFile(roomEvent);

    toast({
      title: "Takvim dosyası indirildi",
      description: `${sessions.length} etkinlik takviminize eklendi.`,
      className: "bg-green-500 text-white",
      duration: 3000,
    });
  };

  // Time conflict detection function
  const timeToMinutes = (timeStr: string | undefined): number => {
    if (!timeStr) return 0;
    const parts = timeStr.split(":");
    if (parts.length !== 2) return 0;
    const hours = Number.parseInt(parts[0], 10);
    const minutes = Number.parseInt(parts[1], 10);
    if (isNaN(hours) || isNaN(minutes)) return 0;
    return hours * 60 + minutes;
  };

  const hasTimeConflict = (session: Session): boolean => {
    // disable conflict logic

    // return selectedSessions.some((selected) => {
    //   if (
    //     selected.speakerName === session.speakerName &&
    //     selected.topic === session.topic &&
    //     selected.room === session.room
    //   ) {
    //     return false;
    //   }
    //   const sessionStart = timeToMinutes(session.startTime);
    //   const sessionEnd = timeToMinutes(session.endTime);
    //   const selectedStart = timeToMinutes(selected.startTime);
    //   const selectedEnd = timeToMinutes(selected.endTime);
    //   return (
    //     (sessionStart >= selectedStart && sessionStart < selectedEnd) ||
    //     (sessionEnd > selectedStart && sessionEnd <= selectedEnd) ||
    //     (sessionStart <= selectedStart && sessionEnd >= selectedEnd)
    //   );
    // });
    return false;
  };

  const toggleSessionSelection = (session: Session) => {
    if (isPastEvent) return; // disable toggling for past events

    const isSelected = selectedSessions.some(
      (s) =>
        s.speakerName === session.speakerName &&
        s.topic === session.topic &&
        (s.room === session.room || (!s.room && !session.room)),
    );

    if (isSelected) {
      setSelectedSessions(
        selectedSessions.filter(
          (s) =>
            !(
              s.speakerName === session.speakerName &&
              s.topic === session.topic &&
              (s.room === session.room || (!s.room && !session.room))
            ),
        ),
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
  const filteredSessions = activeRoom
    ? event.sessions.filter(
        (session) => (session.room || "Main") === activeRoom,
      )
    : event.sessions;

  // Check if it's a networking event based on room or speaker info
  const isNetworkingEvent =
    activeRoom === "Network" ||
    filteredSessions.every(
      (session) =>
        session.room === "Network" ||
        session.topic?.toLowerCase().includes("network") ||
        session.speakerName.toLowerCase().includes("network"),
    );

  // Animation variants for the session badges
  const badgeContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const handleRoute = () => {
    router.push(
      "https://www.youtube.com/playlist?list=PLQvJkakaBRKcEf3tq169jkNvoyiQN2XzN",
    );
  };

  return (
    <div className=" mx-auto w-full md:w-5/6 2xl:w-2/3 pb-16 md:px-0 px-4 pt-[30px]">
      {/* Room tabs */}
      {rooms.length > 1 && (
        <>
          <h2 className="font-extrabold text-3xl sm:text-4xl md:text-5xl mb-2 text-center text-color-text">
            Seni bekleyen
          </h2>
          <Tabs
            value={activeRoom}
            onValueChange={(value) => {
              setActiveRoom(value);
            }}
            className="mb-2 mt-4 flex flex-col items-center"
          >
            <TabsList className="border border-blue-200 rounded-lg p-1 gap-x-2 overflow-hidden bg-color-accent shadow-sm h-auto">
              {[
                ...rooms.filter((room) => room !== "Network").sort(),
                ...rooms.filter((room) => room === "Network"),
              ].map((room, index) => (
                <TabsTrigger
                  key={`room-tab-${room}`}
                  value={room}
                  className={`px-8 py-1 text-xl sm:text-2xl md:text-4xl font-bold rounded-lg transition-all duration-200 ${
                    room === activeRoom
                      ? "bg-color-white text-white"
                      : "bg-color-white text-gray-800 hover:bg-gray-100/90"
                  }`}
                >
                  {room}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <h2 className="font-extrabold text-3xl sm:text-4xl md:text-5xl mb-2 text-center text-color-text">
            Konuşmaları
          </h2>
          <p className="text-lg max-w-4xl w-5/6 mx-auto text-center pb-16">
            Sektörün önde gelen şirketleri hangi teknolojileri kullanıyor,
            kararlarını neye göre alıyor, geleceği nasıl görüyor? Gelin,
            doğrudan onların ağzından dinleyelim
          </p>
        </>
      )}

      <AnimatePresence>
        {!isPastEvent && selectedSessions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <motion.div
              style={{
                backgroundColor: bgLight,
                borderColor: lightColor,
              }}
              className="p-4 rounded-lg border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:items-center mb-4">
                <h3 className="text-lg font-bold" style={{ color: textColor }}>
                  Seçilen Oturumlar ({selectedSessions.length})
                </h3>
                <Button
                  data-umami-event="Generate Custom Calendar"
                  onClick={() => handleCalendarDownload(selectedSessions)}
                  style={{
                    backgroundColor: primaryColor,
                    color: "white",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  className="hover:opacity-90 active:opacity-80 shadow-md"
                >
                  <Calendar className="mr-2" size={16} />
                  Seçilenleri Ekle
                </Button>
              </div>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={badgeContainerVariants}
                initial="hidden"
                animate="show"
              >
                <AnimatePresence>
                  {selectedSessions.map((session) => (
                    <motion.div
                      key={`selected-${session.speakerName}-${session.topic}-${session.room || ""}`}
                      variants={badgeVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      layout
                    >
                      <Badge
                        style={{
                          backgroundColor: lightColor,
                          color: textColor,
                        }}
                        className="cursor-pointer flex items-center gap-1 p-2 hover:opacity-90"
                        onClick={() => toggleSessionSelection(session)}
                      >
                        <span className="font-medium">{session.startTime}</span>
                        <span className="mx-1">-</span>
                        <span>{session.speakerName}</span>
                        {session.room && (
                          <span className="text-xs ml-1">({session.room})</span>
                        )}
                        <button className="ml-1" style={{ color: darkerColor }}>
                          ×
                        </button>
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isNetworkingEvent ? (
        // For Networking events, show speaker photos without interactive elements
        <div className="flex flex-wrap justify-center gap-6 max-w-5/6 mx-auto bg-color-primary p-8 rounded-2xl">
          {filteredSessions.map((session) => {
            const speaker = event.speakers.find(
              (s) => s.fullName === session.speakerName,
            );
            return (
              <div
                key={`network-speaker-${session.speakerName}-${session.topic || ""}`}
                className="flex flex-col items-center w-[calc(100%/2-1.5rem)] sm:w-[calc(100%/3-1.5rem)] md:w-[calc(100%/4-1.5rem)] lg:w-[calc(100%/5-1.5rem)]"
              >
                <div className="relative">
                  <Image
                    src={`/images/speakers/${slugify(session.speakerName)}.webp`}
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
          {filteredSessions.map((session) => {
            const isSelected = selectedSessions.some(
              (s) =>
                s.speakerName === session.speakerName &&
                s.topic === session.topic &&
                (s.room === session.room || (!s.room && !session.room)),
            );

            // disable conflict logic

            // const hasConflict = hasTimeConflict(session) && !isSelected;
            const hasConflict = false;

            return (
              <Card
                key={`session-card-${session.speakerName}-${session.topic}-${session.room || ""}`}
                className={`w-full mx-auto p-4 py-6 rounded-2xl select-none transition-all overflow-hidden ${
                  isSelected
                    ? "border-2 border-color-accent outline outline-2 outline-color-accent outline-offset-0"
                    : ""
                } bg-color-primary`}
              >
                {/* MOBILE: image + time+checkbox in row, topic below */}
                {/* MOBILE layout (image spans two rows) */}
                <div
                  className="flex flex-col sm:hidden gap-3"
                  onClick={() => {
                    if (!isPastEvent) toggleSessionSelection(session);
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Image spanning 2 rows */}
                    <div className="relative w-16 aspect-square rounded-full overflow-hidden border-4 border-white shadow-md shrink-0 row-span-2">
                      <Image
                        src={`/images/speakers/${slugify(session.speakerName)}.webp`}
                        alt={session.speakerName}
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Name & Time + Checkbox */}
                    <div className="flex flex-col flex-1 gap-1">
                      <p className="font-bold text-color-text text-lg">
                        {session.speakerName}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-color-text whitespace-nowrap">
                          {session.startTime} - {session.endTime}
                        </p>
                        {!isPastEvent && (
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
                              className={`border rounded ${
                                isSelected
                                  ? "bg-color-accent text-white"
                                  : "bg-transparent text-transparent"
                              } ${hasConflict ? "border-red-500" : "border-color-accent"}`}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Topic below */}
                  <div className="text-left">
                    <p className="text-color-text text-sm">{session.topic}</p>
                  </div>
                </div>

                {/* DESKTOP/TABLET layout unchanged */}
                <div
                  className="hidden sm:flex flex-row items-center justify-between gap-4"
                  onClick={() => {
                    if (!isPastEvent) toggleSessionSelection(session);
                  }}
                >
                  {/* Left: Image + Info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="relative w-[60px] aspect-square rounded-full overflow-hidden border-4 border-white shadow-md shrink-0">
                      <Image
                        src={`/images/speakers/${slugify(session.speakerName)}.webp`}
                        alt={session.speakerName}
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold text-color-text text-lg">
                        {session.speakerName}
                      </p>
                      <p className="text-color-text text-sm">{session.topic}</p>
                    </div>
                  </div>

                  {/* Right: Time + Checkbox */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <p className="text-sm font-semibold text-color-text whitespace-nowrap">
                      {session.startTime} - {session.endTime}
                    </p>
                    {!isPastEvent && (
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
                          className={`border rounded ${
                            isSelected
                              ? "bg-color-accent text-white"
                              : "bg-transparent text-transparent"
                          } ${hasConflict ? "border-red-500" : "border-color-accent"}`}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Only show the download button if event is upcoming */}
      {/* {!isNetworkingEvent && (
        <div className="flex flex-col md:flex-row justify-center pt-8 gap-y-2 md:gap-x-4">
          {!isPastEvent && (
            <div className="bg-gradient-to-r from-[#3682F1] to-[#C55E85] p-[2px] rounded-2xl w-full md:w-1/3">
              <Button
                data-umami-event="Generate Full Calendar"
                onClick={() => handleCalendarDownload(filteredSessions)}
                className="w-full bg-gray-700 hover:bg-gray-800 active:bg-gray-900 font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center p-6 rounded-2xl"
              >
                <Calendar className="mr-2" />
                Tüm Yayınları Ekle
              </Button>
            </div>
          )}
          <div className="bg-gradient-to-r from-[#3682F1] to-[#C55E85] p-[2px] rounded-2xl w-full md:w-1/3">
            <Button
              data-umami-event="Youtube Playlist"
              onClick={() => handleRoute()}
              className="w-full bg-gray-700 hover:bg-gray-800 active:bg-gray-900 font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center p-6 rounded-2xl"
            >
              <Queue className="mr-2" />
              Oynatma Listesi
            </Button>
          </div>
        </div>
      )} */}
    </div>
  );
}
