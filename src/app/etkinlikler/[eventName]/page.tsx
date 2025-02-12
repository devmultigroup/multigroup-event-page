"use client";

import { motion } from "framer-motion";
import { use } from "react";
import type { Event } from "@/types";
import { notFound } from "next/navigation";
import CountdownTimer from "@/components/countdown-timer";
import FAQ from "@/components/faq";
import Heading from "@/components/heading";
import SessionContainer from "@/components/session-container";
import SpeakerCarousel from "@/components/speaker-carousel";
import Location from "@/components/location";
import {
  getFormattedDate,
  getEventBySlug,
  getLatestEvent,
} from "@/lib/event-utils";
import MetricsGrid from "@/components/metrics-grid";
import EventImageGallery from "@/components/event-image-gallery";
import SponsorSlider from "@/components/sponsors-slider";

export default function EventPage({
  params: paramsPromise,
}: {
  params: Promise<{ eventName: string }>;
}) {
  const params = use(paramsPromise);
  const eventDetails: Event | null = getEventBySlug(params.eventName);

  if (!eventDetails) {
    notFound();
  }

  const latestEvent = getLatestEvent();

  if (!eventDetails || eventDetails.id === latestEvent.id) {
    notFound();
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <>
      <div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-6 sm:px-12"
        style={{ backgroundImage: `url('/dmg-main-bg.png')` }}
      >
        {/* Event Name (Top Left) */}
        <motion.div
          className="absolute top-24 left-6 sm:top-32 sm:left-24 text-white text-4xl sm:text-6xl font-bold px-2 pt-8 max-w-lg sm:max-w-2xl leading-tight sm:leading-[64px] text-center sm:text-left"
          style={{ fontFamily: "TanNimbus" }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {eventDetails.name}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="absolute bottom-16 sm:bottom-24 w-full px-6 sm:px-24 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Location */}
          <motion.div
            className="text-white text-lg sm:text-xl px-2 py-1 rounded-lg text-center sm:text-left w-full"
            style={{ fontFamily: "TanNimbus" }}
            variants={fadeInUp}
          >
            <p>{getFormattedDate(eventDetails.date)}</p>
            <p>{eventDetails.location.name}</p>
          </motion.div>

          {/* Countdown */}
          <motion.div
            className="text-white text-lg sm:text-xl px-2 py-1 rounded-lg text-center sm:text-right w-full"
            style={{ fontFamily: "TanNimbus" }}
            variants={fadeInUp}
          >
            <CountdownTimer targetDate={eventDetails.date} />
          </motion.div>
        </motion.div>
      </div>

      <SponsorSlider sponsors={eventDetails.sponsors} />

      {eventDetails.afterMetrics && (
        <MetricsGrid afterMetrics={eventDetails.afterMetrics} />
      )}

      <motion.div
        className="text-center p-8 text-xl max-w-lg m-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-2xl font-bold italic">{eventDetails.title}</p>
        <p className="text-4xl">{eventDetails.subTitle}</p>
        <p className="text-justify pt-4" style={{ whiteSpace: "pre-line" }}>
          {eventDetails.description}
        </p>
      </motion.div>

      <span id="konuşmacılar"></span>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Heading>Konuşmacılar</Heading>
        <SpeakerCarousel speakers={eventDetails.speakers} />
      </motion.div>

      <SponsorSlider reverse sponsors={eventDetails.sponsors} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Heading>Etkinlik Akışı</Heading>
        <SessionContainer event={eventDetails} />
      </motion.div>

      <span id="konum"></span>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Heading>Konum</Heading>
        <Location location={eventDetails.location} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <EventImageGallery event={eventDetails} heading="Etkinlikten Kareler" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Heading className="pt-16">Sıkça Sorulan Sorular</Heading>
        <FAQ />
      </motion.div>
    </>
  );
}
