import { saveAs } from "file-saver";
import type { Event } from "@/types";

function formatToICSDate(timeString: string, baseDate: string): string {
  try {
    // Parse the base date
    const baseDateObj = new Date(baseDate);
    if (isNaN(baseDateObj.getTime())) {
      throw new Error('Invalid base date');
    }

    // Parse hours and minutes from timeString (format: "HH:mm")
    const [hours, minutes] = timeString.split(':').map(Number);
    
    // Create new date object with the combined date and time
    const date = new Date(baseDateObj);
    date.setHours(hours, minutes, 0, 0);

    // Format to UTC string in YYYYMMDDTHHMMSSZ format
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const hour = date.getUTCHours().toString().padStart(2, '0');
    const minute = date.getUTCMinutes().toString().padStart(2, '0');
    
    return `${year}${month}${day}T${hour}${minute}00Z`;
  } catch (error) {
    console.error('Error formatting date:', error);
    throw error;
  }
}

function sanitizeICSField(field: string): string {
  if (!field) return '';
  
  return field
    .replace(/[\\,;]/g, "\\$&")
    .replace(/\n/g, "\\n")
    .replace(/[\r\t]/g, '')
    .trim();
}

export function generateCalendarFile(event: Event): void {
  try {
    // Validate inputs
    if (!event?.name || !event?.location || !event?.sessions?.length || !event?.date) {
      throw new Error("Missing required event data");
    }

    const icsLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//MyEventApp//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH"
    ];

    // Create timestamp for DTSTAMP
    const now = new Date();
    const timestamp = formatToICSDate(
      `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
      now.toISOString()
    );

    event.sessions.forEach((session) => {
      try {
        const startDate = formatToICSDate(session.startTime, event.date);
        const endDate = formatToICSDate(session.endTime, event.date);

        icsLines.push(
          "BEGIN:VEVENT",
          `UID:${event.id}-${session.topic.replace(/\W+/g, '')}-${Date.now()}@myeventapp.com`,
          `DTSTAMP:${timestamp}`,
          `DTSTART:${startDate}`,
          `DTEND:${endDate}`,
          `SUMMARY:${sanitizeICSField(session.topic)}`,
          `DESCRIPTION:${sanitizeICSField(`Speaker: ${session.speakerName}\n${event.description || ''}`)}`,
          `LOCATION:${sanitizeICSField(event.location)}`,
          "END:VEVENT"
        );
      } catch (error) {
        console.error(`Error creating event for session: ${session.topic}`, error);
      }
    });

    icsLines.push("END:VCALENDAR");

    // Each line should end with CRLF as per RFC 5545
    const icsContent = icsLines.join("\r\n");
    
    // Create and save the file
    const blob = new Blob([icsContent], { 
      type: "text/calendar;charset=utf-8" 
    });

    const fileName = `${event.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
    saveAs(blob, fileName);
  } catch (error) {
    console.error("Failed to generate calendar file:", error);
    throw new Error("Failed to generate calendar file");
  }
}