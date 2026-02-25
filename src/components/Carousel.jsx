import React, { useState } from "react";

/**
 * Adaptive Carousel / Grid component.
 *
 * When the number of children is ≤ `threshold` (default 3),
 * renders items in a flat CSS grid. When children exceed the
 * threshold, renders a sliding carousel with navigation.
 *
 * @param {number}  threshold   – max items before switching to carousel (default 3)
 * @param {number}  visibleCount – items visible per slide in carousel mode (default 2)
 * @param {string}  className   – additional wrapper class
 */
const Carousel = ({
  children,
  className = "",
  threshold = 3,
  visibleCount = 2,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;

  const isCarousel = totalItems > threshold;

  /* ── Grid mode ── */
  if (!isCarousel) {
    return <div className={`projects-grid ${className}`}>{childrenArray}</div>;
  }

  /* ── Carousel mode ── */
  const slideWidth = 100 / visibleCount;
  const maxIndex = totalItems - visibleCount;
  const translateX = -(currentIndex * slideWidth);

  const scrollPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const scrollNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <div className={`carousel-wrapper ${className}`}>
      <div className="carousel-track-container">
        <div
          className="carousel-track"
          style={{ transform: `translateX(${translateX}%)` }}
        >
          {childrenArray.map((child, idx) => (
            <div
              key={idx}
              className="carousel-slide"
              style={{ flex: `0 0 ${slideWidth}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={scrollPrev}
        className="carousel-btn carousel-btn--prev"
        aria-label="Previous"
      >
        <svg
          width="16"
          height="16"
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
        className="carousel-btn carousel-btn--next"
        aria-label="Next"
      >
        <svg
          width="16"
          height="16"
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

      {/* Dot indicators */}
      <div className="carousel-dots">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`carousel-dot ${idx === currentIndex ? "carousel-dot--active" : ""}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const CarouselItem = ({ children, className = "" }) => {
  return <div className={className}>{children}</div>;
};

export { Carousel, CarouselItem };
