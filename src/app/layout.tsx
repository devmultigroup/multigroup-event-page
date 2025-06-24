import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/navbar";
import { getLatestEventLink } from "@/lib/event-utils";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";
import { EventColorProvider } from "@/context/EventColorContext";
import Footer from "@/components/navigation/footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Developer MultiGroup",
  description:
    "Official event page of Developer MultiGroup where you can discover and attend insightful events every month! ",
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "Developer",
    "MultiGroup",
    "Developer MultiGroup",
    "DMG",
    "Etkinlik",
    "Yazılım",
    "Yazılım Etkinliği",
    "Topluluk",
    "Yazılım Topluluğu",
  ],
  // metadataBase: new URL("https://furkanunsalan.dev"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const latestEventLink = getLatestEventLink();
  console.log(latestEventLink ? latestEventLink : "boş");

  return (
    <html lang="en">
      <head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id={process.env.UMAMI_PROJECT_ID}
        ></Script>
      </head>
      <body className={`${montserrat.variable} bg-color-background`}>
        <EventColorProvider>
          <Navbar eventLink={latestEventLink} />
          {children}
          <Toaster />
          <Footer />
        </EventColorProvider>
      </body>
    </html>
  );
}
