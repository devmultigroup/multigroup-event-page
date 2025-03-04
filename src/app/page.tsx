"use client";

import { motion } from "framer-motion";
import Head from "next/head";
import CountdownTimer from "@/components/countdown-timer";
import FAQ from "@/components/faq";
import Heading from "@/components/heading";
import SessionContainer from "@/components/session-container";
import SpeakerCarousel from "@/components/speaker-carousel";
import {
  getClosestSession,
  getLatestEvent,
} from "@/lib/event-utils";
import SponsorSlider from "@/components/sponsors-slider";
import Sponsors from "@/components/sponsors";
import { useEffect, useState } from "react";

export default function Home() {
  const latestEventDetails = getLatestEvent();
  const closestSessionDate = getClosestSession(latestEventDetails)

  console.log(closestSessionDate);
  
  
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

      {/* Background Section with optimized Image */}
      <div
        className="relative flex items-center justify-center px-6 sm:px-12"
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
          GenAI Fundamentals with{" "}
          <span className="bg-gradient-to-r from-[#4794E5] to-[#C4687D] bg-clip-text text-transparent">
            Gemini
          </span>
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
            <p>3 Mart - 15 Nisan</p>
            <a href="https://youtube.com/@devmultigroup">
              <p>Developer MultiGroup @ Youtube</p>
            </a>
          </motion.div>

          {/* Countdown */}
          <motion.div
            className="text-white text-lg sm:text-4xl px-2 py-1 rounded-lg text-center lg:text-right w-full font-extrabold"
            variants={fadeInUp}
          >
            <CountdownTimer targetDate={closestSessionDate} />
          </motion.div>
        </motion.div>
      </div>

      <SponsorSlider sponsors={latestEventDetails.sponsors} />

      <div className="bg-[#F2F4F0] pt-16">
        <motion.div
          className="text-center p-8 max-w-6xl sm:w-5/6 mx-auto flex flex-col gap-8 bg-blue-200 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <h2 className="text-xl md:text-3xl italic text-gray-800">
              Generative AI Fundamentals with Gemini
            </h2>
          </div>

          <div className="w-24 h-1 bg-gray-800 mx-auto"></div>

          <p
            className="text-md md:text-lg text-gray-700 leading-relaxed w-full md:w-2/3 mx-auto text-left"
            style={{ whiteSpace: "pre-line" }}
          >
            Geleceğin yapay zeka teknolojilerine adım atmaya hazır mısın? 💡
            Tamamen ücretsiz ve online olarak gerçekleşecek Generative AI
            Fundamentals with Gemini bootcamp'inde, yapay zeka dünyasına güçlü
            bir giriş yapacak, Gemini ile üretken yapay zekanın temellerini
            öğreneceksin.
            <br/>
            <br/>
             🚀 Bu eğitimde: 
             <br/>
             ✅ Generative AI'nin temel
            kavramlarını keşfedeceksin. 
            <br/>
            ✅ Google Gemini'nin gücünü ve kullanım
            alanlarını öğreneceksin. 
            <br/>
            ✅ Gerçek dünya senaryoları ve
            uygulamalarla yetkinlik kazanacaksın. 
            <br/>
            ✅ Alanında uzman global
            konuşmacılardan ilham alacaksın. 
            <br/>
            <br/>
            Eğitim sonunda katılım sertifikası
            ve başarılı olanlara başarım sertifikası verilecektir. 🌟 Yeni
            teknolojilere hakim olmak ve yapay zeka ile geleceği şekillendirmek
            için bu fırsatı kaçırma!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-16 max-w-6xl mx-auto w-5/6 xl:w-full">
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg font-bold">Katılımcı Sayısı</p>
            <p className="text-3xl font-extrabold text-blue-600">1000+</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg font-bold">Konuşmacı Sayısı</p>
            <p className="text-3xl font-extrabold text-blue-600">20+</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg font-bold">Sponsor Sayısı</p>
            <p className="text-3xl font-extrabold text-blue-600">10+</p>
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
          <SpeakerCarousel speakers={latestEventDetails.speakers} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Heading dark>Yayın Takvimi</Heading>
          <SessionContainer event={latestEventDetails} />
        </motion.div>

        <Sponsors sponsors={latestEventDetails.sponsors} />
      </div>

      <SponsorSlider reverse sponsors={latestEventDetails.sponsors} />

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
