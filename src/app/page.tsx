"use client";

import { motion } from "framer-motion";
import Head from "next/head";
import CountdownTimer from "@/components/countdown-timer";
import FAQ from "@/components/faq";
import Heading from "@/components/heading";
import SessionContainer from "@/components/session-container";
import Speakers from "@/components/speakers";
import { getClosestSession, getLatestEvent } from "@/lib/event-utils";
import SponsorSlider from "@/components/sponsors-slider";
import Sponsors from "@/components/sponsors";
import { useEffect, useState } from "react";

export default function Home() {
  const latestEventDetails = getLatestEvent();
  const closestSessionDate = getClosestSession(latestEventDetails);
  console.log(closestSessionDate);
  

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

      {/* Background Section with black background and centered content */}
      <div
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
          GenAI Fundamentals
          <br />
          With{" "}
          <span className="bg-gradient-to-r from-[#4794E5] to-[#C4687D] bg-clip-text text-transparent">
            Gemini
          </span>
        </motion.div>

        {/* Blue Diamond/Star Shape - adjust positioning here */}
        <motion.div
          className="absolute"
          style={{
            top: "30%", // moved a bit higher compared to 50%
            left: "65%", // moved a bit more to the right compared to 50%
            transform: "translate(-50%, 0%)", // horizontal centering while removing vertical translate
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <img
            src="/images/gemini-icon.svg"
            alt="Gemini Logo"
            className="w-48 sm:w-32 sm:h-32 md:w-40 md:h-40 rotate-[30deg] object-contain object-center max-w-full h-auto"
          />
        </motion.div>

        <CountdownTimer targetDate={closestSessionDate} />

        {/* MultiGroup Logo at Bottom */}
        <motion.div
          className="absolute bottom-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="text-white text-sm opacity-80 text-center">
            3 Mart - 15 Nisan • Developer MultiGroup @ Youtube
          </div>
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
            <br />
            <br />
            🚀 Bu eğitimde:
            <br />
            ✅ Generative AI'nin temel kavramlarını keşfedeceksin.
            <br />
            ✅ Google Gemini'nin gücünü ve kullanım alanlarını öğreneceksin.
            <br />
            ✅ Gerçek dünya senaryoları ve uygulamalarla yetkinlik kazanacaksın.
            <br />
            ✅ Alanında uzman global konuşmacılardan ilham alacaksın.
            <br />
            <br />
            Eğitim sonunda katılım sertifikası ve başarılı olanlara başarım
            sertifikası verilecektir. 🌟 Yeni teknolojilere hakim olmak ve yapay
            zeka ile geleceği şekillendirmek için bu fırsatı kaçırma!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-16 max-w-6xl mx-auto w-5/6 xl:w-full">
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
        </div>

        <span id="konuşmacılar" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
