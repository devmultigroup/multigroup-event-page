"use client";

import { motion } from "framer-motion";
import Head from "next/head";
// import CountdownTimer from "@/components/countdown-timer";
import FAQ from "@/components/faq";
import Heading from "@/components/heading";
import SessionContainer from "@/components/session-container";
import Speakers from "@/components/speakers";
import { getClosestSession, getLatestEvent } from "@/lib/event-utils";
import SponsorSlider from "@/components/sponsors-slider";
import Sponsors from "@/components/sponsors";
import { useEffect, useState } from "react";
import WhyJoinSection from "@/components/why-join";
import DottedNav from "@/components/dotted-nav";

export default function Home() {
  const latestEventDetails = getLatestEvent();
  // const closestSessionDate = getClosestSession(latestEventDetails);

  const [minHeight, setMinHeight] = useState("100vh");

  if (!latestEventDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Etkinlik bulunamadı.</p>
      </div>
    );
  }

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

  // Animation Variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.15, // slightly faster than original
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

      {/* Background Section with black background and centered content */}
      <div
        id="hero"
        className="relative flex flex-col items-center justify-center px-6 sm:px-12 bg-black text-white"
        style={{ minHeight: "100vh" }}
      >
        {/* Main Title - Centered */}
        <motion.div
          className="select-none text-white text-4xl sm:text-6xl font-extrabold text-center max-w-3xl mx-auto mb-16 relative z-10"
          style={{ fontFamily: "Montserrat, sans-serif" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Participant info - hidden on mobile, shown above main text on larger screens */}
          <div className="hidden sm:block text-left mb-4">
            <span className="text-2xl"><span className="text-[#3682F1]">500+</span> Katılımcı <span className="text-[#3682F1]">10+</span> Konuşmacı</span>
          </div>
          
          GenAI Fundamentals
          <br />
          With{" "}
          <span className="bg-gradient-to-r from-[#3682F1] to-[#C55E85] bg-clip-text text-transparent">
            Gemini
          </span>
          
          {/* Participant info - shown on mobile below main text, hidden on larger screens */}
          <div className="block sm:hidden text-center mt-8">
            <div className="text-2xl"><span className="text-[#3682F1]">500+</span> Katılımcı</div>
            <div className="text-2xl"><span className="text-[#3682F1]">10+</span> Konuşmacı</div>
          </div>
        </motion.div>

        {/* Blue Diamond/Star Shape - adjust positioning here */}
        <motion.div
          className="absolute"
          style={{
            top: "35%", // moved a bit higher compared to 50%
            left: "70%", // moved a bit more to the right compared to 50%
            transform: "translate(-50%, 0%)", // horizontal centering while removing vertical translate
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <img
            src="/images/gemini-icon.svg"
            alt="Gemini Logo"
            className="w-124 sm:w-32 sm:h-32 md:w-40 md:h-40 rotate-[30deg] object-contain object-center max-w-full h-auto"
          />
        </motion.div>

        {/* <CountdownTimer targetDate={closestSessionDate} /> */}

        
        <motion.div
          className="absolute bottom-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="text-white text-sm opacity-80 text-center">
            3 Mart - 22 Nisan • Developer MultiGroup @ Youtube
          </div>
        </motion.div>
      </div>

      {/* <DottedNav 
        sections={[
          { id: "hero", label: "Ana Sayfa" },
          { id: "why-join", label: "Neden Katılmalı" },
          { id: "konuşmacılar", label: "Konuşmacılar" },
          { id: "takvim", label: "Takvim" },
          { id: "faq", label: "SSS" }
        ]}
      /> */}

      <SponsorSlider sponsors={latestEventDetails.sponsors} />

      <div className="bg-[#F2F4F0] pt-16">
        <span id="why-join" />
        <WhyJoinSection />

        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-16 max-w-6xl mx-auto w-5/6 xl:w-full">
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg font-bold">Kayıt Sayısı</p>
            <p className="text-3xl font-extrabold text-blue-600">500+</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg font-bold">Eğitmen Sayısı</p>
            <p className="text-3xl font-extrabold text-blue-600">10+</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg font-bold">Sponsor Sayısı</p>
            <p className="text-3xl font-extrabold text-blue-600">10+</p>
          </div>
        </div> */}

        <span id="konuşmacılar" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="min-h-screen lg:flex lg:flex-col lg:items-center"
        >
          <Heading dark>Konuşmacılar</Heading>
          <Speakers speakers={latestEventDetails.speakers} />
        </motion.div>

        <span id="takvim" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span id="yayınlar" />
          <Heading dark>Yayın Takvimi</Heading>
          <SessionContainer event={latestEventDetails} />
        </motion.div>

        <Sponsors sponsors={latestEventDetails.sponsors} />
      </div>

      <SponsorSlider reverse sponsors={latestEventDetails.sponsors} />

      <motion.div
        id="faq"
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
