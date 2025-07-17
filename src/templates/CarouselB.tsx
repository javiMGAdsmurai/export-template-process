import React, { useEffect, useState } from "react";

// Declarar clickTag para TypeScript
declare global {
  interface Window {
    clickTag?: string;
  }
}

export const carouselBStyles = `
  .carouselB-container {
    width: 600px;
    margin: auto;
    text-align: center;
    position: relative;
  }

  .main-slideB {
    width: 100%;
    height: 400px;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    margin-bottom: 10px;
    transition: background-image 0.3s ease;
  }

  .thumbs {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .thumbB {
    width: 100px;
    height: 70px;
    background-size: cover;
    background-position: center;
    border: 2px solid transparent;
    border-radius: 5px;
    cursor: pointer;
    transition: border-color 0.2s ease;
  }

  .thumbB.active {
    border-color: #007bff;
  }

  .thumbB:hover {
    border-color: #0056b3;
  }

  .arrow-buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .arrow-buttons button {
    font-size: 24px;
    background: rgba(0,0,0,0.2);
    border: none;
    color: white;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.2s ease;
  }

  .arrow-buttons button:hover {
    background: rgba(0,0,0,0.4);
  }

  /* Botón Buy Now para Google Ads */
  .buy-now-btn {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #007bff;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    z-index: 10;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
  }

  .buy-now-btn:hover {
    background: #0056b3;
    transform: translateX(-50%) scale(1.05);
    box-shadow: 0 6px 12px rgba(0,0,0,0.4);
  }

  .buy-now-btn:active {
    transform: translateX(-50%) scale(0.95);
  }
`;

export const carouselBScript = `
  let currentIndexB = 0;
  const thumbs = document.querySelectorAll('.thumbB');
  const mainSlide = document.querySelector('.main-slideB');
  
  function showSlideB(index) {
    if (!mainSlide || !thumbs.length) return;
    
    currentIndexB = index;
    const selectedThumb = thumbs[index];
    
    if (selectedThumb) {
      mainSlide.style.backgroundImage = selectedThumb.style.backgroundImage;
    }
    
    // Actualizar estado activo
    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
  }

  function prevSlideB() {
    const total = thumbs.length;
    const newIndex = (currentIndexB - 1 + total) % total;
    showSlideB(newIndex);
  }

  function nextSlideB() {
    const total = thumbs.length;
    const newIndex = (currentIndexB + 1) % total;
    showSlideB(newIndex);
  }

  // Inicializar al cargar la página
  window.addEventListener('load', () => {
    if (thumbs.length > 0) {
      showSlideB(0);
    }
  });
`;

type CarouselBProps = { images: string[] };

export const CarouselB: React.FC<CarouselBProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = carouselBStyles;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  const handleSelect = (index: number) => setCurrentIndex(index);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    <div className="carouselB-container">
      <div className="arrow-buttons">
        <button onClick={handlePrev}>←</button>
        <button onClick={handleNext}>→</button>
      </div>
      <div
        className="main-slideB"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>
      <div className="thumbs">
        {images.map((src, idx) => (
          <div
            key={idx}
            className={`thumbB ${idx === currentIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${src})` }}
            onClick={() => handleSelect(idx)}
          ></div>
        ))}
      </div>
      
      {/* Botón Buy Now para Google Ads */}
      <a 
        href="#" 
        className="buy-now-btn"
        onClick={(e) => {
          e.preventDefault();
          if (window.clickTag) {
            window.open(window.clickTag);
          }
        }}
      >
        Buy Now
      </a>
    </div>
  );
};
