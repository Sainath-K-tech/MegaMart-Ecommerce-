import { useState, useEffect } from 'react';
import './Slideshow.css';

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { text: "🔥 MEGA SALE - UP TO 70% OFF", color: "#ff4757" },
    { text: "🎉 50% OFF ON ALL ELECTRONICS", color: "#2ed573" },
    { text: "💎 PREMIUM FASHION - BUY 2 GET 1 FREE", color: "#3742fa" },
    { text: "🏠 HOME DECOR - FLAT 40% DISCOUNT", color: "#ffa502" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="slideshow-container">
      <div 
        className="slideshow-slide"
        style={{ 
          backgroundColor: slides[currentSlide].color,
          transform: `translateX(-${currentSlide * 100}%)`
        }}
      >
        <div className="slideshow-content">
          <span className="slideshow-text">{slides[currentSlide].text}</span>
          <span className="slideshow-arrow">→</span>
        </div>
      </div>
      
      {/* Slide indicators */}
      <div className="slideshow-indicators">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
