"use client";
import React from "react";
import clsx from "clsx";

interface HighlightHeadingProps {
  className?: string;
  dark?: boolean;

  beforeHighlight?: string;
  highlightText?: string;
  afterHighlight?: string;

  children?: React.ReactNode;
}

const HighlightHeading: React.FC<HighlightHeadingProps> = ({
  className,
  dark,
  beforeHighlight = "",
  highlightText = "",
  afterHighlight = "",
  children,
}) => {
  const useHighlightFormat = beforeHighlight || highlightText || afterHighlight;

  return (
    <div className="py-16 px-4 sm:px-6">
      <h2
        className={clsx(
          "font-extrabold text-2xl sm:text-3xl md:text-4xl leading-snug sm:leading-relaxed mb-4 max-w-2xl mx-auto text-center break-words",
          className,
        )}
      >
        {useHighlightFormat ? (
          <>
            {beforeHighlight && <span>{beforeHighlight} </span>}
            {highlightText && (
              <span className="bg-color-accent px-2 sm:px-4 py-1 rounded-lg inline-block">
                {highlightText}
              </span>
            )}
            {afterHighlight && <span> {afterHighlight}</span>}
          </>
        ) : (
          ""
        )}
      </h2>

      {children && (
        <div className="max-w-4xl mx-auto w-5/6">
          <p
            className={clsx(
              "text-base sm:text-lg text-center text-color-text",
              dark && "text-white/80",
            )}
          >
            {children}
          </p>
        </div>
      )}
    </div>
  );
};

export default HighlightHeading;
