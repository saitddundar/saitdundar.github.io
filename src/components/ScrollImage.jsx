import React, { useState, useEffect, useRef } from 'react';
import './ScrollImage.css';

const ScrollImage = ({ imagePath, alt = "Scroll Image" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / documentHeight, 1);
      
      setScrollProgress(progress);
      
      // Show image when user starts scrolling
      if (scrollTop > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-image-container">
      <img
        ref={imageRef}
        src={imagePath}
        alt={alt}
        className={`scroll-image ${isVisible ? 'visible' : 'hidden'}`}
        style={{
          transform: `scale(${1 + scrollProgress * 0.5}) translateX(${-scrollProgress * 200}px)`,
          opacity: isVisible ? 0.8 + scrollProgress * 0.2 : 0
        }}
      />
    </div>
  );
};

export default ScrollImage;
