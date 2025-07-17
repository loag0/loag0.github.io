import React, { useState, useRef } from "react";

const Carousel = ({ children, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;

  // duplicate last 2 and first 2 for infinite effect
  const extendedChildren = [
    childrenArray[totalItems - 2],
    childrenArray[totalItems - 1],
    ...childrenArray,
    childrenArray[0],
    childrenArray[1],
  ];

  const itemWidth = 100 / 3; // assuming 3 items shown
  const translateX = -((currentIndex + 2) * itemWidth);

  const scrollPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const scrollNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  return (
    <div className={`relative ${className}`}>
      <div ref={containerRef} className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(${translateX}%)` }}
        >
          {extendedChildren.map((child, idx) => (
            <div
              key={idx}
              className="flex-none w-1/3 px-2"
              style={{ userSelect: "none" }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Nav buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10 cursor-pointer"
        aria-label="Previous"
      >
        <svg
          className="w-4 h-4 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10 cursor-pointer"
        aria-label="Next"
      >
        <svg
          className="w-4 h-4 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Blur edges */}
      <div className="absolute inset-y-0 left-0 w-15 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-y-0 right-0 w-15 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: totalItems }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-colors ${
              idx === currentIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const CarouselItem = ({ children, className = "" }) => {
  return <div className={`h-full ${className}`}>{children}</div>;
};

export { Carousel, CarouselItem };
