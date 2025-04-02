"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Head from "next/head";
import type { Event } from "@/types";
import CountdownTimer from "@/components/countdown-timer";
import FAQ from "@/components/faq";
import Heading from "@/components/heading";
import SessionContainer from "@/components/session-container";
import SpeakerCarousel from "@/components/speaker-carousel";
import Location from "@/components/location";
import {
  getFormattedDate,
} from "@/lib/event-utils";
import MetricsGrid from "@/components/metrics-grid";
import EventImageGallery from "@/components/event-image-gallery";
import SponsorSlider from "@/components/sponsors-slider";
import Sponsors from "@/components/sponsors";

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
        className="relative flex items-center justify-center px-6 sm:px-12 bg-gradient-to-b from-color-primary to-color-secondary"
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
          {event.name}
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
            <p>{getFormattedDate(event.date)}</p>
            <p>{event.location.name}</p>
          </motion.div>

          {/* Countdown */}
          <motion.div
            className="text-white text-lg sm:text-4xl px-2 py-1 rounded-lg text-center lg:text-right w-full font-extrabold"
            variants={fadeInUp}
          >
            <CountdownTimer targetDate={event.date} />
          </motion.div>
        </motion.div>
      </div>

      <SponsorSlider sponsors={event.sponsors} />

      <div className="bg-[#F2F4F0] pt-16">
        {hero == false && <MetricsGrid afterMetrics={event.afterMetrics} />}
        <motion.div
          className="text-center p-8 max-w-6xl sm:w-5/6 mx-auto flex flex-col gap-8 bg-color-tertiary rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <h2 className="text-xl md:text-3xl italic text-gray-800">
              {event.title}
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight">
              {event.subTitle}
            </h3>
          </div>

          <div className="w-24 h-1 bg-gray-800 mx-auto"></div>

          <p
            className="text-md md:text-lg text-gray-700 leading-relaxed w-full md:w-2/3 mx-auto"
            style={{ whiteSpace: "pre-line" }}
          >
            {event.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-16 max-w-6xl mx-auto w-5/6 xl:w-full">
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg font-bold">Katılımcı Sayısı</p>
            <p className="text-3xl font-extrabold text-color-tertiary">1000+</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg font-bold">Konuşmacı Sayısı</p>
            <p className="text-3xl font-extrabold text-color-tertiary">20+</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg font-bold">Sponsor Sayısı</p>
            <p className="text-3xl font-extrabold text-color-tertiary">10+</p>
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
          <SpeakerCarousel speakers={event.speakers} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Heading dark>Etkinlik Akışı</Heading>
          <SessionContainer event={event} />
        </motion.div>

        <Sponsors sponsors={event.sponsors} />
      </div>

      <SponsorSlider sponsors={event.sponsors} />

      <div className="bg-gradient-to-b from-color-primary to-black">
        <span id="konum"></span>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Location location={event.location} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {hero ? <EventImageGallery event={previousEvent} /> : <EventImageGallery event={event} heading="Etkinlikten Kareler" />}
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
