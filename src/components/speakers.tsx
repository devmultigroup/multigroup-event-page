"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Speaker } from "@/types";
import { slugify } from "@/lib/slugify";
import Image from "next/image";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

interface SpeakerCarouselProps {
  speakers: Speaker[];
}

const Speakers: React.FC<SpeakerCarouselProps> = ({ speakers }) => {
  // State to track which cards are flipped on mobile
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Toggle flip state for mobile devices
  const handleCardClick = (speakerName: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [speakerName]: !prev[speakerName]
    }));
  };

  return (
    <section className="max-w-6xl sm:w-5/6 mx-auto md:px-0 px-4">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {speakers.map((speaker) => (
          <div 
            key={speaker.fullName}
            className={`h-[250px] cursor-pointer group [perspective:1000px] ${
              flippedCards[speaker.fullName] ? 'flip-active' : ''
            }`}
            onClick={() => handleCardClick(speaker.fullName)}
          >
            <div className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
              flippedCards[speaker.fullName] ? '[transform:rotateY(180deg)]' : ''
            } group-hover:[transform:rotateY(180deg)]`}>
              {/* Front Side */}
              <Card className="absolute w-full h-full overflow-hidden [backface-visibility:hidden]">
                <div className="relative w-full h-full">
                  <Image
                    src={`/images/speakers/${slugify(speaker.fullName)}.webp`}
                    alt={speaker.fullName}
                    className="object-cover"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    loading="lazy"
                  />
                </div>
              </Card>
              
              {/* Back Side */}
              <Card className="absolute w-full h-full flex flex-col items-center justify-center p-4 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <h3 className="text-lg font-semibold text-center mb-2">{speaker.fullName}</h3>
                <p className="text-sm text-gray-500 text-center mb-4">{speaker.title}</p>
                
                {/* Social Media Icons */}
                <div className="flex space-x-3 mb-4">
                  {speaker.instagram && (
                    <a 
                      href={speaker.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-pink-600 hover:text-pink-700 transition-colors"
                    >
                      <FaInstagram size={20} />
                    </a>
                  )}
                  
                  {speaker.linkedin && (
                    <a 
                      href={speaker.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  )}
                  
                  {speaker.twitter && (
                    <a 
                      href={speaker.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-blue-400 hover:text-blue-500 transition-colors"
                    >
                      <FaTwitter size={20} />
                    </a>
                  )}
                </div>
                
                {/* Company Logo */}
                {speaker.company && (
                  <div className="relative mt-auto mb-0 w-1/2 h-1/2">
                    <Image
                      src={`/images/sponsors/${slugify(speaker.company)}.webp`}
                      alt={`${speaker.company} logo`}
                      className="object-contain"
                      fill
                      sizes="64px"
                      loading="lazy"
                    />
                  </div>
                )}
              </Card>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Speakers;