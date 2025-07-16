import React, { useEffect, useState } from "react";

export const carouselBStyles = `
  .carouselB-container {
    width: 600px;
    margin: auto;
    text-align: center;
  }

  .main-slide {
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

  .thumb {
    width: 100px;
    height: 70px;
    background-size: cover;
    background-position: center;
    border: 2px solid transparent;
    border-radius: 5px;
    cursor: pointer;
  }

  .thumb.active {
    border-color: #007bff;
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
  }
`;

export const carouselBScript = `
  let currentIndexB = 0;
  function showSlideB(index) {
    const slides = document.querySelectorAll('.thumbB');
    const main = document.querySelector('.main-slideB');
    if (!main || !slides.length) return;
    currentIndexB = index;
    main.style.backgroundImage = slides[index].style.backgroundImage;
    slides.forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });
  }

  function prevSlideB() {
    const slides = document.querySelectorAll('.thumbB');
    const total = slides.length;
    showSlideB((currentIndexB - 1 + total) % total);
  }

  function nextSlideB() {
    const slides = document.querySelectorAll('.thumbB');
    const total = slides.length;
    showSlideB((currentIndexB + 1) % total);
  }

  window.onload = () => showSlideB(0);
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
        className="main-slide"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>
      <div className="thumbs">
        {images.map((src, idx) => (
          <div
            key={idx}
            className={`thumb ${idx === currentIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${src})` }}
            onClick={() => handleSelect(idx)}
          ></div>
        ))}
      </div>
    </div>
  );
};
