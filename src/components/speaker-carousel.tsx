"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Speaker } from "@/types";
import { slugify } from "@/lib/slugify";
import Image from "next/image";

interface SpeakerCarouselProps {
  speakers: Speaker[];
}

const SpeakerCarousel: React.FC<SpeakerCarouselProps> = ({ speakers }) => {
  return (
    <section className="max-w-6xl mx-auto md:px-0 px-4">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {speakers.map((speaker) => (
          <Card
            key={speaker.fullName}
            className="hover:shadow-lg hover:-translate-y-1 transition-all h-full"
          >
            <CardContent
              className={`p-4 flex flex-col text-center h-full ${
                !speaker.phrase ? "justify-center items-center" : "items-center"
              }`}
            >
              <div className="relative w-24 h-24 mb-3">
                <Image
                  src={`/images/speakers/${slugify(speaker.fullName)}.jpg`}
                  alt={speaker.fullName}
                  className="rounded-full object-cover"
                  
                  width={96}
                  height={96}
                  loading="lazy"
                />
              </div>
              <h3 className="text-lg font-semibold">{speaker.fullName}</h3>
              <p className="text-sm text-gray-500">{speaker.title}</p>
              {speaker.phrase && (
                <p className="text-sm pt-2 text-gray-500">{speaker.phrase}</p>
              )}
              <div className="mt-auto" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default SpeakerCarousel;
