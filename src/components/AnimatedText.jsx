import React, { useState, useEffect } from 'react';
import './AnimatedText.css';

const AnimatedText = () => {
  const texts = [
    "Hi, I am Sait Dündar",
    "Hola, yo soy Sait Dündar",
    "Merhaba, ben Sait Dündar"
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    setIsVisible(true);

    return () => clearInterval(interval);
  }, [texts.length]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      // Hide text completely when scrolling down
      if (scrollTop > 50) {
        setShowText(false);
      } else {
        setShowText(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`animated-text-container ${showText ? 'show' : 'hide'}`}>
      <h1 className={`animated-text ${isVisible ? 'visible' : 'hidden'}`}>
        {texts[currentTextIndex]}
      </h1>
    </div>
  );
};

export default AnimatedText;
