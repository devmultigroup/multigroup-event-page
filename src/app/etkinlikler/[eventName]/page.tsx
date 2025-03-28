"use client";

import { motion } from "framer-motion";
import { use, useEffect, useState } from "react";
import Head from "next/head";
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
import Sponsors from "@/components/sponsors";
import { useEventColor } from "@/context/EventColorContext";

export default function EventPage({
  params: paramsPromise,
}: {
  params: Promise<{ eventName: string }>;
}) {
  const params = use(paramsPromise);
  const eventDetails: Event | null = getEventBySlug(params.eventName);
  const [minHeight, setMinHeight] = useState("100vh");
  const { setCurrentEvent } = useEventColor();

  if (!eventDetails) {
    notFound();
  }

  const latestEvent = getLatestEvent();

  if (!eventDetails || eventDetails.id === latestEvent.id) {
    notFound();
  }

  useEffect(() => {
    if (eventDetails) {
      setCurrentEvent(eventDetails);
    }
  }, [eventDetails])

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
    <>
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

      {/* Background Section with optimized Image */}
      <div
        className="relative flex items-center justify-center px-6 sm:px-12 bg-color-primary"
        style={{ minHeight }}
      >
        {/* Event Name (Top Left) */}
        <motion.div
          className="select-none absolute top-24 sm:top-32 lg:left-24 text-white text-4xl sm:text-6xl font-bold px-2 pt-8 max-w-lg sm:max-w-2xl leading-snug sm:leading-[64px] text-center lg:text-left"
          style={{ fontFamily: "TanNimbus, sans-serif" }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }} // removed extra delay for faster render
        >
          {eventDetails.name}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="select-none absolute bottom-16 lg:bottom-24 w-full px-6 lg:px-24 flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-8"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Location */}
          <motion.div
            className="select-none text-white text-xl sm:text-4xl px-2 py-1 rounded-lg text-center lg:text-left w-full font-extrabold"
            variants={fadeInUp}
          >
            <p>{getFormattedDate(eventDetails.date)}</p>
            <p>{eventDetails.location.name}</p>
          </motion.div>

          {/* Countdown */}
          <motion.div
            className="text-white text-lg sm:text-4xl px-2 py-1 rounded-lg text-center lg:text-right w-full font-extrabold"
            variants={fadeInUp}
          >
            <CountdownTimer targetDate={eventDetails.date} />
          </motion.div>
        </motion.div>
      </div>

      <SponsorSlider sponsors={eventDetails.sponsors} />

      <div className="bg-[#F2F4F0] pt-16">
        <motion.div
          className="text-center p-8 max-w-6xl sm:w-5/6 mx-auto flex flex-col gap-8 bg-gradient-to-b from-[#BDF5F2] to-[#A0E7E4] rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <h2 className="text-xl md:text-3xl italic text-gray-800">
              {eventDetails.title}
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight">
              {eventDetails.subTitle}
            </h3>
          </div>

          <div className="w-24 h-1 bg-gray-800 mx-auto"></div>

          <p
            className="text-md md:text-lg text-gray-700 leading-relaxed w-full md:w-2/3 mx-auto"
            style={{ whiteSpace: "pre-line" }}
          >
            {eventDetails.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-16 max-w-6xl mx-auto w-5/6 xl:w-full">
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg font-bold">Katılımcı Sayısı</p>
            <p className="text-3xl font-extrabold text-orange-600">1000+</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg font-bold">Konuşmacı Sayısı</p>
            <p className="text-3xl font-extrabold text-orange-600">20+</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg font-bold">Sponsor Sayısı</p>
            <p className="text-3xl font-extrabold text-orange-600">10+</p>
          </div>
        </div>

        <span id="konuşmacılar"></span>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Heading dark>Konuşmacılar</Heading>
          <SpeakerCarousel speakers={eventDetails.speakers} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Heading dark>Etkinlik Akışı</Heading>
          <SessionContainer event={eventDetails} />
        </motion.div>

        <Sponsors sponsors={eventDetails.sponsors} />
      </div>

      <SponsorSlider reverse sponsors={eventDetails.sponsors} />

      <div className="bg-gradient-to-b from-color-primary to-black">
        <span id="konum"></span>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Location location={eventDetails.location} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <EventImageGallery event={latestEvent} />
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
      </div>
    </>
  );
}
