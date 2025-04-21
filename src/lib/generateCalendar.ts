import { saveAs } from "file-saver";
import type { Event, Session } from "@/types";

// Helper function remains unchanged.
function formatToICSDate(timeString: string, baseDate: string): string {
  try {
    // Parse the base date
    const baseDateObj = new Date(baseDate);
    if (isNaN(baseDateObj.getTime())) {
      throw new Error("Invalid base date");
    }

    // Parse hours and minutes from timeString (format: "HH:mm")
    const [hours, minutes] = timeString.split(":").map(Number);

    // Create new date object with the combined date and time
    const date = new Date(baseDateObj);
    date.setHours(hours, minutes, 0, 0);

    // Format to UTC string in YYYYMMDDTHHMMSSZ format
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    const hour = date.getUTCHours().toString().padStart(2, "0");
    const minute = date.getUTCMinutes().toString().padStart(2, "0");

    return `${year}${month}${day}T${hour}${minute}00Z`;
  } catch (error) {
    console.error("Error formatting date:", error);
    throw error;
  }
}

function sanitizeICSField(field: string): string {
  if (!field) return "";

  return field
    .replace(/[\\,;]/g, "\\$&")
    .replace(/\n/g, "\\n")
    .replace(/[\r\t]/g, "")
    .trim();
}

export function generateCalendarFile(event: Event): void {
  try {
    // Validate required event data. Note: Additional validation can be added if needed.
    if (
      !event?.name ||
      !event?.location ||
      !event?.sessions?.length ||
      !event?.date
    ) {
      throw new Error("Missing required event data");
    }

    const icsLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//MyEventApp//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
    ];

    // Create timestamp for DTSTAMP
    const now = new Date();
    const timestamp = formatToICSDate(
      `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`,
      now.toISOString(),
    );

    event.sessions.forEach((session: Session) => {
      // For non-network sessions, topic, startTime and endTime are required.
      // For network sessions, these fields are optional.
      if (session.room !== "Network") {
        if (!session.topic || !session.startTime || !session.endTime) {
          console.error(
            `Skipping session "${session.topic}" - missing required fields for non-network room.`,
          );
          return;
        }
      } else {
        // For network sessions, if any key field is missing, we choose to skip the event.
        if (!session.topic || !session.startTime || !session.endTime) {
          console.warn(
            `Skipping network session (speaker: ${session.speakerName}) due to missing fields.`,
          );
          return;
        }
      }

      try {
        const startDate = formatToICSDate(session.startTime, event.date);
        const endDate = formatToICSDate(session.endTime, event.date);

        // Use session.topic (or a default for UID) after removing non-alphanumeric characters
        const topicForUID = (session.topic || "network").replace(/\W+/g, "");

        icsLines.push("BEGIN:VEVENT");
        icsLines.push(
          `UID:${event.id}-${topicForUID}-${Date.now()}@myeventapp.com`,
        );
        icsLines.push(`DTSTAMP:${timestamp}`);
        icsLines.push(`DTSTART:${startDate}`);
        icsLines.push(`DTEND:${endDate}`);
        icsLines.push(
          `SUMMARY:${sanitizeICSField(session.topic || "Session")}`,
        );
        icsLines.push(
          `DESCRIPTION:${sanitizeICSField(
            `Konuşmacı: ${session.speakerName}\n\n${event.cardDescription || ""}`,
          )}`,
        );
        // Set event location based on session.room
        icsLines.push(`LOCATION:${sanitizeICSField(session.room)}`);
        // Add the GEO field from event.location to allow calendar apps to display a map.
        icsLines.push(
          `GEO:${event.location.latitude};${event.location.longitude}`,
        );
        icsLines.push("END:VEVENT");
      } catch (error) {
        console.error(
          `Error creating event for session: ${session.topic || "Session"}`,
          error,
        );
      }
    });

    icsLines.push("END:VCALENDAR");

    // Each line should end with CRLF as per RFC 5545
    const icsContent = icsLines.join("\r\n");

    // Create and save the file
    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });

    const fileName = `${event.name.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.ics`;
    saveAs(blob, fileName);
  } catch (error) {
    console.error("Failed to generate calendar file:", error);
    throw new Error("Failed to generate calendar file");
  }
}
