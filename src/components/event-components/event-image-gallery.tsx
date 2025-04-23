import { Event } from "@/types";
import React from "react";
import Image from "next/image";
import Heading from "@/components/common/heading";
import { slugify } from "@/lib/slugify";

interface EventImageGalleryProps {
  event: Event;
  heading?: string;
}

const EventImageGallery: React.FC<EventImageGalleryProps> = ({
  event,
  heading,
}) => {
  return (
    <>
      {heading ? (
        <Heading>{heading}</Heading>
      ) : (
        <Heading>
          <a
            className="underline hover:opacity-80 ease-in-out transition-all leading-normal"
            href={`/etkinlikler/${slugify(event.name)}`}
          >
            {event.name}
          </a>{" "}
          Nasıldı?
        </Heading>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto md:w-5/6 max-w-6xl px-4 md:px-0">
        {event.images.map((image, index) => (
          <div key={index} className="flex justify-center relative h-60">
            <Image
              src={image}
              alt={`${event.name} - Image ${index + 1}`}
              width={480}
              height={240}
              className="object-cover rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default EventImageGallery;
