import React, { useEffect, useState } from "react";

// Declarar clickTag para TypeScript
declare global {
  interface Window {
    clickTag?: string;
  }
}

// Estilos como string, para React + exportador
export const carouselAStyles = `
  .carouselA {
    position: relative;
    width: 600px;
    margin: auto;
    overflow: hidden;
  }

  .slides {
    display: flex;
    transition: transform 0.5s ease;
  }

  .slideA {
    min-width: 600px;
    height: 400px;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
  }

  .flecha {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 30px;
    background: rgba(255,255,255,0.6);
    border: none;
    cursor: pointer;
    padding: 10px;
    border-radius: 50%;
    z-index: 1;
    transition: background-color 0.2s ease;
  }

  .flecha:hover {
    background: rgba(255,255,255,0.8);
  }

  .izquierda { left: 10px; }
  .derecha { right: 10px; }

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

// Script corregido para funcionar en HTML exportado
export const carouselAScript = `
  let index = 0;
  const slides = document.querySelectorAll('.slideA');
  const slidesContainer = document.getElementById('slidesA');
  
  function moverA(dir) {
    const total = slides.length;
    index = (index + dir + total) % total;
    if (slidesContainer) {
      slidesContainer.style.transform = 'translateX(' + (-600 * index) + 'px)';
    }
  }
  
  // Función para manejar click tag según Google Ads
  function handleClickTag() {
    if (typeof window.clickTag !== 'undefined' && window.clickTag) {
      window.open(window.clickTag);
    }
  }
  
  // Inicializar al cargar la página
  window.addEventListener('load', () => {
    if (slidesContainer) {
      slidesContainer.style.transform = 'translateX(0px)';
    }
  });
`;

type CarouselAProps = { images: string[] };

export const CarouselA: React.FC<CarouselAProps> = ({ images }) => {
  const [index, setIndex] = useState(0);

  // Inyectar estilos al montar el componente
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = carouselAStyles;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  const handleMove = (dir: number) => {
    setIndex((prev) => (prev + dir + images.length) % images.length);
  };

  return (
    <div className="carouselA">
      <button className="flecha izquierda" onClick={() => handleMove(-1)}>
        ←
      </button>
      <div
        className="slides"
        id="slidesA"
        style={{ transform: `translateX(${-600 * index}px)` }}
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            className="slideA"
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>
      <button className="flecha derecha" onClick={() => handleMove(1)}>
        →
      </button>
      
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
