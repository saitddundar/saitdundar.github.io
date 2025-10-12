import React, { useState, useEffect } from 'react';
import './Section1.css';

const Section1 = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const texts = [
    'Hi, I am Sait Dündar.',
    'Hola, yo soy Sait Dündar.',
    'Merhaba, ben Sait Dündar.'
  ];

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => {
            setIsDeleting(true);
          }, 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100); 

    return () => clearTimeout(timeout);
  }, [displayText, currentTextIndex, isDeleting, texts]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section1" id="home">
      <div className="section1-content">
        <h1 className="main-title">
          {displayText}
          <span className={`cursor ${showCursor ? 'visible' : 'hidden'}`}>|</span>
        </h1>
        <p className="subtitle">A computer science student passionate about backend development, cloud, and solving complex problems.</p>
        
        <div className="scroll-indicator" onClick={scrollToAbout}>
          <span className="scroll-text">About</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
