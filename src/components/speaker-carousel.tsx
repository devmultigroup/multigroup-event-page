"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Speaker } from "@/types";

interface SpeakerCarouselProps {
  speakers: Speaker[];
}

const SpeakerCarousel: React.FC<SpeakerCarouselProps> = ({ speakers }) => {
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      slidesToScroll: 1
    },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );

  // Group speakers into sets of 6
  const slides = [];
  for (let i = 0; i < speakers.length; i += 6) {
    slides.push(speakers.slice(i, i + 6));
  }

  return (
    <Carousel className="w-full max-w-6xl mx-auto relative mb-4" ref={emblaRef}>
      <CarouselContent className="backface-hidden -ml-4">
        {slides.map((group, groupIndex) => (
          <CarouselItem key={groupIndex} className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {group.map((speaker) => (
                <Card key={speaker.fullName}>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <img
                      src={`/api/placeholder/200/200`}
                      alt={speaker.fullName}
                      className="w-24 h-24 rounded-full object-cover mb-3"
                    />
                    <h3 className="text-lg font-semibold">{speaker.fullName}</h3>
                    <p className="text-sm text-gray-500">{speaker.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
};

export default SpeakerCarousel;