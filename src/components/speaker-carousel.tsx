"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Speaker } from "@/types";
import { slugify } from "@/lib/slugify";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface SpeakerCarouselProps {
  speakers: Speaker[];
}

const SpeakerCarousel: React.FC<SpeakerCarouselProps> = ({ speakers }) => {
  const isScrollable = speakers.length > 3; // Default for large screens

  return (
    <Carousel
      className="select-none w-full max-w-4xl mx-auto relative mb-8"
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnMouseEnter: true,
          stopOnInteraction: false,
        }),
      ]}
      opts={{
        align: "start",
        loop: isScrollable, // Disable loop if not scrollable
      }}
    >
      <CarouselContent
        className={`backface-hidden -ml-4 flex ${
          (speakers.length < 3 && "lg:justify-center") ||
          (speakers.length < 2 && "md:justify-center") ||
          "justify-start"
        }`}
      >
        {speakers.map((speaker) => (
          <CarouselItem
            key={speaker.fullName}
            className="p-4 pl-8 
              basis-full 
              sm:basis-1/2 
              lg:basis-1/3"
          >
            <Card className="hover:shadow-md hover:-translate-y-2 transition-all h-full">
              <CardContent
                className={`p-4 flex flex-col text-center h-full ${
                  !speaker.phrase
                    ? "justify-center items-center"
                    : "items-center"
                }`}
              >
                <img
                  src={`/images/speakers/${slugify(speaker.fullName)}.jpg`}
                  alt={speaker.fullName}
                  className="w-24 h-24 rounded-full object-cover mb-3"
                />

                {/* When there is no phrase, the content is centered */}
                {speaker.phrase ? (
                  <>
                    <h3 className="text-lg font-semibold">
                      {speaker.fullName}
                    </h3>
                    <p className="text-sm text-gray-500">{speaker.title}</p>
                    <p className="text-sm pt-2 text-gray-500">
                      {speaker.phrase}
                    </p>
                    <div className="mt-auto" />
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold">
                      {speaker.fullName}
                    </h3>
                    <p className="text-sm text-gray-500">{speaker.title}</p>
                  </>
                )}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Hide buttons if the carousel is not scrollable */}
      {isScrollable && (
        <>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </>
      )}
    </Carousel>
  );
};

export default SpeakerCarousel;
