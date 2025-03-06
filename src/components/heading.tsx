"use client";

import React from "react";
import clsx from "clsx";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ children, className, dark }) => {

  return (
    <p
      className={clsx(
        "font-extrabold text-4xl md:text-6xl text-center pb-16 pt-16 max-w-2xl mx-auto",
        className,
        dark ? "text-gray-900" : "text-white"
      )}
      // style={{ fontFamily: "Montserrat" }}
    >
      {children}
    </p>
  );
};

export default Heading;
