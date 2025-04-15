// pages/api/og.tsx (for Pages Router)
// or app/api/og/route.tsx (for App Router)
// test for now via http://localhost:3000/api/og?name=Summer%20Music%20Festival&location=Central%20Park%2C%20New%20York&color=%23FF5733&time=13.00

import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

// For App Router
export async function GET(req: NextRequest) {
  // For Pages Router
  // export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Get data from URL parameters
    const eventName = searchParams.get("name") || "Event Name";
    const locationName = searchParams.get("location") || "Location";
    const eventTime = searchParams.get("time") || "Event Time";
    const primaryColor = searchParams.get("color") || "#3b82f6";
    const imageUrl = searchParams.get("image") || "";

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: primaryColor,
            position: "relative",
          }}
        >
          {/* Event Name - Top Left */}
          <div
            style={{
              position: "absolute",
              top: 60,
              left: 60,
              fontSize: 60,
              fontWeight: "bold",
              color: "white",
              maxWidth: "70%",
              wordWrap: "break-word",
            }}
          >
            {eventName}
          </div>

          {/* Location - Bottom Left */}
          <div
            style={{
              position: "absolute",
              bottom: 60,
              left: 60,
              fontSize: 32,
              color: "white",
            }}
          >
            {locationName}
          </div>

          <div
            style={{
              position: "absolute",
              top: 60,
              right: 60,
              fontSize: 32,
              color: "white",
            }}
          >
            {eventTime}
          </div>

          {/* Image - Bottom Right */}
          {imageUrl && (
            <img
              src={imageUrl}
              style={{
                position: "absolute",
                bottom: 60,
                right: 60,
                width: 200,
                height: 200,
                objectFit: "cover",
                borderRadius: 8,
              }}
              alt="Event image"
            />
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.error(`Error generating OG image: ${e.message}`);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
