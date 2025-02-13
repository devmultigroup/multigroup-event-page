"use client";

import React from "react";
import clsx from "clsx";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ children, className }) => {

  return (
    <p
      className={clsx(
        "font-extrabold text-gray-900 text-4xl text-center pb-8 pt-16 max-w-2xl mx-auto",
        className
      )}
      style={{ fontFamily: "Montserrat" }}
    >
      {children}
    </p>
  );
};

export default Heading;
