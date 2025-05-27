import React, { useEffect, useState, useRef } from 'react';

//css
import '../../../../assets/styles/reset.css';
import './css/HeroCarousel.css';

const HeroCarousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalRef.current);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="carousel-container">
      <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={slide.id} className={`carousel-slide ${index % 2 === 0 ? 'wide' : 'narrow'}`}>
            <img src={slide.image} alt={slide.title} className="slide-image" />
            <div className="slide-overlay">
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
              {slide.subtext && <p className="slide-subtext">{slide.subtext}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === current ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;