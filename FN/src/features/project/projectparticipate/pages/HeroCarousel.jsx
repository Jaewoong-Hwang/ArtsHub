import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/heroCarousel.module.css";
import "../../../../assets/styles/reset.css";

const HeroCarousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const intervalRef = useRef(null);
  const isHoveredRef = useRef(false);
  const visibleCount = 3;
  const navigate = useNavigate();

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

  if (!Array.isArray(slides) || slides.length === 0) return null;

  const fallbackSlides = [
    {
      id: "fallback-1",
      title: "환상의 오페라",
      description: "환상과 현실이 교차하는 극장",
      subtext: "오페라 / 클래식",
      image: "https://picsum.photos/600/180?random=101",
    },
    {
      id: "fallback-2",
      title: "빛과 그림자",
      description: "조명과 감정이 교차하는 무대",
      subtext: "연극 / 조명 예술",
      image: "https://picsum.photos/600/180?random=102",
    },
    {
      id: "fallback-3",
      title: "거리의 선율",
      description: "도심 속 자유로운 퍼포먼스",
      subtext: "버스킹 / 밴드 공연",
      image: "https://picsum.photos/600/180?random=103",
    },
  ];

  const mergedSlides =
    slides.length >= 3
      ? slides
      : [...slides, ...fallbackSlides.slice(0, 3 - slides.length)];

  return (
    <div className={styles.carouselWrapper}>
      <button className={`${styles.carouselArrow} ${styles.left}`} onClick={handlePrev}>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <polyline points="15,18 9,12 15,6" stroke="currentColor" />
        </svg>
      </button>

      <div
        className={styles.carouselContainer}
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <div
          className={styles.carouselTrack}
          style={{
            transform: `translateX(-${current * (100 / visibleCount)}%)`,
          }}
        >
          {mergedSlides.map((slide, index) => {
            const centerIndex = (current + 1) % mergedSlides.length;
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
                onClick={() => navigate(`/project/${slide.id}`)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={slide.image}
                  alt={slide.title || "프로젝트 썸네일"}
                  className={styles.slideImage}
                />
                <div className={styles.overlay}>
                  <h3>{slide.title || "제목 없음"}</h3>
                  <p>{slide.description || "설명이 없습니다"}</p>
                  {slide.subtext && (
                    <p className={styles.subtext}>{slide.subtext}</p>
                  )}
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