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
        // Yazma işlemi
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          // Yazma tamamlandı, 2 saniye bekle
          setTimeout(() => {
            setIsDeleting(true);
          }, 2000);
        }
      } else {
        // Silme işlemi
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          // Silme tamamlandı, bir sonraki metne geç
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100); // Silme daha hızlı

    return () => clearTimeout(timeout);
  }, [displayText, currentTextIndex, isDeleting, texts]);

  // Cursor animasyonu
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section className="section1" id="home">
      <div className="section1-content">
        <h1 className="main-title">
          {displayText}
          <span className={`cursor ${showCursor ? 'visible' : 'hidden'}`}>|</span>
        </h1>
        <p className="subtitle">A computer science student passionate about backend development, cloud, and solving complex problems.</p>
      </div>
    </section>
  );
};

export default Section1;
