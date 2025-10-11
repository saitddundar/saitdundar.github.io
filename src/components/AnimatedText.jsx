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

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    // Initial animation
    setIsVisible(true);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="animated-text-container">
      <h1 className={`animated-text ${isVisible ? 'visible' : 'hidden'}`}>
        {texts[currentTextIndex]}
      </h1>
    </div>
  );
};

export default AnimatedText;
