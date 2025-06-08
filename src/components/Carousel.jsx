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
          style={{ transform: `translateX(${translateX}%)` }}
        >
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
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
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
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
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
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>

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

// Demo component to show it working
const CarouselDemo = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        Infinite Loop Carousel - Current Slide Centered
      </h2>
      <Carousel className="h-80">
        <CarouselItem>
          <div className="bg-blue-500 text-white p-8 rounded-lg h-full flex items-center justify-center mx-2">
            <h3 className="text-xl font-bold">Slide 1</h3>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="bg-green-500 text-white p-8 rounded-lg h-full flex items-center justify-center mx-2">
            <h3 className="text-xl font-bold">Slide 2</h3>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="bg-purple-500 text-white p-8 rounded-lg h-full flex items-center justify-center mx-2">
            <h3 className="text-xl font-bold">Slide 3</h3>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="bg-red-500 text-white p-8 rounded-lg h-full flex items-center justify-center mx-2">
            <h3 className="text-xl font-bold">Slide 4</h3>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="bg-yellow-500 text-white p-8 rounded-lg h-full flex items-center justify-center mx-2">
            <h3 className="text-xl font-bold">Slide 5</h3>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="bg-pink-500 text-white p-8 rounded-lg h-full flex items-center justify-center mx-2">
            <h3 className="text-xl font-bold">Slide 6</h3>
          </div>
        </CarouselItem>
      </Carousel>
    </div>
  );
};

export default CarouselDemo;
export { Carousel, CarouselItem };
