import React, { useEffect, useState } from "react";

// Estilos como string, para React + exportador
export const carouselAStyles = `
  .carrusel-container {
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
  }

  .izquierda { left: 10px; }
  .derecha { right: 10px; }
`;

// Script usado solo para la exportación HTML (puede mantenerse igual)
export const carouselAScript = `
  let index = 0;
  function moverA(dir) {
    const total = document.querySelectorAll('.slideA').length;
    index = (index + dir + total) % total;
    document.getElementById('slidesA').style.transform = 'translateX(' + (-600 * index) + 'px)';
  }
  window.onload = () => moverA(0);
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
    <div className="carrusel-container">
      <button className="flecha izquierda" onClick={() => handleMove(-1)}>
        ←
      </button>
      <div
        className="slides"
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
