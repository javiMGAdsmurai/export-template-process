import React, { useEffect, useState } from "react";

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
    </div>
  );
};
