import React from "react";
import Link from "next/link"; // Remove if not using Next.js
import { Button } from "../ui/button";

type Variant = "right-image" | "left-image";

type ActionCardProps = {
  variant: Variant;
  name?: string; // Used for right-image
  description?: string; // Used for right-image
  title?: string; // Used for left-image
  buttonLabel?: string; // Used for left-image
  buttonLink?: string; // Used for left-image
  image?: string; // JSX image element or component
};

const ActionCard: React.FC<ActionCardProps> = ({
  variant,
  name,
  description,
  title,
  buttonLabel,
  buttonLink,
  image,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <section className="w-5/6 2xl:w-2/3 mx-auto flex flex-col lg:flex-row items-center justify-between bg-[#f3f1fc] rounded-3xl px-6 lg:px-12">
      {variant === "right-image" ? (
        <>
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 lg:pt-0 pt-8">
              {name} Yaklaşıyor!
            </h2>
            <p className="text-gray-700 text-base lg:text-lg">{description}</p>
            <div className="flex justify-center lg:justify-start space-x-4 pt-2">
              <span className="text-lg font-bold text-[#4d002f]">
                {currentYear}
              </span>
              <span className="text-lg font-semibold text-gray-400">
                {currentYear - 1}
              </span>
              <span className="text-lg font-semibold text-gray-300">
                {currentYear - 2}
              </span>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 pt-6 lg:pt-12">
            <img
              src={image}
              alt="Image"
              className="w-2/3 md:w-1/2 h-auto bottom-0 rounded-md mx-auto"
            />
          </div>
        </>
      ) : (
        <>
          <div className="w-full lg:w-1/2 mt-0 order-first flex items-start justify-center pb-6 lg:pb-12">
            <img
              src={image}
              alt="Image"
              className="w-2/3 md:w-1/2 mx-auto h-auto rounded-md"
            />
          </div>
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4 p-6 lg:p-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {title}
            </h2>
            <p className="text-gray-700 text-base lg:text-lg">{description}</p>
            {buttonLabel && buttonLink && (
              <Button
                variant="outline"
                className="relative h-11 px-6 text-color-text group transition-all duration-300 ease-in-out"
              >
                <a href={buttonLink} target="_blank" rel="noreferrer">
                  <div className="absolute inset-0 bg-color-accent transition-transform duration-300 ease-in-out rounded-md" />
                  <div className="absolute inset-0 bg-white group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300 ease-in-out rounded-md flex items-center justify-center">
                    <span className="relative z-10 font-medium text-sm">
                      {buttonLabel}
                    </span>
                  </div>
                </a>
                <span className="invisible font-medium text-sm">
                  {buttonLabel}
                </span>
              </Button>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default ActionCard;
