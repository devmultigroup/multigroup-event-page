"use client";

import { useEffect, useState } from "react";
import {
  LinkedinLogo,
  InstagramLogo,
  XLogo,
  YoutubeLogo,
  ArrowUp,
  GithubLogo,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import FloatingActionButton from "./floating-action-button";

export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="relative text-white py-6 px-2 md:px-12 flex flex-col items-center justify-center min-h-60 bg-black">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-5xl">
        <div className="flex items-center gap-3">
          <Image
            src="/dmg-logo.webp"
            alt="MultiGroup Logo"
            width={200}
            height={200}
          />
        </div>
        <nav className="mt-4 lg:mt-0 flex flex-col md:flex-row gap-6 text-sm items-center justify-center w-full text-center align-middle">
          <Link
            aria-label="Konuşmacılar sayfası"
            href="#konusmacilar"
            className="hover:text-gray-400"
          >
            Konuşmacılar
          </Link>
          <Link
            aria-label="Etkinlik akışı"
            href="#etkinlik-akisi"
            className="hover:text-gray-400"
          >
            Etkinlik Akışı
          </Link>
          <Link
            aria-label="Önceki etkinlikler sayfası"
            href="/etkinlikler"
            className="hover:text-gray-400"
          >
            Önceki Etkinlikler
          </Link>
        </nav>
        <div className="flex gap-4 mt-4 lg:mt-0">
          <Link
            aria-label="DMG Instagram Hesabı"
            href="https://instagram.com/devmultigroup"
            target="_blank"
          >
            <InstagramLogo className="text-xl text-pink-500 hover:text-pink-400" />
          </Link>
          <Link
            aria-label="DMG X Hesabı"
            href="https://x.com/devmultigroup"
            target="_blank"
          >
            <XLogo className="text-xl text-white hover:text-gray-300" />
          </Link>
          <Link
            aria-label="DMG Youtube Hesabı"
            href="https://www.youtube.com/@devmultigroup"
            target="_blank"
          >
            <YoutubeLogo className="text-xl text-red-600 hover:text-red-500" />
          </Link>
          <Link
            aria-label="DMG Linkedin Hesabı"
            href="https://www.linkedin.com/company/devmultigroup/posts/?feedView=all"
            target="_blank"
          >
            <LinkedinLogo className="text-xl text-blue-600 hover:text-blue-500" />
          </Link>
          <Link
            aria-label="DMG Github Hesabı"
            href="https://github.com/Developer-MultiGroup"
            target="_blank"
          >
            <GithubLogo className="text-xl text-white hover:text-gray-300" />
          </Link>
        </div>
      </div>
      <FloatingActionButton alwaysShow={false} />
    </footer>
  );
}
