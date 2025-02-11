'use client';

import { useEffect, useState } from 'react';
import { LinkedinLogo, InstagramLogo, TwitterLogo, YoutubeLogo, ArrowUp } from "@phosphor-icons/react";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="relative bg-zinc-900 text-white py-6 px-4 md:px-12 flex flex-col items-center justify-center min-h-40">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl">
        <div className="flex items-center gap-3">
          <Image src="/dmg-logo.png" alt="MultiGroup Logo" width={200} height={200} />
          
        </div>
        <nav className="mt-4 md:mt-0 flex gap-6 text-sm">
          <Link href="/#konusmacilar" className="hover:text-gray-400">Konuşmacılar</Link>
          <Link href="/#etkinlik-akisi" className="hover:text-gray-400">Etkinlik Akışı</Link>
          <Link href="/etkinlikler" className="hover:text-gray-400">Önceki Etkinlikler</Link>
        </nav>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="https://instagram.com/devmultigroup" target="_blank">
            <InstagramLogo className="text-xl text-pink-500 hover:text-pink-400" />
          </Link>
          <Link href="https://x.com/devmultigroup" target="_blank">
            <TwitterLogo className="text-xl text-gray-400 hover:text-gray-300" />
          </Link>
          <Link href="https://www.youtube.com/@devmultigroup" target="_blank">
            <YoutubeLogo className="text-xl text-red-600 hover:text-red-500" />
          </Link>
          <Link href="https://www.linkedin.com/company/devmultigroup/posts/?feedView=all" target="_blank">
            <LinkedinLogo className="text-xl text-blue-600 hover:text-blue-500" />
          </Link>
        </div>
      </div>
      {showButton && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-400 transition"
        >
          <ArrowUp/>
        </motion.button>
      )}
    </footer>
  );
}