import React, { useEffect, useRef, useState } from "react";

// Declarar clickTag para TypeScript
declare global {
  interface Window {
    clickTag?: string;
  }
}

export const beforeAfterStyles = `
  .before-after-container {
    position: relative;
    width: 600px;
    height: 400px;
    margin: auto;
    overflow: hidden;
    user-select: none;
    border-radius: 10px;
  }

  .before-img, .after-img {
    position: absolute;
    top: 0; left: 0; height: 100%; width: 100%;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
  }

  .after-img {
    clip-path: inset(0 0 0 50%);
    transition: clip-path 0.3s ease;
  }

  .slider {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    width: 4px;
    background: #fff;
    cursor: ew-resize;
    z-index: 10;
    border-radius: 2px;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
  }

  .slider-handle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    background: #007bff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 5px rgba(0,0,0,0.7);
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
    z-index: 15;
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

export const beforeAfterScript = `
  window.onload = function() {
    const container = document.querySelector('.before-after-container');
    const afterImg = document.querySelector('.after-img');
    const slider = document.querySelector('.slider');

    if (!container || !afterImg || !slider) return;

    let dragging = false;
    let animationFrameId = null;
    let pendingX = null;

    function moveSlider(x) {
      const rect = container.getBoundingClientRect();
      let pos = x - rect.left;
      if (pos < 0) pos = 0;
      if (pos > rect.width) pos = rect.width;
      const percentage = (pos / rect.width) * 100;

      afterImg.style.clipPath = 'inset(0 0 0 ' + percentage + '%)';
      slider.style.left = percentage + '%';
    }

    function update() {
      if (pendingX !== null) {
        moveSlider(pendingX);
        pendingX = null;
      }
      animationFrameId = null;
    }

    slider.addEventListener('mousedown', () => dragging = true);
    window.addEventListener('mouseup', () => dragging = false);
    window.addEventListener('mousemove', e => {
      if (dragging) {
        pendingX = e.clientX;
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(update);
        }
      }
    });

    // Soporte táctil
    slider.addEventListener('touchstart', () => dragging = true);
    window.addEventListener('touchend', () => dragging = false);
    window.addEventListener('touchmove', e => {
      if (dragging) {
        pendingX = e.touches[0].clientX;
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(update);
        }
      }
    });

    // Inicializar al 50%
    moveSlider(container.getBoundingClientRect().left + container.getBoundingClientRect().width / 2);
  }
`;

type BeforeAfterSliderProps = {
  beforeImage: string;
  afterImage: string;
};

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);

  const [clipPercent, setClipPercent] = useState(50);
  const draggingRef = useRef(false);
  const animationFrameId = useRef<number | null>(null);
  const pendingPercent = useRef<number | null>(null);

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = beforeAfterStyles;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  const updateClip = () => {
    if (pendingPercent.current !== null) {
      setClipPercent(pendingPercent.current);
      pendingPercent.current = null;
    }
    animationFrameId.current = null;
  };

  const onMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let pos = clientX - rect.left;
    if (pos < 0) pos = 0;
    if (pos > rect.width) pos = rect.width;
    const percentage = (pos / rect.width) * 100;

    pendingPercent.current = percentage;

    if (animationFrameId.current === null) {
      animationFrameId.current = requestAnimationFrame(updateClip);
    }
  };

  const onMouseDown = () => {
    draggingRef.current = true;
  };

  const onMouseUp = () => {
    draggingRef.current = false;
  };

  const onMouseMove = (e: MouseEvent) => {
    if (draggingRef.current) {
      onMove(e.clientX);
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    if (draggingRef.current) {
      onMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchend", onMouseUp);
    window.addEventListener("touchmove", onTouchMove);

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchend", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div className="before-after-container" ref={containerRef}>
      <div
        className="before-img"
        style={{ backgroundImage: `url(${beforeImage})` }}
      />
      <div
        className="after-img"
        style={{
          backgroundImage: `url(${afterImage})`,
          clipPath: `inset(0 0 0 ${clipPercent}%)`,
          transition: draggingRef.current ? "none" : "clip-path 0.3s ease",
        }}
        ref={afterRef}
      />
      <div
        className="slider"
        style={{ left: `${clipPercent}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
        ref={sliderRef}
      >
        <div className="slider-handle" />
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
