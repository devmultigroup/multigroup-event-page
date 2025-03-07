import { saveAs } from "file-saver";
import type { Speaker, Session, Sponsor, Event } from "@/types";

// Helper function to format date-time to ICS format.
// Expected timeString format: "HH:mm". The baseDate is taken from each session.
function formatToICSDate(timeString: string, baseDate: string): string {
  try {
    const baseDateObj = new Date(baseDate);
    if (isNaN(baseDateObj.getTime())) {
      throw new Error("Invalid base date");
    }

    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date(baseDateObj);
    date.setHours(hours, minutes, 0, 0);

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

// Removes unwanted characters from ICS fields.
function sanitizeICSField(field: string): string {
  if (!field) return "";
  return field
    .replace(/[\\,;]/g, "\\$&")
    .replace(/\n/g, "\\n")
    .replace(/[\r\t]/g, "")
    .trim();
}

// Generates and downloads the ICS calendar file using the new types.
// The event contains speakers, sessions, and sponsors.
// The fixed location is "YouTube" and a specific link is appended to the description.
export function generateCalendarFile(event: Event): void {
  try {
    if (!event?.sessions?.length) {
      throw new Error("Missing required event sessions");
    }

    const icsLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//MyEventApp//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
    ];

    const now = new Date();
    const timestamp = formatToICSDate(
      `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`,
      now.toISOString()
    );

    event.sessions.forEach((session: Session) => {
      if (
        !session.topic ||
        !session.startTime ||
        !session.endTime ||
        !session.date
      ) {
        console.error(
          `Skipping session "${session.topic}" - missing required fields.`
        );
        return;
      }

      try {
        const startDate = formatToICSDate(session.startTime, session.date);
        const endDate = formatToICSDate(session.endTime, session.date);
        const topicForUID = session.topic.replace(/\W+/g, "");

        icsLines.push("BEGIN:VEVENT");
        icsLines.push(`UID:${topicForUID}-${Date.now()}@myeventapp.com`);
        icsLines.push(`DTSTAMP:${timestamp}`);
        icsLines.push(`DTSTART:${startDate}`);
        icsLines.push(`DTEND:${endDate}`);
        icsLines.push(`SUMMARY:${sanitizeICSField(session.topic)}`);

        // Append the YouTube link after the speaker info.
        const descriptionContent = `Konuşmacı: ${session.speakerName}\nLink: ${session.url ? session.url : "https://youtube.com/@devmultigroup"}`;
        icsLines.push(`DESCRIPTION:${sanitizeICSField(descriptionContent)}`);
        icsLines.push(`LOCATION:${sanitizeICSField("YouTube")}`);
        icsLines.push("END:VEVENT");
      } catch (error) {
        console.error(
          `Error creating event for session: ${session.topic}`,
          error
        );
      }
    });

    icsLines.push("END:VCALENDAR");

    const icsContent = icsLines.join("\r\n");

    const fileName =
      event.sessions.length > 1
        ? "dmg-genai-bootcamp-schedule.ics"
        : `${event.sessions[0].topic
            .replace(/[^a-z0-9]/gi, "_")
            .toLowerCase()}.ics`;

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    saveAs(blob, fileName);
  } catch (error) {
    console.error("Failed to generate calendar file:", error);
    throw new Error("Failed to generate calendar file");
  }
}
