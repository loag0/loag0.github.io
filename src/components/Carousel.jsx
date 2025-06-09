import React, { useState, useRef } from "react";

const Carousel = ({ children, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const totalItems = React.Children.count(children);
  const childrenArray = React.Children.toArray(children);

  // Create infinite loop by duplicating items
  const extendedChildren = [
    ...childrenArray.slice(-2), // Last 2 items at the beginning
    ...childrenArray,
    ...childrenArray.slice(0, 2), // First 2 items at the end
  ];

  const scrollPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const scrollNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  // Calculate the translate position - adding 2 to account for the duplicated items at start
  const translateX = -((currentIndex + 2) * 33.333333 - 33.333333); // Center the current item

  return (
    <div className={`relative ${className}`}>
      <div ref={containerRef} className="overflow-hidden">
        <div
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(${translateX}%)` }}>
          {extendedChildren.map((child, index) => (
            <div key={index} className="flex-none w-1/3 px-2">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons - no disabled state since it loops */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10 cursor-pointer"
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

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
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
