import React, { useEffect, useRef, useState } from "react";
import "../../../../assets/styles/reset.css";
import "./css/HeroCarousel.css";

const HeroCarousel = ({ slides }) => {
  const [current, setCurrent] = useState(0); // 현재 인덱스
  const [hoveredIndex, setHoveredIndex] = useState(null); // Hover 상태
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
    <div className="carousel-wrapper">
      {/* ← 왼쪽 버튼 */}
      <button className="carousel-arrow left" onClick={handlePrev}>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <polyline points="15,18 9,12 15,6" stroke="currentColor" />
        </svg>
      </button>

      {/* ▶ 캐러셀 영역 */}
      <div
        className="carousel-container"
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${current * (100 / visibleCount)}%)`,
          }}
        >
          {slides.map((slide, index) => {
            const centerIndex = (current + 1) % slides.length;
            const isHovered = hoveredIndex !== null;
            const isThisHovered = hoveredIndex === index;

            let slideClass = "carousel-slide";

            if (isHovered) {
              // ➤ Hover 중일 때: 해당 슬라이드만 확대
              if (isThisHovered) {
                slideClass += " hovered";
              } else {
                slideClass += " compressed";
              }
            } else {
              // ➤ Hover 아니고 기본 상태일 때
              if (index === centerIndex) {
                slideClass += " center";
              } else {
                slideClass += " compressed";
              }
            }

            return (
              <div
                key={slide.id}
                className={slideClass}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img src={slide.image} alt={slide.title} />
                <div className="overlay">
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                  {slide.subtext && <p className="subtext">{slide.subtext}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* → 오른쪽 버튼 */}
      <button className="carousel-arrow right" onClick={handleNext}>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <polyline points="9,18 15,12 9,6" stroke="currentColor" />
        </svg>
      </button>
    </div>
  );
};

export default HeroCarousel;
