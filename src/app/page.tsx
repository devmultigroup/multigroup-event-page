"use client";
import { motion } from "framer-motion";
import CountdownTimer from "@/components/countdown-timer";
import FAQ from "@/components/faq";
import Heading from "@/components/heading";
import SessionContainer from "@/components/session-container";
import SpeakerCarousel from "@/components/speaker-carousel";
import Location from "@/components/location";
import {
  getFormattedDate,
  getLatestEvent,
  getSecondLatestEvent,
} from "@/lib/event-utils";
import EventImageGallery from "@/components/event-image-gallery";
import SponsorSlider from "@/components/sponsors-slider";

export default function Home() {
  const latestEventDetails = getLatestEvent();
  const secondLatest = getSecondLatestEvent();

  if (!latestEventDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Etkinlik bulunamadı.</p>
      </div>
    );
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
          className="select-none absolute top-24 left-6 sm:top-32 sm:left-24 text-white text-4xl sm:text-6xl font-bold px-2 pt-8 max-w-lg sm:max-w-2xl leading-tight sm:leading-[64px] text-center sm:text-left"
          style={{ fontFamily: "TanNimbus" }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {latestEventDetails.name}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="select-none absolute bottom-16 sm:bottom-24 w-full px-6 sm:px-24 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Location */}
          <motion.div
            className="select-none text-white text-xl sm:text-4xl px-2 py-1 rounded-lg text-center sm:text-left w-full font-extrabold"
            style={{ fontFamily: "Montserrat" }}
            variants={fadeInUp}
          >
            <p>{getFormattedDate(latestEventDetails.date)}</p>
            <p>{latestEventDetails.location.name}</p>
          </motion.div>

          {/* Countdown */}
          <motion.div
            className="text-white text-lg sm:text-4xl px-2 py-1 rounded-lg text-center sm:text-right w-full font-extrabold"
            style={{ fontFamily: "Montserrat" }}
            variants={fadeInUp}
          >
            <CountdownTimer targetDate={latestEventDetails.date} />
          </motion.div>
        </motion.div>
      </div>

      <SponsorSlider sponsors={latestEventDetails.sponsors} />

      <motion.div
        className="text-center p-8 text-xl max-w-4xl m-auto grid grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Column */}
        <div className="space-y-6 my-auto">
          <div
            className="font-extrabold text-left"
            style={{ fontFamily: "Montserrat" }}
          >
            <p className="text-2xl italic">{latestEventDetails.title}</p>
            <p className="text-4xl">{latestEventDetails.subTitle}</p>
          </div>
          {/* New creative grid with stats */}
          <div className="grid grid-cols-3 gap-4 pt-12">
            <div className="bg-white shadow-md rounded-lg p-4">
              <p className="text-lg font-bold">Katılımcı Sayısı</p>
              <p className="text-3xl font-extrabold text-orange-500">1000+</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <p className="text-lg font-bold">Konuşmacı Sayısı</p>
              <p className="text-3xl font-extrabold text-orange-500">20</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <p className="text-lg font-bold">Sponsor Sayısı</p>
              <p className="text-3xl font-extrabold text-orange-500">10</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <p className="text-justify pt-4" style={{ whiteSpace: "pre-line" }}>
          {latestEventDetails.description}
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
        <SpeakerCarousel speakers={latestEventDetails.speakers} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Heading>Etkinlik Akışı</Heading>
        <SessionContainer event={latestEventDetails} />
      </motion.div>

      <SponsorSlider reverse sponsors={latestEventDetails.sponsors} />

      <span id="konum"></span>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        
        <Location location={latestEventDetails.location} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <EventImageGallery event={secondLatest} />
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
