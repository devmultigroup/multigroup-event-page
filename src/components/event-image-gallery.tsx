import { slugify } from "@/lib/slugify";
import { Event } from "@/types";
import React from "react";
import Heading from "./heading";

interface EventImageGalleryProps {
  event: Event;
  heading?: string;
}

const EventImageGallery: React.FC<EventImageGalleryProps> = ({
  event,
  heading,
}) => {
  const slug = slugify(event.name);
  const images = [
    `/images/events/${slug}/1.jpg`,
    `/images/events/${slug}/2.jpg`,
    `/images/events/${slug}/3.jpg`,
  ];

  return (
    <>
      {heading ? (
        <Heading> {heading} </Heading>
      ) : (
        <Heading>
          <a
            className="underline hover:text-orange-500 hover:italic ease-in-out transition-all"
            href={`/etkinlikler/${slug}`}
          >
            {event.name}
          </a>{" "}
          Nasıldı?
        </Heading>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto max-w-4xl px-8 md:px-0">
        {images.map((image, index) => (
          <div key={index} className="flex justify-center">
            <img
              src={image}
              alt={`Event ${index + 1}`}
              className="w-full h-60 object-cover rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default EventImageGallery;
