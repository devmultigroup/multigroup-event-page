"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Head from "next/head";
import type { Event } from "@/types";
import CountdownTimer from "@/components/countdown-timer";
// import FAQ from "@/components/faq";
import Heading from "@/components/heading";
import SessionContainer from "@/components/session-container";
import SpeakerCarousel from "@/components/speaker-carousel";
// import Location from "@/components/location";
import { getFormattedDate } from "@/lib/event-utils";
// import MetricsGrid from "@/components/metrics-grid";
// import EventImageGallery from "@/components/event-image-gallery";
import SponsorSlider from "@/components/sponsors-slider";
import { AnimatedTooltip } from "../ui/animated-tooltip";
// import Sponsors from "@/components/sponsors";
// import EventBadge from "../event-badge";

interface EventPageProps {
  event: Event;
  previousEvent: Event;
  hero: boolean;
}

export default function EventPage({
  event,
  previousEvent,
  hero,
}: EventPageProps) {
  const [minHeight, setMinHeight] = useState("100vh");

  useEffect(() => {
    const updateMinHeight = () => {
      const screenHeight = window.innerHeight;
      if (screenHeight < 700) {
        setMinHeight("600px");
      } else {
        setMinHeight("100vh");
      }
    };

    updateMinHeight();
    window.addEventListener("resize", updateMinHeight);
    return () => window.removeEventListener("resize", updateMinHeight);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div className="bg-color-background">
      <Head>
        {/* Preload key fonts */}
        <link
          rel="preload"
          href="/fonts/TanNimbus.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>

      {/* Hero Section */}
      <div
        className="relative flex items-center justify-center px-6 sm:px-12 bg-color-background"
        style={{ minHeight }}
      >
        {/* <EventBadge /> */}
        {/* Event Name (Top Left) */}
        <motion.div
          className="select-none absolute top-24 sm:top-32 lg:left-24 text-color-text text-4xl sm:text-6xl font-extrabold px-2 pt-8 max-w-lg sm:max-w-2xl leading-snug sm:leading-[64px] text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }} // removed extra delay for faster render
        >
          {event.name}
          <div className="text-xl font-normal pt-12">
            {event.heroDescription}
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="select-none absolute bottom-16 lg:bottom-24 w-full px-6 lg:px-24 flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-8"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Initial Metrics */}
          <motion.div
            className="select-none text-color-text text-xl sm:text-4xl px-2 py-1 rounded-lg text-center lg:text-left w-full font-extrabold"
            variants={fadeInUp}
          >
            <p>{getFormattedDate(event.date)}</p>
            <p>{event.location.name}</p>
          </motion.div>

          {/* Organizers */}
          <motion.div
            className="text-color-text text-lg sm:text-4xl px-2 py-1 rounded-lg text-center lg:text-right w-full font-extrabold"
            variants={fadeInUp}
          >
            {/* <AnimatedTooltip items={event.organizers} /> */}
          </motion.div>
        </motion.div>
      </div>

      <p className="text-center w-2/3 mx-auto md:w-full bg-color-background text-lg md:text-2xl font-semibold">
        Sektörün önde gelen şirketleri bu etkinlikte yerlerini aldı
      </p>
      <SponsorSlider sponsors={event.sponsors} />

      <div className="bg-color-background pt-16">
        <span id="konusmacilar"></span>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Heading dark>Konuşmacılar</Heading>
          <SpeakerCarousel speakers={event.speakers} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span id="etkinlik-akisi" />
          <Heading dark>Etkinlik Akışı</Heading>
          <SessionContainer event={event} color={event.colorPalette.primary} />
        </motion.div>
      </div>
    </div>
  );
}
