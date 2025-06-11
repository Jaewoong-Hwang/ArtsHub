import React, { useEffect, useRef, useState } from "react";
import "../../../../assets/styles/reset.css";
import styles from "./css/HeroCarousel.module.css"; // ✅ CSS Module import

const HeroCarousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const intervalRef = useRef(null);
  const isHoveredRef = useRef(false);
  const visibleCount = 3;

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const pause = () => {
    isHoveredRef.current = true;
    clearInterval(intervalRef.current);
  };

  const resume = () => {
    isHoveredRef.current = false;
    startAutoSlide();
  };

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isHoveredRef.current) handleNext();
    }, 4000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className={styles.carouselWrapper}>
      <button className={`${styles.carouselArrow} ${styles.left}`} onClick={handlePrev}>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <polyline points="15,18 9,12 15,6" stroke="currentColor" />
        </svg>
      </button>

      <div className={styles.carouselContainer} onMouseEnter={pause} onMouseLeave={resume}>
        <div
          className={styles.carouselTrack}
          style={{ transform: `translateX(-${current * (100 / visibleCount)}%)` }}
        >
          {slides.map((slide, index) => {
            const centerIndex = (current + 1) % slides.length;
            const isHovered = hoveredIndex !== null;
            const isThisHovered = hoveredIndex === index;

            let slideClass = styles.carouselSlide;

            if (isHovered) {
              slideClass += ` ${isThisHovered ? styles.hovered : styles.compressed}`;
            } else {
              slideClass += ` ${index === centerIndex ? styles.center : styles.compressed}`;
            }

            return (
              <div
                key={slide.id}
                className={slideClass}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img src={slide.image} alt={slide.title} />
                <div className={styles.overlay}>
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                  {slide.subtext && <p className={styles.subtext}>{slide.subtext}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button className={`${styles.carouselArrow} ${styles.right}`} onClick={handleNext}>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <polyline points="9,18 15,12 9,6" stroke="currentColor" />
        </svg>
      </button>
    </div>
  );
};

export default HeroCarousel;